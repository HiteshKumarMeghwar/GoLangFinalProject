package controllers

import (
	"io/ioutil"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber"
)

func TestAPI(t *testing.T) {
	app := fiber.New()

	t.Run("GET /hello", func(t *testing.T) {
		req := httptest.NewRequest("GET", "/hello", nil)
		resp, err := app.Test(req)

		if err != nil {
			t.Errorf("Error sending request: %v", err)
		}

		if resp.StatusCode != 200 {
			t.Errorf("Expected status code 200, but got %d", resp.StatusCode)
		}

		body, err := ioutil.ReadAll(resp.Body)

		if err != nil {
			t.Errorf("Error reading response body: %v", err)
		}

		if string(body) != "Hello, World!" {
			t.Errorf("Expected response body 'Hello, World!', but got '%s'", string(body))
		}
	})
}
