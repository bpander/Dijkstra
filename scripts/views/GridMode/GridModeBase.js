define(function (require) {
    'use strict';


    function GridModeBase (gridView) {

        this.gridView = gridView;

    }


    GridModeBase.prototype.name = '';


    GridModeBase.prototype.enable = function () {

        return this;
    };


    GridModeBase.prototype.disable = function () {

        return this;
    };


    return GridModeBase;
});
