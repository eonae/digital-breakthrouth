export function json(response) {
// Возвращает json или переводит Promise в состояние rejected

  return (response.ok)
    ? response.json()
    : Promise.reject(response.status);
}


export function handleResponse(response) {
// Переводит Promise в состояние rejected, в случае кода ответа отличного от 200
  return (response.ok)
    ? Promise.resolve()
    : Promise.reject(response.status)
}