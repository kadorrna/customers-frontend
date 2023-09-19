import React, { Component } from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();

class CustomerCreateUpdate extends Component {
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);

        const customer_path = window.location?.pathname?.split('/customer/')
        if (this.props.params && this.props.params.pk){
          this.customerPK = this.props.params.pk
        } else {
          this.customerPK = customer_path.length > 1 ? customer_path[1].split('/')[0] : undefined
        }
      }

      componentDidMount(){
        if( this.customerPK !== undefined) 
        {
          customersService.getCustomer(this.customerPK).then((c)=>{
            this.refs.firstName.value = c.first_name;
            this.refs.lastName.value = c.last_name;
            this.refs.email.value = c.email;
            this.refs.phone.value = c.phone;
            this.refs.address.value = c.address;
            this.refs.description.value = c.description;
          })
        }
      }

      handleCreate(){
        customersService.createCustomer(
          {
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone": this.refs.phone.value,
            "address": this.refs.address.value,
            "description": this.refs.description.value
        }          
        ).then((result)=>{
          alert("Customer created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        customersService.updateCustomer(
          {
            "pk": this.customerPK,
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone": this.refs.phone.value,
            "address": this.refs.address.value,
            "description": this.refs.description.value
        }          
        ).then((result)=>{
          console.log(result);
          alert("Customer updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        if(this.customerPK){
          this.handleUpdate(this.customerPK);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              First Name:</label>
              <input className="form-control" type="text" ref='firstName' />
            
            <label>
              Last Name:</label>
              <input className="form-control" type="text" ref='lastName'/>
            
            <label>
              Phone:</label>
              <input className="form-control" type="text" ref='phone' />
            
            <label>
              Email:</label>
              <input className="form-control" type="text" ref='email' />
            
            <label>
              Address:</label>
              <input className="form-control" type="text" ref='address' />
            
            <label>
              Description:</label>
              <textarea className="form-control" ref='description' ></textarea>
              

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default CustomerCreateUpdate;