import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../context/user';

// strapi function

import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';


export default function Login() {

  const history = useHistory();
  // setup user context
const {userLogin, alert, showAlert} = useContext(UserContext);
  // state values

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

let isEmpty = !email || !password || !username || alert.show;
// !email, !password, !username return truthy when they are
// an empty string
// if alert.show is true and the alert is showing, isEmpty
// is true, which means the button won't be displayed


const toggleMember = () => {
  setIsMember((previousMember)=> {
    console.log(previousMember);
    let isMember = !previousMember;
    isMember ? setUsername('default') : setUsername('');
    // if a user is a member and wants to login we want them
    // to be able to click the button, which will only appear
    // if the value of username is NOT an empty string.
    // We therefore assign it a placeholder value of 'default'
    return isMember;
  })
}

const handleSubmit = async (e) => {

  showAlert({
    msg: 'We are accessing your user data. Please wait...',
    type: "wait"
  });

  // alert
  e.preventDefault();
  let response;
  if (isMember) {
    response = await loginUser({email,password})
  } else {
    response = await registerUser({email,password,username})
  }
  if (response) {
    const {jwt:token,user:{username}} = response.data
    // we rename the jwt key into 'token' and we look for the
    // key 'username' in the object (sub-object) 'user'
    const newUser = {token,username};
    userLogin(newUser);
    showAlert({
      msg: `Welcome, ${username}. You have successfully logged in. Shop away!`
    })
    history.push('/products');
    //
  } else {
    // show alert
    showAlert({msg: "There was an error. Please try again", type: "danger"})
  }

}

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>
      <form className="login-form">
        {/*single input*/}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input type="email" id="email" value={email} onChange={e=> setEmail(e.target.value)}/>
        </div>
        {/*end of single input*/}
        {/*single input*/}
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input type="password" id="password" value={password} onChange={e=> setPassword(e.target.value)}/>
        </div>
        {/*end of single input*/}
        {/*single input*/}
        {!isMember && (
        <div className="form-control">
        <label htmlFor="username">username</label>
        <input type="text" id="username" value={username} onChange={e=> setUsername(e.target.value)}/>
      </div>
        )}
         {/*end of single input*/}
         {/*empty form text*/}
         {isEmpty && <p className="form-empty">Please fill out all fields</p>}
         {/* submit button */}
          {!isEmpty && (
            <button type="submit" onClick={handleSubmit} className="btn btn-block btn-primary">submit</button>
          )}
          {/* register link */}
          <p className="register-link">
            {isMember ? "I need to register" : "Already a member"}
            <button type="button" onClick={toggleMember}>click here</button>
          </p>
      </form>
    </section>
    
  );
}
