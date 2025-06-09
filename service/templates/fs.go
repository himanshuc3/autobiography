package templates

import "embed"

// NOTE:
// 1. Embed files into the binary like templates so that it doesn't
// pick it up from the file system (for production)
// 2. Variadic varameters - similar to JS
// 3. Anonymous structs and functions exist. hmmm.
// 4. Interfaces are used to abstract away the implementation details of a type:
// Essentially replace a type with a contract, mostly useful when we are going
// to be using functions on the type and not accessing data directly.
//
//go:embed *
var FS embed.FS
