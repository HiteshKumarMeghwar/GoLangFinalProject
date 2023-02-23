package routes_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/database"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/models"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/routes"
	"github.com/gofiber/fiber/v2"
)

// Testing Register API ......................................
func TestRegister(t *testing.T) {
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	// Create a new user to register
	user := models.User{
		FirstName: "John",
		LastName:  "Rocco",
		Email:     "johnrocco@gmail.com",
		Password:  "johnrocco",
		Phone:     "54553445653244543",
	}

	// Convert user to JSON
	userJson, err := json.Marshal(user)
	if err != nil {
		t.Fatalf("Failed to marshal user: %v", err)
	}

	// Make a POST request to register endpoint
	req := httptest.NewRequest(http.MethodPost, "/api/register", bytes.NewReader(userJson))
	req.Header.Set("Content-Type", "application/json")
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("Failed to send request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}
}

// Testing Login API ......................................
func TestLogin(t *testing.T) {
	database.Connect()
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
}

// Testing All Posts API ......................................
func TestAllPost(t *testing.T) {
	/* Requiring Database Env Variables */
	// database.LoadEnvVariables()
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	req, err := http.NewRequest("POST", "/api/allpost", nil)
	if err != nil {
		t.Fatal(err)
	}

	resp, err := app.Test(req, -1)
	if err != nil {
		t.Fatal(err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}
}

// Testing Single Post API ......................................
func TestSinglePost(t *testing.T) {
	/* Requiring Database Env Variables */
	// database.LoadEnvVariables()
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	req, err := http.NewRequest("GET", "/api/allpost/30", nil)
	if err != nil {
		t.Fatal(err)
	}

	resp, err := app.Test(req, -1)
	if err != nil {
		t.Fatal(err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}
}

// Testing All Commodity Module API ......................................
func TestAllCommodities(t *testing.T) {
	/* Requiring Database Env Variables */
	// database.LoadEnvVariables()
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	req, err := http.NewRequest("GET", "/api/getAllCommodities", nil)
	if err != nil {
		t.Fatal(err)
	}

	resp, err := app.Test(req, -1)
	if err != nil {
		t.Fatal(err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}
}

// Testing Single Commodity Module API ......................................
func TestSingleCommodities(t *testing.T) {
	/* Requiring Database Env Variables */
	// database.LoadEnvVariables()
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	req, err := http.NewRequest("POST", "/api/getAllCommodities/3", nil)
	if err != nil {
		t.Fatal(err)
	}

	resp, err := app.Test(req, -1)
	if err != nil {
		t.Fatal(err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}
}

// Testing All Users API ......................................
func TestAllUsers(t *testing.T) {
	/* Requiring Database Env Variables */
	// database.LoadEnvVariables()
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	// Create a new user to login
	id := models.User{
		Id: 19,
	}

	// Convert user to JSON
	user_id, err := json.Marshal(id)
	if err != nil {
		t.Fatalf("Failed to marshal user: %v", err)
	}

	req, err := http.NewRequest("POST", "/api/allUsers", bytes.NewReader(user_id))
	if err != nil {
		t.Fatal(err)
	}

	resp, err := app.Test(req, -1)
	if err != nil {
		t.Fatal(err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}
}

// Testing Single User API ......................................
func TestSingleUser(t *testing.T) {
	/* Requiring Database Env Variables */
	// database.LoadEnvVariables()
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	req, err := http.NewRequest("POST", "/api/allUsers/19", nil)
	if err != nil {
		t.Fatal(err)
	}

	resp, err := app.Test(req, -1)
	if err != nil {
		t.Fatal(err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}
}

// Testing Weather API ......................................
func TestWeatherCommodity(t *testing.T) {
	/* Requiring Database Env Variables */
	// database.LoadEnvVariables()
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	req, err := http.NewRequest("POST", "/api/weatherData/jamshoro", nil)
	if err != nil {
		t.Fatal(err)
	}

	resp, err := app.Test(req, -1)
	if err != nil {
		t.Fatal(err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}
}

// Write test cases for the other routes as well
