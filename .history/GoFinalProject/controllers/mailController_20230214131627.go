package controllers

import (
	"net/smtp"
	"strconv"

	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/database"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/models"
	"github.com/gofiber/fiber/v2"
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

	auth := smtp.PlainAuth(
		"",
		"hiteshkumarkunri@gmail.com",
		"onrqhkudckxmmxku",
		"smtp.gmail.com",
	)
	msg := "Subject: My special subject\nThis is the body of my email"
	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"hiteshkumarkunri@gmail.com",
		[]string{"hiteshkumarkunri@gmail.com"},
		[]byte(msg),
	)

	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Opps, Your mail has not been sent ...!",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Congratulations, Your mail has been sent ...!",
	})
}
