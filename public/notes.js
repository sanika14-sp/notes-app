let notes = [];
const popup = () => {
    let text = document.getElementById("noteBlock");
    text.style.display = "block"
}

const savenote = () => {
    let title = document.getElementById("noteTitle").value;
    let context = document.getElementById("noteContent").value;
    let note = {
        title, context
    }
    notes.push(note);
    console.log(notes);
    if(title === "" || context === ""){
        alert("Please fill the complete note");
        return;
    }
    displayNotes();
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
    document.getElementById("noteBlock").style.display = "none";
}

const closebutton = ()=>{
    document.getElementById("noteBlock").style.display = "none";
}

const displayNotes = () => {
    let container = document.getElementById("displayNote");
    container.innerHTML = "";
    notes.forEach((note, index) => {
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
            deletebutton.className = " deletebtn ";
            deletebutton.textContent = "🗑";
            deletebutton.addEventListener("click", () => {
                event.stopPropagation();
                notes.splice(index, 1);
                displayNotes();
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
        
    })

}
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener("click", popup);
let savebtn = document.getElementById("savebtn");
savebtn.addEventListener("click", savenote);
let closebtn = document.getElementById("closebtn");
closebtn.addEventListener("click", closebutton);
