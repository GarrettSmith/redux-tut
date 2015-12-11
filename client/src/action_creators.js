export function setState(state) {
  return {
    type: 'SET_STATE',
    state,
  };
}

export function vote(entry) {
  return {
    type: 'VOTE',
    meta: {
      remote: true,
    },
    entry,
  };
}

export function next() {
  console.log('here')
  return {
    type: 'NEXT',
    meta: {
      remote: true,
    },
  };
}
