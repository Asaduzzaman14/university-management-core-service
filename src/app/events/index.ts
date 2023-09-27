import initFacultyEvents from '../modules/faculty/faculty.events';
import initStudentEvents from '../modules/student/student.events';

const subscriveToEvents = () => {
  initStudentEvents();
  initFacultyEvents();
};
export default subscriveToEvents;
