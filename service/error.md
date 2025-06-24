# Handling errors

```go
type error interface {
    Error() string
}

```

- Any struct that implements this interface is an error.

- Propagating the error as it is, to be handled by the called.

```go

if err != nil {
    return err
}
```

- Wrapping errors to provide more context

```go

if err != nil {
    return fmt.Errorf("validation failed in password handler: %w", err)
}
```

- Composition of errors

```go

type EmailError struct {
    email string
    Error error
}

if err != nil {
    emailError, ok := err.(EmailError)
    if ok {
        // process emailError
    }
}
```

## Inspecting wrapped errors

```go

for err != nil {
    if err == sql.ErrNoRows {
        // handle
    }
    err = errors.Unwrap(err)
}


// Alternate
if errors.Is(err, sql.ErrNoRows) {
    // similar to the above functionality
}

if errors.As(err, &temporary_error_type) {
    // handle type assertion in errors
}

```

## Error segregation

1. Public errors - errors that we know we can share
2. Internal errors - anything else
