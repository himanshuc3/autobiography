package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"himanshuc3.com/autobiography/handler"
)

// NOTE:
// 1. Implementing a custom router of Handler interface type accepted by http.ListenAndServe
type Router struct {
}

func (router Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	pathHandler(w, r)
}

// NOTE:
// 1. Testing is easier with ResponseRecorder to mock response values
// func handleFunc(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "text/html; charset=utf-8")
// 	fmt.Fprintln(w, "Hello, World!")
// }

// NOTE:
// 1. funcs are first class citizens, so we can implement Handler interface on
// this function as well
func pathHandler(w http.ResponseWriter, r *http.Request) {
	// NOTE:
	// 1. Path vs RawPath - RawPath shows true presentation of URL path whereas Path is decoding the path
	switch r.URL.Path {

	case "/":
		fmt.Fprintln(w, "[GET Request]::Home route")

	// TODO:
	// 1. Defining a list of naive but dynamic routes
	// 2.
	case "/posts/random":
		fmt.Fprintln(w, "[GET Request]::Fetching a random post")
	case "/posts/search":
		fmt.Fprintln(w, "[GET Request]::Searching for posts, option to filter by using query params")
	case "/posts/latest":
		fmt.Fprintln(w, "[GET Request]::")
	case "/posts/:id":
		fmt.Fprintln(w, "[GET Request]::Fetching a single post by post id")
	case "/posts":
		fmt.Fprintln(w, "[GET Request]::Fetching all posts, option to filter by using query params")
	case "/post":
		fmt.Fprintln(w, "[POST Request]::Creating a new post")
	case "/posts/:id/delete":
		fmt.Fprintln(w, "[DELETE Request]::Deleting a post")

	case "/profile":
		fmt.Fprintln(w, "[GET Request]::Fetching a user's profile")

	case "/auth/signup":
		fmt.Fprintln(w, "[POST Request]::Signing up a new user")
	case "/auth/login":
		fmt.Fprintln(w, "[POST Request]::Logging in a user")
	case "/auth/logout":
		fmt.Fprintln(w, "[POST Request]::Logging out a user")

	case "/posts/:id/comments":
		fmt.Fprintln(w, "[GET Request]::Fetching all comments for a post")
	default:
		http.Error(w, "Page not found", http.StatusNotFound)

	}
}

func main() {

	// NOTES:
	// 1. HandleFunc implements defaultServeMux, which is the default HTTP request multiplexer.
	// 2. http.HandlerFunc(pathHandler) is a type conversion of pathHandler to http.HandlerFunc type, not a function call
	// - similar to int32(int64_value)
	// http.HandleFunc("/", handleFunc)
	// http.HandleFunc("/", pathHandler)

	// NOTES:
	// 1. Fprintln writes to the file descriptor, which is typically stdout.
	// 2. Using modd for HMR dev server
	// fmt.Fprintln(os.Stdout, "Hello, World!")
	// router := Router{}
	router := chi.NewRouter()
	router.Use(middleware.Logger)

	// TODO:
	// 1. Add a middleware to check if the user is authenticated and for logging
	// 2. API vs SSR - API is flexible and agnostic of the client, separation of concerns,
	// low latency due to core data being transferred
	// 3. XSS - Cross Site Scripting (code injection), CSRF - Cross Site Request Forgery
	// HTML templates are vulnerable to XSS attacks - therefore they must be encoded/sanitized
	// (go template library does contextual escaping based on types of data)
	router.Get("/", pathHandler)
	// router.Get("/posts/{id}", pathHandler)
	// router.Get("/posts/random", pathHandler)
	// router.Get("/posts/search", pathHandler)
	// router.Get("/posts/latest", pathHandler)
	// router.Get("/posts", pathHandler)
	// router.Post("/post", pathHandler)
	// router.Delete("/posts/{id}", pathHandler)

	router.Mount("/posts", handler.InitMemoirRoutes())

	fmt.Println("Definitely starting the server on port 3333")
	err := http.ListenAndServe(":3333", router)

	// NOTE:
	// 1. Errorf wraps the error with a message
	// fmt.Errorf("create user: %w", err)
	// 2. panic is like exit, stopping the program. Must funcs are a convention to handle errors where panics can be used.
	if err != nil {
		log.Fatal(err)
	}
}
