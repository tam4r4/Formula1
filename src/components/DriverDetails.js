import React from "react";
import axios from "axios";
import Loader from "./Loader";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Flag from "react-flagkit";

export default class DriverDetails extends React.Component {
  state = {
    driverDetails: {},
    races: [],
    flags: [],
    loading: true,
  };

  componentDidMount() {
    this.getDriverDetails();
  }

  getDriverDetails = async () => {
    const id = this.props.match.params.name;
    const url = `https://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
    console.log(url);
    const response = await axios.get(url);
    console.log(
      response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
    );

    const url2 = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`;
    const response2 = await axios.get(url2);
    console.log(response2.data.MRData.RaceTable.Races);

    const url3 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response3 = await axios.get(url3);

    this.setState({
      driverDetails:
        response.data.MRData.StandingsTable.StandingsLists[0]
          .DriverStandings[0],
      races: response2.data.MRData.RaceTable.Races,
      flags: response3.data,
      loading: false,
    });
  };


  getFlagCode = (nationality) => {
    console.log("getFlagCode");

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

  };


  getFlagCode2 = (nationality) => {
    console.log("getFlagCode");

    let zastava = this.state.flags.filter(
      (x) => x.nationality === nationality
    );
    if (zastava.length) {
      return zastava[0].alpha_2_code;
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
    console.log("getImageCode");

    console.log("lastName", lastName);

      //    src="../img/hamilton.jpg"

      var x = lastName.toLowerCase();

      if(x === "räikkönen"){
        x = "raikkonen";
      }
      if(x === "hülkenberg"){
        x = "hulkenberg";
      }
      if(x === "pérez"){
        x = "perez";
      }
      if(x === "gutiérrez"){
        x = "gutierrez";
      }
      if(x === "van der garde"){
        x = "garde";
      }
      if(x === "di resta"){
        x = "resta";
      }


      console.log("prezimeSaMalimSlovom:", x);

      return "../img/" + x + ".jpg";
  
  }


  render() {
    if (this.state.loading) {
      return (
        <div className="kon-loader">
          <Loader />;
        </div>
      );
    }
    console.log(this.state.driverDetails);
    return (
      <div className="wrapper">
        {/* description list */}
        <dl className="details">
          <img src={this.getImageCode(this.state.driverDetails.Driver.familyName)} alt="slika vozaca" className="img-drivers" />              
          <p> <Flag country={this.getFlagCode2(this.state.driverDetails.Driver.nationality)} /> </p>

          <p>
            {this.state.driverDetails.Driver?.givenName}<br></br>
            {this.state.driverDetails.Driver?.familyName}
          </p>
          <p>Country: {this.state.driverDetails.Driver?.nationality}</p>
          <p>Team: {this.state.driverDetails.Constructors[0].name}</p>
          <p>Birth: {this.state.driverDetails.Driver?.dateOfBirth}</p>
          <p>
            Biography:
            <a href={this.state.driverDetails.Driver?.url}>
              <OpenInNewIcon />
            </a>
          </p>
        </dl>

        <table className="tab-container">
          <thead>
            <tr>Formula 1 2013 Results</tr>
            <tr>
              <th>Round</th>
              <th>Grand Prix</th>
              <th>Team</th>
              <th>Grid</th>
              <th>Race</th>
            </tr>
          </thead>

          <tbody>
            {this.state.races.map((d) => (
              <tr key={d.round}>
                <td>{d.round}</td>
                <td> <Flag country={this.getFlagCode(d.Circuit.Location.country)} />{d.raceName}</td>
                <td> {d.Results[0].Constructor.name}</td>
                <td>{d.Results[0].grid}</td>
                <td>{d.Results[0].position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}




