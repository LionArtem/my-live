class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  addUser(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  loginUser(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((err) => Promise.reject(JSON.parse(err)));
  };
}

const auth = new Auth({
  //baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.my-live.website',
  headers: { 'content-type': 'application/json' },
});

export { auth };
