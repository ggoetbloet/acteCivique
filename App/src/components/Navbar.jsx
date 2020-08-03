import React from 'react';
import { IonAvatar} from '@ionic/react';

const Navbar = (props) => {
    return ( 
      <nav className="navbar">
        <a href="/" className="navbar-brand" stylesheet="text-decoration:none; color:black;" >Acte Civique</a>
        <IonAvatar>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" alt="Avatar de l'utilisateur"/>
        </IonAvatar>
      </nav>
     );
}
 
export default Navbar;