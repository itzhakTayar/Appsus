import { utilsService } from '../../../services/util.service.js';
import { TodoPreview } from './TodoPreview.jsx';

export class DynamicAdd extends React.Component {
  state = {
    url: '',
    todos: null,
    todosTxt: '',
  };
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;

    this.props.changeValue(field, value);
    this.setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  createTodo = () => {
    let { todos } = this.state;
    var txt = this.state.todosTxt;
    if (!todos) todos = [];
    todos.unshift({ txt, id: utilsService.makeId() });
    this.props.changeValue('todos', todos);
    this.setState({ todos });
  };
  render() {
    let isUrl = false;
    let isTodo = false;

    if (this.props.note.type === 'img' || this.props.note.type === 'video') {
      isUrl = true;
    } else if (this.props.note.type === 'todo') isTodo = true;
    let { todos } = this.state;
    // console.log('todos', todos);
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
              name="todosTxt"
              type="text"
              id="todo"
              value={this.state.todosTxt}
              onChange={this.handleChange}
            ></input>
            <button
              type="button"
              onClick={() => {
                this.createTodo();
              }}
            >
              add
            </button>
            {/* {todos && <h1>helo</h1>} */}
            {todos && <TodoPreview todos={todos} />}
          </div>
        )}
      </div>
    );
  }

  //   case 'img':
  //     return <ImgPreview note={props.note} />;
  //   case 'video':
  //     return <VideoPreview note={props.note} />;
  //   case 'todo':
  //     return <TodoPreview note={props.note} />;
  //   default:
  //     return <React.Fragment></React.Fragment>;
}
