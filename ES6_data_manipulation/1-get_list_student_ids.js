const getListStudentsIds = (students) => {
    if (Array.isArray(students)) {
        return students.map(el => el.id);
    } else return [];
}
export default getListStudentsIds;
