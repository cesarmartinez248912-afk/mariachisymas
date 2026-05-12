import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

export function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
        {title}
      </h2>
      {description ? <p className="mt-4 text-sm leading-7 text-muted md:text-base">{description}</p> : null}
    </div>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export function Button({ className, children, asChild: _asChild, type, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type={type ?? 'button'}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold/70 disabled:opacity-60',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('w-full rounded-2xl border border-line bg-surface2 px-4 py-3 text-sm text-text outline-none placeholder:text-muted/60 focus:border-gold/60', props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn('w-full rounded-2xl border border-line bg-surface2 px-4 py-3 text-sm text-text outline-none placeholder:text-muted/60 focus:border-gold/60', props.className)} />;
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gold2">{children}</span>;
}
