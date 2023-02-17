package controllers

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/tidwall/gjson"
)

func WeatherAPI(c *fiber.Ctx) error {
	// retrieve location from URL parameter
	location := c.Params("location")

	// make API request to OpenWeatherMap
	resp, err := http.Get(fmt.Sprintf("https://api.openweathermap.org/data/2.5/weather?q=%s&appid=01f0eae2785693f747fb275f59735f95&units=metric", location))
	if err != nil {
		log.Fatalf("failed to get weather data: %v", err)
		return c.Status(500).SendString("Failed to get weather data.")
	}

	// extract relevant weather data from response
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("failed to read response body: %v", err)
		return c.Status(500).SendString("Failed to read response body.")
	}
	data := gjson.ParseBytes(body)
	weather := data.Get("weather.0.main").String()
	weather_icon := data.Get("weather.0.icon").String()
	my_location := data.Get("name").String()
	temp := data.Get("main.temp").Float()

	// return weather data as JSON response
	return c.JSON(fiber.Map{
		"location":    my_location,
		"weather":     weather,
		"temp":        temp,
		"weatherIcon": weather_icon,
	})
}
