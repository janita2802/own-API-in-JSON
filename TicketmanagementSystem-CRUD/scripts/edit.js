document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get("id");
  
    if (ticketId) {
      fetchTicket(ticketId);
    }
  
    document.getElementById("edit-ticket-form").addEventListener("submit", async function(event) {
      event.preventDefault();
  
      const title = document.getElementById("edit-title").value;
      const description = document.getElementById("edit-description").value;
      const status = document.getElementById("edit-status").value;
      const dueDate = new Date(document.getElementById("edit-dueDate").value).toISOString();
  
      const updatedTicketData = { title, description, status, dueDate };
  
      try {
        const response = await fetch(`http://localhost:3000/tickets/${ticketId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTicketData),
        });
        window.location.href = "index.html";

        if (response.ok) {
        //   alert("Ticket updated successfully!");
          console.log("Redirection to index.html");
        //   window.location.href = "index.html";
        } else {
          console.error("Error updating ticket:", response.status);
        }
      } catch (error) {
        console.error("Error updating ticket:", error);
      }
    });
  
    async function fetchTicket(ticketId) {
      try {
        const response = await fetch(`http://localhost:3000/tickets/${ticketId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const ticket = await response.json();
  
        document.getElementById("edit-title").value = ticket.title;
        document.getElementById("edit-description").value = ticket.description;
        document.getElementById("edit-status").value = ticket.status;
        
        const dueDate = new Date(ticket.dueDate);
        const year = dueDate.getFullYear();
        const month = String(dueDate.getMonth() + 1).padStart(2, '0');
        const day = String(dueDate.getDate()).padStart(2, '0');
        const formattedDueDate = `${year}-${month}-${day}`;

        document.getElementById("edit-dueDate").value = formattedDueDate;

      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    }
  });
  