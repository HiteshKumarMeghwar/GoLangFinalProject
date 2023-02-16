package controllers

import (
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
	var commodities []models.Commodity
	// Parse the request body and create a new commodity
	var commodity models.Commodity
	if err := c.BodyParser(&commodity); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse request body"})
	}
	commodities = append(commodities, commodity)
	return c.JSON(commodity)
}

/* func getCommodityById(c *fiber.Ctx) error {
	var commodities []models.Commodity
    id := c.Params("id")
    for _, commodity := range commodities {
        if commodity.Id == id {
            return c.JSON(commodity)
        }
    }
    return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Commodity not found"})
} */
