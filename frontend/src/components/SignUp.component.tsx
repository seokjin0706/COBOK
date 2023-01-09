import { Form, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
export function SignUpForm() {
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>바이낸스 API KEY</Form.Label>
                <Form.Control type="Text" placeholder="API KEY" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>바이낸스 Secret KEY</Form.Label>
                <Form.Control type="password" placeholder="Secert KEY" />
            </Form.Group>
            <Button onClick={()=>{ navigate('/SignUp') }} className='login-btn' variant="light" type="submit">
                Create Account
            </Button>
        </Form>
    );
}


