import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class LoginModal extends React.Component {
  state = {
    modal: false
  };

  toggle = (event) => {
    if (event.target.id === "login"){
      this.props.loginWithGoogle()
    }
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Save your own Poke Binder</ModalHeader>

         {/* <ModalBody>Login with User Name and Password
          <Button color="primary" id="loginEmail" onClick={this.toggle}>Login With Email</Button>{' '}
         </ModalBody> */}
          <ModalFooter>
                <Button color="info" id="login" onClick={this.toggle}>Login With Google</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default LoginModal;