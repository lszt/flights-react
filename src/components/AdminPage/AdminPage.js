import React, { Component } from 'react';
import './AdminPage.scss';
import BorderLayout from '../BorderLayout';
import BorderLayoutItem from '../BorderLayoutItem';
import AirstatReportForm from '../../containers/AirstatReportFormContainer';
import LandingsReportForm from '../../containers/LandingsReportFormContainer';
import LockMovementsForm from '../../containers/LockMovementsFormContainer';
import MessageList from '../../containers/MessageListContainer';
import LabeledBox from '../LabeledBox';
import UserImportForm from '../UserImportForm';
import AerodromeImportForm from '../AerodromeImportForm';
import AircraftImportForm from '../AircraftImportForm';
import AircraftsItemList from '../../containers/AircraftsItemListContainer';
import JumpNavigation from '../JumpNavigation';

class AdminPage extends Component {

  componentWillMount() {
    if (this.props.auth.data.admin !== true) {
      this.context.router.push('/');
    }
  }

  render() {
    const logoImagePath = require('../../resources/mfgt_logo_transp.png');
    return (
      <BorderLayout className="AdminPage">
        <BorderLayoutItem region="west">
          <header>
            <a href="#/">
              <img className="logo" src={logoImagePath}/>
            </a>
          </header>
        </BorderLayoutItem>
        {this.props.auth.data.admin === true &&
          <BorderLayoutItem region="middle">
            <JumpNavigation/>
            <LabeledBox label="BAZL-Report herunterladen (CSV)" className="AirstatReportForm">
              <AirstatReportForm/>
            </LabeledBox>
            <LabeledBox label="Landeliste herunterladen (CSV)">
              <LandingsReportForm/>
            </LabeledBox>
            <LockMovementsForm/>
            <LabeledBox label="Nachrichten" className="messages">
              <MessageList/>
            </LabeledBox>
            <LabeledBox label="Benutzerliste importieren" className="user-import">
              <UserImportForm/>
            </LabeledBox>
            <LabeledBox label="Flugplatzliste importieren" className="aerodrome-import">
              <AerodromeImportForm/>
            </LabeledBox>
            <LabeledBox label="Flugzeugliste importieren" className="aircraft-import">
              <AircraftImportForm/>
            </LabeledBox>
            <LabeledBox label="Flugzeuge der MFGT" className="mfgt-aircrafts">
              <AircraftsItemList type="club"/>
            </LabeledBox>
            <LabeledBox label="In Lommis stationierte Flugzeuge (ohne Flugzeuge der MFGT)" className="lszt-aircrafts">
              <AircraftsItemList type="homeBase"/>
            </LabeledBox>
          </BorderLayoutItem>}
      </BorderLayout>
    );
  }
}

AdminPage.propTypes = {
  auth: React.PropTypes.object.isRequired,
};

AdminPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default AdminPage;
