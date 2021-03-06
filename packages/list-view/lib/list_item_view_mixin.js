require('list-view/list_view_helper');

var get = Ember.get, set = Ember.set;

function samePosition(a, b) {
  return a && b && a.x === b.x && a.y === b.y;
}

function positionElement() {
  var element, position, _position;

  element = get(this, 'element');
  position = get(this, 'position');
  _position = this._position;

  if (!position) { return; }
  if (!element) { return; }

  // TODO: avoid needing this by avoiding unnecessary
  // calls to this method in the first place
  if (samePosition(position, _position)) { return; }
  this.applyTransform(element, position);

  this._position = position;
}

Ember.ListItemViewMixin = Ember.Mixin.create({
  init: function(){
    this._super();
    this.one('didInsertElement', positionElement);
  },
  classNames: ['ember-list-item-view'],
  _position: null,
  _positionDidChange: Ember.observer(positionElement, 'position'),
  _positionElement: positionElement,
  applyTransform: Ember.ListViewHelper.applyTransform
});
