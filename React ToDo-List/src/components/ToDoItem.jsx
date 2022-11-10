import React from "react";

function ToDoItem(props) {
  return (
    <div>
      <table>
        <td className="itemName">{props.text}</td>
        <td>
          <i
            onClick={() => {
              props.onChecked(props.id);
            }}
            className="fas fa-trash-alt trash"
          ></i>
        </td>
      </table>
    </div>
  );
}

export default ToDoItem;
