import styled from 'styled-components';

const Input = styled.input`
  font-size: 1rem;
  border-radius: 3px;
  width: ${({ width }) => width};
  height: ${({ height }) => height || '2rem'};

  background-color: ${({ theme }) => theme.color.deepblack};
  color: ${({ theme }) => theme.color.sub};
  border: 2px solid ${({ theme }) => theme.color.sub};
`;

Input.defaultProps = {
  theme: {
    color: {
      main: '#376935',
    },
  },
  width: '200px',
};

export default Input;
