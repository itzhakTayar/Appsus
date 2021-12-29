import { storageService } from '../../../services/storage.service.js';

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
        id: 'n101',
        type: 'txt',
        isPinned: true,
        info: {
          title: 'Bobi and Me',
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n102',
        type: 'img',
        info: {
          url: 'https://lh3.googleusercontent.com/proxy/Du390BhqfyB5oZmHQS0MM3G_dogfJ-lbQFjiU6QXXGHwatt6OEf1WMGcWfTiJTJJZ1OsAHDdApJHoyA9n8RxJUzxsC0xy199Gn4_Mkx8QkZ9',
          title: 'Bobi and Me',
          txt: 'hi ',
        },
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: 'n103',
        txt: 'todo',
        type: 'todo',
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Driving liscence', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n104',
        type: 'video',
        info: {
          url: 'https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=tgbNymZ7vqY',
          title: 'Bobi and Me',
          txt: 'hi ',
        },
        style: {
          backgroundColor: '#00d',
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
      todos: [
        { id: 1, txt: 'Driving liscence', doneAt: null },
        { id: 2, txt: 'Coding' },
      ],
    },
  };
}

function _saveNotesToStorage(notes) {
  storageService.saveToStorage(STORAGE_KEY, notes);
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY);
}
