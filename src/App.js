import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./App.css";

function App() {
  const [taskItem, setTaskItem] = useState("");
  const [taskListArr, setTaskListArr] = useState([]);

  const addTodoItem = (todoValue, e) => {
    e.preventDefault();
    let val = todoValue.replace(/[^a-zA-Z0-9- ]/g, "");
    if (val.trim() !== "") {
      const newItem = {
        id: Date.now(),
        value: val,
        isDone: false,
      };
      const todoList = [...taskListArr];
      todoList.push(newItem);
      setTaskItem("");
      setTaskListArr(todoList);
    } else {
      setTaskItem("");
      Swal.fire({
        icon: "error",
        title: "Invalid or Empty Task",
        focusConfirm: false,
        confirmButtonColor: "#2b2d5d",
      });
    }
  };

  const deleteTodoItem = (delTaskId) => {
    const todoList = [...taskListArr];
    const updatedtodoList = todoList.filter((item) => item.id !== delTaskId);
    setTaskListArr(updatedtodoList);
  };

  const updateInput = (inputTask) => {
    setTaskItem(inputTask);
  };

  const handleCheck = (isChecked, taskId) => {
    let todoList = [...taskListArr];
    const foundItemIndex = todoList.findIndex((item) => item.id === taskId);
    todoList[foundItemIndex].isDone = isChecked;
    setTaskListArr(todoList);
  };

  return (
    <div>
      <div className="container">
        <form className="frmMrgn">
          <div className="form-group">
            <h1 className="text-center">Todo App</h1>
            <div className="input-group-prepend centerAlign">
              <input
                type="search"
                className="form-control"
                placeholder="What to do ??"
                required
                value={taskItem}
                onChange={(e) => updateInput(e.target.value)}
              />
              <button
                className="btn buttonCustom btnColPinkShade"
                onClick={(e) => addTodoItem(taskItem, e)}
                disabled={!taskItem.length}
              >
                Add TODO
              </button>
            </div>
          </div>
        </form>

        <div className="cardParent">
          <ul className="list-group">
            {taskListArr.map((item) => {
              return (
                <li
                  key={item.id}
                  className="list-group-item d-flex  centerAlign lstItem"
                >
                  <input
                    type="checkbox"
                    name="isDone"
                    checked={item.isDone}
                    onChange={(e) => {
                      handleCheck(e.target.checked, item.id);
                    }}
                  />
                  <div className="tt">{item.value}</div>
                  <span
                    className={`badge badge-pill customBdg ${
                      item.isDone === false ? "badge-danger" : "badge-success"
                    }`}
                  >
                    {`${item.isDone === false ? `pending` : "Done"}`}
                  </span>
                  <button
                    className="btn btn-danger buttonCustom"
                    disabled={!item.isDone}
                    onClick={() => deleteTodoItem(item.id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
