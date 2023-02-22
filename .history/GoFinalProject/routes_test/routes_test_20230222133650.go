package routes_test

import (
	"net/http"
	"testing"

	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/database"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/routes"
	"github.com/gofiber/fiber/v2"
)

/* func TestRegister(t *testing.T) {
	app := fiber.New()
	routes.Setup(app)

	// Create a new user to register
	user := models.User{
		FirstName: "John",
		LastName:  "Rocco",
		Email:     "johnrocco@gmail.com",
		Password:  "johnrocco",
		Phone:     "54553445653244543",
		RoleId:    3,
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
} */

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

/* func TestGetCommodities(t *testing.T) {
	database.Connect()
	// Create a new fiber app
	app := fiber.New()

	// Define the route and its associated controller function
	app.Get("/api/getAllCommodities", controllers.GetCommodities)

	// Create a new HTTP GET request to the route
	req := httptest.NewRequest(http.MethodGet, "/api/getAllCommodities", nil)

	// Record the HTTP response from the route
	res, err := app.Test(req, -1)

	// Check that there was no error and the HTTP response status is 200 OK
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, res.StatusCode)

	// Parse the response body as JSON and store it in a map
	var data map[string]interface{}
	err = json.NewDecoder(res.Body).Decode(&data)

	// Check that there was no error in parsing the JSON response body
	assert.NoError(t, err)

	// Check that the response data contains a "commodities" field and that it is not empty
	commodities, ok := data["commodities"].([]interface{})
	assert.True(t, ok)
	assert.NotEmpty(t, commodities)
} */

// Write test cases for the other routes as well
