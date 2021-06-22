import * as React from 'react';
import Form from 'react-bootstrap/esm/Form';
import useDigitInput from 'react-digit-input';

const AnyControl = (Form.Control) as any;

function DigitsInput({ size, value, onChange }: { size: number, value: string, onChange: any }) {
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: size,
    value,
    onChange,
  });

  const renderDigits = () => {
    const inputs = [];
    for(let i=0; i<size; i++) {
      inputs.push(<AnyControl inputMode="decimal" autoFocus={i===0} {...digits[i]} />);
    }
    return inputs;
  }

  return (
    <div>
      <div className="input-group">
        {renderDigits()}
      </div>
      <pre>
        <code>"{value}"</code>
      </pre>
    </div>
  );
}

export default DigitsInput;