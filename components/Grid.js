import React from 'react';

class Grid extends React.Component {
  static defaultProps = {
    mods: '',
    onClick: undefined,
  };
  constructor(props) {
    super(props);
    this.mods = this.props.mods ?? '';
    this.gaps = this.props.gap ?? '';
    this.gridClasses = [];
    this.gridClasses.push('grid');
    if (this.props.row) {
      this.gridClasses.push('grid---row');
    }
    if (this.props.column) {
      this.gridClasses.push('grid---col');
    }
    var ts = this.mods.split(' ');
    for (let t of ts) {
      if (t.trim() != '') {
        this.gridClasses.push('grid---' + t.trim());
      }
    }
    var tg = this.gaps.split(' ');
    for (let t of tg) {
      if (t.trim() != '') {
        this.gridClasses.push('gap---' + t.trim());
      }
    }
    // Mobile grid
    if (this.props.mobRow) {
      this.gridClasses.push('grid---mob-row');
    }
    if (this.props.classNames) {
      var ts2 = this.props.classNames.split(' ');
      for (let t of ts2) {
        if (t.trim() != '') {
          this.gridClasses.push(t.trim());
        }
      }
    }
  }
  render() {
    return (
      <div
        id={this.props.id ?? ''}
        data-theme={this.props.dark && 'dark'}
        className={this.gridClasses.join(' ')}
        onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

export default Grid;
