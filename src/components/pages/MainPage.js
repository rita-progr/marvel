import { useState } from "react";
import {Helmet} from 'react-helmet';
import CharInfo from "../CharInfo/CharInfo";
import CharList from "../CharList/CharList";
import AppFind from "../appFind/AppFInd";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import decoration from "../../resources/img/vision.png";

const MainPage = () => {
    const [selectedId, setselectedId] = useState(null);
    const onCharSelected = (id) => {
      setselectedId(id);
    };
    return(
        <>
        <Helmet>
        <meta
          name="description"
         content="Web site created using create-react-app"
        />
        <title>Marvel page</title>
        </Helmet>
        <ErrorBoundary>
                    <RandomChar />
                  </ErrorBoundary>
                  <div className="char__content">
                    <ErrorBoundary>
                      <CharList onCharSelected={onCharSelected} />
                    </ErrorBoundary>
                    <div>
                    <ErrorBoundary>
                      <CharInfo charId={selectedId} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                    <AppFind/>
                    </ErrorBoundary>
                    </div>
                  </div>
                  <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}
export default MainPage;