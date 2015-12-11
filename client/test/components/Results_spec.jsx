import React from 'react/addons';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate}
  = React.addons.TestUtils;

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List(['A', 'B']);
    const tally = Map({'A': 3});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [a, b] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(a).to.contain('A');
    expect(a).to.contain('3');
    expect(b).to.contain('B');
    expect(b).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List(['A', 'B']);
    const component = renderIntoDocument(
      <Results pair={pair}
               tally={Map()}
               next={next}/>
    );
    Simulate.click(React.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when t here is one', () => {
    const component = renderIntoDocument(
      <Results winner="A"
               pair={["A", "B"]}
               tally={Map()} />
    );
    const winner = React.findDOMNode(component.refs.winner)
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('A');
  });

});

