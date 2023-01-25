package controllers

import (
	"net/http"

	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("super-secret"))

func Auth(tpl Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		/* Requiring Database */
		// db := database.Connect()

		/* if r.URL.Path == "/" {
			session, _ := store.Get(r, "session")
			id, ok := session.Values["userId"]
			fmt.Println("ok: ", ok)
			if !ok {
				http.Redirect(w, r, "/", http.StatusFound) // http.StatusFound is 302
				return
			}
			fmt.Println(id)
		} */
		tpl.Execute(w, nil)
	}
}
