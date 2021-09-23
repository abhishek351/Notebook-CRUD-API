const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
// fetch notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error ");
  }
});
//add notes
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),

    body("description", "enter a valid desc").isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        
        user: req.user.id,
      });
      const savenote = await note.save();

      res.json({ savenote });
    } catch (error) {
        console.error(error.message)
      res.status(500).send("internal server errors ");
    }
  }
);

//update note
router.put("/updatenotes/:id",fetchuser,async (req, res) => {

  const{title,description}=req.body;
  try {

    
    const newNote={}
    if (title){newNote.title=title}
    if (description){newNote.description=description}
    
    let note=  await Note.findById(req.params.id);
    if(!note){
      return res.status(400).send("not found")}
      
      if(note.user.toString()!=req.user.id){
        return res.status(400).send("not authorized")
        
        
      }
      
      note= await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{newNote:true})
      res.json({note})
      
    } catch (error) {
      console.error(error.message)
      res.status(500).send("internal server errors ");
      
    }
      
      
      
})



//update note
router.delete("/deletenote/:id",fetchuser,async (req, res) => {

  try {
    
    
    
    let note=  await Note.findById(req.params.id);
    if(!note){
      return res.status(400).send("not found")}
      
      if(note.user.toString()!=req.user.id){
        return res.status(400).send("not authorized")
        
        
      }
      
      note= await Note.findByIdAndDelete(req.params.id)
      res.json({"sucsess":"successfully deleted",note:note})
      
    } catch (error) {
      console.error(error.message)
      res.status(500).send("internal server errors ");
      
    }
      
      
      
    })
    module.exports = router;
    