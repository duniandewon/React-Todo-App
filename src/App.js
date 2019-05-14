import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import uuid from 'uuid';
import Axios from 'axios';
import Todos from './components/Todos';
import Header from './components/layout/header';
import Addtodo from './components/Addtodo';
import About from './components/pages/About';
import './App.css';

class App extends React.Component {
  state = {
    todos: []
  }

    componentDidMount () {
      Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(res => this.setState({ todos: res.data }));
    }

    // Add Todo
    addTodo = (title) => {
      Axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      }).then(res => this.setState({todos: [...this.state.todos, res.data]}));
      
    }
    // Toggle Complete
    markComplete = (id) => {
      this.setState({ todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }) });
    }

    // delete todo
    delTodo = (id) => {
      Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
    }

  render() {
    return (
      <Router>
        <div className="App">
          <div className='container'>
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Addtodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
