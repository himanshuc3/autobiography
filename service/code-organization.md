# Code organization

A good code structure will:

- Make it easier to guess where bugs are
- Make it easier to add new features
  ...
  Essentially, easy enough to navigate and the code feels like a free-flowing river.

## Separation of Concerns

MVC:

- `models` => data, logic, rules; usually database
- `controller` => connects it all, accepts user input

```bash
myapp/
    controllers/
        user_handler.go
        post_controller.go
        ...
    views/
        user_templates.go
        ...
    models/
        user_store.go
        ...
```

Dependency-based structure:

- Structure based on deps, but with a common set of interfaces and types they all work with.

```bash
myapp/
    user.go # defines a User type
    user_store.go # defines a UserStore interface

    psql/
        user_store.go # implements the UserStore interface witha a Postgresql

```

Extras:

- Domain driven design
- Onion architecture
  ...

## Appendix

1. https://www.gobeyond.dev/crud/ - LLD for APIs
