import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formRow: {
      minWidth: '90%',
      marginLeft: '5%',
      marginRight: '5%',
      marginTop: '2%'
    },
}));

export default function UserDataForm(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState(props.data && props.data.username ? {
        id: props.data.id,
        username: props.data.username,
        firstName: props.data.firstName,
        lastName: props.data.lastName,
        email: props.data.email,
        password: props.data.password,
        phone: props.data.phone,
        userStatus: props.data.userStatus? props.data.userStatus : false,
        showPassword: false
    }: {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        userStatus: false,
        showPassword: false
    });

    const saveDisabled = () => {
        return (values.username === '' || values.firstName === '' || values.email === '' || values.password ==='');
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleActiveChange = () => {
        console.log(values.userStatus)
        setValues({ ...values, userStatus: !values.userStatus });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.root}>
            <div className={classes.formRow}>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">User Name</InputLabel>
                    <OutlinedInput
                        id="outlined-username"
                        value={values.username}
                        onChange={handleChange('username')}
                        labelWidth={80}

                    />
                </FormControl>
            </div>
            <div className={classes.formRow}>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-firstname">First Name</InputLabel>
                    <OutlinedInput
                        id="outlined-firstname"
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                        labelWidth={80}
                    />
                </FormControl>
            </div>
            <div className={classes.formRow}>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-lastname">Last Name</InputLabel>
                    <OutlinedInput
                        id="outlined-lastname"
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                        labelWidth={80}
                    />
                </FormControl>
            </div>
            <div className={classes.formRow}>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-email"
                        value={values.email}
                        onChange={handleChange('email')}
                        labelWidth={80}
                    />
                </FormControl>
            </div>
            <div className={classes.formRow}>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-password"
                        value={values.password}
                        onChange={handleChange('password')}
                        type={values.showPassword ? 'text' : 'password'}
                        labelWidth={80}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
            <div className={classes.formRow}>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-phone">Phone Number</InputLabel>
                    <OutlinedInput
                        id="outlined-phone"
                        value={values.phone}
                        onChange={handleChange('phone')}
                        labelWidth={120}
                    />
                </FormControl>
            </div>
            <div className={classes.formRow}>
                <FormControl className={classes.margin}>
                    <FormControlLabel
                        value="start"
                        control={
                            <Switch
                                id="user-status-switch"
                                checked={values.userStatus}
                                onChange={handleActiveChange}
                                name="userStatus"
                                color="default"
                            />
                        }
                        label="User Status"
                        labelPlacement="start"
                    />
                </FormControl>
            </div>
            <div className={classes.formRow}>
                <Button id="submit-user"
                        variant="contained"
                        onClick={() => {props.saveUser(values)}}
                        disabled={saveDisabled()}
                >SUBMIT</Button>
            </div>
        </div>
    )
}