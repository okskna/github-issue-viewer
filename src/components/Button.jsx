import styled from 'styled-components';

import { flexCenter } from '../common/styles';

const Button = styled.button`
  ${flexCenter}
  align-self: flex-end;

  font-size: 1rem;
  border-radius: 3px;
  margin-left: 2px;

  width: ${({ width }) => width};
  height: ${({ height }) => height || '2rem'};

  color: ${({ theme }) => theme.color.deepblack};
  background-color: ${({ theme }) => theme.color.sub};
  border: 2px solid ${({ theme }) => theme.color.sub};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

Button.defaultProps = {
  theme: {
    color: {
      main: '#376935',
    },
  },
};

export default Button;
