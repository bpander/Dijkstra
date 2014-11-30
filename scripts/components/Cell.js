define(function (require) {
    'use strict';


    function Cell (row, col) {

        this.row = row;

        this.col = col;

        this.element = document.createElement('td');

        this.parent = null;

        this.G = Infinity;

        this.type = Cell.TYPE.PLAIN;

        this.init();
    }


    Cell.TYPE = {
        START:  new CellType('grid-cell_start'),
        FINAL:  new CellType('grid-cell_final'),
        WALL:   new CellType('grid-cell_wall', false),
        PLAIN:  new CellType('grid-cell_plain'),
        PATH:   new CellType('grid-cell_path')
    };


    Cell.prototype.init = function () {
        this.element.classList.add('grid-cell');
        this.element.cell = this;
        this.setType(this.type);
        return this;
    };


    Cell.prototype.setType = function (type) {
        this.element.classList.remove(this.type.className);
        this.element.classList.add(type.className);
        this.type = type;
        return this;
    };


    Cell.prototype.getGScoreTo = function (cell) {
        return (this.row - cell.row === 0 || this.col - cell.col === 0) ? 10 : 14;
    };


    Cell.prototype.clearHeuristics = function () {
        this.parent = null;
        this.G = Infinity;
        return this;
    };


    function CellType (className, isWalkable) {

        this.className = className;

        this.isWalkable = typeof isWalkable === 'boolean' ? isWalkable : true;

    }


    return Cell;
});
