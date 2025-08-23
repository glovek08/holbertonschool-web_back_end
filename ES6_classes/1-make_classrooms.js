import ClassRoom from "./0-classroom.js";

const initializeRooms = () => {
    const classes = []
    try {
        classes.push(
            new ClassRoom(19),
            new ClassRoom(20),
            new ClassRoom(34)
        );
    } catch (error) {
        console.warn(error);
        return;
    }
    return classes;
}

console.log(initializeRooms());

export default initializeRooms;