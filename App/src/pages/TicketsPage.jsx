import React, {useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSearchbar} from '@ionic/react';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';

import ticketsAPI from '../services/ticketsAPI';


const TicketsPage = (props) => {

    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

          // Permet d'aller récupérer les customers
        const fetchTickets = async () => {
          try {
            const data = await ticketsAPI.findAll();
            setTickets(data);
            setLoading(false);
          } catch (error) {

          }
        };
    
        // Au chargement du composant, on va chercher les customers
        useEffect(() => {
          fetchTickets();
        }, []);

          // Gestion de la suppression d'un customer
        const handleDelete = async id => {
          const originalTickets = [...tickets];
          setTickets(tickets.filter(ticket => ticket.id !== id));
        
          try {
            await ticketsAPI.delete(id);

          } catch (error) {
            setTickets(originalTickets);

          }
        };

          // Gestion du changement de page
        const handlePageChange = page => setCurrentPage(page);

        // Gestion de la recherche
        const handleSearch = ({ currentTarget }) => {
          setSearch(currentTarget.value);
          setCurrentPage(1);
        };

        const itemsPerPage = 15;

        // Filtrage des customers en fonction de la recherche
        const filteredTickets = tickets.filter(
          t =>
            t.name.toLowerCase().includes(search.toLowerCase()) 
        );
        
        // Pagination des données
        const paginatedTickets = Pagination.getData(
          filteredTickets,
          currentPage,
          itemsPerPage
        );

    return ( 
    <>
        <IonPage>

            <IonHeader>
              <IonToolbar>
                <IonTitle>
                    <Navbar />
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
                <h1>Mes tickets</h1> 
                <IonSearchbar value={search} onIonChange={handleSearch} placeholder="Rechercher ..."></IonSearchbar>

            {loading && (
              
              <p>Chargement ...</p>
              
            )}
            {!loading &&
                paginatedTickets.map(ticket => (
                    <IonCard key={ticket.id}>
                        <IonCardHeader>
                            <IonCardSubtitle>{ticket.sentAt} - ref : {ticket.chrono}</IonCardSubtitle>
                            <IonCardTitle>{ticket.name}</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            adresse
                        </IonCardContent>
                    </IonCard>
                ))}

                {itemsPerPage < filteredTickets.length && (
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      length={filteredTickets.length}
                      onPageChanged={handlePageChange}
                    />
                )}
            
            </IonContent>
            
        </IonPage>
    </>
     );
}
 
export default TicketsPage;