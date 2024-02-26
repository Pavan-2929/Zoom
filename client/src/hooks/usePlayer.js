import { useState } from "react"
import {cloneDeep} from 'lodash'

const usePlayer = (myId) => {
    const [players, setPlayers] = useState({});
    const playersCopy = cloneDeep(players);

    console.log("plauyers copy", playersCopy);

    const playerHighlighted = playersCopy[myId];
    delete playersCopy[myId];

    const nonHighlightedPlayers = playersCopy;

    console.log("this is none" + nonHighlightedPlayers);
    console.log("this is pro" + playerHighlighted);

    return { players, setPlayers, playerHighlighted, nonHighlightedPlayers };
}

export default usePlayer