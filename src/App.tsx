import Public from "./components/route/Public";
import Private from "./components/route/Private";
import { connect } from "react-redux";

const App = ({ auth }: { auth: any }) => <>{!auth.isEmpty && auth.isLoaded ? <Private /> : <Public />}</>;

const mapStateToProps = (state: any) => {
    return {
        auth: state.firebase.auth,
    };
};

export default connect(mapStateToProps)(App);
