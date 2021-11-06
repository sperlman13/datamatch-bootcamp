import React from 'react';

import {Link} from "react-router-dom";

class Homepage extends React.Component {
    render()
    {
        return (
            <div>
                <Link to="/editor">Go to Card Editor</Link>
                <br />
                <Link to="/viewer">Go to Card Viewer</Link>
            </div>
        )
    }
}

export default Homepage;