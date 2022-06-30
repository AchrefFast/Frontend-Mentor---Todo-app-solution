import React, { useState } from "react";

import { v4 as uuid4 } from "uuid";

import classes from "./Input.module.scss";

const Input = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
    setError(null);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (inputValue.trim().length === 0) {
      setError('Please enter your task...')
      return;
    }
    const new_task = {
      id: uuid4(),
      text: inputValue,
      state: false,
    };
    props.onSubmit(new_task);
    setInputValue("");
  };
  return (
    <React.Fragment>
      <form className={`${classes.input}  ${error ? classes.error : ''}`} onSubmit={submitHandler}>
        <label className={classes["sr-only"]} htmlFor={props.id}>
          {props.label}
        </label>
        <input
          value={inputValue}
          className={`${props.className || ''}`}
          type={props.type}
          id={props.id}
          onChange={inputChangeHandler}
          name={props.name || ""}
          placeholder={error ? error : props.placeholder}
        />
        {/* {error && <p className={classes.error}>{error}</p>} */}
        <button type="submit" className={classes.add}>
          ADD <span className='sr-only'>new task </span>
        </button>
      </form>
    </React.Fragment>
  );
};

export default Input;
