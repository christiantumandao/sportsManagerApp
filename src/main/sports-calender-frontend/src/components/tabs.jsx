import React, { Component } from 'react';
import Tab from './tab';
import '../App.css';
//props :
// tabs
// handleTabClick (function reference)

//props passed to each tab
// key
// id
// description (main title)
// icon (as bg img)
// handleTab click (function reference) 
class Tabs extends Component {
    render() { 
        return (
            <React.Fragment>
                {
                    this.props.tabsToDisplay.map(tab => (
                        <div className = { this.getClasses(tab.id) } key = {tab.id}>
                            <Tab 
                            key = { tab.id }
                            id = { tab.id }
                            logo = {tab.logo}
                            code = {tab.code}
                            handleTabClick = { this.props.handleTabClick }
                            description = { tab.description }/>

                        </div>
                    ))
                }
            

            </React.Fragment>
        );
    }

    getClasses(id) {
        return "tab "+id;
    }
}
 
export default Tabs;