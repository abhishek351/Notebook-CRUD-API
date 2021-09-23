import React,{useContext,useState} from "react";

import notecontext from '../context/note/notecontext'
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default function AddNote() {
    const context = useContext(notecontext);
    const {addNote} = context;

    const [note, setnote] = useState({title:" ",description:" "})


    const onChange=(e)=>{
        setnote({...note, [e.target.name]:e.target.value})

    }


    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description)
        setnote({title:"",description:""})

    }
    return (
      <div className="container ">
        <div className="container my-3">
      <center>
        
        <form>
          <div className="container">
          <TextField className=" container my-3" value={note.title} id="title" name="title" label="Title" onChange={onChange} />
          
      
          <TextField   className=" container my-3"  value={note.description}id="description" name="description" label="Description" onChange={onChange} />
          <br/>
          <br/>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Submit
          </Button>
          </div>
        </form>
        </center>
        </div>
</div>
    )
}
