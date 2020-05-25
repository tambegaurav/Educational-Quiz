import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as firebase from 'firebase';
import { withRouter } from "react-router-dom";

import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import QuestionsList from './QuestionsList';
import firebaseDb from '../../firebase';
import Dashboard from './Dashboard';
class AddQuestion extends React.Component{
    render(){
        if(this.props.user!=null)
        {
            return   <div id="addQuestionDiv" className="container">
            <a href="/questionslist"><h4 id="questions_link">Questions List</h4></a>
            <Form>
            <h4>Add A Question</h4>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Question </Form.Label>
                <Form.Control id="question" type="text" />
            </Form.Group>
    
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Option 1</Form.Label>
                <Form.Control id="option1" type="text" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Option 2</Form.Label>
                <Form.Control id="option2" type="text" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Option 3</Form.Label>
                <Form.Control id="option3" type="text" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Option 4</Form.Label>
                <Form.Control id="option4" type="text" />
            </Form.Group>
        <Form.Group controlId="formBasicAnswer">
                <Form.Label>Answer</Form.Label>
                <Form.Control id="answer" type="number" min="1" max="4" default="1" />
            </Form.Group>

            <Button  controlId="addQuestion" onBlur="" id="addQuestion" variant="primary" type="button">
                Add Question
            </Button>
         
            </Form>
            </div>
        }
        else
        {
            return null;
        }
    
    }
    componentDidMount(){
        console.log(this.props.user);
        if(this.props.user!=null)
        {
            document.getElementById("logoutButton").addEventListener('click',()=>{
                localStorage.removeItem("auth");
                this.props.changeUser(null);
            })

            document.getElementById("addQuestion").addEventListener("click",(e)=>{
                console.log('clicked')
                e.preventDefault();
                let question = document.getElementById("question").value;
                let option1 = document.getElementById("option1").value;
                let option2 = document.getElementById("option2").value;
                let option3 = document.getElementById("option3").value;
                let option4 = document.getElementById("option4").value;
                let answer = document.getElementById("answer").value;
                if(question=='' || option1=='' || option2=='' || option3=='' || option4=='' || answer=='')
                {
                    console.log('null values');
                    return;
                }
                else{
                    let q = {
                        text:question,
                        options:[option1,option2,option3,option4],
                        answer:answer
                    }
                    firebaseDb.firestore().collection('data').doc(`${this.props.user.email}`).update({
                        questions:firebase.firestore.FieldValue.arrayUnion(q)
                    }).then(()=>{
                        alert("Question Added");
                        document.location.href="/";
                    }).catch(err=>alert(err.message))
                }
            })
            document.getElementById("questions_link").addEventListener("click",()=>{
                document.location.href="/questionslist";
            })         
        }
    }
}
export default withRouter(AddQuestion);