import React, { useState, useRef } from "react";
import { useSubscription, useStompClient } from "react-stomp-hooks";
import { useOktaAuth } from "@okta/okta-react";
import { useNotification } from "../../hooks/use-notification";

const AnotherComponent = ({ user }) => {
  const [lastMessage, setLastMessage] = useState([{}]);
  const inputRef = useRef();
  const { authState, oktaAuth } = useOktaAuth();
  const { notify } = useNotification();

  useSubscription(`/topic/${user.email}`, (message) => {
    console.log(`JSON.parse(message.body).content`, JSON.parse(message.body));
    setLastMessage((oldState) => [...oldState, JSON.parse(message.body)]);
    notify(JSON.parse(message.body).message);
  });

  const stompClient = useStompClient();

  const sendMessage = async () => {
    const user = await oktaAuth.getUser();
    stompClient.publish({
      destination: `/app/notifications`,
      body: JSON.stringify({
        email: user.email,
        message: inputRef.current.value,
      }),
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        height: "100vh",
      }}
    >
      {/* <div
        style={{
          border: "solid 1px grey",
          borderRadius: "15px",
          padding: "20px",
          width: "20%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {lastMessage.map((payload, i) => (
          <div style={{ border: "solid 1px blue", padding: "12px" }} key={i}>
            {`${payload?.email}: ${payload?.message}`}
          </div>
        ))}
      </div> */}
      <h2>
        {user.name} - {user.email}
      </h2>
      <input type="text" ref={inputRef}></input>
      <button type="submit" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default AnotherComponent;
