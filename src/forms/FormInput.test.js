import React from 'react';
import { shallow, render } from 'enzyme';
import Formsy from 'formsy-react';
import FormInput from './FormInput';

it('renders without crashing', () => {
  shallow(
    <Formsy>
      <FormInput name="input" />
    </Formsy>
  );
});

it('crash if there is no name', () => {
  expect(() => {
    render(
      <Formsy>
        <FormInput />
      </Formsy>
    );
  }).toThrow(new Error('Form Input requires a name property when used'));
});

describe('When input is required', () => {

  const requiredFormInput = render(
    <Formsy>
      <FormInput
        name="requiredInput"
        value={null}
        required
      />
    </Formsy>
  );

  // TODO
  it('show an error if input is empty', () => {
    requiredFormInput.find('');
  });
});