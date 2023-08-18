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
  state = {
    showSnackbar: false,
    yearSelected: false,
    menuOpen: false
  };


  handleSnackbar = () => {
    if (!this.state.yearSelected) {
      this.setState({ showSnackbar: true });
      setTimeout(() => {
        this.setState({ showSnackbar: false });
      }, 3000);
    }
  };

  handleYearSelection = () => {
    this.setState({ yearSelected: true });
  };

  openMenu = () => {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen
    }));
  };


  render() {
    const { showSnackbar, yearSelected, menuOpen } = this.state;

    return (
      <div>
        <Router history={history}>

          <YearProvider>

            <nav className={`nav-icons-container ${menuOpen ? 'menu-open' : ''}`}>
              <div className="drivers-link">
                <NavLink
                  to="/drivers"
                  exact
                  activeClassName="active-link"
                  onMouseMove={this.handleSnackbar}
                  onClick={this.handleYearSelection}
                >
                  <div id="snackbar" className={showSnackbar ? 'show' : ''}>
                    Please select a year!
                  </div>
                  <p>Drivers</p>
                  <img src="/img/drivers.png" alt="Drivers" className="icon-drivers" />
                </NavLink>
              </div>

              <div className="teams-link">
                <NavLink
                  to="/teams"
                  exact
                  activeClassName="active-link"
                  onMouseMove={this.handleSnackbar}
                  onClick={this.handleYearSelection}
                >
                  <div id="snackbar" className={showSnackbar ? 'show' : ''}>
                    Please select a year!
                  </div>
                  <p>Teams</p>
                  <img src="/img/teams.png" alt="Teams" className="icon-teams" />
                </NavLink>
              </div>

              <div className="races-link">
                <NavLink
                  to="/races"
                  exact
                  activeClassName="active-link"
                  onMouseMove={this.handleSnackbar}
                  onClick={this.handleYearSelection}
                >
                  <div id="snackbar" className={showSnackbar ? 'show' : ''}>
                    Please select a year!
                  </div>
                  <p>Races</p>
                  <img src="/img/races.png" alt="Races" className="icon-races" />
                </NavLink>
              </div>
            </nav>

            <div className="hamburger-container">
              <div className={`hamburger-icon ${menuOpen ? "change" : ""}`}
                onClick={() => {
                  this.openMenu();
                }}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/drivers" exact component={AllDrivers} />
              <Route path="/driverDetails/:name" component={DriverDetails} />
              <Route path="/teams" exact component={AllTeams} />
              <Route path="/teamDetails/:name" component={TeamDetails} />
              <Route path="/races" exact component={AllRaces} />
              <Route path="/raceDetails/:round" component={RacesDetails} />
            </Switch>

          </YearProvider>
        </Router>
      </div>
    );
  }
}

