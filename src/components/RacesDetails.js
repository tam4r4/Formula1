import React from "react";
import axios from "axios";
import Loader from "./Loader";
import Flag from "react-flagkit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import YearContext from "../context/YearContext";
import Breadcrumbs from "./Breadcrumbs";

export default class RacesDetails extends React.Component {
  state = {
    results: [],
    details: {},
    flags: [],
    qualifiers: [],
    loading: true
  };

  componentDidMount() {
    this.getAllRaces();
  }

  getAllRaces = async () => {
    const id = this.props.match.params.round;
    let year = this.context.year;

    const url = `http://ergast.com/api/f1/${year}/${id}/results.json`;
    const url2 = `http://ergast.com/api/f1/${year}/${id}/results/1.json`;
    const url3 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const url4 = `https://ergast.com/api/f1/${year}/${id}/qualifying.json`;

    const response = await axios.get(url);
    const response2 = await axios.get(url2);
    const response3 = await axios.get(url3);
    const response4 = await axios.get(url4);

    this.setState({
      results: response.data?.MRData?.RaceTable?.Races[0]?.Results,
      details: response2.data?.MRData?.RaceTable?.Races[0],
      flags: response3.data,
      qualifiers: response4.data?.MRData?.RaceTable?.Races[0]?.QualifyingResults,
      loading: false
    });
  }

  getBestTime = (raceQual) => {
    let qual = [raceQual.Q1, raceQual.Q2, raceQual.Q3];
    let newArray = qual.sort();
    return newArray[0];
  }

  getFlagCode = (nationality) => {
    let flag = this.state.flags.filter((x) => x.nationality === nationality);
    if (flag.length) {
      return flag[0].alpha_2_code;
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
  }

  getFlagCode2 = (nationality) => {
    let flag = this.state.flags.filter(
      (x) => x.en_short_name === nationality
    );
    if (flag.length) {
      return flag[0].alpha_2_code;
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
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    const routes =
      [
        {
          path: "/races",
          title: "Races"
        },
        {
          path: "",
          title: this.state.details.raceName
        }
      ];

    return (
      <div>
        <div>
          <Breadcrumbs routes={routes} />
        </div>

        <div className="main">
          <aside className="details race-details">
            <p>
              <Flag
                country={this.getFlagCode2(this.state.details?.Circuit?.Location?.country)}
                size={70}
                className="flag-icon"
              />
            </p>
            <p className="grand-prix-name">{this.state.details?.raceName}</p>
            <p>Country: {this.state.details?.Circuit?.Location?.country}</p>
            <p>Location: {this.state.details?.Circuit?.Location?.locality}</p>
            <p>Date: {this.state.details?.date}</p>
            <p>Full Report:
              <a href={this.state.details.url} target="_blank">
                <OpenInNewIcon className="openNewTab" />
              </a>
            </p>
          </aside>

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
                {this.state?.qualifiers?.map((raceQual, i) => (
                  <tr key={i}>
                    <td>{raceQual.position}</td>
                    <td className="flag-container">
                      <Flag
                        country={this.getFlagCode(raceQual?.Driver?.nationality)}
                        className="flag-icon"
                      />
                      {raceQual?.Driver?.givenName} {raceQual?.Driver?.familyName}
                    </td>
                    <td>{raceQual?.Constructor?.name}</td>
                    <td>{this.getBestTime(raceQual)}</td>
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
                {this.state.results.map((res, i) => (
                  <tr key={i}>
                    <td>{res.position}</td>
                    <td className="flag-container">
                      <Flag
                        country={this.getFlagCode(res?.Driver?.nationality)}
                        className="flag-icon"
                      />
                      {res?.Driver?.givenName} {res?.Driver?.familyName}
                    </td>
                    <td>{res.Constructor.name}</td>
                    <td>{res.Time ? res.Time.time : null}</td>
                    <td className={"position_" + res.position} > {res.points} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

RacesDetails.contextType = YearContext;