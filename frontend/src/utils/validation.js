// Validasi universal untuk semua form
export const validateInput = (input, type = 'text') => {
  if (!input && input !== 0) throw new Error('Input tidak boleh kosong')

  // Sanitisasi dasar
  let sanitized = String(input).replace(/</g, '&lt;').replace(/>/g, '&gt;').trim()

  // Validasi khusus berdasarkan tipe
  switch (type) {
    case 'email': {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(sanitized)) {
        throw new Error('Format email tidak valid')
      }
      break
    }

    case 'password': {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (!passwordRegex.test(sanitized)) {
        throw new Error('Password harus mengandung huruf besar, kecil, angka, dan simbol')
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
  }

  return sanitized
}

// Fungsi untuk menangani form submission dengan validasi
export const handleFormSubmit = async (formData, schema, submitFn) => {
  try {
    // Validasi semua field
    const validatedData = {}
    for (const [key, value] of Object.entries(formData)) {
      const fieldType = schema[key] || 'text'
      validatedData[key] = validateInput(value, fieldType)
    }

    // Eksekusi fungsi submit
    return await submitFn(validatedData)
  } catch (error) {
    console.error('Validation error:', error.message)
    return { success: false, error: error.message }
  }
}
