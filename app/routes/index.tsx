import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Search Params Sort</h1>
      <p>
        <Link to="/table">View Demo Route</Link>
      </p>
    </div>
  );
}
