import { Box, Button, Chip, Input, Stack, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Template from "../Template";
import { GetCookie, SetCookie } from "../helpers/cookieHelper";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { createContext, useEffect, useState } from "react";
import StoreProductListing from "../components/StoreProductListing";
import CreateProductModal from "../components/CreateProductModal";
import { UserManager } from "../login/user_manager";

const userIdKey = "userId"
const userNameKey = "userName"

export const SetProductsContext = createContext((products) => { })
export const ProductsContext = createContext([])

function UserFront() {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const userIdCookie = GetCookie(userIdKey)
    const userNameCookie = GetCookie(userNameKey)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [currentuserId, setCurrentuserId] = useState("")
    const [registering, setRegistering] = useState(false)
    
    var mng = new UserManager()

    function Login() {
        mng.login(username, password)
            .then((response) => {
                console.log(response);  
                if (response) {
                    SetCookie(userIdKey, response.id, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
                    SetCookie(userNameKey, response.username, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
                    setCurrentuserId(response.id);
                }
            }).catch(error => {
                console.error('There was a problem logging in:', error);
                alert("Usuário/senha inválidos!");
            })
    }

    function RegisterUser() {
        mng.createUser(username, password)
            .then((response) => {
                if (response) {
                    SetCookie(userIdKey, response.id, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
                    setCurrentuserId(response.id);
                }

                console.log(response)
            })
    }

    function Logoff() {
        SetCookie(userIdKey, "");
        setCurrentuserId("");
        setRegistering(false);
    }

    function DeleteUser() {
        mng.deleteUser(userIdCookie)
            .then((response) => {
                if (response) {
                    Logoff();
                }

            })
    }

    if (!userIdCookie) {
        let width = "12rem"
        let component = (

            <Stack spacing={"1rem"} alignItems={"center"} direction={"column"}>
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Nome de usuário"></TextField>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Senha"></TextField>
                <Box spacing=".5rem" display={"flex"} width={"100%"} justifyContent={"end"}>
                    <Button onClick={() => Login()} variant="contained">Entrar</Button>
                </Box>
                <Typography fontSize={12} >Não tem uma conta? <Typography sx={{ cursor: "pointer" }} color="primary" fontSize={12} display={"inline"} style={{ color: "primary" }} onClick={() => setRegistering(true)}>Criar uma</Typography></Typography>
            </Stack>
        )

        if (registering) {
            width = "20rem"
            component = (
                <Stack spacing={"1rem"}>
                    <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Nome de usuário"></TextField>
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Senha"></TextField>

                    <Box spacing=".5rem" display={"flex"} width={"100%"} justifyContent={"space-between"}>
                        <Button onClick={() => { }} variant="outlined">Voltar</Button>
                        <Button onClick={() => RegisterUser()} variant="contained">Registrar</Button>
                    </Box>
                </Stack>
            )
        }
        return (
            <Template>
                <Box sx={{ borderRadius: "16px", boxShadow: "#ddd 0px 8px 16px", border: "1.5px solid #ddd", width: width, p: "2rem", mx: "auto" }}>
                    {component}
                </Box>
            </Template>
        );

    }
    return (
        <Template>
            <Stack width={"48rem"} mx="auto" direction={"column"} spacing={"1rem"} boxShadow={"#ddd 0px 8px 8px"} padding={"1rem"} borderRadius={"8px"} border={"1.5px solid #ccc"}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography>Olá, {userNameCookie}!</Typography>
                    <Chip onClick={Logoff} color="primary" variant="outlined" label="Sair" />
                </Stack>
                <Stack alignItems={"end"}>
                    <Chip onClick={DeleteUser} color="destructive" variant="outlined" label="Excluir conta" />
                </Stack>
            </Stack>

        </Template>
    );
}
export default UserFront;