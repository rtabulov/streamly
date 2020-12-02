import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, updateStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  onSubmit = ({ title, description }) => {
    this.props.updateStream(this.props.match.params.id, { title, description });
  };

  render() {
    const { stream } = this.props;

    if (!stream) return <div>loading</div>;

    return (
      <div>
        <h3>edit this stream</h3>
        <StreamForm
          initialValues={{
            title: stream.title,
            description: stream.description,
          }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ streams }, { match }) => {
  return {
    stream: streams[match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, updateStream })(
  StreamEdit
);
