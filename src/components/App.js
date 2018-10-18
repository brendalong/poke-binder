import React, { Component } from 'react';
import './App.css';
import View from './View';
import Footer from './Footer';



class App extends Component {
  constructor() {
    super();

    // getinitialState
    this.state = {
      
    };
  }

  


  render() {

    return (
      <div>
        <View />
        <Footer />
      </div>
    );
  }
}

export default App;
