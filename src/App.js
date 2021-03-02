import React, {useState, useEffect} from "react";
import fire from './fire';
import Login from './Login';
import Home from './Home';
import "./App.css";
const App=()=>{
const [user,setuser]=useState('');
const [email,setemail]=useState('');
const [password,setpassword]=useState('');
const [emailerror,setemailerror]=useState('');
const [passerror,setpasserror]=useState('');
const [hasaccount,sethasaccount]=useState(false);
const clearInputs=()=>{
  setemail('');
  setpassword('');
}
const clearErrors=()=>{
  setemailerror('');
  setpasserror('');
}


const handleLogin=()=>{
  clearErrors();
fire
.auth()
.signInWithEmailAndPassword(email,password)
.catch(err=>{
  switch(err.code){
    case "auth/invalid-email":
    case "auth/user-disabled":
    case "auth/user-not-found":
      setemailerror(err.message);
      break;
    case "auth/wrong-password":
      setpasserror(err.message);
      break;
  }
});
};
const handleSignup=()=>{
  clearErrors();
  fire
.auth()
.createUserWithEmailAndPassword(email,password)
.catch(err=>{
  switch(err.code){
    case "auth/email-already-in-use":
    case "auth/invalid-email":
      setemailerror(err.message);
       break;
    case "auth/weak-password":
      setpasserror(err.message);
      break;
  }
});

};
const handleLogout=()=>{
  fire.auth().signOut();
};
const authListener=()=>{
  fire.auth().onAuthStateChanged(user =>{
    if(user){
      clearInputs();
      setuser(user);
    }else{
      setuser('');
    }
  });
};
useEffect(()=>{
authListener();
},[])
  return (
    <>
   <div className="App">
     {user ?(
       <Home handleLogout={handleLogout}/>
     ):(
      <Login email={email} setemail={setemail} password={password} setpassword={setpassword} handleLogin={handleLogin}
      handleSignup={handleSignup} hasaccount={hasaccount} sethasaccount={sethasaccount} emailerror={emailerror} passerror={passerror}/>
  

     )}
       </div>
    
    </>
  );
};

export default App;
