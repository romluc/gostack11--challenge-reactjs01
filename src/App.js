import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  // Add a project to api
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: `http://github/asdfNative`,
      techs: `['React Native', 'ReactJS']`,
    });

    const repo = response.data;

    // Add repo as a new item after using the spread operator
    // to retrieve previous items
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    // Render state without the item with the correspondent id
    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <h1>Projects from API</h1>

      <ul data-testid='repository-list'>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
