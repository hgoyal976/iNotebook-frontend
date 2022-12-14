import React, { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import { useNavigate } from "react-router-dom";

function NoteItem(props) {
  const navigate = useNavigate();

  const context = useContext(noteContext);

  const { note} = props;
  const { deleteNote, handleEdit  } = context;

  // const deleteNote = () =>{
  //     context.showAlert('Note deleted!', 'success')
  // }
  const handleEditButton= async ()=>{
    await handleEdit(note)

    navigate('/editnote');
  }

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="flex">
            <div className="row justify-content-between">
              <span id="tag">
                Tags:{" "}
                <span className="badge rounded-pill bg-info">{note.tag}</span>
              </span>
              <div className="text-end col">
                <i
                  onClick={() => {
                    deleteNote(note);
                  }}
                  className="fa-solid fa-trash-can mx-2"
                ></i>
                <i onClick={handleEditButton} className="fa-solid fa-pen-to-square mx-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
