-- +goose Up
-- +goose StatementBegin
CREATE TABLE story (
    ID UUID PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    userID UUID UNIQUE REFERENCES users(id),
    upvotes INT,
    comments INT,
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE story;
-- +goose StatementEnd
