package main

import (
	"fmt"
	"net/http"
)

// NOTE:
// 1. Testing is easier with ResponseRecorder to mock response values
func handleFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, World!")
}

func main() {

	// NOTES:
	// 1. HandleFunc implements defaultServeMux, which is the default HTTP request multiplexer.
	http.HandleFunc("/", handleFunc)

	// NOTES:
	// 1. Fprintln writes to the file descriptor, which is typically stdout.
	// fmt.Fprintln(os.Stdout, "Hello, World!")
	fmt.Println("Hello, World!")
	http.ListenAndServe(":7777", nil)
}
