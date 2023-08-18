import React from "react";
import Loader from "./Loader";
import axios from "axios";
import Flag from "react-flagkit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import YearContext from "../context/YearContext";
import Breadcrumbs from "./Breadcrumbs";

export default class TeamDetails extends React.Component {
  state = {
    someRaces: [],
    drivers: "",
    flags: [],
    country: "",
    details: {},
    loading: true
  };

  componentDidMount() {
    this.getTeamDetails();
  }

  getTeamDetails = async () => {
    const id = this.props.match.params.name;
    let year = this.context.year;

    const url = `https://ergast.com/api/f1/${year}/constructors/${id}/results.json`;
    const url2 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const url3 = `https://ergast.com/api/f1/${year}/constructors/results.json`;
    const url4 = `https://ergast.com/api/f1/${year}/constructors/${id}/constructorStandings.json`;

    const response = await axios.get(url);
    const response2 = await axios.get(url2);
    const response3 = await axios.get(url3);
    const response4 = await axios.get(url4);

    this.setState({
      someRaces: response.data?.MRData?.RaceTable?.Races,
      flags: response2.data,
      drivers: response.data?.MRData?.RaceTable?.Races[0]?.Results,
      country: response3.data,
      details: response4.data?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings[0],
      loading: false
    });
  }


  getFlagCode = (nationality) => {
    let flag = this.state?.flags?.filter(
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
      if (nationality === "Russia") {
        return "RU";
      }
    }
  }

  getFlagCode2 = (nationality) => {
    let flag = this.state?.flags?.filter(
      (x) => x.nationality === nationality
    );
    if (flag.length) {
      return flag[0].alpha_2_code;
    } else {
      if (nationality === "UK") {
        return "GB";
      }
      if (nationality === "British") {
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
      if (nationality === "Russia") {
        return "RU";
      }
    }
  }

  getTeamImageCode = (teamName) => {
    var x = teamName.toLowerCase();
    return "../img/" + x + ".png";
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Loader />
        </div>
      )
    }

    const routes =
      [
        {
          path: "/teams",
          title: "Teams"
        },
        {
          path: "",
          title: this.state.details.Constructor.name
        }
      ];

    return (
      <div className="bgImg">

        <Breadcrumbs routes={routes} />

        <div className="main">
          <aside className="details">
            <img
              src={this.getTeamImageCode(this.state?.details?.Constructor?.constructorId)}
              alt="Team picture"
              className="team-image"
            />
            <p>
              <Flag className="details-flag"
                country={this.getFlagCode2(this.state?.details?.Constructor?.nationality)}
              />
            </p>
            <p className="grand-prix-name">{this.state?.details?.Constructor?.name}
            </p>
            <p>Country: {this.state?.details?.Constructor?.nationality}</p>
            <p>Position: {this.state?.details?.position}</p>
            <p>Points: {this.state?.details?.points}</p>
            <p
              className="new-tab-cont">Biography:
              <a
                href={this.state?.details?.Constructor?.url}
                target="_blank">
                <OpenInNewIcon className="new-tab-icon" />
              </a>
            </p>
          </aside>

          <table className="tab-container">
            <thead>
              <tr>
                <td colSpan={5}>Formula 1 {this.context.year} Results</td>
              </tr>
              <tr>
                <th>Round</th>
                <th>Grand Prix</th>
                <th>{this.state?.drivers[0]?.Driver?.familyName}</th>
                <th>{this.state?.drivers[1]?.Driver?.familyName}</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody>
              {this.state?.someRaces?.map((x) => (
                <tr key={x?.round}>
                  <td>{x?.round}</td>
                  <td className="flag-container">
                    {this.getFlagCode(x?.Circuit?.Location?.country) != "AZ" ? <Flag country={this.getFlagCode(x?.Circuit?.Location?.country)} className="flag-icon" /> : <img src="../img/azer400.png" alt="flag of Azerbeidjan" className="azer flag-icon2" />}

                    {x?.raceName}
                  </td>
                  <td className={"position_" + x?.Results[0]?.position}>{x?.Results[0]?.position}</td>
                  <td className={"position_" + x?.Results[1]?.position}>{x?.Results[1]?.position}</td>
                  <td>
                    {parseInt(x?.Results[0]?.points) + parseInt(x?.Results[1]?.points)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

TeamDetails.contextType = YearContext;