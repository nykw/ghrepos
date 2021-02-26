import Link from 'next/link';

const Footer = () => (
  <footer className="h-20">
    <div className="text-center mt-2">
      Created by{' '}
      <Link href="https://github.com/nykw">
        <a>nykw</a>
      </Link>
      .
    </div>
  </footer>
);

export default Footer;
