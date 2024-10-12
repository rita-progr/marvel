import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import CharInfo from "../CharInfo/CharInfo";
import CharList from "../CharList/CharList";
import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../AppBanner/AppBanner";

import decoration from "../../resources/img/vision.png";
const App = () => {
  const [selectedId, setselectedId] = useState(null);
  const onCharSelected = (id) => {
    setselectedId(id);
  };
  const onComicSelected = (id) => {
    setselectedId(id);
  };
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route exact path="/">
              <ErrorBoundary>
                <RandomChar />
              </ErrorBoundary>
              <div className="char__content">
                <ErrorBoundary>
                  <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <CharInfo charId={selectedId} />
                </ErrorBoundary>
              </div>
              <img className="bg-decoration" src={decoration} alt="vision" />
            </Route>
            <Route exact path="/comics">
              <AppBanner />
              <ComicsList />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};
export default App;
