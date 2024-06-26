const ticketsContainer = document.getElementById("tickets-container");

async function fetchTickets() {
  try {
    const response = await fetch("http://localhost:3000/tickets");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    
    // localStorage.setItem("tickets", JSON.stringify(tickets));

    displayTickets(data);

  } catch (error) {
    console.error("Error fetching tickets:", error);
    const errorRow = ticketsContainer.insertRow();
    errorRow.insertCell().textContent = "An error occurred while fetching tickets.";
  }
}

function displayTickets(tickets) {
  ticketsContainer.innerHTML = "";

  tickets.forEach((ticket) => {
    const row = ticketsContainer.insertRow();

    const titleCell = row.insertCell();
    titleCell.textContent = ticket.title;

    const descriptionCell = row.insertCell();
    descriptionCell.textContent = ticket.description;

    const statusCell = row.insertCell();
    statusCell.textContent = ticket.status;

    const dueDateCell = row.insertCell();
    dueDateCell.textContent = ticket.dueDate;

    const priorityCell = row.insertCell();
    const prioritySelect = document.createElement("select");
    
    prioritySelect.innerHTML = `
      <option value="Low" ${ticket.priority === 'Low' ? 'selected' : ''}>Low</option>
      <option value="Medium" ${ticket.priority === 'Medium' ? 'selected' : ''}>Medium</option>
      <option value="High" ${ticket.priority === 'High' ? 'selected' : ''}>High</option>
    `;
    
    prioritySelect.addEventListener("change", function(event) {
      updateTicketPriority(ticket.id, event.target.value); // Use ticket ID and selected value
    });
     
    priorityCell.appendChild(prioritySelect);

    const actionsCell = row.insertCell();
    actionsCell.className = "actioncell";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    actionsCell.appendChild(editButton);

    editButton.addEventListener("click", function() {
      window.location.href = `edit.html?id=${ticket.id}`;
    });
    

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    actionsCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", function(){
      deleteTicket(ticket.id);
    })
  });
}

fetchTickets();

async function deleteTicket(ticketId) {
  try {
    const response = await fetch(`http://localhost:3000/tickets/${ticketId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    fetchTickets(); // Refresh the tickets list after deletion
  } catch (error) {
    console.error("Error deleting ticket:", error);
  }
}

function updateTicketPriority(ticketId, newPriority) {
  fetch(`http://localhost:3000/tickets/${ticketId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priority: newPriority }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(updatedTicket => {
    console.log('Updated ticket:', updatedTicket);
  })
  .catch(error => {
    console.error('Error updating priority:', error);
  });
}





