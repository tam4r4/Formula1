import axios from "axios";
import React from "react";
//import Loader from "./Loader";

export default class AllDrivers extends React.Component {
  state = {
    drivers: [],
    // loading: true
  };

  componentDidMount() {
    this.getDrivers();
  }

  getDrivers = async () => {
    const url = "https://ergast.com/api/f1/2013/driverStandings.json";

    const response = await axios.get(url);
    let podaci =
      response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
        .Driver;
    console.log(podaci);
    this.setState({
      drivers: podaci,
      //  loading: false
    });
  };

  render() {
    return (
      <div>
        {this.state.drivers.map((x) => (
          <div>
            <p> Nesto:</p>
          </div>
        ))}
      </div>
    );
  }
}
