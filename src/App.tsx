import { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TodoList from './components/TodoList';

interface AppProps {}

interface AppState {
  todos: string[];
  newTodo: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
    };
  }

  componentDidMount() {
    console.log('Component is mounted');
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.setState({ todos: JSON.parse(storedTodos) });
    }
  }

  componentWillUnmount() {
    console.log('Component is unmounting');
  }

componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    console.log('Component did update');
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo = () => {
    const { newTodo, todos } = this.state;
    if (newTodo.trim() !== '') {
      this.setState({ todos: [...todos, newTodo], newTodo: '' });
    }
  };

  removeTodo = (index: number) => {
    const updatedTodos = [...this.state.todos];
    updatedTodos.splice(index, 1);
    this.setState({ todos: updatedTodos });
  };

  editTodo = (index: number, updatedTodo: string) => {
    const updatedTodos = [...this.state.todos];
    updatedTodos[index] = updatedTodo;
    this.setState({ todos: updatedTodos });
  };
  

  render() {
    const { todos, newTodo } = this.state;

    return (
      <Container className="main-container">
        <h1 className="mb-4">ToDo List</h1>
        <Form className="input-container">
          <Form.Control
            type="text"
            placeholder="Enter a new todo"
            value={newTodo}
            onChange={(e) => this.setState({ newTodo: e.target.value })}
          />
          <Button className="add-button" onClick={this.addTodo}>
            Add Todo
          </Button>
        </Form>
        <TodoList todos={todos} removeTodo={this.removeTodo} editTodo={this.editTodo} />
      </Container>
    );
  }
}

export default App;
