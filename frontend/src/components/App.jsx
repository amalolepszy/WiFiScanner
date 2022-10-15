import React, { useState } from "react";
import Header from "./Header";
import Login from "./Login";
import AddTransmitters from "./AddTransmitters";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [spaceId, setSpaceId] = useState("78b842f9-0416-43b3-9496-9a6668ab73ad");
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
