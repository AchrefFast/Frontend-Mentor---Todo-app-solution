import React, { useEffect, useState } from "react";

const todo_list = [
  {
    id: "8f27bf47-a8a5-4ee5-8c92-ec839e38a746",
    text: "Complete online JavaScript course",
    state: true,
  },
  {
    id: "d4871982-eb0f-407c-bcc0-d696b3b76d31",
    text: "Jog around the park 3x",
    state: false,
  },
  {
    id: "c267359f-1e59-41f2-b444-b05a1b5a982f",
    text: "10 minutes meditation",
    state: false,
  },
  {
    id: "a4c7a058-477c-40a3-81ee-da69b3360a81",
    text: "Read for 1 hour",
    state: false,
  },
  {
    id: "8708ba87-03d3-462a-b57b-ba1c4460106c",
    text: "Pick up groceries",
    state: false,
  },
  {
    id: "f56a6a71-43d8-428d-aa29-f73447a6b741",
    text: "Complete Todo App on Frontend Mentor",
    state: false,
  },
];

export const AppContext = React.createContext({
  dark_mode: false,
  changeTheme: () => {},
  tasks: [],
  updateTask: (id) => {},
  addTask: (id) => {},
  removeTask: (id) => {},
  reorderTasks: (result) => {},
  clearCompleted: () => {},
});

export const AppContextProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || todo_list
  );

  const updateTask = (id) => {
    setTasks((prevTasks) => {
      const items = prevTasks;
      const selectedTask = items.find((task) => task.id === id);
      if (!selectedTask) return prevTasks;
      selectedTask.state = !selectedTask.state;
      return [...items];
    });
  };
  const addTask = (task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };
  const reorderTasks = (result) => {
    if (!result.destination) return;
    const items = tasks;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks([...items]);
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => {
      const items = prevTasks.filter((task) => task.id !== id);
      return [...items];
    });
  };

  const changeTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.state === false));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <AppContext.Provider
      value={{
        dark_mode: darkMode,
        changeTheme: changeTheme,
        tasks: tasks,
        addTask: addTask,
        removeTask: removeTask,
        updateTask: updateTask,
        reorderTasks,
        clearCompleted,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
