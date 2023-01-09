import { Card } from 'react-bootstrap';
import { LoginForm } from './../components/Login.component'

export function Login() {
    return (
        <div>
            <div className="center">
                <Card className='login' bg="light">
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', fontSize: '35px' }}>Sign in to COBOK</Card.Title>
                        <Card.Text>
                            <LoginForm />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>

    );
}
