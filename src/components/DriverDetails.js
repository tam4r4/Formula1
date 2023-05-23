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
    const id = this.props.match.params.id;
    const url = "https://ergast.com/api/f1/2013/driverStandings.json/&{id}";
    const response = await axios.get(url);
    this.setState({
      driverDetails: response.data,
      loading: false,
    });
  };
  render() {
    return (
      <div>
        <h1>Hello from Driver Details</h1>
      </div>
    );
  }
}
