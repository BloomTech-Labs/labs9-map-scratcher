import Link from 'next/link';

import WorldMap from '../components/Map/Map';

export default () => (
  <div>
    <h1>Map?</h1>
    <WorldMap />
    <p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </p>
  </div>
);
