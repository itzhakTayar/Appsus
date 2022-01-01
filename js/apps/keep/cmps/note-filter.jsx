export class NoteFilter extends React.Component {
  state = {
    filterBy: {
      title: '',
      type: '',
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
    this.setState({ filterBy: { title: '', type: '' } });
  };

  render() {
    const {
      filterBy: { title },
    } = this.state;

    return (
      <form className="note-filter" onSubmit={this.onSubmitFilter}>
        <label htmlFor="by-title">By Title:</label>
        <input
          type="text"
          id="by-title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <label htmlFor="by-type">type:</label>
        <select id="by-type" name="type" onChange={this.handleChange}>
          <option value="">all</option>
          <option value="img">image</option>
          <option value="todo">todo</option>
          <option value="txt">text</option>
          <option value="video">video</option>
        </select>
      </form>
    );
  }
}
