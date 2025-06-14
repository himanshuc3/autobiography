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
}
