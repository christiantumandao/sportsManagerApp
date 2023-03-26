import React, { Component, useState } from 'react';
import Display from './display';
import Tabs from './tabs';
import SearchBar from './searchBar';

import axios from 'axios';

class MainBody extends Component {

    state = {  

        tabsToDisplay: [
            {id: "1", description: "Your games"},
            {id: "2", description: "Find Games"},
            {id: "3", description: "Find past games"},
            {id: "4", description: "Profile Info"},
            {id: "5", description: "Info"}
            ],

        defaultTabs: [
            {id: "1", description: "Your games"},
            {id: "2", description: "Find games"},
            {id: "3", description: "Find past games"},
            {id: "4", description: "Profile Info"},
            {id: "5", description: "Info"}
            ],

        findGamesTabs: [
            {id: "back", description: "Back"},
            {id: "sbt-1", description: "Search by League"},
            {id: "sbt-2", description: "Search by Teams"},
        ],

        leagueTabs: [
            {id: "back", description: "Back"},
            {id: "premier", description: "Premier League"},
            {id: "champions", description: "Champions League"},
            {id: "bundesliga", description: "Bundesliga"},
            {id: "serie-a", description: "Serie A"},
            {id: "la-liga", description: "La Liga"}
        ],

        scheduledGamesTabs: [
            {id: "back", description: "Back"},
            {id: "6", description: "Game 1"},
            {id: "7", description: "Game 2"},
            {id: "8", description: "Game 3"},
            {id: "9", description: "Game 4"}
            ],

      // User information ================================================================================

      isLoggedIn: false,
      userData: {firstName: "", lastName: "", id: "", }, //data is loaded-in in this.loadInUserData
      userGames: [],  //loaded in in this.loadInUserData

      // GUI variables
      findingEventsByLeague: null,
      findFutureEvents: false, 
      displayAddButton: false,
      displayedbutton: false,
      displayScore: false,
      displayTracker: false,

       // Flags for displayHeader ==========================================================================

          // what is called to display
       displayHeaderData: {topLeft: "Event Manager", topRight: "", bottomLeft: "", bottomRight: ""},
       displayDefaultHeader: {topLeft: "EventManager", topRight: "", bottomLeft: "", bottomRight: ""},


       // Flags for displayBody  ===========================================================================
      
       
       displayType: "login-message-gui",
       // login-message-gui
       // login-gui
       // registration-gui
       
       // your-games
       // find-games
       // find-past-games
       // info
       // info

          
       // Flags for EventsTabs 
       rightDisplayTabs: [],
       defaultRightDisplayTabs: [],
            
    } 
    render() { 
        return (
            <React.Fragment>

                <div class="flex-item-mainBody flex-item-mainBody-1 flex-container-tabs" >         
                    <Tabs
                        tabsToDisplay = { this.state.tabsToDisplay } 
                        handleTabClick = { this.handleTabClick }
                     />
                </div>

                <div class="flex-item-mainBody flex-item-mainBody-2 flex-container-display">
                    <Display 

                        displayHeader={this.state.displayHeaderData}

                        // rightTabs
                        fixtures={this.state.rightDisplayTabs}

                        // function references
                        addGame = {this.addGame}
                        deleteGame = {this.deleteGame}
                        handleLoginRegistrationClick = {this.handleLoginRegistrationClick}
                        handleRegistration = {this.handleRegistrationSubmit}
                        handleLogin = {this.handleLoginSubmit}
                        handleTrackerButtonClick = { this.handleTrackerButtonClick }

                        // display body
                        displayType = { this.state.displayType }
                        findFutureEvents ={ this.state.findFutureEvents }
                        displayAddButton = { this.state.displayAddButton }
                        displayDeleteButton = { this.state.displayDeleteButton }
                        displayScore = { this.state.displayScore }
                        
                        //user data
                        userData = { this.state.userData }
                        gameCount = { this.state.userGames.length}
                        isLoggedIn = { this.state.isLoggedIn }/>
                </div>
            </React.Fragment>


        );
    }

    handleTabClick = (id, optData) => {

      // your games
      if  (id==="1") {
        console.log("clicked on your games");
        if (this.state.isLoggedIn===true) {
          this.displayScheduledGames();
        }
        else {
          this.setState({
            tabsToDisplay: this.state.defaultTabs,
            displayType: "login-message-gui",
            displayHeaderData: {topLeft: "", topRight: "", bottomRight: "", bottomLeft: ""},
          }) 
        }
      }

      // find future games
      else if (id==="2") {
        console.log("clicked on find future games");
        this.setState({
          tabsToDisplay: this.state.findGamesTabs,
          findFutureEvents: true
        });
      }

      //find past games
      else if (id==="3") {
        console.log("clicked on find past games");
        this.setState({
          tabsToDisplay: this.state.findGamesTabs,
          findFutureEvents: false,
        })
      }

      // profile info
      else if (id==="4") {
        console.log("clicked on profile info");
        if (this.state.isLoggedIn===true) {
          this.setState({
            displayHeaderData:  {topLeft: "Profile ingo", topRight: "", bottomLeft: "", bottomRight: ""},
            displayType: "profile-info"
          })
        }
        else {
          this.setState({
            displayHeaderData:  {topLeft: "", topRight: "", bottomLeft: "", bottomRight: ""},
            displayType: 'user-not-logged=in'
          }); 
        }
      }

      // info
      else if (id==="5") {
        console.log("clicked on info")
        this.setState({
          displayHeaderData:  {topLeft: "About Sports Manager", topRight: "", bottomLeft: "", bottomRight: ""},
          displayType: "info"
        });
      }

      else if (id==="back") {
        console.log("clicked back")
        if (this.state.isLoggedIn===true) {
          this.setState({
            tabsToDisplay: this.state.defaultTabs,
          })
        }
        else {
          this.setState({
            tabsToDisplay: this.state.defaultTabs,
            displayType: "login-message-gui"
          })
        }

      }

      else if (id==="sbt-1") {
        console.log("searching by league")
        this.setState({
          tabsToDisplay: this.state.leagueTabs,
          findingEventsByLeague: true
        });
      }

      else if (id==="sbt-2") {
        console.log("searching by teams")
        this.setState({
          tabsToDisplay: this.state.leagueTabs,
          findingEventsByLeague: false
        })
      }

      //clicked on a league
      else if  (id==="premier" || id==="champions" || id==="bundesliga" || id==="serie-a" || id==="la-liga") {
        // handleLeagueTabClick will display eventTabs if findingEventsByLeague flagged true
        this.handleLeagueTabClick(id);
      }

      // getting fixtures by team
      else if ((typeof id) ==="number" ) {
        console.log("getting fixtures by team");
          this.getFixturesByTeam(id, optData);
      }

    }

    displayScheduledGames = () => {
      if (this.state.isLoggedIn===true) {
        this.setState({
          displayDeleteButton: true,
          displayTracker: true,
          displayAddButton: false,
          displayScore: true,

          rightDisplayTabs: this.state.userGames, 
          displayHeaderData: { topLeft: "Welcome "+this.state.userData.firstName,topRight: "", bottomRight: "", bottomLeft: "Your games"},
          displayType: "your-games"
        });
      }
    }

    displayUserNotLoggedIn = () => {
      if (this.state.isLoggedIn===false) {
        this.setState({
                displayLoginStatus: true, 
                displayLogin: false, 
                displayRegistration: false, 
                rightDisplayTabs: this.state.defaultRightDisplayTabs,
                displayHeaderData: {name: "Event Manager"},
                displayInfo: false
              });
      }
    }


      loadInUserData = () => {
        // api request that returns all games for a given user
        let axios_uri = "http://localhost:8080/api/users/events/"+String(this.state.userData.id);
        axios({
        method: 'get',
        url: axios_uri
        })
        .then(result => {
            let events = [];
            // mapping data in each event in json to "events" array to be displayed in eventTab
            result.data.forEach( res => {
              events.push({
                id: res.id,
                home: String(res.home), 
                homeImg: String(res.homeImg), 
                away: String(res.away), 
                awayImg: String(res.awayImg), 
                stadium: String(res.stadium),
                location: String(res.location), 
                date: String(res.date),
                time: String(res.time),
                watched: res.watched
              })
                //events.push({id:String(res.eventName), description: String(res.eventDescription)});
            })
            this.setState({
              userGames: events,
            }, () => this.displayScheduledGames() );
        })
        .catch(error => console.error("err:", error));
      
    }

      //api call to find available games for each region
      handleLeagueTabClick = (leagueId) => {

        if (leagueId==="premier") {leagueId=39; }
        else if (leagueId==="champions") {leagueId=2; }
        else if (leagueId==="bundesliga") {leagueId=78;}
        else if (leagueId==="serie-a") {leagueId=135; }
        else if (leagueId==="la-liga") {leagueId=140; }
      
      
        //API call to get info on league clicked. will change the header on display
        const options = {
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
          params: {id: leagueId},
          headers: {
            'X-RapidAPI-Key': 'c3997e6e90mshc57e13968b48304p10dd78jsnd81c29d9c57a',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
        };
        let name;
        let region;
        let season;
        axios.request(options).
        then(response => {
            let res = response.data.response[0];
            name = res.league.name;
            if (name==="UEFA Champions League") name="Champions League";
            region = res.country.name;
            season = res.seasons.filter(season => season.current===true );
            season=season[0];
            season = season.start+' to '+season.end;

            this.setState({
              displayHeaderData: {topLeft: name, topRight: region, bottomLeft: "",bottomRight: season},
           });
        }).catch(function (error) {
            console.error(error);
        });

        // gettings fixtures in league
        if (this.state.findingEventsByLeague===true) {
          this.setState({
            displayType: "find-games"
          }, this.getFixturesByLeague(leagueId)); 
        } 
        // getting teams in league
        else {
          this.setState({
          }, () => this.getTeamsByLeague(leagueId));
        }

            
      }

      getTeamsByLeague = (leagueId) => {

            //translating leagueIDs for different api version usage
            if (leagueId===39) { leagueId=2; }
            else if (leagueId===2) { leagueId=31; }
            else if (leagueId===78) { leagueId=8; }
            else if (leagueId===135) { leagueId=6; }
            else if (leagueId===140) { leagueId=30; }
        
        var teamsInLeague = [];
        var axios_uri = "https://api-football-v1.p.rapidapi.com/v2/teams/league/"+leagueId;
        const options = {
            method: 'GET',
            url: axios_uri,
            headers: {
              'X-RapidAPI-Key': 'c3997e6e90mshc57e13968b48304p10dd78jsnd81c29d9c57a',
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then( response => {
            let res = response.data.api.teams;
            teamsInLeague.push({id: "back", description: "Back"});
            res.map(team => {
                let obj = {};
                obj.id = team.team_id;
                obj.description = team.name;
                obj.logo = team.logo;
                obj.code = '('+team.code+')';
                teamsInLeague.push(obj);
            })
            // id description
            this.setState({tabsToDisplay: teamsInLeague});
          })
          .catch(function (error) {
              console.error(error);
          });
      }

    getFixturesByTeam = (teamId, teamName) => {
        
        var api_params;
        var gettingFutureEvents = this.state.findFutureEvents;

        if (this.state.findFutureEvents===true) {
          api_params = {team: teamId, season: '2022', next: '50'}; 
        }
        else  {
          console.log("showing past");
          api_params=  {team: teamId, season: '2022', last: '50'}
        }

        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
            params: api_params,
            headers: {
              'X-RapidAPI-Key': 'c3997e6e90mshc57e13968b48304p10dd78jsnd81c29d9c57a',
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(response => {
            var newFixtures=[];
            response.data.response.map( event => {
                let f = {
                    id: event.fixture.id,
                    home: event.teams.home.name, 
                    away: event.teams.away.name, 
                    date: event.fixture.date.slice(0,10),
                    time: event.fixture.date.slice(11,16), 
                    timezone: event.fixture.timezone, 
                    location: event.fixture.venue.city,
                    stadium: event.fixture.venue.name,
                    homeImg: event.teams.home.logo,
                    awayImg: event.teams.away.logo,
                    homeScore: event.goals.home,
                    awayScore: event.goals.away
                };
           
                newFixtures.push(f);
            })
            this.setState({
              rightDisplayTabs:newFixtures,
              displayDeleteButton: false,
              displayAddButton: true,
              displayScore: !gettingFutureEvents,
              displayHeaderData: {topLeft: teamName, region: "", season: ""}
            });

            
          }).catch(function (error) {
              console.error(error);
          });

    }

      getFixturesByLeague = (leagueId) => {
        

        var api_params;
        if (this.state.findFutureEvents===true) api_params = {league: leagueId, season: '2022', next: '50'};
        else  api_params=  {league: leagueId, season: '2022', last: '50'};

        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
            params: api_params,
            headers: {
              'X-RapidAPI-Key': 'c3997e6e90mshc57e13968b48304p10dd78jsnd81c29d9c57a',
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
          };
          
          axios.request(options)
          .then(response => {
            var newFixtures=[];
            response.data.response.map( event => {

              let f = {
                id: event.fixture.id,
                home: event.teams.home.name, 
                away: event.teams.away.name, 
                date: event.fixture.date.slice(0,10),
                time: event.fixture.date.slice(11,16), 
                timezone: event.fixture.timezone, 
                location: event.fixture.venue.city,
                stadium: event.fixture.venue.name,
                homeImg: event.teams.home.logo,
                awayImg: event.teams.away.logo,
                homeScore: event.goals.home,
                awayScore: event.goals.away
              };
              newFixtures.push(f);
            });   
            var gettingFutureEvents= this.state.findFutureEvents;
            this.setState({
              rightDisplayTabs: newFixtures,
              displayAddButton: true,
              displayDeleteButton: false,
              displayScore: !gettingFutureEvents
            });
      
          })
          .catch(function (error) {
              console.error(error);
          });
      }

      addGame = (event) => {

        let gameAdded = false;
        this.state.userGames.forEach(userEvent => { 
          if ( event.id === userEvent.id ) gameAdded=true;
        })

        if (this.state.isLoggedIn===false) {
          this.setState({
            displayHeaderData: {topLeft: "Events Manager", topRight: "", bottomLeft: "", bottomRight: ""},
            displayType: "login-message-gui"
          })
        }

        else if (gameAdded===true) {
          alert("Game already added! ");
        }

        
        else { //adding game

            let uri ="http://localhost:8080/api/events/new-event"
            axios.post(uri, {
              id: event.id,
              eventName: event.home+" vs "+event.away,
              eventDescription:  event.time,

              date: event.date,
              time: event.time,
              location: event.location,
              stadium: event.stadium,

              home: event.home,
              homeImg: event.homeImg,
              away: event.away,
              awayImg: event.awayImg,
              watched: event.watched,

              uid: this.state.userData.id
            })
            .then(response => {
              let newUserGames = [...this.state.userGames];
              newUserGames.push(event);
              this.setState({ userGames: newUserGames}); // have to callback? bc of asynchronous functionality of setstate
              console.log("event", event.id, "added");
            })
            .catch(error => console.log("error", error))
        }
      }

      deleteGame = (id) => {
        console.log("deleting event ",id);

        let axios_uri = "http://localhost:8080/api/events/"+String(id);
        axios.delete(axios_uri)
        .then(response => {
          console.log("event deleted");
          let newUserGames = [...this.state.userGames];
          newUserGames.forEach((game, index, arr) => { 
            if (game.id === id) arr.splice(index, 1);
          } );
          this.setState({userGames: newUserGames}, () => this.displayScheduledGames());
        }
        )
        .catch(error => console.log("error", error));
      }

      handleLoginRegistrationClick = (buttonType) => {
        if (buttonType==="login") {
          this.setState({
            displayType: "login-gui"
          })

        }
        else if (buttonType==="registration") {
          this.setState({
            displayType: "registration-gui"
          });

        }
        else if (buttonType==="back") {
          this.setState({
            displayType: "login-message-gui"
          });
          
        }
      }

      handleRegistrationSubmit = (userData) => {
        console.log("Registering....");
        console.log("Name: ", userData.firstName, userData.lastName);
        console.log("username: ", userData.username);
        console.log("password: ", userData.password);

        axios.post( "http://localhost:8080/api/users" ,
          {
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            password: userData.password
          })
          .then(result => {
            console.log("User ", userData.username," generated" );   
          })
          .catch(error => console.error("err:", error));
      }

      handleLoginSubmit = (userData) => {
        console.log("logging in as", userData.username,"...");

         //getting all users and filtering JSON for right users
         axios.get("http://localhost:8080/api/users/all-users")
         .then(response => {
           let user = response.data.filter(u => u.username===userData.username && u.password===userData.password);
           if (user.length===0) {console.log("log in failed"); alert("login failed");}
           else{
              user = user[0];
               this.setState(
                {userData: {firstName:user.firstName, lastName: user.lastName, username: user.username, id: user.id}, isLoggedIn: true}, 
                () => { this.loadInUserData()} 
                );
           }
         })
         .catch(error => console.log("error: ", error));
      }

      handleTrackerButtonClick = (eventId) => {
        this.state.userGames.forEach(event => {
          if (event.id===eventId) return event.watched;
        })
      }


}
 
export default MainBody;