package models

type Commodity struct {
	Id       uint   `json:"id"`
	Name     string `json:"name"`
	Price    int    `json:"price"`
	Quantity int    `json:"quantity"`
}
