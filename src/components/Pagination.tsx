import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  buildPageHref,
  getPageNumbers,
  type LinkParams,
} from "../app/lib/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  params: LinkParams;
}

const item =
  "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm transition-colors";
const idle =
  "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-yellow-400 hover:text-yellow-400";
const inactive = "pointer-events-none border-neutral-900 text-neutral-600";

export function Pagination({
  page,
  totalPages,
  basePath,
  params,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (target: number) => buildPageHref(basePath, params, target);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      {hasPrev ? (
        <Link
          href={hrefFor(page - 1)}
          aria-label="Previous page"
          className={`${item} ${idle}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span aria-hidden="true" className={`${item} ${inactive}`}>
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {/* موبايل: نص مختصر بدل الأرقام */}
      <span className="px-2 text-sm text-neutral-400 sm:hidden">
        Page {page} of {totalPages}
      </span>

      {/* الشاشات الأكبر: الأرقام كاملة */}
      <ul className="hidden items-center gap-2 sm:flex">
        {getPageNumbers(page, totalPages).map((entry, index) =>
          entry === "…" ? (
            <li
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="px-1 text-neutral-500"
            >
              …
            </li>
          ) : (
            <li key={entry}>
              <Link
                href={hrefFor(entry)}
                aria-label={`Page ${entry}`}
                aria-current={entry === page ? "page" : undefined}
                className={`${item} ${
                  entry === page
                    ? "border-yellow-400 bg-yellow-400 font-semibold text-black"
                    : idle
                }`}
              >
                {entry}
              </Link>
            </li>
          ),
        )}
      </ul>

      {hasNext ? (
        <Link
          href={hrefFor(page + 1)}
          aria-label="Next page"
          className={`${item} ${idle}`}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span aria-hidden="true" className={`${item} ${inactive}`}>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
