import { NoteFilter } from "./note-filter.jsx";
const { NavLink } = ReactRouterDOM;
export class NotesHeader extends React.Component {
  state = {};
  render() {
    return (
      <section className="notes-header header-layout flex">
        <h1 className="email-logo">Miss Keep</h1>
        <NoteFilter onSetFilter={this.props.setFilter} />
        <NavLink
          to="/notes/create"
          className="add-note-btn clean-link fas fa-pencil-alt"
          onClick={() => {}}
        ></NavLink>
      </section>
    );
  }
}
