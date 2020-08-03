import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <Navbar />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>hello </h1>
        <a href="/tickets" className="btn btn-primary">Messagerie</a>
      </IonContent>
    </IonPage>
  );
};

export default Home;
