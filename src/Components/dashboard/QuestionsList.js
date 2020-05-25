import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import firebaseDb from '../../firebase';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import './QuestionList.css';
class QuestionsList extends React.Component{
    constructor(props){
        super(props);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }
    render(){
   
        if(this.props.user!=null)
        {
            return  <div className="jumbotron jumbotron-fluid">
                <button id="logoutButton" class="btn btn-primary">Logout</button>
                        <div className="container">
                        <h4 className="text-center" id="welcomeText"></h4>
                       

                        <Link to="/" target="_parent">
                            <h4> Add Question</h4>
                        </Link>
 
                    <h2> Questions </h2>
                    <div id="questions_container">

                    </div>
                </div>
                </div>
                
            }
            else
            {
                return null;
            }
    
    }

    deleteQuestion(questions,index){
        firebaseDb.firestore().collection('data').doc(this.props.user.email).update({
          questions:questions.filter((question,i)=>i!=index)
        }).then(()=>{
            document.getElementById(`question${index+1}`).remove();
        }).catch(err=>alert(err.message));
    }
    componentDidMount(){
        if(this.props.user!=null)
        {
            let firstName,lastName;
     
            document.getElementById("logoutButton").addEventListener('click',()=>{
                localStorage.removeItem("auth");
                this.props.changeUser(null);
            })
         
            let userData = firebaseDb.firestore().collection('data').doc(`${this.props.user.email}`);
            userData.get().then((querySnapshot)=>{
                let data = querySnapshot.data();
                console.log(data);
                firstName = data.firstName;
                lastName = data.lastName;
                document.getElementById("welcomeText").innerHTML=`Welcome ${firstName} ${lastName}`;
                ReactDOM.render(
                    data.questions.map((question,index)=>{
                    return <div className="card" id={`question${index+1}`} style={{width:'80%',marginBottom:'15px'}}>
                    <div className="card-body">
                    <h5 className="card-title"> Q{index+1} {question.text}</h5>
                       {question.options.map((option,index)=>{
                           if(index==question.answer-1)
                           {
                            return <p key={option}  className="card-text correct"> Option {index+1} - {option}</p>
                           }
                           else
                           {
                            return <p key={option}  className="card-text"> Option {index+1} - {option}</p>
                           }
                       })}
                    </div>
                    <button className="btn btn-danger" style={{width:'5rem',marginLeft:'15px',marginTop:'0.5rem',marginBottom:'0.5rem'}} onClick={()=>{this.deleteQuestion(data.questions,index)}}>Delete</button>

                  </div>
                    }),document.getElementById('questions_container')
                );
               
            }).catch(err=>console.log(err))

       
        }
  
    }
}
export default QuestionsList;