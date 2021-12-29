// const { Link } = ReactRouterDOM

export function EmailFilters(props) {
  return (
    <section className="email-filters">
      <ul className="clean-list">
        <li className="email-filter-item" onClick={()=>{
        props.onAddEmail();
        }}>Create</li>
        <li className="email-filter-item">inbox</li>
        <li className="email-filter-item">sent</li>
        <li className="email-filter-item">trash</li>
        <li className="email-filter-item">spam</li>
      </ul>
    </section>
  );
}
