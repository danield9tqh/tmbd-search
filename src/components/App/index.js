import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {searchMoviesWithFullResults} from '../../utils/tmdbApi';
import SearchResults from '../SearchResults';
import styled from 'styled-components';

const SearchButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AppHeader = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-right: 10%;
`;

function App() {
  const [searchText, setSearchText] = useState("");
  const [movieResults, setMovieResults] = useState({query: "", results: [], total_pages: 0, total_results: 0, page: 0});

  const handleSearchFieldChange = (event) => {
    const newText = event.target.value;
    setSearchText(newText);
  }

  const onSearchClick = () => {
    searchMoviesWithFullResults(searchText).then(({results, total_pages, total_results, page}) => {
      setMovieResults({query: searchText, results, total_pages, total_results, page: page-1});
    });
  };

  const handlePageChange = (newPage) => {
    searchMoviesWithFullResults(movieResults.query, newPage+1).then(({results, total_pages, total_results, page}) => {
      setMovieResults({query: movieResults.query, results, total_pages, total_results, page: page-1});
    });
  }

  return (
    <div className="App">
      <AppHeader>
        <SearchButtonWrapper>
          <TextField
            id="outlined-search"
            label="Movie Title"
            type="search"
            margin="normal"
            variant="outlined"
            value={searchText}
            onChange={handleSearchFieldChange}
            fullWidth
          />
          <div style={{width: "15px"}} />
          <Button variant="contained" color="primary" onClick={onSearchClick}>{"Search"}</Button>
        </SearchButtonWrapper>
        <SearchResults
          results={movieResults.results}
          totalPages={movieResults.total_pages}
          totalResults={movieResults.total_results}
          page={movieResults.page}
          onPageChange={handlePageChange}
        />
      </AppHeader>
    </div>
  );
}

export default App;
