import { useState } from "react";
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
		const url = 'http://localhost:5000/users/add'

    const user = {
      username,
    };

		axios.post(url, user)
			.then(res => console.log(res.data))

    console.log(user);

    setUsername("");
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group pb-4">
          <label>Username: </label>
          <input
            type="text"
            required
						className="form-control"
            onChange={onChangeUsername}
            value={username}
          />
        </div>
				<div className="form-group">
					<input type="submit" value="Create User" className="btn btn-primary"  />
				</div>
      </form>
    </div>
  );
};

export default CreateUser;
