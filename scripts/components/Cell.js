define(function (require) {
    'use strict';


    function Cell (row, col) {

        this.row = row;

        this.col = col;

        this.element = document.createElement('td');

        this.parent = null;

        this.G = Infinity;

        this.H = Infinity;

        this.F = Infinity;

        this.isWalkable = true;

        this.init();
    }


    Cell.prototype.init = function () {
        this.element.classList.add('grid-cell');
        return this;
    };


    Cell.prototype.markStart = function () {
        this.element.classList.add('grid-cell_start');
        return this;
    };


    Cell.prototype.markFinal = function () {
        this.element.classList.add('grid-cell_final');
        return this;
    };


    Cell.prototype.markInaccessible = function () {
        this.element.classList.add('grid-cell_inaccessible');
        this.isWalkable = false;
        return this;
    };


    Cell.prototype.markAccessible = function () {
        this.element.classList.remove('grid-cell_inaccessible');
        this.isWalkable = true;
        return this;
    };


    Cell.prototype.markPath = function () {
        this.element.classList.add('grid-cell_path');
        return this;
    };


    Cell.prototype.getManhattanDistanceTo = function (cell) {
        return Math.abs(cell.row - this.row) + Math.abs(cell.col - this.col);
    };


    Cell.prototype.getGScoreTo = function (cell) {
        return (this.row - cell.row === 0 || this.col - cell.col === 0) ? 10 : 14;
    };

    Cell.prototype.reset = function () {
        this.parent = null;
        this.G = Infinity;
        this.H = Infinity;
        this.F = Infinity;
        this.element.classList.remove('grid-cell_start');
        this.element.classList.remove('grid-cell_path');
        this.element.classList.remove('grid-cell_final');
        return this;
    };


    return Cell;
});
