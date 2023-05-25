import React from "react";
import axios from "axios";
import Loader from "./Loader";

export default class DriverDetails extends React.Component {
  state = {
    driverDetails: {},
    races: [],
    loading: true,
  };

  componentDidMount() {
    this.getDriverDetails();
  }

  getDriverDetails = async () => {
    const id = this.props.match.params.name;
    const url = `https://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
    console.log(url);
    const response = await axios.get(url);
    console.log(
      response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
    );

    const url2 = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`;
    const response2 = await axios.get(url2);
    console.log(response2.data.MRData.RaceTable.Races);

    this.setState({
      driverDetails:
        response.data.MRData.StandingsTable.StandingsLists[0]
          .DriverStandings[0],
      races: response2.data.MRData.RaceTable.Races,

      loading: false,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="kon-loader">
          <Loader />;
        </div>
      );
    }
    console.log(this.state.driverDetails);
    return (
      <div>
        <p>Name:{this.state.driverDetails.Driver?.givenName}</p>
        <p>Family Name:{this.state.driverDetails.Driver?.familyName}</p>
        <p>Country:{this.state.driverDetails.Driver?.nationality}</p>
        <p>Team:{this.state.driverDetails.Constructors[0].name}</p>
        <p>Birth:{this.state.driverDetails.Driver?.dateOfBirth}</p>
        <p>
          <a href={this.state.driverDetails.Driver?.url}>Biograpfy</a>
        </p>
        <div>
          <table className="tab-container">

            <thead>
              <tr>Formula 1 2013 Results</tr>
              <tr>
                <th>Round</th>
                <th>Grand Prix</th>
                <th>Team</th>
                <th>Grid</th>
                <th>Race</th>
              </tr>
            </thead>

            <tbody>
              {this.state.races.map((d) => (
                <tr key={d.round}>
                  <td>{d.round}</td>
                  <td>{d.raceName}</td>
                  <td>{d.Results[0].Constructor.name}</td>
                  <td>{d.Results[0].grid}</td>
                  <td>{d.Results[0].position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
