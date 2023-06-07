import React from "react";
import { Link } from 'react-router-dom';

export default class Breadcrumbs extends React.Component {

    render() {
        return (
            <div className="breadcrumbs">
                <Link to="/">Home</Link>
                {this.props.routes.map(route =>
                    <Link to={route.path} key={route.path}>{route.title}</Link>
                )}  
            </div>
        );
    }
}