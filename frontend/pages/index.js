import Link from 'next/link';

export default () => (
  <div>
    <h1>Backpaca!</h1>
    <div>
      <Link href="/about">
        <a>About </a>
      </Link>
      <Link href="/users">
        <a>Users</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  </div>
);
