# SQL - Postgres

## Simple commands

- DDL: Create table, drop table, drop table if exists table_name, select \* from table_name
- DML: insert into table_name values (...values), update table_name set value_key = value_name where checks
  delete from table_name where check

## Frequently used data types

- int, uuid, serial, varchar, text

## Constraints

- primary key, not null, unique
- Minimal constraints usually in a database for migration purposes. At the same time, it is important to
  avoid race conditions which occur inadvertently because of multiple requests working at the same time on database.

## Resources

- selectstarsql.com
- sqlmurdermystery.com
