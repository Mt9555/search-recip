import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './RLSearchBox.css';

interface SearchBoxProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => any;
  handleChange: (event: any) => any;
  query: string;
  placeholderText: string;
}

const RLSearchBox: React.FC<SearchBoxProps> = ({ ...props }) => {
  return (
    <div className="search-rl-wrapper">
      <h1 className="recipe-lookup-hero-text">Recipe Lookup</h1>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Find the recipe for your favorite dish</Form.Label>
          <Form.Control
            className="textBox"
            type="text"
            size="lg"
            name="query"
            data-testid="rl-inputfield"
            autoComplete="off"
            value={props.query}
            onChange={props.handleChange}
            required
            placeholder={props.placeholderText}
          />
        </Form.Group>
        <Button variant="primary" size="lg" type="submit">
          search
        </Button>
      </Form>
    </div>
  );
};

export default RLSearchBox;
