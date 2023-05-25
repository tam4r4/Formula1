import React from "react";
import axios from "axios";

export default class RacesDetails extends React.Component {
  state = { results: [] };

  componentDidMount() {
    this.getAllRaces();
  }

  getAllRaces = async () => {
    const id = this.props.match.params.round;
    //console.log(id);
    const url = `http://ergast.com/api/f1/2013/${id}/results.json`;
    const response = await axios.get(url);
    console.log(response.data.MRData.RaceTable.Races[0].Results);
    this.setState({
      results: response.data.MRData.RaceTable.Races[0].Results,
    });
  };

  render() {
    return (
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
                <td>{res.Driver.familyName}</td>
                <td>{res.Constructor.name}</td>
                <td>{res.Time.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
