import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class LoginModal extends React.Component { 
  state = {
    modal: false
  };
  
  toggle = (event) => {
    if (event.target.id === "login"){
      console.log("let's login");
      this.props.loginWithGoogle()
    }
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            Login with Google to save your own PokeBinder
          </ModalBody>
          <ModalFooter>
            <Button color="primary" id="login" onClick={this.toggle}>Login</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;