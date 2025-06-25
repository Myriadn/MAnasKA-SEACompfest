import { supabase } from '@/supabase/client'

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

    const { data, error } = await supabase
      .from('testimonials')
      .insert([
        {
          name: testimonialData.name,
          review: testimonialData.review,
          rating: testimonialData.rating,
          user_id: testimonialData.user_id || null, // optional
        },
      ])
      .select()

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

    const { data, error } = await supabase
      .from('testimonials')
      .update({
        name: testimonialData.name,
        review: testimonialData.review,
        rating: testimonialData.rating,
      })
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
