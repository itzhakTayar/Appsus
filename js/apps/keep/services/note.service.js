import { storageService } from "../../../services/storage.service.js";
import { utilsService } from "../../../services/util.service.js";
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
const STORAGE_KEY = "noteDB";
var gNotes = [];
_createNotes();
function _createNotes() {
  let notes = _loadNotesFromStorage();
  if (!notes || !notes.length) {
    notes = [
      {
        id: utilsService.makeId(),
        type: "txt",
        isPinned: false,
        info: {
          title: "Coding Academy",
          txt: "Fullstack Me Baby!",
        },
        style: {
          backgroundColor: utilsService.getRandomColor(),
        },
        labels: [],
      },

      {
        id: utilsService.makeId(),
        type: "img",
        info: {
          url: "https://www.thecoderpedia.com/wp-content/uploads/2020/06/Programming-Memes-Programmer-while-sleeping.jpg?x34900",
          title: "those nigths",
          txt: "",
        },
        style: {
          backgroundColor: "#FFAEBC",
        },
        isPinned: false,
        labels: [],
      },
      {
        id: utilsService.makeId(),
        type: "img",
        info: {
          url: "https://i.pinimg.com/736x/ac/b7/f9/acb7f99ba0ef473e03ee81e91a6281ee.jpg",
          title: "small moments of happiness",
          txt: "",
        },
        style: {
          backgroundColor: utilsService.getRandomColor(),
        },
        isPinned: false,
        labels: [],
      },

      {
        id: utilsService.makeId(),
        type: "img",
        info: {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6XzV0RV7_v0XMjgbXsvJB8s6jIb0EpFVHxA&usqp=CAU",
          title: "momy is Proud ",
          txt: "",
        },
        style: {
          backgroundColor: utilsService.getRandomColor(),
        },
        isPinned: false,
        labels: [],
      },
      {
        id: utilsService.makeId(),
        type: "img",
        info: {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD9_mzPUcJcCzB3jCGNL81VRHICgiVcwcHwg&usqp=CAU",
          title: "debugging is fun",
          txt: "",
        },
        style: {
          backgroundColor: utilsService.getRandomColor(),
        },
        isPinned: false,
        labels: [],
      },
      {
        id: utilsService.makeId(),
        type: "img",
        info: {
          url: "https://www.meme-arsenal.com/memes/1f88761f5857a6af5c1fc987050b00b7.jpg",
          title: "Misses those days",
          txt: "",
        },
        style: {
          backgroundColor: utilsService.getRandomColor(),
        },
        isPinned: false,
        labels: [],
      },
      {
        id: utilsService.makeId(),
        type: "todo",
        info: {
          title: "Get my stuff together",
          txt: "",
          url: "",
          todos: [
            {
              txt: "Driving liscence",
              doneAt: null,
              id: utilsService.makeId(),
            },
            {
              txt: "Coding power",
              doneAt: 187111111,
              id: utilsService.makeId(),
            },
          ],
        },
        style: {
          backgroundColor: utilsService.getRandomColor(),
        },
        isPinned: false,
        labels: [],
      },
      {
        id: utilsService.makeId(),
        type: "video",
        info: {
          url: "https://www.youtube.com/watch?v=tgbNymZ7vqY",
          title: "Best Video Ever",
          txt: "Muppets!",
        },
        style: {
          backgroundColor: utilsService.getRandomColor(),
        },
        isPinned: false,
        labels: [],
      },
      {
        id: utilsService.makeId(),
        type: "video",
        info: {
          url: "https://www.youtube.com/watch?v=fYvCicex2lU",
          title: "Awesome moment",
          txt: "Great Time!",
        },
        style: {
          backgroundColor: utilsService.getRandomColor(),
        },
        isPinned: false,
        labels: [],
      },
      {
        id: utilsService.makeId(),
        type: "video",
        info: {
          url: "https://www.youtube.com/watch?v=PA7SmSR1dLo",
          title: "The job inerview",
          txt: "Let Work!",
        },
        style: {
          backgroundColor: utilsService.getRandomColor(),
        },
        isPinned: false,
        labels: [],
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
function _getNoteById(noteId) {
  const note = gNotes.find((note) => note.id === noteId);
  return note;
}

function setNoteTodos(currTodo) {
  currTodo.doneAt = new Date();
  _saveNotesToStorage();
  return Promise.resolve();
}

function _getNoteIdx(id) {
  var idx = gNotes.findIndex((note) => note.id === id);
  return idx;
}

function createNote(reciveNote) {
  var oldNote = _getNoteById(reciveNote.id);
  console.log(reciveNote);
  const { title, type, txt, todos } = reciveNote;
  var { url } = reciveNote;
  if (reciveNote.info) {
    if (reciveNote.info.url) url = reciveNote.info.url;
  }
  const note = {
    id: utilsService.makeId(),
    type,
    info: {
      title,
      txt,
    },
    labels: reciveNote.labels,
  };
  if (!oldNote) {
    (note.style = {
      backgroundColor: "#FFAEBC",
    }),
      (note.isPinned = false);
  }
  if (url) {
    note.info.url = url;
  }
  if (todos) {
    note.info.todos = todos;
  }
  if (oldNote) {
    oldNote.info = note.info;
    oldNote.type = note.type;
    oldNote.labels = note.labels;
    var idx = _getNoteIdx(oldNote.id);
    gNotes[idx] = oldNote;
  } else {
    gNotes.unshift(note);
  }
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
