import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({ setIsAuth }) {                         //function that handles the login
  const [username, setUsername] = useState("");         //creates a state for the username and password
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {          //post request to the server with the username and password
      username,
      password,
    }).then((res) => {                                    //when the request is successful
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);                       //set the info in the cookies
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  };
  return (
    <div className="login">
      <label> Login</label>

      <input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}> Login</button>         
    </div>
  );
}

export default Login;
