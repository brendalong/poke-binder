import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import View from './View';
import Footer from './Footer';



class App extends Component {
  constructor() {
    super();

    // getinitialState
    this.state = {
      login: false,
    };
  }

  


  render() {

    return (
      <div>
        <Header />
        <View />
        <Footer />
      </div>
    );
  }
}

export default App;
