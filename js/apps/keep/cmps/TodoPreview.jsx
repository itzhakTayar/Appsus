import { noteService } from "../services/note.service.js";

export class TodoPreview extends React.Component {
  state = {
    todos: this.props.todos,
  };

  render() {
    var { note } = this.props;
    var { todos } = this.state;

    if (!todos) return <React.Fragment></React.Fragment>;
    return (
      <section>
        {note && (
          <div className="todo-note-header">
            <h1 className="note-preview-title">{note.info.title}</h1>
            <h2>{note.info.txt}</h2>
          </div>
        )}
        <ul>
          {todos.map((todo) => {
            var deleted = todo.doneAt;
            var todoClassName = deleted ? "deleted-todo" : "active-todo";
            return (
              <li key={todo.id} className="todo-item flex">
                <p className={todoClassName}>{todo.txt}</p>
                {!deleted && (
                  <button
                    type="button"
                    className="mark-todo"
                    onClick={() => {
                      if (note) {
                        noteService
                          .setNoteTodos(todo)
                          .then(this.props.renderNote());
                        noteService
                          .sortTodos(todos, note)
                          .then(this.setState({ todos }));
                      } else {
                        todo.doneAt = Date.now();
                        todos = noteService.sortTodos(todos);
                        this.setState({ todos });
                      }
                    }}
                  >
                    X
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
