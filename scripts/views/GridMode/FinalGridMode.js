define(function (require) {
    'use strict';

    var GridModeBase = require('views/GridMode/GridModeBase');


    function FinalGridMode (gridView) {
        GridModeBase.call(this, gridView);

        this._onCellClick = this._onCellClick.bind(this);

    }
    FinalGridMode.prototype = Object.create(GridModeBase.prototype);
    FinalGridMode.prototype.constructor = FinalGridMode;


    FinalGridMode.prototype.name = 'final';


    FinalGridMode.prototype.enable = function () {
        var cell;
        var cells = this.gridView.grid.cellsFlattened;
        var i = 0;
        
        while ((cell = cells[i++]) !== undefined) {
            cell.element.addEventListener('click', this._onCellClick);
        }

        return this;
    };


    FinalGridMode.prototype.disable = function () {
        var cell;
        var cells = this.gridView.grid.cellsFlattened;
        var i = 0;
        
        while ((cell = cells[i++]) !== undefined) {
            cell.element.removeEventListener('click', this._onCellClick);
        }

        return this;
    };


    FinalGridMode.prototype._onCellClick = function (e) {
        var cell = e.target.cell;
        if (cell === this.cellStart) {
            return;
        }
        this.gridView.cellFinal = cell;
        this.gridView.updatePath();
    };


    return FinalGridMode;
});
