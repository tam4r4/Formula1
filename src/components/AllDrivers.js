import React from "react";

import axios from "axios";

import Loader from "./Loader";

import history from "../history";


export default class CommentsApp extends React.Component {

    state = {
        driverStandings:[] ,
        loading: true
        // drivers: {},
        // constructors: {},
        // points: {}

    }

 

    


    componentDidMount() {

        this.getDrivers();
    }


    getDrivers = async () => {

        const url = "https://ergast.com/api/f1/2013/driverStandings.json";

        const response = await axios.get(url);
        console.log("response",response);

        let podaci = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
        console.log("pozicija", podaci)

        let podaci2 = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver;

        let podaci3 = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0];

        let podaci4 = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];

        let podaci5 = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        
        console.log(podaci2);
        this.setState({
            // pozicija: podaci,
            // drivers: podaci2,
            // constructors: podaci3,
            // points: podaci4,
            driverStandings: podaci5,
            loading: false






        });

    }


    handleDriverDetails = (name) => {

                console.log(name);

                // details/2

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
                    {this.state.driverStandings.map(x =>
                         <tbody>
                       
                         <tr>
                             <td>
                                <h2 className="comments"> {x.position}</h2>
                             </td>
                             <td  onClick={() => this.handleCommentDetails(x.id)}>
                         <h2 className="comments"> {x.Driver.givenName} {x.Driver.familyName} </h2>
                         </td>
                         <td>
                         <h2 className="comments">{x.Constructors[0].name} </h2>
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


// onClick={() => this.handleCommentDetails(x.id)}