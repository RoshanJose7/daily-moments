import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import React from "react";

import { auth } from "../utils/firebase";

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton color="medium" expand="block" onClick={() => auth.signOut()}>
          LogOut
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
