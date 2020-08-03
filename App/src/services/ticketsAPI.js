import axios from "axios";

async function findAll() {
   return axios
       .get("http://localhost:8000/api/tickets")
       .then(response => response.data['hydra:member']);
}

async function deleteTicket(id) {
    return axios
        .delete("http://localhost:8000/api/tickets" + id);
}

export default {
  findAll,
  delete: deleteTicket,

};