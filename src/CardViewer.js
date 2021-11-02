import React from 'react';

class CardViewer extends React.Component {
    render()
    {
        return (
            <div>
                <h2>
                    FUQUE
                </h2>
                <br />
                <button onClick = {this.props.switchMode}>Go to Card Editor</button>
            </div>
        )
    }
}

export default CardViewer;