import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameRow from './GameRow';

class GameBoard extends Component {

  renderRows = () => {
    return this.props.board.map((row, y) =>
      <GameRow key={y} row={y}/>
    );
  }

  render() {
    return (
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div  style={{width: '500px', height: '500px', display: 'flex', flexDirection: 'column', backgroundColor: 'blue', border: '1px solid black'}}>
          {this.renderRows()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.game.board
});

export default connect(mapStateToProps)(GameBoard);