import MailOutline from '@mui/icons-material/MailOutline';
import MapaLogin from "../../../svg/MapaLogin";
import Key from '@mui/icons-material/Key';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut } from "../../../store/actions/mapsActions";
import { InputAdornment } from "@mui/material";
import { LoginStyled, Main, Input, ButtonStyled } from "./LoginStyled";
import { Dispatch } from 'redux';

interface InputValue {
    target: {
        value: string
    }
}

const Login = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const authError: { message?: string; code?: string | null} = useSelector((state: any) => state.maps.authError);
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailValidate, setEmailValidate] = useState<string>("");
    const [passwordValidate, setPasswordValidate] = useState<string>("");
    const [authMessage, setAuthMessage] = useState<string>("");

    const handleUser = ({target: {value}}: InputValue) => setEmail(value);
    const handlePassword = ({target: {value}}: InputValue) => setPassword(value);

    const handleSignIn = (email: string, password: string) => dispatch(signIn(email, password));
    const handleSignOut = () => dispatch(signOut());

    const handleEmailValidate: () => string = () => {
        if(email.length === 0) {
            return "Coloque un email";
        }
        if(email.trim() === "") {
            return "Coloque un email correcto";
        }
        if(!String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            return "Coloque un email correcto";
        }
        return "";
    }

    const handlePasswordValidate: () => string = () => {
        if(password.length < 6) {
            return "Coloque una contraseña correcta";
        }
        return "";
    }

    const handleSubmit = () => {
        setAuthMessage("");
        if (handleEmailValidate().length === 0 && handlePasswordValidate().length === 0) {
            setEmailValidate(handleEmailValidate());
            setPasswordValidate(handlePasswordValidate());
            handleSignIn(email, password);
        } else {
            setEmailValidate(handleEmailValidate());
            setPasswordValidate(handlePasswordValidate());
        }
    };

    useEffect(() => {
        let code = authError?.code;
        switch(code) {
            case "auth/wrong-password":
                setAuthMessage("Email y/o password incorrectos.");
                break;
            case "auth/user-not-found":
                setAuthMessage("Email y/o password incorrectos.");
                break;
            default:
                break;
        }
    }, [authError])

    return(
        <>
            <LoginStyled>
                <Main elevation={4}>
                    <MapaLogin className="logo" />
                    <Input 
                        error={emailValidate.length > 0 || authMessage !== ""}
                        helperText={emailValidate}
                        id="email"
                        value={email}
                        type="email" 
                        label="Email" 
                        variant="standard" 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutline />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleUser}
                    />
                    <Input 
                        error={passwordValidate.length > 0 || authMessage !== ""}
                        helperText={passwordValidate}
                        id="password"
                        value={password} 
                        type="password"
                        label="Contraseña" 
                        variant="standard" 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handlePassword}
                    />
                    <span className="authMessage">
                        {
                            authMessage
                        }
                    </span>
                    <ButtonStyled variant="contained" onClick={handleSubmit}>Ingresar</ButtonStyled>
                    {/* <ButtonStyled variant="contained" onClick={handleSignOut}>Cerrar Sesión</ButtonStyled> */}
                </Main>
            </LoginStyled>
        </>
    );
}

export default Login;