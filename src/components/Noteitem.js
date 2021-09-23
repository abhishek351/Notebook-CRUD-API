import React,{useContext}  from "react";

import notecontext from '../context/note/notecontext'

import DeleteIcon from "@material-ui/icons/Delete";

import Button from "@material-ui/core/Button";

const Noteitem = (props) => {
  const { note ,updateNote} = props;
  const context = useContext(notecontext);
  const {deleteNote} = context;

  return (
    <div  className="container">
      

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">title</th>
            <th scope="col">Description</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"></th>
            <td>{note.title}</td>
            <td>{note.description}</td>
            <td>
              <Button
              onClick={()=>{deleteNote(note._id)}}
                id="updateBtn"
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                >
                Delete
              </Button>
              <Button id="updateBtn" variant="contained" onClick={()=>{updateNote(note)}}>
                Edit
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
             
    </div>
  );
};

export default Noteitem;
