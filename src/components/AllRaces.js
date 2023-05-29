import React from "react";
import axios from "axios";
import history from "../history";
import RacesDetails from "./RacesDetails";
import Flag from "react-flagkit";

export default class AllRaces extends React.Component {
  state = {
    races: [],
    flags: []
  };

  componentDidMount() {
    this.getAllRaces();
  }

  getAllRaces = async () => {
    const url = "https://ergast.com/api/f1/2013/results/1.json";
    const response = await axios.get(url);
    console.log(response.data.MRData.RaceTable.Races);
    const url2 =
      "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response2 = await axios.get(url2);
    this.setState({
      races: response.data.MRData.RaceTable.Races,
      flags: response2.data,
    });
  };

  handleRaceDetails = (round) => {
    const linkTo = "/raceDetails/" + round;
    history.push(linkTo);
  };

  getFlagCode = (nationality) => {
    console.log("getFlagCode");

    //  console.log(country);

    let zastava = this.state.flags.filter(
      (x) => x.en_short_name === nationality
    );
    if (zastava.length) {
      return zastava[0].alpha_2_code;
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
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="kon-loader">
          <Loader />;
        </div>
      )
    }

    return (
      <div className="main">
        <h1>Race calendar</h1>
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
                <td onClick={() => this.handleRaceDetails(race.round)} className="flag-container">
                  <Flag
                    country={this.getFlagCode(race.Circuit.Location.country)}
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
