export function LableModal() {
  state = {
    isShowNoteModal: false,
  };
  const setLable = () => {
    console.log('click');
  };

  onToggleLableModal = () => {
    this.setState({ isShowNoteModal: !this.state.isShowNoteModal });
  };

  return (
    <div className="lable-modadl">
      <button onClick={setLable()}>critical</button>
      <button>spam</button>
      <button>work</button>
      <button>friend</button>
    </div>
  );
}
