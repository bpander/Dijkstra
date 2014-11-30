define(function (require) {
    'use strict';

    var Grid = require('components/Grid');


    function App () {

        this.element = document.getElementById('js-app');

        this.grid = new Grid(12, 12);

        this.cellStart = null;

        this.cellFinal = null;

        this.isBuilding = false;

        this._onChange = this._onChange.bind(this);
        this._onCellClickStart = this._onCellClickStart.bind(this);
        this._onCellClickEnd = this._onCellClickEnd.bind(this);
        this._onCellMouseDownWall = this._onCellMouseDownWall.bind(this);
        this._onCellMouseUpWall = this._onCellMouseUpWall.bind(this);
        this._onCellMouseOver = this._onCellMouseOver.bind(this);

        this.init();
    }


    App.MODE = {
        WALL:   'wall',
        START:  'start',
        END:    'end'
    };


    App.prototype.init = function () {
        if (this.element === null) {
            return this;
        }
        var checked = this.element.querySelector(':checked');
        if (checked !== null) {
            this.setMode(checked.value);
        }

        this.element.appendChild(this.grid.element);
        this.element.addEventListener('change', this._onChange);

        this.cellStart = this.grid.getCell(2, 3);
        this.cellFinal = this.grid.getCell(2, 8);
        this.updatePath();

        return this;
    };


    App.prototype.updatePath = function () {
        var path;

        this.grid.clear();

        path = this.grid.getPathBetween(this.cellStart, this.cellFinal);
        path.pop(); // Remove start cell
        path.shift(); // Remove final cell
        path.forEach(function (cell) {
            cell.markPath();
        });

        this.cellStart.markStart();
        this.cellFinal.markFinal();

        return this;
    };


    App.prototype.setMode = function (mode) {
        var cell;
        var cells = this.grid.cellsFlattened;
        var i = 0;

        // TOOD: A lot of wet code needs drying in these while loops
        switch (mode) {
            case App.MODE.WALL:
                while ((cell = cells[i++]) !== undefined) {
                    cell.element.removeEventListener('click', this._onCellClickStart);
                    cell.element.removeEventListener('click', this._onCellClickEnd);
                    cell.element.addEventListener('mousedown', this._onCellMouseDownWall);
                    cell.element.addEventListener('mouseup', this._onCellMouseUpWall);
                }
                break;

            case App.MODE.START:
                while ((cell = cells[i++]) !== undefined) {
                    cell.element.addEventListener('click', this._onCellClickStart);
                    cell.element.removeEventListener('click', this._onCellClickEnd);
                    cell.element.removeEventListener('mousedown', this._onCellMouseDownWall);
                    cell.element.removeEventListener('mouseup', this._onCellMouseUpWall);
                }
                break;

            case App.MODE.END:
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


    App.prototype._onChange = function (e) {
        this.setMode(e.target.value);
    };


    App.prototype._onCellClickStart = function (e) {
        this.cellStart = e.target.cell;
        this.updatePath();
    };


    App.prototype._onCellClickEnd = function (e) {
        this.cellFinal = e.target.cell;
        this.updatePath();
    };


    App.prototype._onCellMouseDownWall = function (e) {
        var cell = e.target.cell;
        e.preventDefault();
        this.isBuilding = cell.isWalkable;
        this.isBuilding ? cell.markInaccessible() : cell.markAccessible();
        this.updatePath();
        this.element.addEventListener('mouseover', this._onCellMouseOver);
    };


    App.prototype._onCellMouseUpWall = function (e) {
        this.element.removeEventListener('mouseover', this._onCellMouseOver);
    };


    App.prototype._onCellMouseOver = function (e) {
        var cell = e.target.cell;
        this.isBuilding ? cell.markInaccessible() : cell.markAccessible();
        this.updatePath();
    };


    return App;
});
