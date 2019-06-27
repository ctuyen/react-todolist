import React, { Component } from 'react';
import './TodoItem.css';
import classNames from 'classnames';

class TodoItem extends Component {
    render() {
        var itemClass = classNames(
            'TodoItem',
            {'TodoItem-complete': this.props.item.isComplete}
        )
        return (
            <div className={itemClass}>
                <p>{this.props.item.title}</p>
            </div>
        );
    }
}

export default TodoItem;