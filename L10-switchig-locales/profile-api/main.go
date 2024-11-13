package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Person struct {
	Name           string   `json:"name"`
	LastName       string   `json:"lastName"`
	Interests      []string `json:"interestNames"`
	Description    string   `json:"description"`
	Quote          string   `json:"quote"`
	ProfilePicture int      `json:"profilePicture"`
}

func main() {
	http.HandleFunc("/people", func(writer http.ResponseWriter, request *http.Request) {
		people := getPeople()
		writer.Header().Set("Content-Type", "application/json")
		err := json.NewEncoder(writer).Encode(people)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	})
	http.HandleFunc("/person", func(writer http.ResponseWriter, request *http.Request) {
		name := request.URL.Query().Get("name")
		people := getPeople()
		for _, person := range people {
			if person.Name == name {
				writer.Header().Set("Content-Type", "application/json")
				err := json.NewEncoder(writer).Encode(person)
				if err != nil {
					http.Error(writer, err.Error(), http.StatusInternalServerError)
					return
				}
				return
			}
		}
		http.Error(writer, "Person not found", http.StatusNotFound)
	})
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Printf("Error starting server: %v\n", err)
		return
	}
}

func getPeople() []Person {
	person1 := Person{
		Name:           "John",
		LastName:       "Doe",
		Interests:      []string{"Kotlin", "Android", "Jetpack Compose"},
		Description:    "Pointing at the cutest person in the room?",
		Quote:          "Here goes cool quote",
		ProfilePicture: 1,
	}
	person2 := Person{
		Name:           "Jane",
		LastName:       "Doe",
		Interests:      []string{"Flutter", "Rust", "DevOps"},
		Description:    "What do you call a Daniel who plays Dungeons and Dragons?\n A DnDaniel",
		ProfilePicture: 1,
		Quote:          "I have a big secret",
	}
	return []Person{person1, person2}
}
