import { storageService } from '../../../services/storage.service.js';
import { utilsService } from '../../../services/util.service.js';
export const noteService = {
  query,
  removeNote,
  changeBgc,
  createNote,
  togglePin,
  duplicateNote,
};
const STORAGE_KEY = 'noteDB';
var gNotes = [];
_createNotes();
function _createNotes() {
  let notes = _loadNotesFromStorage();
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        type: 'txt',
        isPinned: false,
        info: {
          title: 'Coding Academy',
          txt: 'Fullstack Me Baby!',
        },
        style: {
          backgroundColor: 'green',
        },
      },
      {
        id: 'n102',
        type: 'img',
        info: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Fgolden-retriever-royalty-free-image-506756303-1560962726.jpg%3Fcrop%3D0.672xw%3A1.00xh%3B0.166xw%2C0%26resize%3D640%3A*&imgrefurl=https%3A%2F%2Fwww.goodhousekeeping.com%2Flife%2Fpets%2Fadvice%2Fg1921%2Flarge-dog-breeds%2F&tbnid=btQ8-aZ4x2YyMM&vet=12ahUKEwi4nYeDxY71AhVJnRoKHfaWAm8QMygCegUIARCvAQ..i&docid=FofFudZ0yWjNIM&w=640&h=635&itg=1&q=dog&ved=2ahUKEwi4nYeDxY71AhVJnRoKHfaWAm8QMygCegUIARCvAQ',
          title: 'React Is The Best!',
          txt: 'React JS',
        },
        style: {
          backgroundColor: '#00d',
        },
        isPinned: false,
      },
      {
        id: 'n103',
        txt: 'todo',
        type: 'todo',
        info: {
          title: 'Get my stuff together',
          url: '',
          todos: [
            { txt: 'Driving liscence', doneAt: null, id: 1 },
            { txt: 'Coding power', doneAt: 187111111, id: 2 },
          ],
        },
        style: {
          backgroundColor: 'green',
        },
        isPinned: false,
      },
      {
        id: 'n104',
        type: 'video',
        info: {
          url: 'https://www.youtube.com/watch?v=tgbNymZ7vqY',
          title: 'Best Video Ever',
          txt: 'Muppets!',
        },
        style: {
          backgroundColor: '#00d',
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

// function query(filterBy = null) {
//   // console.log(gNotes);
//   if (!filterBy) return Promise.resolve(gNotes);
//   const filteredNotes = _getFilteredNotes(gNotes, filterBy);
//   return Promise.resolve(filteredNotes);
// }
function query(filterBy = null) {
  const notes = gNotes;
  if (!filterBy) return Promise.resolve(notes);
  const filteredNotes = _getFilteredNotes(notes, filterBy);
  console.log(filteredNotes);
  return Promise.resolve(filteredNotes);
}

function _getFilteredNotes(notes, filterBy) {
  console.log(filterBy, 'filterby');

  let { title, type } = filterBy;
  console.log(title);

  return notes.filter((note) => {
    // console.log(note, 'kkk');
    return (
      note.info.title.toUpperCase().includes(title.toUpperCase()) &&
      note.type.toUpperCase().includes(type.toUpperCase())
    );
  });
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
      backgroundColor: 'red',
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
