package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/go-chi/chi/v5"
	"himanshuc3.com/autobiography/context"
	"himanshuc3.com/autobiography/models"
)

type UserHandler struct {
	UserService          *models.UserService
	SessionService       *models.SessionService
	PasswordResetService *models.PasswordResetService
	EmailService         *models.EmailService
}

// NOTE:
// 1. Should we do validation on request body in handler or service db layer?
func (uh UserHandler) ProcessSignUp(w http.ResponseWriter, r *http.Request) {
	var userBody models.NewUser
	err := json.NewDecoder(r.Body).Decode(&userBody)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	createdUser, err := uh.UserService.Create(userBody)

	if err != nil {
		fmt.Println(err)
		http.Error(w, "Something went wrong.", http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(createdUser)
	if err != nil {
		http.Error(w, "Error encoding user", http.StatusInternalServerError)
		return
	}
	// TODO:
	// 1. Why are we setting session cookie while signing up
	session, err := uh.SessionService.Create(createdUser.ID)
	if err != nil {
		fmt.Println(err)
		// TODO: Long term, we should show a warning about not being able to sign the
		// user in
		// TODO: Redirect to login page on client-side
		return
	}
	// Logic to create a user
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	setCookie(w, CookieSession, session.Token)
	w.Write(response)
}

func (uh UserHandler) ProcessSignIn(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		http.Error(w, "Failed processing body: %w", http.StatusInternalServerError)
		return
	}
	user, err := uh.UserService.Authenticate(body.Email, body.Password)

	if err != nil {
		fmt.Println("Processing sdf in")
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}
	session, err := uh.SessionService.Create(user.ID)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}

	setCookie(w, CookieSession, session.Token)
	// NOTE:
	// 1. + - printing object w/ keys
	fmt.Fprintf(w, "User authenticated: %+v", user)
}

func (uh UserHandler) CurrentUser(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	user := context.GetUser(ctx)
	if user == nil {
		// TODO: Redirect to signin page
		return
	}
}

func (uh UserHandler) ProcessSignout(w http.ResponseWriter, r *http.Request) {
	token, err := readCookie(r, CookieSession)
	if err != nil {
		// token not present
		http.Error(w, "Not able to sign out", http.StatusInternalServerError)
		return
	}
	err = uh.SessionService.Delete(token)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}
	// TODO: Redirect from client
	deleteCookie(w, CookieSession)

}
func (uh UserHandler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	// Logic to update a user by ID
	id := chi.URLParam(r, "id")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User updated successfully for ID: " + id))
}
func (uh UserHandler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	// Logic to delete a user by ID
	id := chi.URLParam(r, "id")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User deleted successfully for ID: " + id))
}
func (uh UserHandler) ProcessForgotPassword(w http.ResponseWriter, r *http.Request) {
	var data struct {
		Email string `json:"email"`
	}
	err := json.NewDecoder(r.Body).Decode(&data)

	if err != nil {
		fmt.Println("ProcessForgotPassword: Failed to parse json")
		return
	}

	pwReset, err := uh.PasswordResetService.Create(data.Email)
	vals := url.Values{
		"token": {pwReset.Token},
	}
	resetUrl := "https://storyverse.net/reset-pw?" + vals.Encode()

	if err != nil {
		// TODO: Handle other edge cases like
		// email/user doesn't exist
		// password reset email already sent
		fmt.Println(err)
		http.Error(w, "Something went wrong.", http.StatusInternalServerError)
	}

	err = uh.EmailService.ForgotPassword(data.Email, resetUrl)
}

func InitUserRoutes(service *models.UserService, sessionService *models.SessionService) chi.Router {
	router := chi.NewRouter()
	userHandler := UserHandler{UserService: service, SessionService: sessionService}
	router.Post("/signup", userHandler.ProcessSignUp)
	router.Post("/signin", userHandler.ProcessSignIn)
	router.Post("/me", userHandler.CurrentUser)
	router.Post("/signout", userHandler.ProcessSignout)
	router.Put("/{id}", userHandler.UpdateUser)
	router.Delete("/{id}", userHandler.DeleteUser)
	return router
}

type UserMiddleware struct {
	SessionService *models.SessionService
}

func (userMW UserMiddleware) SetUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenCookie, err := readCookie(r, CookieSession)

		if err != nil {
			next.ServeHTTP(w, r)
			return
		}
		user, err := userMW.SessionService.GetUser(tokenCookie)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}
		ctx := r.Context()
		ctx = context.WithUser(ctx, user)

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func (umw UserMiddleware) RequireUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user := context.GetUser(r.Context())
		if user == nil {
			// TODO: Redirect to signin page, can we return unauthenticated http error from here?
			return
		}
		next.ServeHTTP(w, r)
	})
}
