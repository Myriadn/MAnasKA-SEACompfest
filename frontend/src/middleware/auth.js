import { supabase } from '@/supabase/client'
import { verifyCsrfToken } from './csrf'

export const authGuard = async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin)

  // Skip auth check for login and register pages to prevent redirect loops
  if (to.path === '/login' || to.path === '/register') {
    next()
    return
  }

  // CSRF Protection for routes that require it
  if (['POST', 'PUT', 'DELETE'].includes(to.meta.method)) {
    const csrfToken = to.query.csrf_token || to.params.csrf_token
    if (!csrfToken || !verifyCsrfToken(csrfToken)) {
      console.error('CSRF token verification failed')
      next('/error?code=403')
      return
    }
  }

  try {
    // Get session first to check if we have an active session
    const { data: sessionData } = await supabase.auth.getSession()
    const session = sessionData?.session

    // Only proceed with getUser if we have an active session
    let user = null
    if (session) {
      const { data: userData } = await supabase.auth.getUser()
      user = userData?.user
    }

    // Routes requiring authentication
    if (requiresAuth && !user) {
      next('/login')
      return
    }

    // Routes requiring admin access
    if (requiresAdmin && user) {
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()

        if (profileError || !profile?.is_admin) {
          next('/')
          return
        }
      } catch (e) {
        console.error('Admin check error:', e)
        next('/')
        return
      }
    } else if (requiresAdmin) {
      // No user but admin is required
      next('/login')
      return
    }

    next()
  } catch (error) {
    console.error('Auth error:', error)

    // If route requires authentication, redirect to login
    if (requiresAuth || requiresAdmin) {
      next('/login')
    } else {
      // For public routes, continue anyway
      next()
    }
  }
}
