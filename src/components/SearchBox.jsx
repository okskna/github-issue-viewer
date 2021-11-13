import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Input from './Input';
import InputButton from './InputButton';

import { BsSearch } from 'react-icons/bs';

const SearchBox = ({
  value,
  placeholder,
  handleSubmit,
  handleChange,
  width,
  inputWidth,
  buttonWidth,
}) => {
  return (
    <Wrapper width={width}>
      <form onSubmit={handleSubmit}>
        <label>
          <Input
            type='text'
            value={value}
            onChange={handleChange}
            width={inputWidth}
            placeholder={placeholder}
          />
        </label>
        <InputButton type='submit' width={buttonWidth}>
          <BsSearch />
        </InputButton>
      </form>
    </Wrapper>
  );
};

SearchBox.defaultProps = {
  placeholder: 'Input your value',
  handleSubmit: () => {},
  handleChange: () => {},
  buttonValue: 'Submit',
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

const Wrapper = styled.div`
  width: ${({ width }) => width};
  margin-left: 20px;
`;

export default SearchBox;
