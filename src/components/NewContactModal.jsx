import { Fragment, useRef } from "react"
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "./contexts/ContactsProvider";

const NewContactModal = ({ closeModal }) => {

    const idRef = useRef(null);
    const nameRef = useRef(null);
    const { createContact } = useContacts();

    const submitHandler = (event) => {
        event.preventDefault();
        createContact(idRef.current.value, nameRef.current.value);
        closeModal();
    }

    const el = (
        <Fragment>
            <Modal.Header>Creat Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </Fragment>
    )

    return el;
}

export default NewContactModal