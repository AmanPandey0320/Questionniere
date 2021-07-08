import { BrowserRouter, Route, Switch } from "react-router-dom";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {
            Routes.map(route => <Route key={route.id} exact={route.exact} path={route.path} component={route.page} />)
          }
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
