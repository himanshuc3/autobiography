package db

import (
	"database/sql"

	_ "github.com/jackc/pgx/v5/stdlib" // Importing the pgx driver for PostgreSQL
)

func main() {
	db, err := sql.Open("pgx", `host=localhost port=5432 
	user=sakamoto password=sakamoto dbname=memoir 
	sslmode=disable`)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	fmt.
}
