import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
import AllDrivers from "./AllDrivers";
import AllTeams from "./AllTeams";
import AllRaces from "./AllRaces";
import DriverRaces from "./DriverRaces";
import TeamDetails from "./TeamDetails";
import TeamResults from "./TeamResults";
import Qualifiers from "./Qualifiers";
import Results from "./Results";
import DriverDetails from "./DriverDetails";

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