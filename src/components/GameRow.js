import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GameSquare from './GameSquare';

class GameRow extends Component {

  renderSquares = () => {
    let y = this.props.row;
    let row = this.props.board[y];
    return row.map((isAlive, x) =>
      <GameSquare key={x + ',' + y} x={x} y={y}/>
    );
  }

  render() {
    return (
      <div style={{display: 'flex', flex: 1, backgroundColor: 'red'}}>
        {this.renderSquares()}
      </div>
    );
  }
}

GameRow.propTypes = {
  row: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  board: state.game.board
});

export default connect(mapStateToProps)(GameRow);