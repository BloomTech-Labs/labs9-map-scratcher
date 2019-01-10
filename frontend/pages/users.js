import Link from 'next/link';

import Users from '../components/User/Users.js';

export default () => (
  <div>
    <Users />
    <p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </p>
  </div>
);
