import React, { Component } from 'react';

//props: 
// key (id)
//  id
// home
//  away
//  date
//time
//  timezone
//  location
//  stadium    
//home img
//away img  
// add game ( function reference )
// displayAddButton
// displayDeleteButton

class EventTab extends Component {
    //in class eventTab
    render() { 
        return (
            <React.Fragment>
                    <div class="match-up flex-item-eventTab">
                        <div>
                            <img src={this.props.homeImg} class="home-img"/>
                            {this.props.home}
                        </div>
                         <div>vs</div>  
                         <div>
                            <img src={this.props.awayImg} class="away-img"></img>
                        {this.props.away}
                            
                         </div>
                        
                        
                    </div>
                    <div class={this.getClasses("addButton")}>
                        <button class='flex-item-eventTab'
                                        onClick={() => this.props.addGame({
                                            id: this.props.id,
                                            home: this.props.home,
                                            homeImg: this.props.homeImg,
                                            away: this.props.away,
                                            awayImg: this.props.awayImg,  
                                            date: this.props.date,
                                            time: this.props.time,
                                            timezone: this.props.timezone,
                                            location: this.props.location,
                                            stadium: this.props.stadium,

                                        })}>
                        Add game</button>
                    </div>

                    <div class={this.getClasses("deleteButton")}>
                    <button class='flex-item-eventTab'
                                        onClick={() => this.props.deleteGame(
                                            this.props.id
                                        )}>
                        Delete game</button>
                    </div>

                    <div class={this.getClasses("score")}>
                        <div>{this.props.homeScore}</div>
                        <div>{this.props.awayScore}</div>
                    </div>


                    <div class="location flex-item-eventTab">
                        <div>
                        {this.props.stadium}
                        </div>
                        <div>
                         {this.props.location}

                        </div>
                    </div>

                    <div class="time flex-item-eventTab">
                        <div>
                        {this.props.date}
                        </div>
                        <div>
                        {this.props.time}
                        </div>  
                         
                    </div>

            </React.Fragment>
        );
    }

    getClasses = (classType) => {
        if (classType==="addButton") {
            if (this.props.displayAddButton === true) return "btn-container";
            else return "display-none";
        }
        else if (classType=="deleteButton") {
            if (this.props.displayDeleteButton ===true) return "btn-container btn-delete-container";
            else return "display-none";
        }
        else if (classType==="score") {
            if (this.props.displayButton===true) return "display-none";
            else return "fixture-score";

        }
    }
}
 
export default EventTab;