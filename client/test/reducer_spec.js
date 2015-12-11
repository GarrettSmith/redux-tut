import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const state = Map({
      vote: Map({
        pair: List(['A', 'B']),
        tally: Map({'A': 1}),
      }),
    });
    const action = {
      type: 'SET_STATE',
      state: state,
    };

    expect(reducer(initialState, action)).to.equal(state);
  });

  it('handlers SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const state = {
      vote: fromJS({
        pair: ['A', 'B'],
        tally: {'A': 1},
      }),
    };
    const action = {
      type: 'SET_STATE',
      state: state,
    };

    expect(reducer(initialState, action)).to.equal(fromJS(state));
  });

  it('handles SET_STATE without initial state', () => {
    const state = Map({
      vote: Map({
        pair: List(['A', 'B']),
        tally: Map({'A': 1}),
      }),
    });
    const action = {
      type: 'SET_STATE',
      state: state,
    };

    expect(reducer(undefined, action)).to.equal(state);
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: {
          'A': 1,
        },
      },
    });
    const action = {
      type: 'VOTE',
      entry: 'A',
    };
    const nextState = state.set('hasVoted', 'A');

    expect(reducer(state, action)).to.equal(nextState);
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: {
          'A': 1,
        },
      },
    });
    const action = {
      type: 'VOTE',
      entry: 'X',
    };

    expect(reducer(state, action)).to.equal(state);
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['X', 'Y'],
        tally: {'X': 1},
        hasVoted: 'X',
      },
    });
    const state = fromJS({
      vote: {
        pair: ['A', 'B'],
      },
    });
    const action = {
      type: 'SET_STATE',
      state: state,
    };

    expect(reducer(initialState, action)).to.equal(state);
  });

});
