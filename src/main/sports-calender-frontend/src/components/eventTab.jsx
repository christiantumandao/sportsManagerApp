import React, { Component } from 'react';

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
                    <div className="match-up flex-item-eventTab">
                        <div>
                            <img src={this.props.homeImg} alt="home logo" className="home-img"/>
                            {" "+this.props.home}
                        </div>
                         <div>vs</div>  
                         <div>
                            <img src={this.props.awayImg} alt="away logo" className="away-img"></img>
                             {" "+this.props.away}
                         </div>      
                 </div>

                    {/** 20% width */}
                    <div className={this.getClasses("addButton")}>
                        <button className='flex-item-eventTab'
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
                    
                    {/** delete button 30% width */}
                    <div className={this.getClasses("deleteButton")}>
                    <button className='flex-item-eventTab'
                                        onClick={() => this.props.deleteGame(
                                            this.props.id
                                        )}>
                        Delete game</button>
                    </div>

                                
                    <div className={this.getClasses("score")}>
                        <div>{this.props.homeScore}</div>
                        <div>{this.props.awayScore}</div>
                    </div>

                    {/** tracker */}
                    <div className={this.getClasses("tracker")}>
                        <div className="tracker-title">
                            <p>Watched:</p>
                            
                        </div>

                        <div className="tracker-watched">
                        <p> {this.props.watched}</p>
                        </div>
                       
                        <form onSubmit = { this.handleSubmit } className="tracker-btn-container">
                                <input 
                                type="text"

                                onChange = { this.handleChange}
                                placeholder = "Set time"
                                className="form-control rounded change-watched"/>
                                <input 
                                type="submit" 
                                value="Set" 
                                className="submit-btn change-watched-submit" ></input>        
                        </form>
                    </div>


                    <div className="location flex-item-eventTab">
                        <div>
                        {this.props.stadium}
                        </div>
                        <div>
                         {this.props.location}

                        </div>
                    </div>

                    <div className="time flex-item-eventTab">
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
        else if (classType==="deleteButton") {
            if (this.props.displayDeleteButton ===true && this.props.displayType==="your-games") return "delete-btn-container";
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