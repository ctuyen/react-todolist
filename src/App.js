import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import arrow from './images/down-arrow.svg';
import classNames from 'classnames';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      numItems: 2,
      currentFilter: 'todoItems',
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
      let { todoItems, numItems } = this.state;
      const index = todoItems.indexOf(item);

      if (isComplete) {
        numItems++;
      }
      else{
        numItems--;
      }

      if (this.state.currentFilter === 'activeItems') {
        let { activeItems } = this.state;
        activeItems.splice(activeItems.indexOf(item), 1);
        this.setState({
          activeItems: activeItems
        })
      }

      if (this.state.currentFilter === 'completedItems') {
        let { completedItems } = this.state;
        completedItems.splice(completedItems.indexOf(item), 1);
        this.setState({
          completedItems: completedItems
        })
      }

      this.setState({
        newTodo: '',
        numItems,
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

      let { todoItems, numItems } = this.state;

      todoItems.push(newItem);

      this.setState({
        newTodo: '',
        numItems: numItems + 1,
        todoItems
      })
    }
  }

  onChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }

  onAllFilter(e) {
    let { todoItems } = this.state;
    this.setState({
      currentFilter: 'todoItems',
      todoItems: todoItems
    })
  }
  onActiveFilter(e) {
    let { todoItems } = this.state;
    this.setState({
      currentFilter: 'activeItems',
      activeItems: todoItems.filter(item => item.isComplete !== true)
    })
  }
  onCompletedFilter(e) {
    let { todoItems } = this.state;
    this.setState({
      currentFilter: 'completedItems',
      completedItems: todoItems.filter(item => item.isComplete === true)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="Header">
          <img src={arrow} className="arrow" />
          <input type="text" className="NewTodo" placeholder='Enter your task here' onKeyUp={this.onKeyUp.bind(this)} value={this.state.newTodo} onChange={this.onChange.bind(this)}></input>
        </div>
        
        {
          this.state[this.state.currentFilter].length > 0 && 
          this.state[this.state.currentFilter].map((item, index) => 
            <TodoItem key={index} item={item} onClick={this.onItemClicked(item)} />)
        }
        {
          this.state[this.state.currentFilter].length === 0 && 'Nothing here'
        }

        <div className="Footer">
          <span className="TodoCount">{this.state.numItems} items left</span>
          <ul className="TodoFilters" >
            <li className={classNames({'active': this.state.currentFilter === 'todoItems'})} onClick={this.onAllFilter.bind(this)}>All</li>
            <li className={classNames({'active': this.state.currentFilter === 'activeItems'})} onClick={this.onActiveFilter.bind(this)}>Active</li>
            <li className={classNames({'active': this.state.currentFilter === 'completedItems'})} onClick={this.onCompletedFilter.bind(this)}>Completed</li>
          </ul>
          <button>Clear Completed</button>
        </div>
      </div>
    );
  }
}

export default App;
