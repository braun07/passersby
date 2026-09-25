import type { User } from '../types/User'

interface UsersResponse {
  results: User[]
}

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch('https://randomuser.me/api/?results=12', {
    signal,
  })

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  const data: UsersResponse = await response.json()
  return data.results
}
