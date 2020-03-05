import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import OrderList from './components/list-order.component';
import CreateOrder from './components/add-order.component';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={12}>
            <CreateOrder></CreateOrder>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
