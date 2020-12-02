import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  render() {
    const { stream } = this.props;

    if (!stream) return <div>loading</div>;

    return (
      <div>
        <h1>{stream.title}</h1>
        <p>{stream.description}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ streams }, { match }) => {
  return {
    stream: streams[match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
