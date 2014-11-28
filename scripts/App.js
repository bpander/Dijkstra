define(function (require) {
    'use strict';

    var Grid = require('components/Grid');


    function App () {

        this.element = document.getElementById('js-app');

        this.grid = new Grid(12, 12);

        this.init();
    }


    App.prototype.init = function () {
        if (this.element === null) {
            return this;
        }

        this.element.appendChild(this.grid.element);

        this.grid.getCell(0, 4).markInaccessible();
        this.grid.getCell(1, 4).markInaccessible();
        this.grid.getCell(2, 4).markInaccessible();
        this.grid.getCell(3, 4).markInaccessible();
        this.grid.getCell(4, 4).markInaccessible();
        this.grid.getCell(5, 4).markInaccessible();
        this.grid.getCell(5, 3).markInaccessible();
        this.grid.getCell(5, 2).markInaccessible();
        this.grid.getCell(5, 1).markInaccessible();

        this.grid.getCell(1, 6).markInaccessible();
        this.grid.getCell(2, 6).markInaccessible();
        this.grid.getCell(3, 6).markInaccessible();
        this.grid.getCell(4, 6).markInaccessible();
        this.grid.getCell(5, 6).markInaccessible();
        this.grid.getCell(6, 6).markInaccessible();
        this.grid.getCell(7, 6).markInaccessible();
        this.grid.getCell(8, 6).markInaccessible();
        this.grid.getCell(9, 6).markInaccessible();
        this.grid.getCell(10, 6).markInaccessible();
        this.grid.getCell(11, 6).markInaccessible();

        this.grid.getCell(1, 7).markInaccessible();
        this.grid.getCell(1, 8).markInaccessible();
        this.grid.getCell(1, 9).markInaccessible();
        this.grid.getCell(1, 10).markInaccessible();

        this.grid.getCell(2, 10).markInaccessible();
        this.grid.getCell(3, 10).markInaccessible();
        this.grid.getCell(4, 10).markInaccessible();
        this.grid.getCell(5, 10).markInaccessible();
        this.grid.getCell(6, 10).markInaccessible();
        this.grid.getCell(7, 10).markInaccessible();
        this.grid.getCell(8, 10).markInaccessible();
        this.grid.getCell(9, 10).markInaccessible();
        this.grid.getCell(10, 10).markInaccessible();

        var cellStart = this.grid.getCell(2, 3).markStart();
        var cellFinal = this.grid.getCell(2, 8).markFinal();
        var path = this.grid.getPathBetween(cellStart, cellFinal);

        path.forEach(function (cell) {
            if (cell !== cellStart && cell !== cellFinal) {
                cell.markPath();
            }
        });

        return this;
    };


    return App;
});
