export class NoteFilter extends React.Component {
  state = {
    filterBy: {
      title: "",
      type: "",
    },
  };

  onSubmitFilter = (ev) => {
    ev.preventDefault();
    this.props.onSetFilter(this.state.filterBy);
    this.cleanForm();
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => {
        this.props.onSetFilter(this.state.filterBy);
      }
    );
  };

  cleanForm = () => {
    this.setState({ filterBy: { title: "", type: "" } });
  };

  render() {
    const {
      filterBy: { title },
    } = this.state;

    return (
      <form className="note-filter flex" onSubmit={this.onSubmitFilter}>
        <label htmlFor="by-title">
          By Title:
          <input
            type="text"
            id="by-title"
            name="title"
            value={title}
            onChange={this.handleChange}
            placeholder="Search"
          />
        </label>

        <label htmlFor="by-type">
          Type:
          <select id="by-type" name="type" onChange={this.handleChange}>
            <option value="">All</option>
            <option value="img">Image</option>
            <option value="todo">To-Do</option>
            <option value="txt">Text</option>
            <option value="video">Video</option>
          </select>
        </label>
      </form>
    );
  }
}
