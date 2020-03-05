import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class OrderTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    deleteOrder() {
        axios.delete('http://cigotracker-test-api.test/api/orders/' + this.props.obj.id)
            .then((res) => {
                console.log('Order removed!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.firstname}</td>
                <td>{this.props.obj.lastname}</td>
                <td>{this.props.obj.scheduleddate}</td>
                <td>
                    <Button onClick={this.deleteOrder} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}