import React, { useContext, useEffect, useRef,useState } from "react";
import notecontext from "../context/note/notecontext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { TextField } from "@material-ui/core";


function Notes() {
  const context = useContext(notecontext);
  const { notes, getNotes,editNote } = context;
  
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setnote] = useState({id:"",etitle:"",edescription:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description})
  };


  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {

    console.log("upadting" ,note);
    editNote(note.id,note.etitle,note.edescription)
    refClose.current.click()
    
  };
  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Notes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="container">
                  <TextField
                    className=" container my-3"
                    id="etitle"
                    name="etitle"
                    label="Title"
                    value={note.etitle}
                    onChange={onChange}
                  />

                  <TextField
                    className=" container my-3"
                    id="edescription"
                    name="edescription"
                    label="description"
                    value={note.edescription}
                    onChange={onChange}
                  />
                  <br />
                  <br />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
    </>
  );
}

export default Notes;
