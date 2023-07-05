/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-shadow */
// @ts-nocheck
import { useState } from 'react';
import { useZxing } from 'react-zxing';

export const ReactZxing = () => {
  const [result, setResult] = useState('');
  const { ref } = useZxing({
    // @ts-ignore
    onResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <>
      <div style={{
        position: 'relative',
      }}
      >
        <video
          ref={ref}
          style={{
            display: 'block',
            width: '100%',
          }}
        />
        <div style={{
          position: 'absolute',
          borderWidth: '70px 70px',
          borderStyle: 'solid',
          borderColor: 'rgba(0, 0, 0, 0.48)',
          boxSizing: 'border-box',
          inset: '0px',
        }}
        />
      </div>
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};
