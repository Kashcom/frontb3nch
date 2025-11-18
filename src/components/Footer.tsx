import Link from 'next/link';

const links = [
  { title: 'About', items: ['Mission', 'Team', 'Press'] },
  { title: 'Contact', items: ['Support', 'Community', 'FAQs'] },
  { title: 'GitHub', items: ['Issues', 'Roadmap', 'Contribute'] },
];

const Footer = () => (
  <footer className="bg-slate-900 text-slate-100">
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 text-center sm:text-left md:grid-cols-3">
      {links.map((column) => (
        <div key={column.title}>
          <p className="text-lg font-semibold">{column.title}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {column.items.map((item) => (
              <li key={item}>
                <Link href="#" className="transition hover:text-accent">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </footer>
);

export default Footer;
