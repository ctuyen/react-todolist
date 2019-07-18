import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import arrow from './images/down-arrow.svg';
import classNames from 'classnames';

class App extends Component {
  constructor() {
    super();

    let dataString = localStorage.getItem('todoItems');
    let todoItems;

    if (dataString) {
      todoItems = JSON.parse(dataString);
    }
    else {
      todoItems = []
    }

    let numItems = todoItems.filter(item => item.isComplete !== true).length;

    this.state = {
      newItem: '',
      numItems,
      currentFilter: 'todoItems',
      todoItems
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

      // immutability
      todoItems = [
        ...todoItems.slice(0, index),
        {
          ...item,
          isComplete: !isComplete
        },
        ...todoItems.slice(index + 1)
      ];

      localStorage.setItem('todoItems', JSON.stringify(todoItems));

      this.setState({
        newTodo: '',
        numItems,
        todoItems
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
      let activeItems = todoItems.filter(item => item.isComplete !== true);
      todoItems.push(newItem);
      activeItems.push(newItem);

      this.setState({
        newTodo: '',
        numItems: numItems + 1,
        todoItems,
        activeItems
      })

      localStorage.setItem('todoItems', JSON.stringify(todoItems));
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

  onDelComplete(e) {
    let { todoItems } = this.state;
    todoItems = todoItems.filter(item => item.isComplete !== true);

    this.setState({
      todoItems,
      completedItems: [],
      numItems: todoItems.length
    })

    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }

  onSelectAll(e) {
    let todoItems = this.state.todoItems;
    let numItems = this.state.numItems;
    
    let newTodos = todoItems.map((todo) => {
      if(numItems !== 0){
        todo.isComplete = true;
      } else {
        todo.isComplete = false;
      }
      return todo;
    });

    //allCompleted = !allCompleted;
    numItems = numItems ? 0 : newTodos.length;

    this.setState({
      todoItems: newTodos,
      numItems
    });

    localStorage.setItem('todoItems', JSON.stringify(newTodos));
  }

  render() {
    return (
      <div className="App">
        <div className="Header">
          <img src={arrow} className="arrow" onClick={this.onSelectAll.bind(this)} />
          <input type="text" className="NewTodo" placeholder='Enter your task here' onKeyUp={this.onKeyUp.bind(this)} value={this.state.newTodo} onChange={this.onChange.bind(this)}></input>
        </div>
        
        {
          this.state[this.state.currentFilter].length > 0 && 
          this.state[this.state.currentFilter].map((item, index) => 
            <TodoItem key={index} item={item} onClick={this.onItemClicked(item)} />)
        }
        {
          this.state[this.state.currentFilter].length === 0 && <p className='Nothing'>Nothing here</p>
        }

        <div className="Footer">
          <span className="TodoCount">{this.state.numItems} item(s) left</span>
          <ul className="TodoFilters" >
            <li className={classNames({'active': this.state.currentFilter === 'todoItems'})} onClick={this.onAllFilter.bind(this)}>All</li>
            <li className={classNames({'active': this.state.currentFilter === 'activeItems'})} onClick={this.onActiveFilter.bind(this)}>Active</li>
            <li className={classNames({'active': this.state.currentFilter === 'completedItems'})} onClick={this.onCompletedFilter.bind(this)}>Completed</li>
          </ul>
          <button onClick={this.onDelComplete.bind(this)}>Clear Completed</button>
        </div>
      </div>
    );
  }
}

export default App;
