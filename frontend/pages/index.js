import Link from 'next/link';

export default () => (
  <div>
    <h1>Bacpaca!</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/map">
        <a>Map</a>
      </Link>
    </p>
  </div>
);
