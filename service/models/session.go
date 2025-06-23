package models

import (
	"database/sql"
	"fmt"

	"himanshuc3.com/autobiography/rand"
)

const (
	MinBytesPerToken = 32
)

type Session struct {
	ID     int
	UserID string
	// Token is only set when creating a new session
	// On session lookup, it is left empty and we only
	// have the hashed token.
	Token     string
	TokenHash string
}

type SessionService struct {
	DB            *sql.DB
	BytesPerToken int
}

func (ss *SessionService) Create(userID string) (*Session, error) {
	bytesPerToken := ss.BytesPerToken
	if bytesPerToken < MinBytesPerToken {
		bytesPerToken = MinBytesPerToken
	}
	token, err := rand.String(bytesPerToken)
	if err != nil {
		return nil, fmt.Errorf("Session service: %w", err)
	}
	session := Session{
		UserID: userID,
		Token:  token,
	}
	return &session, nil
}

func (ss *SessionService) GetUser(token string) (*User, error) {

	return nil, nil
}
