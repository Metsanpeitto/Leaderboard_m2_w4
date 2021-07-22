/**         Api class handles all the communication with the API          */

class Api {
  constructor() {
    this.baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
    this.newGame = 'Maniac Mansion';
    this.gameId = null;
    this.scores = [];
    this.init();
  }

  gameIdStored() {
    this.found = false;
    const gameId = JSON.parse(window.localStorage.getItem('gameId'));
    if (gameId) {
      this.gameId = gameId;
      this.found = true;
    }
    return this.found;
  }

  async init() {
    const gameStored = this.gameIdStored();
    if (gameStored === false) {
      fetch(`${this.baseUrl}/games`, {
        mode: 'cors',
        method: 'POST', // or 'PUT'
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ name: this.newGame }),
      })
        .then((response) => response.json())
        .then((data) => {
          const str = data.result;
          const str1 = str.replace('Game with ID:', '');
          const str2 = str1.replace('added.', '');
          const str3 = str2.replaceAll(/\s/g, '');
          this.gameId = str3;
          window.localStorage.setItem('gameId', JSON.stringify(this.gameId));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  async addScore(name, score) {
    const response = await fetch(
      `${this.baseUrl}/games/${this.gameId}/scores`,
      {
        mode: 'cors',
        method: 'POST', // or 'PUT'
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ user: name, score }),
      },
    )
      .then((response) => response.json())
      .then((json) => json);
    return response;
  }

  async refresh() {
    const response = await fetch(`${this.baseUrl}/games/${this.gameId}/scores`)
      .then((response) => response.json())
      .then((json) => {
        this.scores = json.result;
        return this.scores;
      });
    return response;
  }
}

export default Api;
