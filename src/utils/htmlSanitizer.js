import DOMPurify from 'dompurify'

/**
 * Utility to completely strip all HTML tags from a string
 *
 * This function first sanitizes the input with DOMPurify
 * and then extracts only the text content, ensuring no HTML
 * is stored in the database.
 *
 * @param {string} html - Input that may contain HTML
 * @returns {string} - Clean text with all HTML removed
 */
export const stripHtmlTags = (html) => {
  if (html === null || html === undefined) return ''

  // First sanitize with DOMPurify
  const sanitized = DOMPurify.sanitize(html)

  // Extract only the text content
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = sanitized
  return tempDiv.textContent || tempDiv.innerText || ''
}

/**
 * Sanitize an object's string properties by stripping HTML
 *
 * @param {Object} obj - Object with properties to sanitize
 * @param {string[]} excludeKeys - Optional array of keys to exclude from sanitization
 * @returns {Object} - Object with sanitized properties
 */
export const sanitizeObjectProperties = (obj, excludeKeys = []) => {
  const result = {}

  for (const [key, value] of Object.entries(obj)) {
    // Skip excluded keys or non-string values
    if (excludeKeys.includes(key) || typeof value !== 'string') {
      result[key] = value
      continue
    }

    // Strip HTML for string values
    result[key] = stripHtmlTags(value)
  }

  return result
}
