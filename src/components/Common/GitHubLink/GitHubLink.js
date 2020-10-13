import React from 'react';
import cn from 'classnames';

import './GitHubLink.css';

function GitHubLink({ className, login }) {
  const gitHubLinkClassName = cn('gitHubLink', className);

  return (
    <a
      className={gitHubLinkClassName}
      href={`https://github.com/${login}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      {'@' + login}
    </a>
  );
}

export default React.memo(GitHubLink);
