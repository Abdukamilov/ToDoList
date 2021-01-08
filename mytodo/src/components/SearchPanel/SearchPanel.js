import React, { Component } from 'react';
import './SearchPanel.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    }
    onSearch = (e) => {
        const term = e.target.value.toLowerCase();
        this.setState({ term });
        this.props.onSearchItem(term);
    }

    render() {
        return (
            <form>
                <input type="text" className="form-control SearchPanel" placeholder="Type to search" onChange={this.onSearch} valuu={this.state.term} />
            </form>
        );
    }

};