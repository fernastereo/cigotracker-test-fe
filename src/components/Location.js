import React, { Component } from 'react'  
import axios from 'axios';  

class Location extends Component {  
  constructor(props) {  
    super(props)  
    this.state = {  
      province_id:'',  
      country_id: '',  
      countries: [],  
      provinces: [],  
      cities: []  
    }  
  }  

  componentDidMount() {  
    axios.get('https://cigotracker-test-api.herokuapp.com/api/countries').then(response => {  
      console.log(response.data);  
      this.setState({  
        countries: response.data  
      });  
    });  
  }  

  changeCountry = (e) => {  
    this.setState({ country_id: e.target.value });  
    axios.get('https://cigotracker-test-api.herokuapp.com/api/countries/' + e.target.value + '/provinces' ).then(response => {  
      console.log(response.data);  
      this.setState({  
        provinces: response.data,  
      });  
    });  
  }  

  changeProvince = (e) => {  
    this.setState({ province_id: e.target.value });  
    axios.get('https://cigotracker-test-api.herokuapp.com/api/provinces/' + e.target.value + '/cities').then(response => {  
      console.log(response.data);  
      this.setState({  
        cities: response.data  
      });  
    });  
  }  
  render() {  
    return (
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="countries">Country</label>
          <select id="countries" className="form-control form-control-sm" name="country" onChange={this.changeCountry}>
            <option key="0" value="0">-- Select One --</option>
            {
              this.state.countries.map((res, i) => {
                return <option key={i} value={res.id}>{res.name}</option>  
              })
            }
          </select>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="provinces">Province</label>
          <select id="provinces" className="form-control form-control-sm" name="state" onChange={this.changeProvince}>
            <option key="0" value="0">-- Select One --</option>
            {
              this.state.provinces.map((res, i) => {
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
              this.state.cities.map((res, i) => {
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