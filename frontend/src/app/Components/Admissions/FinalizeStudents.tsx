'use client'
import { useState, useEffect } from "react"
import { WalletConnection } from "@/app/Services"



export function FinalizeStudents(props:{wallet:WalletConnection}) {
    const [student, setStudent] = useState("");
    const [messageShown, setMessageShown] = useState(false);
    const [message, setMessage] = useState("");


    useEffect(() => {
        props.wallet.contract?.on("StudentsComing", (currentStudentCount: number) => {
            setMessage("Number of Students waiting: " + currentStudentCount);
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
        <textarea name="student" id="" value={student} onChange={(e)=>{setStudent(e.target.value)}}></textarea>

        <button onClick={()=>{props.wallet.finalizeAStudent(student), ()=>{console.log("Student Finalized")}}}>Finalize Student</button>
        
    </div>
    )
}