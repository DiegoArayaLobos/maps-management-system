import Login from "../../auth/Login";
import MapView from "../../MapView/Root";
import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, useHistory, Redirect } from "react-router-dom";
const Public = ({ signOutState }: { signOutState: boolean }) => {
    const history = useHistory();
    useEffect(() => {
        signOutState && history !== undefined && history.push("/");
    }, [signOutState, history]);
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/qr-list">
                        <Redirect to="/" />
                    </Route>
                    <Route exact path="/qr-production">
                        <Redirect to="/" />
                    </Route>
                    <Route path="/map-view/:id" component={MapView} />
                </Switch>
            </BrowserRouter>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        signOutState: state.maps.signOut,
    };
};

export default connect(mapStateToProps)(Public);
