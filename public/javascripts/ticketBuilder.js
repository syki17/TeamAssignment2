//grabs the tickets elemenet

var ticketsEle = document.getElementsByClassName("tickets");
var toggleClosedButton = document.getElementsByClassName('toggleClosedButton');


//get data from the server
const requestURL = 'dashboard/tickets';
fetch(requestURL)
.then(function(response)
{
    return response.json()
})
.then(dataRecieved)
function dataRecieved(tickets)
{
    //loop through the json and build the tickets
    for (let ticket of tickets)
    {
        //create the li element (the entire ticket will be encased in this)
        var li = document.createElement('li')
        li.classList.add('ticket', 'list-group-item', 'list-group-item-action')
        li.onclick = toggleDetails
        ticketsEle.item(0).append(li)

        var descriptionEle = document.createElement('p')
        descriptionEle.classList.add('description')
        descriptionEle.appendChild(document.createTextNode(ticket.description))
        li.append(descriptionEle)

        //create the div element (the part that contains the details, and is hidden by default)
        var div = document.createElement('div')
        div.classList.add('ticketDetails')
            div.style.display = 'none'
        li.append(div)



        
        //create the div element for the priority row
        var priorityRow = document.createElement('div')
        priorityRow.classList.add('priorityRow', 'row')
        div.append(priorityRow)

        //create the p element for the priority
        var priority = document.createElement('p')
        priority.classList.add('priority', 'col-md-auto')
        priority.appendChild(document.createTextNode('priority:'))
        div.append(priority)

        //create the p element for priority field
        var priorityField = document.createElement('p')
        priorityField.classList.add('priorityField', 'col-md-auto')
        priorityField.appendChild(document.createTextNode(ticket.priority))
        div.append(priorityField)

        //create the p element for narrative
        var narrative = document.createElement('p')
        narrative.appendChild(document.createTextNode('narrative: '))
        div.append(narrative)

        //creates a hidden value for id, so we can use it for editing
        var id = document.createElement('input')
        id.setAttribute('type', 'hidden');
        id.setAttribute('value',ticket._id);
        div.append(id);

        // create checkbox to manipulate ticket status
        var status = document.createElement('input')
        status.setAttribute('type','checkbox')
        status.checked = ticket.open;   
        div.append(status)

        //create the div.container for the narrative text
        var container = document.createElement('div')
        container.classList.add('container')
        narrative.append(container)

        // create the p element for the narrative text 
        var narrativeText = document.createElement('p')
        narrativeText.appendChild(document.createTextNode(ticket.narrative))
        container.append(narrativeText)

        // check if the ticket is open, and put the 'closedTicket' class on those that are not, and set them to invisible
        if(!ticket.open)
        {
            li.classList.add('closedTicket')
            li.style.display = 'none'
        }

        // create an edit button
        var editButton = document.createElement('button')
        editButton.classList.add('editButton')
        editButton.onclick = editButtonPressed
        editButton.appendChild(document.createTextNode('edit'))
        div.append(editButton)
    }
}

// a function for toggling the visibility of the selected ticket's details
// accepts an event, navigates to the element with the class 'ticket details, and makes it visible if invisible, and vice-versa
function toggle(event) 
{
    var ele = event.target
    console.log(ele)
    // end the function if the selected element is the edit button
    if(ele.classList.contains('editButton'))
    {
        return null
    }
    // if ele has any child elements, set it to the first child element
    if(ele.children[0] != null)
    {
        ele = ele.children[0]
    }
    // looking for an element with the class 'ticketDetails', if the element doesn't contain that, check the parent element. loop until it finds the correct element
    // this is here because it is possible to click on the child of ticketDetails. If this was not here, this function would only hide the element that was selected, 
    // rather than the entire div.ticketDetails
    while(!ele.classList.contains('ticketDetails'))
    {
        ele = ele.parentElement
    }

    if (ele.style.display === "none") 
    {
        ele.style.display = "block";
    } else 
    {
        ele.style.display = "none";
    }
} 

// a function that toggles the visability of the ticket details
function toggleDetails(event)
{
    // do nothing if the selected element is the button (because we want to be able to press that without collapsing the ticket details)
    if(event.target.classList.contains('editButton'))
    {
        return null 
    }
    // grab the li element that holds the entire ticket
    var details = event.target.closest('li')
    // grab the div element that represents the details 
    details=details.children[1]
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
    
    // get the editable elements
    var description = ticket.children[0]
    var priorityField = ticket.children[1].children[2]
    var narrativeText = ticket.children[1].children[3].children[0].children[0];
    var ticketId = ticket.children[1].children[4].getAttribute('value');// get id from hidden input field


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
            var data = {
                    _id: ticketId,
                    description: description.innerHTML,
                    priority: priorityField.innerHTML,
                    narrative: narrativeText.innerHTML
            }
            console.log(data._id);
            var json = JSON.stringify(data);
            postRequest.open('POST', '/dashboard/editTicket')
            postRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");           // console.log(ticketId.getAttribute('value'));
            postRequest.send(json)

          //  location.reload()

        }
    })
  }