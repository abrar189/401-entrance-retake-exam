import React, { Component } from 'react'
import { Card, Col, Row ,Button} from 'react-bootstrap'


export class CardApi extends Component {
    render() {
        return (
            <div>
                <Row xs={1} md={4} className="g-4">
                    {this.props.dataArry.map((item, idx) => (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={item.photo} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.instructions}
                                    </Card.Text>
                                </Card.Body>
                                <Button variant="primary" onClick={()=>{this.props.addToFav(idx)}}>
                                    Add To Fav
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}

export default CardApi
