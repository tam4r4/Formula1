import React from "react";
import axios from "axios";
import history from "../history";
import Loader from "./Loader";
import Flag from "react-flagkit";

export default class AllRaces extends React.Component {
  state = {
    races: [],
    flags: [],
    loading: true
  }

  componentDidMount() {
    this.getAllRaces();
  }

  getAllRaces = async () => {
    // const url = "https://ergast.com/api/f1/2013/results/1.json";
    const url = "https://raw.githubusercontent.com/nkezic/f1/main/AllRaces";
    const url2 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";

    const response = await axios.get(url);
    const response2 = await axios.get(url2);

    this.setState({
      races: response.data.MRData.RaceTable.Races,
      flags: response2.data,
      loading: false
    });
  }

  handleRaceDetails = (round) => {
    const linkTo = "/raceDetails/" + round;
    history.push(linkTo);
  }

  getFlagCode = (nationality) => {
    console.log("getFlagCode");

    let flag = this.state.flags.filter(
      (x) => x.en_short_name === nationality
    );
    if (flag.length) {
      return flag[0].alpha_2_code;
    } else {
      if (nationality === "UK") {
        return "GB";
      }
      if (nationality === "Korea") {
        return "KR";
      }
      if (nationality === "UAE") {
        return "AE";
      }
    }
    //  return zastava[0].alpha_2_code;
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
      <div className="main">
        <h1>RACE CALENDAR</h1>
        <table className="tab-container">
          <thead>
            <td colSpan={5}>Race Calendar 2013</td>
            <tr>
              <th>Round</th>
              <th>Grand Prix</th>
              <th>Circuit</th>
              <th>Date</th>
              <th>Winner</th>
            </tr>
          </thead>

          <tbody>
            {this.state.races.map((race) => (
              <tr key={race.round}>
                <td>{race.round}</td>
                <td onClick={() => this.handleRaceDetails(race.round)} className="flag-container cursor">
                  <Flag
                    country={this.getFlagCode(race.Circuit.Location.country)}
                    className="flag-icon"
                  />
                  {race.raceName}
                </td>
                <td>{race.Circuit.circuitName}</td>
                <td>{race.date}</td>
                <td>{race.Results[0].Driver.familyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
