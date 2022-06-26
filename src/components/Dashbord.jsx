import { Fragment } from "react"
import { useConversations } from "./contexts/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import SideBar from "./SideBar";

const Dashbord = ({ id }) => {

    const { selectedConversation } = useConversations();

    const el = (
        <div className="d-flex" style={{height: "100vh"}}>
            <SideBar id={id} />
            {selectedConversation && <OpenConversation />}
        </div>
    )

    return el;
}

export default Dashbord