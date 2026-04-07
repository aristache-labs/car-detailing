'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const triggerClass =
  'min-h-[2.75rem] w-full items-center rounded-sm border border-[rgba(201,168,76,0.12)] bg-[rgba(6,6,8,0.88)] px-3.5 py-2.5 text-[13px] text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-[border-color,background-color,box-shadow] [color-scheme:dark] hover:border-[rgba(201,168,76,0.2)] focus:border-[#a88b42] focus:ring-1 focus:ring-[#C9A84C]/20';

export type DarkSelectOption = { value: string; label: string };

/** Custom listbox — same UX as Contact form; avoids the OS native select menu styling. */
export default function DarkSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly DarkSelectOption[];
  placeholder: string;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listId = `${id}-listbox`;
  const instanceId = useId();
  const describedBy = error ? `${id}-error` : undefined;
  const selectedIndex = useMemo(() => options.findIndex((option) => option.value === value), [options, value]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const targetIndex = activeIndex >= 0 ? activeIndex : selectedIndex >= 0 ? selectedIndex : 0;
    window.requestAnimationFrame(() => optionRefs.current[targetIndex]?.focus());
  }, [activeIndex, open, selectedIndex]);

  const display = options.find((o) => o.value === value)?.label ?? placeholder;
  const showPlaceholderStyle = value === '' && !options.some((o) => o.value === '');

  function closeAndRestoreFocus() {
    setOpen(false);
    setActiveIndex(-1);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function selectByIndex(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    closeAndRestoreFocus();
  }

  function moveActive(nextIndex: number) {
    if (options.length === 0) return;
    const normalized = (nextIndex + options.length) % options.length;
    setActiveIndex(normalized);
    optionRefs.current[normalized]?.focus();
  }

  function openMenu(preferredIndex = selectedIndex >= 0 ? selectedIndex : 0) {
    setActiveIndex(preferredIndex);
    setOpen(true);
  }

  return (
    <div className="relative" ref={wrapRef}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        ref={triggerRef}
        className={`${triggerClass} flex w-full cursor-pointer items-center justify-between gap-2 text-left`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-describedby={describedBy}
        onClick={() => {
          if (open) {
            setOpen(false);
            setActiveIndex(-1);
          } else {
            openMenu();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!open) {
              openMenu(selectedIndex >= 0 ? selectedIndex : 0);
              return;
            }
            moveActive(activeIndex + (event.key === 'ArrowDown' ? 1 : -1));
          }
          if (event.key === 'Home' && open) {
            event.preventDefault();
            moveActive(0);
          }
          if (event.key === 'End' && open) {
            event.preventDefault();
            moveActive(options.length - 1);
          }
          if ((event.key === 'Enter' || event.key === ' ') && !open) {
            event.preventDefault();
            openMenu();
          }
          if (event.key === 'Escape' && open) {
            event.preventDefault();
            closeAndRestoreFocus();
          }
        }}
        style={
          error
            ? { borderColor: 'rgba(251, 191, 36, 0.45)', boxShadow: '0 0 0 1px rgba(251, 191, 36, 0.2)' }
            : undefined
        }
      >
        <span className={showPlaceholderStyle ? 'text-white/38' : undefined}>{display}</span>
        <ChevronDown
          className={`h-[18px] w-[18px] shrink-0 text-[#c9a84c]/80 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.85}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-60 mt-1 max-h-60 overflow-auto rounded-sm border border-[rgba(201,168,76,0.12)] bg-[#0a0a0e] py-1 shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {options.map((opt, index) => (
            <li key={opt.value === '' ? '__empty' : opt.value} role="presentation">
              <button
                type="button"
                id={`${instanceId}-option-${index}`}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                role="option"
                aria-selected={value === opt.value}
                tabIndex={activeIndex === index ? 0 : -1}
                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                  value === opt.value
                    ? 'bg-[#C9A84C]/15 text-[#f0d892]'
                    : 'text-white/90 hover:bg-white/6'
                }`}
                onClick={() => {
                  selectByIndex(index);
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    moveActive(index + 1);
                  }
                  if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    moveActive(index - 1);
                  }
                  if (event.key === 'Home') {
                    event.preventDefault();
                    moveActive(0);
                  }
                  if (event.key === 'End') {
                    event.preventDefault();
                    moveActive(options.length - 1);
                  }
                  if (event.key === 'Escape') {
                    event.preventDefault();
                    closeAndRestoreFocus();
                  }
                  if (event.key === 'Tab') {
                    setOpen(false);
                  }
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
