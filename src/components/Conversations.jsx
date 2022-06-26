import { ListGroup } from "react-bootstrap"
import { useConversations } from "./contexts/ConversationsProvider"

const Conversations = () => {
    const { conversations, selectConversationIndex } = (useConversations() ? useConversations() : {conversations: [], selectConversationIndex: function(){}});

    const changeHandler = (index) => {
        selectConversationIndex(index);
    }

    const el = (
        <ListGroup variant="flush">
            {conversations ? conversations.map((item, index) => (
                <ListGroup.Item
                    key={index}
                    action
                    onClick={() => changeHandler(index)}
                    active={item.selected}
                >
                    {item.recipients.map(recipient => recipient.name).join(", ")}
                </ListGroup.Item>
            )) :
            ""}
        </ListGroup>
    )

    return el;
}

export default Conversations