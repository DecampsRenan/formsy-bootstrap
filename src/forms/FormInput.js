import React from 'react';
import PropTypes from 'prop-types';
import { withFormsy, propTypes as formsyPropTypes } from 'formsy-react';
import {
  FormGroup,
  Label,
  Input,
  Badge,
  FormFeedback,
  FormText,
} from 'reactstrap';

export const defaultValueSelector = 'value';
export const defaultLabelSelector = 'label';

const FormInput = ({
  name,
  type,
  label,
  options,
  placeholder,
  valueSelector,
  labelSelector,
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
  children,
}) => {
  const changeInputValue = event => setValue(event.target.value);

  let effectiveChildren = children;
  if (type === 'select') {
      effectiveChildren = options.map(option => {
        const effectiveValue = option[valueSelector] || option[defaultValueSelector];
        const effectiveLabel = option[labelSelector] || option[defaultLabelSelector];
        return (
          <option
            key={effectiveValue}
            value={effectiveValue}
          >
            {effectiveLabel}
          </option>
        );
      }
    );
  }

  const isInvalid = !isPristine() && !isValid();
  const effectiveValue = type === 'select' ? (getValue() || {})[valueSelector] : getValue();

  return (
    <FormGroup>
      {label && (
        <Label className={isInvalid ? 'text-danger' : ''} htmlFor={name}>
          {label}{' '}
          {!isRequired() && <Badge color="light" pill>Optional</Badge>}
        </Label>
      )}
      <Input
        type={type}
        name={name}
        id={name}
        value={effectiveValue || ''}
        onChange={changeInputValue}
        placeholder={placeholder}
        children={effectiveChildren}
        invalid={isInvalid}
      />
      <FormFeedback>{getErrorMessage()}</FormFeedback>
      {help && <FormText>{help}</FormText>}
    </FormGroup>
  );
};

FormInput.propTypes = {
  ...formsyPropTypes,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelSelector: PropTypes.string,
  valueSelector: PropTypes.string,
  type: PropTypes.string,
  help: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.node,
};

FormInput.defaultProps = {
  label: '',
  type: 'text',
  labelSelector: defaultLabelSelector,
  valueSelector: defaultValueSelector,
  placeholder: '',
  help: null,
  children: null,
}

export default withFormsy(FormInput);