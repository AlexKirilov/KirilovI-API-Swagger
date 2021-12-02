import React from "react";
import PropTypes from "prop-types";
import styles from "./TableComp.module.scss";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

const DateOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// TODO: Future updates make the Sorting and Pagination Server-side
const TableComp = ({
  rowsData,
  headCells,
  handleOnNewItem,
  handleOnItemDelete,
  isAdmin,
}) => {
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(headCells[0]?.id);
  const [selected, setSelected] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rowsData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, item) => {
    const selectedIndex = selected.indexOf(item.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function addNewHandler() {
    // Second line of security to ensure if the user is not admin couldn't make changes
    if (isAdmin) handleOnNewItem();
  }

  // It will detect when the delete btn is clicked
  function deleteHandler() {
    // Send all selected item for deletion
    // Second line of security to ensure if the user is not admin couldn't make changes
    if (isAdmin) handleOnItemDelete(selected);
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rowsData.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsData.length) : 0;

  function dateFormat(incomeDate) {
    const date = new Date(incomeDate);
    if (incomeDate && !isNaN(date))
      return date.toLocaleDateString("en-US", DateOptions);
    else return "N/A";
  }

  function getIcon(value) {
    if (value === true) return <CheckIcon sx={{color: 'green'}}/>
    if (value === false) return <ClearIcon sx={{color: 'red'}} />
  }

  return (
    <Box
      sx={{ width: "100%" }}
      className={styles.Table}
      data-testid="TableComp"
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
        {isAdmin ? (
          <EnhancedTableToolbar
            numSelected={selected.length}
            addNewHandler={addNewHandler}
            deleteHandler={deleteHandler}
          />
        ) : null}

        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              isAdmin={isAdmin}
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsData.length}
            />

            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rowsData.slice().sort(getComparator(order, orderBy)) */}
              {!rowsData
                ? null
                : stableSort(rowsData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row?.id);
                      const labelId = `enhanced-table-checkbox-${row?.id}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row?.id}
                          selected={isItemSelected}
                        >
                          {isAdmin ? (
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                key={row?.id + "cb"}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                          ) : null}
                          {headCells.map((colName, index) => (
                            <TableCell
                              // padding="none"
                              // scope={index === 0 ? "row" : null}
                              // id={index === 0 ? labelId : null}
                              key={row?.id + colName.id}
                              component={index === 0 ? "th" : "td"}
                              align={colName.align}
                            >
                              {colName.numeric
                                ? row[colName.id]
                                : colName.date
                                ? dateFormat(row[colName.id])
                                : colName.icon
                                ? getIcon(row[colName.id])
                                : row[colName.id]}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

TableComp.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  rowsData: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  handleOnNewItem: PropTypes.func.isRequired,
  handleOnItemDelete: PropTypes.func.isRequired,
};

TableComp.defaultProps = {};

export default TableComp;
