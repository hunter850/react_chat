import React, { useContext, useEffect, useState, useCallback } from "react"
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

export const ConversationsContext = React.createContext();

export const useConversations = () => {
    return useContext(ConversationsContext);
}

export const ConversationsProvider = ({id, children}) => {

    const [conversations, setConversations] = useLocalStorage("conversations", []);
    if(conversations == null) setConversations(() => []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts, setContacts } = useContacts();
    if(contacts == null) setContacts(() => []);
    const socket = useSocket();
    
    const createConversation = (recipients) => {
        setConversations(pre => ([...pre, {recipients, message: []}]));
    }

    const addMessageToConversation = useCallback(({recipients, text, sender}) => {
        setConversations(pre => {
            let madeChange = false;
            const newMessage = {sender, text};
            const newConversations = pre.map(conversation => {
                if(arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true;
                    if(Array.isArray(conversation.messages)) {
                        return {...conversation, messages: [...conversation.messages, newMessage]}
                    } else {
                        return {...conversation, messages: [newMessage]}
                    }
                }
                return conversation;
            })

            if(madeChange) {
                return newConversations;
            } else {
                return [...pre, {recipients, messages: [newMessage]}]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if(socket == null) return
        socket.on("receive-message", addMessageToConversation);

        return () => socket.off("receive-message")
    }, [socket, addMessageToConversation]);

    const sendMessage = (recipients, text) => {
        socket.emit("send-message", {recipients, text});
        addMessageToConversation({recipients, text, sender: id})
    }
    
    const [value, setValue] = useState({});
    const [num, setNum] = useState(0);

    useEffect(() => {
        // console.log("conversations: ", conversations);
        // console.log("contacts: ", contacts);
        const formatedConversations = conversations.map((item, index) => {
            const recipients = item.recipients.map(recipient => {
                const contact = contacts.find(contact => {
                    return contact.id === recipient
                })
                const name = (contact && contact.name) || recipient;
                return {id: recipient, name}
            })

            if(item.messages == undefined) item.messages = [];
            const messages = item.messages.map(message => {
                const contact = contacts.find(contact => {
                    return contact.id === message.sender;
                })
                const name = (contact && contact.name) || message.sender;
                const fromMe = id === message.sender;
                return {...message, senderName: name, fromMe};
            })

            const selected = (index === selectedConversationIndex);
            return {...conversations, messages, recipients, selected}
        })
        // console.log("formatedConversations: ", formatedConversations);
        setValue( {
            conversations: formatedConversations,
            selectedConversation: formatedConversations[selectedConversationIndex],
            sendMessage,
            selectConversationIndex: setSelectedConversationIndex,
            createConversation,
            setNum
        })
    }, [selectedConversationIndex, num]);


    const el = (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )

    return el;
}

function arrayEquality(a, b) {
    if(a.length !== b.length) return false;
    a.sort();
    b.sort();

    return a.every((element, index) => {
        return element === b[index];
    })
}