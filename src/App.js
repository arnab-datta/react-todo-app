import React from "react";
import "./App.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskItem: "",
      list: [],
    };
  }

  addTodoItem(todoValue) {
    let val = todoValue.replace(/[^a-zA-Z0-9- ]/g, "");
    if (val.trim() !== "") {
      const newItem = {
        id: Date.now(),
        value: val,
        isDone: false,
      };
      const todoList = [...this.state.list];
      todoList.push(newItem);
      this.setState({
        list: todoList,
        taskItem: "",
      });
    } else {
      alert("failed to add");
    }
  }

  deleteTodoItem(delTaskId) {
    const todoList = [...this.state.list];
    const updatedtodoList = todoList.filter((item) => item.id !== delTaskId);
    this.setState({
      list: updatedtodoList,
    });
  }

  updateInput(inputTask) {
    this.setState({
      taskItem: inputTask,
    });
  }

  handleCheck(isChecked, taskId) {
    let todoList = [...this.state.list];
    const foundItemIndex = todoList.findIndex((item) => item.id === taskId);
    todoList[foundItemIndex].isDone = isChecked;
    this.setState({
      list: todoList,
    });
  }

  render() {
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
                  value={this.state.taskItem}
                  onChange={(e) => this.updateInput(e.target.value)}
                />
                <button
                  className="btn buttonCustom btnColPinkShade"
                  onClick={() => this.addTodoItem(this.state.taskItem)}
                  disabled={!this.state.taskItem.length}
                >
                  Add TODO
                </button>
              </div>
            </div>
          </form>

          <div className="cardParent">
            <ul className="list-group">
              {this.state.list.map((item) => {
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
                        this.handleCheck(e.target.checked, item.id);
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
                      onClick={() => this.deleteTodoItem(item.id)}
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
}

export default App;
