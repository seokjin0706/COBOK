import { Form, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
export function LoginForm() {
    let navigate = useNavigate();
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter Username" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button className='login-btn' variant="light" type="submit">
                Login
            </Button>
            <Button onClick={()=>{ navigate('/SignUp') }} className='login-btn' variant="light" type="submit">
                Create Account
            </Button>
        </Form>
    );
}


