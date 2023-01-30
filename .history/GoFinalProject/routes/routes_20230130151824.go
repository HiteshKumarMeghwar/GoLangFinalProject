package routes

import (
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

	// Image upload route for practice ..................
	app.Post("/api/upload-image", controllers.Upload)
	app.Static("/api/upload", "./uploads")

	// User and logout routes ..............
	app.Get("/api/user", controllers.User)
	app.Post("/api/allUsers", controllers.AllUser)
	app.Post("/api/allUsers/:id", controllers.SingleUser)
	app.Put("/api/updateProfile/:id", controllers.UpdateProfile)
	app.Put("/api/updateUser", controllers.UpdateUser)
	app.Delete("/api/deleteUser/:id", controllers.DeleteUser)
	app.Post("/api/logout", controllers.Logout)
}
