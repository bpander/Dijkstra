define(function (require) {
    'use strict';

    var EventEmitter = require('EventEmitter');


    function UIView (element) {
        EventEmitter.call(this);

        this.element = element;

        this._onChange = this._onChange.bind(this);

        this.init();
    }
    UIView.prototype = Object.create(EventEmitter.prototype);
    UIView.prototype.constructor = UIView;


    UIView.EVENT_NAME = {
        MODE_REQUEST: 'ui:modeRequest'
    };


    UIView.prototype.init = function () {
        this.element.addEventListener('change', this._onChange);
        return this;
    };


    UIView.prototype.requestMode = function () {
        var checked = this.element.querySelector(':checked');
        if (checked !== null) {
            this.emit(UIView.EVENT_NAME.MODE_REQUEST, checked.value);
        }
        return this;
    };


    UIView.prototype._onChange = function (e) {
        this.emit(UIView.EVENT_NAME.MODE_REQUEST, e.target.value);
    };


    return UIView;
});
