/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable consistent-return */
import { BrowserMultiFormatReader } from '@zxing/library';
import React, { useEffect, useRef, useState } from 'react';

const BarcodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());
  const [resultBarcodeScanner, setResultBarcodeScanner] = useState<any>('');

  useEffect(() => {
    if (!videoRef.current) return;
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: 'environment',
        },
      },
      videoRef.current,
      (result:any, error:any) => {
        if (result) {
          console.log('XZING result', result);
          setResultBarcodeScanner(result);
        }
        if (error) console.log('XZING error', error);
      },
    );
    return () => {
      reader.current.reset();
    };
  }, [videoRef]);

  return (
    <>
      <video ref={videoRef} />
      <div>
        BarcodeScanner
        {' '}
        {resultBarcodeScanner}
      </div>
    </>

  );
};

export default BarcodeScanner;
