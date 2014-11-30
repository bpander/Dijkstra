define(function (require) {
    'use strict';

    var GridModeBase = require('views/GridMode/GridModeBase');
    var Cell = require('components/Cell');


    function WallGridMode (gridView) {
        GridModeBase.call(this, gridView);

        this.newCellType = null;

        this._onCellMouseDown = this._onCellMouseDown.bind(this);
        this._onCellMouseOver = this._onCellMouseOver.bind(this);
        this._onCellMouseUp = this._onCellMouseUp.bind(this);
    }
    WallGridMode.prototype = Object.create(GridModeBase.prototype);
    WallGridMode.prototype.constructor = WallGridMode;


    WallGridMode.prototype.name = 'wall';


    WallGridMode.prototype.enable = function () {
        var cell;
        var cells = this.gridView.grid.cellsFlattened;
        var i = 0;

        while ((cell = cells[i++]) !== undefined) {
            cell.element.addEventListener('mousedown', this._onCellMouseDown);
            cell.element.addEventListener('touchstart', this._onCellMouseDown);
            cell.element.addEventListener('mouseup', this._onCellMouseUp);
            cell.element.addEventListener('touchend', this._onCellMouseUp);
        }

        return this;
    };


    WallGridMode.prototype.disable = function () {
        var cell;
        var cells = this.gridView.grid.cellsFlattened;
        var i = 0;

        while ((cell = cells[i++]) !== undefined) {
            cell.element.removeEventListener('mousedown', this._onCellMouseDown);
            cell.element.removeEventListener('touchstart', this._onCellMouseDown);
            cell.element.removeEventListener('mouseup', this._onCellMouseUp);
            cell.element.removeEventListener('touchend', this._onCellMouseUp);
        }

        return this;
    };


    WallGridMode.prototype._onCellMouseDown = function (e) {
        var cell = e.target.cell;

        e.preventDefault();
        if (cell === this.cellStart || cell === this.cellFinal) {
            return;
        }

        this.newCellType = cell.type.isWalkable ? Cell.TYPE.WALL : Cell.TYPE.PLAIN;
        cell.setType(this.newCellType);

        this.gridView.updatePath();
        this.gridView.grid.element.addEventListener('mouseover', this._onCellMouseOver);
    };


    WallGridMode.prototype._onCellMouseUp = function (e) {
        this.gridView.grid.element.removeEventListener('mouseover', this._onCellMouseOver);
    };


    WallGridMode.prototype._onCellMouseOver = function (e) {
        var cell = e.target.cell;
        if (cell === this.cellStart || cell === this.cellFinal) {
            return;
        }
        cell.setType(this.newCellType);
        this.gridView.updatePath();
    };


    return WallGridMode;
});
