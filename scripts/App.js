define(function (require) {
    'use strict';

    var GridView = require('views/GridView');
    var UIView = require('views/UIView');


    function App () {

        this.gridView = new GridView(document.body.querySelector('[data-view="Grid"]'));

        this.uiView = new UIView(document.body.querySelector('[data-view="UI"]'));

        this._onUIViewModeRequest = this._onUIViewModeRequest.bind(this);

        this.init();
    }


    App.prototype.init = function () {
        this.uiView.on(UIView.EVENT_NAME.MODE_REQUEST, this._onUIViewModeRequest);
        this.uiView.requestMode();
        return this;
    };


    App.prototype._onUIViewModeRequest = function (mode) {
        this.gridView.setMode(mode);
    };


    return App;
});
