import { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <form>
        <input type="text" />
        <input type="number" />
        <div className="CTA">
          <button>Create a user</button>
          <button>Retrieve users</button>
        </div>
      </form>

      {
        users.map(user => (
          <div key={user.id} className="user">
            {user.id}. {user.username} {user.age}
          </div>
        ))
      }
    </div>
  );
}

export default App;
