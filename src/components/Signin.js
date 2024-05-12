import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"

const Signin = () => {
  const [login, setLogin] = useState("true");
  const [errMsg, setErrMsg]=useState(null);

  const name= useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleForm = () => {
    setLogin(!login);
  };

  const handleButtonClick = () => {
    //console.log(email.current.value);
    //console.log(password.current.value);

    const msg= checkValidation(email.current.value, password.current.value)
    //console.log(msg);
    setErrMsg(msg);
    if(msg=== null) return;
    //signin/Signup logic

    if(!login){
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log (user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    setErrMsg(errorCode+ "-"+ errorMessage);
  });
    }
    else{

    }
  };
  return (
    <div>
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ff5587c5-1052-47cf-974b-a97e3b4f0656/065df910-dec3-46ae-afa8-7ad2b52dce40/IN-en-20240506-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="bgImg"
        />
      </div>
      <Header />
      <div className="">
        <form 
        onSubmit={(e)=>{e.preventDefault()}}
        className="absolute bg-black w-3/12 p-10 m-auto left-0 right-0 my-36 text-white bg-opacity-80 ">
          <h1 
          className="font-bold text-3xl mb-4">
            {login ? "Sign In" : "Sign Up"}
          </h1>
          {!login && (
            <input
            ref={name}
              type="text"
              placeholder="Name"
              className="p-4 my-2 w-full bg-gray-800 bg-opacity-60 rounded-lg "
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-2 w-full bg-gray-800 bg-opacity-60 rounded-lg "
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-2 w-full bg-gray-800 bg-opacity-60  rounded-lg"
          />
          <p className="text-red-600">{errMsg}</p>
          <button
            className="p-2 my-2 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {login ? "Sign In" : "Sign Up"}
          </button>
          <p className="p-6 my-2" onClick={toggleForm}>
            {login
              ? "New to Streamify? Sign Up Now"
              : "Already a user? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
