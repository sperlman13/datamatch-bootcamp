import React from 'react';
import "./CardEditor.css";

import {Link, withRouter} from "react-router-dom";
import {firebaseConnect} from "react-redux-firebase";
import {compose} from "redux";

class CardEditor extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { 
            cards: [
                {front: 'front1', back : 'back1'},
                {front: 'front2', back : 'back2'},
              ],
            front: '', 
            back: '',
            name: ''
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    createDeck = () => {
        const deckId = this.props.firebase.push('/flashcards').key;

        const newDeck = {cards: this.state.cards, name: this.state.name};

        const updates = {};
        updates[`/flashcards/${deckId}`] = newDeck;
        updates[`/homepage/${deckId}`] = {name: this.state.name};

        const onComplete = () => {
            this.props.history.push(`/viewer/${deckId}`);
        };
        this.props.firebase.update(`/`, updates, onComplete);
        this.setState({cards: [], front: '', back: '', name: ''});
    };

    addCard = () => {
        if (!this.state.front.trim() || !this.state.back.trim())
        {
            alert('Cannot add empty card');
            return;
        }
        
        const newCard = {front: this.state.front, back: this.state.back};
        const cards = this.state.cards.slice().concat(newCard);
        this.setState({cards, front: '', back: ''});
    }

    deleteCard = index => {
        const cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({cards});
    }
    
    render()
    {
        const cards = this.state.cards.map((card, index) => {
            return (
                <tr key = {index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button onClick = {() => this.deleteCard(index)} >Delete card</button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Card Editor</h2>
                <div>
                    Deck name: 
                    <input 
                        name = "name"
                        onChange={this.handleChange}
                        placeholder="Name of deck" 
                        value = {this.state.name}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </table>
                <br />
                <input name = "front" onChange={this.handleChange}
                    placeholder="Front of card" value = {this.state.front} />
                <input name = "back" onChange={this.handleChange}
                    placeholder="Back of card" value = {this.state.back} />
                <button onClick = {this.addCard}>Add Card</button>
                <hr />
                <div>
                    <button 
                        onClick = {this.createDeck}
                        disabled={this.state.name.trim() === '' || this.state.cards.length === 0}>
                        Create deck
                    </button>
                </div>
                <Link to="/">Go to Homepage</Link>
            </div>
        )
    }
}

export default compose
    (
        firebaseConnect(),
        withRouter
    )
    (CardEditor);