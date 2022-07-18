import { mockedStudents } from "../pages/students/constant";
import { Student } from "../pages/students/types";

export function getStudentName(studentId: string){
   const byStudentId = (student: Student) =>
   student.id === parseInt(studentId);
 return mockedStudents.find(byStudentId)?.name ?? "Unknown";
}