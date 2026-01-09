import { LightningElement, track } from 'lwc';
import createContact from '@salesforce/apex/RegistrationController.createContact';
import createCommunityUser from '@salesforce/apex/RegistrationController.createCommunityUser';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RegistrationComp extends LightningElement {
  @track firstName = '';
  @track lastName = '';
  @track email = '';
  @track username = '';
  @track accName = '';

  handleFirstName(event) {
    this.firstName = event.target.value;
  }

  handleLastName(event) {
    this.lastName = event.target.value;
  }

  handleEmail(event) {
    this.email = event.target.value;
  }

  handleUserName(event) {
    this.username = event.target.value;
  }

  handleAccountName(event){
    this.accName = event.target.value;
  }

  createContactRecord(){
    console.log('started',this.firstName, this.lastName, this.email, this.accName);
    this.createCommunityUserMethod(this.firstName,this.lastName,this.email,this.username, this.accName);
    console.log('ended');
  }

  createCommunityUserMethod(firstName, lastName, email, username, accName){
    createCommunityUser({firstname:firstName, lastname:lastName, email:email, username:username, accname:accName})
    .then(result => {
      this.showToastMethod('Community user is created',result,'success');
      console.log('Result: ',result);
    })
    .catch(error =>{
      this.showToastMethod('Community User is not created',error.body.message,'error');
      console.log('Error: ',error);
    })
  }

  showToastMethod(title, message, variant){
    this.dispatchEvent(new ShowToastEvent({
        title: title,
        message:message,
        variant:variant 
      }))
  }


  // startFlow() {
  //   const flow = this.template.querySelector('lightning-flow');
  //   if (!flow) {
  //     return;
  //   }
  //   const inputVariables = [
  //     { name: 'FirstName', type: 'String', value: this.firstName },
  //     { name: 'LastName', type: 'String', value: this.lastName },
  //     { name: 'Email', type: 'String', value: this.email },
  //     { name: 'Username', type: 'String', value: this.username }
  //   ];
  //   flow.startFlow('Customer_Registration_Flow', inputVariables);
  //   alert('Flow Started');
  // }

  // handleFlowStatusChange(event) {
  //   // Optionally handle FINISHED status
  //   const status = event.detail.status;
  //   alert(status);
  // }
}