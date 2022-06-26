import Login from './components/Login';
import Dashbord from './components/Dashbord';
import useLocalStorage from "./components/hooks/useLocalStorage";
import { ContactsProvider } from "./components/contexts/ContactsProvider"
import { ConversationsProvider } from './components/contexts/ConversationsProvider';
import { SocketProvider } from './components/contexts/SocketProvider';
import './App.css'

const App = () => {

    const [id, setId] = useLocalStorage("id");

    const dashbord = (
        <SocketProvider id={id}>
            <ContactsProvider>
                <ConversationsProvider id={id}>
                    <Dashbord id={id} />
                </ConversationsProvider>
            </ContactsProvider>
        </SocketProvider>
    )

    const el = (
        <>
            {id ? dashbord : <Login setId={setId} />}
        </>
    )

    return el;
}

export default App
