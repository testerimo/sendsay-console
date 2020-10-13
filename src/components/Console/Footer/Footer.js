import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { sendRequest, formatRequest } from 'redux/modules/request';

import { SendRequestButton, GitHubLink, FormatRequestButton } from 'components/Common';

import './Footer.css';

function Footer({ className, isRequesting, sendRequest, formatRequest }) {
  const footerClassName = cn('footer', className);

  return (
    <div className={footerClassName}>
      <SendRequestButton
        send={sendRequest}
        loading={isRequesting}
      />

      <GitHubLink
        className="footer__gitHubLink"
        login="testerimo"
      />

      <FormatRequestButton
        className="footer__formatRequest"
        format={formatRequest}
      />
    </div>
  );
}

function mapStateToProps({ request: { isRequesting } }) {
  return {
    isRequesting,
  };
}

const mapDispatchToProps = {
  formatRequest,
  sendRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
