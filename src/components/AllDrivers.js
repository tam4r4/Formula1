import React from "react";
import axios from "axios";
import Loader from "./Loader";
import history from "../history";
import Flag from "react-flagkit";

export default class AllDrivers extends React.Component {
  state = {
    driverStandings: [],
    flags: [],
    loading: true
  };

  componentDidMount() {
    this.getDrivers();
  }

  getDrivers = async () => {
    const url = "https://ergast.com/api/f1/2013/driverStandings.json";
    // const url = "https://raw.githubusercontent.com/nkezic/f1/main/AllDrivers";
    const url3 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";

    const response = await axios.get(url);
    const response3 = await axios.get(url3);

    this.setState({
      driverStandings: response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
      flags: response3.data,
      loading: false
    });
  }

  handleDriverDetails = (name) => {
    const linkTo = "/driverDetails/" + name;
    history.push(linkTo);
  }


  getFlagCode = (nationality) => {
    let flag = this.state.flags.filter((x) => x.nationality === nationality);
    if (flag.length) {
      return flag[0].alpha_2_code;
    } else {
      if (nationality === "British") {
        return "GB";
      }
      if (nationality === "Dutch") {
        return "NL";
      }
      if (nationality === "UAE") {
        return "AE";
      }
    }
  }



  render() {
    if (this.state.loading) {
      return (
        <div>
          <Loader />
        </div>
      )
    }

    return (
      <div>
        <div className="main">
          <h1>DRIVERS CHAMPIONSHIP</h1>
          <table className="tab-container">
            <thead>
              <td colSpan={4}>Driver Championship Standings 2013</td>
            </thead>
            <tbody>
              {this.state.driverStandings.map((x) => (
                <tr key={x.position}>
                  <td> {x.position}</td>
                  <td onClick={() => this.handleDriverDetails(x.Driver.driverId)} className="flag-container cursor">
                    <Flag
                      country={this.getFlagCode(x.Driver.nationality)}
                      className="flag-icon"
                    />
                    {x.Driver.givenName} {x.Driver.familyName}
                  </td>
                  <td>{x.Constructors[0].name}</td>
                  <td>{x.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
