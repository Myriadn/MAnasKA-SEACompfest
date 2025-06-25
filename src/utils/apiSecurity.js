// API request interceptor for security
import { attachCsrfToken, generateCsrfToken } from '@/middleware/csrf'
import { supabase } from '@/supabase/client'

/**
 * Initialize security for API requests
 * This adds CSRF protection to Supabase requests
 */
export function initApiSecurity() {
  // Generate CSRF token on app initialization
  generateCsrfToken()

  // Add interceptor to Supabase REST client if available
  if (supabase.rest && typeof supabase.rest.interceptors === 'function') {
    // Add request interceptor to attach CSRF token to headers
    supabase.rest.interceptors((config) => {
      if (config.method !== 'GET') {
        config.headers = attachCsrfToken(config.headers)
      }
      return config
    })
  }

  // For fetch API or custom API calls
  const originalFetch = window.fetch
  window.fetch = function (url, options = {}) {
    // Only add CSRF token for non-GET requests
    if (options.method && options.method !== 'GET') {
      if (!options.headers) {
        options.headers = {}
      }

      // If headers is Headers object, convert to plain object
      if (options.headers instanceof Headers) {
        const plainHeaders = {}
        for (const [key, value] of options.headers.entries()) {
          plainHeaders[key] = value
        }
        options.headers = plainHeaders
      }

      options.headers = attachCsrfToken(options.headers)
    }

    return originalFetch(url, options)
  }
}

export default {
  initApiSecurity,
}
