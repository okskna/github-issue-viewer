import styled from 'styled-components';

const InputButton = styled.button`
  font-size: 1rem;
  border-radius: 3px;
  margin-left: 2px;

  width: ${({ width }) => width};
  height: ${({ height }) => height || '2rem'};

  color: ${({ theme }) => theme.color.deepblack};
  background-color: ${({ theme }) => theme.color.sub};
  border: 2px solid ${({ theme }) => theme.color.sub};

  &:hover {
    opacity: 0.8;
  }
`;

InputButton.defaultProps = {
  theme: {
    color: {
      main: '#376935',
    },
  },
};

export default InputButton;
