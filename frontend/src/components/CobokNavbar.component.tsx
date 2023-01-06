import { Nav, Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function CobokNavbar() {
    let navigate = useNavigate();
    return (
        <>
            <Navbar className='CobokNavbar' fixed="top" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => { navigate('/') }}>
                        💰COBOK
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => { navigate('/AutoTrading') }}>코인자동매매</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={() => { navigate('/Login') }}>로그인</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}