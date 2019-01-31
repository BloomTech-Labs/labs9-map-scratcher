

/*== Scratch Handler, Combined Slider and Country Display ======================

//-- Documentation -------------------------------

ScratchHandler is a react component which displays a scratchable map and a visit
level slider. Users can change the value of the slider to indicate the highest
form of visit they've had in a country, and then scratch off a map of that
country to finalize that value. It accepts the following props:

  disabled(boolean) - Whether or not the visit level is adjustable.
  countryId(string) - A GraphQL id, specifying the country.
  displayId(string) - The GraphQL id of the user having visited the country.
  
*/

//-- Dependencies --------------------------------
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  QUERY_COUNTRYID_SCRATCHER,
  QUERY_USER_SCRATCHER,
} from '../../services/requests/scratcher';
import {
  QUERY_USERVISITS_MODAL,
  MUTATION_CREATEVISIT_MODAL,
  MUTATION_UPDATEVISIT_MODAL,
} from '../../services/requests/modal';
import Scratcher from '../Scratcher/index.js';
import { colors } from '../Map/countryStyles.js';

//-- Project Constants ---------------------------
const VISITLEVEL_NONE = 0;
const VISITLEVEL_WISHLIST = 1;
const VISITLEVEL_TRANSITED = 2;
const VISITLEVEL_VISITED = 3;
const VISITLEVEL_LIVED = 4;


//== Main Component ============================================================

  //-- Definition and Initialization ---------------
export default class extends React.Component {
  constructor(props) {
    super(props);
    // "Itchy" means the user has tried to change state, but must scratch first.
    this.state = {
      itchy: false,
      itchyLevel: undefined,
    };
  }
  componentDidUpdate(previousProps) {
    // Resets to a "non-itchy" state when switching countries
    if(
      this.props.countryId !== previousProps.countryId ||
      this.props.displayId !== previousProps.displayId
    ) {
      this.setState({
        itchy: false,
        itchyLevel: undefined,
      });
    }
  }

  //-- Interaction ---------------------------------
  handleCompletion = (mutationInvocation, visitId) => {
    /* handleCompletion is called whenever the user completes scratching the
    map. It is given two arguments, a function to invoke in order to perform a
    mutation, and a flag (createNewVisit) which determines if the mutation is a
    creation or an update. Once it returns the map will no longer be "itchy". */
    let mutationData;
    // Handle new visit mutations (user has never scratched country)
    if(!visitId) {
      mutationData = {
        variables: {
          userId: this.props.displayId,
          countryId: this.props.countryId,
          level: this.state.itchyLevel,
        }
      };
    // Handle update visit mutations (user already has data for country)
    } else {
      mutationData = {
        variables: {
          id: visitId,
          level: this.state.itchyLevel,
        }
      };
    }
    // Execute the mutation
    mutationInvocation(mutationData)
    // Put scratcher back in default state
    this.setState({itchy: false});
  }
  handleChangeVisit = (newVisitLevel) => {
    /* handleChangeVisist is called whenever the user changes the visit level
    using the slider. It makes the map "itchy" but does not perform a mutation.
    */
    this.setState({
      itchy: true,
      itchyLevel: newVisitLevel,
    });
  }
  
  //-- Rendering -----------------------------------
  render() {
    // Query Apollo for the currently focused country, user visit data, and user
    const countryQuery = QUERY_COUNTRYID_SCRATCHER;
    const countryVars = {id: this.props.countryId};
    const visitQuery = QUERY_USERVISITS_MODAL
    const visitVars = {id: this.props.displayId};
    const userQuery = QUERY_USER_SCRATCHER;
    const userVars = {id: this.props.displayId};
    return (
      <React.Fragment>
        <Query query={countryQuery} variables={countryVars}>{replyCountry => (
          <Query query={visitQuery} variables={visitVars}>{replyVisit => (
            <Query query={userQuery} variables={userVars}>{replyUser => {
              // Handling Loading State
              const loadingCountryCode = replyCountry.loading;
              const loadingVisit = replyVisit.loading;
              const loadingUserSettings = replyUser.loading;
              if(loadingCountryCode || loadingVisit || loadingUserSettings) {
                return (<div>Loading</div>);
              }
              // Get values from Apollo replies
              const countryCode = replyCountry.data.countryById.code;
              const user = replyVisit.data.user;
              const autoScratch = replyUser.data.user.scratchingAutomated;
              // Find user visit level to this country
              let visitLevel = VISITLEVEL_NONE;
              let visitId;
              if(user) {
                const visitsToCountry = user.visits.filter(visit => {
                  return (visit.country.id === this.props.countryId);
                });
                if(visitsToCountry.length) {
                  visitId = visitsToCountry[0].id;
                  visitLevel = visitsToCountry[0].level;
                }
              }
              // Determine slider display level
              let displayLevel = this.state.itchyLevel;
              if(this.state.itchyLevel === undefined) {
                displayLevel = visitLevel;
              }
              // Determine scratcher background color
              let colorOutline = colors[displayLevel];
              // Determine Mutation type
              let gqlMutation = MUTATION_CREATEVISIT_MODAL;
              if(visitId) {
                gqlMutation = MUTATION_UPDATEVISIT_MODAL;
              }
              // Display Scratchable Country and Visit Slider
              return (
                <React.Fragment>
                  <Mutation mutation={gqlMutation}>{mutationInvocation => (
                    <Scratcher
                      scratchable={this.state.itchy}
                      destination={countryCode} 
                      colorOutline={colorOutline} 
                      colorScratch={'silver'}
                      automateScratching={autoScratch}
                      handleScratchAll={() => {
                        this.handleCompletion(mutationInvocation, visitId);
                      }}
                    />
                  )}</Mutation>
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
        )}</Query>
      </React.Fragment>
    );
  }
}


//== Subcomponents and Utilities ===============================================

/*-- Visit Slider ----------------------------------
  The slider expects the following props:
    onChange(function): a function to invoke when a new visit level is selected
    visitLevel(number): The current visit level selected, or from the database
    disabled(boolean): Whether or not to display the slider
*/
function VisitSlider(props) {
  // If disabled, render nothing
  if(props.disabled) {
    return null;
  }
  // Render a basic slider
  return (
    <input
      type="range"
      value={props.visitLevel}
      min={VISITLEVEL_NONE}
      max={VISITLEVEL_LIVED}
      onChange={(eventChange) => {
        const newValue = Number(eventChange.currentTarget.value);
        props.onChange(newValue);
      }}
    />
  );
}
