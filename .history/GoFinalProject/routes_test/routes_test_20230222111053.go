package routes_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/models"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/routes"
	"github.com/gofiber/fiber/v2"
)

func TestRegister(t *testing.T) {
	app := fiber.New()
	routes.Setup(app)

	// Create a new user to register
	user := models.User{
		FirstName: "John",
		LastName:  "Rocco",
		Email:     "johnrocco@gmail.com",
		Password:  "johnrocco",
		Phone:     "54553445653244543",
		// RoleId:    3,
	}

	// Convert user to JSON
	userJson, err := json.Marshal(user)
	if err != nil {
		t.Fatalf("Failed to marshal user: %v", err)
	}

	// Make a POST request to register endpoint
	req := httptest.NewRequest(http.MethodPost, "/api/register", bytes.NewReader(userJson))
	req.Header.Set("Content-Type", "application/json")
	resp, err := app.Test(req, -1)
	if err != nil {
		t.Fatalf("Failed to send request: %v", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}
}

/* func TestLogin(t *testing.T) {
	app := fiber.New()
	routes.Setup(app)

	// Create a new user to login
	user := models.User{
		Email:    "johnrocco@gmail.com",
		Password: "johnrocco",
	}

	// Convert user to JSON
	userJson, err := json.Marshal(user)
	if err != nil {
		t.Fatalf("Failed to marshal user: %v", err)
	}

	// Make a POST request to login endpoint
	req := httptest.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(userJson))
	req.Header.Set("Content-Type", "application/json")
	resp, err := app.Test(req, -1)
	if err != nil {
		t.Fatalf("Failed to send request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}
} */

// Write test cases for the other routes as well
