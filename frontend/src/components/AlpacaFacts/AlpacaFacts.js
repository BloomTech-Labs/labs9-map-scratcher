

//== Alpaca Facts ==============================================================
/*
  This component displays humorous "facts" about Alpacas. It's meant to be used
  anywhere a full screen is occupied loading. Smoke and mirrors.
*/

//-- Dependencies --------------------------------
import React from 'react';
import { Item } from 'semantic-ui-react';
import Backpaca from '../Landing/Backpaca';
import './alpaca-facts.scss';

//-- Project Constants ---------------------------
function Fact(number, text) {
  this.number = number;
  this.text = text;
}
const facts = [
  new Fact(274, 'Alpacas like you before they even meet you.'),
  new Fact(97, 'Alpaca is Aymara for "Alpaca."'),
  new Fact(135, 'Alpacas practice community support.'),
  new Fact(68, 'Alpacas can spit 10 feet, but choose not to.'),
  new Fact(22, 'Alpacas are not permitted on most commercial airlines.'),
  new Fact(104, 'Alpacas are much fluffier than the average house plant.'),
];

//-- React Implementation ------------------------
export default function (props) {
  // Select a quote at random
  const randomIndex = Math.floor(Math.random()*facts.length);
  const randomFact = facts[randomIndex];
  //
  return (
    <div className="fact_centering">
        <Item.Group id="fact_container">
          <Item>
            <Item.Image size='medium'>
              <Backpaca />
            </Item.Image>
            <Item.Content>
              <Item.Header>Did you know?</Item.Header>
              <Item.Meta>Alpaca Fact #{randomFact.number}</Item.Meta>
              <Item.Description>
                {randomFact.text}
              </Item.Description>
              <Item.Extra>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
    </div>
  );
}
