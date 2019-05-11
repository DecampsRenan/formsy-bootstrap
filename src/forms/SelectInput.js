import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { propTypes as formsyPropTypes, withFormsy } from 'formsy-react';
import { Badge, FormGroup, FormText, Label } from 'reactstrap';

const reactSelectStyleError = (isInvalid = false) => provided => {
  if (isInvalid) {
    return {
      ...provided,
      borderColor: '#dc3545',
      ':hover': {
        borderColor: '#dc3545',
      }
    };
  }
  return provided;
};

const SelectInput = ({
  name,
  type,
  label,
  placeholder,
  options,
  help,

  // Formsy
  value,
  setValue,
  getValue,
  isValid,
  isPristine,
  isRequired,
  getErrorMessage,

  // For select inputs
  isMulti,
}) => {
  const changeInputValue = event => setValue(event);
  const isInvalid = !isPristine() && !isValid();

  return (
    <FormGroup>
      {label && (
        <Label className={isInvalid ? 'text-danger' : ''} htmlFor={name}>
          {label}{' '}
          {!isRequired() && <Badge color="light" pill>Optional</Badge>}
        </Label>
      )}
      <Select
        name={name}
        inputId={name}
        className={isInvalid && 'is-invalid'}
        styles={{ control: reactSelectStyleError(isInvalid) }}
        onChange={changeInputValue}
        value={getValue()}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
      />
      {isInvalid && <small className="text-danger">{getErrorMessage()}</small>}
      {help && <FormText>{help}</FormText>}
    </FormGroup>
  );
};

SelectInput.propTypes = {
  ...formsyPropTypes,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.any,
  ),
  isMulti: PropTypes.bool,
  type: PropTypes.string,
  help: PropTypes.string,
  placeholder: PropTypes.string,
};

SelectInput.defaultProps = {
  label: '',
  type: 'single',
  placeholder: '',
  isMulti: false,
  options: [],
  help: null,
}

export default withFormsy(SelectInput);