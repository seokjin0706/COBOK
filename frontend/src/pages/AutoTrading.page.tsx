import { Button, Card } from 'react-bootstrap';
import { AutoTradingResult } from './../components/AutoTrading.component';

export function AutoTrading() {
    return (
        <div>
            <div className="center">
                <Card className='AutoTrading' bg="light">
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', fontSize: '35px' }}>AutoTraing</Card.Title>

                        <Card.Text>
                            <Button className='login-btn' variant="light" type="submit">
                                코인 자동매매 시작
                            </Button>
                            <Button className='login-btn' variant="light" type="submit">
                                코인 자동매매 종료
                            </Button>
                            <AutoTradingResult />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>

    );
}