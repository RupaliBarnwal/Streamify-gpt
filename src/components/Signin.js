import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Avatar } from "../utils/constants";

const Signin = () => {
  const [login, setLogin] = useState("true");
  const [errMsg, setErrMsg] = useState(null);
  const dispatch= useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  

  const toggleForm = () => {
    setLogin(!login);
  };

  const handleButtonClick = () => {
    //console.log(email.current.value);
    //console.log(password.current.value);

    const msg = checkValidation(email.current.value, password.current.value);
    //console.log(msg);
    setErrMsg(msg);
    if (msg) return;
    //signin/Signup logic

    if (!login) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //update user profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: Avatar,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
              // navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrMsg(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrMsg(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          
          console.log(user);
          // navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + "-" + errorMessage);
        });
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
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="absolute bg-black w-3/12 p-10 m-auto left-0 right-0 my-36 text-white bg-opacity-80 "
        >
          <h1 className="font-bold text-3xl mb-4">
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
          <p className="p-6 my-2 cursor-pointer" onClick={toggleForm}>
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
