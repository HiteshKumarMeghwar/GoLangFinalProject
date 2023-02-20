package main

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
)

/* func TestPingRoute(t *testing.T) {
	app := fiber.New()
	req := httptest.NewRequest(http.MethodGet, "/ping", nil)
	resp, err := app.Test(req, -1)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, resp.StatusCode)
} */

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
