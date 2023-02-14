package controllers

import (
	"errors"
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/bcryptPassword"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/database"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/models"
	"github.com/HiteshKumarMeghwar/GoFinalProjec/MyModule/util"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func validateEmail(email string) bool {
	Re := regexp.MustCompile(`[a-z0-9._%+\-]+@[a-z0-9._%+\-]+\.[a-z0-9._%+\-]`)
	return Re.MatchString(email)
}

func Register(c *fiber.Ctx) error {
	var data map[string]string
	var userData models.User
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// Check if password is less than 6 characters .......
	if len(data["password"]) <= 6 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Password must be greater than 6 characters",
		})
	}

	// Validating Email Address .......
	if !validateEmail(strings.TrimSpace(data["email"])) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid Email Address",
		})
	}

	// Check if email already exist in database ........
	database.DB.Where("email = ?", strings.TrimSpace(data["email"])).First(&userData)
	if userData.Id != 0 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Email already exist",
		})
	}

	pass, _ := bcryptPassword.HashPassword(data["password"])
	user := models.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		Email:     strings.TrimSpace(data["email"]),
		Password:  pass,
		Phone:     data["phone"],
		RoleId:    3,
	}
	database.DB.Create(&user)
	c.Status(200)
	return c.JSON(fiber.Map{
		"message": "Account has been created successfully ...!",
		"user":    user,
	})
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User
	database.DB.Where("email = ?", data["email"]).First(&user)
	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Email Address doesn't exist, Kindly  create an account ... !",
		})
	}

	match := bcryptPassword.CheckPasswordHash(user.Password, data["password"])
	if !match {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "incorrect password",
		})
	}

	token, err := util.GenerateJwt(strconv.Itoa(int(user.Id)))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return nil
	}

	cookie := fiber.Cookie{
		Name:  "jwt",
		Value: token,
		// Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "you have successfully login",
		"user":    user,
		"token":   token,
	})
}

type Claims struct {
	jwt.StandardClaims
}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}
	claims := token.Claims.(*jwt.StandardClaims)
	var user models.User
	database.DB.Where("id = ?", claims.Issuer).First(&user)
	return c.JSON(user)
}

func AllUser(c *fiber.Ctx) error {
	/* cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}
	claims := token.Claims.(*jwt.StandardClaims) */

	payload := struct {
		Id string `json:"id"`
	}{}

	if err := c.BodyParser(&payload); err != nil {
		return err
	}

	id := payload.Id

	var singleUser []models.User
	database.DB.Where("id = ?", id).First(&singleUser)

	var getUsers []models.User
	if singleUser[0].RoleId == 1 {
		// database.DB.Where("id != ?", claims.Issuer).Find(&getUsers)
		database.DB.Where("id != ?", id).Find(&getUsers)
	} else if singleUser[0].RoleId == 2 {
		database.DB.Where("id != ?", id).Where("role_id != ?", 1).Find(&getUsers)
	} else {
		return c.JSON(fiber.Map{
			"data": "",
			"user": singleUser,
		})
	}

	return c.JSON(fiber.Map{
		"data": getUsers,
		"user": singleUser,
	})
}

func SingleUser(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var SingleUser models.User
	database.DB.Where("id=?", id).Preload("Blog").First(&SingleUser)
	return c.JSON(fiber.Map{
		"data": SingleUser,
	})
}

func UpdateProfile(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	user := models.User{
		Id: uint(id),
	}

	if err := c.BodyParser(&user); err != nil {
		fmt.Println("Unable to parse body")
	}
	database.DB.Model(&user).Updates(user)

	return c.JSON(fiber.Map{
		"message": "post updated successfully ... !",
		"user":    user,
	})
}

func UpdateUser(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	user := models.User{
		Id: uint(id),
	}

	payload := struct {
		RoleId int `json:"role_id"`
	}{}

	if err := c.BodyParser(&payload); err != nil {
		return err
	}

	user.RoleId = payload.RoleId

	/* if err := c.BodyParser(&user); err != nil {
		fmt.Println("Unable to parse body")
	}

	database.DB.Model(&user).Updates(user)
	*/
	return c.JSON(fiber.Map{
		"message": "post updated successfully ... !",
		"user":    user,
	})
}

func DeleteUser(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var posts []models.Blog
	database.DB.Where("user_id=?", id).Preload("User").Find(&posts)

	for _, val := range posts {
		deleteQuery := database.DB.Delete(&val)
		if errors.Is(deleteQuery.Error, gorm.ErrRecordNotFound) {
			c.Status(400)
			return c.JSON(fiber.Map{
				"message": "Opps!, user not found",
			})
		}
	}

	User := models.User{
		Id: uint(id),
	}
	deleteQuery := database.DB.Delete(&User)
	if errors.Is(deleteQuery.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Opps!, user not found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "user deleted successfully ... !",
	})
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "Logout Successfully ... !",
	})
}
