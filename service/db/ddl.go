package database

import (
	"database/sql"
	"fmt"
)

// NOTE:
// 1. Using the init function to register the PostgreSQL driver
// which is run before the main function (called a side effect).

// _ "github.com/jackc/pgx/v5/stdlib" // Importing the pgx driver for PostgreSQL

// func readingRows(db *sql.DB) {

// 	type UserStories struct {
// 		ID          string
// 		UserID      string
// 		title       string
// 		description string
// 	}

// 	var userStories []UserStories
// 	rows, err := db.Query("SELECT id, user_id, title, description FROM user_stories where user_id= $1", "some-user-id")

// 	if err != nil {
// 		panic(err)
// 	}
// 	defer rows.Close()

// 	for rows.Next() {
// 		var story UserStories

// 		var id, title, description string
// 		err := rows.Scan(&id, &title, &description)
// 		if err != nil {
// 			panic(err)
// 		}
// 		userStories = append(userStories, story)
// 	}

// 	if err = rows.Err(); err != nil {
// 		panic(err)
// 	}
// }

// NOTE:
// 1. ORMs vs SQL code
func Init(db *sql.DB) {

	// err := db.Ping()
	// if err != nil {
	// 	panic(err)
	// }

	// NOTE:
	// 1. Query using db.Query, db.QueryRow, db.Exec, QueryContext etc.

	_, err := db.Exec(`
	   CREATE TABLE IF NOT EXISTS users (
		id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
		password_hash TEXT NOT NULL,
		first_name TEXT NOT NULL,
		last_name TEXT NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

}
