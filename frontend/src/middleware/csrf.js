// CSRF token implementation using browser-compatible methods
// This replaces the crypto-browserify dependency which causes Buffer errors

/**
 * Generates a secure random string for use as CSRF token
 * @returns {string} A random token
 */
function generateRandomString(length = 32) {
  const array = new Uint8Array(length)
  window.crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

// Generate CSRF token
export const generateCsrfToken = () => {
  const token = generateRandomString(32)

  // Store token in a secure, HttpOnly cookie
  document.cookie = `csrf-token=${token}; SameSite=Strict; path=/`

  return token
}

// Verify CSRF token
export const verifyCsrfToken = (reqToken) => {
  if (!reqToken) return false

  // Get token from cookies
  const cookies = document.cookie.split(';')
  const csrfCookie = cookies.find((cookie) => cookie.trim().startsWith('csrf-token='))

  if (!csrfCookie) return false

  const storedToken = csrfCookie.split('=')[1].trim()
  return storedToken === reqToken
}

// Helper function to get CSRF token from cookies
export const getCsrfToken = () => {
  const cookies = document.cookie.split(';')
  const csrfCookie = cookies.find((cookie) => cookie.trim().startsWith('csrf-token='))

  if (!csrfCookie) return null

  return csrfCookie.split('=')[1].trim()
}
