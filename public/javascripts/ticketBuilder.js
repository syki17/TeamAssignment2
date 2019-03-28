

//grabs the tickets elemenet
var ticketsEle = document.getElementsByClassName("tickets")
var toggleClosedButton = document.getElementsByClassName('toggleClosedButton')


//get data from the server
const requestURL = 'dashboard/tickets'
fetch(requestURL)
.then(function(response)
{
    return response.json()
})
.then(dataRecieved)
function dataRecieved(tickets)
{
    //loop through the json and build the tickets
    for (let ticket of tickets.tickets)
    {
        /**
         * Goal is to create an html structure roughly like this (excuse the messy psudeaucode): 
         * 
         * ul.list-group.tickets
         *  li.ticket.list-group-item.list-group-item-action onclick=toggleDetails()
         *      p.description #{ticket.description}
         *          p record number: 
         *              p #{ticket.recordNumber}
         *      p ticket status:
         *          p #{ticket.status}
         *          select.statusSelect display=none
         *              (the options)
         *      div.ticketDetails display=none
         *          p.priority priority:
         *              p.priorityField #{ticket.priorityField}
         *          p customer name:
         *              p #{ticket.cxName}
         *          ul.narratives.list-group narrative:
         *              li.list-group-item #{ticket.narrative}
         *          button edit
         *          div.form-group display=none
         *              label Enter New Narrative:
         *              textarea.form-control rows=5
         *          div.form-group display=none
         *              label ticket resolution:
         *              textarea.form-control rows=5
         *          button save changes
         *          
         */         


        //create the li element (the entire ticket will be encased in this)
        var li = document.createElement('li')
        li.classList.add('ticket', 'list-group-item', 'list-group-item-action')
        li.onclick = toggleDetails
        ticketsEle.item(0).append(li)

        var descriptionEle = document.createElement('p')
        descriptionEle.classList.add('description')
        descriptionEle.appendChild(document.createTextNode(ticket.description))
        li.append(descriptionEle)

        //create the p element for the record number
        var recordNumberEle = document.createElement('p')
        recordNumberEle.appendChild(document.createTextNode('Record Number:'))
        descriptionEle.append(recordNumberEle)

        recordNumber = document.createElement('p')
        recordNumber.appendChild(document.createTextNode(ticket.recordNumber))
        recordNumberEle.append(recordNumber)

        //create the p element for the status
        var statusEle = document.createElement('p')
        statusEle.appendChild(document.createTextNode('Ticket Status:'))
        li.append(statusEle)

        //create the p element for the status field
        var statusField = document.createElement('p')
        statusField.appendChild(document.createTextNode(ticket.status))
        statusEle.append(statusField)

        //create the select element for the status
        var statusSelect = document.createElement('select')
        statusSelect.classList.add('statusSelect', 'noCollapse')
        statusSelect.style.display='none'
        statusEle.append(statusSelect)
        
        //create the option elements for the select
        var newOption = document.createElement('option')
        newOption.appendChild(document.createTextNode('Open'))
        newOption.classList.add('noCollapse')
        statusSelect.append(newOption)
        var progressOption = document.createElement('option')
        progressOption.appendChild(document.createTextNode('In Progress'))
        progressOption.classList.add('noCollapse')
        statusSelect.append(progressOption)
        var dispatchedOption = document.createElement('option')
        dispatchedOption.appendChild(document.createTextNode('Dispatched'))
        dispatchedOption.classList.add('noCollapse')
        statusSelect.append(dispatchedOption)
        var closedOption = document.createElement('option')
        closedOption.appendChild(document.createTextNode('Closed'))
        closedOption.classList.add('noCollapse')
        statusSelect.append(closedOption)

        //create the div element (the part that contains the details, and is hidden by default)
        var div = document.createElement('div')
        div.classList.add('ticketDetails')
        div.style.display = 'none'
        li.append(div)

        //create the p element for the priority
        var priority = document.createElement('p')
        priority.classList.add('priority')
        priority.appendChild(document.createTextNode('priority:'))
        div.append(priority)

        //create the p element for priority field
        var priorityField = document.createElement('p')
        priorityField.classList.add('priorityField')
        priorityField.appendChild(document.createTextNode(ticket.priority))
        priority.append(priorityField)

        //create the p element for the customer name
        var cxName = document.createElement('p')
        cxName.appendChild(document.createTextNode('Customer Name:'))
        div.append(cxName)

        //create the p element for the customer name field
        var cxNameField = document.createElement('p')
        cxNameField.appendChild(document.createTextNode(ticket.cxName))
        cxName.append(cxNameField)

        //create the ul element for the narrative
        var narrative = document.createElement('ul')
        narrative.classList.add('list-group')
        narrative.appendChild(document.createTextNode('narrative: '))
        div.append(narrative)

        // loop through narratives of the ticket, create a li element for them, and add them to the narrative element
        for(let thisNarrative of ticket.narrative)
        {
            var narrativeText = document.createElement('li')
            narrativeText.classList.add('list-group-item')
            narrativeText.appendChild(document.createTextNode(thisNarrative))
            narrative.append(narrativeText)
        }

        // check if the ticket is open, and put the 'closedTicket' class on those that are not, and set them to invisible
        if(ticket.status==='Closed')
        {
            li.classList.add('closedTicket')
            li.style.display = 'none'
        }
        //only make the edit button if the ticket is open
        else
        {
            // create an edit button
            var editButton = document.createElement('button')
            editButton.classList.add('editButton', 'noCollapse')
            editButton.onclick = editButtonPressed
            editButton.appendChild(document.createTextNode('edit'))
            div.append(editButton)
        }

        var newNarrativeDiv = document.createElement('div')
        newNarrativeDiv.classList.add('form-group')
        newNarrativeDiv.style.display='none'
        div.append(newNarrativeDiv)

        //create the label element for the add new narrative
        var newNarrativeLabel = document.createElement('label')
        newNarrativeLabel.appendChild(document.createTextNode('Add New Narrative'))
        newNarrativeDiv.append(newNarrativeLabel)

        //create the textarea element for the resolution field
        var newNarrativeField = document.createElement('textarea')
        newNarrativeField.classList.add('form-control', 'noCollapse')
        newNarrativeField.rows='5'
        newNarrativeDiv.append(newNarrativeField)

        //create the div element for the ticket resolution
        var ticketResolutionDiv = document.createElement('div')
        ticketResolutionDiv.classList.add('form-group')
        ticketResolutionDiv.style.display='none'
        div.append(ticketResolutionDiv)

        //create the label element for the resolution
        var ticketResolutionLabel = document.createElement('label')
        ticketResolutionLabel.appendChild(document.createTextNode('Ticket Resolution'))
        ticketResolutionDiv.append(ticketResolutionLabel)

        //create the textarea element for the resolution field
        var ticketResolutionField = document.createElement('textarea')
        ticketResolutionField.classList.add('form-control', 'noCollapse')
        ticketResolutionField.rows='5'
        ticketResolutionDiv.append(ticketResolutionField)

        var saveChangesButton = document.createElement('button')
        saveChangesButton.classList.add('saveChangesButton', 'noCollapse')
        saveChangesButton.onclick = saveEditPressed
        saveChangesButton.appendChild(document.createTextNode('Save Changes'))
        saveChangesButton.style.display='none'
        div.append(saveChangesButton)
    }
}


// a function that toggles the visability of the ticket details
function toggleDetails(event)
{
    // do nothing if the selected element is the button (because we want to be able to press that without collapsing the ticket details)
    if(event.target.classList.contains('editButton')||event.target.classList.contains('statusSelect')||event.target.classList.contains('noCollapse'))
    {
        return null 
    }
    // grab the li element that holds the entire ticket
    var details = event.target.closest('li')
    // grab the div element that represents the details 
    details=details.children[2]
    // set visible to invisible, and vice-versa
    if(details.style.display === 'block')
    {
        details.style.display='none'
    }
    else
    {
        details.style.display='block'
    }
}

  // a function for toggling the visability of all closed tickets
  function toggleClosed()
  {
    // cycle through all the child elements of ticketsEle with a foreach loop
    for(let ticketEle of ticketsEle.item(0).children)
    {
        // check if each ele has the 'closedTicket' class
        if(ticketEle.classList.contains('closedTicket'))
        {
            // change the display from 'none' to 'block', or vice-versa, and change the text of the button to reflect that
            if(ticketEle.style.display === 'none')
            {
                ticketEle.style.display = 'block'
                toggleClosedButton.item(0).textContent = 'hide closed tickets'
            }
            else
            {
                ticketEle.style.display = 'none'
                toggleClosedButton.item(0).textContent = 'show closed tickets'
            }
        }          
    }
  }

  // a function that allows the given element to be edited, then prompts the user to confirm changes before calling the 'dashboard/editTicket' POST method
  function editButtonPressed(event)
  {
    // get the li element for the selected ticket (the element storing the entire ticket, who's text content is the description)
    var ticket = event.target.closest('li')

    // checks that the ticket isn't closed
    if(ticket.classList.contains('closedTicket'))
    {
        return null
    }

    // grey out the fields that can't be edited
    ticket.style.color='lightgrey'
    
    // get the editable elements, and make them visable, and not grey
    var status = ticket.children[1].children[1]
    var narrative = ticket.children[2].children[4]
    var ticketResolution = ticket.children[2].children[5]
    status.style.color='black'
    status.style.display='block'
    narrative.style.display='block'
    narrative.style.color='black'
    ticketResolution.style.display='block'
    ticketResolution.style.color='black'

    // make the edit button visable
    var editButton = ticket.children[2].children[6]
    editButton.style.display='block'
  }

  function saveEditPressed(event)
  {
    // get the editable elements
    var ticket = event.target.closest('li')
    var status = ticket.children[1].children[1]
    var narrative = ticket.children[2].children[4].children[1]
    var ticketResolution = ticket.children[2].children[5].children[1]

    // check that the narrative field is not null
    if(narrative.value === "")
    {
        window.alert('All edits must include an entry in the narrative')
        return null
    }
    // if the status was set to 'Closed'
    if(status.value==='Closed')
    {
        if(ticketResolution.textContent === "")
        {
            window.alert('Please enter a ticket resolution to close the ticket')
            return null
        }
        else
        {
            console.log('info sent, ticket closed')
        }
    }
    else
    {
        console.log('info sent')
    }
    location.reload()
  }