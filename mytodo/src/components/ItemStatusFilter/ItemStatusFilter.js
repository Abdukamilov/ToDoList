import React, { Component } from 'react';
import './ItemStatusFilter.css';

export default class ItemStatusFilter extends Component {

    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'done', label: 'Done' }
    ]

    render() {

        const { filter, filterItems } = this.props;

        const buttons = this.buttons.map(({ name, label }) => {
            const onActive = filter === name ? 'btn-info' : 'btn-outline-secondary'
            return (
                <button type="button" className={`btn ${onActive}`} key={name} onClick={() => filterItems(name)}>{label}</button>
            )
        })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    };
};
