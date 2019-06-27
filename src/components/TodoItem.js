import React, { Component } from 'react';
import './TodoItem.css';
import classNames from 'classnames';

class TodoItem extends Component {
    render() {
        const { title, isComplete } = this.props.item;

        return (
            <div className={classNames('TodoItem', {'TodoItem-complete': isComplete})} 
                onClick={this.props.onClick}>
                <p>{title}</p>
            </div>
        );
    }
}

export default TodoItem;