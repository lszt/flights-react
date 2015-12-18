import React, { PropTypes, Component } from 'react';
import VerticalHeaderPage from '../VerticalHeaderPage';
import AircraftData from '../AircraftData';
import PilotData from '../PilotData';
import WizardContainer from '../WizardContainer';
import Firebase from 'firebase';

class MovementWizardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.pages = [
      {
        id: 'aircraft',
        component: AircraftData,
        label: 'Flugzeugdaten'
      },
      {
        id: 'pilot',
        component: PilotData,
        label: 'Pilot'
      },
      {
        id: 'passenger',
        component: this.props.passengerDataComponentClass,
        label: 'Passagiere'
      },
      {
        id: 'departureArrival',
        component: this.props.departureArrivalDataComponentClass,
        label: 'Start und Ziel'
      },
      {
        id: 'flight',
        component: this.props.flightDataComponentClass,
        label: 'Flug'
      }
    ];
    if (this.props.movementKey) {
      this.update = true;
    }
  }

  componentWillMount() {
    this.firebaseCollectionRef = new Firebase(this.props.firebaseUri);
    if (this.update === true) {
      this.firebaseCollectionRef.child(this.props.movementKey).on('value', this.onFirebaseValue, this);
    }
  }

  componentWillUnmount() {
    if (this.update === true) {
      this.firebaseRef.child(this.props.movementKey).off('value', this.onFirebaseValue, this)
    }
  }

  onFirebaseValue(dataSnapshot) {
    const movement = dataSnapshot.val();
    this.setState({
      data: movement
    });
  }

  commit(data) {
    this.setState({
      data: data
    }, function() {
      if (this.update === true) {
        this.firebaseCollectionRef.child(this.props.movementKey).set(data);
      } else {
        this.firebaseCollectionRef.push(this.state.data);
      }
    }, this);
  }

  finish() {
    window.location.hash = '/';
  }

  cancel() {
    window.location.hash = '/';
  }

  render() {
    const finishComponent = <this.props.finishComponentClass finish={this.finish.bind(this)}/>;
    const rightComponent = <WizardContainer data={this.state.data}
                                            pages={this.pages}
                                            finishComponent={finishComponent}
                                            breadcrumbStart={this.props.label}
                                            cancel={this.cancel.bind(this)}
                                            commit={this.commit.bind(this)}/>;
    return (
      <VerticalHeaderPage className={this.props.className} component={rightComponent}/>
    );
  }
}

MovementWizardPage.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  firebaseUri: PropTypes.string,
  movementKey: PropTypes.string,
  passengerDataComponentClass: PropTypes.func,
  departureArrivalDataComponentClass: PropTypes.func,
  flightDataComponentClass: PropTypes.func,
  finishComponentClass: PropTypes.func,
};

export default MovementWizardPage;
