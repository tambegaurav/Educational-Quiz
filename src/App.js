import React from 'react';
import Login from './Components/authentication/Login';
import {useHistory} from 'react-router-dom';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom';
import firebaseDb from './firebase';
import Dashboard from './Components/dashboard/Dashboard';
import Register from './Components/authentication/Register';
import './Components/dashboard/QuestionsList'
import { AuthProvider } from './Auth';
import QuestionsList from './Components/dashboard/QuestionsList';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      "user":JSON.parse(localStorage.getItem("auth")),
    }
  }
  changeUser = (user)=>{
    this.setState({user:user});
    document.location.href="/";
  }
  render(){

      return <Router>
      <Route exact path="/questionslist" render={props=><QuestionsList {...props} changeUser={this.changeUser} user={this.state.user}/>}></Route>
      <Route exact path="/login" render={props=> <Login {...props} changeUser={this.changeUser}/>}></Route>
      <Route exact path="/register" render={props=> <Register {...props} />}></Route>
      <Route exact path="/" render={props=><Dashboard {...props} changeUser={this.changeUser} user={this.state.user}/>}></Route>
    </Router>;
  }
  componentDidMount(){
 
  }
 
}

export default App;
