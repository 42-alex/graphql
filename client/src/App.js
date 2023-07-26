import { useState, useEffect } from 'react';
import './App.css';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS } from './query/user';
import { CREATE_USER } from './mutation/user';

function App() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [createUserMutation] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState(0);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data])

  const resetForm = () => {
    setUserName('');
    setUserAge(0);
  }

  const handleCreateUser = () => {
    createUserMutation({
      variables: {
        input: {
          username: userName,
          age: userAge,
        }
      }
    })
    resetForm();
  }

  return (
    <div className="app">
      <form>
        <input value={userName} onChange={e => setUserName(e.target.value)} type="text" />
        <input value={userAge} onChange={e => setUserAge(Number(e.target.value))} type="number" />
        <div className="CTA">
          <button type="button" onClick={handleCreateUser}>
            Create a user
          </button>
          <button>Retrieve users</button>
        </div>
      </form>

      <div className="usersList">
        {
          users.map(user => (
            <div key={user.id} className="user">
              {user.id}. {user.username} {user.age}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
