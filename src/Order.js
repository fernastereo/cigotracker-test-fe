import React, { Component } from 'react';
import { getOrders, addOrder, updateOrder, deleteOrder } from './OrdersFunctions';

class Order extends Component{
  constructor(){
    super();
    this.state = {
      firstname: '', 
      lastname: '', 
      email: '',
      phonenumber: '', 
      scheduleddate: '', 
      streetaddress: '', 
      city_id: '', 
      zipcode: '',
      editDisabled: false,
      items: []
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    this.getAll();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getAll = () => {
    getOrders().then(data => {
      this.setState({
        firstname: '', 
        lastname: '', 
        email: '',
        phonenumber: '', 
        scheduleddate: '', 
        streetaddress: '', 
        city_id: '', 
        zipcode: '',
        editDisabled: false,
        items: [...data]
      },
      () => {
        console.log(this.state.items);
      })
    })
  }

  onSubmit = e => {
    e.preventDefault();
    addOrder(this.state.firstname, this.state.lastname, this.state.email, this.state.phonenumber, this.state.scheduleddate, this.state.streetaddress, this.state.city_id, this.state.zipcode).then(() => {
      this.getAll();
    })
    this.setState({
      firstname: '', 
      lastname: '', 
      email: '',
      phonenumber: '', 
      scheduleddate: '', 
      streetaddress: '', 
      city_id: '', 
      zipcode: '',
    })
  }

  onUpdate = e => {
    e.preventDefault();
    updateOrder(this.state.id, this.state.statusorder_id).then(() => {
      this.getAll();
    })
    this.setState({
      firstname: '', 
      lastname: '', 
      email: '',
      phonenumber: '', 
      scheduleddate: '', 
      streetaddress: '', 
      city_id: '', 
      zipcode: '',
    })
  }

  
  onEdit = (itemid, e) => {
    e.preventDefault();
    var data = [this.state.items];
    data.forEach((item, index) => {
      if (item.id === itemid) {
        this.setState({
          id: item.id,
          editDisabled: true
        })
      }
    })
  }

  onDelete = (val, e) => {
    e.preventDefault();
    deleteOrder(val).then(() => {
      this.getAll();
    });
  }

  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form className="mb-4" onSubmit={this.onSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" className="form-control form-control-sm" id="firstname" name="firstname" value={this.state.firstname || ''} onChange={this.onChange.bind(this)}></input>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" className="form-control form-control-sm" id="lastname" name="lastname" value={this.state.lastname || ''} onChange={this.onChange.bind(this)}></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" className="form-control form-control-sm" id="email" name="email" value={this.state.email || ''} onChange={this.onChange.bind(this)}></input>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="phonenumber">Phone Number</label>
                  <input type="text" className="form-control form-control-sm" id="phonenumber" name="phonenumber" value={this.state.phonenumber || ''} onChange={this.onChange.bind(this)}></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="scheduleddate">Scheduled Date</label>
                  <input type="date" className="form-control form-control-sm" id="scheduleddate" name="scheduleddate" value={this.state.scheduleddate || ''} onChange={this.onChange.bind(this)}></input>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="streetaddress">Street Address</label>
                <input type="text" className="form-control form-control-sm" id="streetaddress" name="streetaddress" value={this.state.streetaddress || ''} onChange={this.onChange.bind(this)}></input>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="country">Country</label>
                  <select id="country" className="form-control form-control-sm">
                    <option>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="province">Province</label>
                  <select id="province" className="form-control form-control-sm">
                    <option>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="city_id">City</label>
                  <select id="city_id" className="form-control form-control-sm">
                    <option>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="zipcode">Zip Code</label>
                  <input type="text" className="form-control form-control-sm" id="zipcode" name="zipcode" value={this.state.zipcode || ''} onChange={this.onChange.bind(this)}></input>
                </div>
              </div>

              {!this.state.editDisabled ? (
                <button type="submit" 
                        className="btn btn-success btn-block" 
                        onClick={this.onSubmit.bind(this)}>Save
                </button>
              ) : (
                ''
              )}
              {this.state.editDisabled ? (
                <button type="submit" 
                        className="btn btn-primary btn-block" 
                        onClick={this.onUpdate.bind(this)}>Update
                </button>
              ) : (
                ''
              )}

            </form>

            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <td className="text-center">First Name</td>
                  <td className="text-center">Last Name</td>
                  <td className="text-center">Scheduled Date</td>
                  <td className="text-center">Actions</td>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.firstname}</td>
                    <td className="text-center">{item.lastname}</td>
                    <td className="text-center">{item.scheduleddate}</td>
                    <td className="text-center">
                      <button href="" 
                              className="btn btn-sm btn-info mr-1" 
                              disabled={this.state.editDisabled}
                              onClick={this.onEdit.bind(this, item.id)}>Edit
                      </button>
                      <button href="" 
                              className="btn btn-sm btn-danger" 
                              disabled={this.state.editDisabled}
                              onClick={this.onDelete.bind(this, item.id)}>Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Order;