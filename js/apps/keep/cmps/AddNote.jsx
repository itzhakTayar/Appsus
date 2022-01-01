import { eventBusService } from "../../../services/event-bus.service.js";
import { noteService } from "../services/note.service.js";
import { DynamicAdd } from "./DynamicAdd.jsx";
import { LableModal } from "./LabelModal.jsx";

export class AddNote extends React.Component {
  state = {
    note: {
      title: "",
      type: "txt",
      labels: [],
      txt: "",
      info: null,
    },
    isShowLableModal: false,
  };

  inputRef = React.createRef();

  componentDidMount() {
    var { noteToEdit } = this.props;
    var { emailToNote } = this.props;
    if (noteToEdit) {
      var newNote = {};
      newNote.title = noteToEdit.info.title;
      newNote.type = noteToEdit.type;
      newNote.labels = noteToEdit.labels;
      newNote.txt = noteToEdit.info.txt;
      newNote.id = noteToEdit.id;
      newNote.info = noteToEdit.info;
      this.setState({ note: newNote });
    } else if (emailToNote) {
      this.setState({ note: emailToNote });
    }
    this.inputRef.current.focus();
  }
  setLables = (lable) => {
    var { labels } = this.state.note;
    labels.push(lable);
    console.log(labels);
    this.setState({ labels });
  };
  onSaveNote = (ev) => {
    ev.preventDefault();
    var { note } = this.state;
    // console.log(note);
    // let isBlank = this.preventBlankNote(note);

    // if (isBlank) {
    //   eventBusService.emit('user-msg', {
    //     txt: 'cant add blank note',
    //     type: 'warning',
    //   });
    //   return;
    // }
    noteService.createNote(note).then(() => {
      eventBusService.emit("user-msg", {
        txt: "Note Added!",
        type: "success",
      });
      this.props.closeNoteModal();
      this.props.onAdd();
    });
  };
  preventBlankNote = (note) => {
    console.log(note.todo);
    let isBlank = false;
    if (
      (note.type === "img" && !note.url) ||
      (note.type === "video" && !note.url) ||
      (note.type === "todo" && !note.todos) ||
      (note.type === "txt" && !note.txt)
    ) {
      isBlank = true;
      return isBlank;
    }
  };
  onToggleLableModal = () => {
    this.setState({ isShowLableModal: !this.state.isShowLableModal });
  };
  addDynamicAdd = (field, value) => {
    this.setState((prevState) => ({
      note: { ...prevState.note, [field]: value },
    }));
  };
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      note: { ...prevState.note, [field]: value },
    }));
  };
  render() {
    const { title, type, txt, url } = this.state.note;
    return (
      <section className="note-add">
        <div className="note-modal">
          <div className="note-modal-header">
            <h1>Add Note</h1>
            <button
              className="btn-toggle-modal"
              onClick={() => {
                this.props.closeNoteModal();
              }}
            >
              ❌
            </button>
          </div>

          {/* <button
            onClick={() => {
              this.onToggleLableModal();
            }}
          >
            Add lable
          </button> */}
          {this.state.isShowLableModal && (
            <LableModal
              onToggleLableModal={this.onToggleLableModal}
              setLable={this.setLables}
            />
          )}
          <form onSubmit={this.onSaveNote} className="note-form">
            <label htmlFor="title">Title:</label>
            <input
              ref={this.inputRef}
              placeholder="Enter Title"
              name="title"
              type="text"
              id="title"
              value={title}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <select name="type" onChange={this.handleChange} value={type}>
              <option value="txt">Text</option>
              <option value="img">Image</option>
              <option value="video">Video</option>
              <option value="todo">Todo</option>
            </select>
            <DynamicAdd
              isEdit={this.props.isEdit}
              changeValue={this.addDynamicAdd}
              url={url}
              note={this.state.note}
            />
            <textarea
              name="txt"
              value={txt}
              onChange={this.handleChange}
            ></textarea>
            <button onClick={this.click} className="add-btn-modal">
              Add Note
            </button>
          </form>
        </div>
      </section>
    );
  }
}
