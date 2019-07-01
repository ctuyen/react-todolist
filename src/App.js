import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import arrow from './images/down-arrow.svg';

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
        newTodo: '',
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

  onKeyUp(e) {
    if(e.keyCode === 13) {
      let text = e.target.value;
      if (!text || text.trim() === "") {
        return;
      }

      let newItem = {
        title: text,
        isComplete: false
      }

      let { todoItems } = this.state;

      todoItems.push(newItem);

      this.setState({
        newTodo: '',
        todoItems
      })
    }
  }

  onChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Header">
          <img src={arrow} className="arrow" />
          <input type="text" className="NewTodo" placeholder='Enter your task here' onKeyUp={this.onKeyUp.bind(this)} value={this.state.newTodo} onChange={this.onChange.bind(this)}></input>
        </div>
        
        {
          this.state.todoItems.length > 0 && 
          this.state.todoItems.map((item, index) => 
            <TodoItem key={index} item={item} onClick={this.onItemClicked(item)} />)
        }
        {
          this.state.todoItems.length === 0 && 'Nothing here'
        }

        <div className="Footer">
          <span className="TodoCount"></span>
        </div>
      </div>
    );
  }
}

export default App;
