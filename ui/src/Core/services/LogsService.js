
export async function getAllLogs() {

  try {
    const response = await fetch('/api/logs');
    return await response.json();
  } catch (error) {
    return [];
  }

}

export async function createLog(data) {
  const response = await fetch(`/api/logs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: data })
  })
  return await response.json();
}