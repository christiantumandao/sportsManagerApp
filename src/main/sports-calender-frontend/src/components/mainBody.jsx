import React, { Component, useEffect, useState } from 'react';
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

        //header data for right display
        displayHeaderData: {name: "Event Manager", region: "", season: "", subHeader:""},
        defaultHeaderData: {name: "Event Manager", region: "", season: "", subHeader:""},

        //tabs displayed on the right | is a list of objects w values:
        //    {home, homeImg, away, awayImg, stadium, location, date, time}
       rightDisplayTabs: [], // what is displayed
       defaultRightDisplayTabs: [],

       getter: "",
       findFutureGames: true, // display the "add game" button AND wanting to find upcoming games
       displayDeleteButton: false, // display the "delete game" button

       displayLoginStatus: true,    // display user is not logged in
       displayLogin: false,             // display login GUI
       displayRegistration: false,  // fidplsy registration GUI
       displayProfileInfo: false,
       displayInfo: false,

       isLoggedIn: false,
       userData: {firstName: "", lastName: "", id: "", }, //data is loaded-in in this.loadInUserData
       userGames: []                                                       //loaded in in this.loadInUserData
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
                        displayHeaderData={this.state.displayHeaderData}

                        fixtures={this.state.rightDisplayTabs}
                        addGame = {this.addGame}
                        deleteGame = {this.deleteGame}
                        displayAddButton= {this.state.findFutureGames} //button for adding games
                        displayDeleteButton= { this.state.displayDeleteButton }

                        //booleans for having to display login/register pages
                        displayLoginStatus = {this.state.displayLoginStatus}
                        displayLogin = {this.state.displayLogin}
                        displayRegistration = {this.state.displayRegistration}
                        displayInfo = { this.state.displayInfo }
                        displayProfileInfo = { this.state.displayProfileInfo }
                          userData = { this.state.userData }


                        //button handler
                        handleLoginRegistrationClick = {this.handleLoginRegistrationClick}

                        //login/register button handler
                        handleRegistration = {this.handleRegistrationSubmit}
                        handleLogin = {this.handleLoginSubmit}/>
                </div>


            </React.Fragment>


        );
    }

    handleTabClick = (id, optData) => {

        var newDisplay="";
        var newTabs = this.state.tabsToDisplay;
        if (id ==="back") { 
          newTabs= this.state.defaultTabs;
          this.setState({
            displayProfileInfo: false, 
            displayInfo: false,
            displayLogin: false,
            displayRegistration: false
          })

          if (this.state.isLoggedIn===true) {
            this.displayScheduledGames(); 
          }
          else {
            this.displayUserNotLoggedIn();    
          }
        } 
        else if (id === "1") {  //your scheduled games
          if (this.state.isLoggedIn===false) {
            this.displayUserNotLoggedIn();
          }
          this.setState({
            displayDeleteButton: true,
            findFutureGames: false,
            rightDisplayTabs: this.state.userGames,
            displayProfileInfo: false,
            displayInfo: false
          }); 
        } 
        else if (id==="2") { //get find games options
          newTabs = this.state.findGamesTabs; 
        }  //find future games

        else if (id==="3") { //find past games
          this.setState({findFutureGames: false}); 
          newTabs = this.state.findGamesTabs;
        }

        else if ( id==="4") { //profile info
            if (this.state.isLoggedIn===false) this.displayUserNotLoggedIn();
            else {
              this.setState({ 
                displayProfileInfo: true,
                
                rightDisplayTabs: this.state.defaultRightDisplayTabs,

                displayUserNotLoggedIn: false,
                displayLogin: false,
                displayLoginStatus: false,
                displayRegistration: false,
                displayInfo: false,
              })
            }
        }

        else if ( id==="5") { //website info
            this.setState({ 
              displayInfo: true,

              rightDisplayTabs: this.state.defaultRightDisplayTabs,

              displayProfileInfo: false,
              displayUserNotLoggedIn: false,
              displayLogin: false,
              displayLoginStatus: false,
              displayRegistration: false,


            });
        }

        else if (id==="sbt-1") { 
          this.setState({getter: "by league"}); 
          newTabs = this.state.leagueTabs; 
        }
        else if (id==="sbt-2") { 
          this.setState({getter: "by teams"}); 
          newTabs = this.state.leagueTabs; 
        }

        else if (id==="premier" || id==="champions" || id==="bundesliga" || id==="serie-a" || id==="la-liga") { 
          this.getLeagueInfo(id); 
        }
        else if ((typeof id)==='number') { 
          this.setState({findFutureGames: false}); 
          this.getFixturesByTeam(id, optData) 
        } //if clicked on a team, get fixtures for that team


        this.setState({
            display: newDisplay,
            tabsToDisplay: newTabs
        }) 
    }

    displayScheduledGames = () => {
      if (this.state.isLoggedIn===true) {
        this.setState({
          displayLoginStatus: false, 
          displayLogin: false, 
          displayRegistration: false, 

          rightDisplayTabs: this.state.userGames, 
          displayHeaderData: { name: "Welcome "+this.state.userData.firstName, subHeader: "Your games"},
          displayDeleteButton: true,
          findFutureGames: false,
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


    //getScheduledGames = () => {
      loadInUserData = () => {
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
                time: String(res.time)
              })
                //events.push({id:String(res.eventName), description: String(res.eventDescription)});
            })
            this.setState({userGames: events}, () => this.displayScheduledGames() );
        })
        .catch(error => console.error("err:", error));
      
    }

      //api call to find available games for each region
      getLeagueInfo = (leagueId) => {

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

            this.setState({displayHeaderData: {name: name, region: region, season: season} });
        }).catch(function (error) {
            console.error(error);
        });

        if (this.state.getter==="by league") this.getFixturesByLeague(leagueId);
        else if (this.state.getter==="by teams"){ this.getTeamsByLeague(leagueId); console.log("getting teams for league id ", 2);}

            
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
        this.setState({
          findFutureGames: true,
          displayDeleteButton: false,
          displayLoginStatus: false,
          displayLogin: false,
          displayRegistration: false,
          displayProfileInfo: false,
          displayInfo: false
        }); 

        var api_params;
        if (this.state.findFutureGames===true) api_params = {team: teamId, season: '2022', next: '50'};
        else  api_params=  {team: teamId, season: '2022', last: '50'};

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
              displayHeaderData: {name: teamName, region: "", season: ""}
            });

            
          }).catch(function (error) {
              console.error(error);
          });

    }

      getFixturesByLeague = (leagueId) => {
        this.setState({
          findFutureGames: true,
          displayDeleteButton: false,
          displayLoginStatus: false,
          displayLogin: false,
          displayRegistration: false,
          displayProfileInfo: false,
          displayInfo: false
        }); 

        var api_params;
        if (this.state.findFutureGames===true) api_params = {league: leagueId, season: '2022', next: '50'};
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

            this.setState({rightDisplayTabs: newFixtures, displayDeleteButton: false});
      
          })
          .catch(function (error) {
              console.error(error);
          });
      }

      addGame = (event) => {
        

        if (this.state.isLoggedIn===false) {
          this.displayUserNotLoggedIn();
        }
        else {
          /*id
          xhome 
          xhomeImg
          xaway
          xawayImg
          xdate
          xtime
          timezone
          xlocation
          xstadium */
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
            displayLogin: true,
            displayLoginStatus: false,
            displayHeaderData: {name: "Login", region: "", season: ""}
          })

        }
        else if (buttonType==="registration") {
          this.setState({
            displayLoginStatus: false,
            displayRegistration: true,
            displayHeaderData: {name: "Registration", region: "", season: ""}
          });

        }
        else if (buttonType==="back") {
          this.setState({
            displayLoginStatus: true,
            displayRegistration: false,
            displayLogin: false,
            displayHeaderData: {name: "", region: "", season: ""}
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


}
 
export default MainBody;