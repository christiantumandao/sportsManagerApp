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

                <div class="flex-item-display flex-display-header">
                    <div class="display-header-left">{this.props.displayHeaderData.name}</div>
                    <div class="display-header-right">{this.props.displayHeaderData.region}</div>
                </div>

                <div class="flex-item-display flex-display-season">
                    <div class="left-description">{ this.props.displayHeaderData.subHeader }</div>
                    <div class="right-description">{ this.props.displayHeaderData.season }</div>
                        
                </div>

                <div class="flex-item-display" id="flex-container-eventTabs"> 
                    <EventTabs 
                    fixtures = {this.props.fixtures}

                    addGame = {this.props.addGame}
                    deleteGame = {this.props.deleteGame}
                    displayAddButton = {this.props.displayAddButton}
                    displayDeleteButton= { this.props.displayDeleteButton }
                    displayScore = { this.props.displayScore}

                    displayLoginStatus = {this.props.displayLoginStatus}
                    displayLogin = {this.props.displayLogin}
                    displayRegistration = {this.props.displayRegistration}
                    handleLoginRegistrationClick = {this.props.handleLoginRegistrationClick}
                    handleLogin = {this.props.handleLogin}
                    handleRegistration = {this.props.handleRegistration}

                    displayInfo = { this.props.displayInfo }
                    displayProfileInfo = { this.props.displayProfileInfo }
                          userData = { this.props.userData }
                          gameCount = {this.props.gameCount}

                    />
                </div>
            </React.Fragment>
            
        );
    }
}
 
export default Display;