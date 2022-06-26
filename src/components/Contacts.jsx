import { ListGroup } from "react-bootstrap"
import { useContacts } from "./contexts/ContactsProvider";
import { v4 } from "uuid"

const Contacts = () => {

    const { contacts } = useContacts();

    const el = (
        <ListGroup variant="flush">
            {contacts.map(item => (
                <ListGroup.Item key={v4()}>
                    {item.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )

    return el;
}

export default Contacts