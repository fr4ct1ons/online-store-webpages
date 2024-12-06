import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import Template from "../Template";
import { GetCookie, SetCookie } from "../helpers/cookieHelper";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { useEffect, useState } from "react";
import { UserManager } from "../login/user_manager";

const userIdKey = "userId"
const userNameKey = "userName"


function UserFront() {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const [activeUserId, setUserId] = useState('');

    const userIdCookie = GetCookie(userIdKey)
    if (!activeUserId && userIdCookie) {
        setUserId(userIdCookie);
    }
    const userNameCookie = GetCookie(userNameKey)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registering, setRegistering] = useState(false);
    const [purchases, setPurchases] = useState([]);
    const [registerError, setRegisterError] = useState("")
    const [loginError, setLoginError] = useState("")

    useEffect(() => {
        if (activeUserId) {
            GetPurchases();
        }
    }, [activeUserId]);
    var mng = new UserManager()

    function Login() {
        setLoginError("")
        mng.login(username, password)
            .then((response) => {
                console.log(response);
                if (response) {
                    SetCookie(userIdKey, response.id, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
                    SetCookie(userNameKey, response.username, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
                    setUserId(response.id);
                }
            }).catch(error => {
                console.error('There was a problem logging in:', error);
                setLoginError("Usuário/senha inválidos!");
            })
    }

    function RegisterUser() {
        setRegisterError("")
        mng.createUser(username, password)
            .then((response) => {
                if (response) {
                    SetCookie(userIdKey, response.id, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
                    SetCookie(userNameKey, response.username, dayjs().tz(dayjs.tz.guess()).add(8, "hours"))
                    setUserId(response.id);
                }
                console.log(response)
            })
            .catch((error) => {
                setRegisterError("Já eixte um usuário com esse nome.")
            })
    }

    function Logoff() {
        SetCookie(userIdKey, "");
        setRegistering(false);
        setUserId('');
        setPurchases([]);
    }

    function DeleteUser() {
        mng.deleteUser(userIdCookie)
            .then((response) => {
                if (response) {
                    Logoff();
                }
            })
    }

    function GetPurchases() {
        mng.GetUser(activeUserId).then((response) => {
            if (response) {
                console.log(response.purchases);
                setPurchases(response.purchases);
            }
        })
    }
    let purchasesComponents = [];

    if (!activeUserId) {
        let width = "12rem"
        let component = (

            <Stack spacing={"1rem"} alignItems={"center"} direction={"column"}>
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Nome de usuário"></TextField>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Senha"></TextField>
                <Box spacing=".5rem" display={"flex"} width={"100%"} justifyContent={"end"}>
                    <Button onClick={() => Login()} variant="contained">Entrar</Button>
                </Box>
                {loginError? (<Typography sx={{fontSize: 12, color: "red"}}>{loginError}</Typography>) : ""}
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
                {registerError? (<Typography sx={{fontSize: 12, color: "red"}}>{registerError}</Typography>) : ""}
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
    if (purchases.length !== 0) {
        purchasesComponents = purchases.map((purchase, index) => {
            return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Stack
                        direction="column"
                        sx={{
                            border: "1.5px solid #ddd",
                            p: "1rem",
                            borderRadius: "8px",
                            width: "30rem",
                            mb: "1rem",
                        }}
                        justifyContent="center"
                        spacing={".5rem"}

                    >
                        {purchase.products.map((p, index) => {
                            return (
                                <Stack key={index}>
                                    {index > 0 && <div
                                        className="divider"
                                        style={{
                                            borderTop: "1px dashed #000",
                                            width: "80%",
                                            margin: "0 auto",
                                            paddingTop: "0.25rem",
                                            paddingBottom: "0.25rem",
                                            spacing: ".5rem",

                                        }}
                                    ></div>}

                                    <Box sx={{ display: "flex", alignItems: "end", justifyContent: "space-between" }}>
                                        <Typography fontSize={16}>{p.name}</Typography>
                                        <Typography fontSize={12}>
                                            R$ {p.price}
                                            {Number.isInteger(p.price) ? ".00" : ""}
                                        </Typography>
                                    </Box>

                                    <Typography fontSize={12}>{p.description}</Typography>
                                </Stack>
                            );
                        })}
                    </Stack>
                </div>
            );
        })
    }
    return (
        <Template>
            <Stack width={"48rem"} mx="auto" direction={"column"} spacing={"1rem"} boxShadow={"#ddd 0px 8px 8px"} padding={"1rem"} borderRadius={"8px"} border={"1.5px solid #ccc"} marginBottom={'1rem'}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography>Olá, {userNameCookie}!</Typography>
                    <Chip onClick={Logoff} color="primary" variant="outlined" label="Sair" />
                </Stack>
                <Stack alignItems={"end"}>
                    <Chip onClick={DeleteUser} color="destructive" variant="outlined" label="Excluir conta" />
                </Stack>
            </Stack>

            {purchasesComponents}
        </Template>
    );
}
export default UserFront;