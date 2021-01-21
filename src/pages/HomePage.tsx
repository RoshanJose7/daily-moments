import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";

import { formateDate } from "../utils/date";
import { useAuth } from "../utils/Auth";
import { db } from "../utils/firebase";

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<entryType[]>([]);
  const { uid } = useAuth();

  useEffect(() => {
    const entriesRef = db.collection("users").doc(uid).collection("entries");

    entriesRef
      .get()
      .then((snap) => {
        const entries: entryType[] = snap.docs.map((doc) => {
          const data = doc.data() as {
            title: string;
            description: string;
            date: string;
            imgUrl: string;
          };

          return { id: doc.id, ...data };
        });

        setEntries(entries);
      })
      .catch((e) => console.log(e));

    return entriesRef.orderBy("date", "desc").onSnapshot(({ docs }) =>
      setEntries(
        docs.map((doc) => {
          const data = doc.data() as {
            title: string;
            description: string;
            date: string;
            imgUrl: string;
          };
          return { id: doc.id, ...data };
        })
      )
    );
  }, [uid]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries?.map((entry) => (
            <IonItem
              button
              key={entry.id}
              routerLink={`/my/entries/view/${entry.id}`}
            >
              <IonThumbnail slot="end">
                <IonImg src={entry?.imgUrl} />
              </IonThumbnail>
              <IonLabel>
                <h2>{formateDate(entry.date)}</h2>
                <h3>{entry.title}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
