const getStudentsByLocation = (students, city) => {
    if (Array.isArray(students)) {
        return students.filter(el => el.location === city);
    } else return [];
}
export default getStudentsByLocation;