class Student {
    constructor(id, firstName, location) {
        this.id = id;
        this.firstName = firstName;
        this.location = location;
    }
}
const getListStudents = () => {
    const students = []
    students.push(new Student(1, "Guillaume", "San Francisco"));
    students.push(new Student(2, "James", "Columbia"));
    students.push(new Student(5, "Serena", "San Francisco"));
    return students;
}
console.log(getListStudents());
// export default getListStudents;
