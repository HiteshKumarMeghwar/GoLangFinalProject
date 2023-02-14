package models

type Mail struct {
	Id      uint   `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
	Userid  int    `json:"user_id"`
}
