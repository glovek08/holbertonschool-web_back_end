import initializeRooms from '../1-make_classrooms.js';
import ClassRoom from '../0-classroom.js';

test('initializeRooms should return an array of ClassRoom instances with sizes 19, 20, and 34', () => {
  const rooms = initializeRooms();
  expect(rooms).toHaveLength(3);
  rooms.forEach(room => {
    expect(room).toBeInstanceOf(ClassRoom);
  });
  expect(rooms.map(room => room._maxStudentsSize)).toEqual([19, 20, 34]);
});