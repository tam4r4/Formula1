import React from "react";
import { NavLink } from 'react-router-dom';

export default class Breadcrumbs extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <NavLink to="/"><img src="/img/f1_logo.png" className="logo-icon" /></NavLink>
                
                <div className="breadcrumbs">
                    <NavLink exact to="/" activeClassName="breadcrumb-active" className="breadcrumb-not-active">Home</NavLink>
                    {this.props.routes.map(route =>
                        <NavLink
                            to={route.path}
                            key={route.path}
                            activeClassName="breadcrumb-active"
                            className="breadcrumb-not-active"
                        >
                            {route.title}
                        </NavLink>
                    )}
                </div>
            </div>
        );
    }
}