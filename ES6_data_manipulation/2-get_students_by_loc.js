const getStudentsByLocation = (
  students,
  city
) => {
  if (Array.isArray(students)) {
    return students.filter(
      (student) => student.location === city
    );
  } else return [];
};
export default getStudentsByLocation;
