/**         Api class handles all the communication with the API          */

class Api {
  constructor() {
    this.baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
    this.newGame = 'Maniac Mansion';
    this.gameId = null;
    this.scores = [];
    this.init(); // Calls the API when the page loads for first time and gets scores
  }

  /**         Checks if a game id is stored in local storage               */
  gameIdStored() {
    this.found = false;
    const gameId = JSON.parse(window.localStorage.getItem('gameId'));
    if (gameId) {
      this.gameId = gameId;
      this.found = true;
    }
    return this.found;
  }

  /**         Checks if this is the first time running the app             */
  /**         if it is, creates a game score folder in the API             */
  async init() {
    const gameStored = this.gameIdStored();
    if (gameStored === false) {
      await fetch(`${this.baseUrl}/games`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ name: this.newGame }),
      })
        .then((response) => response.json())
        .then((data) => {
          const str = data.result; // These lines modify the received string
          const str1 = str.replace('Game with ID:', '');
          const str2 = str1.replace('added.', '');
          const str3 = str2.replaceAll(/\s/g, '');
          this.gameId = str3; // The formatted string is stored in local storage
          window.localStorage.setItem('gameId', JSON.stringify(this.gameId));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  /**         Post name and  score in the API creating a new record        */
  async addScore(name, score) {
    const response = await fetch(
      `${this.baseUrl}/games/${this.gameId}/scores`,
      {
        mode: 'cors',
        method: 'POST',
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

  /**         Obtains the record of scores from the API          */
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
