define(function (require) {
    'use strict';

    var GridModeBase = require('views/GridMode/GridModeBase');


    function StartGridMode (gridView) {
        GridModeBase.call(this, gridView);

        this._onCellClick = this._onCellClick.bind(this);

    }
    StartGridMode.prototype = Object.create(GridModeBase.prototype);
    StartGridMode.prototype.constructor = StartGridMode;


    StartGridMode.prototype.name = 'start';


    StartGridMode.prototype.enable = function () {
        var cell;
        var cells = this.gridView.grid.cellsFlattened;
        var i = 0;

        while ((cell = cells[i++]) !== undefined) {
            cell.element.addEventListener('click', this._onCellClick);
        }

        return this;
    };


    StartGridMode.prototype.disable = function () {
        var cell;
        var cells = this.gridView.grid.cellsFlattened;
        var i = 0;

        while ((cell = cells[i++]) !== undefined) {
            cell.element.removeEventListener('click', this._onCellClick);
        }

        return this;
    };


    StartGridMode.prototype._onCellClick = function (e) {
        var cell = e.target.cell;
        if (cell === this.cellFinal) {
            return;
        }
        this.gridView.cellStart = cell;
        this.gridView.updatePath();
    };


    return StartGridMode;
});
