import Link from 'next/link';

export default function Navbar() {
    return (
      <nav class="bg-hatteras px-2.5 py-2.5 font-sans text-sm font-bold">
        <Link href="/" class="text-duke-navy-blue hover:text-duke-royal-blue px-3.5">DATABASE</Link>
        <Link href="/mydata" class="text-duke-navy-blue hover:text-duke-royal-blue px-3.5">MY DATASETS</Link>
        <Link href="/documentation" class="text-duke-navy-blue hover:text-duke-royal-blue px-3.5">DOCUMENTATION</Link>
      </nav>
      );
    }