class UserApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserMe() {
    return fetch(`${this.baseUrl}/me`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  patchUserMe(age, avatar, email, name, sity) {
    return fetch(`${this.baseUrl}/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ age, avatar, email, name, sity }),
    }).then(this._checkResponse);
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

const usercApi = new UserApi({
  baseUrl: 'http://localhost:3000/users',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'content-type': 'application/json',
  },
});

export { usercApi };
