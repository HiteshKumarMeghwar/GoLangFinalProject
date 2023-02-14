package controllers

import (
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
	return c.JSON(fiber.Map{
		"message": "Congratulations, Your mail has been sent ...!",
	})
}
