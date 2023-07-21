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

  addMessageInTopic(params) {
    const { id, message, userId } = params;
    return fetch(`${this.baseUrl}/${id}/message`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        message,
        userId,
      }),
    }).then(this._checkResponse);
  }

  getMessagePaginetion(params) {
    const { id, page } = params;
    return fetch(`${this.baseUrl}/${id}&${page}/message`, {
      method: 'GET',
      headers: this.headers,
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
