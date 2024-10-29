import { lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const ErrorPage = lazy(()=>import('../pages/errorPage'));
const MainPage = lazy(()=>import('../pages/MainPage'));
const SecondPage = lazy(()=>import('../pages/SecondPage'));
const SingleComicPage = lazy(()=>import('../pages/SingleComicPage'));
const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback = {<Spinner/>}>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/comics" element={<SecondPage/>}/>
            <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
            <Route path ='*' element = {<ErrorPage/>}/>
          </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};
export default App;
