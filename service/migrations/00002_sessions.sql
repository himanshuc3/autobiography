-- +goose Up
-- +goose StatementBegin
CREATE TABLE sessions (
-- NOTE:
-- 1. docker exec -it <container_id> /usr/bin/psql -U sakamoto -d storyverse
-- 2. Storing token hash again for the same reason we're hashing
-- passwords, since db leak wouldn't lead to leaked ongoing sessions.
    id SERIAL PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    token_hash TEXT UNIQUE NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE sessions;
-- +goose StatementEnd
