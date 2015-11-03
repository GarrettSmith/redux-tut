import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
  describe('a number', () =>  {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      const state = 42;
      const nextState = increment(state);
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a list', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      const state = List.of('A', 'B');
      const nextState = addMovie(state, 'C');
      expect(nextState).to.equal(List.of('A', 'B', 'C'));
      expect(state).to.equal(List.of('A', 'B'));
    });
  });

  describe('a tree', () => {
    function addMovie(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      const state = Map({
        movies: List.of('A', 'B'),
      });
      const nextState = addMovie(state, 'C');
      expect(nextState).to.equal(Map({
        movies: List.of('A', 'B', 'C'),
      }));
      expect(state).to.equal(Map({
        movies: List.of('A', 'B'),
      }))
    });
  });
});
