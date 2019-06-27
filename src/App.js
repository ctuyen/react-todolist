import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';


class App extends Component {
  constructor() {
    super();
    this.state = {
      todoItems: [
        { title: 'Đi đá bóng', isComplete: true },
        { title: 'Đi chợ' },
        { title: 'Đi siêu thị' }
      ]
    }
  }

  onItemClicked(item) {
    return (e) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);

      this.setState({
        // immutability
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      })
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.todoItems.length > 0 && 
          this.state.todoItems.map((item, index) => 
            <TodoItem key={index} item={item} onClick={this.onItemClicked(item)} />)
        }
        {
          this.state.todoItems.length === 0 && 'Nothing here'
        }
      </div>
    );
  }
}

export default App;
