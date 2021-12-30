import { storageService } from '../../../services/storage.service.js';
import { utilsService } from '../../../services/util.service.js';
export const noteService = {
  query,
  // removeNote,
  // getNoteById,
  createNote,
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
        isPinned: true,
        info: {
          title: 'Bobi and Me',
          txt: 'Fullstack Me Baby!',
          url: '',
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
          title: 'Get my stuff together',
          url: '',
          todos: [
            { txt: 'Driving liscence', doneAt: null, id: 1 },
            { txt: 'Coding power', doneAt: 187111111, id: 2 },
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
// function removeNote(noteId) {
//   let notes = _loadnotesFromStorage();
//   notes = notes.filter((note) => note.id !== noteId);
//   _saveNotesToStorage(notes);
//   return Promise.resolve();
// }
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
    case 'img':
      note.info.url = '';
      break;
    case 'video':
      note.info.url = '';
      break;
    case 'todo':
      note.info.todos = [
        { txt: 'Driving liscence', doneAt: null, id: utilsService.makeId() },
        { txt: 'Coding power', doneAt: 187111111, id: utilsService.makeId() },
      ];
  }
}
