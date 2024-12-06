import { Box, Button, Chip, Input, Stack, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Template from "../Template";
import { GetCookie, SetCookie } from "../helpers/cookieHelper";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import {StoreManager} from "../login/store_manager"
import { createContext, useEffect, useState } from "react";
import StoreProductListing from "../components/StoreProductListing";
import CreateProductModal from "../components/CreateProductModal";
import { useNavigate } from "react-router";

const storeIdKey = "storeId"
const storeNameKey = "storeName"

export const SetProductsContext = createContext((products) => {})
export const ProductsContext = createContext([])

function Storefront() {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const testcookie = GetCookie("hello")
    const storeIdCookie = GetCookie(storeIdKey)
    const storeNameCookie = GetCookie(storeNameKey)
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [description, setDescription] = useState("")
    const [currentStoreId, setCurrentStoreId] = useState("")
    const [products, setProducts] = useState(undefined)

    const [modalOpen, setModalOpen] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [registerError, setRegisterError] = useState("")
    const [loginError, setLoginError] = useState("")

    var mng = new StoreManager()

    function StoreLogin()
    {
        mng.login(username, password)
        .then((response) => {
            console.log(response)
            if(response)
            {
                SetCookie(storeIdKey, response.id, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
                SetCookie(storeNameKey, response.name, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
                setCurrentStoreId(response.id);
            }
        })
        .catch((error) => {
            console.log("Ih deu ruim")
            setLoginError("Senha ou usuário inválidos.")
        })
    }

    function RegisterStore()
    {
        mng.createStore(username, password, description)
        .then((response) =>{
            if(response)
            {
                SetCookie(storeIdKey, response.id, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
                setCurrentStoreId(response.id);
            }

            console.log(response)
        })
        .catch((error) => {
            setRegisterError("Erro ao registrar - Já existe uma conta com este nome.")
            console.log(error)
        })
    }

    function Logoff()
    {
        SetCookie(storeIdKey, "")
        setRegistering(false)
        setCurrentStoreId("")
        
        navigate("/")
    }

    if(!storeIdCookie)
    {
        let width = "12rem"
        let component = (
            
            <Stack spacing={"1rem"} alignItems={"center"} direction={"column"}>
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Nome da loja"></TextField>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Senha"></TextField>
                <Box spacing=".5rem" display={"flex"} width={"100%"} justifyContent={"end"}>
                    <Button onClick={() => StoreLogin()} variant="contained">Entrar</Button>
                </Box>
                {loginError? (<Typography sx={{fontSize: 12, color: "red"}}>{loginError}</Typography>) : ""}
                <Typography fontSize={12} >Não tem uma loja? <Typography sx={{cursor : "pointer"}} color="primary" fontSize={12} display={"inline"} style={{color: "primary"}} onClick={() => setRegistering(true)}>Criar uma</Typography></Typography>
            </Stack>
        )

        if(registering)
        {
            width = "20rem"
            component = (
                <Stack spacing={"1rem"}>
                    <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Nome da loja"></TextField>
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Senha"></TextField>
                    <TextField value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={6} label="Descrição"></TextField>

                    <Box spacing=".5rem" display={"flex"} width={"100%"} justifyContent={"space-between"}>
                    <Button onClick={() => {}} variant="outlined">Voltar</Button>
                    <Button onClick={() => RegisterStore()} variant="contained">Registrar</Button>
                    </Box>
                    {registerError? (<Typography sx={{fontSize: 12, color: "red"}}>{registerError}</Typography>) : ""}
                </Stack>
            )
        }

        return (
            <Template>
                <Box sx={{borderRadius: "16px", boxShadow: "#ddd 0px 8px 16px", border:"1.5px solid #ddd", width: width, p:"2rem", mx: "auto"}}>
                    {component}
                </Box>
            </Template>
        )
    }
        
    if(!products)
    {
        mng.GetStore(storeIdCookie)
        .then((response) => {
            console.log(response)
            setProducts(response.products)
            setDescription(response.description)
        })
    }
    
    let productComponents;
    if(products)
    {
        productComponents = products.map((p) => {
            return (
                <StoreProductListing description={p.description} name={p.name} price={p.price} id={p.id} comments={p.reviews} />
            )
        })
    }

    return ( 
        <Template>
            <ProductsContext.Provider value={products} >
                <SetProductsContext.Provider value={setProducts} >
                    <Stack width={"48rem"} mx="auto" direction={"column"} spacing={"1rem"} boxShadow={"#ddd 0px 8px 8px"} padding={"1rem"} borderRadius={"8px"} border={"1.5px solid #ccc"}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Typography>Olá, {storeNameCookie}! Esta página está em construção.</Typography>
                            <Chip onClick={Logoff} color="primary" variant="outlined" label="Sair" />
                        </Stack>
                        
                        <Typography sx={{fontSize: "14px", fontStyle: "italic"}}>{description}</Typography>

                        <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
                            <Typography >Produtos</Typography>
                            <Chip onClick={() => setModalOpen(true)} color="primary" variant="outlined" label="Adicionar novo produto" />
                        </Stack>
                        <Grid container spacing="2rem">
                            {productComponents}
                        </Grid>
                    </Stack>

                    <CreateProductModal open={modalOpen} setOpen={setModalOpen} storeId={storeIdCookie} products={products} setProducts={setProducts} />
                </SetProductsContext.Provider>
            </ProductsContext.Provider>
        </Template>
     );
}

export default Storefront;