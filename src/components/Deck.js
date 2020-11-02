import React, { Component } from "react";
import Card from "./Card";

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
    this.animationInProgress = false;
  }

  componentDidMount() {
    let new_cards = [];
    let center = {
      x: parseFloat(this.deck.style.width) / 2,
      y: parseFloat(this.deck.style.height) / 2,
    };
    let total_number_of_cards = 9;
    let middle_card_by_index = Math.floor(total_number_of_cards / 2);
    let new_x = 0;
    let new_y = 0;
    let new_zIndex = 0;
    let new_scale = 0;

    for (let i = 0; i < total_number_of_cards; i++) {
      if (i < middle_card_by_index) {
        // left side of deck
        // order cards
        new_x = center.x - 300 * (middle_card_by_index - i);
        new_y = center.y;

        //cascade the cards
        new_x = new_x + 0.333 * 300 * (middle_card_by_index - i);

        // zIndex the cards
        new_zIndex = i;

        // Scale the cards
        new_scale = Math.pow(0.95, middle_card_by_index - i);
      } else {
        // left side of deck
        new_x = center.x + 300 * (i - middle_card_by_index);
        new_y = center.y;

        //cascade the cards
        new_x = new_x - 0.333 * 300 * (i - middle_card_by_index);

        // zIndex the cards
        new_zIndex = i * -1.0;

        // Scale the cards
        new_scale = Math.pow(0.95, i - middle_card_by_index);
      }
      console.dir(colors[i]);
      new_cards.push(
        <Card
          color={colors[i]}
          x={new_x}
          y={new_y}
          zIndex={i === middle_card_by_index ? 100 : new_zIndex}
          scale={new_scale}
        />
      );
    }

    this.setState({ cards: new_cards });
  }

  handle_next = () => {
    if (this.animationInProgress) {
        return;
    }
    this.animationInProgress = true;
    let last_cards_left = this.deck.children[this.deck.children.length - 1].style.left;
    let last_cards_zIndex = this.deck.children[this.deck.children.length - 1].style.zIndex;
    let last_cards_transform = this.deck.children[this.deck.children.length - 1].style.transform;
    for (let i = this.deck.children.length - 1; i > 0; i--) {
        this.deck.children[i].style.transitionDuration = "1.0s";
        this.deck.children[i].style.left = this.deck.children[i - 1].style.left;
        this.deck.children[i].style.zIndex = this.deck.children[i - 1].style.zIndex;
        this.deck.children[i].style.transform = this.deck.children[i - 1].style.transform;
    }

    //special case
    this.deck.children[0].style.transitionDuration = "0.2s";
    this.deck.children[0].style.transform = `translate(-50%, -50%) scale(0)`;

    setTimeout(() => {
        this.deck.children[0].style.transitionDuration = "0.0s";
        this.deck.children[0].style.left = last_cards_left;
        this.deck.children[0].style.zIndex = last_cards_zIndex;

        this.deck.appendChild(this.deck.children[0]);

        setTimeout(() => {
            this.deck.children[this.deck.children.length - 1].style.transitionDuration = '0.2s';
            this.deck.children[this.deck.children.length - 1].style.transform = last_cards_transform;   
            this.animationInProgress = false;         
        }, 100)
    }, 700);

  };

  handle_previous = () => {
    if (this.animationInProgress) {
        return;
    }
    this.animationInProgress = true;
    let first_cards_left = this.deck.children[0].style.left;
    let first_cards_zIndex = this.deck.children[0].style.zIndex;
    let first_cards_transform = this.deck.children[0].style.transform;
    for (let i = 0; i < this.deck.children.length - 1; i++) {
        this.deck.children[i].style.transitionDuration = "1.0s";
        this.deck.children[i].style.left = this.deck.children[i + 1].style.left;
        this.deck.children[i].style.zIndex = this.deck.children[i + 1].style.zIndex;
        this.deck.children[i].style.transform = this.deck.children[i + 1].style.transform;
    }

    //special case
    this.deck.children[this.deck.children.length - 1].style.transitionDuration = "0.2s";
    this.deck.children[this.deck.children.length - 1].style.transform = `translate(-50%, -50%) scale(0)`;

    setTimeout(() => {
        this.deck.children[this.deck.children.length - 1].style.transitionDuration = "0.0s";
        this.deck.children[this.deck.children.length - 1].style.left = first_cards_left;
        this.deck.children[this.deck.children.length - 1].style.zIndex = first_cards_zIndex;

        this.deck.insertBefore(this.deck.children[this.deck.children.length - 1], this.deck.children[0]);

        setTimeout(() => {
            this.deck.children[0].style.transitionDuration = '0.2s';
            this.deck.children[0].style.transform = first_cards_transform;   
            this.animationInProgress = false;         
        }, 100)
    }, 700);      
  }

  render() {
    return (
      <div>
        <button onClick={this.handle_previous}>Previous</button>
        <button onClick={this.handle_next}>Next</button>
        <div>
          <div ref={(ref_id) => (this.deck = ref_id)} style={styles.deck}>
            {this.state.cards}
          </div>
        </div>
      </div>
    );
  }
}

const colors = [
  "red",
  "blue",
  "green",
  "purple",
  "white",
  "orange",
  "pink",
  "grey",
  "yellow",
];

const styles = {
  deck: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "300px",
    width: "300px",
    backgroundColor: "blue",
  },
};

export default Deck;
