![Alt text](public/images/logo.png?raw=true "Logo")

# IncidentMangementWebAppDoccumentation
By Nicholas Gardner and Jakub Sykora

This application is designed to allow users to manage support tickets.

# Table Of Contents: 

# Account Registration:

The application implements an account registration system, requiring users to be logged in to have access to the application's services, protecting the information stored on the web app. The accounts are stored on a database with hashed passwords.
# The Dashboard

An authenticated user has access to the Incident Dashboard, which serves several functions on a single page:
   - view open tickets (with the ability to toggle on view of closed tickets) 
   - view additional details of selected tickets 
   - create new tickets 
        - Each new ticket will be assigned a record number based on the current date (Unix time)
   - edit existing tickets 
        - The latest edit gets appended to the older one. A timestamp is generated on each edit.
   - close tickets 

# Wireframe: 

# Screen Captures: 
![Alt text](public/images/oldticket.png?raw=true "Logo")
3/14/19 – Ticket creation template; Screenshot taken from Live Site
![Alt text](public/images/registration.png?raw=true "Logo")
3/25/19 – registration page completed. Users have to register in order to view the ticket dashboard.
![Alt text](public/images/Login.png?raw=true "Logo")
3/26/19 – Login page completed. If a user is already registered, they can login to see the ticket dashboard.
![Alt text](public/images/ticket.png?raw=true "Logo")
3/27/19 – New design of the ticket system. Allows for editing individual fields. The edits are tracked and timestamped for record-keeping purposes.



# Coming Soon:
   - Ability to delete tickets directly in the app.
   - SSO with Microsoft Office
   - Site re-design with React-js
