import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./Lobby.css";

const Lobby = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const handleCreateAndJoinRoom = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
  };

  const handleJoinRoom = () => {
    if (roomId) {
      navigate(`/room/${roomId}`);
    } else {
      alert("Enter a valid room ID");
    }
  };

  return (
    <div className="lobby-container">
      <div className="lobby-header">
        <h1>Zoom Clone</h1>
      </div>
      <div className="lobby-input">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div className="border-line">

      </div>
      <div className="lobby-action">
        <button onClick={handleCreateAndJoinRoom}>Create a new room</button>
      </div>
    </div>
  );
};

export default Lobby;
