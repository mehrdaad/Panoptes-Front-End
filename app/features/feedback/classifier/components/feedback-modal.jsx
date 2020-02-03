import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import SubjectViewer from '../../../../components/subject-viewer';
import ModalFocus from '../../../../components/modal-focus';

/* eslint-disable max-len */
counterpart.registerTranslations('en', {
  FeedbackModal: {
    title: 'Feedback',
    ok: 'OK'
  }
});
/* eslint-enable max-len */

class FeedbackModal extends React.Component {
  constructor() {
    super();
    this.closeButton = null;
  }

  componentDidMount() {
    const { closeButton } = this;
    closeButton.focus && closeButton.focus();
  }

  render() {
    const { messages, subjectViewerProps } = this.props;

    return (
      <ModalFocus className="classifier feedbackmodal">
        <Translate content="FeedbackModal.title" component="h2" />
        {subjectViewerProps && (<SubjectViewer {...subjectViewerProps} />)}
        <div className="messagecontainer">
          {_.chain(messages).map((catMessages, cat) => {
            const contentString = `feedback.categories.${cat}`;
            return (<div key={Math.random()}>
            <Translate content={contentString} component="h3" className="categorytitles" />
              <ul>
              {catMessages.map((message) =>
                <li key={Math.random()} className="messages">
                {message}
                </li>)}
              </ul>
            </div>)
          }).value()}
          </div>

        <div className="buttons">
          <button
            className="standard-button"
            type="submit"
            ref={(button) => { this.closeButton = button; }}
          >
            <Translate content="FeedbackModal.ok" />
          </button>
        </div>
      </ModalFocus>
    );
  }
}

FeedbackModal.propTypes = {
  messages: PropTypes.object,
  subjectViewerProps: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default FeedbackModal;
