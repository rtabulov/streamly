import React, { Component } from 'react';
import { createStream } from '../../actions';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
  onSubmit = (values) => {
    this.props.createStream(values);
  };

  render() {
    return (
      <div>
        <h3>create a stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
