package controllers

import (
	"github.com/gofiber/fiber/v2"
)

func SendMail(c *fiber.Ctx) error {
	payload := struct {
		Id int `json:"id"`
	}{}
	if err := c.BodyParser(&payload); err != nil {
		return err
	}
	id := payload.Id

	/* var mailData models.Mail
	mailData.Userid = id
	if err := c.BodyParser(&mailData); err != nil {
		return err
	}
	if err := database.DB.Create(&mailData).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid payload",
		})
	} */
	return c.JSON(fiber.Map{
		"message": id,
	})
}
