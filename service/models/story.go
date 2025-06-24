package models

import "database/sql"

type Story struct {
	ID          string
	UserID      string
	Title       string
	Image       string
	description string
	Upvotes     int
	Comments    int
}

type StoryService struct {
	DB *sql.DB
}

func (service *StoryService) Create(title, image, description, userID string) (*Story, error) {
	return nil, nil
}
