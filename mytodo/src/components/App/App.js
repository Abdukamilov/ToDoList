import React, { Component } from 'react';
import AppHeader from '../AppHeader';
import ItemStatusFilter from '../ItemStatusFilter';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemAddForm from '../ItemAddForm';
import './App.css';

export default class App extends Component {

    maxId = 100;

    state = {
        TodoData: [],
        term: '',
        filter: ''
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ TodoData }) => {
            const idx = TodoData.findIndex((el) => el.id === id);
            const newArray = [
                ...TodoData.slice(0, idx),
                ...TodoData.slice(idx + 1)
            ];
            return {
                TodoData: newArray
            };
        });
    };

    onAddItem = (text) => {
        const newItem = this.createTodoItem(text)

        this.setState(({ TodoData }) => {
            const newArr = [
                ...TodoData,
                newItem
            ];

            return {
                TodoData: newArr
            };
        });
    };

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] }

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ TodoData }) => {
            return {
                TodoData: this.toggleProperty(TodoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ TodoData }) => {
            return {
                TodoData: this.toggleProperty(TodoData, id, 'done')
            };
        });
    };

    searchItem = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => item.label.toLowerCase().includes(term));
    }

    onSearchItem = (term) => {
        this.setState({ term });
    }

    filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    filterItems = (filter) => {
        this.setState({ filter })
    }


    render() {

        const { TodoData, term, filter } = this.state;

        const visibleItems = this.filter(this.searchItem(TodoData, term), filter);

        const doneCount = TodoData.filter((el) => el.done).length;

        const todoCount = TodoData.length - doneCount;

        return (
            <div className="TodoApp">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="topPanel d-flex">
                    <SearchPanel onSearchItem={this.onSearchItem} TodoData={this.TodoData} />
                    <ItemStatusFilter filter={filter} filterItems={this.filterItems} />
                </div>
                <TodoList todos={visibleItems} onDeleted={this.deleteItem} onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone} />
                <ItemAddForm onAddItem={this.onAddItem} />
            </div>
        );
    };
};



