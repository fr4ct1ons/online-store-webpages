import './App.css';
import { Button, Stack, Typography, Box } from '@mui/material';
import Template from './Template';
import { useState } from 'react';
import { ProductManager } from './login/product_manager';
import { StoreManager } from './login/store_manager';

function App() {

  const [products, setProducts] = useState(undefined)
  const [stores, setStores] = useState(undefined)

  if(!products)
  {
    let mng = new ProductManager();
    mng.GetRandomProducts()
    .then((p) => {
      setProducts(p);
    })
  }

  if(!stores)
  {
    let mng = new StoreManager()
    mng.GetRandomStores()
    .then((p) => {
      setStores(p);
    })
  }

  let productComponents = ""
  let storeComponents = ""

  if(products)
  {
    productComponents = products.map((p) => {
      return (
        <Stack sx={{border: "1.5px solid #ddd", p:"1rem", borderRadius: "8px", width: "18%"}} spacing={".5rem"}>
          <Box sx={{display: "flex", alignItems: "end", justifyContent: "space-between"}}>
            <Typography fontSize={16} >{p.name}</Typography>
            <Typography fontSize={12} >R$ {p.price}{Number.isInteger(p.price) ? ".00" : ""}</Typography>
          </Box>
          <Typography>{p.description}</Typography>
          <Button style={{marginTop: "auto"}} variant='contained'>Adicionar ao carrinho</Button>
        </Stack>
      )
    })
  }

    if(stores)
    {
      storeComponents = stores.map((s) => {
        return (
          <Stack direction="row" sx={{border: "1.5px solid #ddd", p:"1rem", borderRadius: "8px", width: "100%"}} spacing={".5rem"}>
            <Box>
              <Typography fontSize={18} >{s.name}</Typography>
              <Typography fontSize={14} fontStyle={"italic"}>{s.description}</Typography>
            </Box>
            <Button style={{marginLeft: "auto"}} variant='contained'>Conhecer</Button>
          </Stack>
        )
      })
    }

  return(
    <Template>
      <Stack direction={"column"} alignItems={"center"} sx={{mx: "0rem"}}> 
        <Typography variant='h3'>Online Store</Typography>
        <Typography marginY={"2rem"}>O seu marketplace virtual.</Typography>
        <Typography variant="h4" sx={{mt: "2rem", mb:"1rem"}}>Produtos em destaque:</Typography>
        <Stack direction="row" justifyContent="center" spacing={"1rem"}>
          {productComponents}
        </Stack>
        <Typography variant="h4" sx={{mt: "2rem", mb:"1rem"}}>Lojas em destaque:</Typography>
        <Stack direction="column" spacing={"1rem"} width={"100%"} >
          {storeComponents}
        </Stack>
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
