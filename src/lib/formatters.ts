/**
 * Text and typography formatting utilities for Smart-Fest.
 * Follows the Editorial Standard: names, titles, and proper nouns in canonical Title Case.
 */

/**
 * Formats a person's name into canonical Title Case (e.g. "iker méndez" -> "Iker Méndez").
 * Handles uppercase, lowercase, punctuation from email fallbacks, and extra whitespace.
 *
 * @param rawName The raw string containing the name.
 * @param fallback Default string if name is empty or undefined.
 * @returns Formatted name in Title Case.
 */
export function formatPersonName(rawName?: string | null, fallback: string = 'Anfitrión'): string {
  if (!rawName || typeof rawName !== 'string' || !rawName.trim()) {
    return fallback;
  }

  // Clean email-like separators (e.g. "iker.mendez" or "iker_mendez" -> "iker mendez")
  const cleaned = rawName.replace(/[._-]+/g, ' ').trim();
  if (!cleaned) return fallback;

  return cleaned
    .split(/\s+/)
    .map((word) => {
      if (!word) return '';
      // Capitalize first letter, lowercase the rest (handling Spanish accents / ñ)
      return word.charAt(0).toLocaleUpperCase('es-ES') + word.slice(1).toLocaleLowerCase('es-ES');
    })
    .join(' ');
}
