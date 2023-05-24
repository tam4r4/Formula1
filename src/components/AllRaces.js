import React from "react";
import axios from "axios";

export default class AllRaces extends React.Component {
    state = {
        races: []
    };

    componentDidMount() {
        this.getAllRaces();
    }

    getAllRaces = async () => {
        const url = "https://ergast.com/api/f1/2013/results/1.json";
        const response = await axios.get(url);
        console.log(response.data.MRData.RaceTable.Races);
        this.setState({
            races: response.data.MRData.RaceTable.Races
        });
    }

    render() {
        return (
            <div>
                <h1>Race calendar</h1>
                <table>
                    <thead>
                        <tr>Race Calendar 2013</tr>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Circuit</th>
                            <th>Date</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.races.map(race =>
                            <tr key={race.round}>
                                <td>{race.round}</td>
                                <td>{race.raceName}</td>
                                <td>{race.Circuit.circuitName}</td>
                                <td>{race.date}</td>
                                <td>{race.Results[0].Driver.familyName}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
} 