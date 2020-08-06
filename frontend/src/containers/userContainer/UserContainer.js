import React, {useEffect} from "react";
import { makeStyles} from '@material-ui/core/styles';
import {CssBaseline, Divider} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import UserDataTable from "../../components/UserTable/UserTable";
import UserDataModal from "../../components/UserModal/UserModal";
import axios from 'axios';
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from "@material-ui/core/Button";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import {createMessage} from '../../utils/messageUtils'
import AlertMessage from "../../components/AlertMessage/AlertMessage";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#1f211f'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    appBrand: {
        marginRight: '15%'
    },
    content: {
        flex: 1,
        padding: theme.spacing(3),
        marginTop: '2%',
    },
    actionBlock: {
        marginBottom: '1%',
        display: 'flex'
    },
    searchBar: {
        width: '50%'
    },
    divider: {
        height: 28,
        margin: 4,
        marginLeft: 10,
        marginRight: 10
    },
}));

const UserContainer = () => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);
    const [userDatas, setUserDatas] = React.useState([]);
    const [filteredUsers, setFilteredUsers] = React.useState(null);
    const [message, setMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);


    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/user/all')
            .then(response => {
                setUserDatas(response.data)
                setLoading(false);
            })
            .catch(error => {
                setMessage(createMessage("We are experiencing issues right now, please try again in some time",
                    "error"))
                setLoading(false);
            })
    }, [])

    const searchData = (value) => {
        if (value) {
            if (value.includes(":")) {
                let filter_criteria = value.split(":")
                let criteriaField = filter_criteria[0].trim()
                let criteriaValue = filter_criteria[1].trim().toLowerCase()
                setFilteredUsers(userDatas.filter(data => {
                    return data[criteriaField].toString().toLowerCase().includes(criteriaValue)
                }))
            } else {
                value = value.toLowerCase()
                setFilteredUsers(userDatas.filter(data => data.username.toString().toLowerCase().includes(value)
                    || data.firstName.toString().toLowerCase().includes(value)
                    || data.lastName.toString().toLowerCase().includes(value)
                    || data.email.toString().toLowerCase().includes(value)
                ))
            }
        }
        else {
            setFilteredUsers(null)
        }

    }

    const handleDeleteUser = (userData) => {
        setLoading(true);
        // axios delete user
        axios.delete('http://localhost:5000/user/'+ userData.username)
            .then(response => {
                let updatedUsers = [...userDatas]
                let index = updatedUsers.findIndex(data => data.username === userData.username);
                if (index !== -1) {
                    updatedUsers.splice(index, 1);
                    setUserDatas(updatedUsers);
                }
                setLoading(false);
            })
            .catch(error => {
                setMessage(createMessage(`Failed to delete user: ${userData.username} with error: ${error.message}`,
                    "error"))
                setLoading(false);
            })
    }

    const closeMessage = () => {
        setMessage(null);
    }

    const handleSetUser = (userData) => {
        setLoading(true);
        let updatedUsers = [...userDatas]
        let index = updatedUsers.findIndex(data => data.username === userData.username);
        if (index !== -1) {
            if (updatedUsers[index] !== userData){
                // existing user
                axios.put('http://localhost:5000/user/'+userData.username, userData)
                    .then(response => {
                        updatedUsers[index] = {
                            id: updatedUsers[index].id,
                            username: updatedUsers[index].username,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            email: userData.email,
                            password: userData.password,
                            phone: userData.phone,
                            userStatus: userData.userStatus
                        }
                        setUserDatas(updatedUsers);
                        setLoading(false);
                    })
                    .catch(error => {
                        setMessage(createMessage(`Failed to create user: ${userData.username} with error: ${error.message}`,
                            "error"))
                        setLoading(false);
                    })

            }
        } else {
            //new user
            axios.post('http://localhost:5000/user', userData)
                .then(response => {
                    const userId = response.data.message
                    updatedUsers.push({
                        id: userId,
                        username: userData.username,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        password: userData.password,
                        phone: userData.phone,
                        userStatus: userData.userStatus
                    })
                    setUserDatas(updatedUsers);
                    setLoading(false);
                })
                .catch(error => {
                    setMessage(createMessage(`Failed to create user: ${userData.username} with error: ${error.message}`,
                        "error"))
                    setLoading(false);
                })
        }
        setModalOpen(false);
        setModalData(null);
    }

    const handleSetUserClick = (userData) => {
        setModalOpen(true);
        setModalData(userData);
    }

    const handleModalClose = () => {
        setModalOpen(false);
        setModalData(null);
    }

    return (
            <div className={classes.root}>
                <CssBaseline/>
                {loading? <ProgressBar /> : null}
                <div >
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap className={classes.appBrand}>
                                Data Manager
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.content}>
                        {message? (
                            <AlertMessage key={message.id} message={message}
                                          closeMessage={closeMessage} />
                            ) :
                            null}

                        <h2>User Details</h2>
                        <div className={classes.actionBlock}>
                            <div className={classes.searchBar}>
                                <SearchBar handleSearch={searchData}/>
                            </div>
                            <Divider className={classes.divider} orientation="vertical"/>
                            <Button id="add-user" variant="contained" onClick={handleSetUserClick}>Add User</Button>
                        </div>
                        <UserDataTable data={Array.isArray(filteredUsers) ? filteredUsers : userDatas}
                                       handleEdit={handleSetUserClick}
                                       handleDelete={handleDeleteUser}
                        />
                        <UserDataModal modalOpen={modalOpen}
                                       data={modalData}
                                       handleClose={handleModalClose}
                                       handleSave={handleSetUser} />

                </div>


            </div>
    );
};

export default UserContainer;
