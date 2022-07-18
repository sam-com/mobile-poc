import { useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import QrScanner from "qr-scanner";
import { Html5QrcodeScanner } from "html5-qrcode";
import { RefObject, useRef } from "react";

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
  video: HTMLDivElement,
  onResultFound: QrScannerProps["onCodeFound"]
): Html5QrcodeScanner {
  const scanner = new Html5QrcodeScanner(
    "video",
    defaultQrScannerOptions,
    false
  );

  scanner.render(onResultFound, onDecodeError);
  return scanner;
}

function useScanner(
  cameraRef: RefObject<HTMLDivElement>,
  onCodeFound: QrScannerProps["onCodeFound"]
) {
  const scannerRef = useRef<Html5QrcodeScanner>();

  const initializeOrRestartScanner = () => {
    if (!cameraRef.current) return;

    if (scannerRef.current) {
      scannerRef.current.resume();
    } else {
      scannerRef.current = initializeScanner(cameraRef.current, onCodeFound);
    }
  };

  useIonViewWillEnter(() => initializeOrRestartScanner());
  useIonViewWillLeave(() => scannerRef.current?.pause());
}

export function QRScanner({ onCodeFound }: QrScannerProps) {
  const cameraRef = useRef<HTMLDivElement>(null);
  useScanner(cameraRef, onCodeFound);

  return (
    <div id="video" ref={cameraRef} className="rounded-md max-w-2xl m-auto" />
  );
}
