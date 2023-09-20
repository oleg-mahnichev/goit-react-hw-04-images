import React, { Component } from 'react';
import { toast } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import { Conteiner, SearchForm, SearchInput, SearchButton } from './Searchbar.styled'; 

class Searchbar extends Component {
    state = {
        query: '',
        prevQuery: '',
    };

    handleChange = (e) => {
        this.setState({ query: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { query, prevQuery } = this.state;

        if (!query.trim()) {
            toast.error('Запит порожній');
            return;
        }

        if (query !== prevQuery) {
            this.props.onSubmit(query);
        } else {
            toast.error('Запит такий самий, як попередній.');
        }

        this.setState({ prevQuery: query });
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    };

    render() {
        const { query } = this.state;

        return (
            <Conteiner className="searchbar">
                <SearchForm className="form" onSubmit={this.handleSubmit}>
                    <SearchInput
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Пошук зображень і фото"
                        value={query}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <SearchButton type="submit">
                        <FaSearch className="SearchIcon" />
                    </SearchButton>
                </SearchForm>
            </Conteiner>
        );
    }
}

export default Searchbar;
