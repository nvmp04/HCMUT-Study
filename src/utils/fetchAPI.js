export async function fetchAPI(url, method = "GET", content = null, auth = false) {
  try {
    const headers = {};
    const options = { method, headers };

    if (content && method.toUpperCase() !== "GET") {
      if (content instanceof FormData) {
        options.body = content;
      } 
      else{
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(content);
      }
    }

    if (auth) {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const res = await fetch(url, options);
    if (res.status === 401) {
      sessionStorage.clear(); 
      const err = new Error("Unauthorized - Token expired or invalid");
      err.status = 401;
      throw err;
    }
    if (!res.ok) {
      const errText = await res.text();
      const err = new Error(`Request failed: ${res.status} - ${errText}`);
      err.status = res.status;
      throw err;
    }
    if (res.status === 204) return null;
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (ct.includes("application/json")) {
      return await res.json();
    }
    return await res.text();
  } catch (err) {
    console.error("fetchAPI error:", err);
    throw err;
  }
}
