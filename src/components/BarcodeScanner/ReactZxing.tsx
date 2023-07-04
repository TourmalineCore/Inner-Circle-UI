/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-shadow */
// @ts-nocheck
import { useState } from 'react';
import { useZxinq } from 'react-zxing';

export const ReactZxing = () => {
  const [result, setResult] = useState('');
  const { ref } = useZxinq({
    // @ts-ignore
    onResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};
