import { useState } from "react"
import {cloneDeep} from 'lodash'
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

const usePlayer = (myId, roomId, peer) => {

    const navigate = useNavigate()
    const [players, setPlayers] = useState({});
    const playersCopy = cloneDeep(players);
    const socket = useSocket()

    const playerHighlighted = playersCopy[myId];
    delete playersCopy[myId];

    const nonHighlightedPlayers = playersCopy;

    const toggleAudio = () => {
        console.log("toggling audio");
        setPlayers((prev) => {
            const copy = cloneDeep(prev);
            copy[myId].muted = !copy[myId].muted;
            return {...copy}
        })
        socket.emit("user-toggle-audio", myId, roomId)
    }
    const toggleVideo = () => {
        console.log("toggling video");
        setPlayers((prev) => {
            const copy = cloneDeep(prev);
            copy[myId].playing = !copy[myId].playing;
            return {...copy}
        })
        socket.emit("user-toggle-video", myId, roomId)
    }

    const leaveRoom = () => {
        socket.emit("user-leave", myId, roomId);
        console.log("leaving room", roomId);
        peer?.disconnect();
        navigate('/')
    }

    return { players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom };
}

export default usePlayer