import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center font-normal transition-colors duration-200 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]';

/* Apple's filled action is a true pill — border-radius: 980px — in a single
   blue, with no border, no shadow and no gradient. */
const variants: Record<Variant, string> = {
  primary:
    'rounded-pill bg-action text-on-action hover:bg-action-hover',
  secondary: 'text-accent hover:underline underline-offset-4',
};

const sizes: Record<Variant, Record<Size, string>> = {
  primary: { md: 'px-5 py-2 text-body', lg: 'px-[21px] py-3 text-lede' },
  secondary: { md: 'text-body', lg: 'text-lede' },
};

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[variant][size]} ${className}`.trim()}
    >
      {children}
      {variant === 'secondary' && (
        <span aria-hidden="true" className="ml-1">
          &rsaquo;
        </span>
      )}
    </Link>
  );
}
