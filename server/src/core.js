import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const winner = getWinner(state.getIn(['vote', 'tally']));
  const entries = state.get('entries').concat(winner);
  if (entries.size === 1) {
    return state
      .remove('vote')
      .remove('entries')
      .set('winner', winner.first());
  }
  else {
    return state.merge({
      entries: entries.skip(2),
      vote: Map({
        pair: entries.take(2),
      }),
    });
  }
}

function getWinner(tally) {
  if (!tally) {
    return [];
  }
  else {
    return tally
      .groupBy(v => v)
      .maxBy((v, k) => k)
      .keySeq();
  }
}

export function vote(state, entry) {
  return state.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}
