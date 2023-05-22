import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
import AllDrivers from "./components/AllDrivers";
import AllTeams from "./components/AllTeams"
import AllRaces from "./components/AllRaces";
import DriverRaces from "./components/DriverRaces";
import TeamDetails from "./components/TeamDetails";
import TeamResults from "./components/TeamResults";
import Qualifiers from "./components/Qualifiers";
import Results from "./components/Results";
import DriverDetails from "./components/DriverDetails";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">LOGO</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/AllDrivers" exact component={AllDrivers} />
                        <Route path="/details/" exact component={DriverDetails} />
                        <Route path="/AllTeams" exact component={AllTeams} />
                        <Route path="/AllRaces" exact component={AllRaces} />
                   </Switch>
                </Router>
            </div>
        );
    }
}