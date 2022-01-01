import { eventBusService } from '../../../services/event-bus.service.js';
import { noteService } from '../services/note.service.js';
import { DynamicAdd } from './DynamicAdd.jsx';
import { LableModal } from './LabelModal.jsx';

export class AddNote extends React.Component {
  state = {
    note: {
      title: '',
      type: 'txt',
      labels: [],
      txt: '',
    },
    isShowLableModal: false,
  };

  inputRef = React.createRef();

  componentDidMount() {
    var note = this.props.note;
    if (note) {
      console.log(note);
      var newNote = {
        title: note.info.title,
        type: note.type,
        labels: note.labels,
        txt: note.info.txt,
      };
      console.log(newNote);
      this.setState({ note: newNote });
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
    noteService.createNote(this.state.note).then(() => {
      eventBusService.emit('user-msg', {
        txt: 'Note Added!',
        type: 'success',
      });
      this.props.onToggleNoteModal();
      this.props.onAdd();
    });
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
    console.log(this.state.note);
    return (
      <section className="note-add">
        <div className="note-modal">
          <h1>Add Note</h1>
          <button
            onClick={() => {
              this.onToggleLableModal();
            }}
          >
            add lable
          </button>
          {this.state.isShowLableModal && (
            <LableModal
              onToggleLableModal={this.onToggleLableModal}
              setLable={this.setLables}
            />
          )}
          <button
            className="btn-toggle-modal"
            onClick={() => {
              this.props.onToggleNoteModal();
            }}
          >
            ×
          </button>
          <form onSubmit={this.onSaveNote} className="note-form">
            <label htmlFor="title">title:</label>
            <input
              ref={this.inputRef}
              placeholder="Enter title"
              name="title"
              type="text"
              id="title"
              value={title}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <select name="type" onChange={this.handleChange} value={type}>
              <option value="txt">text</option>
              <option value="img">image</option>
              <option value="video">video</option>
              <option value="todo">todo</option>
            </select>
            <DynamicAdd
              changeValue={this.addDynamicAdd}
              url={url}
              note={this.state.note}
            />
            <textarea
              name="txt"
              cols="30"
              rows="10"
              value={txt}
              onChange={this.handleChange}
            ></textarea>
            <button onClick={this.click}>Add Note</button>
          </form>
        </div>
      </section>
    );
  }
}
