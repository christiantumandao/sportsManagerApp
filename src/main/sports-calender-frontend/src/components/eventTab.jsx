import React, { Component, useState } from 'react';

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
    constructor(props) {
        super(props);

        let w;
        if (this.props.watched===undefined) { w="" }
        else{ w=this.props.watched }


        this.state = {
            watched: w
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //in class eventTab
    render() { 
        return (
            <React.Fragment>

                    {/** 30% width */}
                    <div class="match-up flex-item-eventTab">
                        <div>
                            <img src={this.props.homeImg} class="home-img"/>
                            {" "+this.props.home}
                        </div>
                         <div>vs</div>  
                         <div>
                            <img src={this.props.awayImg} class="away-img"></img>
                             {" "+this.props.away}
                         </div>      
                 </div>

                    {/** 20% width */}
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
                    
                    {/** 30% width */}
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

                    {/** tracker */}
                    <div class={this.getClasses("tracker")}>
                        <div class="tracker-title">
                            <p>Watched:</p>
                            <p> {this.props.watched}</p>
                        </div>
                        

                        <form onSubmit = { this.handleSubmit } class="tracker-btn-container">
                            
                                <input 
                                type="text"
                                value = {this.state.watched }
                                onChange = { this.handleChange}

                                placeholder="New time"
                                class="form-control rounded change-watched"
                                />
                                <input type="submit" value="Set" class="submit-btn change-watched-submit" ></input>
                           
                            
                        </form>



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
            if (this.props.displayAddButton===true) return "add-btn-container";
            else return "display-none";
        }
        else if (classType=="deleteButton") {
            if (this.props.displayDeleteButton ===true && this.props.displayType==="your-games") return "add-btn-container delete-btn-container";
            else return "display-none";
        }
        else if (classType==="score") {
            if (this.props.displayScore===false) return "display-none";
            else return "fixture-score";
        }
        else if (classType==="tracker") {
            if (this.props.displayType==="your-games") return "tracker";
            else return "display-none";
        }

        

        
    }

    handleChange = (event) => {
        this.setState( { watched : event.target.value} );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleTrackerinputClick(this.props.id, this.state.watched);

    }
}
 
export default EventTab;