import { useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import QrScanner from "qr-scanner";
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
  maxScansPerSecond: 2,
  onDecodeError,
  highlightScanRegion: true,
  highlightCodeOutline: true,
};

function initializeScanner(
  video: HTMLVideoElement,
  onResultFound: QrScannerProps["onCodeFound"]
): QrScanner {
  const scanner = new QrScanner(
    video,
    (result) => onResultFound(result.data),
    defaultQrScannerOptions
  );

  scanner.start();
  return scanner;
}

function useScanner(
  videoRef: RefObject<HTMLVideoElement>,
  onCodeFound: QrScannerProps["onCodeFound"]
) {
  const scannerRef = useRef<QrScanner>();

  const initializeOrRestartScanner = () => {
    if (!videoRef.current) return;

    if (scannerRef.current) {
      scannerRef.current.start();
    } else {
      scannerRef.current = initializeScanner(videoRef.current, onCodeFound);
    }
  };

  useIonViewWillEnter(() => initializeOrRestartScanner());
  useIonViewWillLeave(() => scannerRef.current?.pause());
}

export function QRScanner({ onCodeFound }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useScanner(videoRef, onCodeFound);

  return <video ref={videoRef} className="rounded-md max-w-2xl m-auto" />;
}
