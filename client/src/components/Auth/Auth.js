import React, { useState } from 'react'
import { Paper, Grid, Avatar, Button, Typography, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import Icon from './icon'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './Auth.css'
import Alert from '@material-ui/lab/Alert';


function Auth() {

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const { error } = useSelector((state) => state.auth)
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signup(formData, navigate))

        } else {
            dispatch(signin(formData, navigate))
            console.log(error)

        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);


    const switchMode = () => {

        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            await dispatch({ type: 'AUTH', data: { result, token } })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unsuccessful. Try again Later")
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input
                                        name='firstName'
                                        label='First Name'
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input
                                        name='lastName'
                                        label='Last Name'
                                        handleChange={handleChange}
                                        half
                                    />

                                </>
                            )
                        }
                        <Input
                            name='email'
                            label='Email Address'
                            handleChange={handleChange}
                            type='email'

                        />
                        <Input
                            name='password'
                            label='Password'
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    {error && (
                        <Alert severity="error" className={classes.alert}>{error}</Alert>

                    )}

                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='677523595817-vdeo0ooinm233g4n3k6769tgdn55ekl5.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained' >
                                Google Sign in
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'

                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
            <Button variant='outlined' component={Link} to='/' className={`${classes.retourBtn} btn`}>
                <ArrowBackIosIcon />
                Retour
            </Button>
        </Container>
    )
}

export default Auth
