define(function (require) {
    'use strict';

    var Cell = require('components/Cell');
    var Collection = require('collections/Collection');


    function Grid (rowCount, colCount) {

        this.rowCount = rowCount;

        this.colCount = colCount;

        this.element = document.createElement('table');

        this.cells = [];

        this.cellsFlattened = [];

        this.init();
    }


    Grid.prototype.init = function () {
        var rowCount = this.rowCount;
        var colCount = this.colCount;
        var i_row = 0;
        var i_col = 0;
        var tr;
        var cell;

        this.element.classList.add('grid');

        for (i_row = 0; i_row !== rowCount; i_row++) {
            if (this.cells[i_row] === undefined) {
                this.cells[i_row] = [];
            }
            tr = document.createElement('tr');
            for (i_col = 0; i_col !== colCount; i_col++) {
                cell = new Cell(i_row, i_col);
                tr.appendChild(cell.element);
                this.cells[i_row][i_col] = cell;
                this.cellsFlattened.push(cell);
            }
            this.element.appendChild(tr);
        }

        return this;
    };


    Grid.prototype.getCell = function (row, col) {
        return this.cells[row][col];
    };


    /**
     * Calculates the shortest path between two grid cells using Dijkstra's algorithm
     * 
     * @param  {Cell}   cellStart   Starting cell
     * @param  {Cell}   cellFinal   Goal cell
     * @return {Cell[]} path        An array containing the cells from the starting cell to the final cell
     */
    Grid.prototype.getPathBetween = function (cellStart, cellFinal) {
        var cellCurrent;
        var path = [];
        var openList = new Collection([ cellStart ]);
        var closedList = new Collection();

        cellStart.G = 0;

        while (true) {
            cellCurrent = openList.getModelWithLowest('G');
            if (openList.models.length === 0 || cellCurrent === cellFinal) {
                break;
            }
            openList.remove(cellCurrent);
            closedList.add(cellCurrent);
            this.getAdjacentCells(cellCurrent).forEach(function (cellAdjacent) {
                if (cellAdjacent.type.isWalkable === false || closedList.contains(cellAdjacent)) {
                    return;
                }
                if (openList.contains(cellAdjacent)) {
                    var gScoreOld = cellCurrent.G + cellAdjacent.getGScoreTo(cellCurrent);
                    var gScoreNew = cellCurrent.parent.G + cellAdjacent.getGScoreTo(cellCurrent.parent);
                    if (gScoreNew > gScoreOld) {
                        cellAdjacent.parent = cellCurrent.parent;
                        cellAdjacent.G = gScoreNew;
                    }
                    return;
                }
                openList.add(cellAdjacent);
                cellAdjacent.parent = cellCurrent;
                cellAdjacent.G = cellAdjacent.parent.G + cellAdjacent.getGScoreTo(cellCurrent);
            });
        }

        path = [ cellFinal ];
        cellCurrent = cellFinal;
        while ((cellCurrent = cellCurrent.parent) !== null) {
            path.unshift(cellCurrent);
        }

        return path;
    };


    Grid.prototype.getAdjacentCells = function (cell) {
        var cellAdjacent;
        var cells = [];
        var i;
        var j;
        var col;
        var row;
        for (i = -1; i <= 1; i++) {
            for (j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }
                row = cell.row + i;
                if (row < 0 || row >= this.rowCount) {
                    continue;
                }
                col = cell.col + j;
                if (col < 0 || col >= this.colCount) {
                    continue;
                }
                cellAdjacent = this.getCell(row, col);
                cells.push(cellAdjacent);
            }
        }
        return cells;
    };


    Grid.prototype.clearHeuristics = function () {
        var cell;
        var cells = this.cellsFlattened;
        var i = 0;
        while ((cell = cells[i++]) !== undefined) {
            cell.clearHeuristics();
        }
    };


    return Grid;
});
