import { Fragment, useState } from "react"
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "./contexts/ContactsProvider"
import { useConversations } from "./contexts/ConversationsProvider"

const NewConversationModal = ({ closeModal }) => {

    const { contacts } = useContacts();
    const { createConversation, setNum } = useConversations();
    const [selectedContactIds, setSelectedContactIds] = useState([]);

    const submitHandler = (event) => {
        event.preventDefault();
        createConversation(selectedContactIds)
        closeModal();
        setNum(pre => ((pre + 1 +2) % 2));
    }

    const checkboxChangeHandler = (contactId) => {
        setSelectedContactIds(pre => {
            if(pre.includes(contactId)) {
                return pre.filter(prevId => {
                    return contactId !== prevId;
                })
            } else {
                return [...pre, contactId];
            }
        })
    }

    const el = (
        <Fragment>
            <Modal.Header>Creat Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    {contacts.map(item => (
                        <Form.Group controlId={item.id} key={item.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(item.id)}
                                label={item.name}
                                onChange={() => checkboxChangeHandler(item.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit" className="mt-3">Create</Button>
                </Form>
            </Modal.Body>
        </Fragment>
    )

    return el;
}

export default NewConversationModal