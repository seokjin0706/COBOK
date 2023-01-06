import { Card } from 'react-bootstrap';
import { SignUpForm } from '../components/SignUp.component'

export function SignUp() {
    return (
        <div>
            <div className="center">
                <Card className='login' bg="light">
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', fontSize: '35px' }}>Sign Up to COBOK</Card.Title>
                        <Card.Text>
                            <SignUpForm />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>

    );
}