class NotAuthRequest {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getTopicPaginetion(page) {
    return fetch(`${this.baseUrl}/topicList/${page}`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getMessagePaginetion(params) {
    const { id, page } = params;
    return fetch(`${this.baseUrl}/messageList/${id}&${page}`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getUserFindId(arrIdUser) {
    return fetch(
      `${this.baseUrl}/faindIdUsers/${JSON.stringify({ arrIdUser })}`,
      {
        method: 'GET',
        headers: this.headers,
      }
    ).then(this._checkResponse);
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

const notAuthRequest = new NotAuthRequest({
  baseUrl: 'http://localhost:3000',
  headers: { 'content-type': 'application/json' },
});

export { notAuthRequest };