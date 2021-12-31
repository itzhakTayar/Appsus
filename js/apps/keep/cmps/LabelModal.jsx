export function LableModal() {
  state = {
    isShowLableModal: false,
  };
  const setLable = (lable) => {
    console.log(lable);
  };

  onToggleLableModal = () => {
    this.setState({ isShowLableModal: !this.state.isShowLableModal });
  };

  return (
    <div className="lable-modadl">
      <div onClick={setLable('critical')}>critical</div>
      <div onClick={setLable('spam')}>spam</div>
      <div onClick={setLable('work')}>work</div>
      <div onClick={setLable('friend')}>friend</div>
      <button>x</button>
    </div>
  );
}
