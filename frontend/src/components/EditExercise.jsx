import { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const EditExercise = (props) => {
  // const [username, setUsername] = useState("");
  // const [description, setDescription] = useState("");
  // const [duration, setDuration] = useState(0);
  // const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const userRef = useRef("userInput");

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/" + props.match.params.id)
      .then((res) => {
        setExercise({
					username: res.data.username,
					description: res.data.description,
					duration: res.data.duration,
					date: new Date(res.data.date)
				})
      })
			.catch(err => {
				console.log(err);
			})

    const url = "http://localhost:5000/users/";
    axios.get(url).then((res) => {
      if (res.data.length) {
        setUsers(res.data.map((user) => user.username));
        setExercise({ username: res.data[0].username });
      }
    });
  }, []);

  const onChangeUsername = (e) => {
    // setUsername(e.target.value);
		setExercise({username: e.target.value});
  };

  const onChangeDescription = (e) => {
    // setDescription(e.target.value);
		setExercise({description: e.target.value});
  };

  const onChangeDuration = (e) => {
    // setDuration(e.target.value);
		setExercise({duration: e.target.value});
  };

  const onChangeDate = (date) => {
    // setDate(date);
		setExercise({date})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/exercises/update/" + props.match.params.id;

    const newExercise = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };

    axios.post(url, newExercise).then((res) => console.log(res.data));

    console.log(newExercise);
    window.location = "/";
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group pb-4">
          <label>Username: </label>
          <select
            ref={userRef}
            required
            className="form-control"
            value={exercise.username}
            onChange={onChangeUsername}
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group pb-4">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={exercise.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group pb-4">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={exercise.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group pb-4">
          <label>Date: </label>
          <div>
            <DatePicker selected={exercise.date} onChange={onChangeDate} />
          </div>
        </div>
        <div className="form-group pb-4">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise
