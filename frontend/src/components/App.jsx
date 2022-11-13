import React, { useState } from "react";
import AddTransmitters from "./AddTransmitters";
import Header from "./Header";
import Login from "./Login";


export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [spaceId, setSpaceId] = useState("3a756ba2-909e-4d1c-8cff-6ed19b5645a7");
  const [clientToken, setClientToken] = useState("pub_eb760fee77634cdab2fe31146fc371c2");

  function handleSpaceIdChange(event) {
    setSpaceId(event.target.value);
  }

  function handleClientTokenChange(event) {
    setClientToken(event.target.value);
    console.log(clientToken);
  }

  function handleLogin(event) {
    setLoggedIn(true);
  }

  return (
    <div>
      <Header/>
      {isLoggedIn ? (
        <AddTransmitters spaceID={spaceId} clientToken={clientToken} />
      ) : (
        <Login
          onLogin={handleLogin}
          spaceID={spaceId}
          clientToken={clientToken}
          onSpaceIdChange={handleSpaceIdChange}
          onClientTokenChange={handleClientTokenChange}
        />
      )}
    </div>
  );
}
