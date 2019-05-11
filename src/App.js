import React from 'react';
import Formsy from 'formsy-react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FormInput, SelectInput } from './forms';

const formDefaultValues = {
  pseudo: 'rdecamps',
  simpleSelect: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
    { label: 'Option 6', value: { value: 5, description: 'Lorem ipsum' } },
  ]
}

function App() {
  const handleSubmit = (values) => {
    console.log('Form:', values);
  };

  return (
    <Container className="mt-5">
      <Formsy onValidSubmit={handleSubmit}>
        <Row>
          <Col>
            <h2>Démo formsy bootstrap</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormInput
              name="text"
              label="Basic text input"
              placeholder="Basic text input"
              value={''}
              required
              disabled
              validationErrors={{
                isDefaultRequiredValue: 'This field is required',
              }}
            />
          </Col>
          <Col>
            <FormInput
              name="password"
              label="Password text input"
              type="password"
              value={''}
              required
              validationErrors={{
                isDefaultRequiredValue: 'This field is required',
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormInput
              name="textarea"
              label="Textarea input"
              type="textarea"
              placeholder="Basic text input"
            />
            <FormInput
              name="selectInput"
              label="Select input"
              type="select"
              options={formDefaultValues.simpleSelect}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectInput
              name="reactSelect"
              label="React Select Input"
              options={formDefaultValues.simpleSelect}
              value={formDefaultValues.simpleSelect[0]}
              required
              validationErrors={{
                isDefaultRequiredValue: 'This field is required',
              }}
            />
          </Col>
          <Col>
            <SelectInput
              name="reactSelectMulti"
              label="React Select Multi Input"
              options={formDefaultValues.simpleSelect}
              required
              validations={{
                isNotEmpty: (_, value) => (value || []).length > 0,
              }}
              validationErrors={{
                isDefaultRequiredValue: 'This field is required',
                isNotEmpty: 'You have to select one item',
              }}
              isMulti
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit" color="primary">Valider</Button>
          </Col>
        </Row>
      </Formsy>
    </Container>
  );
}

export default App;
