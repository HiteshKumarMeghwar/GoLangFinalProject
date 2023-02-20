package routes

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	// Login and registration routes ................
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)

	// Middleware for check user is Authenticated or not ...........
	// app.Use(middleware.IsAuthenticate)

	// Post Controller routes ............
	app.Post("/api/createpost", controllers.CreatePost)
	app.Post("/api/allpost", controllers.AllPost)
	app.Get("/api/allpost/:id", controllers.DetailPost)
	app.Put("/api/updatepost/:id", controllers.UpdatePost)
	app.Post("/api/uniquepost", controllers.UniquePost)
	app.Delete("/api/deletepost/:id", controllers.DeletePost)
	// Send Email by user .............
	app.Post("/api/sendMail/:id", controllers.SendMail)

	// Image upload route for practice ..................
	app.Post("/api/upload-image", controllers.Upload)
	app.Static("/api/upload", "./uploads")

	// User and logout routes ..............
	app.Get("/api/user", controllers.User)
	app.Post("/api/allUsers", controllers.AllUser)
	app.Post("/api/allUsers/:id", controllers.SingleUser)
	app.Put("/api/updateProfile/:id", controllers.UpdateProfile)
	app.Put("/api/updateUser/:id", controllers.UpdateUser)
	app.Delete("/api/deleteUser/:id", controllers.DeleteUser)
	app.Post("/api/logout", controllers.Logout)

	// Commodity Module routes ..............
	app.Get("/api/getAllCommodities", controllers.GetCommodities)
	app.Post("/api/addCommodity", controllers.AddCommodity)
	app.Post("/api/getAllCommodities/:id", controllers.GetCommodityById)
	app.Put("/api/updateCommodity/:id", controllers.UpdateCommodityById)
	app.Delete("/api/deleteCommodity/:id", controllers.DeleteCommodityById)
	// Weather API route ....
	app.Post("/api/weatherData/:location", controllers.WeatherAPI)

	// Test Cases routes ..............
	// app.Get("/api/testCase", controllers.TestAPI)
}

func TestRegisterEndpoint(t *testing.T) {
	app := fiber.New()

	// Create a new request with the required payload
	payload := []byte(`{"email":"testuser@gmail.com", "password":"testpassword"}`)
	req := httptest.NewRequest(http.MethodPost, "/api/register", bytes.NewBuffer(payload))
	req.Header.Set("Content-Type", "application/json")

	// Send the request to the app and get the response
	resp, err := app.Test(req, -1)
	if err != nil {
		t.Errorf("Unexpected error: %s", err)
	}

	// Check the response status code and body
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}

	expectedBody := []byte(`{"message":"User created successfully!"}`)
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Errorf("Unexpected error: %s", err)
	}

	if !bytes.Equal(expectedBody, body) {
		t.Errorf("Expected response body %s but got %s", string(expectedBody), string(body))
	}
}
