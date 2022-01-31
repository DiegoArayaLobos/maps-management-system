import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import QrList from "../../QrList/Root";
import QrProduction from "../../QrProduction/Root";
import MapView from "../../MapView/Root";
import Navbar from "../../layout/Navbar";

const Private = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/qr-list" />
                    </Route>
                    <Route exact path="/qr-list" component={QrList} />
                    <Route exact path="/qr-production" component={QrProduction} />
                    <Route path="/map-view/:id" component={MapView} />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default Private;
