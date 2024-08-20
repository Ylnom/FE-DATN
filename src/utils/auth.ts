export const setTypeLoginToLocalStorage = (type: 'client' | 'admin') => {
  localStorage.setItem('type', type)
}

export const setAccessTokenLocalToStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLocalStorage = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const setProfileLocalStorage = (profile: UserProfile) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLocalStorage = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : ''
}

export const getTypeLoginFromLocalStorage = () => {
  return localStorage.getItem('type') || ''
}

export const clearLocalStorage = () => {
  localStorage.clear()
  // localStorage.removeItem('access_token')
  // localStorage.removeItem('refresh_token')
  // localStorage.removeItem('profile')
}
