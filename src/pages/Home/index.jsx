import React, { Component } from "react";
import './home.css'

import Layout from "../../layout";

import { H2 } from "../../components/Typography";
import GameCard from "../../components/GameCard";

import games from '../../mock/games'


export default class Home extends Component {
  render() {
    return (
      <section className="home_page">
        <Layout>
          <section className="new_games">
            <H2 text="NEW GAMES" />
            <div className="games_box">
              {
                games.map(game => <GameCard
                  key={game.id}
                  gameBg={game.gameBg}
                  gameLogo={game.gameLogo}
                  gameImg={game.gameImg}
                  text={game.text}
                  dir={game.dir}
                />)
              }
            </div>
          </section>
        </Layout>
      </section>
    );
  }
}
