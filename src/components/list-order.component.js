import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import OrderTableRow from './OrderTableRow';


export default class OrderList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    axios.get('http://cigotracker-test-api.test/api/orders/')
      .then(res => {
        this.setState({
          orders: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.orders.map((res, i) => {
      return <OrderTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Scheduled Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}