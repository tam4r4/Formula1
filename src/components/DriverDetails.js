import React from "react";
import axios from "axios";
import Loader from "./Loader";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Flag from "react-flagkit";
import YearContext from "../context/YearContext";

export default class DriverDetails extends React.Component {
  state = {
    driverDetails: {},
    races: [],
    flags: [],
    loading: true
  };

  componentDidMount() {
    this.getDriverDetails();
  }

  getDriverDetails = async () => {
    const id = this.props.match.params.name;
    const year = this.context.year;

    const url = `https://ergast.com/api/f1/${year}/drivers/${id}/driverStandings.json`;
    const url2 = `http://ergast.com/api/f1/${year}/drivers/${id}/results.json`;
    const url3 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";

    const response = await axios.get(url);
    const response2 = await axios.get(url2);
    const response3 = await axios.get(url3);


    this.setState({
      driverDetails: response.data.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings[0],
      races: response2.data?.MRData?.RaceTable?.Races,
      flags: response3.data,
      loading: false,
    });
  };


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

  };


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
      if (nationality === "Dutch") {
        return "NL";
      }

      if (nationality === "Korea") {
        return "KR";
      }
      if (nationality === "UAE") {
        return "AE";
      }
    }

  };


  getImageCode = (lastName) => {

    var x = lastName.toLowerCase();
    if (x === "räikkönen") {
      x = "raikkonen";
    }
    if (x === "hülkenberg") {
      x = "hulkenberg";
    }
    if (x === "pérez") {
      x = "perez";
    }
    if (x === "gutiérrez") {
      x = "gutierrez";
    }
    if (x === "van der garde") {
      x = "garde";
    }
    if (x === "di resta") {
      x = "resta";
    }

    return "../img/" + x + ".jpg";

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
        <aside className="details">
          <img src={this.getImageCode(this.state?.driverDetails?.Driver?.familyName)} alt="driver picture" className="img-drivers" />
          <p> <Flag country={this.getFlagCode2(this.state?.driverDetails?.Driver?.nationality)} /> </p>

          <p className="details-name">
            {this.state?.driverDetails?.Driver?.givenName}<br></br>
            {this.state?.driverDetails.Driver?.familyName}
          </p>
          <p>Country: {this.state?.driverDetails?.Driver?.nationality}</p>
          <p>Team: {this.state?.driverDetails?.Constructors[0]?.name}</p>
          <p>Birth: {this.state?.driverDetails?.Driver?.dateOfBirth}</p>
          <p>
            Biography:
            <a href={this.state?.driverDetails?.Driver?.url} target="_blank" >
              <OpenInNewIcon className="openNewTab" />
            </a>
          </p>
        </aside>

        <table className="tab-container details-tab-container">
          <thead>
            <td colSpan={5}>Formula 1 {this.context.year} Results</td>
            <tr>
              <th>Round</th>
              <th>Grand Prix</th>
              <th>Team</th>
              <th>Grid</th>
              <th>Race</th>
            </tr>
          </thead>

          <tbody>
            {this.state?.races?.map((d) => (
              <tr key={d?.round}>
                <td>{d?.round}</td>
                <td className="flag-container">
                {this.getFlagCode(d?.Circuit?.Location?.country) != "AZ" ? <Flag country={this.getFlagCode(d?.Circuit?.Location?.country)} /> : <img src="../img/azer400.png" alt="slika zastave Azerbejdzana" className="azer" /> }
                  {d?.raceName}
                </td>
                <td> {d?.Results[0]?.Constructor?.name}</td>
                <td>{d.Results[0].grid}</td>
                <td className={"position_" + d?.Results[0]?.position} > {d?.Results[0]?.position} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

DriverDetails.contextType = YearContext;