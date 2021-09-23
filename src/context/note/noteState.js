import { useState } from "react";
import notecontext from "./notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialState = [];

  const [notes, setnotes] = useState(initialState);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNTE0ZDJmNWM5Yzc1MjIyYjIxMDdjIn0sImlhdCI6MTYzMTAzNTg1MX0.84HZ2U7tFH_6xcruxOLBQVoYmqgWp0vg98RFQW-YMhU",
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  const addNote = async (title, description) => {
    const response = await fetch(`${host}/api/notes/addnotes/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNTE0ZDJmNWM5Yzc1MjIyYjIxMDdjIn0sImlhdCI6MTYzMTAzNTg1MX0.84HZ2U7tFH_6xcruxOLBQVoYmqgWp0vg98RFQW-YMhU"
      },

      body: JSON.stringify({ title, description }),
    });

    const json = await response.json();
    console.log(json);

    const note = {
      _id: "613ba98466e96212805eb193",
      user: "613514d2f5c9c75222b2107c",
      title: title,
      description: description,
      __v: 0,
    };
    setnotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNTE0ZDJmNWM5Yzc1MjIyYjIxMDdjIn0sImlhdCI6MTYzMTAzNTg1MX0.84HZ2U7tFH_6xcruxOLBQVoYmqgWp0vg98RFQW-YMhU",
      },
    });
    const json = response.json();
    console.log(json);
    console.log("deleting the node " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  const editNote = async (id, title, description) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNTE0ZDJmNWM5Yzc1MjIyYjIxMDdjIn0sImlhdCI6MTYzMTAzNTg1MX0.84HZ2U7tFH_6xcruxOLBQVoYmqgWp0vg98RFQW-YMhU",
      },

      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;

        break;
      }
    }
    setnotes(newNotes);
  };

  return (
    <notecontext.Provider
      value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </notecontext.Provider>
  );
};

export default NoteState;
