import { utilsService } from "../../../services/util.service.js";
import { noteService } from "../services/note.service.js";
import { TodoPreview } from "./TodoPreview.jsx";

export class DynamicAdd extends React.Component {
  state = {
    url: "",
    todos: null,
    todo: {
      txt: "",
      id: utilsService.makeId(),
      doneAt: null,
    },
    open: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.open) {
      if (this.props.note.info) {
        if (this.props.note.info.todos) {
          var { todos } = this.props.note.info;
          this.setState({ todos });
          this.setState({ open: true });
        } else if (this.props.note.info.url) {
          var { url } = this.props.note.info;
          console.log(url);
          this.setState({ url });
          this.setState({ open: true });
        }
      }
    }
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    if (field !== "txt") {
      this.props.changeValue(field, value);
      this.setState((prevState) => ({ ...prevState, [field]: value }));
    } else {
      this.setState((prevState) => ({
        todo: { ...prevState.todo, [field]: value },
      }));
    }
  };
  createTodo = () => {
    let { todos } = this.state;
    let { todo } = this.state;
    if (!todos) todos = [];
    todos.unshift(todo);
    this.props.changeValue("todos", todos);
    this.setState({ todos });
    todo = { txt: "", id: utilsService.makeId(), doneAt: null };
    this.setState({ todo });
  };
  render() {
    let isUrl = false;
    let isTodo = false;

    if (this.props.note.type === "img" || this.props.note.type === "video") {
      isUrl = true;
    } else if (this.props.note.type === "todo") isTodo = true;
    let { todos } = this.state;
    return (
      <div>
        {isUrl && (
          <input
            placeholder="Enter url"
            name="url"
            type="text"
            id="url"
            value={this.state.url}
            onChange={this.handleChange}
          ></input>
        )}
        {isTodo && (
          <div className="todo">
            <input
              placeholder="Enter todo"
              name="txt"
              type="text"
              id="todo"
              value={this.state.todo.txt}
              onChange={this.handleChange}
            ></input>
            <button
              className="add-todo-btn"
              type="button"
              onClick={() => {
                this.createTodo();
              }}
            >
              Add
            </button>
            {todos && <TodoPreview todos={todos} />}
          </div>
        )}
      </div>
    );
  }
}
