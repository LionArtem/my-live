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
    const { id, message, userId, token } = params;
    return fetch(`${this.baseUrl}/${id}/message`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        message,
        userId,
      }),
    }).then(this._checkResponse);
  }

  deleteMessage(params) {
    const { messageId, topicId } = params;
    return fetch(`${this.baseUrl}/${topicId}/message`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        messageId,
      }),
    }).then(this._checkResponse);
  }

  // getMessagePaginetion(params) {
  //   const { id, page, token } = params;
  //   return fetch(`${this.baseUrl}/${id}&${page}/message`, {
  //     method: 'GET',
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token') || token}`,
  //       'content-type': 'application/json',
  //     },
  //   }).then(this._checkResponse);
  // }

  deleteTopic(params) {
    return fetch(`${this.baseUrl}/${params}`, {
      method: 'DELETE',
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
