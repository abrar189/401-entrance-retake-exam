import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import CardApi from './CardApi';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArry: [],
    }
  }
  componentDidMount = async () => {

    let result = await axios.get(`${process.env.REACT_APP_SERVER}/dataAPI`);
    this.setState({
      dataArry: result.data
    })
  }
  // http://localhost:3006/addTofav

  addToFav = async (index) => {
    const objData = {
      email: this.props.auth0.user.email,
      instructions: this.state.dataArry[index].instructions,
      photo: this.state.dataArry[index].photo,
      name: this.state.dataArry[index].name,

    }
    await axios.post(`${process.env.REACT_APP_SERVER}/addTofav`, objData);
  }
  render() {
    return (
      <>
        <h1>API Flowers</h1>
        <CardApi dataArry={this.state.dataArry} addToFav={this.addToFav} />
      </>
    )
  }
}

export default withAuth0(Home);
