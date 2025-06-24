package errors

// Wraps the og error with a new error that has a
// "Public() string" method that will return a message.
func Public(err error, msg string) error {
	return publicError{err, msg}
}

// NOTE:
// 1. Idiomatic advice - return struct (concrete) and accept interfaces (abstracts with methods)
type publicError struct {
	err error
	msg string
}

func (pe publicError) Error() string {
	return pe.err.Error()
}

func (pe publicError) Public() string {
	return pe.msg
}

func (pe publicError) Unwrap() error {
	return pe.err
}
