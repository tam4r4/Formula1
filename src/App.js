import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
import AllDrivers from "./components/AllDrivers";
import AllTeams from "./components/AllTeams";
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
              <li>
                <Link to="/drivers">Drivers</Link>
              </li>
              <li>
                <Link to="/teams">Teams</Link>
              </li>
              <li>
                <Link to="/races">Races</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/drivers" exact component={AllDrivers} />
            <Route path="/drivers/:name" exact component={DriverDetails} />
            <Route path="/teams" exact component={AllTeams} />
            <Route path="/races" exact component={AllRaces} />
          </Switch>
        </Router>
      </div>
    );
  }
}
