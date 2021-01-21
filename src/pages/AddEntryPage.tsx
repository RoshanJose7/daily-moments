import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonText,
  IonDatetime,
  IonLoading,
  isPlatform,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { CameraResultType, CameraSource, Plugins } from "@capacitor/core";

import { useAuth } from "../utils/Auth";
import { db, storage } from "../utils/firebase";
const { Camera } = Plugins;

async function savePicture(blobImgUrl: string, uid: string) {
  const img = await fetch(blobImgUrl);
  const imgRef = storage.ref(`/users/${uid}/pictures/${Date.now()}`);
  const imgBlob = await img.blob();
  const snapShot = await imgRef.put(imgBlob);
  const downloadUrl = await snapShot.ref.getDownloadURL();
  return downloadUrl;
}

const AddEntryPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("/assets/placeholder.png");
  const history = useHistory();
  const titleRef = useRef<HTMLIonInputElement>(null);
  const descriptionRef = useRef<HTMLIonTextareaElement>(null);
  const dateTimeRef = useRef<HTMLIonDatetimeElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const { uid } = useAuth();

  async function handleSave() {
    setLoading(true);
    const entriesRef = db.collection("users").doc(uid).collection("entries");

    if (
      titleRef.current !== null &&
      descriptionRef.current !== null &&
      dateTimeRef.current !== null
    ) {
      const entryData = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        date: dateTimeRef.current.value,
        imgUrl,
      };

      if (!imgUrl.startsWith("/assets")) {
        entryData.imgUrl = await savePicture(imgUrl, uid!);
      }

      await entriesRef
        .add(entryData)
        .then((res) => console.log(res))
        .catch((e) => {
          console.log(e);
          setError(e.code);
        });
      setLoading(false);
      history.goBack();
    } else {
      setLoading(false);
      setError("Unable to Save!!!");
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const picUrl = URL.createObjectURL(file);
      setImgUrl(picUrl);
    }
  }

  async function handlePictureClick() {
    if (isPlatform("capacitor")) {
      try {
        const pic = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          width: 600,
          source: CameraSource.Prompt,
        });

        setImgUrl(pic.webPath!);
      } catch (e) {
        console.error(e);
      }
    } else {
      imgRef.current!.click();
    }
  }

  useEffect(
    () => () => {
      if (imgUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imgUrl);
      }
    },
    [imgUrl]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput ref={titleRef} type="text" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea ref={descriptionRef} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Date of Event</IonLabel>
            <IonDatetime ref={dateTimeRef} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Image</IonLabel>
            <input
              hidden
              type="file"
              accept="image/*"
              ref={imgRef}
              onChange={handleFileChange}
            />
            <img
              onClick={handlePictureClick}
              style={{ cursor: "pointer", marginTop: "10px" }}
              src={imgUrl}
              alt="img"
            />
          </IonItem>
          <IonText color="danger">{error}</IonText>
          <IonButton expand="block" onClick={() => handleSave()}>
            Save
          </IonButton>
          <IonLoading isOpen={loading}></IonLoading>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
