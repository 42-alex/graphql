import { useState, useEffect } from 'react';
import './App.css';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_USER } from './query/user';
import { CREATE_USER } from './mutation/user';

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [getUserQuery] = useLazyQuery(GET_USER);
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

  const getUser = async (userId) => {
    const retrievedUser = await getUserQuery({
      variables: {
        id: userId,
      }
    })
    console.log('retrievedUser', retrievedUser.data.getUser)
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
          <button type="button" onClick={() => refetch()}>
            Retrieve users
          </button>
        </div>
      </form>

      <div className="usersList">
        {
          users.map(user => (
            <div key={user.id} className="user" onClick={() => getUser(user.id)}>
              {user.id}. {user.username} {user.age}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
