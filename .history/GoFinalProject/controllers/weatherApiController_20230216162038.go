package controllers

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/tidwall/gjson"
	"net/http"
)

func (c *fiber.Ctx) error {
	// retrieve location from URL parameter
	location := c.Params("location")

	// make API request to OpenWeatherMap
	resp, err := http.Get(fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s&appid=<API_KEY>&units=metric", location))
	if err != nil {
		log.Fatalf("failed to get weather data: %v", err)
		return c.Status(500).SendString("Failed to get weather data.")
	}

	// extract relevant weather data from response
	defer resp.Body.Close()
	data := gjson.ParseBytes(resp.Body.Bytes())
	weather := data.Get("weather.0.main").String()
	temp := data.Get("main.temp").Float()

	// return weather data as JSON response
	return c.JSON(fiber.Map{
		"location": location,
		"weather":  weather,
		"temp":     temp,
	})
}