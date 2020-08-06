import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    search: {
        marginRight: '2%',
        width: '100%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        width: '100%'
    },
}));

export default function SearchBar(props) {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('')

    const handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            event.preventDefault()
            handleSearch()
        }
    }

    const handleSearch = () => {
        props.handleSearch(searchValue);
    }

    return (
        <div className={classes.root}>
            <Paper component="form" className={classes.search}>
                <InputBase
                    id="search-box"
                    className={classes.input}
                    placeholder="Search Users"
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setSearchValue(event.target.value)}
                />
            </Paper>
            <Button variant="contained" onClick={handleSearch}>Search</Button>

        </div>
    )
}