import PersonIcon from "@material-ui/icons/Person";
import PowerSettingsNewRoundedIcon from "@material-ui/icons/PowerSettingsNewRounded";
import { resetEditMarker, signOut } from "../../../store/actions/mapsActions";
import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { NavbarStyled } from "./NavbarStyled";

const Navbar = ({ editingMarker, resetEditMarker, signOut }: { editingMarker: boolean; resetEditMarker: () => void; signOut: () => void }) => {
    const logoutRef = useRef<HTMLAnchorElement>(null);
    const [logoutConfirm, setLogoutConfirm] = useState<boolean>(false);

    const handleLogoutConfirm = (): void => {
        setLogoutConfirm(!logoutConfirm);
    };

    useEffect(() => {
        if (logoutConfirm) {
            logoutRef.current !== null && logoutRef.current.focus();
        }
    }, [logoutConfirm]);

    return (
        <>
            <NavbarStyled>
                <nav>
                    <div className="brand">
                        <span>SGM</span>
                    </div>
                    <div className="menu">
                        <NavLink to="/qr-list" onClick={resetEditMarker}>
                            Lista de QR
                        </NavLink>
                        <NavLink to="/qr-production">{`${editingMarker ? "Editar" : "Crear"} QR`}</NavLink>
                    </div>
                    <div className="logout">
                        {logoutConfirm ? (
                            <NavLink to="/" ref={logoutRef} onBlur={handleLogoutConfirm} onClick={signOut}>
                                <PowerSettingsNewRoundedIcon />
                            </NavLink>
                        ) : (
                            <div className="logoutConfirm" onClick={handleLogoutConfirm}>
                                <PersonIcon />
                            </div>
                        )}
                    </div>
                </nav>
            </NavbarStyled>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        editingMarker: state.maps.editingMarker,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        resetEditMarker: () => dispatch(resetEditMarker()),
        signOut: () => dispatch(signOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
