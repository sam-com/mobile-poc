import { useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import QrScanner from "qr-scanner";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRef } from "react";

interface QrScannerProps {
  onCodeFound: (code: QrScanner.ScanResult["data"]) => void;
}

function onDecodeError(error: Error | string): void {
  if (error instanceof Error) {
    console.log(error);
  }
}

const defaultQrScannerOptions = {
  fps: 10,
  supportedScanTypes: [0],
  qrbox: { width: 250, height: 250 },
};

function initializeScanner(
  onResultFound: QrScannerProps["onCodeFound"]
): Html5QrcodeScanner {
  const scanner = new Html5QrcodeScanner(
    "camera",
    defaultQrScannerOptions,
    false
  );

  scanner.render(onResultFound, onDecodeError);
  return scanner;
}

function useScanner(onCodeFound: QrScannerProps["onCodeFound"]) {
  const scannerRef = useRef<Html5QrcodeScanner>();

  const initializeOrRestartScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.resume();
    } else {
      scannerRef.current = initializeScanner(onCodeFound);
    }
  };

  useIonViewWillEnter(() => initializeOrRestartScanner());
  useIonViewWillLeave(() => scannerRef.current?.pause());
}

export function QRScanner({ onCodeFound }: QrScannerProps) {
  useScanner(onCodeFound);

  return <div id="camera" className="rounded-md max-w-2xl m-auto" />;
}
