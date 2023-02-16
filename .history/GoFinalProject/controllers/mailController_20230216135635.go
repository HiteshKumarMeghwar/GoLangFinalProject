package controllers

import (
	"strconv"

	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/database"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/models"
	"github.com/gofiber/fiber/v2"
	gomail "gopkg.in/gomail.v2"
)

func SendMail(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var mailData models.Mail
	mailData.Userid = id
	if err := c.BodyParser(&mailData); err != nil {
		return err
	}
	if err := database.DB.Create(&mailData).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid payload",
		})
	}

	// send with gomail
	m := gomail.NewMessage()
	m.SetHeader("From", "hiteshkumarkunri@gmail.com")
	m.SetHeader("To", mailData.Email)
	// m.SetAddressHeader("Cc", "dan@example.com", "Dan")
	m.SetHeader("Subject", mailData.Name)
	m.SetBody("text/html", mailData.Message)
	m.Attach("./uploads/dafpl_books-3.jpg")

	d := gomail.NewDialer("smtp.gmail.com", 587, "hiteshkumarkunri@gmail.com", "onrqhkudckxmmxku")

	// Send the email to Bob, Cora and Dan.
	err := d.DialAndSend(m)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Opps, Your mail has not been sent ...!",
		})
		// panic(err)
	}
	return c.JSON(fiber.Map{
		"message": "Congratulations, Your mail has been sent ...!",
	})
}
