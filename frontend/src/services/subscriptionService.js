import { supabase } from '@/supabase/client'

export const SubscriptionService = {
  async createSubscription(data) {
    // Create a public access key to bypass RLS
    const { error } = await supabase.from('subscriptions').insert([
      {
        name: data.name,
        phone: data.phone,
        plan: data.plan,
        meal_types: data.mealTypes,
        days: data.days,
        allergies: data.allergies,
        total_price: data.totalPrice,
      },
    ])

    if (error) throw new Error(error.message)
    return true
  },

  async getSubscriptions() {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data
  },
}
