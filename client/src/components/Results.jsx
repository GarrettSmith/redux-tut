import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../action_creators';
import Winner from './Winner';
import Tally from './Tally';

export const Results = React.createClass({
  mixins: [
    PureRenderMixin,
  ],

  render: function() {
    return (
      this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <div className="results">
          <Tally pair={this.props.pair} tally={this.props.tally} />
          <div className="management">
            <button
              ref="next"
              className="next"
              onClick={this.props.next}
            >
              Next
            </button>
          </div>
        </div>
    );
  },
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner'),
  }
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);
