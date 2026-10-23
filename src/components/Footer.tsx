export function Footer() {
  return (
    <footer className="border-t border-neutral-800 px-4 py-6 text-center text-xs text-neutral-400">
      <p>
        This product uses the{" "}
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          TMDB
        </a>{" "}
        API but is not endorsed or certified by TMDB.
      </p>
      <p className="mt-1">
        Streaming availability data provided by{" "}
        <a
          href="https://www.justwatch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          JustWatch
        </a>
        .
      </p>
      <p className="mt-1">
        Built by Mustafa Al-Munajjed with Next.js, TypeScript &amp; Tailwind CSS
        ·{" "}
        <a
          href="https://github.com/Mostafa-Al-Monajjed/movie-explorer"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Source on GitHub
        </a>
      </p>
    </footer>
  );
}
