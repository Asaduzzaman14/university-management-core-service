import { RedisClient } from '../../../shared/redis';
import { EVENT_STUDENT_CREATED } from './student.constance';

const initStudentEvents = () => {
  RedisClient.subscribe(EVENT_STUDENT_CREATED, async (e: string) => {
    const data = JSON.parse(e);
    console.log(data);
  });
};

export default initStudentEvents;
