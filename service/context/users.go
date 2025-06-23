package context

import (
	"context"

	"himanshuc3.com/autobiography/models"
)

type key string

const (
	userKey key = "user"
)

func WithUser(ctx context.Context, user *models.User) context.Context {
	return context.WithValue(ctx, userKey, user)
}

func GetUser(ctx context.Context) *models.User {
	val := ctx.Value(userKey)
	user, ok := val.(*models.User)
	if !ok {
		return nil
	}
	return user
}
