import { useState, useEffect } from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from './query/user';

function App() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data])

  return (
    <div className="app">
      <form>
        <input type="text" />
        <input type="number" />
        <div className="CTA">
          <button>Create a user</button>
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
