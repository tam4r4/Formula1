import React from "react";
import axios from "axios";
import history from "../history";
import Loader from "./Loader";
import Flag from "react-flagkit";
import YearContext from "../context/YearContext";
import Breadcrumbs from "./Breadcrumbs";

export default class AllRaces extends React.Component {
  state = {
    races: [],
    flags: [],
    loading: true,
  };

  componentDidMount() {
    this.getAllRaces();
  }

  getAllRaces = async () => {
    let year = this.context.year;
    const url = `https://ergast.com/api/f1/${year}/results/1.json`;
    const url2 =
      "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";

    const response = await axios.get(url);
    const response2 = await axios.get(url2);

    this.setState({
      races: response.data?.MRData?.RaceTable?.Races,
      flags: response2.data,
      loading: false,
    });
  };

  handleRaceDetails = (round) => {
    const linkTo = "/raceDetails/" + round;
    history.push(linkTo);
  };

  getFlagCode = (nationality) => {
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
      if (nationality === "Russia") {
        return "RU";
      }
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    const routes = [
      {
        path: "/races",
        title: "Races",
      },
    ];

    return (
      <div>
        <div>
          <Breadcrumbs routes={routes} />
        </div>

        <div className="main">
          <h1>RACE CALENDAR</h1>
          <table className="tab-container">
            <thead>
              <td colSpan={5}>Race Calendar {this.context.year} </td>
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
                  <td
                    onClick={() => this.handleRaceDetails(race?.round)}
                    className="flag-container cursor"
                  >
                   {this.getFlagCode(race?.Circuit?.Location?.country) != "AZ" ? <Flag country= {this.getFlagCode(race?.Circuit?.Location?.country)} className="flag-icon" /> : <img src="../img/azer400.png" alt="slika zastave Azerbejdzana" className="azer" /> }
                      
                    {race?.raceName}
                  </td>
                  <td>{race?.Circuit?.circuitName}</td>
                  <td>{race?.date}</td>
                  <td>{race?.Results[0]?.Driver?.familyName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

AllRaces.contextType = YearContext;
