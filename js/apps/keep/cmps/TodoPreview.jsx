export function TodoPreview({ note }) {
  console.log(TodoPreview);
  const todos = note.info.todos;
  console.log(todos, 'todos');
  return (
    <ul>
      {todos.map((todo) => {
        console.log(todo);
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
