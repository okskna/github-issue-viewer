import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Input from './Input';
import Button from './Button';

import { BsSearch } from 'react-icons/bs';
import { flexCenter } from '../common/styles';

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
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(e);
        }}
      >
        <Label>
          <Input
            type='text'
            value={value}
            onChange={handleChange}
            width={inputWidth || '100%'}
            placeholder={placeholder}
          />
        </Label>
        <Button type='submit' width={buttonWidth}>
          <BsSearch />
        </Button>
      </Form>
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
  ${flexCenter}
  width: ${({ width }) => width || '100%'};
  margin-left: 20px;
`;

const Form = styled.form`
  ${flexCenter}
  width: 100%;
`;

const Label = styled.label`
  width: 90%;
`;

export default SearchBox;
