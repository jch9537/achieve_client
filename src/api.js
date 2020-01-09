const server = "http://localhost:8000";

function api(url, method, body) {
  return fetch(`${server}/${url}`, {
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    // credentials: "include",
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        return Promise.reject(res.error);
      } else {
        return res;
      }
    });
}

export default api;
