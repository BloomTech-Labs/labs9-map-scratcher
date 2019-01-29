

//== Scratch Handler, Combined Slider and Country Display ======================

//-- Dependencies --------------------------------
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { QUERY_USERVISITS_MODAL } from '../../services/requests/modal';
import { 
  QUERY_COUNTRYID_SCRATCHER, 
  QUERY_USER_SCRATCHER,
  MUTATION_COMPLETE_SCRATCHER,
} from '../../services/requests/scratcher';
import Scratcher from '../Scratcher/index.js';

//-- Project Constants ---------------------------
const VISITLEVEL_NONE = 0;
const VISITLEVEL_WISHLIST = 1;
const VISITLEVEL_TRANSITED = 2;
const VISITLEVEL_VISITED = 3;
const VISITLEVEL_LIVED = 4;
const VISITCOLOR_NONE = '#888';
const VISITCOLOR_WISHLIST = '#440';
const VISITCOLOR_TRANSITED = '#404';
const VISITCOLOR_VISITED = '#044';
const VISITCOLOR_LIVED = '#600';

//== Main Component ============================================================

  //-- Definition and Initialization ---------------
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itchy: false,
      itchyLevel: undefined,
    };
  }

  //-- Interaction ---------------------------------
  handleCompletion = () => {
    this.setState({itchy: false});
  }
  handleChangeVisit = (newVisitLevel) => {
    this.setState({
      itchy: true,
      itchyLevel: newVisitLevel,
    });
  }
  
  //-- Rendering -----------------------------------
  render() {
    // Get values from props
    const countryId = this.props.countryId;
    // Query Apollo for the currently focused country, and user visit data
    const countryQuery = QUERY_COUNTRYID_SCRATCHER;
    const countryVars = {id: countryId};
    const visitQuery = QUERY_USERVISITS_MODAL
    const visitVars = {id: this.props.displayId};
    return (
      <React.Fragment>
        <Query query={countryQuery} variables={countryVars}>{replyCountry => (
          // Query Apollo for the user's visit level to that country
          <Query query={visitQuery} variables={visitVars}>{replyVisit => {
            // Handling Loading State
            const loadingCountryCode = replyCountry.loading;
            const loadingVisit = replyVisit.loading;
            if(loadingCountryCode || loadingVisit) {
              return (<div>Loading</div>);
            }
            // Get values from Apollo replies
            const countryCode = replyCountry.data.countryById.code;
            const user = replyVisit.data.user;
            // Find user visit level to this country
            let visitLevel = VISITLEVEL_NONE;
            if(user) {
              const visitsToCountry = user.visits.filter(visit => {
                return visit.country.id === countryId;
              });
              if(visitsToCountry.length) {
                visitLevel = visitsToCountry[0].level;
              }
            }
            // Determine slider display level
            let displayLevel = this.state.itchyLevel;
            if(this.state.itchyLevel === undefined) {
              displayLevel = visitLevel;
            }
            // Display Scratchable Country and Visit Slider
            return (
              <React.Fragment>
                <div style={{ height: '200px' }}>
                  <Scratcher
                    scratchable={this.state.itchy}
                    destination={countryCode} 
                    colorOutline={'black'} 
                    colorScratch={'silver'} 
                    handleScratchAll={this.handleCompletion}
                  />
                </div>
                <VisitSlider
                  visitLevel={displayLevel}
                  disabled={this.props.disabled}
                  onChange={this.handleChangeVisit}
                />
              </React.Fragment>
            );
            //
          }}</Query>
        )}</Query>
      </React.Fragment>
    );
  }
}


//== Subcomponents and Utilities ===============================================

//-- Visit Slider ----------------------------------
function VisitSlider(props) {
  // If disabled, render nothing
  if(props.disabled) {
    return null;
  }
  //
  return (
    <input
      type="range"
      value={props.visitLevel}
      min={VISITLEVEL_NONE}
      max={VISITLEVEL_LIVED}
      onChange={(eventChange) => {
        const newValue = eventChange.currentTarget.value;
        props.onChange(newValue);
      }}
    />
  );
}


//== Scratcher =================================================================
/*
  Please add documentation detailing the purpose and use of this component.

  This component is named the same as a component on which it depends, leading
  to possible confusion. Ideally, this should be resolved by providing more
  descriptive names for each component.

  props to receive:
    userType(string) - self or friend, determines if scratcher is scratchable and if visit level and note can be edited
    countryId(string) - country that was clicked, needed for visit queries
    userId(string) - user (not necessarily the loggedin user) whose map & country data is being viewed

*/


//== Buttons ===================================================================

//-- Dependencies --------------------------------
import {
  MUTATION_CREATEVISIT_MODAL,
  MUTATION_UPDATEVISIT_MODAL,
} from '../../services/requests/modal';

//-- Types of buttons to display -----------------
/* buttonTypes: An array of objects used to configure buttons. There is one
  object per visit level. Visit levels should probably be defined as constants
  in an external file, and referenced by name in all dependent files. */
const buttonTypes = [
  {level: 1, color: 'pink', content: 'Wishlist'},
  {level: 2, color: 'yellow', content: 'Transited'},
  {level: 3, color: 'green', content: 'Visited'},
  {level: 4, color: 'blue', content: 'Lived'},
];

//------------------------------------------------
function makeButtons(mutation) {
  return buttonTypes.map(button => {
    let disabled = false;
    let handleClick;
    // Create buttons that create or update visits
    if(mutation) {
      handleClick = function (eventClick, data) {
        mutation(data);
      };
      /*
    // Create buttons that update visits
    } else if(updateVisit) {
      */
    // Create disabled buttons
    } else {
      disabled = true;
      handleClick = function () {};
    }
    return (
      <Button
        children={button.content}
        key={button.level}
        color={button.color}
        value={button.level}
        inverted
        disabled={disabled}
        onClick={handleClick}
      />
    );
  });
}

//-- Buttons Disabled ----------------------------
function DisabledButtons(props) {
  return (
    <Segment>
      {makeButtons()}
    </Segment>
  );
}

//-- Buttons Visit Create ------------------------
function CreateButtons(props) {
  let gqlMutation = MUTATION_CREATEVISIT_MODAL;
  return (
    <Segment>
      <Apollo.Mutation mutation={gqlMutation}>
        {(createVisit) => {
          const clickCallback = function (data) {
            createVisit({ variables: {
              userId: props.displayId,
              countryId: props.countryId,
              level: data.value,
            }});
          }
          return makeButtons(clickCallback);
        }}
      </Apollo.Mutation>
    </Segment>
  );
}

//-- Buttons Visit Update ------------------------
function UpdateButtons(props) {
  let scratched = false;
  let gqlMutation = MUTATION_UPDATEVISIT_MODAL;
  return (
    <Segment>
      <Apollo.Mutation mutation={gqlMutation}>
        {(updateVisit) => {
          const clickCallback = function (data) {
            if (scratched) {
              updateVisit({ variables: {id: props.visitId, level: data.value} });
              scratchingReset();
            } else {
              alert("Please scratch off country :)");
            }
          }
          return makeButtons(clickCallback);
        }}
      </Apollo.Mutation>
    </Segment>
  );
}
