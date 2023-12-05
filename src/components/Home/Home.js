import React from "react";
import { Link } from "react-router-dom";
import "./home.css"
function Home(props) {
  return (
    <div>
      <div>
        <div className="heading">
          <div>
          <h3 className="title">Track N Go</h3>
          </div>
         <div>
         <h3 className="para">
         Start your journey with us by entering your vehicle details. </h3>
         <h3 className="para">Together, lets make every ride easy and efficient</h3>
        
         </div>

         
          </div>
          <div className="btnClass">
            <div>
            <h1>
          <Link to="/login">
            <button myClass="btn1">Login</button></Link>
        </h1>
            </div>
       
        <div>
        <h1>
          <Link to="/signup">
            <button myClass="btn2">Signup</button></Link>
        </h1>
        </div>
        
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2> */}
    </div>
  );
}

export default Home;
