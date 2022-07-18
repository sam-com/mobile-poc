import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useHistory } from "react-router";
import { QRScanner } from "../components/QRScanner/QRScanner";
import { useStateRef } from "../hooks/useStateRef";
import { getStudentName } from "../utils/getStudentName";

interface ScannedListProps {
  studentCodes: string[];
}

const ScannedList: React.FC<ScannedListProps> = ({
  studentCodes,
}: {
  studentCodes: string[];
}) => {
  const hasScannedCodes = studentCodes.length > 0;
  const history = useHistory();

  const handleNavigateToStudentProfile = (studentId: string) =>
    history.push(`/students/${studentId}`);

  const toListItem = (studentId: string) => (
    <IonItem
      key={studentId}
      button
      onClick={() => handleNavigateToStudentProfile(studentId)}
    >
      {getStudentName(studentId)}
    </IonItem>
  );

  return (
    <IonList className="max-w-2xl m-auto">
      {studentCodes.map(toListItem)}
      {hasScannedCodes && <IonButton>Give Points</IonButton>}
    </IonList>
  );
};

export const Scan: React.FC = () => {
  const [studentCodes, setStudentCodes, studentCodesRef] = useStateRef<
    string[]
  >([]);
  const [present] = useIonToast();

  const handleCodeFound = (code: string) => {
    const prev = studentCodesRef.current;
    if (prev.includes(code)) return;

    present({
      message: `${getStudentName(code)} added to the list!`,
      duration: 3000,
      color: "secondary",
      position: "top",
    });

    setStudentCodes([...prev, code]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scan QR Code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <QRScanner onCodeFound={handleCodeFound} />
        <ScannedList studentCodes={studentCodes} />
      </IonContent>
    </IonPage>
  );
};
