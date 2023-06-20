import Link from 'next/link';

export default function Navbar() {
    return (
      <nav>
        <Link href="/">Database</Link>
        <Link href="/mydata">My Datasets</Link>
        <Link href="/documentation">Documentation</Link>
      </nav>
      );
    }