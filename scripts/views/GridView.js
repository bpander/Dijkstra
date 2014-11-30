define(function (require) {
    'use strict';

    var Cell = require('components/Cell');
    var Grid = require('components/Grid');
    var StartGridMode = require('views/GridMode/StartGridMode');
    var FinalGridMode = require('views/GridMode/FinalGridMode');
    var WallGridMode = require('views/GridMode/WallGridMode');


    function GridView (element) {

        this.element = element;

        this.grid = new Grid(12, 12);

        this.cellStart = null;

        this.cellFinal = null;

        this.gridMode = new GridView.MODE.START(this);

        this.path = [];

        this.init();
    }


    GridView.MODE = {
        WALL:   WallGridMode,
        START:  StartGridMode,
        FINAL:  FinalGridMode
    };


    GridView.getGridModeByName = function (name) {
        var prop;
        var gridMode = null;
        var gridModes = GridView.MODE;
        for (prop in gridModes) {
            if (gridModes.hasOwnProperty(prop)) {
                if (gridModes[prop].prototype.name === name) {
                    gridMode = gridModes[prop];
                    break;
                }
            }
        }
        return gridMode;
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


    GridView.prototype.setMode = function (gridMode) {
        this.gridMode.disable();
        this.gridMode = new gridMode(this).enable();
        return this;
    };


    return GridView;
});
