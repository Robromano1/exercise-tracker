import { Link } from 'react-router-dom';

const Exercise = ({ exercise, deleteExercise }) => {
	return (
		<tr>
			<td>{exercise.username}</td>
			<td>{exercise.description}</td>
			<td>{exercise.duration}</td>
			<td>{exercise.date.substring(0, 10)}</td>
			<td>
				<Link to={`/edit/${exercise._id}`} >Edit</Link> | <a href="#" onClick={() => deleteExercise(exercise._id)}>Delete</a>
			</td>
		</tr>
	)
}

export default Exercise
