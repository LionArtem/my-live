class TopicApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  addNewTopic(title) {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ title }),
    }).then(this._checkResponse);
  }

  getAllTopics() {
    return fetch(this.baseUrl, {
      method: 'get',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getTopic(id) {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  addMessageInTopic(id, message, author) {
    return fetch(`${this.baseUrl}/${id}/message`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        message,
        author,
      }),
    }).then(this._checkResponse);
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

const topicApi = new TopicApi({
  baseUrl: 'http://localhost:3000/topic',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'content-type': 'application/json',
  },
});

export { topicApi };
