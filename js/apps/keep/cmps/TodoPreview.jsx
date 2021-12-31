export function TodoPreview(props) {
  var { note } = props;
  var { todos } = props;
  return (
    <section>
      <div className="todo-note-header">
        <h1 className="note-preview-title">{note.info.title}</h1>
        <h2>{note.info.txt}</h2>
      </div>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.txt}
              <button>X</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
