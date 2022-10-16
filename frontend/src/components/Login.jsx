import React from "react";

export default function Login(props) {
  return (
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
  );
}
