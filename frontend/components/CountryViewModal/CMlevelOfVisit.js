import React, { Fragment } from 'react'
import { Button, Segment, Confirm } from 'semantic-ui-react'
import { Query, Mutation } from 'react-apollo';
import { QUERY_CLIENT_PROFILE, QUERY_USERVISITS_TRAVELS, MUTATION_UPDATEVISIT_MODAL } from '../../services/requests';

export default class LevelOfVisitButtons extends React.Component {


    render() {
        return (
        <Query query={QUERY_CLIENT_PROFILE}>
        {({ loading, error, data: { userId } }) => {
            //grab the userId on the client
            // console.log(userId)
            return(
                <Query query={QUERY_USERVISITS_TRAVELS} variables={{ id: userId }}>
                {({ loading, error, data }) => {
                    //get the visit object
                    // console.log(data.user.visits)
                    return (
                    <Segment>
                        <Button onClick={() => {
                            // data.user.visits.forEach(elem => {
                                // if(elem.country.id === 'cjqy9e28y00i20840rwy5l1ti') {
                                    <Mutation 
                                    mutation={MUTATION_UPDATEVISIT_MODAL} 
                                    variables={{ id: 'cjr0df1mj004a0847kcpix1y6', level: '1' }}>
                                    { updateVisit => {
                                        console.log(updateVisit)
                                    } }
                                    
                                    </Mutation>
                                // }
                            // })
                        }} inverted color='pink' style={{width: '23%', fontSize: '.55rem'}}>
                        Wishlist
                        </Button>
                        <Button inverted color='yellow'  style={{width: '23%', fontSize: '.55rem'}}>
                            Transited
                        </Button>
                        <Button inverted color='green'  style={{width: '23%', fontSize: '.55rem'}}>
                            Visited
                        </Button>
                        <Button inverted color='blue'  style={{width: '23%', fontSize: '.55rem'}}>
                            Lived
                        </Button>
                    </Segment>
                    )
                }}   
                        
                </Query>)  
        }}
        </Query>)
    }
}

//query current userId
//query the visits for that user
//onClick = if the country they clicked on is === visit.country.id, if the country they clicked on is != visit.country.id, allow for change of level mutation
//warn user asking if they really want to change their level of visit
//if yes - allow for mutation to change level of visit after rescratch
//if no - do nothing
