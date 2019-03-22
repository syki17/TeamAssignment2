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
        //create the li element (the entire ticket will be encased in this)
        var li = document.createElement('li')
        li.appendChild(document.createTextNode(ticket.description))
        li.classList.add('list-group-item', 'list-group-item-action')
        li.onclick = toggle
        ticketsEle.item(0).append(li)

        //create the div element (the part that contains the details, and is hidden by default)
        var div = document.createElement('div')
        div.classList.add('ticketDetails')
        div.style.display = 'none'
        li.append(div)
        
        //create the p element for priority
        var priority = document.createElement('p')
        priority.appendChild(document.createTextNode('Priority: ' + ticket.priority))
        div.append(priority)

        //create the p element for narrative
        var narrative = document.createElement('p')
        narrative.appendChild(document.createTextNode('narrative: '))
        div.append(narrative)

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
    }
}

// a function for toggling the visibility of the selected ticket's details
// accepts a page element, navigates to the element with the class 'ticket details, and makes it visible if invisible, and vice-versa
function toggle(event) {
    var ele = event.target
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

  function toggleClosed(event)
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