import React, { useState } from "react";

function InputArea(props) {
  const [items, setItems] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setItems(newValue);
  }

  return (
    <div className="form">
      <input type="text" onChange={handleChange} value={items} />
      <button
        onClick={() => {
          props.click(items);
          setItems("");
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
