import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as nameActions from '../../actions/nameAction';

class Home extends React.Component{
  constructor(props, context) {
    super(props);
    this.triggerAction = this.triggerAction.bind(this);
  }
  triggerAction() {
    console.log(this.props)
    this.props.actions.loadName();
  }
  render() {
    return (
      <div>
        <div onClick={this.triggerAction}>BUTTON</div>
        {this.props.getName.map((name, index)=>(
        <div key={index}>{name}</div>
        ))}
      </div>
    )
  }
}

Home.propTypes = {
  getName: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    getName: state.getName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(nameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
