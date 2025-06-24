package main

import (
	"os"

	"github.com/go-mail/mail/v2"
)

func main() {
	to := "go@lun.com"
	msg := mail.NewMessage()
	msg.SetHeader("To", to)
	msg.WriteTo(os.Stdout)
}
