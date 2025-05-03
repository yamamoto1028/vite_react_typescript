import { requests } from "./request";
import { Row } from "./components/Row/index";
import { Banner } from "./components/Banner";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // react-queryを定義

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* トップレベルでラップする */}
      <div className="App">
        <Header />
        <Banner />
        <Row
          title={"NetflixOriginals"}
          fetchUrl={requests.fetchNetflixOriginals}
        />
        <Row title={"TopRated"} fetchUrl={requests.fetchTopRated} />
        <Row title={"ActionMovies"} fetchUrl={requests.fetchActionMovies} />
        <Row title={"NewsMovies"} fetchUrl={requests.fetchNewsMovies} />
        <Row title={"KidsMovies"} fetchUrl={requests.fetchKidsMovies} />
        <Row title={"DocumentMovies"} fetchUrl={requests.fetchDocumentMovies} />
        <Row title={"RomanceMovies"} fetchUrl={requests.fetchRomanceMovies} />
        <Row title={"Trending"} fetchUrl={requests.fetchTrending} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
