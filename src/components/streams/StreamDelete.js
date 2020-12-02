import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDissmiss = () => history.push('/');

  onSuccess = () => {
    this.props.deleteStream(this.props.stream.id);
  };

  actions = (
    <>
      <button onClick={this.onSuccess} className="ui negative button">
        delete
      </button>
      <Link className="ui button" to="/">
        cancel
      </Link>
    </>
  );

  render() {
    const stream = this.props.stream || {};

    return (
      <div>
        <Modal
          onDissmiss={this.onDissmiss}
          actions={this.actions}
          title={stream.title || 'delete this stream'}
          content="are you sure you want to delete this stream?"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ streams }, { match }) => {
  return { stream: streams[match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
