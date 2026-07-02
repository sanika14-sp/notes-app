let notes = [];
const popup = () => {
    let text = document.getElementById("noteBlock");
    text.style.display = "block"
}
const savenote = () => {
    let title = document.getElementById("noteTitle").value;
    let context = document.getElementById("noteContent").value;
    let note = {
        title,context
    }
    notes.push(note);
    console.log(notes);
}
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener("click", popup);
let savebtn = document.getElementById("savebtn");
savebtn.addEventListener("click", savenote);

