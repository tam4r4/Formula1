import React from "react";
import axios from "axios";
import Loader from "./Loader";
import Flag from "react-flagkit";

export default class RacesDetails extends React.Component {
  state = { results: [], details: {}, flags: [], loading: true };

  componentDidMount() {
    this.getAllRaces();
  }

  getAllRaces = async () => {
    const id = this.props.match.params.round;
    //console.log(id);
    const url = `http://ergast.com/api/f1/2013/${id}/results.json`;
    const response = await axios.get(url);
    console.log(response.data.MRData.RaceTable.Races[0].Results);
    const url2 = `http://ergast.com/api/f1/2013/${id}/results/1.json`;
    const response2 = await axios.get(url2);
    console.log(response2.data.MRData.RaceTable.Races[0]);

    const url3 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response3 = await axios.get(url3);


    this.setState({
      results: response.data.MRData.RaceTable.Races[0].Results,
      details: response2.data.MRData.RaceTable.Races[0],
      flags: response3.data,
      loading: false,
    });
  };


  getFlagCode = (nationality) => {

    console.log("getFlagCode");

    let zastava = this.state.flags.filter(x =>
      (x.nationality === nationality));
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

  }


  render() {
    if (this.state.loading) {
      return (
        <div className="kon-loader">
          <Loader />
        </div>
      );
    }

    return (
      <div>
        <h2>{this.state.details.raceName}</h2>
        <p>Country: {this.state.details.Circuit.Location.country}</p>
        <p>Location: {this.state.details.Circuit.Location.locality}</p>
        <p>Date: {this.state.details.date}</p>
        <p>
          Full Report: <a href={this.state.details.url}>Link</a>
        </p>
        <div>
          <table className="tabela">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {this.state.results.map((res) => (
                <tr key={res.position}>
                  <td>{res.position}</td>
                  <td>  <Flag country={this.getFlagCode(res.Driver.nationality)} />
                    {res.Driver.givenName} {res.Driver.familyName}
                  </td>
                  <td>{res.Constructor.name}</td>
                  <td>{res.Time ? res.Time.time : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    
  }
}
