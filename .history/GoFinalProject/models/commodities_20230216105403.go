package models

type Commodity struct {
	Name     string `json:"name"`
	Price    int    `json:"price"`
	Quantity int    `json:"quantity"`
}
