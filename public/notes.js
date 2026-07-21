const loadNotes = async () => {
    try {
        const response = await fetch('/notes');
        const data = await response.json();
        notes = data;
        displayNotes(notes);
    }
    catch (error) {
        console.error(error);
    }
}
const popup = () => {
    let text = document.getElementById("noteBlock");
    text.style.display = "block"
}

const savenote = async () => {
    let title = document.getElementById("noteTitle").value;
    let context = document.getElementById("noteContent").value;
    if (title.trim() === "" || context.trim() === "") {
        alert("Please fill the complete note");
        return;
    }
    let note = {
        id: Date.now(),
        title, context
    }

    try {
        const response = await fetch('/notes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        });
        if (response.ok) {
            await loadNotes();

            document.getElementById("noteTitle").value = "";
            document.getElementById("noteContent").value = "";
            document.getElementById("noteBlock").style.display = "none";

        }
    }
    catch (error) {
        console.error(error);
    }
}



const closebutton = () => {
    document.getElementById("noteBlock").style.display = "none";
}

const displayNotes = (notesToDisplay) => {
    let container = document.getElementById("displayNote");
    container.innerHTML = "";
    notesToDisplay.forEach((note, index) => {
        let displayCard = document.createElement("div");
        displayCard.className = "noteCard";
        displayCard.innerHTML = `<h3>${note.title}</h3>
        <p>${note.context}</p>`
            ;
        displayCard.addEventListener("click", () => {
            displayCard.classList.toggle("expanded");
        });

        const deletebtn = () => {
            const deletebutton = document.createElement("button");
            deletebutton.className = " deleteBtn ";
            deletebutton.textContent = "🗑";
            deletebutton.addEventListener("click", (event) => {
                event.stopPropagation();
                notes.splice(index, 1);
                displayNotes(notes);
            })
            displayCard.appendChild(deletebutton);
        }
        deletebtn();
        container.appendChild(displayCard);

    });
}

const searchNotes = () => {
    let searchInput = document.getElementById("searchNote").value.toLowerCase();
    let filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(searchInput) || note.context.toLowerCase().includes(searchInput);
    });
    displayNotes(filteredNotes);
}
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener("click", popup);
let savebtn = document.getElementById("savebtn");
savebtn.addEventListener("click", savenote);
let closebtn = document.getElementById("closebtn");
closebtn.addEventListener("click", closebutton);
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchNotes);
window.addEventListener("DOMContentLoaded", loadNotes); 5