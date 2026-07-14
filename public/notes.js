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
    displayNotes();
}
const displayNotes = () => {
    let container = document.getElementById("displayNote");
    container.innerHTML = "";
   Notes.forEach((note) => {
        let displayCard = document.createElement("div");
        displayCard.className = "noteCard";
        displayCard.innerHTML = `<h3>${note.title}</h3>
    <p>${note.context}</p>`;
        container.appendChild(displayCard);
    });

}
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener("click", popup);
let savebtn = document.getElementById("savebtn");
savebtn.addEventListener("click", savenote);

