import React, { Component } from 'react';

//props:
//description
// id
// key
//handleTabClick (function reference)
//description
// code (for listing teams only)
// logo (for listing teams only)

//inside container .tab
class Tab extends Component {
    render() { 
        return (
                <button class="left-tab-button" onClick = { () => this.props.handleTabClick(this.props.id, this.props.description) }
                >
                    <img src={this.props.logo}></img>
                    {this.props.description} {this.props.code} 



                </button>
        );
    }
}
 
export default Tab;