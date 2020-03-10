import React, { Component } from 'react'  
import axios from 'axios';  

class Location extends Component {  
  constructor(props) {  
    super(props)  
    this.state = {  
      StateId:'',  
      CountryId: '',  
      CountryData: [],  
      StateData: [],  
      CityData: []  
    }  
  }  

  componentDidMount() {  
    axios.get('https://cigotracker-test-api.herokuapp.com/api/statusorders').then(response => {  
      console.log(response.data);  
      this.setState({  
        CountryData: response.data  
      });  
    });  
  }  

  ChangeteState = (e) => {  
    this.setState({ CountryId: e.target.value });  
    axios.get('https://cigotracker-test-api.herokuapp.com/api/countries/' + e.target.value + '/provinces' ).then(response => {  
      console.log(response.data);  
      this.setState({  
        StateData: response.data,  
      });  
    });  
  }  

  ChangeCity = (e) => {  
    this.setState({ StateId: e.target.value });  
    axios.get('https://cigotracker-test-api.herokuapp.com/api/provinces/' + e.target.value + '/cities').then(response => {  
      console.log(response.data);  
      this.setState({  
        CityData: response.data  
      });  
    });  
  }  
  render() {  
    return (
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="countries">Country</label>
          <select id="countries" className="form-control form-control-sm" name="country" onChange={this.ChangeteState}>
            <option key="0" value="0">-- Select One --</option>
            {
              this.state.CountryData.map((res, i) => {
                return <option key={i} value={res.id}>{res.name}</option>  
              })
            }
          </select>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="provinces">Province</label>
          <select id="provinces" className="form-control form-control-sm" name="state" onChange={this.ChangeCity}>
            <option key="0" value="0">-- Select One --</option>
            {
              this.state.StateData.map((res, i) => {
                return <option key={i} value={res.id}>{res.name}</option>  
              })
            }
          </select>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="cities">City</label>
          <select id="cities" className="form-control form-control-sm" name="city">
            <option key="0" value="0">-- Select One --</option>
            {
              this.state.CityData.map((res, i) => {
                return <option key={i} value={res.id}>{res.name}</option>  
              })
            }
          </select>
        </div>
      </div>
    )  
  }  
}  
  
export default Location  