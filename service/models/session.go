package models

import (
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"fmt"

	"himanshuc3.com/autobiography/rand"
)

const (
	MinBytesPerToken = 32
)

// NOTE:
// 1. Not using bcrypt because of the complexity and difficulty to compare the hashed output with cookie value

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
		UserID:    userID,
		TokenHash: ss.hash(token),
		Token:     token,
	}
	row := ss.DB.QueryRow(`
		UPDATE sessions
		SET token_hash = $2
		WHERE user_id = $1
		RETURNING id;
	`, session.UserID, session.Token)
	err = row.Scan(&session.ID)

	if err == sql.ErrNoRows {

		row = ss.DB.QueryRow(`
			INSERT INTO sessions (user_id, token_hash)
			VALUES ($1, $2)
			RETURNING id;
		`, session.UserID, session.Token)
		err = row.Scan(&session.ID)

	}

	if err != nil {
		return nil, fmt.Errorf("create: %w", err)
	}
	return &session, nil
}

func (ss *SessionService) GetUser(token string) (*User, error) {
	tokenHash := ss.hash(token)

	var userID string
	row := ss.DB.QueryRow(`
			SELECT user_id
			FROM sessions
			where token_hash = $1;
		`, tokenHash)
	err := row.Scan(&userID)
	if err != nil {
		return nil, fmt.Errorf("user: %w", err)
	}
	var user User

	row = ss.DB.QueryRow(`
		SELECT email, password_hash
		FROM users
		where id = $1
	`, userID)
	err = row.Scan(&user.Email, &user.PasswordHash)

	if err != nil {
		return nil, fmt.Errorf("user: %w", err)
	}

	return &user, nil
}

func (ss *SessionService) Delete(token string) error {
	tokenHash := ss.hash(token)

	_, err := ss.DB.Exec(`
		DELETE FROM sessions
		WHERE token_hash = $1
	`, tokenHash)
	if err != nil {
		return fmt.Errorf("delete: %w", err)
	}
	return nil
}

func (ss *SessionService) hash(token string) string {
	tokenHash := sha256.Sum256([]byte(token))
	// NOTE:
	// 1. Creating slice from array using [] operation
	return base64.URLEncoding.EncodeToString(tokenHash[:])
}
