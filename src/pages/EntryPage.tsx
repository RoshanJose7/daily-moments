import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonAlert,
  IonLoading,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { trash } from "ionicons/icons";
import { useHistory, useParams } from "react-router";

import { formateDate } from "../utils/date";
import { useAuth } from "../utils/Auth";
import { db } from "../utils/firebase";

const EntryPage: React.FC = () => {
  const [entry, setEntry] = useState<entryType | null>(null);
  const [alert, showAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams<RouteParams>();
  const { uid } = useAuth();
  const history = useHistory();

  async function handleDelete() {
    setLoading(true);
    const entryRef = db
      .collection("users")
      .doc(uid)
      .collection("entries")
      .doc(id);

    await entryRef.delete();
    setLoading(false);
    history.goBack();
  }

  useEffect(() => {
    setLoading(true);
    const entryRef = db
      .collection("users")
      .doc(uid)
      .collection("entries")
      .doc(id);

    entryRef
      .get()
      .then((doc) => {
        const data = doc.data() as {
          title: string;
          description: string;
          date: string;
          imgUrl: string;
        };
        setEntry({ id: doc.id, ...data });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
  }, [id, uid]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonAlert
            isOpen={alert}
            onDidDismiss={() => showAlert(false)}
            header={"Delete!"}
            message={"Confirm <strong>Delete</strong>!!!"}
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                cssClass: "secondary",
                handler: () => showAlert(false),
              },
              {
                text: "Confirm",
                handler: () => handleDelete(),
              },
            ]}
          />
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{formateDate(entry?.date!)}</IonTitle>
          <IonButtons slot="end">
            <IonButton color="danger" onClick={() => showAlert(true)}>
              <IonIcon icon={trash} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonLoading isOpen={loading}></IonLoading>
      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2>
        <img src={entry?.imgUrl} alt={entry?.title} />
        <p>{entry?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
