package controllers

import (
	"errors"
	"strconv"

	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/database"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetCommodities(c *fiber.Ctx) error {
	var commodities []models.Commodity
	database.DB.Model(&commodities).Find(&commodities)
	return c.JSON(commodities)
}

func AddCommodity(c *fiber.Ctx) error {
	// Parse the request body and create a new commodity
	var commodity models.Commodity
	if err := c.BodyParser(&commodity); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse request body"})
	}
	if err := database.DB.Create(&commodity).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid payload",
		})
	}
	return c.JSON(commodity)
}

func GetCommodityById(c *fiber.Ctx) error {
	var commodity models.Commodity
	id := c.Params("id")
	database.DB.Model(&commodity).Where("id", id).First(&commodity)
	return c.JSON(commodity)
}

func UpdateCommodityById(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	commodity := models.Commodity{
		Id: uint(id),
	}

	if err := c.BodyParser(&commodity); err != nil {
		return c.JSON(fiber.Map{
			"message": "Commodity data not found ... !",
		})
	}
	database.DB.Model(&commodity).Updates(commodity)
	return c.JSON(fiber.Map{
		"message":   "Commodity updated successfully ... !",
		"commodity": commodity,
	})
}

func DeleteCommodityById(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	commodity := models.Commodity{
		Id: uint(id),
	}
	deleteQuery := database.DB.Delete(&commodity)
	if errors.Is(deleteQuery.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Opps!, record not found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Commodity deleted successfully ... !",
	})
}
