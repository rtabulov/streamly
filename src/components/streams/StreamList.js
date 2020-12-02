import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderAdmin(stream) {
    const { isSignedIn, id } = this.props.auth;
    if (isSignedIn && id === stream.userId)
      return (
        <div className="right floated content">
          <Link
            className="ui negative button"
            to={`/streams/delete/${stream.id}`}
          >
            Delete
          </Link>
          <Link className="ui primary button" to={`/streams/edit/${stream.id}`}>
            Edit
          </Link>
        </div>
      );
  }

  renderList() {
    return this.props.streams.map((stream) => (
      <div className="item" key={stream.id}>
        {this.renderAdmin(stream)}
        <i className="large middle aligned camera icon"></i>
        <div className="content">
          <h3 className="header">
            <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
          </h3>
          <p>{stream.description}</p>
        </div>
      </div>
    ));
  }

  renderCreateButton() {
    if (!this.props.auth.isSignedIn) return;
    return (
      <div style={{ textAlign: 'right' }}>
        <Link className="ui primary button" to="/streams/new">
          create new stream
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
}

const mapStateToProps = ({ streams, auth }) => {
  return { streams: Object.values(streams), auth };
};

export default connect(mapStateToProps, {
  fetchStreams,
  deleteStream,
})(StreamList);
