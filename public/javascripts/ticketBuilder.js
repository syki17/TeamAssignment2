

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
         *          div.form-group display=none
         *              label Enter New Narrative:
         *              textarea.form-control rows=5
         *          div.form-group display=none
         *              label ticket resolution:
         *              textarea.form-control rows=5
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
        statusSelect.classList.add('statusSelect')
        statusSelect.style.display='none'
        statusEle.append(statusSelect)
        
        //create the option elements for the select
        var newOption = document.createElement('option')
        newOption.appendChild(document.createTextNode('Open'))
        statusSelect.append(newOption)
        var progressOption = document.createElement('option')
        progressOption.appendChild(document.createTextNode('In Progress'))
        statusSelect.append(progressOption)
        var dispatchedOption = document.createElement('option')
        dispatchedOption.appendChild(document.createTextNode('Dispatched'))
        statusSelect.append(dispatchedOption)
        var closedOption = document.createElement('option')
        closedOption.appendChild(document.createTextNode('Closed'))
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
            editButton.classList.add('editButton')
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
        newNarrativeField.classList.add('form-control')
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
        ticketResolutionField.classList.add('form-control')
        ticketResolutionField.rows='5'
        ticketResolutionDiv.append(ticketResolutionField)
    }
}


// a function that toggles the visability of the ticket details
function toggleDetails(event)
{
    // do nothing if the selected element is the button (because we want to be able to press that without collapsing the ticket details)
    if(event.target.classList.contains('editButton')||event.target.classList.contains('statusSelect'))
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

    //show the statusSelect, add narrative, and ticket resolution fields
    ticket.children[1].children[1].style.display='block'
    ticket.children[2].children[4].style.display='block'
    ticket.children[2].children[5].style.display='block'
    
    // get the editable elements
    var description = ticket.children[0]
    var priorityField = ticket.children[2].children[2]
    var narrativeText = ticket.children[2].children[3].children[0].children[0]

    // make the fields editable, one at a time, and focus on the one that is currently editable
    description.setAttribute('contenteditable', true)
    description.focus()
    description.style.background = 'lightgrey'
    description.addEventListener('blur', function(event)
    {
        description.setAttribute('contenteditable', false)
        description.style.background = 'none'
        priorityField.setAttribute('contenteditable', true)
        priorityField.focus()
        priorityField.style.background = 'lightgrey'
    })
    priorityField.addEventListener('blur', function(event)
    {
        priorityField.setAttribute('contenteditable', false)
        priorityField.style.background='none'
        narrativeText.setAttribute('contentEditable', true)
        narrativeText.focus()
        narrativeText.style.background='lightgrey'
    })
    narrativeText.addEventListener('blur', function(event)
    {
        narrativeText.setAttribute('contenteditable', false)
        narrativeText.style.background='none'
        //prompt the user to cconfirm changes, and push the changes to the server side if confirmed
        if(confirm('do you want to save these changes?'))
        {
            //makes a POST request to dashboard/editTicket that sends a json of the edited entry
            var postRequest = new XMLHttpRequest()
            postRequest.open('POST', '/dashboard/editTicket', true)
            postRequest.send({
                description: '1',
                priority: 1,
                narrative: '1',
                open: true
            })
            //hide the desired elements
            ticket.children[1].children[1].style.display='none'
            ticket.children[2].children[3].style.display='none'
            ticket.children[2].children[4].style.display='none'
            console.log('oof')
            location.reload()
        }
    })
  }