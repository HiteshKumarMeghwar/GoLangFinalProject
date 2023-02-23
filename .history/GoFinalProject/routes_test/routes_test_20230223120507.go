package routes_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/database"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/routes"
	"github.com/gofiber/fiber/v2"
)

/* ************************        Login / Register Test Cases       *********************** */

// Testing Register API ......................................
func TestRegister(t *testing.T) {
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	// Create a new user to register
	type User struct {
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Email     string `json:"email"`
		Password  string `json:"password"`
		Phone     string `json:"phone"`
	}

	user := User{
		FirstName: "abc",
		LastName:  "try",
		Email:     "abctry1230@gmail.com",
		Password:  "abctry1230",
		Phone:     "213236423434",
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

// Testing Login API ......................................
func TestLogin(t *testing.T) {
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	type User struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	user := User{Email: "adminadmin@gmail.com", Password: "adminadmin"}

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

/* ****************************************************************************************** */
/* ************************        Post Test Cases       *********************** */

// Testing Create Post API ......................................
func TestCreatePost(t *testing.T) {
	/* Requiring Database Env Variables */
	// database.LoadEnvVariables()
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	// Create a new post
	type Blog struct {
		Title  string `json:"title"`
		Desc   string `json:"desc"`
		Image  string `json:"image"`
		UserID string `json:"userid"`
	}

	user := Blog{
		Title:  "tryPost",
		Desc:   "tryPost Description",
		Image:  "xvlbz_quotes-bckg.jpg",
		UserID: "19",
	}

	// Convert user to JSON
	userJson, err := json.Marshal(user)
	if err != nil {
		t.Fatalf("Failed to marshal user: %v", err)
	}

	req := httptest.NewRequest(http.MethodPost, "/api/createpost", bytes.NewReader(userJson))
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

/* ****************************************************************************************** */
/* ************************        Commodity Module Test Cases       *********************** */

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

/* ****************************************************************************************** */
/* ************************        User Test Cases       *********************** */

// Testing All Users API ......................................
func TestAllUsers(t *testing.T) {
	/* Requiring Database Env Variables */
	// database.LoadEnvVariables()
	database.Connect()
	app := fiber.New()
	routes.Setup(app)

	// Make a POST request to register endpoint
	req := httptest.NewRequest(http.MethodPost, "/api/allUsers", bytes.NewBufferString(`{"id": "19"}`))
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

// Write test cases for the other routes as well
