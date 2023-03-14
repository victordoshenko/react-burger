export const request = async (url: string): Promise<any> => {
  const res = await fetch(url)
  return checkResponse(res)
}

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`)
}
