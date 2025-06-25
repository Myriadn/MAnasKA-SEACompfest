import { supabase } from '@/supabase/client'
import DOMPurify from 'dompurify'

// Helper function to completely strip HTML tags
const stripHtmlTags = (html) => {
  if (!html) return ''
  // First sanitize with DOMPurify
  const sanitized = DOMPurify.sanitize(html)
  // Then extract only the text content
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = sanitized
  return tempDiv.textContent || tempDiv.innerText || ''
}

export const TestimonialService = {
  // Mengambil semua testimonial
  async getAllTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Menambahkan testimonial baru
  async addTestimonial(testimonialData) {
    // Validate rating is between 1-5 to match DB constraint
    if (!testimonialData.rating || testimonialData.rating < 1 || testimonialData.rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    // Strip HTML tags from text inputs
    const cleanData = {
      name: stripHtmlTags(testimonialData.name),
      review: stripHtmlTags(testimonialData.review),
      rating: testimonialData.rating,
      user_id: testimonialData.user_id || null, // optional
    }

    const { data, error } = await supabase.from('testimonials').insert([cleanData]).select()

    if (error) throw error
    return data[0]
  },

  // Mengambil testimonial terbaru dengan limit
  async getLatestTestimonials(limit = 5) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Menghapus testimonial (untuk admin)
  async deleteTestimonial(id) {
    const { error } = await supabase.from('testimonials').delete().eq('id', id)

    if (error) throw error
    return true
  },

  // Update testimonial (untuk admin atau pemilik)
  async updateTestimonial(id, testimonialData) {
    // Validate rating is between 1-5 to match DB constraint
    if (!testimonialData.rating || testimonialData.rating < 1 || testimonialData.rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    // Strip HTML tags from text inputs
    const cleanData = {
      name: stripHtmlTags(testimonialData.name),
      review: stripHtmlTags(testimonialData.review),
      rating: testimonialData.rating,
    }

    const { data, error } = await supabase
      .from('testimonials')
      .update(cleanData)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  // Mengambil testimonial untuk user tertentu
  async getUserTestimonials(userId) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },
}
