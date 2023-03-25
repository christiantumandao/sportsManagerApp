import React, { Component, useState } from 'react';
import EventTab from './eventTab';
import '../App.css';
/*
PROPS:
fixtures 

addGame}
deleteGame 
handleLoginRegistrationClick 
handleLogin 
handleRegistration 

displayType 

userData
gameCount
sLoggedIn 
*/
class EventTabs extends Component {
    constructor(props) {
        super(props);
        this.keyCount = 0;
        this.getKey = this.getKey.bind(this);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
        }
    }
    
    render() { 
        return (
            <React.Fragment>

                { //eventTab
                    this.props.fixtures.map( event => (
                        <div key={ this.getKey() } class={ this.getClasses("eventTab")}>
                            <EventTab 
                            id = {event.id}
                            home ={event.home}
                            away ={event.away}
                            date = {event.date}
                            timezone ={event.timezone}
                            location = {event.location}
                            stadium = {event.stadium}
                            homeImg = {event.homeImg}
                            awayImg = {event.awayImg}
                            time = {event.time}
                            homeScore = {event.homeScore}
                            awayScore = {event.awayScore}

                            addGame = {this.props.addGame}
                            deleteGame = {this.props.deleteGame}

                            isLoggedIn = {this.props.isLoggedIn}
                            displayAddButton={this.props.displayAddButton}
                            displayDeleteButton= { this.props.displayDeleteButton }
                            displayScore = { this.props.displayScore}
                            findFutureEvents = { this.props.findFutureEvents }
                            displayType = { this.props.displayType }

                            />
                        </div>

                    ))
                }
 

                {/**display login/registration message */}
                <div class={this.getClasses("login-message-gui")}>
                    <h1>You are not logged in!</h1>
                    <div class="login-buttons">
                        <button onClick = { ()=> this.props.handleLoginRegistrationClick("login") }>
                            <p>Log in</p>
                        </button>
                        <button onClick ={ () => this.props.handleLoginRegistrationClick("registration") }>
                            <p>Register</p>
                        </button>
                    </div>     
                </div>

                {/**login-gui */}
                <div class={this.getClasses("login-gui")}>
                <button class="login-register-back-button" onClick = { () => this.props.handleLoginRegistrationClick("back")}>Back</button>
                <form onSubmit = { this.handleLoginSubmit} >
                    <label>
                        Username:
                    </label>
                        <div class="input-group">
                            <input type="text" 
                                        id="username"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        class="form-control rounded" 
                                        placeholder="Username"  />
                        </div>
                    <label>
                        Password: 
                    </label>
                        <div class="input-group">
                            <input type="text" 
                                        id="password"
                                        name="password"
                                        value ={this.state.password}
                                        onChange = {this.handleChange}
                                        class="form-control rounded" 
                                        placeholder="Password" />
                        </div>
                        <input type="submit" value="Submit" class="submit-btn"></input>
                </form>
                    


                </div>

                {/** registration-gui */}
                <div class= {this.getClasses("registration-gui")}>

                    <button class="login-register-back-button" onClick = { () => this.props.handleLoginRegistrationClick("back")}>Back</button>
                
                    <form onSubmit = { this.handleRegistrationSubmit} >
                        <label>
                            Username:
                        </label>
                            <div class="input-group">
                                <input type="text" 
                                            id="username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                            class="form-control rounded" 
                                            placeholder="Username"  />
                            </div>
                        <label>
                            Password: 
                        </label>
                            <div class="input-group">
                                <input type="text" 
                                            id="password"
                                            name="password"
                                            value ={this.state.password}
                                            onChange = {this.handleChange}
                                            class="form-control rounded" 
                                            placeholder="Password" />
                            </div>
                            <label>
                            FirstName: 
                        </label>
                            <div class="input-group">
                                <input type="text" 
                                            id="firstName"
                                            name="firstName"
                                            value ={this.state.firstName}
                                            onChange = {this.handleChange}
                                            class="form-control rounded" 
                                            placeholder="First Name" />
                            </div>
                            <label>
                            Last Name: 
                        </label>
                            <div class="input-group input-group-last">
                                <input type="text" 
                                            id="lastName"
                                            name="lastName"
                                            value ={this.state.lastName}
                                            onChange = {this.handleChange}
                                            class="form-control rounded" 
                                            placeholder="Last Name" />
                            </div>
                            <input type="submit" value="Submit" class="submit-btn"></input>
                    </form>

                </div>

                {/** profile info display */}
                <div class= { this.getClasses("profile-info")}>

                    <div class="profile-info-item">
                        <div class="profile-settings">
                            <h2>Profile Settings</h2>
                            <div>Username: {this.props.userData.username}</div>
                            <div>First Name: {this.props.userData.firstName}</div>
                            <div>Last Name: {this.props.userData.lastName}</div>
                        </div>
                    </div>
                    <div class="profile-info-item">
                        <h2>Profile Statistics</h2>
                        <div class="profile-statistics">
                            <div class="games-statistics profile-statistics-item">
                                <div>Games Added: { this.props.gameCount}</div>
                            </div>
                            <div class="watched-statistics profile-statistics-item">
                                <div>Total minutes watched</div>
                                <div>Total minutes not watched</div>
                            </div>
                        </div>

                    </div>
                    
                </div>

                {/** website info display */}
                <div class= { this.getClasses("info")}>

                        <div class="app-summary">
                            <h3>Sports Events Manager</h3>
                            <p>Is a web application that searches for future and past soccer/football games.</p>
                            <p>Given a user registers and logs in, will offer to schedule games and track watched portion(s) of games.</p>
                        </div>
                        <h3>Leagues offered:</h3>
                        <div class="leagues-offered">
                                <ul class="left-list">
                                    <li>Premier League</li>
                                    <li>Champions League</li>
                                    <li>Bundesliga</li>
                                </ul>
                                <ul class="right-list">
                                    <li>Serie A</li>
                                    <li>La Liga</li>
                                </ul>
                        </div>
                        <div class="tech-stack-summary">
                            <h3>Tech stack:</h3>
                            <ul>
                                <li>Frontend: 
                                    <ul>
                                        <li>ReactJS</li>
                                        <li>Axios</li>
                                    </ul>
                                </li>
                                <li>Backend:
                                    <ul>
                                        <li>Java Spring Boot MVC</li>
                                        <li>ORM: Spring Data JPA</li>
                                    </ul>
                                </li>
                                <li>Database/Cloud 
                                    <ul>
                                        <li>AWS RDS (mySQL engine)</li>
                                        <li>AWS Elastic Beanstalk</li>
                                    </ul>
                                </li>
                                
                            </ul>
                        </div>
                        <div>
                    </div>

                </div>
            </React.Fragment>
        );
    }

    getKey() {
        return this.keyCount++;
    }

    getClasses(divType) {


        if (this.props.displayType === "find-games" && divType==="eventTab") return divType;
        if (this.props.displayType === "your-games" && divType==="eventTab") return divType;
        if (divType !== this.props.displayType) return "display-none";
        else return divType;
      
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState( { [name] : value} );
    }

    handleLoginSubmit = (event) => {
        event.preventDefault();
        let returnVal = {username: this.state.username, password: this.state.password};
        this.props.handleLogin(returnVal);
    }

    handleRegistrationSubmit = (event) => {
        event.preventDefault();
        let returnVal = {username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName};
        this.props.handleRegistration(returnVal);
    }


}
 
export default EventTabs;