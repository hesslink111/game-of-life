import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FLIP_CELL } from '../constants/ActionTypes';

class GameSquare extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    let x = this.props.x;
    let y = this.props.y;
    return nextProps.board[y][x] !== this.props.board[y][x];
  }

  onClickSquare = () => {
    this.props.flipCell(this.props.x, this.props.y);
  }

  getColor = () => {
    return this.props.board[this.props.y][this.props.x] ? 'black' : 'grey';
  }

  render() {
    return (
      <div onClick={this.onClickSquare} style={{flex: 1, display: 'flex'}}>
        <div style={{flex: 1, border: '1px solid black', backgroundColor: this.getColor()}}/>
      </div>
    );
  }
}

GameSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  board: state.game.board
});

const mapDispatchToProps = dispatch => ({
  flipCell: (x, y) => dispatch({type: FLIP_CELL, payload: {x, y}})
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSquare);