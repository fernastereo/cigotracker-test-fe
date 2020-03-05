import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios'
import OrderList from './list-order.component';
import Swal from 'sweetalert2';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class CreateOrder extends Component {
      constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeScheduledDate = this.onChangeScheduledDate.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      scheduledDate: '',
      address: '',
      country: '',
      province: '',
      city: '',
      zipCode: ''
    }
  }

  onChangeFirstName(e) {
    this.setState({firstName: e.target.value})
  }

  onChangeLastName(e) {
    this.setState({lastName: e.target.value})
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangePhoneNumber(e) {
    this.setState({phoneNumber: e.target.value})
  }

  onChangeScheduledDate(e) {
    this.setState({scheduledDate: e.target.value})
  }

  onChangeAddress(e) {
    this.setState({address: e.target.value})
  }

  onChangeZipCode(e) {
    this.setState({zipCode: e.target.value})
  }
  
  onSubmit(e) {
    e.preventDefault()
    const order = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      scheduledDate: this.state.scheduledDate,
      address: this.state.address,
      country: this.state.country,
      province: this.state.province,
      city: this.state.city,
      zipCode: this.state.zipCode
    };
    axios.post('http://cigotracker-test-api.test/api/orders/', order)
      .then(res => console.log(res.data));
    // console.log(`Expense successfully created!`);
    // console.log(`Name: ${this.state.name}`);
    // console.log(`Amount: ${this.state.amount}`);
    // console.log(`Description: ${this.state.description}`);
    Swal.fire(
  'Good job!',
  'Order Added Successfully',
  'success'
)

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      scheduledDate: '',
      address: '',
      country: '',
      province: '',
      city: '',
      zipCode: ''      
    })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control size="sm" value={this.state.firstName} onChange={this.onChangeFirstName} placeholder="Enter First Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control size="sm" value={this.state.lastName} onChange={this.onChangeLastName} placeholder="Enter Last Name" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control size="sm" value={this.state.email} onChange={this.onChangeEmail} type="email" placeholder="you@sample.com" />
          </Form.Group>

          <Form.Group as={Col} controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control size="sm" value={this.state.phoneNumber} onChange={this.onChangePhoneNumber} placeholder="+1 (888) 123-4567" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="scheduledDate"> 
            <Form.Label>Scheduled Date</Form.Label>
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={this.state.scheduledDate} onChange={this.onChangeScheduledDate} 
                type="Date"
                placeholder="Scheduled Date"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a valid date.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="address">
            <Form.Label>Street Address</Form.Label>
            <Form.Control size="sm" value={this.state.address} onChange={this.onChangeAddress} placeholder="Enter your address" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control size="sm" as="select">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="province">
            <Form.Label>Province/State</Form.Label>
            <Form.Control size="sm" as="select">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control size="sm" as="select">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="zipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control size="sm" value={this.state.zipCode} onChange={this.onChangeZipCode} placeholder="" />
          </Form.Group>
        </Form.Row>

        <Row>
          <Col md={{ span: 4, offset: 8 }}>
            <Button className="mr-4" variant="danger">
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <br></br>
      <br></br>

      <OrderList></OrderList>
    </div>);
  }
}
