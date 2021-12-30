export function TodoPreview(props) {
  // console.log(todos, 'todosvvv');
  // console.log(props, 'props');

  var { todos } = props;
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
