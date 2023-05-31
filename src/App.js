import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import history from "./history";
import AllDrivers from "./components/AllDrivers";
import AllTeams from "./components/AllTeams";
import AllRaces from "./components/AllRaces";
import TeamDetails from "./components/TeamDetails";
import DriverDetails from "./components/DriverDetails";
import RacesDetails from "./components/RacesDetails";
import Home from "./components/Home";

export default class App extends React.Component {

  render() {

    return (
      <div>
        <Router history={history}>
          <div>
            <li className="logo-icon"><Link to="/"><img src="/img/F1_logo.png" width={200} /></Link></li>
          </div>

          <nav className="nav-icons-container">
            <div className="drivers-link">
              <NavLink to="/drivers" exact activeClassName="active-link">
                <Link>Drivers</Link>
                <img src="/img/drivers.png" alt="Drivers" width={80} />
              </NavLink>
            </div>

            <div className="teams-link">
              <NavLink to="/teams" exact activeClassName="active-link">
                <Link>Teams</Link>
                <img src="/img/teams.png" alt="Teams" width={90} />
              </NavLink>
            </div>

            <div className="races-link">
              <NavLink to="/races" exact activeClassName="active-link">
                <Link>Races</Link>
                <img src="/img/races.png" alt="Races" width={90} />
              </NavLink>
            </div>
          </nav>


          <Switch>
            <Route path="/home" exact component={Home} />

            <Route path="/drivers" exact component={AllDrivers} />
            <Route path="/driverDetails/:name" exact component={DriverDetails} />
            <Route path="/teams" exact component={AllTeams} />
            <Route path="/teamDetails/:name" exact component={TeamDetails} />
            <Route path="/races" exact component={AllRaces} />
            <Route path="/raceDetails/:round" exact component={RacesDetails} />
          </Switch>
        </Router>
      </div>
    );
  }
}