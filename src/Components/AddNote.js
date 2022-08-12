import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import { useNavigate } from "react-router-dom";

function AddNote(props) {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const {  addNote,currentNote, editNote } = context;
  const {heading} = props;
  const [note, setNote] = useState(currentNote);
  // console.log(note)
  
  
  //   Handling submit button
  const handleSubmitButton = (e) => {
   
    e.preventDefault();
    if(heading==='Edit note'){
      editNote(note._id,note.title, note.description, note.tag);
    }
    else if (heading==='Add a note'){
    addNote(note.title, note.description, note.tag);
    }
    navigate("*");
  };

  const handleBackSign = () =>{
    navigate('*')
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <div className="row justify-content-between">
        <h2 className="col-3">{heading}</h2>
        <h2 className="addNote col-3 text-end">
          <i onClick={handleBackSign} className="fa-solid fa-circle-arrow-left"></i>
        </h2>
        <hr />
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={onChange}
              value={note.title??""}
              minLength = {3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              onChange={onChange}
              value={note.description??''}
              minLength = {5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              onChange={onChange}
              value={note.tag??""}

            />
          </div>

          <button
          // disabled={note.title<3 || note.description<5}
            type="submit"
            onClick={handleSubmitButton}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
