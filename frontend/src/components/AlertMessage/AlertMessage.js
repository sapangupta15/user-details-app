import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '10vh',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    alertContainer: {
        marginTop: '8vh',
        width: '100%'
    },
    alert: {
        width: '75%'
    }
}));

export default function AlertMessage(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);


    const handleClose = (event, reason) => {
        props.closeMessage(props.message.id)

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={30000}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      classes={{root: classes.alertContainer}}
            >
                <MuiAlert id="alert-message"
                          onClose={handleClose}
                          severity={props.message.severity === "error" ? "error": "success"}
                          classes={{root: classes.alert}}
                >
                    {props.message.message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
