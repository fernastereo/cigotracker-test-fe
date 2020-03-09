import axios from 'axios';

const BASE_URL = 'https://cigotracker-test-api.herokuapp.com/api/orders';

export const getOrders = () => {
  return axios
    .get(BASE_URL, 
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
    .then( res => { 
      return res.data 
    })
}

export const addOrder = (firstname, lastname, email, phonenumber, scheduleddate, streetaddress, city_id, zipcode) => {
  return axios 
    .post(BASE_URL, {
      firstname: firstname, 
      lastname: lastname, 
      email: email,
      phonenumber: phonenumber, 
      scheduleddate: scheduleddate, 
      streetaddress: streetaddress, 
      city_id: city_id, 
      zipcode: zipcode
    },
    {
      headers: {'Content-Type': 'appilication/json'}
    }
  )
  .then( res => {
    console.log(res);
  })
}

export const deleteOrder = id => {
  axios.delete(`${BASE_URL}/${id}`, {
    headers: {'Content-Type': 'application/json'}
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err)
  })
}

export const updateOrder = (id, statusorder_id) => {
  return axios
    .put(`${BASE_URL}/${id}`, 
      {
        statusorder_id: statusorder_id
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err)
    })
}