package main

// NOTE:
// 1. Using the init function to register the PostgreSQL driver
// which is run before the main function (called a side effect).
import (
	"database/sql"
	"fmt"

	_ "github.com/jackc/pgx/v5/stdlib" // Importing the pgx driver for PostgreSQL
)

type PostgresConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Database string
	SSLMode  string
}

func (cfg PostgresConfig) String() string {
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.Database, cfg.SSLMode)
}

func readingRows(db *sql.DB) {

	type UserStories struct {
		ID          string
		UserID      string
		title       string
		description string
	}

	var userStories []UserStories
	rows, err := db.Query("SELECT id, user_id, title, description FROM user_stories where user_id= $1", "some-user-id")

	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var story UserStories

		var id, title, description string
		err := rows.Scan(&id, &title, &description)
		if err != nil {
			panic(err)
		}
		userStories = append(userStories, story)
	}

	if err = rows.Err(); err != nil {
		panic(err)
	}
}

// NOTE:
// 1. ORMs vs SQL code

func main() {
	cfg := PostgresConfig{
		Host:     "localhost",
		Port:     "5432",
		User:     "sakamoto",
		Password: "sakamoto",
		Database: "storyverse",
		SSLMode:  "disable",
	}

	db, err := sql.Open("pgx", cfg.String())
	if err != nil {
		panic(err)
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	// Database connection is successful
	fmt.Println("Database connection successful")

	// NOTE:
	// 1. Query using db.Query, db.QueryRow, db.Exec, QueryContext etc.

	// Create a table
	_, err = db.Exec(`
       CREATE TABLE IF NOT EXISTS users (
		id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
		name TEXT NOT NULL,
		email TEXT UNIQUE NOT NULL
		);
		CREATE TABLE IF NOT EXISTS stories(
				id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
				title TEXT NOT NULL,
				content TEXT NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				upvotes INT DEFAULT 0,
				downvotes INT DEFAULT 0,
				comments_count INT DEFAULT 0,
				image TEXT,
				tags TEXT[],
				author_id UUID REFERENCES users(id)
		);
			CREATE TABLE IF NOT EXISTS comments(
				   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
				   story_id UUID REFERENCES stories(id),
				   user_id UUID REFERENCES users(id),
				   content TEXT NOT NULL,
				   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				   upvotes INT DEFAULT 0,
				   downvotes INT DEFAULT 0
		   );

	   `)
	if err != nil {
		panic(err)
	}
	fmt.Println("Tables created successfully")

	name, email := "Enzo", "enzo@treats.com"
	// NOTE:
	// 1. Using db.Exec to insert a sample user
	// which does sanitization to prevent SQL injection.
	// _, err = db.Exec(`
	// INSERT INTO users (name, email)
	// VALUES ($1, $2)
	// `, name, email)
	row := db.QueryRow(`
	INSERT INTO users (name, email)
	VALUES ($1, $2) RETURNING id`, name, email)
	var id string
	err = row.Scan(&id)
	if err != nil {
		panic(err)
	}
	fmt.Println("Sample user inserted. ID: ", id)
}
