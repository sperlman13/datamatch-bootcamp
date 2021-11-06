import React from "react";
import CardEditor from "./CardEditor";
import CardViewer from "./CardViewer";

import {Routes, Route} from "react-router-dom";
import Homepage from "./Homepage";

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      cards: [
        {front: 'front1', back : 'back1'},
        {front: 'front2', back : 'back2'},
      ],
    }
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({cards});
  }

  deleteCard = index => {
    if(this.state.cards.length > 1)
    {
      const cards = this.state.cards.slice();
      cards.splice(index, 1);
      this.setState({cards});
    }
  }
  
  render()
  {
    return (
      <Routes>
        <Route exact path = "/"
          element = {<Homepage/>} />
        <Route exact path = "/editor"
          element = {<CardEditor 
            addCard = {this.addCard} 
            deleteCard = {this.deleteCard} 
            cards = {this.state.cards} />} />
        <Route exact path = "/viewer"
          element = {<CardViewer 
            cards = {this.state.cards}/>} />
      </Routes>
    );
 }
}

export default App;
