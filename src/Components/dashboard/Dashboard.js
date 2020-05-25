import React from 'react';
import firebaseDb from '../../firebase';
import { withRouter } from "react-router-dom";

import './Dashboard.css';
import {BrowserRouter as Router,Route,Link, Switch} from 'react-router-dom';
import AddQuestion from './AddQuestion';
import QuestionsList from './QuestionsList';
class Dashboard extends React.Component{

     fetchName(){
        console.log(`getName Called`)

     }

     returnName(name){
         return name;
     }

    render(){
        if(this.props.user==null){
            this.props.history.push("/login");
            return null;
        }
        else
        {
          
            return  <div id="dashboard">
            <Router>
            <button id="logoutButton" className="btn btn-primary">
                    Logout
                </button>
            <div className="jumbotron jumbotron-fluid">
            <div className="container ">
        <h4 className="text-center" id="welcomeText"></h4>
            </div>
            <Switch>
                <Route path="/" exact>
                <AddQuestion {...this.props} user={this.props.user} changeUser={this.changeUser}/>
                </Route>
                <Route path="/questionslist">
                    <QuestionsList {...this.props} user={this.props.user} changeUser={this.changeUser}/>
                </Route>

            </Switch>
            </div>
            </Router>
            </div>
             
        }
       
    }
    componentDidMount(){
        if(this.props.user!=null)
        {
            document.getElementById("logoutButton").addEventListener('click',()=>{
                localStorage.removeItem("auth");
                this.props.changeUser(null);
            })

            let userData = firebaseDb.firestore().collection('data').doc(`${this.props.user.email}`);
            let firstName,lastName;
            userData.get().then((snapshot)=>{
                let data = snapshot.data();
                firstName = data.firstName;
                lastName = data.lastName;
                console.log(`${firstName} ${lastName}`)
                this.returnName(`${firstName} ${lastName}`);
                document.getElementById("welcomeText").innerHTML=`Welcome ${firstName} ${lastName}`;
            })
        }
  
    }
}
export default withRouter(Dashboard);