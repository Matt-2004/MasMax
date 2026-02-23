const Footer = () => {
  return (
    <footer className='border-t mt-16' style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
      <div className='max-w-5xl mx-auto px-6 py-10'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6'>
          {/* Brand */}
          <div>
            <h2
              className='text-2xl font-bold font-roboto bg-clip-text text-transparent'
              style={{ backgroundImage: "linear-gradient(to right, var(--accent), var(--accent-light))" }}
            >
              MASMAX
            </h2>
            <p className='text-white/40 text-sm mt-1 font-roboto'>Your personal movie universe.</p>
          </div>
          {/* Links */}
          <div className='flex flex-wrap gap-x-5 gap-y-2 text-sm font-roboto text-white/50'>
            {['Movies', 'Series', 'Tickets', 'About'].map((link) => (
              <span
                key={link}
                className='hover:text-white cursor-pointer transition-colors duration-200'
                style={{ ["--tw-text-opacity" as string]: "1" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
        <div className='mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2' style={{ borderColor: "var(--border)" }}>
          <p className='text-white/25 text-xs font-roboto'>
            &copy; {new Date().getFullYear()} MasMax. All rights reserved.
          </p>
          <p className='text-white/25 text-xs font-roboto'>
            Powered by TMDB API
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
