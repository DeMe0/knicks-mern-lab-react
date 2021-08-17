import React from "react";

const Display = (props) => {
  const { players } = props;
  const loaded = () => (
    <div style={{ textAlign: "center" }}>
      {players.map((player) => (
        <article>
          <img src={player.img} alt="player.img" />
          <h1>{player.name}</h1>
          <h3>{player.position}</h3>
        </article>
      ))}
    </div>
  );
  const loading = <h1>Loading...</h1>;

  return players.length > 0 ? loaded() : loading;
};

export default Display;
