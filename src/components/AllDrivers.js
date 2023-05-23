import React from "react";
import axios from "axios";
import Loader from "./Loader";
import history from "../history";

export default class AllDrivers extends React.Component {
  state = {
    driverStandings: [],
    loading: true,
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
      loading: false,
    });
  };

  handleDriverDetails = (name) => {
    //console.log(name);
    const linkTo = "/drivers/" + name;
    history.push(linkTo);
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="kon-loader">
          <Loader />;
        </div>
      );
    }

    return (
      <div>
        <table>
          {this.state.driverStandings.map((x) => (
            <tbody>
              <tr>
                <td>
                  <h2 className="comments"> {x.position}</h2>
                </td>
                <td onClick={() => this.handleDriverDetails(x.Driver.driverId)}>
                  <h2 className="comments">
                    {x.Driver.givenName} {x.Driver.familyName}
                  </h2>
                </td>
                <td>
                  <h2 className="comments">{x.Constructors[0].name} </h2>
                </td>
                <td>
                  <h2 className="comments">{x.points} </h2>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}
