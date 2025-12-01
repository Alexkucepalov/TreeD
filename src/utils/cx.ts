import clsx from 'clsx';

/**
 * Utility function for combining class names
 * Wrapper around clsx for consistent API
 */
export function cx(...args: Parameters<typeof clsx>): string {
  return clsx(...args);
}



