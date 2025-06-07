# Go Modules

## 1. Dependency Management

- TLDR: Semver used
- `go get github.com/username/package` - doesn't necessarily get the latest version of the package.

## 2. Working outside of `GOPATH`

- Deprecated functionality used before go modules where all of the deps used to exist in a central repo (probably offers better caching). Now deprecated.

### 3. Go module package management

- `go mod tidy` - ensures `go.mod` accurately represents code's deps. Adds any missing packages, removes unused packages, updates `go.sum`.
- `go get` - download specific modules. Updates `go.mod`. `-u` flag updates all packages minor/patch versions.
- `go download` - download deps locally. Doesn't modify `go.mod` or `go.sum`.
