const fetcher = async (url) => {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    if (contentType.includes('application/json')) {
      try {
        const data = await response.json();
        message = data?.message || JSON.stringify(data);
      } catch {}
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  if (contentType.includes('application/json')) {
    return response.json();
  }

  // Not JSON (likely HTML from redirects). Return null to keep UI stable.
  return null;
};

export default fetcher;
