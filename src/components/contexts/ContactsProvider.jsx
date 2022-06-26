import React, { useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext();

export const useContacts = () => {
    return useContext(ContactsContext);
}

export const ContactsProvider = ({children}) => {

    const [contacts, setContacts] = useLocalStorage("contacts", []);
    if(contacts == null) setContacts(() => []);
    
    const createContact = (id, name) => {
        setContacts(pre => ([...pre, {id, name}]))
    }

    const el = (
        <ContactsContext.Provider value={{contacts, createContact}}>
            {children}
        </ContactsContext.Provider>
    )

    return el;
}