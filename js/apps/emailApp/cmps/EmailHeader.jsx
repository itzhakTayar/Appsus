export function EmailHeader({onSearch}) {
  return (
    <header className="email-header">
      <div className="header-content">
        <h1>Text</h1>
        <input type="text" placeholder="Search Email" onChange={(ev)=>{
          onSearch(ev.target.value)
        }} />
        <h1>Logo</h1>
      </div>
    </header>
  );
}
