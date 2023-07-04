import { Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useState } from 'react';
import Html5QrcodePlugin from '../../components/BarcodeScanner/Html5QrcodeScannerPlugin';

const formatsToSupport = [
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.CODE_93,
  Html5QrcodeSupportedFormats.ITF,
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.EAN_8,
  Html5QrcodeSupportedFormats.PDF_417,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.RSS_14,
];

function TestScannerPage() {
  const [result, setResult] = useState<any>('');

  const onNewScanResult = (decodedText: any, decodedResult:any) => {
    // handle decoded results here
    console.log('HTML5 scanner decodedText', decodedText);
    console.log('HTML5 scanner decodedResult', decodedResult);
    setResult(decodedText);
  };

  return (
    <div>
      <Html5QrcodePlugin
        fps={20}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
        supportedScanTypes={[Html5QrcodeScanType.SCAN_TYPE_CAMERA]}
        formatsToSupport={formatsToSupport}
      />
      <div>
        Html5QrcodePlugin:
        {' '}
        {result}
      </div>
    </div>
  );
}

export default TestScannerPage;
