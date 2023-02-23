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

func TryTest(t *testing.T) {
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
