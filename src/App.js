import React from "react";
import { Router, Switch, Route, Link, NavLink } from "react-router-dom";
import history from "./history";
import AllDrivers from "./components/AllDrivers";
import AllTeams from "./components/AllTeams";
import AllRaces from "./components/AllRaces";
import TeamDetails from "./components/TeamDetails";
import DriverDetails from "./components/DriverDetails";
import RacesDetails from "./components/RacesDetails";
import Home from "./components/Home";
import { YearProvider } from './context/YearContext';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Router history={history}>
          <YearProvider>
            <ul>
              <li className="logo-icon"><Link to="/"><img src="/img/F1_logo.png" width={200} /></Link></li>
            </ul>

            <nav>
              <div className="nav-icons-container">
                <ul>
                  <li className="drivers">
                    <img src="/img/drivers.png" alt="drivers" width={60} className="image" />
                    <NavLink to="/drivers">
                      <div className="overlay drivers">
                        <div className="text">Drivers</div>
                      </div>
                    </NavLink>
                  </li>

                  <li className="teams">
                    <img src="/img/teams.png" alt="teams" width={60} className="image" />
                    <NavLink to="/teams">
                      <div className="overlay teams">
                        <div className="text">Teams</div>
                      </div>
                    </NavLink>
                  </li>

                  <li className="races">
                    <img src="/img/races.png" alt="races" width={60} className="image" />
                    <NavLink to="/races">
                      <div className="overlay races">
                        <div className="text">Races</div>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>

            <Switch>
              <Route path="/" exact component={Home} />

              <Route path="/drivers" exact component={AllDrivers} />
              <Route path="/driverDetails/:name" exact component={DriverDetails} />
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

