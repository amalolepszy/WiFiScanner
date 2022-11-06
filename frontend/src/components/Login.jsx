import React from "react";
import Footer from "./Footer";

export default function Login(props) {
  return (
    <div>
      <div className="container login-container">
        <h1 id="login-header">Enter spaceID and clientToken</h1>
        <input
          onChange={props.onSpaceIdChange}
          type="text"
          placeholder="spaceID"
          value={props.spaceID}
        />
        <input
          onChange={props.onClientTokenChange}
          type="text"
          placeholder="clientToken"
          value={props.clientToken}
        />
        <button
          className="login-button"
          onClick={() => {
            props.onLogin();
          }}
        >
          Submit
        </button>
      </div>
      <div className="login-text">
        <h4>
          Don't have one? You can generate your own <em>spaceID</em> and <em>clientToken</em> on{" "}
          <a href="https://www.smplrspace.com/">smplrspace.com</a>.
        </h4>
      </div>
      <Footer/>
    </div>
  );
}
