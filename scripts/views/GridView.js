define(function (require) {
    'use strict';

    var Cell = require('components/Cell');
    var Grid = require('components/Grid');


    function GridView (element) {

        this.element = element;

        this.grid = new Grid(12, 12);

        this.cellStart = null;

        this.cellFinal = null;

        this.newCellType = Cell.TYPE.PLAIN;

        this.path = [];

        this._onCellClickStart = this._onCellClickStart.bind(this);
        this._onCellClickEnd = this._onCellClickEnd.bind(this);
        this._onCellMouseDownWall = this._onCellMouseDownWall.bind(this);
        this._onCellMouseUpWall = this._onCellMouseUpWall.bind(this);
        this._onCellMouseOver = this._onCellMouseOver.bind(this);

        this.init();
    }


    GridView.MODE = {
        WALL:   'wall',
        START:  'start',
        END:    'end'
    };


    GridView.prototype.init = function () {
        this.element.appendChild(this.grid.element);
        this.cellStart = this.grid.getCell(2, 3);
        this.cellFinal = this.grid.getCell(2, 8);
        this.updatePath();
        return this;
    };


    GridView.prototype.updatePath = function () {
        this.grid.clearHeuristics();
        this.path.forEach(function (cell) {
            if (cell.type === Cell.TYPE.PATH || cell.type === Cell.TYPE.START || cell.type === Cell.TYPE.FINAL) {
                cell.setType(Cell.TYPE.PLAIN);
            }
        });

        this.path = this.grid.getPathBetween(this.cellStart, this.cellFinal);
        this.path.forEach(function (cell) {
            cell.setType(Cell.TYPE.PATH);
        });
        this.cellStart.setType(Cell.TYPE.START);
        this.cellFinal.setType(Cell.TYPE.FINAL);

        return this;
    };


    GridView.prototype.setMode = function (mode) {
        var cell;
        var cells = this.grid.cellsFlattened;
        var i = 0;

        // TOOD: A lot of wet code needs drying in these while loops
        switch (mode) {
            case GridView.MODE.WALL:
                while ((cell = cells[i++]) !== undefined) {
                    cell.element.removeEventListener('click', this._onCellClickStart);
                    cell.element.removeEventListener('click', this._onCellClickEnd);
                    cell.element.addEventListener('mousedown', this._onCellMouseDownWall);
                    cell.element.addEventListener('mouseup', this._onCellMouseUpWall);
                }
                break;

            case GridView.MODE.START:
                while ((cell = cells[i++]) !== undefined) {
                    cell.element.addEventListener('click', this._onCellClickStart);
                    cell.element.removeEventListener('click', this._onCellClickEnd);
                    cell.element.removeEventListener('mousedown', this._onCellMouseDownWall);
                    cell.element.removeEventListener('mouseup', this._onCellMouseUpWall);
                }
                break;

            case GridView.MODE.END:
                while ((cell = cells[i++]) !== undefined) {
                    cell.element.removeEventListener('click', this._onCellClickStart);
                    cell.element.addEventListener('click', this._onCellClickEnd);
                    cell.element.removeEventListener('mousedown', this._onCellMouseDownWall);
                    cell.element.removeEventListener('mouseup', this._onCellMouseUpWall);
                }
                break;
        }
        return this;
    };


    GridView.prototype._onCellClickStart = function (e) {
        var cell = e.target.cell;
        if (cell === this.cellFinal) {
            return;
        }
        this.cellStart = cell;
        this.updatePath();
    };


    GridView.prototype._onCellClickEnd = function (e) {
        var cell = e.target.cell;
        if (cell === this.cellStart) {
            return;
        }
        this.cellFinal = cell;
        this.updatePath();
    };


    GridView.prototype._onCellMouseDownWall = function (e) {
        var cell = e.target.cell;
        e.preventDefault();
        if (cell === this.cellStart || cell === this.cellFinal) {
            return;
        }
        this.newCellType = cell.type.isWalkable ? Cell.TYPE.INACCESSIBLE : Cell.TYPE.PLAIN;
        cell.setType(this.newCellType);
        this.updatePath();
        this.element.addEventListener('mouseover', this._onCellMouseOver);
    };


    GridView.prototype._onCellMouseUpWall = function (e) {
        this.element.removeEventListener('mouseover', this._onCellMouseOver);
    };


    GridView.prototype._onCellMouseOver = function (e) {
        var cell = e.target.cell;
        if (cell === this.cellStart || cell === this.cellFinal) {
            return;
        }
        cell.setType(this.newCellType);
        this.updatePath();
    };


    return GridView;
});
