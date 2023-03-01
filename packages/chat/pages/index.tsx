import { useState } from "react"
import Prompt from "../components/prompt";

type Message = {
    id: string
    content: string
};

type Messages = Message[];

export default function Index() {
    const [messages, setMessages] = useState<Messages>([]);
    const [id, setNewId] = useState(0);
    const nextId = () => {
        const lastId = id;
        setNewId(id + 1);
        return lastId;
    }

    return <>
        <h1>Hello, world!</h1>
        <div>
            <ul>
                {
                    messages.map(msg => <li key={msg.id}>
                        {msg.content}
                    </li>)
                }
            </ul>
        </div>
        <Prompt onSendMessage={content => {
            const newMessage = {
                id: nextId().toString(),
                content: content
            }
            setMessages([...messages, newMessage])
        }}/>
    </>
}