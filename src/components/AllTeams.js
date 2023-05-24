import React from "react";
import axios from "axios";
import Loader from "./Loader";
import history from "../history";

export default class AllTeams extends React.Component {
    state = {
        teamStandings: [],
        loading: true
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams = async () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const response = await axios.get(url);
        this.setState({
            teamStandings: response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
            loading: false
        });
    }

    handleTeamDetails = (name) => {
        console.log(name);
        const linkTo = "/details/" + name;
        history.push(linkTo);
    }

    render() {

        if (this.state.loading) {
            return <div className="kon-loader">
                <Loader />;
            </div>
        }

        return (
            <div >
                <table >
                    {this.state.teamStandings.map(x =>
                        <tbody>
                            <tr>
                                <td>
                                    <h2 className="comments"> {x.position}</h2>
                                </td>
                                <td onClick={() => this.handleCommentDetails(x.id)}>
                                    <h2 className="comments"> {x.Constructor.name}  </h2>
                                </td>
                                <td>
                                    <h2 className="comments">Details </h2>
                                </td>
                                <td>
                                    <h2 className="comments">{x.points} </h2>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        );
    }
}