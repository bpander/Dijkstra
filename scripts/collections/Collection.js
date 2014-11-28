define(function (require) {
    'use strict';


    function Collection (models) {

        this.models = models instanceof Array ? models : [];

    }


    Collection.prototype.add = function (model) {
        this.models.push(model);
        return;
    };


    Collection.prototype.remove = function (model) {
        var modelIndex = this.models.indexOf(model);
        if (modelIndex === -1) {
            throw new Error('Could not find model in Collection');
        }
        this.models.splice(modelIndex, 1);
        return this;
    };


    Collection.prototype.contains = function (model) {
        return this.models.indexOf(model) !== -1;
    };


    Collection.prototype.getModelWithLowest = function (key) {
        var currentLowest = Infinity;
        var i = 0;
        var model;
        var modelWithLowest = null;
        var models = this.models;
        var value;
        while ((model = models[i++]) !== undefined) {
            value = model[key];
            if (value < currentLowest) {
                modelWithLowest = model;
                currentLowest = value;
            }
        }
        return modelWithLowest;
    };


    return Collection;
});
