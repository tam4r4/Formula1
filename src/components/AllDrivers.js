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
    const response = await axios.get(url);
    console.log(
      response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    );

    const url3 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response3 = await axios.get(url3);

    this.setState({
      driverStandings: response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
      flags: response3.data,
      loading: false
    });
  }

  handleDriverDetails = (name) => {
    //console.log(name);
    const linkTo = "/drivers/" + name;
    history.push(linkTo);
  };


  getFlagCode = (nationality) => {           //   prepisano iz RaceDetails
    console.log("getFlagCode");

    let zastava = this.state.flags.filter((x) => x.nationality === nationality);
    if (zastava.length) {
      return zastava[0].alpha_2_code;
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
      <div className="wrapper">
        <h1>Drivers Championship</h1>
        <table className="tab-container">
          <thead>
            <tr>Driver Championship Standings 2013</tr>
          </thead>
          <tbody>
            {this.state.driverStandings.map((x) => (
              <tr>
                <td> {x.position}</td>
                <td onClick={() => this.handleDriverDetails(x.Driver.driverId)}> <Flag country={this.getFlagCode(x.Driver.nationality)} />
                  {x.Driver.givenName} {x.Driver.familyName}
                </td>
                <td>{x.Constructors[0].name}</td>
                <td>{x.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
