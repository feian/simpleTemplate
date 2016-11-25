//兼容没有keys的旧浏览器
if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

      var result = [];

      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }

      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    }
  })()
};

String.prototype.simpleTemplate = function(data){
  var html = '';
  if(Array.isArray(data)){
        var self = this;
        data.forEach(function(item){
               var pattern,
                     str = self;
               Object.keys(item).forEach(function(key){
                    pattern = new RegExp('\\$'+key+'\\$', 'g');
                    str = str.replace(pattern, item[key]);
               });
              html += str;
       });
  }
  return html;
}
