import Link from 'next/link';

import Blank from '../components/Map/Blank';

export default () => (
  <div>
    <h1>About</h1>
    <p>
      Bacpaca is an web application that allows users to brag about their travel experiences and
      plan future adventures with their friends.
    </p>
    <Blank />
    <p>
      <Link prefetch href="/">
        <a>Home</a>
      </Link>
    </p>
  </div>
);
