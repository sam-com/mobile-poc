import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { getStudentName } from "../../utils/getStudentName";

const useStudentName = () => {
  const params = useParams<{ studentId: string }>();
  return getStudentName(params.studentId);
};

export const StudentProfile: React.FC = () => {
  const studentName = useStudentName();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{studentName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>allo</div>
      </IonContent>
    </IonPage>
  );
};
