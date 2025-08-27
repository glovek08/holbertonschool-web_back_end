const getStudentIdsSum = (students) => {
  if (Array.isArray(students)) {
    // let idSum = 0
    // return students.map(el => { idSum += el.id; })
    return students.reduce(
      (sum, students) => students.id + sum,
      0
    );
  } else return 0;
};
export default getStudentIdsSum;
