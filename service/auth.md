# Authentication & Authorization

4 steps to secure passwords:

1. Use HTTPs to secure our domain
2. Store hashed passwords. Never store encrypted or raw passwords.
3. Add a salt to passwords before hashing.
4. Using time-constant functions during authentication.

- Paid services like Auth0.

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
