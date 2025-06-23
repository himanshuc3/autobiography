# Authentication & Authorization

4 steps to secure passwords:

1. Use HTTPs to secure our domain
2. Store hashed passwords. Never store encrypted or raw passwords.
3. Add a salt to passwords before hashing.
4. Using time-constant functions during authentication.

- Paid services like Auth0.

## Cookies

1. Can be stored using the BE by sending the `set-cookie` header.
2. Server rendered applications prefer `cookies` to storing `jwt` for authentication.

## What is a hash function?

- Arbitrary data -> result of fixed size using the data
- Given the same input -> same output
- Cannot be reversed - given the hash and hash function, can't get
  the original input to hash function.
- HMAC - common hash function - sha256 (AES is for encryption, not hashing)
  - Uses secret key, data and salt -> algorithm -> hash value

## Uses of hash functions

- Hash maps (`map` in go)
- Securing passwords
- Digitally signing data

## Password managers

- Encryption key is never on the server; stored locally on user device (if we get a new device??)

## Salting hashes

Goal: design a syshtum so attackers can get a copy of our DB and still not guess passwords.

Rainbow Table: A table of common passwords, generate hash and do intersection with our DB of hashed passwords.

Add salt, to prevent this intersection. It is saved alongside password-hash and makes brute force attacks much harder and computationally intensive.

- Pepper - application wide same salt for all users

## XSS vs CSRF

- XSS - external malicious scripts injected in our domain/website. Can be prevented by restricting access of cookie to client js.
- Adding vectors or layers of security to prevent incorrect auth.
- CSRF - to whitelist your data, cookies, apis etc. to a specific domain (cookies leakage)
  - Add a token unique to client for each user and give the token in body/header

## Cookie theft

- Packet sniffing: catch and grab.
  - Https: encryption of packets
- Available Https TLS certificate services(Caddy)
- Fireship - for public wifi packet sniffing, fetching public unencrypted profiles of cookies/data
- Limit users to 1 session
- Cookie tampering
  - Digitally signing
- JWT - a standard for digitally signing JSON data

## Middleware

- Accept http handler, wrap it and return a modified handler (used for auth, logging, profilling etc.)

## Obfuscation

- Cookies are stored in database storing signed user string mapped to a userid

user_id or email | random_string_cookie
2343433 | svss43sdw3

## Why not JWTs

Complexity without enough benefits

- Expiration
- Refresh token, so need sessions anyway

## Base64

- Encoding algorithm that converts text to 64 characters: A-Z, a-z, +, /
  - Useful for safe transmission of text over networks
