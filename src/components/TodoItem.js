import React, { Component } from 'react';
import './TodoItem.css';
import classNames from 'classnames';
import uncheckImg from '../images/uncheck.svg';
import checkCompleteImg from '../images/check-complete.svg';

class TodoItem extends Component {
    render() {
        const { title, isComplete } = this.props.item;
        let url = uncheckImg;

        if (isComplete) {
            url = checkCompleteImg;
        }

        return (
            <div className={classNames('TodoItem', {'TodoItem-complete': isComplete})}>
                <img src={url} onClick={this.props.onClick} />
                <p>{title}</p>
            </div>
        );
    }
}

export default TodoItem;