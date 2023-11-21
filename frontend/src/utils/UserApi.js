class UserApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserMe(token) {
    return fetch(`${this.baseUrl}/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || token}`,
        'content-type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  getUserId(id) {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  patchUserMe(age, email, name, town, gender, params) {
    const token = params;
    return fetch(`${this.baseUrl}/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ age, email, name, town, gender }),
    }).then(this._checkResponse);
  }

  addAvatar(file, token) {
    return fetch(`${this.baseUrl}/add-file`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || token}`,
      },
      body: file,
    }).then(this._checkResponse);
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((err) => Promise.reject(JSON.parse(err)));
  };
}

const usersApi = new UserApi({
  baseUrl: 'http://localhost:3001/users',
  // baseUrl: 'https://api.my-live.website/users',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'content-type': 'application/json',
  },
});

export { usersApi };
