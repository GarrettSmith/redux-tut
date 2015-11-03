import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES',
      entries: ['A'],
    };
    const nextState = fromJS({
      entries: ['A'],
    });

    expect(reducer(initialState, action)).to.equal(nextState);
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['A', 'B'],
    });
    const action = {type: 'NEXT'};
    const nextState = fromJS({
      entries: [],
      vote: {
        pair: ['A', 'B'],
      },
    });

    expect(reducer(initialState, action)).to.equal(nextState);
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: {
          A: 1,
          B: 2,
        },
      },
    });
    const action = {
      type: 'VOTE',
      entry: 'A',
    };
    const nextState = fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: {
          A: 2,
          B: 2,
        },
      },
    });

    expect(reducer(initialState, action)).to.equal(nextState);
  });

  it('has an initial state', () => {
    expect(reducer(undefined, {})).to.equal(Map());
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['A', 'B']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'A'},
      {type: 'VOTE', entry: 'B'},
      {type: 'VOTE', entry: 'B'},
      {type: 'VOTE', entry: 'A'},
      {type: 'VOTE', entry: 'A'},
      {type: 'NEXT'},
    ];
    const finalState = fromJS({
      winner: 'A',
    });
    expect(actions.reduce(reducer, undefined)).to.equal(finalState);
  });
});
