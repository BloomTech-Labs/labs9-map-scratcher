import Link from 'next/link'
import { Icon, Dropdown } from 'semantic-ui-react'

const logout =
  process.env.NODE_ENV === 'production'
    ? 'https://backpaca-yoga.herokuapp.com/api'
    : 'http://localhost:4000/api'

const MapDropDown = () => (
  <Dropdown icon="large user">
    <Dropdown.Menu>
      <Link href="/">
        <Dropdown.Item text="Home" icon="home" />
      </Link>
      <Link href="/settings">
        <Dropdown.Item text="Settings" icon="setting" href="/settings" />
      </Link>
      <Dropdown.Item text="Logout" icon="sign out" href={`${logout}/logout`} />
    </Dropdown.Menu>
  </Dropdown>
)

export default MapDropDown
