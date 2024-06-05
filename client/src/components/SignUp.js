import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({ setAuthenticated }) {   //function that handles the sign up
  const cookies = new Cookies();          //creates a new cookies object
  const [formData, setFormData] = useState({});    //creates a state for the form data

  const handleInputChange = (event) => {  //when an input is changed it updates the state
    const { name, value } = event.target; // gets the name and value of the input
    setFormData({ ...formData, [name]: value }); // creates a new object with the name and value
  };

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", formData)  //post request to the server with the form data
      .then((response) => { //when the request is successful
        const { token, userId, firstName, lastName, username, hashedPassword } =
          response.data; //get information from the response
        cookies.set("token", token);  //set the token in the cookies
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("hashedPassword", hashedPassword);
        setAuthenticated(true); //set the authenticated state to true
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="signUp">
      <label>Sign Up</label>
      <input
        placeholder="First Name"
        name="firstName"
        onChange={handleInputChange}
      />
      <input
        placeholder="Last Name"
        name="lastName"
        onChange={handleInputChange}
      />
      <input
        placeholder="Username"
        name="username"
        onChange={handleInputChange}
      />
      <input
        placeholder="Password"
        type="password"
        name="password"
        onChange={handleInputChange}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
