import React from "react";
import axios from "axios";
import Loader from "./Loader";
import history from "../history";

export default class AllDrivers extends React.Component {
  state = {
    driverStandings: [],
    loading: true
  };

  componentDidMount() {
    this.getDrivers();
  }

  getDrivers = async () => {
    const url = "https://ergast.com/api/f1/2013/driverStandings.json";
    const response = await axios.get(url);
    console.log(
      response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    );
    this.setState({
      driverStandings:
        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
      loading: false
    });
  }

  handleDriverDetails = (name) => {
    //console.log(name);
    const linkTo = "/drivers/" + name;
    history.push(linkTo);
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="kon-loader">
          <Loader />
        </div>
      );
    }

    return (
      <div>
        <h1>Drivers Championship</h1>
        <table className="tab-container">
          <thead>
            <tr>Driver Championship Standings 2013</tr>
          </thead>
          <tbody>
            {this.state.driverStandings.map((x) => (
              <tr>
                <td> {x.position}</td>
                <td onClick={() => this.handleDriverDetails(x.Driver.driverId)}>
                  {x.Driver.givenName} {x.Driver.familyName}
                </td>
                <td>{x.Constructors[0].name}</td>
                <td>{x.points}</td>
              </tr>
            ))};
          </tbody>
        </table>
      </div>
    );
  }
}
