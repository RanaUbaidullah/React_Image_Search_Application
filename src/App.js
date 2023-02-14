import React, { Component } from 'react';
import Search from "./Image/components/search/Search";
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component{
  render(){
    return(
      <MuiThemeProvider >
      <div style={{backgroundColor: 'white'}}>
      <Search />
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
