// Enhanced input validation middleware with DOMPurify

import DOMPurify from 'dompurify'

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

  // Use DOMPurify for better XSS protection
  if (type !== 'password') {
    sanitized = DOMPurify.sanitize(sanitized).trim()
  }

  // Type-specific validations
  switch (type) {
    case 'email': {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(sanitized)) {
        throw new Error('Format email tidak valid')
      }
      break
    }

    case 'password': {
      // Only validate format, don't sanitize passwords
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (!passwordRegex.test(input)) {
        // Use original input for password
        throw new Error(
          'Password harus memiliki minimal 8 karakter dengan huruf besar, kecil, angka, dan simbol',
        )
      }
      // Return original password, as sanitizing it would change it
      return input
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
