import { Button} from 'react-bootstrap';

const Todo = ({ todo, removeTodo, markTodo }) => {
  return (
    <div className="todo" >
      <span style={{ textDecoration: todo.status ? "line-through" : "" }}>{todo.name}</span>
      <div>
        <Button id = "Delete" variant="outline-danger" onClick={() => removeTodo(todo.id)}>Delete</Button>
        <Button id = "Done" variant="outline-primary" onClick={() => markTodo(todo.id)}>Done</Button>
      </div>
    </div>
  )
}

export default Todo
