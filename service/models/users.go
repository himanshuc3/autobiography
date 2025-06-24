package models

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/crypto/bcrypt"
)

// NOTE:
// 1. 1:1 mapping from sql to struct
type User struct {
	ID           string `json:"id"`
	Email        string `json:"email"`
	PasswordHash string `json:"-"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	CreatedAt    string `json:"created_at"`
}

var (
	ErrEmailTaken = errors.New("models: Account/Email already existing")
)

// NOTE:
//  1. Service struct to hold database connection
//  2. ??? Why is this called a service? Shouldn't it be called UserRepository or UserDAO?
//     Doesn't controller or handler refer to the service as a repository?
type UserService struct {
	DB *sql.DB
}

type NewUser struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

func hashPassword(password string) (string, error) {
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedBytes), nil // Replace with actual hashing logic
}

// NOTE:
// 1. Parameter structure:
//   - user: pointer to User struct (1:1 mapping to SQL table)
//   - newUser vs passing individual parameters: only the fields required to create a new user
//     in DB
func (us *UserService) Create(newUser NewUser) (*User, error) {
	email := strings.ToLower(newUser.Email)
	hashedPassword, err := hashPassword(newUser.Password)
	if err != nil {
		return nil, fmt.Errorf("create user: %w", err)
	}

	user := User{
		Email:        newUser.Email,
		PasswordHash: hashedPassword,
		FirstName:    newUser.FirstName,
		LastName:     newUser.LastName,
	}

	row := us.DB.QueryRow(
		`INSERT INTO users 
		(email, password_hash, first_name, last_name) 
		VALUES ($1, $2, $3, $4) 
		RETURNING id`,
		email, hashedPassword, newUser.FirstName, newUser.LastName,
	)

	err = row.Scan(&user.ID)

	if err != nil {
		var pgError *pgconn.PgError
		if errors.As(err, &pgError) {
			// TODO: Replace with a constant, unique violation error
			if pgError.Code == "23505" {
				return nil, ErrEmailTaken
			}
		}
		return nil, fmt.Errorf("create user: %w", err)
	}

	return &user, nil
}

func (us *UserService) Authenticate(email, password string) (*User, error) {
	fmt.Printf("email: %v, password: %v", email, password)
	email = strings.ToLower(email)
	user := User{
		Email: email,
	}

	row := us.DB.QueryRow(`
	SELECT id, password_hash
	 FROM users WHERE email=$1`, email)
	err := row.Scan(&user.ID, &user.PasswordHash)

	if err != nil {
		return nil, fmt.Errorf("authenticate: %w", err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))

	if err != nil {
		return nil, fmt.Errorf("authenticate: %w", err)
	}

	return &user, nil
}

func (us *UserService) UpdatePassword(userId string, password string) error {
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("update password: %w", err)
	}

	passwordHash := string(hashedBytes)

	_, err = us.DB.Exec(`
		UPDATE users
		SET password_hash = $2
		WHERE id = $1;
	`, userId, passwordHash)

	if err != nil {
		return fmt.Errorf("update password: %w", err)
	}
	return nil
}
