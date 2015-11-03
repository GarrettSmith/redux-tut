import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('A', 'B');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({ entries }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['A', 'B'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List(entries),
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List(['A', 'B', 'C']),
      });
      const nextState = Map({
        entries: List(['C']),
        vote: Map({
          pair: List(['A', 'B']),
        }),
      });
      expect(next(state)).to.equal(nextState);
    });

    it('puts winner of current vote back in entries', () => {
      const state = Map({
        entries: List(['C', 'D', 'E']),
        vote: Map({
          pair: List(['A', 'B']),
          tally: Map({
            'A': 3,
            'B': 2,
          }),
        }),
      });
      const nextState = Map({
        entries: List(['E', 'A']),
        vote: Map({
          pair: List(['C', 'D']),
        }),
      });
      expect(next(state)).to.equal(nextState);
    });

    it('puts both from tied vote back in entries', () => {
      const state = Map({
        entries: List(['C', 'D', 'E']),
        vote: Map({
          pair: List(['A', 'B']),
          tally: Map({
            'A': 2,
            'B': 2,
          }),
        }),
      });
      const nextState = Map({
        entries: List(['E', 'A', 'B']),
        vote: Map({
          pair: List(['C', 'D']),
        }),
      });
      expect(next(state)).to.equal(nextState);
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        entries: List(),
        vote: Map({
          pair: List(['A', 'B']),
          tally: Map({
            'A': 3,
            'B': 2,
          }),
        }),
      });
      const nextState = Map({
        winner: 'A',
      });
      expect(next(state)).to.equal(nextState);
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List(['A', 'B']),
      });
      const nextState = Map({
        pair: List(['A', 'B']),
        tally: Map({
          'A': 1,
        }),
      });
      expect(vote(state, 'A')).to.equal(nextState);
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        pair: List(['A', 'B']),
        tally: Map({
          'A': 1,
        }),
      });
      const nextState = Map({
        pair: List(['A', 'B']),
        tally: Map({
          'A': 2,
        }),
      });
      expect(vote(state, 'A')).to.equal(nextState);
    });
  });
});
