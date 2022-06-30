import { useContext } from "react";
import "./App.css";
import { AppContext } from "./context/app-context";
import moon from "./Images/icon-moon.svg";
import sun from "./Images/icon-sun.svg";
import ToDoList from "./ToDo/ToDoList";
import Input from "./UIElements/Input";

function App() {
  const context = useContext(AppContext);
  return (
    <div className={`container ${context.dark_mode ? "dark-mode" : ""}`}>
      <div className="App">
        <div className="app-content">
          <header className="header">
            <h1>todo</h1>
            <button
              type="button"
              onClick={context.changeTheme}
              aria-label="dark mode"
              role="switch"
              aria-checked={context.dark_mode}
            >
              {!context.dark_mode && <img src={moon} alt="change mode" />}
              {context.dark_mode && <img src={sun} alt="change mode" />}
            </button>
          </header>
          <main>
            <Input
              id="add-task"
              label="Add a new task"
              placeholder="Create a new todo..."
              onSubmit={context.addTask}
            />
            <ToDoList />
          </main>
        </div>
        <footer className="app-footer">
          <p>Drag and drop to reorder list</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
