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

const SignUpPage: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const confirmPasswordRef = useRef<HTMLIonInputElement>(null);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }

  async function handleSignUp() {
    setLoading(true);

    if (
      emailRef.current !== null &&
      passwordRef.current !== null &&
      confirmPasswordRef.current!.value !== null
    ) {
      if (confirmPasswordRef.current!.value !== passwordRef.current!.value) {
        setError("Passwords do not Match!!!");
        return;
      }

      await auth
        .createUserWithEmailAndPassword(
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
          <IonTitle>SignUp</IonTitle>
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
          <IonItem>
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput ref={confirmPasswordRef} type="password" />
          </IonItem>
        </IonList>
        <IonText color="danger">{error}</IonText>
        <IonButton expand="block" onClick={handleSignUp}>
          SignUp
        </IonButton>
        <IonButton fill="clear" expand="block" routerLink="/login">
          Already have an account?
        </IonButton>
        <IonLoading isOpen={loading}></IonLoading>
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
