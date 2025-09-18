function Catalog({ citizens }) {
  return (
    <div>
      <h1>Картотека</h1>
      <div>Список: {citizens.slice(0, 5).map(c => <div key={c.id}>{c.fullName}</div>)}</div>
    </div>
  );
}
export default Catalog;