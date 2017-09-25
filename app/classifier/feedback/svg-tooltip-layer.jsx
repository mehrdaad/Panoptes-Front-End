import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tooltip from './tooltip';
import { renderUniqueFeedback } from '../feedback/helpers';

class SVGToolTipLayer extends React.Component {
  constructor(props) {
    super(props);
    this.renderTooltips = this.renderTooltips.bind(this);
  }

  renderTooltips(feedback) {
    return (
      <div className="classifier-tooltips">
        {feedback.map(item =>
          <Tooltip
            item={item}
            key={`feedback-point-${item.x}-${item.y}`}
          />
        )}
      </div>
    );
  }

  render() {
    const { annotations, feedback } = this.props;
    const uniqueFeedback = renderUniqueFeedback(annotations, feedback);
    return (this.props.feedback.length) ? this.renderTooltips(uniqueFeedback) : null;
  }
}

const mapStateToProps = state => ({
  feedback: state.feedback.filter(item => item.target === 'classifier')
});

SVGToolTipLayer.propTypes = {
  feedback: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string
  }))
};

export default connect(mapStateToProps)(SVGToolTipLayer);
export { SVGToolTipLayer };
