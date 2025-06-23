package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"himanshuc3.com/autobiography/models"
)

type UserHandler struct {
	UserService *models.UserService
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
	// Logic to create a user
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
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
	// NOTE:
	// 1. + - printing object w/ keys
	cookie := http.Cookie{
		Name:  "email",
		Value: user.Email,
		Path:  "/",
	}
	http.SetCookie(w, &cookie)
	fmt.Fprintf(w, "User authenticated: %+v", user)
}

func (uh UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
	// Logic to get a user by ID
	id := chi.URLParam(r, "id")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User details for ID: " + id))
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

func InitUserRoutes(service *models.UserService) chi.Router {
	router := chi.NewRouter()
	userHandler := UserHandler{UserService: service}
	router.Post("/signup", userHandler.ProcessSignUp)
	router.Post("/signin", userHandler.ProcessSignIn)
	router.Get("/{id}", userHandler.GetUser)
	router.Put("/{id}", userHandler.UpdateUser)
	router.Delete("/{id}", userHandler.DeleteUser)
	return router
}
