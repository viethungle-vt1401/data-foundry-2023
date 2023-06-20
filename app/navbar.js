import Link from 'next/link';

const Navbar = () => {
    return (
      <nav>
        <Link href="/">Database</Link>
        <Link href="/mydata">My Datasets</Link>
        <Link href="/documentation">Documentation</Link>
      </nav>
      );
    }
  
export default Navbar;