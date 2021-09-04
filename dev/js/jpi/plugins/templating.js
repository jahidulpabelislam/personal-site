;// Handles all the general JS templating stuff - for use out of Template class as well
JPI.templating = (function() {

    "use strict";

    var global = {
        moustaches: {}, // `Cache` of moustaches
    };

    var fn = {

        // Get a ReEx of a 'moustache' for the field to replace (e.g. `{{ fieldName }}` or `{{fieldName}}`)
        getMoustache: function(field) {
            if (!global.moustaches[field]) {
                global.moustaches[field] = new RegExp("{{2} ?" + field + " ?}{2}", "g");
            }

            return global.moustaches[field];
        },
    };

    return {
        getMoustache: fn.getMoustache,
    };

})();

// A Template 'class' that holds all necessary logic to load a template, replace/process with data and render
JPI.Template = (function() {

    "use strict";

    return function(template, context) {

        context = context || {};

        var fn = {

            replace: function(field, value) {
                var type = typeof value;

                if (type === "string" || type === "number") {
                    var moustache = JPI.templating.getMoustache(field);
                    template = template.replace(moustache, value);
                }
                else if (type === "object") {
                    for (var innerField in value) {
                        if ({}.hasOwnProperty.call(value, innerField)) {
                            var innerKey = field ? field + "." + innerField : innerField;
                            template = fn.replace(innerKey, value[innerField]);
                        }
                    }
                }

                return template;
            },

            process: function(data) {
                if (data) {
                    fn.replace(null, data);
                }
            },

            get: function() {
                fn.process(context);
                return template;
            },

            renderIn: function(parentElem) {
                parentElem.append(fn.get());
            },
        };

        return {
            replace: fn.replace,
            process: fn.process,
            get: fn.get,
            renderIn: fn.renderIn,
        };
    };

})();

