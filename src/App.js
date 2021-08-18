import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./components/Display";
import Form from "./components/Form";

function App() {
  const url = "https://knicks-api-628-ajd.herokuapp.com";

  const [players, setPlayers] = useState([]);

  const emptyPlayer = {
    name: "",
    position: "",
    img: "",
  };

  const [selectedPlayer, setSelectedPlayer] = useState(emptyPlayer);

  const getPlayers = () => {
    fetch(url + "/knicks")
      .then((response) => response.json())
      .then((data) => setPlayers(data));
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const handleCreate = (newPlayer) => {
    fetch(url + "/knicks", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    }).then(() => {
      getPlayers();
    });
  };

  const handleUpdate = (player) => {
    fetch(url + "/knicks/" + player._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    }).then(() => {
      getPlayers();
    });
  };

  const selectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const deletePlayer = (player) => {
    fetch(url + "/knicks/" + player._id, {
      method: "delete",
    }).then(() => {
      // don't need the response from the post but will be using the .then to update the list of players
      getPlayers();
    });
  };

  return (
    <div className="App">
      <h1>BUILD YOUR ALL TIME KNICKS TEAM</h1>
      <hr />
      <Link to="/create">
        <button>Add Player</button>
      </Link>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display
                {...rp}
                players={players}
                selectPlayer={selectPlayer}
                deletePlayer={deletePlayer}
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                player={emptyPlayer}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form
                {...rp}
                label="update"
                dog={selectedPlayer}
                handleSubmit={handleUpdate}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
