import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { mockedStudents } from "./constant";
import { Student } from "./types";

function StudentEntry({ student }: { student: Student }) {
  const history = useHistory();
  const handleClickStudentEntry = (e: MouseEvent) => {
    e.preventDefault();
    history.push(`/students/${student.id}`);
  };

  return (
    <IonItem button onClick={handleClickStudentEntry}>
      <IonLabel>{student.name}</IonLabel>
    </IonItem>
  );
}

function StudentsList() {
  const toStudentEntry = (student: Student) => (
    <StudentEntry key={student.id} student={student} />
  );
  return <IonList lines="inset">{mockedStudents.map(toStudentEntry)}</IonList>;
}

export const StudentsListPage: React.FC<RouteComponentProps> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Students List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <StudentsList />
      </IonContent>
    </IonPage>
  );
};
