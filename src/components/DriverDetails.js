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
    const response = await axios.get(url);
    console.log(
      response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
    );
    console.log(this.state.driverDetails.Driver.driverId);
    this.setState({
      driverDetails:
        response.data.MRData.StandingsTable.StandingsLists[0]
          .DriverStandings[0],

      //loading: false
    });
  };
  render() {
    return (
      <div>
        <p>Name:</p>
        <p>Country:</p>
        <p>Team:</p>
        <p>Birth</p>
        <p>Biography</p>
      </div>
    );
  }
}
