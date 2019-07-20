import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import './style.css';

class TodoList extends Component {

    constructor(props) {
        super(props);
        // 组件的状态
        this.state = {
            inputValue: '',
            list: []
        }
    }

    /*componentWillMount() {
        console.log('willMount');
    }

    componentDidMount() {
        console.log('DidMount');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillUpdate');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate');
    }*/

    render() {
        return (
            <Fragment>
                <div>
                    <label htmlFor='insertArea'>输入内容</label>
                    <input
                        id='insertArea'
                        className='input'
                        value = {this.state.inputValue}
                        onChange = {this.handleInputChange}
                        ref={(input) => {this.input = input}}
                    />{/* 绑定this，否则函数的this指向是错误的 */}

                    <button onClick={this.handleBtnClick}>提交</button>
                </div>

                <ul ref={(ul) => {this.ul = ul}}>
                   { this.getItem() }
                </ul>
            </Fragment>
        )
    }

    componentDidMount() {

    }

    getItem = () => {
        return this.state.list.map((item, index) => {
            return (
                <TodoItem
                    key={index}
                    content={item}
                    index={index}
                    deleteItem={this.handleItemDelete}/>
            )
        })
    };

    handleInputChange = (e) => {
        // const value = this.input.value;
        const value = e.target.value;
        this.setState(() => ({
            inputValue: value
        }));
    };

    handleBtnClick = () => {
        // prevState 防止改变this.state的状态
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }), () => {
            // setState是异步函数
            console.log(this.ul.querySelectorAll('div').length);
        });
    };

    handleItemDelete = (index) => {
        this.setState((prevState) => {
            const list = [...prevState.list];
            list.splice(index, 1);
            return {list}
        });

        /*const list = [...this.state.list];
        list.splice(index, 1);
        this.setState({
            list: list
        })*/
    };


}

export default TodoList;