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
        if (this.models.length === 0) {
            return null;
        }
        var i = 0;
        var models = this.models;
        var model = models[i++];
        var currentLowest = model[key];
        var modelWithLowest = model;
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
