import { useState, useRef, useCallback } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
import { useConversations } from "./contexts/ConversationsProvider";

const OpenConversation = () => {

    const [text, setText] = useState("");
    const { sendMessage, selectedConversation, setNum } = useConversations();
    const lastMessageRef = useRef(null);
    const setRef = useCallback(node => {
        if(node) {
            node.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        sendMessage(
            selectedConversation.recipients.map(r => r.id),
            text
        );
        setText("");
        setNum(pre => ((pre + 1 + 2) % 2));
    }

    const el = (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index;
                        return (
                            <div
                                ref={lastMessageRef ? setRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column ${message.fromMe ? "align-self-end" : ""}`}
                            >
                                <div
                                    className={`rounded px-2 py-1 ${message.fromMe ? "bg-primary text-white" : "border"}`}
                                >
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? "text-end" : ""}`}>{message.fromMe ? "You" : message.senderName}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={submitHandler}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: "75px", resize: "none" }}
                        />
                        <Button type="submit">Send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )

    return el;
}

export default OpenConversation