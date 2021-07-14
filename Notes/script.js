const notes = document.querySelector(".notes");
const addNote = document.querySelector("#add_note");

// Add new note
addNote.addEventListener('click', function () {
    console.log('add note clicked');

    addNewNote();
});

function addNewNote(savedNoteText = '') {
    var note = document.createElement('div');
    note.classList.add('note'); // To add class name

    note.innerHTML = `
                <div class="toolbar">
                    <button class="stop_edit_note ${savedNoteText ? 'hidden' : 'visible'}">
                        <span class="material-icons">edit_off</span>
                    </button>
                    <button class="edit_note ${savedNoteText ? 'visible' : 'hidden'}">
                        <span class="material-icons">edit</span>
                    </button>
                    <button class="delete_note">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
                <textarea name="Note" class="note_text" cols="35" rows="18" placeholder="Add new note"></textarea>
    `;

    notes.appendChild(note); // Add element to notes tree

    const editNote = note.querySelector(".edit_note");
    const stopEditNote = note.querySelector(".stop_edit_note");
    const deleteNote = note.querySelector(".delete_note");
    const noteText = note.querySelector(".note_text");

    if (!savedNoteText)
        noteText.focus();
    else
        noteText.value = savedNoteText;

    editNote.addEventListener('click', function () {
        console.log('edit note clicked');

        noteText.focus();
    });
    stopEditNote.addEventListener('click', function () {
        console.log('stop edit note clicked');

        noteText.blur();
    });
    deleteNote.addEventListener('click', function () {
        console.log('delete note clicked');

        notes.removeChild(note);
        saveNotes();
    });
    noteText.addEventListener('focus', function () {
        console.log('focus');

        editNote.classList.replace('visible', 'hidden');
        stopEditNote.classList.replace('hidden', 'visible');
    });
    noteText.addEventListener('blur', function () {
        console.log('blur');

        stopEditNote.classList.replace('visible', 'hidden');
        editNote.classList.replace('hidden', 'visible');

        saveNotes();
    });
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note_text").forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
    console.log('notes saved');
}

function getSavedNotes() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    console.log(notes);
    if (notes) {
        notes.forEach(note => {
            addNewNote(note);
        });
    }
}

getSavedNotes();