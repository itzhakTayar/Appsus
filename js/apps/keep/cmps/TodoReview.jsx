export function TodoPreview({ note }) {
  const todos = note.info.todos;
  console.log(todos, 'todos');
  return (
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
  );
}
