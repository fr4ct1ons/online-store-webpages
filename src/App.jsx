import './App.css';
import { Button, Stack, Typography } from '@mui/material';
import Template from './Template';

function App() {

  return(
    <Template>
      <Stack direction={"column"} alignItems={"center"} sx={{mx: "0rem"}}> 
        <Typography variant='h3'>Online Store</Typography>
        <Typography marginY={"2rem"}>O seu marketplace virtual.</Typography>
        <Button variant='contained'>Conhecer</Button>
      </Stack>
    </Template>
  )

/*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
*/
}

export default App;
