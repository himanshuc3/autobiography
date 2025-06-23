package main

import (
	"context"
	"fmt"
	"strings"
)

// NOTE:
// 1. Using custom types
// 2. Not exporting type and keys for context, so that it doesn't cause collisions
type ctxKey string

const (
	favoriteColorKey ctxKey = "favorite-color"
)

func main() {
	ctx := context.Background()
	ctx = context.WithValue(ctx, favoriteColorKey, "blue")

	value := ctx.Value(favoriteColorKey)

	// NOTE:
	// 1. Type assertion, because context can store any type of key and value
	strValue, ok := value.(string)
	if !ok {
		fmt.Println("it isn't a string")
		return
	}

	fmt.Println(value)
	fmt.Println(strings.HasPrefix(strValue, "b"))
}
