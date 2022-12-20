import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles'
import { useState } from 'react';
import  Button  from '../components/Button';
import { api } from '../services/api';

function App() {

  const [currentRepo, setCurrentRepo] = useState('')
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`)

    if(data.id){
      const isExist = repos.find(repo => repo.id === data.id)

      if(!isExist){
        setRepos(prev => [...prev, data])
        setCurrentRepo('')
        return
      }
    }
  }

  const handleRemoveRepo = (id) => {
    const filt = repos.filter(
      (prev) => prev.id !== id
    )
    setRepos(filt)
  }
  return (
    <Container>
      <img src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg" width={72} height={72} alt="github logo" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}      
    </Container>
  );
}

export default App;
