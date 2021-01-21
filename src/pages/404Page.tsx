import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const PageNotFoundPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page Not Found!!!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Error Code 404</IonContent>
    </IonPage>
  );
};

export default PageNotFoundPage;
