import { Box, Button, Input, Stack, TextField, Typography } from "@mui/material";
import Template from "../Template";
import { GetCookie, SetCookie } from "../helpers/cookieHelper";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import {StoreManager} from "../login/store_manager"
import { useState } from "react";

function Storefront() {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const testcookie = GetCookie("hello")
    const storeIdCookie = GetCookie("storeId")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [description, setDescription] = useState("")

    const [registering, setRegistering] = useState(false)

    var mng = new StoreManager()

    if(!testcookie)
    {
        let date = dayjs().tz(dayjs.tz.guess()).add(8, "hours")
        SetCookie("hello", "1337", date.toISOString())
    }

    function StoreLogin()
    {
        mng.login(username, password)
        .then((response) => {
            console.log(response)
            if(response)
            {
                SetCookie("storeId", response.id, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
            }
        })
    }

    function RegisterStore()
    {
        mng.createStore(username, password, description)
        .then((response) =>{
            if(response)
            {
                SetCookie("storeId", response.id, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
            }

            console.log(response)
        })
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

    return ( 
        <Template>
            <Typography>Olá, {storeIdCookie}! Esta página está em construção.</Typography>
        </Template>
     );
}

export default Storefront;