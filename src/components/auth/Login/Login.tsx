import MapaLogin from "../../../svg/MapaLogin";
import { connect } from "react-redux";
import { signIn } from "../../../store/actions/mapsActions";
import { ChangeEvent, useState } from "react";
import { LoginStyled } from "./LoginStyled";

interface LoginInterface {
    authError: any;
    signIn: (user: string, password: string) => void;
}

const Login = (props: LoginInterface) => {
    const { authError, signIn } = props;
    let codeError = authError !== null && authError.code;
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validate, setValidate] = useState<boolean>(false);
    const handleUser = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setUser(target.value);
    };
    const handlePassword = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setPassword(target.value);
    };
    const handlesubmit = () => {
        let error: boolean = false;
        setValidate(true);
        if (user.length === 0) {
            error = true;
        }
        if (password.length === 0) {
            error = true;
        }
        if (!error) {
            signIn(user, password);
        }
    };
    return (
        <>
            <LoginStyled>
                <div className="container">
                    <div className="section">
                        <MapaLogin />
                    </div>
                    <div className="section">
                        <input value={user} type="text" className={`${validate && user.length === 0 ? "validate" : ""} ${codeError === "auth/user-not-found" ? "validate" : ""}`} onChange={handleUser} />
                        <label htmlFor="user" className={`${user.length > 0 ? "animation" : ""} ${validate && user.length === 0 ? "validate" : ""} ${codeError === "auth/user-not-found" ? "validate" : ""}`}>
                            {`Usuario ${codeError === "auth/user-not-found" ? " / Posible error" : ""}`}
                        </label>
                    </div>
                    <div className="section">
                        <input value={password} type="password" className={`${validate && password.length === 0 ? "validate" : ""} ${codeError === "auth/user-not-found" ? "validate" : ""}`} onChange={handlePassword} />
                        <label htmlFor="password" className={`${password.length > 0 ? "animation" : ""} ${validate && password.length === 0 ? "validate" : ""} ${codeError === "auth/user-not-found" ? "validate" : ""}`}>
                            {`Contraseña ${codeError === "auth/user-not-found" ? " / Posible error" : ""}`}
                        </label>
                    </div>
                    <div className="section">
                        <button onClick={handlesubmit}>Ingresar</button>
                    </div>
                    <div className="section">{/* <span>Olvido su contraseña?</span> */}</div>
                </div>
            </LoginStyled>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        authError: state.maps.authError,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        signIn: (user: string, password: string) => dispatch(signIn(user, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
