-- NOTE:
-- 1. docker exec -it <container_id> /usr/bin/psql -U sakamoto -d storyverse
-- 2. Storing token hash again for the same reason we're hashing
-- passwords, since db leak wouldn't lead to leaked ongoing sessions.
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,
    token_hash TEXT UNIQUE NOT NULL
);