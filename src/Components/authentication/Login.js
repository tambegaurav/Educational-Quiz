import React from 'react';
import Form from 'react-bootstrap/Form';
import Dashboard from '../dashboard/Dashboard';
import Button from 'react-bootstrap/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from 'react-router-dom';
import './Login.css';
import firebaseDb from '../../firebase';
import Register from './Register';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.setState({
            redirect:"",
        })
    }
    render(){
        if(firebaseDb.auth().currentUser!=null)
        {
            this.props.history.push("/")
            return null;
        }
        else
        {
            return <Router>
            <Switch>
                <Route path="/register" strict>
                    <Register />
                </Route>
                <Route path="/">
                        <div id="login">
                    <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                    <h1 className="display-4 text-center">Educational Quiz</h1>
                    <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control id="email" type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="password" type="password" placeholder="Password" />
                    </Form.Group>

                    <Button id="loginButton" variant="primary">
                        Login
                    </Button>
                    <Link to="/register">
                    <Button id="signUpButton" variant="success" >
                        Sign up
                    </Button>
                    </Link>
                    </Form>
                    </div>
                    </div>
                    </div>
                </Route>
            </Switch>
            </Router>;
        }
        
    }
    componentDidMount(){

        document.getElementById("loginButton").addEventListener("click",()=>{
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            firebaseDb.auth().signInWithEmailAndPassword(email,password).then(()=>{
               let currentUser = firebaseDb.auth().currentUser
               this.props.changeUser(currentUser);
               this.props.history.push("/");
               localStorage.setItem("auth",JSON.stringify(currentUser));
            }).catch(err=>{

                console.log(err);
                alert(err.message)});
        })
    }
}

export default Login;