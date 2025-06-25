import { supabase } from '@/supabase/client'

export const MealPlanService = {
  // Mengambil semua meal plans
  async getAllMealPlans() {
    const { data, error } = await supabase.from('meal_plans').select('*, meal_plan_details(*)')

    if (error) throw error

    // Transform data format jika diperlukan
    const formattedData = data.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: `Rp${plan.price_per_meal.toLocaleString()} / meal`,
      priceValue: plan.price_per_meal,
      description: plan.description,
      image: plan.image_url,
      details: plan.meal_plan_details ? plan.meal_plan_details.map((detail) => detail.detail) : [],
    }))

    return formattedData
  },

  // Mengambil meal plan berdasarkan ID
  async getMealPlanById(id) {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*, meal_plan_details(*)')
      .eq('id', id)
      .single()

    if (error) throw error

    // Transform data format
    return {
      id: data.id,
      name: data.name,
      price: `Rp${data.price_per_meal.toLocaleString()} / meal`,
      priceValue: data.price_per_meal,
      description: data.description,
      image: data.image_url,
      details: data.meal_plan_details ? data.meal_plan_details.map((detail) => detail.detail) : [],
    }
  },

  // Menambahkan meal plan baru (untuk admin)
  async addMealPlan(mealPlanData) {
    // Insert meal plan
    const { data: mealPlan, error } = await supabase
      .from('meal_plans')
      .insert([
        {
          name: mealPlanData.name,
          price_per_meal: mealPlanData.priceValue,
          description: mealPlanData.description,
          image_url: mealPlanData.image,
        },
      ])
      .select()

    if (error) throw error

    // Insert meal plan details
    if (mealPlanData.details && mealPlanData.details.length > 0) {
      const detailsToInsert = mealPlanData.details.map((detail) => ({
        meal_plan_id: mealPlan[0].id,
        detail: detail,
      }))

      const { error: detailsError } = await supabase
        .from('meal_plan_details')
        .insert(detailsToInsert)

      if (detailsError) throw detailsError
    }

    return mealPlan[0]
  },

  // Update meal plan (untuk admin)
  async updateMealPlan(id, mealPlanData) {
    // Update meal plan
    const { data: updatedPlan, error } = await supabase
      .from('meal_plans')
      .update({
        name: mealPlanData.name,
        price_per_meal: mealPlanData.priceValue,
        description: mealPlanData.description,
        image_url: mealPlanData.image,
      })
      .eq('id', id)
      .select()

    if (error) throw error

    // Delete existing details
    const { error: deleteError } = await supabase
      .from('meal_plan_details')
      .delete()
      .eq('meal_plan_id', id)

    if (deleteError) throw deleteError

    // Insert new details
    if (mealPlanData.details && mealPlanData.details.length > 0) {
      const detailsToInsert = mealPlanData.details.map((detail) => ({
        meal_plan_id: id,
        detail: detail,
      }))

      const { error: detailsError } = await supabase
        .from('meal_plan_details')
        .insert(detailsToInsert)

      if (detailsError) throw detailsError
    }

    return updatedPlan[0]
  },

  // Delete meal plan (untuk admin)
  async deleteMealPlan(id) {
    // Delete meal plan details first (foreign key constraint)
    const { error: detailsError } = await supabase
      .from('meal_plan_details')
      .delete()
      .eq('meal_plan_id', id)

    if (detailsError) throw detailsError

    // Delete the meal plan
    const { error } = await supabase.from('meal_plans').delete().eq('id', id)

    if (error) throw error
    return true
  },
}
