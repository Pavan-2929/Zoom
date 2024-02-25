import React, { useState } from 'react'
import { v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom'

const Lobby = () => {

    const navigate = useNavigate()
    const [roomId, setRoomId] = useState('')

    const handleCreateAndJoinRoom = () => {
        const roomId = uuidv4();
        navigate(`/room/${roomId}`)
    }

    const handleJoinRoom = () => {
        if(roomId){
            navigate(`/room/${roomId}`)
        }else{
            alert("enter valid room Id")
        }
    }

  return (
    <div>
        <div>
            <h1>Zoom Clone</h1>
        </div>
        <div>
            <input type="text" placeholder='Enter Room ID' value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <button onClick={handleJoinRoom}>Join Room</button>
        </div>
        <div>
            <button onClick={handleCreateAndJoinRoom}>Create a new room</button>
        </div>
    </div>
  )
}

export default Lobby