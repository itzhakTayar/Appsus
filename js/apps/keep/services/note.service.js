import { storageService } from '../../../services/storage.service.js';
import { utilsService } from '../../../services/util.service.js';
export const noteService = {
  query,
  removeNote,
  changeBgc,
  createNote,
  togglePin,
  duplicateNote,

  setNoteTodos,
  sortTodos,
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
          backgroundColor: '#B4F8C8',
        },
        lable: [],
      },
      {
        id: 'n102',
        type: 'img',
        info: {
          url: 'https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/templates/social/reactt-light_1200x628.png?sfvrsn=43eb5f2a_2',
          title: 'React Is The Best!',
          txt: 'React JS',
        },
        style: {
          backgroundColor: '#FFAEBC',
        },
        isPinned: false,
        lable: [],
      },
      {
        id: 'n103',
        type: 'todo',
        info: {
          title: 'Get my stuff together',
          txt: '',
          url: '',
          todos: [
            {
              txt: 'Driving liscence',
              doneAt: null,
              id: utilsService.makeId(),
            },
            {
              txt: 'Coding power',
              doneAt: 187111111,
              id: utilsService.makeId(),
            },
          ],
        },
        style: {
          backgroundColor: '#B4F8C8',
        },
        isPinned: false,
        lable: [],
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
          backgroundColor: '#FFAEBC',
        },
        isPinned: false,
        lable: [],
      },
    ];
    gNotes = notes;
    _saveNotesToStorage();
    return;
  }
  gNotes = notes;
}

function query(filterBy = null) {
  const notes = gNotes;
  if (!filterBy) return Promise.resolve(notes);
  const filteredNotes = _getFilteredNotes(notes, filterBy);
  return Promise.resolve(filteredNotes);
}

function _getFilteredNotes(notes, filterBy) {
  let { title, type } = filterBy;

  return notes.filter((note) => {
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

function setNoteTodos(currTodo) {
  currTodo.doneAt = new Date();
  _saveNotesToStorage();
  return Promise.resolve();
}

function createNote(reciveNote) {
  const { title, type, txt, url, todos } = reciveNote;
  const note = {
    id: utilsService.makeId(),
    type,
    info: {
      title,
      txt,
    },
    isPinned: false,
    lable: reciveNote.labels,
    style: {
      backgroundColor: 'white',
    },
  };
  if (url) {
    note.info.url = url;
  }
  if (todos) {
    note.info.todos = todos;
  }
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

function sortTodos(todos, note) {
  todos.sort((t1, t2) => {
    if (t1.doneAt && !t2.doneAt) {
      return 1;
    } else if (!t1.doneAt && t2.doneAt) {
      return -1;
    }
    return 0;
  });
  if (note) {
    note.todos = todos;
    _saveNotesToStorage();
    return Promise.resolve();
  }
  return todos;
}

function _saveNotesToStorage() {
  storageService.saveToStorage(STORAGE_KEY, gNotes);
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY);
}
