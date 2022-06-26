import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 } from "uuid"

const Login = ({ setId }) => {

    const idRef = useRef(null);

    const submitHandler = (event) => {
        event.preventDefault();
        setId(idRef.current.value);
    }

    const createNewId = () => {
        setId(v4());
    }

    const el = (
        <Container className="align-items-center d-flex" style={{ height: "100vh" }}>
            <Form className="w-100" onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Enter Your Id</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>
                <Button type="submit" className="me-2">Login</Button>
                <Button onClick={createNewId} variant="secondary" type="button">Create A Random Id</Button>
            </Form>
        </Container>
    )

    return el;
}

export default Login