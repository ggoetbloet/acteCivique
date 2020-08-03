import React, {useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSearchbar} from '@ionic/react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';


const TicketsPageWithPagination = (props) => {

    const [tickets, setTickets] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios
            .get(`http://localhost:8000/api/tickets?pagination=true&itemsPerPage=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
              setTickets(response.data["hydra:member"]);
              setTotalItems(response.data["hydra:totalItems"]);
              setLoading(false);
            })
            .catch(error => console.log(error.response));
        }, [currentPage]);

          // Gestion du changement de page
          const handlePageChange = page => {
            setCurrentPage(page);
            setLoading(true);
          };

        
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
              <h1>Mes tickets p</h1> 
              <IonSearchbar value={search} onIonChange={handleSearch}></IonSearchbar>

            {loading && (
              
              <p>Chargement ...</p>
              
            )}
              {!loading &&
                tickets.map(ticket => (
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

                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChanged={handlePageChange} />
            
            </IonContent>
            
        </IonPage>
    </>
     );
}
 
export default TicketsPageWithPagination;