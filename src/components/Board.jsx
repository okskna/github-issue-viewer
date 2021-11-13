import React, { useState } from 'react';
import styled from 'styled-components';

import IssueList from './IssueList';
import NoIssue from './NoIssue';

const Board = () => {
  const [issueItems] = useState([
    {
      title: 'issue 1',
      htmlUrl: 'https://github.com/facebook/react/pull/22749',
    },
    {
      title: 'issue 2',
      htmlUrl: 'https://github.com/facebook/react/pull/22749',
    },
    {
      title: 'issue 3',
      htmlUrl: 'https://github.com/facebook/react/pull/22749',
    },
  ]);

  return (
    <Wrapper>
      {issueItems.length ? <IssueList items={issueItems} /> : <NoIssue />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 75%;
  height: 100%;
  min-height: 300px;
  border: 1px solid ${({ theme }) => theme.color.sub};
  border-radius: 3px;
`;

export default Board;
