import React from "react";
import { IonApp, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";

import { AuthContext, useAuthInit } from "./utils/Auth";

import AppTabs from "./AppTabs";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PageNotFoundPage from "./pages/404Page";

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();

  if (loading) {
    return <IonLoading isOpen />;
  }

  return (
    <IonApp>
      <AuthContext.Provider value={auth!}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact from="/" to="/my/entries" />
            <Route>
              <PageNotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
