export function ChangeColor({ noteId, onChangeBgc }) {
  const colors = [
    "#FFAEBC",
    "#B4F8C8",
    "#A0E7E5",
    "#FBE7C6",
    "#FFFAF0",
    "#FFF0F5",
  ];
  return (
    <div className="color-input">
      {colors.map((color) => {
        return (
          <div
            onClick={() => onChangeBgc(noteId, color)}
            style={{ backgroundColor: color }}
            key={color}
            className="color-value"
          ></div>
        );
      })}
    </div>
  );
}
