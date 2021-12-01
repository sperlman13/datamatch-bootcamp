import React from 'react';

import {Link} from "react-router-dom";
import {firebaseConnect, isLoaded} from "react-redux-firebase";
import {connect} from "react-redux";
import {compose} from "redux";

class Homepage extends React.Component {
    render()
    {
        console.log(this.props.homepage);
        
        if(!isLoaded(this.props.homepage))
        {
            return <div>Not loaded</div>;
        }

        const decks = Object.keys(this.props.homepage);

        console.log(decks);

        const links = decks.map((id, index) => {
            console.log(this.props.homepage[id].name);
            return <div><Link to={`/viewer/${id}`}>Link: {this.props.homepage[id].name}</Link></div>;
        });

        console.log(links);

        return <div>{links}</div>;
    }
}

const mapStateToProps = state => {
    console.log(state.firebase.data.homepage);
    return {homepage: state.firebase.data.homepage};
}

export default compose
    (
        firebaseConnect(['/homepage']),
        connect(mapStateToProps)
    )
    (Homepage);