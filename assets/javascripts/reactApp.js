function Team(props) {
  let shotPercentageDiv;
  if (props.stats.shots) {
    const ShotPercentage = Math.round(
      (props.stats.score / props.stats.shots) * 100
    );
    shotPercentageDiv = (
      <div>
        <strong>Shooting Percentage % : {ShotPercentage}</strong>
      </div>
    );
  }

  return (
    <div className="Team">
      <h2>{props.name}</h2>

      <div className="identity">
        <img src={props.logo} alt={props.name} />
      </div>

      <div>
        <strong>Shots: </strong> {props.stats.shots}
      </div>

      <div>
        <strong>Score: </strong> {props.stats.score}
      </div>

      {shotPercentageDiv}

      <button onClick={props.shotHandler}>Shoot!</button>
    </div>
  );
}

function ScoreBoard(props) {
  return (
    <div className="ScoreBoard">
      <div className="teamStats">
        <h3>VISITORS</h3>
        <h3>{props.visitingTeamStats.score}</h3>
      </div>

      <h3>SCOREBOARD</h3>

      <div className="teamStats">
        <h3>HOME</h3>
        <h3>{props.homeTeamStats.score}</h3>
      </div>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0,
      },
      visitingTeamStats: {
        shots: 0,
        score: 0,
      },
    };

    this.shotSound = new Audio("./assets/audios/badminton.mp3");
    this.scoreSound = new Audio("./assets/audios/yeehaw.mp3");
    // this.scoreSound = new Audio("./assets/audios/crowdapplause1.mp3");
  }

  shoot = (team) => {
    const teamStatsKey = `${team}TeamStats`;
    let score = this.state[teamStatsKey].score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 100);
    }
    // console.log("Shoot!");

    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score,
      },
    }));
  };

  resetGame = () => {
    this.setState((state, props) => ({
      resetCount: state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score: 0,
      },
      visitingTeamStats: {
        shots: 0,
        score: 0,
      },
    }));
  };

  render() {
    return (
      <div className="Game">
        <ScoreBoard
          visitingTeamStats={this.state.visitingTeamStats}
          homeTeamStats={this.state.homeTeamStats}
        />
        <h1>Welcome to {this.props.venue}</h1>
        <div className="stats">
          <Team
            name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shotHandler={() => this.shoot("visiting")}
          />

          <div className="versus">
            <h1>VS</h1>
            <div>
              <strong>Resets: </strong> {this.state.resetCount}
              <button onClick={this.resetGame}>Reset Game</button>
            </div>
          </div>

          <Team
            name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shotHandler={() => this.shoot("home")}
          />
        </div>
      </div>
    );
  }
}

function App(props) {
  const smashers = {
    name: "The Chennai Smashers",
    logoSrc: "./assets/images/chennai-smashers.png",
  };

  const dreamTm = {
    name: "The Dream Team",
    logoSrc: "./assets/images/dreamTeam.png",
  };

  const premier = {
    name: "Premier Badminton League",
    logoSrc: "./assets/images/Premier.png",
  };

  const stLaure = {
    name: "St. Laurence's Team",
    logoSrc: "./assets/images/stlaurence.jpg",
  };
  return (
    <div className="App">
      <br></br>
      <Game
        venue="The Dream Ground, Ring Road"
        homeTeam={dreamTm}
        visitingTeam={smashers}
      />
      <br></br>
      <Game
        venue="Elite Sports Club, Badminton &amp; Cricket Academy"
        homeTeam={premier}
        visitingTeam={stLaure}
      />
    </div>
  );
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
