import React from "react";
import Loader from "./Loader";
import axios from "axios";
import Flag from "react-flagkit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default class TeamDetails extends React.Component {
  state = {
    someRaces: [],
    drivers: "",
    flags: [],
    country: "",
    loading: true,
    details: {}
  };

  componentDidMount() {
    this.getTeamDetails();
  }

  getTeamDetails = async () => {

    const id = this.props.match.params.name;
    const url = `http://ergast.com/api/f1/2013/constructors/${id}/results.json`;
    const url2 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const url3 = `http://ergast.com/api/f1/2013/constructors/results.json`;
    const url4 = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`;

    const response = await axios.get(url);
    const response2 = await axios.get(url2);
    const response3 = await axios.get(url3);
    const response4 = await axios.get(url4);
    
    console.log(
      response4.data.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings[0]
    );

    this.setState({
      someRaces: response.data.MRData.RaceTable.Races,
      flags: response2.data,
      drivers: response.data.MRData.RaceTable.Races[0].Results,
      country: response3.data,
      loading: false,
      details:
        response4.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings[0],
    });
  };

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
  };
 
  getFlagCode2 = (nationality) => {

    let flag = this.state.flags.filter(
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
    }
  };

  getTeamImageCode = (teamName) => {
    console.log("getTeamImageCode");

    console.log("teamName", teamName);
      var x = teamName.toLowerCase();
      return "../img/" + x + ".png";
  
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="kon-loader">
          <Loader />
        </div>
      )
    }

    return (
      <div className="main">
        <dl className="details">
          <img src={this.getTeamImageCode(this.state.details.Constructor.constructorId)} alt="Team picture" className="team-image" />
          <p><Flag country={this.getFlagCode2(this.state.details.Constructor.nationality)} /></p>
          <p>{this.state.details.Constructor.name}</p>
          <p>Country: {this.state.details.Constructor.nationality}</p>
          <p>Position: {this.state.details.position}</p>
          <p>Points: {this.state.details.points}</p>
          <p>Biography:
            <a href={this.state.details.Constructor.url} target="_blank">
              <OpenInNewIcon className="openNewTab" />
            </a>
          </p>
        </dl>

        <table className="tab-container details-tab-container">
          <thead>
            <tr>
              <td colSpan={5}>Formula 1 2013 Results</td>
            </tr>
            <tr>
              <th>Round</th>
              <th>Grand Prix</th>
              <th>{this.state.drivers[0].Driver.familyName}</th>
              <th>{this.state.drivers[1].Driver.familyName}</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody>
            {this.state.someRaces.map((x) => (
              <tr key={x.round}>
                <td>{x.round}</td>
                <td>
                  <Flag country={this.getFlagCode(x.Circuit.Location.country)} />
                  {x.raceName}
                </td>
                <td>{x.Results[0].position}</td>
                <td>{x.Results[1].position}</td>
                <td>
                  {parseInt(x.Results[0].points) + parseInt(x.Results[1].points)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
