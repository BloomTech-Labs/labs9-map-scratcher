

//== Legend ====================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React from 'react'
import { Card } from 'semantic-ui-react'
import './legend.scss'

//-- React Implementation ------------------------
const Legend = () => (
  <Card className="legend_main">
    <Card.Content>
      <div className='legend_div'>
        <div className='legend_wishlist'></div>
        <Card.Content>Wishlist</Card.Content>
      </div>
      <div className='legend_div'>
        <div className='legend_transited'></div>
        <Card.Content>Transited</Card.Content>
      </div>
      <div className='legend_div'>
        <div className='legend_visited'></div>
        <Card.Content>Visited</Card.Content>
      </div>
      <div className='legend_div'>
        <div className='legend_lived'></div>
        <Card.Content>Lived</Card.Content>
      </div>
    </Card.Content>
  </Card>
);
export default Legend;
