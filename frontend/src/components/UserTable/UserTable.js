import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {TableFooter} from "@material-ui/core";
import {TablePagination} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function UserDataTable(props) {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleEdit = (row) => {
        props.handleEdit(row)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>User Name</StyledTableCell>
                        <StyledTableCell align="right">First Name</StyledTableCell>
                        <StyledTableCell align="right">Last Name</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Phone</StyledTableCell>
                        <StyledTableCell align="right">User Status</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                        <TableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.username}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.firstName}</StyledTableCell>
                            <StyledTableCell align="right">{row.lastName}</StyledTableCell>
                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                            <StyledTableCell align="right">{row.phone}</StyledTableCell>
                            <StyledTableCell align="right">{row.userStatus ? "Y": "N"}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button id={"edit-" + row.id} variant="contained"
                                        style={{marginRight: '2%'}}
                                        onClick={() => handleEdit(row)}
                                >Edit</Button>
                                <Button id={"delete-" + row.id}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) props.handleDelete(row)}}
                                >Delete</Button>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            colSpan={3}
                            count={props.data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}



