const newTicketForm = document.getElementById("new-ticket-form");

newTicketForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;
  const dueDate = document.getElementById("dueDate").value;

  // Format the due date for consistent format (assuming YYYY-MM-DDTHH:mm:ss)
  const formattedDueDate = new Date(dueDate).toISOString();

  const newTicketData = {
    title,
    description,
    status,
    dueDate: formattedDueDate,
  };

  try {
    const response = await fetch("http://localhost:3000/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicketData),
      
    });

    if (response.ok) {
      // Assuming successful creation response includes the new ticket data
      const newTicket = await response.json();
      console.log("New ticket created:", newTicket);
      
      // Clear the form after successful submission
      this.reset();
    } else {
      console.error("Error creating ticket:", response.status);
    }
  } catch (error) {
    console.error("Error creating ticket:", error);
  }
});

