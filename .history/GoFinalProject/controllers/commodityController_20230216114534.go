package controllers

import (
	"strconv"

	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/database"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/models"
	"github.com/gofiber/fiber/v2"
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
	var commodities []models.Commodity
	id := c.Params("id")
	i, _ := strconv.Atoi(id)
	uint := uint(i)
	for _, commodity := range commodities {
		if commodity.Id == uint {
			return c.JSON(commodity)
		}
	}
	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Commodity not found"})
}

func UpdateCommodityById(c *fiber.Ctx) error {
	id := c.Params("id")
	i, _ := strconv.Atoi(id)
	uint := uint(i)
	var commodities []models.Commodity
	var updatedCommodity models.Commodity
	if err := c.BodyParser(&updatedCommodity); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse request body"})
	}
	for i, commodity := range commodities {
		if commodity.Id == uint {
			// Update the commodity and return it
			commodities[i] = updatedCommodity
			return c.JSON(updatedCommodity)
		}
	}
	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Commodity not found"})
}

func DeleteCommodityById(c *fiber.Ctx) error {
	var commodities []models.Commodity
	id := c.Params("id")
	i, _ := strconv.Atoi(id)
	uint := uint(i)
	for i, commodity := range commodities {
		if commodity.Id == uint {
			// Remove the commodity from the slice
			commodities = append(commodities[:i], commodities[i+1:]...)
			return c.SendStatus(fiber.StatusNoContent)
		}
	}
	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Commodity not found"})
}
