// import { utilService } from './util.service.js';
import { storageService } from './services/storage.service.js';

export const noteService = {
  query,
  removeNote,
  getNoteById,
  addNote,
};
const STORAGE_KEY = 'noteDB';
_createNotes();

function _createNotes() {
  console.log('create..');
  let notes = _loadNotesFromStorage();
  if (!notes || !notes.length) {
    notes = [
      {
        txt: 'fcbjn',
        id: 'n101',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n102',
        txt: 'cgvfdvf',
        type: 'note-img',
        info: {
          url: 'http://some-img/me',
          title: 'Bobi and Me',
        },
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: 'n103',
        txt: 'gjgfjfdjd',
        type: 'note-todos',
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Driving liscence', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
    ];
    _saveNotesToStorage(notes);
  }
}

function query(filterBy = null) {
  const notes = _loadNotesFromStorage();
  if (!filterBy) return Promise.resolve(notes);
  const filteredNotes = _getFilteredNotes(notes, filterBy);
  return Promise.resolve(filteredNotes);
}
function removeNote(noteId) {
  let notes = _loadnotesFromStorage();
  notes = notes.filter((note) => note.id !== noteId);
  _saveNotesToStorage(notes);
  return Promise.resolve();
}
function getNoteById(noteId) {
  const notes = _loadnotesFromStorage();
  const note = notes.find((note) => note.id === noteId);
  return Promise.resolve(note);
}
function addNote(noteToSave) {
  let notes = _loadnotesFromStorage();
  let newNote = _createNote(noteToSave);
  notes = [newNote, ...notes];
  _saveNotesToStorage(notes);
  return Promise.resolve();
}
function _createNote(note) {
  return {
    id: 'n103',
    type: 'note-todos',
    info: {
      label: 'Get my stuff together',
      todos: [{ txt: 'Driving liscence', doneAt: null }, { txt: 'Coding' }],
    },
  };
}

function _saveNotesToStorage(notes) {
  storageService.saveToStorage(STORAGE_KEY, notes);
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY);
}
