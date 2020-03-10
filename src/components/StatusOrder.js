import React, { Component } from 'react'  
import axios from 'axios';  

class StatusOrder extends Component {  
  constructor(props) {  
    super(props)  
    this.state = {  
      status_id: '',  
      statusorders: []  
    }  
  }  

  componentDidMount() {  
    axios.get('https://cigotracker-test-api.herokuapp.com/api/statusorders').then(response => {  
      console.log(response.data);  
      this.setState({  
        statusorders: response.data  
      });  
    });  
  }  

  changeStatus = (e) => {  
    this.setState({ status_id: e.target.value });
  }  

  render() {  
    return (
      <div>
        <select id="statusorders" className="form-control form-control-sm" name="statusorders" onChange={this.changeStatus}>
          <option key="0" value="0">-- Select One --</option>
          {
            this.state.statusorders.map((res, i) => {
              return <option key={i} value={res.id}>{res.name}</option>  
            })
          }
        </select>
      </div>
    )  
  }  
}  
  
export default StatusOrder  