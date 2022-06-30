import React from "react";

import classes from "./ToDoItem.module.scss";
import check from "../Images/icon-check.svg";
import crossItem from "../Images/icon-cross.svg";

const ToDoItem = (props) => {
  return (
    <div className={`${classes.item} ${props.state ? classes.completed : ""}`}>
      <span>{props.text}</span>
      <button
        aria-label="task completed toggle"
        aria-pressed={props.state || false}
        className={classes.state}
        onClick={() => {
          props.onChangeState(props.id);
        }}
        type="button"
      >
        {props.state && <img src={check} alt="Task completed" />}
      </button>
      <button
        aria-label="remove task"
        className={classes.remove}
        onClick={() => {
          props.onRemove(props.id);
        }}
        type="button"
      >
        <img src={crossItem} alt="" />
      </button>
    </div>
  );
};
export default ToDoItem;
