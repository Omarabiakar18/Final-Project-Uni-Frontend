export const URL = import.meta.env.VITE_BACKEND;

export async function postData(endPoint, data = {}) {
  let response = null;
  try {
    response = await fetch(`${URL}${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return [null, error.message];
  }
  if (response == null) {
    return [null, error.message];
  }
  try {
    const json = await response.json();
    if (!response.ok) {
      return [null, `${response.statusText} | ${json.message}`];
    }
    return [json, null];
  } catch (error) {
    console.error(error);
    return [null, `${response.status} ${response.statusText}`];
  }
}

export async function getData(endPoint) {
  let response = null;
  try {
    response = await fetch(`${URL}${endPoint}`);
  } catch (error) {
    return [null, error.message];
  }
  if (response == null) {
    return [null, error.message];
  }
  try {
    const json = await response.json();
    if (!response.ok) {
      return [null, `${response.statusText} | ${json.message}`];
    }
    return [json, null];
  } catch (error) {
    console.error(error);
    return [null, `${response.status} ${response.statusText}`];
  }
}
