import { Helmet } from "react-helmet";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../AppBanner/AppBanner";
const SecondPage = () => {
    return(
        <>
         <Helmet>
        <meta
          name="description"
         content="Web site created using create-react-app"
        />
        <title>Comics page</title>
        </Helmet>
        <ErrorBoundary>
            <AppBanner />
            <ComicsList />
        </ErrorBoundary>
        </>
    )
}
export default SecondPage;