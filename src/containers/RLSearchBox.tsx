import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './RLSearchBox.css';

interface SearchBoxProps {
  handleSubmit: (e: any) => any;
  handleChange: (e: any) => any;
  query: string;
  placeholderText: any;
}

const RLSearchBox: React.FC<SearchBoxProps> = ({
  handleSubmit,
  handleChange,
  query,
  placeholderText
}) => {
  return (
    <div className=".rlcontainer">
      <h1 className="recipe-lookup-hero-text">Recipe Lookup</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Find the recipe for your favorite dish</Form.Label>
          <Form.Control
            className="textBox"
            type="text"
            size="lg"
            name="query"
            data-testid="rl-inputfield"
            autoComplete="off"
            value={query}
            onChange={handleChange}
            required
            placeholder={placeholderText}
          />
        </Form.Group>
        <Button variant="primary" size="lg" type="submit">
          search
        </Button>
      </Form>
      <br />
      <h6 className="sometext" style={{ color: '#ff0000', display: 'none' }}>
        Missing field !!!
      </h6>
    </div>
  );
};

export default RLSearchBox;
