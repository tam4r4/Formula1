import React from "react";
import axios from "axios";
import Loader from "./Loader";

export default class DriverDetails extends React.Component {
  state = {
    driverDetails: {},
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
    this.setState({
      driverDetails:
        response.data.MRData.StandingsTable.StandingsLists[0]
          .DriverStandings[0],

      loading: false,
    });
    //console.log(this.state.driverDetails.Driver.driverId);
  };
  render() {
    return (
      <div>
        <p>Name:{this.state.driverDetails.Driver?.givenName}</p>
        <p>Family Name:{this.state.driverDetails.Driver?.familyName}</p>
        <p>Country:{this.state.driverDetails.Driver?.nationality}</p>
        <p>Team:{this.state.driverDetails.Constructors?.name}</p>
        <p>Birth:{this.state.driverDetails.Driver?.dateOfBirth}</p>
        <p>Biography:{this.state.driverDetails.Driver?.url}</p>
      </div>
    );
  }
}
