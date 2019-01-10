import Link from 'next/link';

export default () => (
  <div>
    <h1>Bacpaca!</h1>
    <div>
      <Link href="/about">
        <a>About </a>
      </Link>
      <Link href="/users">
        <a>Users</a>
      </Link>
    </div>
  </div>
);
