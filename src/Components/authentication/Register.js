import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import firebaseDb from '../../firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';
class Register extends React.Component{
    render(){
        return <Router>
                <Switch>
                <Route path="/">
                        <div id="register">
                        <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                        <h1 className="display-4 text-center">Register</h1>
                        <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter email" required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicFirstName">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control id="firstname" type="text" placeholder="Enter First Name" required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control id="lastname" type="text" placeholder="Enter Last Name" required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="password" type="password" placeholder="Password" required/>
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control id="confirmPassword" type="password" placeholder="Confirm Password" required />
                        </Form.Group>

                        <Button id="registerButton" variant="primary">
                            Register
                        </Button>
               
                        </Form>
                        </div>
                        </div>
                        </div>
                    </Route>
                </Switch>
        </Router>
    }
    componentDidMount(){
        document.getElementById("registerButton").addEventListener("click",()=>{
           console.log("clicked");
           let email = document.getElementById("email").value;
           let password = document.getElementById("password").value;
           let confirmPassword = document.getElementById("confirmPassword").value;
           let firstName = document.getElementById("firstname").value;
           let lastName = document.getElementById("lastname").value;
           if(confirmPassword=='' || password=='' || firstName=='' || lastName=='') 
           {
               alert("Fields Cant Be Empty");
               return;
           }
           if(this.validateEmail(email))
           {
               if(password==confirmPassword)
               {
                   console.log("[Educational Quiz] Authenticating..")
                   firebaseDb.auth().createUserWithEmailAndPassword(email,password).then(()=>{
                       console.log(firebaseDb.auth().currentUser.email+"is has now signed up")
                       alert("Thank you for signing up");
                       firebaseDb.firestore().collection("data").doc(firebaseDb.auth().currentUser.email).set({
                           userEmail:firebaseDb.auth().currentUser.email,
                           firstName:firstName,
                           lastName:lastName,
                           questions:[],
                       }).then(()=>{
                           document.location.href="/"
                       }).catch(err=>alert(err.message))
                     
                   }).catch(err=>{
                       alert(err.message)
                   })
               }
               else
               {
                   alert("Passwords Do Not Match");
               }
           }
        })
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}
export default Register;