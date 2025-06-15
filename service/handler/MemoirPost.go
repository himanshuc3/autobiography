package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// TODO:
// 1. Add models for data we need to get from the request body
// 2. Add models for data we need to send in the response body
// 3. Add a database layer to interact with the data

type MemoirPost struct {
}

func (mp MemoirPost) ListPosts(w http.ResponseWriter, r *http.Request) {

}
func (mp MemoirPost) GetPost(w http.ResponseWriter, r *http.Request) {
}
func (mp MemoirPost) CreatePost(w http.ResponseWriter, r *http.Request) {
}
func (mp MemoirPost) DeletePost(w http.ResponseWriter, r *http.Request) {
}

func InitMemoirRoutes() chi.Router {
	router := chi.NewRouter()
	memoirPost := MemoirPost{}
	router.Get("/", memoirPost.ListPosts)
	router.Get("/{id}", memoirPost.GetPost)
	router.Post("/", memoirPost.CreatePost)
	router.Delete("/{id}", memoirPost.DeletePost)
	return router
}
