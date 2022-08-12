import React, { useEffect } from "react";
import { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, fetchNotes, handleAdd } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    fetchNotes();
    }
    else{
      navigate('/login')
    }
  });

  

  const handlePlusSign = () => {
    handleAdd()
    navigate("/addnote");
  };

  
  return (
    <>
      

      <h2 className="col-3">Your notes</h2>
      <h2 className="addNote col-3 text-end">
        <i onClick={handlePlusSign} className="fa-solid fa-square-plus"></i>
      </h2>
      <hr />
      <div className="row">
        {notes.length===0&&<div className="text-center"><h3 className=" mt-5">No notes to display</h3><div>Click on '+' sign to add a note</div></div>}
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} handleEdit = {props.handleEdit} />;
        })}
      </div>
    </>
  );
}

export default Notes;
