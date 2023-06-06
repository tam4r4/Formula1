import React from "react";
import { Router, Switch, Route, NavLink } from "react-router-dom";
import history from "./history";
import AllDrivers from "./components/AllDrivers";
import AllTeams from "./components/AllTeams";
import AllRaces from "./components/AllRaces";
import TeamDetails from "./components/TeamDetails";
import DriverDetails from "./components/DriverDetails";
import RacesDetails from "./components/RacesDetails";
import Home from "./components/Home";
import { YearProvider } from "./context/YearContext";

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Router history={history}>
          <YearProvider>
            <nav className="nav-icons-container">

              <NavLink to="/"><img src="../img/f1_logo.png" className="logo-icon" /></NavLink>

              <div className="drivers-link">
                <NavLink to="/drivers" exact activeClassName="active-link">
                  <p>Drivers</p>
                  <img src="../img/drivers.png" alt="Drivers" className="icon-drivers" />
                </NavLink>
              </div>

              <div className="teams-link">
                <NavLink to="/teams" exact activeClassName="active-link">
                  <p>Teams</p>
                  <img src="../img/teams.png" alt="Teams" className="icon-teams" />
                </NavLink>
              </div>

              <div className="races-link">
                <NavLink to="/races" exact activeClassName="active-link">
                  <p>Races</p>
                  <img src="../img/races.png" alt="Races" className="icon-races" />
                </NavLink>
              </div>
            </nav>

            <Switch>
              <Route path="/" exact component={Home} />

              <Route path="/drivers" exact component={AllDrivers} />
              <Route path="/driverDetails/:name" component={DriverDetails} />
              <Route path="/teams" exact component={AllTeams} />
              <Route path="/teamDetails/:name" exact component={TeamDetails} />
              <Route path="/races" exact component={AllRaces} />
              <Route path="/raceDetails/:round" exact component={RacesDetails} />
            </Switch>

          </YearProvider>
        </Router>
      </div>
    );
  }
}

