export const getUser = async (username = 'emilys', password = 'emiliyspass') => {
  const user = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30, // optional, defaults to 60
    }),
    credentials: 'include', // Include cookies (e.g., accessToken) in the request
  })

  return await user.json()
}