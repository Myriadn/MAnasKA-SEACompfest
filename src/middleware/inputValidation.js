// Enhanced input validation middleware with DOMPurify

import DOMPurify from 'dompurify'

// Configure DOMPurify for maximum protection
DOMPurify.setConfig({
  FORBID_TAGS: ['script', 'style', 'iframe', 'frame', 'object', 'embed', 'form'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onsubmit', 'formaction'],
  ADD_URI_SAFE_ATTR: ['target'],
  WHOLE_DOCUMENT: true,
  SANITIZE_DOM: true,
  RETURN_DOM_TEXT: true, // This option makes DOMPurify return only text content
})

/**
 * Helper function to completely strip HTML tags
 * @param {string} html - Input that may contain HTML
 * @returns {string} - Plain text with all HTML removed
 */
const stripHtmlTags = (html) => {
  if (html === null || html === undefined) return ''

  // First sanitize with DOMPurify
  const sanitized = DOMPurify.sanitize(html)

  // Extract only the text content
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = sanitized
  return tempDiv.textContent || tempDiv.innerText || ''
}

/**
 * Comprehensive input validation and sanitization
 * @param {*} input - The input to validate and sanitize
 * @param {string} type - Type of input (text, email, password, phone, etc.)
 * @returns {string} - Sanitized input
 */
export const validateInput = (input, type = 'text') => {
  // Handle null/undefined inputs
  if (input === null || input === undefined) {
    if (type === 'optional') return ''
    throw new Error('Input tidak boleh kosong')
  }

  // Convert to string for consistency
  let sanitized = String(input)

  // For password, don't sanitize as it would alter the actual password
  if (type === 'password') {
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(sanitized)) {
      throw new Error(
        'Password harus memiliki minimal 8 karakter dengan huruf besar, kecil, angka, dan simbol',
      )
    }
    return sanitized // Return original password without sanitization
  }

  // For all other inputs, prevent common XSS patterns first
  sanitized = sanitized
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')

  // Completely strip all HTML tags for maximum safety
  sanitized = stripHtmlTags(sanitized).trim()

  // Type-specific validations
  switch (type) {
    case 'email': {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(sanitized)) {
        throw new Error('Format email tidak valid')
      }
      break
    }

    case 'phone': {
      const phoneRegex = /^[0-9]{10,15}$/
      if (!phoneRegex.test(sanitized)) {
        throw new Error('Nomor telepon harus 10-15 digit angka')
      }
      break
    }

    case 'name': {
      if (sanitized.length < 2) {
        throw new Error('Nama harus memiliki minimal 2 karakter')
      }
      // Allow only letters, spaces, and common name characters
      sanitized = sanitized.replace(/[^a-zA-Z0-9 .'_-]/g, '')
      break
    }
  }

  return sanitized
}

/**
 * Validate and process an entire form
 * @param {Object} formData - Form data to validate
 * @param {Object} schema - Schema defining types for each field
 * @param {Function} submitFn - Function to call with validated data
 * @returns {Promise<Object>} - Result of submission
 */
export const validateForm = async (formData, schema, submitFn) => {
  try {
    // Validasi semua field
    const validatedData = {}

    for (const [key, value] of Object.entries(formData)) {
      const fieldType = schema[key] || 'text'
      validatedData[key] = validateInput(value, fieldType)
    }

    // Execute submission function
    return await submitFn(validatedData)
  } catch (error) {
    console.error('Validation error:', error.message)
    return { success: false, error: error.message }
  }
}
