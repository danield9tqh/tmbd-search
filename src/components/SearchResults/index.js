import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import styled from 'styled-components';

const TableWrapper = styled.div`
  max-height: 700px;
  overflow: auto;
`;

function SearchResults({results, totalPages, totalResults, page, onPageChange}) {
  const handlePageChange = (event, newPage) => onPageChange(newPage);
  return (
    <Paper>
      <TableWrapper>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="right">Language</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(result => (
              <TableRow key={result.id}>
                {result.poster_path
                  ? <TableCell ><img src={result.full_poster_path} style={{height: "100px"}} alt=""/></TableCell>
                  : <TableCell ></TableCell>
                }
                <TableCell align="left">{result.title}</TableCell>
                <TableCell align="right">{result.original_language}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
      <TablePagination
        component="div"
        count={totalResults}
        rowsPerPageOptions={[]}
        rowsPerPage={20}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handlePageChange}
      />
    </Paper>
  );
}

export default SearchResults;
