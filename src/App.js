import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import GameBoard from './components/GameBoard';
import { ITERATE, CLEAR_BOARD } from './constants/ActionTypes';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      autoIterating: false,
      autoIteratorHandle: null
    };
  }

  onClickIterate = () => {
    this.props.iterate();
  }

  onClickAutoIterate = () => {
    if(this.state.autoIterating) {
      this.stopAutoIterating();
    } else {
      this.startAutoIterating();
    }
  }

  startAutoIterating = () => {
    let handle = setInterval(() => {
      this.props.iterate();
    }, 150);

    this.setState({
      ...this.state,
      autoIterating: true,
      autoIteratorHandle: handle
    });
  }

  stopAutoIterating = () => {
    clearInterval(this.state.autoIteratorHandle);

    this.setState({
      ...this.state,
      autoIterating: false,
      autoIteratorHandle: null
    });
  }

  onClickClearBoard = () => {
    this.props.clearBoard();
  }

  render() {
    return (
      <div className="App" style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <div className="App-header" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h2>Game of Life</h2>
        </div>
        <p className="App-intro">
          
        </p>
        <GameBoard/>
        <button
          style={{height: '50px', backgroundColor: 'orangered'}}
          onClick={this.onClickIterate}>
          Iterate Once
        </button>
        <button
          style={{height: '50px', backgroundColor: 'yellowgreen'}}
          onClick={this.onClickAutoIterate}>
          {this.state.autoIterating ? 'Stop Auto Iterating' : 'Start Auto Iterating'}
        </button>
        <button
          style={{height: '50px', backgroundColor: '#ddd'}}
          onClick={this.onClickClearBoard}>
          Clear Board
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //board: state.game.board
});

const mapDispatchToProps = dispatch => ({
  iterate: () => dispatch({type: ITERATE}),
  clearBoard: () => dispatch({type: CLEAR_BOARD})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
