import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: userApi.fetchProfile,
    staleTime: 5 * 60 * 1000
  })
}

export default useQueryProfile
