import { WalletConnection } from "@/app/Services"
import { useState, useEffect } from "react"

export function SendStudents(props:{wallet:WalletConnection}) {
    const [messageShown, setMessageShown] = useState(false);
    const [message, setMessage] = useState("");


    useEffect(() => {
        props.wallet.contract?.on("TooSmall", () => {
            setMessage("Call more students up!");
            setMessageShown(true);
        })
    },[])

    if (messageShown){
        return (
            <div>
                <h1>Notice:</h1>
                <p>{message}</p>
                <button onClick={()=>{setMessageShown(false)}}>Close</button>
            </div>
        )
    }
    return (
    <div>
        <button onClick={()=>{props.wallet.sendStudents(["Bob", "Iggy", "Jess"], ()=>{console.log("Sent")})}}>Send Students</button>

        <button onClick={async ()=>{
            let result = await props.wallet.contract?.currentStudents(0);
            console.log(result)
        }}>Get Students</button>
    </div>
    )
}