import roomService from "../app/service/RoomService";
import userStore from "../app/stores/UserStore";
import roomStore from "../app/stores/room/RoomStore";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";

const dev = observer(() => {

    useEffect(() => {
    }, [roomStore])

    let createRoom = () => {
        console.log("Creating...")
        roomService.createRoom(userStore.user, "attack on titan", (message) => {
            console.log(message)
        })
    }

    let connect = () => {
        let roomName = prompt('Please enter the room name');
        roomStore.openConnection(roomName)
    }

    let sendMessage = () => {
        console.log("Sending Message")
        roomService.sendMessage("Test Test")
    }

    let disconnect = () => {
        roomStore.disconnect()
    }


    return (
        <div>
            <h1 className="text-white" onClick={() => createRoom()}>
                Create
            </h1>

            <h1 className="text-white" onClick={() => connect()}>
                Connect
            </h1>

            <h1 className="text-white" onClick={() => sendMessage()}>
                Send Test Message
            </h1>

            <h1 className="text-white" onClick={() => disconnect()}>
                Disconnect
            </h1>

            <hr />

            {roomStore.loaded && (
                <div className="text-white">
                    <h1>Owner</h1>
                    {roomStore.room.users.map((user) => <h1>{user.name}</h1>)}
                </div>
            )}
        </div>
    )
})

export default dev