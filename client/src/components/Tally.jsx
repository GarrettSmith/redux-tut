import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Tally extends React.Component {
  //static mixins = [
    //PureRenderMixin,
  //]

  getPair() {
    return this.props.pair || [];
  }

  getVotes(entry) {
    const tally = this.props.tally;
    return (tally && tally.has(entry)) ? tally.get(entry) : 0;
  }

  render() {
    return (
      <div className="tally">
        {this.getPair().map(entry =>
          <div key={entry} className="entry">
            <h1>
              {entry}
            </h1>
            <div className="voteCount">
              {this.getVotes(entry)}
            </div>
          </div>
        )}
      </div>
    )
  }
}
