

//== Scratch Handler, Combined Slider and Country Display ======================

//-- Dependencies --------------------------------
import React from 'react';
import Apollo from 'react-apollo';
import { QUERY_USERVISITS_MODAL } from '../../services/requests/modal';
import { 
  QUERY_COUNTRYID_SCRATCHER, 
  QUERY_USER_SCRATCHER,
  MUTATION_COMPLETE_SCRATCHER,
} from '../../services/requests/scratcher';
import ScratchCanvas from '../Scratcher/index.js';
import DisabledButtons from './DisabledButtons';
import UpdateButtons from './UpdateButtons';
import CreateButtons from './CreateButtons';

//-- React Implementation ------------------------
export default class extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Scratcher countryId={this.props.countryId} displayId={displayId} disabled={disabled} />
        <VisitSlider countryId={this.props.countryId} displayId={displayId} disabled={disabled} />
      </React.Fragment>
    );
  }
}


//== Level of Visit ============================================================
/*
  Please add documentation detailing the purpose and use of this component.

  Basic Function:
    query current userId
    query the visits for that user
    onClick = if the country they clicked on is === visit.country.id, if the country they clicked on is != visit.country.id, allow for change of level mutation
    warn user asking if they really want to change their level of visit
    if yes - allow for mutation to change level of visit after rescratch
    if no - do nothing
*/

//-- React Implementation ------------------------
function VisitSlider() {
  // If disabled, render several disabled buttons
  if(this.props.disabled) {
    return (
      <DisabledButtons />
    );
  }
  return (
    <React.Fragment>
      <Apollo.Query query={QUERY_USERVISITS_MODAL} variables={{ id: this.props.displayId }}>
      {({ loading, data: { user }}) => {
        // Check if user already has an existing visit, generate "Update Visit" buttons.
        let existing;
        if(user) {
          existing = user.visits.filter(visit => {
            return visit.country.id === this.props.countryId;
          });
        }
        if(existing.length > 0) {
          return (
            <UpdateButtons
              countryId={this.props.countryId}
              visitId={existing[0].id}
              displayId={this.props.displayId}
            />
          );
        }
        // Otherwise, generate "Create Visit" buttons
        return (
          <CreateButtons
            countryId={this.props.countryId}
            displayId={this.props.displayId}
          />
        );
      }}
      </Apollo.Query>
    </React.Fragment>
  );
}


//== Scratcher =================================================================
/*
  Please add documentation detailing the purpose and use of this component.

  This component is named the same as a component on which it depends, leading
  to possible confusion. Ideally, this should be resolved by providing more
  descriptive names for each component.
  
  Query country code from countryId props

  props to receive:
    userType(string) - self or friend, determines if scratcher is scratchable and if visit level and note can be edited
    countryId(string) - country that was clicked, needed for visit queries
    userId(string) - user (not necessarily the loggedin user) whose map & country data is being viewed

  props to give:  
    scratchable(boolean) - What kind of map to display. Options are:
      True - Display a scratchable map with flag overlay
      False - Display a simple colored map.
    destination(string) - An id, usually an ISO 3166-1 Alpha-3 code.
    colorOutline(string/color) - The map shape is outlined in this color.
    colorScratch(string/color) - Scratching the image reveals this color.
    handleScratchAll(function) - A callback to invoke once fully scratched.
    handleLoadingError(function) - A callback invoked if images can't load.

  PLEASE NOTE: do not rely on the above when using the MapScratcher component.
  Documentation for the MapScratcher is in its own index.js file, and the above
  may become out of date as that file changes.
*/

//-- React Implementation ------------------------
class Scratcher extends React.Component {
  render() {
    const { countryId, displayId, disabled } = this.props;
    let scratchable = !disabled;
    return (
      <div style={{height: '200px'}}>
        <Apollo.Query 
          query={QUERY_COUNTRYID_SCRATCHER}
          variables={{ id: countryId }}>
          {({ loading: loadingCountryCode, data: {countryById} }) => {
            return (
              <Apollo.Query 
                query={QUERY_USER_SCRATCHER} 
                variables={{ id: displayId }}>
              {({ loading: loadingUserSetting, data: {user} }) => {
                if (loadingCountryCode || loadingUserSetting) {
                  return <div>Loading</div>
                }
                if (!disabled && !user.scratchingAutomated) {
                  scratchable = true;
                }
                return (
                  <Apollo.Mutation mutation={MUTATION_COMPLETE_SCRATCHER}>
                    {(scratchingComplete) => (
                      <ScratchCanvas 
                      scratchable={scratchable}
                      destination={countryById.code} 
                      colorOutline={'lightsteelblue'} 
                      colorScratch={'lightsteelblue'} 
                      handleScratchAll={() => {
                        scratchingComplete();
                      }}
                      handleLoadingError={() => console.log('cannot load image')} 
                      style={{ height: '200px' }} />
                    )}
                  </Apollo.Mutation>
                );
              }}
              </Apollo.Query>
            );
          }}
        </Apollo.Query>
      </div>
    );
  }
}


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
