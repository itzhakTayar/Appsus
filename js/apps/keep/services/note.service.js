import { storageService } from "../../../services/storage.service.js";
import { utilsService } from "../../../services/util.service.js";
export const noteService = {
  query,
  removeNote,
  changeBgc,
  createNote,
  togglePin,
  duplicateNote,
};
const STORAGE_KEY = "noteDB";
var gNotes = [];
_createNotes();
function _createNotes() {
  let notes = _loadNotesFromStorage();
  if (!notes || !notes.length) {
    notes = [
      {
        id: "n101",
        type: "txt",
        isPinned: false,
        info: {
          title: "Coding Academy",
          txt: "Fullstack Me Baby!",
        },
        style: {
          backgroundColor: "green",
        },
      },
      {
        id: "n102",
        type: "img",
        info: {
          url: "data:image/jpeg;base64,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",
          title: "React Is The Best!",
          txt: "React JS",
        },
        style: {
          backgroundColor: "#00d",
        },
        isPinned: false,
      },
      {
        id: "n103",
        txt: "todo",
        type: "todo",
        info: {
          title: "Get my stuff together",
          url: "",
          todos: [
            { txt: "Driving liscence", doneAt: null, id: 1 },
            { txt: "Coding power", doneAt: 187111111, id: 2 },
          ],
        },
        style: {
          backgroundColor: "green",
        },
        isPinned: false,
      },
      {
        id: "n104",
        type: "video",
        info: {
          url: "https://www.youtube.com/watch?v=tgbNymZ7vqY",
          title: "Best Video Ever",
          txt: "Muppets!",
        },
        style: {
          backgroundColor: "#00d",
        },
        isPinned: false,
      },
    ];
    gNotes = notes;
    _saveNotesToStorage();
    return;
  }
  gNotes = notes;
  // console.log(gNotes);
}

function query(filterBy = null) {
  // console.log(gNotes);
  if (!filterBy) return Promise.resolve(gNotes);
  const filteredNotes = _getFilteredNotes(gNotes, filterBy);
  return Promise.resolve(filteredNotes);
}
function removeNote(noteId) {
  let notes = gNotes;
  notes = notes.filter((note) => note.id !== noteId);
  gNotes = notes;
  _saveNotesToStorage();
  return Promise.resolve();
}
// function getNoteById(noteId) {
//   const notes = _loadnotesFromStorage();
//   const note = notes.find((note) => note.id === noteId);
//   return Promise.resolve(note);
// }

function _saveNotesToStorage() {
  storageService.saveToStorage(STORAGE_KEY, gNotes);
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY);
}

function createNote(reciveNote) {
  console.log(reciveNote);
  const { title, type, txt, url, todos } = reciveNote;
  console.log(todos);
  const note = {
    id: utilsService.makeId(),
    type,
    info: {
      title,
      txt,
    },
    isPinned: false,
    style: {
      backgroundColor: "#00d",
    },
  };
  if (url) {
    note.info.url = url;
  }
  if (todos) {
    note.info.todos = todos;
  }

  // getType(type, note);

  gNotes.unshift(note);

  _saveNotesToStorage();

  return Promise.resolve();
}
function getType(type, note) {
  switch (type) {
    case "img":
      note.info.url = "";
      break;
    case "video":
      note.info.url = "";
      break;
    case "todo":
      note.info.todos = [
        { txt: "Driving liscence", doneAt: null, id: utilsService.makeId() },
        { txt: "Coding power", doneAt: 187111111, id: utilsService.makeId() },
      ];
  }
}

function changeBgc(noteId, color) {
  const notes = gNotes;
  const note = notes.find((note) => note.id === noteId);
  note.style.backgroundColor = color;
  _saveNotesToStorage();
  return Promise.resolve(note);
}

function togglePin(noteId) {
  let notes = gNotes;
  const note = notes.find((note) => note.id === noteId);

  const noteIdx = notes.findIndex((note) => note.id === noteId);
  const noteToMove = notes.splice(noteIdx, 1);
  if (!note.isPinned) {
    note.isPinned = true;
    notes.unshift(note);
  } else {
    note.isPinned = false;
    notes.push(note);
  }

  gNotes = notes;

  // if (!note.isPinned) notes = [noteToMove, ...notes];
  // else notes = [...notes, noteToMove];
  // noteToMove.isPinned = !noteToMove.isPinned;
  _saveNotesToStorage();
  return Promise.resolve(noteToMove);
}
function duplicateNote(noteId) {
  let notes = gNotes;
  const noteIdx = notes.findIndex((note) => noteId === note.id);
  const note = JSON.parse(JSON.stringify(notes[noteIdx]));
  note.id = utilsService.makeId();
  notes.splice(noteIdx, 0, note);
  _saveNotesToStorage();
  return Promise.resolve();
}
