import {withRouter} from 'next/router'

const Friends = withRouter((props) => (
    <div>
       <h1>{props.router.query.id}</h1>
       <p>This is the blog post content.</p>
    </div>
))

export default Friends