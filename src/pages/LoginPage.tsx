import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonLoading,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { Redirect } from "react-router";

import { useAuth } from "../utils/Auth";
import { auth } from "../utils/firebase";

const LoginPage: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }

  async function handleLogin() {
    setLoading(true);

    if (emailRef.current !== null && passwordRef.current !== null) {
      await auth
        .signInWithEmailAndPassword(
          emailRef.current.value as string,
          passwordRef.current.value as string
        )
        .catch((e) => {
          console.log(e);
          setError(e.code);
        });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput ref={emailRef} type="email" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput ref={passwordRef} type="password" />
          </IonItem>
        </IonList>
        <IonText color="danger">{error}</IonText>
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        <IonButton fill="clear" expand="block" routerLink="/signup">
          Don't have an account?
        </IonButton>
        <IonLoading isOpen={loading}></IonLoading>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
