import { twMerge } from 'tailwind-merge';

/**
 * Small utility to format long classnames with template literals
 * and fixes tailwind classes by removing duplicates.
 * Original idea from @netlify/classnames-template-literals
 *
 * Usage:
 * ```
 * ctl(`
 *   text-red-500
 *   p-1
 * ` ${someState && "bg-pink"}
 * )
 * ```
 * @param template
 * @returns fixed classes string
 */
export const ctl = (template: string) => {
  // remove all line breaks and extra spaces
  // and remove all false, true and undefined values (coming form conditionals)
  const trimmedClassnames = template.replace(/\s+/gm, ' ');
  const formattedClassnames = trimmedClassnames
    .split(' ')
    .filter((c) => c !== 'false' && c !== 'true' && c !== 'undefined')
    .join(' ')
    .trim();

  // Fixes tailwind classes by removing duplicates
  // https://github.com/dcastil/tailwind-merge/blob/v1.12.0/docs/what-is-it-for.md
  return twMerge(formattedClassnames);
};
