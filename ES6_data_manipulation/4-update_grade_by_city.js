const updateStudentGradeByCity = (students, city, newGrades) => {
    const upgradedStudents = students.filter(student => student.location === city).map(student => {
        const studentGrades = newGrades.filter(grade => grade.studentId === student.id);
        return {
            ...student,
            grade: studentGrades.length > 0 ? studentGrades[0].grade : "N/A",
        };
    });
    return upgradedStudents;
};

