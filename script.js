const itemList = document.querySelector('#item-list')
const addItemInput = document.querySelector('#item-input')
const addItemButton = document.querySelector('.form-control button')
const filterInput = document.querySelector('#filter')

if (localStorage.getItem("memoryStr")) {
    const memoryArr = JSON.parse(localStorage["memoryStr"])
    memoryArr.forEach(addNewItemToDom)
} else {
    // Create a new object that will store all the items
    localStorage["memoryStr"] = JSON.stringify([])
}

filterInput.addEventListener('keyup', function(e) {
    const filterQ = this.value.toLowerCase()

    itemList.querySelectorAll('li').forEach(item => {
        item.style.display = 
        ( item.innerText.toLowerCase().includes(filterQ) )
        ? 'flex' : 'none'
    })
    
})

addItemButton.addEventListener('click', e => {
    e.preventDefault()
    const itemName = addItemInput.value
    if (itemName !== '') {
        addNewItemToDom(itemName)
        addItemInput.value = ''

        // add item to localStorage
        const memoryArr = JSON.parse(localStorage["memoryStr"])
        memoryArr.push(itemName)
        localStorage["memoryStr"] = JSON.stringify(memoryArr)
    }
})

// Event Delegation: add it once but act on children
itemList.addEventListener('click', e => {
    const clickedElt = e.target
    if (clickedElt.tagName === 'I') {
        const itemToRemove = clickedElt.parentElement.parentElement
        const memoryArr = JSON.parse(localStorage["memoryStr"]).filter(
            name => (name !== itemToRemove.innerText)
        );
        localStorage["memoryStr"] = JSON.stringify(memoryArr)

        itemToRemove.remove()
    }

    // DECIDED NOT TO DO EDIT FUNCTIONALITY JUST CAUSE
    else if (clickedElt.tagName === 'LI') {
        alert('DECIDED NOT TO DO EDIT FUNCTIONALITY JUST CAUSE')
    }
})


document.querySelector('#clear').addEventListener('click', e => {
    while (itemList.childElementCount) {
        itemList.firstElementChild.remove()
    }
    localStorage.setItem("memoryStr", "[]")
})

function addNewItemToDom(itemName) {
    const listItem = document.createElement('li')
    listItem.appendChild(document.createTextNode(itemName))
    
    const removeButton = document.createElement('button')
    removeButton.className = "remove-item btn-link text-red"

    const icon = document.createElement('i')
    icon.className = "fa-solid fa-xmark"
    removeButton.appendChild(icon)

    listItem.appendChild(removeButton)

    itemList.appendChild(listItem)
}
