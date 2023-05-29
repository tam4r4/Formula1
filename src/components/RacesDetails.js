import React from "react";
import axios from "axios";
import Loader from "./Loader";
import Flag from "react-flagkit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default class RacesDetails extends React.Component {
  state = {
    results: [],
    details: {},
    flags: [],
    loading: true,
    qualifiers: [],
  };

  componentDidMount() {
    this.getAllRaces();
  }

  getAllRaces = async () => {
    const id = this.props.match.params.round;

    const url = `http://ergast.com/api/f1/2013/${id}/results.json`;
    const url2 = `http://ergast.com/api/f1/2013/${id}/results/1.json`;
    const url3 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const url4 = `https://ergast.com/api/f1/2013/${id}/qualifying.json`;

    const response = await axios.get(url);
    const response2 = await axios.get(url2);
    const response3 = await axios.get(url3);
    const response4 = await axios.get(url4);
   

    this.setState({
      results: response.data.MRData.RaceTable.Races[0].Results,
      details: response2.data.MRData.RaceTable.Races[0],
      flags: response3.data,
      loading: false,
      qualifiers: response4.data.MRData.RaceTable.Races[0].QualifyingResults,
    });
    console.log(response4.data.MRData.RaceTable.Races[0].QualifyingResults);
  };

  TheBestTime = (raceQual) => {
    let qual = [raceQual.Q1, raceQual.Q2, raceQual.Q3];

    let newArray = qual.sort();
    return newArray[0];
  };

  getFlagCode = (nationality) => {
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

  getFlagCode2 = (nationality) => {
    console.log("getFlagCode");

    let zastava = this.state.flags.filter(
      (x) => x.en_short_name === nationality
    );
    if (zastava.length) {
      return zastava[0].alpha_2_code;
    } else {
      if (nationality === "British") {
        return "GB";
      }
      if (nationality === "UK") {
        return "GB";
      }
      if (nationality === "Korea") {
        return "KR";
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
      <div className="main">
        <dl className="details">
          <p>
            {" "}
            <Flag
              country={this.getFlagCode2(
                this.state.details.Circuit.Location.country
              )}
              size={70}
            />{" "}
          </p>
          <p>{this.state.details.raceName}</p>
          <p>Country: {this.state.details.Circuit.Location.country}</p>
          <p>Location: {this.state.details.Circuit.Location.locality}</p>
          <p>Date: {this.state.details.date}</p>
          <p>
            Full Report:{" "}
            <a href={this.state.details.url} target="_blank">
              <OpenInNewIcon className="openNewTab" />
            </a>
          </p>
        </dl>

        <div>
          <table className="tab-container qualify-tab-container">
            <thead>
              <td colSpan={4}>Qualifying Results</td>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Best Time</th>
              </tr>
            </thead>

            <tbody>
              {this.state.qualifiers.map((raceQual) => (
                <tr key={raceQual.position}>
                  <td>{raceQual.position}</td>
                  <td className="flag-container">
                    <Flag
                      country={this.getFlagCode(raceQual.Driver.nationality)}
                    />{" "}
                    {raceQual.Driver.givenName} {raceQual.Driver.familyName}
                  </td>
                  <td>{raceQual.Constructor.name}</td>
                  <td>{this.TheBestTime(raceQual)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <table className="tab-container results-tab-container">
            <thead>
              <td colSpan={5}>Driver Results</td>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Result</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody>
              {this.state.results.map((res) => (
                <tr key={res.position}>
                  <td>{res.position}</td>
                  <td className="flag-container">
                    <Flag country={this.getFlagCode(res.Driver.nationality)} />
                    {res.Driver.givenName} {res.Driver.familyName}
                  </td>
                  <td>{res.Constructor.name}</td>
                  <td>{res.Time ? res.Time.time : null}</td>
                  <td>{res.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
