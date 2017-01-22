import React, { PropTypes } from 'react';
import ModalDialog from '../../../ModalDialog';
import Heading from './Heading';
import Items from './Items';
import Item from './Item';
import CancelButton from './CancelButton';
import ConfirmButton from './ConfirmButton';

const CommitRequirementsDialog = props => {
  const content = (
    <div className="CommitRequirementsDialog">
      <Heading>Bitte bestätigen</Heading>
      <Items>
        <Item>Meine Ausweise sind gültig.</Item>
        <Item>Das maximale Abfluggewicht und der Schwerpunkt sind innerhalb der zulässigen Limiten.</Item>
        <Item>Die verfügbare Pistenlänge ist ausreichend.</Item>
        <Item>Bei Passagierflügen: Ich habe in den letzten 90 Tagen mindestens 3 Landungen absolviert.</Item>
        <Item>Der Preflight-Check wurde ausgeführt.</Item>
      </Items>
      <div className="actions">
        <CancelButton label="Abbrechen" onClick={props.onCancel} flat/>
        <ConfirmButton label="Bestätigen" icon="done_all" onClick={props.onConfirm} primary/>
      </div>
    </div>
  );

  return <ModalDialog content={content} onBlur={props.onCancel}/>;
};

CommitRequirementsDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default CommitRequirementsDialog;
