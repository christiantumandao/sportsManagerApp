import React, { Component } from 'react';
import EventTabs from './eventTabs';

//props: 
// displayHeaderData: {name, region, season}
// fixtures: data for EventTabs for each eventTab
// displayButton: boolean
// displayLoginStatus
// display registration
// handleLoginRegistrationClick
// deleteGame


class Display extends Component {
    render() { 
        return (
            /** of class flex-container-display */
            <React.Fragment>

                {/** Top header */}
                <div class="flex-item-display flex-display-header">
                    <div class="display-header-left">{this.props.displayHeader.topLeft}</div>
                    <div class="display-header-right">{this.props.displayHeader.topRight}</div>
                </div>
                {/**  Sub header*/}
                <div class="flex-item-display flex-display-season">
                    <div class="left-description">{ this.props.displayHeader.bottomLeft }</div>
                    <div class="right-description">{ this.props.displayHeader.bottomRight }</div>
                        
                </div>

                <div class="flex-item-display" id="flex-container-eventTabs"> 
                    <EventTabs 
                    fixtures = {this.props.fixtures}

                    // function references
                    addGame = {this.props.addGame}
                    deleteGame = {this.props.deleteGame}
                    handleLoginRegistrationClick = {this.props.handleLoginRegistrationClick}
                    handleLogin = {this.props.handleLogin}
                    handleRegistration = {this.props.handleRegistration}

                    displayType = {this.props.displayType}
                    //bools
                    findFutureEvents = { this.props.findFutureEvents }
                    displayAddButton = { this.props.displayAddButton }
                    displayDeleteButton = { this.props.displayDeleteButton }
                    displayScore = { this.props.displayScore }
                    handleTrackerinputClick = { this.props.handleTrackerinputClick }

                    // user info
                    userData = { this.props.userData }
                    gameCount = {this.props.gameCount}
                    isLoggedIn = {this.props.isLoggedIn }
                    watched = { this.props.watched }

                    />
                </div>
            </React.Fragment>
            
        );
    }
}
 
export default Display;