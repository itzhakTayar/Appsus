import { noteService } from "../services/note.service.js";
import { DynamicAdd } from "./DynamicAdd.jsx";

export class AddNote extends React.Component {
  state = {
    note: {
      title: "",
      type: "txt",
      txt: "",
    },
  };

  inputRef = React.createRef();

  componentDidMount() {
    this.inputRef.current.focus();
  }

  onSaveNote = (ev) => {
    ev.preventDefault();
    noteService.createNote(this.state.note).then(() => {
      this.props.onToggleNoteModal();
      this.props.onAdd();
    });
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
          <h1>Add Note</h1>
          <button
            className="btn-toggle-modal"
            onClick={() => this.props.onToggleNoteModal()}
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
              <option value="img">imge</option>
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
