import { useContext, useState } from "react";
import NoteContext from "./noteContext";
import authContext from "./noteContext";
import { useNavigate } from "react-router-dom"



const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

const [user, setUser] = useState()
  const [notes, setNotes] = useState(notesInitial);
  const [alert, setAlert] = useState(null);
  const [currentNote, setCurrentNote] = useState('')

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
 
  const handleEdit = async (cNote) => {

    setCurrentNote(cNote)
    
  };
  
  const handleAdd = () =>{
    setCurrentNote({
        "title": "",
        "description": "",
        "tag":""
      })
  }



// Handling Signup
const handleSignup = async (name, email, password) =>{
  const url = `${host}/api/auth/createuser`;
  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({name, email, password }),
  });
  const signupToken = await response.json();
  if(signupToken.success){
    localStorage.setItem('token', signupToken.JWT_Token )
    localStorage.setItem('success', signupToken.success )
    fetchUser();
  console.log(signupToken, localStorage.getItem('token'));

  }
  else{
    showAlert("Email already exists", 'danger')
  }

 
}



  // Logging in
  const handleLogin = async (email, password) => {
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify({ email, password }),
    });
    const loginToken = await response.json();
    if(loginToken.success){
      localStorage.setItem('token', loginToken.JWT_Token )
    localStorage.setItem('success', loginToken.success )
      fetchUser();
    console.log(loginToken.success);
    console.log(user);
  
    }
    else{
      showAlert("Invalid Credentials", "danger")
    }
  
  }

  // Handle Logout
const handleLogout = () =>{
  localStorage.setItem('token', '' )
}

// Fetching current User
const fetchUser = async () => {
  const url = `${host}/api/auth/getuser`;
  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "auth-token":
        localStorage.getItem('token'),
    },
  });
  const parsedData = await response.json();
  localStorage.setItem('user', parsedData.name)
};

  // Deleting a note

  const deleteNote = async (note) => {
    console.log(`NOte deleted with id: ${note._id} `);

    const url = `${host}/api/notes/deletenote/${note._id}`;
    await fetch(url, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
    });
    const newNotes = notes.filter((noted) => {
      return noted._id !== note._id;
    });
    setNotes(newNotes);
    showAlert(`${note.title} DELETED Successfully`, 'danger')
  };

  // Fetching notes

  const fetchNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const parsedData = await response.json();
    setNotes(parsedData);
  };
 


    
  // Adding a note

  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`;
    await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    showAlert(`${title} ADDED Successfully`, 'success')
  };

  // Editing a note

  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    await fetch(url, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    showAlert(`${title} EDITED Successfully`, 'success')

  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        alert,
        showAlert,
        addNote,
        deleteNote,
        fetchNotes,
        handleEdit,
        currentNote,
        handleAdd,
        editNote,
        handleLogin,
        handleSignup,
        handleLogout,
        user
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
