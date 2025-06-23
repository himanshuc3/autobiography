# Database introduction

Some of the different databases for various situations:

- Relational database - PostgreSQL & MySQL
- Document Stores - MongoDB
- Graph Database - Dgraph & Neo4j
- Key/value stores - BoltDB, etcd

Relational uses indexing for decrease querying time significantly, internally implementing hashing or binary on indexed fields.

## SQL Basics

- Alter tables with foreign keys
- On delete cascade

## Indexing (sorting for columns for faster querying)

- Any fields that are frequently used for querying a record - index
  - Ex: We query sessions using token hash to verify their cookie
  - Ex: We lookup users via their email at the time of login.
- Columns used frequently for joins
- Columns with a `unique` or `primary_key` constraint.
- Small tables, in terms of rows, can have efficient or large number of indexes.

`CREATE INDEX sessions_token_hash_idx ON sessions(token_hash, user_id, id);`

`ON CONFLICT` - for simple and efficient queries in psql

POSTGRES

```
\d <Table_name> - provides meta information (including indexes) for the table

```

## Schema migrations

- To change schema/structure of database (setup using ddl queries).
- Done using some tools - presly/goose

- Schema migration has version which is also stored in databases

```sql
<!-- Creating it alphabetically to execute according to dependency tree -->
001-create-users.sql
002-create-sessions.sql


CREATE TABLE migrations (
  id SERIAL PRIMARY KEY,
  version TEXT UNIQUE
)

INSERT INTO migrations (version) VALUES ('001')

```

goose up - applying migration
goose down

## Schema versioning problems

- Collisions in multiple branches for the same version.
- `goose fix` to fix up serial versioning.
- `git pull origin branchname --rebase` - use it to sync changes, said no one ever.

- Run migrations on application bootup.
- Possible to add migrations in go using goose.
