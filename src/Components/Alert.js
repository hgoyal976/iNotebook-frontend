import React,{ useContext } from "react";
import noteContext from "../context/Notes/noteContext";


function Alert(props) {
  const context = useContext(noteContext);
    // const Capitalize = (word) =>{
    //     const lower = word.toLowerCase();
    //     return lower.charAt(0).toUpperCase() + lower.slice(1);
    // }
  return (

      <div>
      {context.alert && <div className={`alert alert-${context.alert.type} alert-dismissible fade show`} role="alert">
                 {context.alert.msg}
      </div>}
      </div>

  );
}

export default Alert;
