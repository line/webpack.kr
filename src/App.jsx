import Site from "./components/Site/Site.jsx";

export default function App() {
  return <Site loadContent={(path) => import(`./content/${path}`)} />;
}
