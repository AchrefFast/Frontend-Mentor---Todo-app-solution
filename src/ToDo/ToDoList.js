import React, { useContext, useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AppContext } from "../context/app-context";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classes from "./ToDoList.module.scss";

const ToDoList = (props) => {
  const context = useContext(AppContext);
  const [filter, setFilter] = useState(null);
  const tasks = context.tasks;
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 580px)").matches
  );

  const changeStateHandler = (id) => {
    context.updateTask(id);
  };
  const removeItemHandler = (id) => {
    context.removeTask(id);
  };

  const dragEndHandler = (result) => {
    context.reorderTasks(result);
  };

  const showAllHandler = () => {
    setFilter(null);
  };
  const showActiveHandler = () => {
    setFilter("active");
  };
  const showCompletedHandler = () => {
    setFilter("completed");
  };

  const clearCompletedHandler = () => {
    context.clearCompleted();
  };

  useEffect(() => {
    window
      .matchMedia("(min-width: 580px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  let taskList;

  if (!filter) {
    taskList = tasks;
  } else if (filter === "completed") {
    taskList = tasks.filter((task) => task.state === true);
  } else if (filter === "active") {
    taskList = tasks.filter((task) => task.state === false);
  }

  return (
    <React.Fragment>
      <div className={classes["to-do-list"]}>
        {/* Used the react-beautiful-dnd to handle the drag and drop functionality */}
        <DragDropContext onDragEnd={dragEndHandler}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                <TransitionGroup>
                  {taskList.map((item, index) => (
                    <CSSTransition
                      key={item.id}
                      timeout={{
                        appear: 0,
                        enter: 0,
                        exit: 150,
                      }}
                      classNames={{
                        enterActive: classes.MyClassEnterActive,
                        enterDone: classes.MyClassEnterDone,
                        exitActive: classes.MyClassExitActive,
                        exitDone: classes.MyClassExit,
                      }}
                    >
                      <Draggable draggableId={item.id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ToDoItem
                              text={item.text}
                              id={item.id}
                              state={item.state}
                              onChangeState={changeStateHandler}
                              onRemove={removeItemHandler}
                            />
                          </li>
                        )}
                      </Draggable>
                    </CSSTransition>
                  ))}
                  {provided.placeholder}
                </TransitionGroup>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <footer>
          <span className={classes.count}>{`${
            taskList.filter((task) => task.state === false).length
          } Items left`}</span>
          {matches && (
            <nav>
              <ul>
                <li>
                  <button
                    className={!filter ? classes.active : ""}
                    type="button"
                    onClick={showAllHandler}
                  >
                   <span className='sr-only'>Show </span>  All <span className='sr-only'>tasks </span> 
                  </button>
                </li>
                <li>
                  <button
                    className={filter === "active" ? classes.active : ""}
                    type="button"
                    onClick={showActiveHandler}
                  >
                   <span className='sr-only'>Show only </span>  Active <span className='sr-only'> tasks</span> 
                  </button>
                </li>
                <li>
                  <button
                    className={filter === "completed" ? classes.active : ""}
                    type="button"
                    onClick={showCompletedHandler}
                  >
                   <span className='sr-only'>Show only </span> Completed <span className='sr-only'> tasks</span>
                  </button>
                </li>
              </ul>
            </nav>
          )}
          <button type="button" onClick={clearCompletedHandler}>
            Clear Completed <span className='sr-only'>tasks</span> 
          </button>
        </footer>
      </div>
      {!matches && (
        <nav className={classes.navList}>
          <ul>
            <li>
              <button
                className={!filter ? classes.active : ""}
                type="button"
                onClick={showAllHandler}
              >
                 <span className='sr-only'>Show </span>  All <span className='sr-only'>tasks </span> 
              </button>
            </li>
            <li>
              <button
                className={filter === "active" ? classes.active : ""}
                type="button"
                onClick={showActiveHandler}
              >
                 <span className='sr-only'>Show </span>  Active <span className='sr-only'>tasks </span> 
              </button>
            </li>
            <li>
              <button
                className={filter === "completed" ? classes.active : ""}
                type="button"
                onClick={showCompletedHandler}
              >
                 <span className='sr-only'>Show </span>  Completed <span className='sr-only'>tasks </span> 
              </button>
            </li>
          </ul>
        </nav>
      )}
    </React.Fragment>
  );
};

export default ToDoList;
