import React from 'react';

import {Link} from 'react-router-dom';

class CardViewer extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            currentCardIndex: 0,
            frontShowing: true
        }
    }

    flipCard = () => {
        this.setState({frontShowing: !this.state.frontShowing});
    }

    nextCard = () => {
        this.setState({currentCardIndex: Math.min(this.props.cards.length - 1, this.state.currentCardIndex + 1), 
            frontShowing: true});
    }

    prevCard = () => {
        this.setState({currentCardIndex: Math.max(0, this.state.currentCardIndex - 1), 
            frontShowing: true});
    }

    showCardText = () => {
        if (this.state.frontShowing)
        {
            return this.props.cards[this.state.currentCardIndex].front
        }
        else 
        {
            return this.props.cards[this.state.currentCardIndex].back
        }
    }

    showFlipText = () => {
        if (this.state.frontShowing)
        {
            return "Show back of card"
        }
        else 
        {
            return "Show front of card"
        }
    }

    showProgressText = () => {
        return "Card "+(this.state.currentCardIndex+1)+"/"+(this.props.cards.length);
    }
    
    render()
    {
        return (
            <div>
                <h2>{this.showProgressText()}</h2>
                <h3>{this.showCardText()}</h3>
                <button onClick={this.prevCard}>Go to previous card</button>
                <button onClick={this.flipCard}>{this.showFlipText()}</button>
                <button onClick={this.nextCard}>Go to next card</button>
                <hr />
                <Link to="/editor">Go to Card Editor</Link>
            </div>
        )
    }
}

export default CardViewer;