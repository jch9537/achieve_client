const server = "http://localhost:8000";

function api(url, method, body) {
  if (method === "GET") {
    return fetch(`${server}${url}`, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
      // credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.error) {
          return Promise.reject(res.error);
        } else {
          return res;
        }
      });
    //에러캐치 추가
  } else {
    return fetch(`${server}${url}`, {
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
        console.log("응답 ------------------------", res);
        if (res.error) {
          return Promise.reject(res.error);
        } else {
          return res;
        }
      });
    //에러캐치추가.catch(..)
  }
}

export default api;
