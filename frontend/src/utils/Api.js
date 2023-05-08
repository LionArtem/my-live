class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // getPaginationPage(currentPage) {
  //   return fetch(`${this.baseUrl}?page=${currentPage}&limit=10`, {
  //     headers: this.headers,
  //   }).then(this._checkResponse);
  // }

  // getAllMessage() {
  //   return fetch(this.baseUrl, {
  //     headers: this.headers,
  //   }).then(this._checkResponse);
  // }

  // deletePost(id) {
  //   return fetch(`${this.baseUrl}/${id}`, {
  //     method: 'DELETE',
  //   }).then(this._checkResponse);
  // }

  // addPost(messageValue) {
  //   return fetch(this.baseUrl, {
  //     method: 'POST',
  //     headers: this.headers,
  //     body: JSON.stringify({
  //       massege: messageValue,
  //     }),
  //   }).then(this._checkResponse);
  // }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: { 'content-type': 'application/json' },
});

export { api };
