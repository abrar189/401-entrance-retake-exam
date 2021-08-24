import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Col, Row, Button } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';
import Updatemodal from './Updatemodal';

class FavFlowers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArry: [],
      show:false,
      index:'',
      selectData:{},
    }
  }
  // http://localhost:3006/dataDB?email=
  componentDidMount = async () => {
    const email = this.props.auth0.user.email;

    let result = await axios.get(`${process.env.REACT_APP_SERVER}/dataDB?email=${email}`);
    this.setState({
      dataArry: result.data
    })
  }

  // http://localhost:3006/delete/idx
  deleteFun = async (index) => {
    const email = this.props.auth0.user.email;
    let result = await axios.delete(`${process.env.REACT_APP_SERVER}/delete/${index}?email=${email}`);
    this.setState({
      dataArry: result.data
    })
  }

  handleClose=async()=>{
    this.setState({
      show:false,
    })
  }
  handleshow=async(index)=>{
    this.setState({
      show:true,
      index:index,
      selectData:{
        instructions: this.state.dataArry[index].instructions,
        photo: this.state.dataArry[index].photo,
        name: this.state.dataArry[index].name,
      }

    })
  }
  updateFun =async(e)=>{
    e.preventDefault();
    const objData = {
      email: this.props.auth0.user.email,
      instructions: e.target.instructions.value,
      photo: e.target.photo.value,
      name: e.target.name.value,

    }
    let result = await axios.put(`${process.env.REACT_APP_SERVER}/update/${this.state.index}`,objData);
    this.setState({
      dataArry: result.data,
      show:false,

    })
  }

  render() {
    return (
      <>
        <h1>My Favorite Flowers</h1>
        <Row xs={1} md={4} className="g-4">
          {this.state.dataArry.map((item, idx) => (
            <Col>
              <Card>
                <Card.Img variant="top" src={item.photo} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.instructions}
                  </Card.Text>
                </Card.Body>
                <Button variant="primary" onClick={() => { this.deleteFun(idx) }}>
                  DELETE
                </Button>
                <Button variant="primary" onClick={() => { this.handleshow(idx) }}>
                  UPDATE
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Updatemodal handleClose={this.handleClose} updateFun={this.updateFun} show={this.state.show} 
        selectData={this.state.selectData} />
      </>
    )
  }
}

export default withAuth0(FavFlowers);
