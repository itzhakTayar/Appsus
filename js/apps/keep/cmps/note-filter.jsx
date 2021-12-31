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
      filterBy: { title, type },
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
        <input
          type="text"
          id="by-type"
          name="type"
          value={type}
          onChange={this.handleChange}
        />

        <button>Filter</button>
      </form>
    );
  }
}
