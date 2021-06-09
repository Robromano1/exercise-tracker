import axios from "axios";
import { useState, useEffect } from "react";
import Exercise from './Exercise';

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const url = "http://localhost:5000/exercises/";
    axios
      .get(url)
      .then((res) => {
        setExercises(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteExercise = (id) => {
    const url = `http://localhost:5000/exercises/${id}`;
    axios.delete(url).then((res) => console.log(res.data));

    setExercises(exercises.filter((el) => el._id !== id));
  };

  const exerciseList = () => {
    return exercises.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
