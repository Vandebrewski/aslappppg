var ASLKids = ASLKids || {};
if (!ASLKids.controller) ASLKids.controller = {};
if (!ASLKids.model) ASLKids.model = {};
if (!ASLKids.store) ASLKids.store = {};
if (!ASLKids.view) ASLKids.view = {};
var Ext = Ext || {};
if (!Ext.app) Ext.app = {};
if (!Ext.behavior) Ext.behavior = {};
if (!Ext.data) Ext.data = {};
if (!Ext.data.association) Ext.data.association = {};
if (!Ext.data.identifier) Ext.data.identifier = {};
if (!Ext.data.proxy) Ext.data.proxy = {};
if (!Ext.data.reader) Ext.data.reader = {};
if (!Ext.data.writer) Ext.data.writer = {};
if (!Ext.dataview) Ext.dataview = {};
if (!Ext.dataview.component) Ext.dataview.component = {};
if (!Ext.dataview.element) Ext.dataview.element = {};
if (!Ext.dom) Ext.dom = {};
if (!Ext.env) Ext.env = {};
if (!Ext.event) Ext.event = {};
if (!Ext.event.publisher) Ext.event.publisher = {};
if (!Ext.event.recognizer) Ext.event.recognizer = {};
if (!Ext.field) Ext.field = {};
if (!Ext.form) Ext.form = {};
if (!Ext.fx) Ext.fx = {};
if (!Ext.fx.animation) Ext.fx.animation = {};
if (!Ext.fx.easing) Ext.fx.easing = {};
if (!Ext.fx.layout) Ext.fx.layout = {};
if (!Ext.fx.layout.card) Ext.fx.layout.card = {};
if (!Ext.fx.runner) Ext.fx.runner = {};
if (!Ext.layout) Ext.layout = {};
if (!Ext.layout.wrapper) Ext.layout.wrapper = {};
if (!Ext.lib) Ext.lib = {};
if (!Ext.mixin) Ext.mixin = {};
if (!Ext.proxy) Ext.proxy = {};
if (!Ext.scroll) Ext.scroll = {};
if (!Ext.scroll.indicator) Ext.scroll.indicator = {};
if (!Ext.tab) Ext.tab = {};
if (!Ext.util) Ext.util = {};
if (!Ext.util.paintmonitor) Ext.util.paintmonitor = {};
if (!Ext.util.sizemonitor) Ext.util.sizemonitor = {};
if (!Ext.util.translatable) Ext.util.translatable = {};
if (!Ext.viewport) Ext.viewport = {};
/* 
 * Helper code for compiler optimization
 */

// @tag compiler-helpers



(function(ExtCmd) {
  var baseStaticMembers, enumerables = ['constructor', 'toString', 'valueOf', 'toLocaleString'], enumerablesMap = {}, enumerablesObj = {}, enumerablesMask = 0, baseStaticMember, Base, ClassManager, applyConfig, applyCachedConfig, v5ClassSystem, thunk = function() {
  var i, mask;
  Base = Ext.Base;
  ClassManager = Ext.ClassManager;
  for (i = enumerables.length; i-- > 0; ) 
    {
      mask = (1 << i);
      enumerablesObj[enumerablesMap[mask] = enumerables[i]] = mask;
    }
  for (i in enumerablesObj) 
    {
      enumerablesMask |= enumerablesObj[i];
    }
  enumerablesMask = ~enumerablesMask;
  Function.prototype.$isFunction = 1;
  applyConfig = Ext.Class.getPreprocessor('config').fn;
  applyCachedConfig = Ext.Class.getPreprocessor('cachedConfig') && Ext.Class.getPreprocessor('cachedConfig').fn;
  baseStaticMembers = Base.$staticMembers;
  if (!baseStaticMembers) 
  {
    baseStaticMembers = [];
    for (baseStaticMember in Base) 
      {
        if (Base.hasOwnProperty(baseStaticMember)) 
        {
          baseStaticMembers.push(baseStaticMember);
        }
      }
  }
  ExtCmd.derive = derive;
  return derive.apply(this, arguments);
}, onBeforeCreated = function(cls, data, hooks) {
  var enumerableMembers = hooks.enumerableMembers, proto = cls.prototype, member, fn, which, val;
  if (!data) 
  {
    return;
  }
  if (v5ClassSystem) 
  {
    cls.addMembers(data);
  } else {
    for (member in data) 
      {
        val = data[member];
        if (val && val.$isFunction && !val.$isClass && val !== Ext.emptyFn && val !== Ext.identityFn) 
        {
          if (member in proto) 
          {
            val.$previous = proto[member];
          }
          proto[member] = fn = val;
          fn.$owner = cls;
          fn.$name = member;
        } else {
          proto[member] = val;
        }
      }
    for (which = 1; enumerableMembers; which <<= 1) 
      {
        if (enumerableMembers & which) 
        {
          enumerableMembers &= ~which;
          member = enumerablesMap[which];
          proto[member] = fn = data[member];
          fn.$owner = cls;
          fn.$name = member;
        }
      }
  }
}, makeShim = function(base) {
  var cls = function ctor() {
  return base.apply(this, arguments) || null;
}, i, name;
  cls.prototype = Ext.Object.chain(base.prototype);
  for (i = baseStaticMembers.length; i-- > 0; ) 
    {
      name = baseStaticMembers[i];
      cls[name] = Base[name];
    }
  return cls;
}, derive = function(className, base, data, enumerableMembers, xtypes, xtypesChain, xtypeMap, aliases, mixins, names, createdFn) {
  var cls = function ctor() {
  return this.constructor.apply(this, arguments) || null;
}, ret = cls, hooks = {enumerableMembers: enumerableMembers & enumerablesMask, onCreated: createdFn, onBeforeCreated: onBeforeCreated, aliases: aliases}, alternates = data.alternateClassName || [], global = Ext.global, alias, alternate, i, ln, n, ns, name, nameToAlternates, proto, statics, staticMember, targetName, fn, val, altToName = ClassManager.alternateToName || ClassManager.maps.alternateToName, nameToAlt = ClassManager.nameToAlternates || ClassManager.maps.nameToAlternates;
  if (v5ClassSystem === undefined) 
  {
    v5ClassSystem = !!(ClassManager && ClassManager.addAlias);
  }
  for (i = baseStaticMembers.length; i-- > 0; ) 
    {
      name = baseStaticMembers[i];
      cls[name] = Base[name];
    }
  if (data.$isFunction) 
  {
    data = data(cls);
  }
  hooks.data = data;
  statics = data.statics;
  delete data.statics;
  data.$className = className;
  if ('$className' in data) 
  {
    cls.$className = data.$className;
  }
  cls.extend(base);
  proto = cls.prototype;
  cls.xtype = data.xtype = xtypes[0];
  if (xtypes) 
  {
    proto.xtypes = xtypes;
  }
  proto.xtypesChain = xtypesChain;
  proto.xtypesMap = xtypeMap;
  data.alias = aliases;
  ret.triggerExtended(cls, data, hooks);
  if (data.onClassExtended) 
  {
    cls.onExtended(data.onClassExtended, cls);
    delete data.onClassExtended;
  }
  if (statics) 
  {
    if (v5ClassSystem) 
    {
      cls.addStatics(statics);
    } else {
      for (staticMember in statics) 
        {
          if (statics.hasOwnProperty(staticMember)) 
          {
            val = statics[staticMember];
            if (val && val.$isFunction && !val.$isClass && val !== Ext.emptyFn && val !== Ext.identityFn) 
            {
              cls[staticMember] = fn = val;
              fn.$owner = cls;
              fn.$name = staticMember;
            }
            cls[staticMember] = val;
          }
        }
    }
  }
  if (data.inheritableStatics) 
  {
    cls.addInheritableStatics(data.inheritableStatics);
    delete data.inheritableStatics;
  }
  if (proto.onClassExtended) 
  {
    ret.onExtended(proto.onClassExtended, ret);
    delete proto.onClassExtended;
  }
  if (data.config) 
  {
    applyConfig.call(Ext.Class, cls, data);
  }
  if (data.cachedConfig && applyCachedConfig) 
  {
    applyCachedConfig.call(Ext.Class, cls, data);
  }
  hooks.onBeforeCreated(cls, hooks.data, hooks);
  for (i = 0 , n = mixins && mixins.length; i < n; ++i) 
    {
      cls.mixin.apply(cls, mixins[i]);
    }
  for (i = 0 , n = aliases.length; i < n; i++) 
    {
      alias = aliases[i];
            ClassManager.setAlias ? ClassManager.setAlias(cls, alias) : ClassManager.addAlias(cls, alias);
    }
  if (data.singleton) 
  {
    ret = new cls();
  }
  if (!(alternates instanceof Array)) 
  {
    alternates = [alternates];
  }
  for (i = 0 , ln = alternates.length; i < ln; i++) 
    {
      alternate = alternates[i];
      ClassManager.classes[alternate] = ret;
      if (v5ClassSystem) 
      {
        ClassManager.addAlternate(cls, alternate);
      } else {
        targetName = ClassManager.getName(ret);
        if (targetName && targetName !== alternate) 
        {
          altToName[alternate] = targetName;
          alternates = altToName[targetName] || (altToName[targetName] = []);
          alternates.push(alternate);
        }
      }
    }
  for (i = 0 , n = names.length; i < n; i += 2) 
    {
      ns = names[i];
      if (!ns) 
      {
        ns = global;
      }
      ns[names[i + 1]] = ret;
    }
  ClassManager.classes[className] = ret;
  if (!v5ClassSystem) 
  {
    targetName = ClassManager.getName(ret);
    if (targetName && targetName !== className) 
    {
      nameToAlt[className] = targetName;
      alternates = nameToAlt[targetName] || (nameToAlt[targetName] = []);
      alternates.push(className);
    }
  }
  delete proto.alternateClassName;
  if (hooks.onCreated) 
  {
    hooks.onCreated.call(ret, ret);
  }
  if (className) 
  {
    ClassManager.triggerCreated(className);
  }
  return ret;
};
  ExtCmd.derive = thunk;
}(Ext.cmd = {}));

/* 
 * Helper code for compiler optimization
 */

// @tag compiler-helpers



/* 
 * Helper code for compiler optimization
 */

// @tag compiler-helpers



(function() {
  var global = this, objectPrototype = Object.prototype, toString = objectPrototype.toString, enumerables = true, enumerablesTest = {toString: 1}, emptyFn = function() {
}, i;
  if (typeof Ext === 'undefined') 
  {
    global.Ext = {};
  }
  Ext.global = global;
  for (i in enumerablesTest) 
    {
      enumerables = null;
    }
  if (enumerables) 
  {
    enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
  }
  Ext.enumerables = enumerables;
  Ext.apply = function(object, config, defaults) {
  if (defaults) 
  {
    Ext.apply(object, defaults);
  }
  if (object && config && typeof config === 'object') 
  {
    var i, j, k;
    for (i in config) 
      {
        object[i] = config[i];
      }
    if (enumerables) 
    {
      for (j = enumerables.length; j--; ) 
        {
          k = enumerables[j];
          if (config.hasOwnProperty(k)) 
          {
            object[k] = config[k];
          }
        }
    }
  }
  return object;
};
  Ext.buildSettings = Ext.apply({baseCSSPrefix: 'x-', scopeResetCSS: false}, Ext.buildSettings || {});
  Ext.apply(Ext, {emptyFn: emptyFn, baseCSSPrefix: Ext.buildSettings.baseCSSPrefix, applyIf: function(object, config) {
  var property;
  if (object) 
  {
    for (property in config) 
      {
        if (object[property] === undefined) 
        {
          object[property] = config[property];
        }
      }
  }
  return object;
}, iterate: function(object, fn, scope) {
  if (Ext.isEmpty(object)) 
  {
    return;
  }
  if (scope === undefined) 
  {
    scope = object;
  }
  if (Ext.isIterable(object)) 
  {
    Ext.Array.each.call(Ext.Array, object, fn, scope);
  } else {
    Ext.Object.each.call(Ext.Object, object, fn, scope);
  }
}});
  Ext.apply(Ext, {extend: function() {
  var objectConstructor = objectPrototype.constructor, inlineOverrides = function(o) {
  for (var m in o) 
    {
      if (!o.hasOwnProperty(m)) 
      {
        continue;
      }
      this[m] = o[m];
    }
};
  return function(subclass, superclass, overrides) {
  if (Ext.isObject(superclass)) 
  {
    overrides = superclass;
    superclass = subclass;
    subclass = overrides.constructor !== objectConstructor ? overrides.constructor : function() {
  superclass.apply(this, arguments);
};
  }
  var F = function() {
}, subclassProto, superclassProto = superclass.prototype;
  F.prototype = superclassProto;
  subclassProto = subclass.prototype = new F();
  subclassProto.constructor = subclass;
  subclass.superclass = superclassProto;
  if (superclassProto.constructor === objectConstructor) 
  {
    superclassProto.constructor = superclass;
  }
  subclass.override = function(overrides) {
  Ext.override(subclass, overrides);
};
  subclassProto.override = inlineOverrides;
  subclassProto.proto = subclassProto;
  subclass.override(overrides);
  subclass.extend = function(o) {
  return Ext.extend(subclass, o);
};
  return subclass;
};
}(), override: function(cls, overrides) {
  if (cls.$isClass) 
  {
    return cls.override(overrides);
  } else {
    Ext.apply(cls.prototype, overrides);
  }
}});
  Ext.apply(Ext, {valueFrom: function(value, defaultValue, allowBlank) {
  return Ext.isEmpty(value, allowBlank) ? defaultValue : value;
}, typeOf: function(value) {
  if (value === null) 
  {
    return 'null';
  }
  var type = typeof value;
  if (type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean') 
  {
    return type;
  }
  var typeToString = toString.call(value);
  switch (typeToString) {
    case '[object Array]':
      return 'array';
    case '[object Date]':
      return 'date';
    case '[object Boolean]':
      return 'boolean';
    case '[object Number]':
      return 'number';
    case '[object RegExp]':
      return 'regexp';
  }
  if (type === 'function') 
  {
    return 'function';
  }
  if (type === 'object') 
  {
    if (value.nodeType !== undefined) 
    {
      if (value.nodeType === 3) 
      {
        return (/\S/).test(value.nodeValue) ? 'textnode' : 'whitespace';
      } else {
        return 'element';
      }
    }
    return 'object';
  }
}, isEmpty: function(value, allowEmptyString) {
  return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (Ext.isArray(value) && value.length === 0);
}, isArray: ('isArray' in Array) ? Array.isArray : function(value) {
  return toString.call(value) === '[object Array]';
}, isDate: function(value) {
  return toString.call(value) === '[object Date]';
}, isMSDate: function(value) {
  if (!Ext.isString(value)) 
  {
    return false;
  } else {
    return value.match("\\\\?/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\\\?/") !== null;
  }
}, isObject: (toString.call(null) === '[object Object]') ? function(value) {
  return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
} : function(value) {
  return toString.call(value) === '[object Object]';
}, isSimpleObject: function(value) {
  return value instanceof Object && value.constructor === Object;
}, isPrimitive: function(value) {
  var type = typeof value;
  return type === 'string' || type === 'number' || type === 'boolean';
}, isFunction: (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') ? function(value) {
  return toString.call(value) === '[object Function]';
} : function(value) {
  return typeof value === 'function';
}, isNumber: function(value) {
  return typeof value === 'number' && isFinite(value);
}, isNumeric: function(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}, isString: function(value) {
  return typeof value === 'string';
}, isBoolean: function(value) {
  return typeof value === 'boolean';
}, isElement: function(value) {
  return value ? value.nodeType === 1 : false;
}, isTextNode: function(value) {
  return value ? value.nodeName === "#text" : false;
}, isDefined: function(value) {
  return typeof value !== 'undefined';
}, isIterable: function(value) {
  return (value && typeof value !== 'string') ? value.length !== undefined : false;
}});
  Ext.apply(Ext, {clone: function(item) {
  if (item === null || item === undefined) 
  {
    return item;
  }
  if (item.nodeType && item.cloneNode) 
  {
    return item.cloneNode(true);
  }
  var type = toString.call(item);
  if (type === '[object Date]') 
  {
    return new Date(item.getTime());
  }
  var i, j, k, clone, key;
  if (type === '[object Array]') 
  {
    i = item.length;
    clone = [];
    while (i--) 
      {
        clone[i] = Ext.clone(item[i]);
      }
  } else if (type === '[object Object]' && item.constructor === Object) 
  {
    clone = {};
    for (key in item) 
      {
        clone[key] = Ext.clone(item[key]);
      }
    if (enumerables) 
    {
      for (j = enumerables.length; j--; ) 
        {
          k = enumerables[j];
          clone[k] = item[k];
        }
    }
  }
  return clone || item;
}, getUniqueGlobalNamespace: function() {
  var uniqueGlobalNamespace = this.uniqueGlobalNamespace;
  if (uniqueGlobalNamespace === undefined) 
  {
    var i = 0;
    do {
      uniqueGlobalNamespace = 'ExtBox' + (++i);
    } while (Ext.global[uniqueGlobalNamespace] !== undefined);
    Ext.global[uniqueGlobalNamespace] = Ext;
    this.uniqueGlobalNamespace = uniqueGlobalNamespace;
  }
  return uniqueGlobalNamespace;
}, functionFactory: function() {
  var args = Array.prototype.slice.call(arguments), ln = args.length;
  if (ln > 0) 
  {
    args[ln - 1] = 'var Ext=window.' + this.getUniqueGlobalNamespace() + ';' + args[ln - 1];
  }
  return Function.prototype.constructor.apply(Function.prototype, args);
}, globalEval: ('execScript' in global) ? function(code) {
  global.execScript(code);
} : function(code) {
  (function() {
  eval(code);
})();
}});
  Ext.type = Ext.typeOf;
})();

(function() {
  var version = '2.4.0.487', Version;
  Ext.Version = Version = Ext.extend(Object, {constructor: function(version) {
  var toNumber = this.toNumber, parts, releaseStartIndex;
  if (version instanceof Version) 
  {
    return version;
  }
  this.version = this.shortVersion = String(version).toLowerCase().replace(/_/g, '.').replace(/[\-+]/g, '');
  releaseStartIndex = this.version.search(/([^\d\.])/);
  if (releaseStartIndex !== -1) 
  {
    this.release = this.version.substr(releaseStartIndex, version.length);
    this.shortVersion = this.version.substr(0, releaseStartIndex);
  }
  this.shortVersion = this.shortVersion.replace(/[^\d]/g, '');
  parts = this.version.split('.');
  this.major = toNumber(parts.shift());
  this.minor = toNumber(parts.shift());
  this.patch = toNumber(parts.shift());
  this.build = toNumber(parts.shift());
  return this;
}, toNumber: function(value) {
  value = parseInt(value || 0, 10);
  if (isNaN(value)) 
  {
    value = 0;
  }
  return value;
}, toString: function() {
  return this.version;
}, valueOf: function() {
  return this.version;
}, getMajor: function() {
  return this.major || 0;
}, getMinor: function() {
  return this.minor || 0;
}, getPatch: function() {
  return this.patch || 0;
}, getBuild: function() {
  return this.build || 0;
}, getRelease: function() {
  return this.release || '';
}, isGreaterThan: function(target) {
  return Version.compare(this.version, target) === 1;
}, isGreaterThanOrEqual: function(target) {
  return Version.compare(this.version, target) >= 0;
}, isLessThan: function(target) {
  return Version.compare(this.version, target) === -1;
}, isLessThanOrEqual: function(target) {
  return Version.compare(this.version, target) <= 0;
}, equals: function(target) {
  return Version.compare(this.version, target) === 0;
}, match: function(target) {
  target = String(target);
  return this.version.substr(0, target.length) === target;
}, toArray: function() {
  return [this.getMajor(), this.getMinor(), this.getPatch(), this.getBuild(), this.getRelease()];
}, getShortVersion: function() {
  return this.shortVersion;
}, gt: function() {
  return this.isGreaterThan.apply(this, arguments);
}, lt: function() {
  return this.isLessThan.apply(this, arguments);
}, gtEq: function() {
  return this.isGreaterThanOrEqual.apply(this, arguments);
}, ltEq: function() {
  return this.isLessThanOrEqual.apply(this, arguments);
}});
  Ext.apply(Version, {releaseValueMap: {'dev': -6, 'alpha': -5, 'a': -5, 'beta': -4, 'b': -4, 'rc': -3, '#': -2, 'p': -1, 'pl': -1}, getComponentValue: function(value) {
  return !value ? 0 : (isNaN(value) ? this.releaseValueMap[value] || value : parseInt(value, 10));
}, compare: function(current, target) {
  var currentValue, targetValue, i;
  current = new Version(current).toArray();
  target = new Version(target).toArray();
  for (i = 0; i < Math.max(current.length, target.length); i++) 
    {
      currentValue = this.getComponentValue(current[i]);
      targetValue = this.getComponentValue(target[i]);
      if (currentValue < targetValue) 
      {
        return -1;
      } else if (currentValue > targetValue) 
      {
        return 1;
      }
    }
  return 0;
}});
  Ext.apply(Ext, {versions: {}, lastRegisteredVersion: null, setVersion: function(packageName, version) {
  Ext.versions[packageName] = new Version(version);
  Ext.lastRegisteredVersion = Ext.versions[packageName];
  return this;
}, getVersion: function(packageName) {
  if (packageName === undefined) 
  {
    return Ext.lastRegisteredVersion;
  }
  return Ext.versions[packageName];
}, deprecate: function(packageName, since, closure, scope) {
  if (Version.compare(Ext.getVersion(packageName), since) < 1) 
  {
    closure.call(scope);
  }
}});
  Ext.setVersion('core', version);
})();

Ext.String = {trimRegex: /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g, escapeRe: /('|\\)/g, formatRe: /\{(\d+)\}/g, escapeRegexRe: /([-.*+?^${}()|[\]\/\\])/g, htmlEncode: (function() {
  var entities = {'&': '&amp;', '>': '&gt;', '<': '&lt;', '"': '&quot;'}, keys = [], p, regex;
  for (p in entities) 
    {
      keys.push(p);
    }
  regex = new RegExp('(' + keys.join('|') + ')', 'g');
  return function(value) {
  return (!value) ? value : String(value).replace(regex, function(match, capture) {
  return entities[capture];
});
};
})(), htmlDecode: (function() {
  var entities = {'&amp;': '&', '&gt;': '>', '&lt;': '<', '&quot;': '"'}, keys = [], p, regex;
  for (p in entities) 
    {
      keys.push(p);
    }
  regex = new RegExp('(' + keys.join('|') + '|&#[0-9]{1,5};' + ')', 'g');
  return function(value) {
  return (!value) ? value : String(value).replace(regex, function(match, capture) {
  if (capture in entities) 
  {
    return entities[capture];
  } else {
    return String.fromCharCode(parseInt(capture.substr(2), 10));
  }
});
};
})(), urlAppend: function(url, string) {
  if (!Ext.isEmpty(string)) 
  {
    return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
  }
  return url;
}, trim: function(string) {
  return string.replace(Ext.String.trimRegex, "");
}, capitalize: function(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}, ellipsis: function(value, len, word) {
  if (value && value.length > len) 
  {
    if (word) 
    {
      var vs = value.substr(0, len - 2), index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
      if (index !== -1 && index >= (len - 15)) 
      {
        return vs.substr(0, index) + "...";
      }
    }
    return value.substr(0, len - 3) + "...";
  }
  return value;
}, escapeRegex: function(string) {
  return string.replace(Ext.String.escapeRegexRe, "\\$1");
}, escape: function(string) {
  return string.replace(Ext.String.escapeRe, "\\$1");
}, toggle: function(string, value, other) {
  return string === value ? other : value;
}, leftPad: function(string, size, character) {
  var result = String(string);
  character = character || " ";
  while (result.length < size) 
    {
      result = character + result;
    }
  return result;
}, format: function(format) {
  var args = Ext.Array.toArray(arguments, 1);
  return format.replace(Ext.String.formatRe, function(m, i) {
  return args[i];
});
}, repeat: function(pattern, count, sep) {
  for (var buf = [], i = count; i--; ) 
    {
      buf.push(pattern);
    }
  return buf.join(sep || '');
}};
Ext.htmlEncode = Ext.String.htmlEncode;
Ext.htmlDecode = Ext.String.htmlDecode;
Ext.urlAppend = Ext.String.urlAppend;

(function() {
  var arrayPrototype = Array.prototype, slice = arrayPrototype.slice, supportsSplice = function() {
  var array = [], lengthBefore, j = 20;
  if (!array.splice) 
  {
    return false;
  }
  while (j--) 
    {
      array.push("A");
    }
  array.splice(15, 0, "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F");
  lengthBefore = array.length;
  array.splice(13, 0, "XXX");
  if (lengthBefore + 1 != array.length) 
  {
    return false;
  }
  return true;
}(), supportsForEach = 'forEach' in arrayPrototype, supportsMap = 'map' in arrayPrototype, supportsIndexOf = 'indexOf' in arrayPrototype, supportsEvery = 'every' in arrayPrototype, supportsSome = 'some' in arrayPrototype, supportsFilter = 'filter' in arrayPrototype, supportsSort = function() {
  var a = [1, 2, 3, 4, 5].sort(function() {
  return 0;
});
  return a[0] === 1 && a[1] === 2 && a[2] === 3 && a[3] === 4 && a[4] === 5;
}(), supportsSliceOnNodeList = true, ExtArray;
  try {
    if (typeof document !== 'undefined') 
    {
      slice.call(document.getElementsByTagName('body'));
    }
  }  catch (e) {
  supportsSliceOnNodeList = false;
}
  function fixArrayIndex(array, index) {
    return (index < 0) ? Math.max(0, array.length + index) : Math.min(array.length, index);
  }
  function replaceSim(array, index, removeCount, insert) {
    var add = insert ? insert.length : 0, length = array.length, pos = fixArrayIndex(array, index);
    if (pos === length) 
    {
      if (add) 
      {
        array.push.apply(array, insert);
      }
    } else {
      var remove = Math.min(removeCount, length - pos), tailOldPos = pos + remove, tailNewPos = tailOldPos + add - remove, tailCount = length - tailOldPos, lengthAfterRemove = length - remove, i;
      if (tailNewPos < tailOldPos) 
      {
        for (i = 0; i < tailCount; ++i) 
          {
            array[tailNewPos + i] = array[tailOldPos + i];
          }
      } else if (tailNewPos > tailOldPos) 
      {
        for (i = tailCount; i--; ) 
          {
            array[tailNewPos + i] = array[tailOldPos + i];
          }
      }
      if (add && pos === lengthAfterRemove) 
      {
        array.length = lengthAfterRemove;
        array.push.apply(array, insert);
      } else {
        array.length = lengthAfterRemove + add;
        for (i = 0; i < add; ++i) 
          {
            array[pos + i] = insert[i];
          }
      }
    }
    return array;
  }
  function replaceNative(array, index, removeCount, insert) {
    if (insert && insert.length) 
    {
      if (index < array.length) 
      {
        array.splice.apply(array, [index, removeCount].concat(insert));
      } else {
        array.push.apply(array, insert);
      }
    } else {
      array.splice(index, removeCount);
    }
    return array;
  }
  function eraseSim(array, index, removeCount) {
    return replaceSim(array, index, removeCount);
  }
  function eraseNative(array, index, removeCount) {
    array.splice(index, removeCount);
    return array;
  }
  function spliceSim(array, index, removeCount) {
    var pos = fixArrayIndex(array, index), removed = array.slice(index, fixArrayIndex(array, pos + removeCount));
    if (arguments.length < 4) 
    {
      replaceSim(array, pos, removeCount);
    } else {
      replaceSim(array, pos, removeCount, slice.call(arguments, 3));
    }
    return removed;
  }
  function spliceNative(array) {
    return array.splice.apply(array, slice.call(arguments, 1));
  }
  var erase = supportsSplice ? eraseNative : eraseSim, replace = supportsSplice ? replaceNative : replaceSim, splice = supportsSplice ? spliceNative : spliceSim;
  ExtArray = Ext.Array = {each: function(array, fn, scope, reverse) {
  array = ExtArray.from(array);
  var i, ln = array.length;
  if (reverse !== true) 
  {
    for (i = 0; i < ln; i++) 
      {
        if (fn.call(scope || array[i], array[i], i, array) === false) 
        {
          return i;
        }
      }
  } else {
    for (i = ln - 1; i > -1; i--) 
      {
        if (fn.call(scope || array[i], array[i], i, array) === false) 
        {
          return i;
        }
      }
  }
  return true;
}, forEach: supportsForEach ? function(array, fn, scope) {
  return array.forEach(fn, scope);
} : function(array, fn, scope) {
  var i = 0, ln = array.length;
  for (; i < ln; i++) 
    {
      fn.call(scope, array[i], i, array);
    }
}, indexOf: (supportsIndexOf) ? function(array, item, from) {
  return array.indexOf(item, from);
} : function(array, item, from) {
  var i, length = array.length;
  for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) 
    {
      if (array[i] === item) 
      {
        return i;
      }
    }
  return -1;
}, contains: supportsIndexOf ? function(array, item) {
  return array.indexOf(item) !== -1;
} : function(array, item) {
  var i, ln;
  for (i = 0 , ln = array.length; i < ln; i++) 
    {
      if (array[i] === item) 
      {
        return true;
      }
    }
  return false;
}, toArray: function(iterable, start, end) {
  if (!iterable || !iterable.length) 
  {
    return [];
  }
  if (typeof iterable === 'string') 
  {
    iterable = iterable.split('');
  }
  if (supportsSliceOnNodeList) 
  {
    return slice.call(iterable, start || 0, end || iterable.length);
  }
  var array = [], i;
  start = start || 0;
  end = end ? ((end < 0) ? iterable.length + end : end) : iterable.length;
  for (i = start; i < end; i++) 
    {
      array.push(iterable[i]);
    }
  return array;
}, pluck: function(array, propertyName) {
  var ret = [], i, ln, item;
  for (i = 0 , ln = array.length; i < ln; i++) 
    {
      item = array[i];
      ret.push(item[propertyName]);
    }
  return ret;
}, map: supportsMap ? function(array, fn, scope) {
  return array.map(fn, scope);
} : function(array, fn, scope) {
  var results = [], i = 0, len = array.length;
  for (; i < len; i++) 
    {
      results[i] = fn.call(scope, array[i], i, array);
    }
  return results;
}, every: function(array, fn, scope) {
  if (supportsEvery) 
  {
    return array.every(fn, scope);
  }
  var i = 0, ln = array.length;
  for (; i < ln; ++i) 
    {
      if (!fn.call(scope, array[i], i, array)) 
      {
        return false;
      }
    }
  return true;
}, some: function(array, fn, scope) {
  if (supportsSome) 
  {
    return array.some(fn, scope);
  }
  var i = 0, ln = array.length;
  for (; i < ln; ++i) 
    {
      if (fn.call(scope, array[i], i, array)) 
      {
        return true;
      }
    }
  return false;
}, clean: function(array) {
  var results = [], i = 0, ln = array.length, item;
  for (; i < ln; i++) 
    {
      item = array[i];
      if (!Ext.isEmpty(item)) 
      {
        results.push(item);
      }
    }
  return results;
}, unique: function(array) {
  var clone = [], i = 0, ln = array.length, item;
  for (; i < ln; i++) 
    {
      item = array[i];
      if (ExtArray.indexOf(clone, item) === -1) 
      {
        clone.push(item);
      }
    }
  return clone;
}, filter: function(array, fn, scope) {
  if (supportsFilter) 
  {
    return array.filter(fn, scope);
  }
  var results = [], i = 0, ln = array.length;
  for (; i < ln; i++) 
    {
      if (fn.call(scope, array[i], i, array)) 
      {
        results.push(array[i]);
      }
    }
  return results;
}, from: function(value, newReference) {
  if (value === undefined || value === null) 
  {
    return [];
  }
  if (Ext.isArray(value)) 
  {
    return (newReference) ? slice.call(value) : value;
  }
  if (value && value.length !== undefined && typeof value !== 'string') 
  {
    return ExtArray.toArray(value);
  }
  return [value];
}, remove: function(array, item) {
  var index = ExtArray.indexOf(array, item);
  if (index !== -1) 
  {
    erase(array, index, 1);
  }
  return array;
}, include: function(array, item) {
  if (!ExtArray.contains(array, item)) 
  {
    array.push(item);
  }
}, clone: function(array) {
  return slice.call(array);
}, merge: function() {
  var args = slice.call(arguments), array = [], i, ln;
  for (i = 0 , ln = args.length; i < ln; i++) 
    {
      array = array.concat(args[i]);
    }
  return ExtArray.unique(array);
}, intersect: function() {
  var intersect = [], arrays = slice.call(arguments), item, minArray, itemIndex, arrayIndex;
  if (!arrays.length) 
  {
    return intersect;
  }
  arrays = arrays.sort(function(a, b) {
  if (a.length > b.length) 
  {
    return 1;
  } else if (a.length < b.length) 
  {
    return -1;
  } else {
    return 0;
  }
});
  minArray = ExtArray.unique(arrays[0]);
  for (itemIndex = 0; itemIndex < minArray.length; itemIndex++) 
    {
      item = minArray[itemIndex];
      for (arrayIndex = 1; arrayIndex < arrays.length; arrayIndex++) 
        {
          if (arrays[arrayIndex].indexOf(item) === -1) 
          {
            break;
          }
          if (arrayIndex == (arrays.length - 1)) 
          {
            intersect.push(item);
          }
        }
    }
  return intersect;
}, difference: function(arrayA, arrayB) {
  var clone = slice.call(arrayA), ln = clone.length, i, j, lnB;
  for (i = 0 , lnB = arrayB.length; i < lnB; i++) 
    {
      for (j = 0; j < ln; j++) 
        {
          if (clone[j] === arrayB[i]) 
          {
            erase(clone, j, 1);
            j--;
            ln--;
          }
        }
    }
  return clone;
}, slice: function(array, begin, end) {
  return slice.call(array, begin, end);
}, sort: function(array, sortFn) {
  if (supportsSort) 
  {
    if (sortFn) 
    {
      return array.sort(sortFn);
    } else {
      return array.sort();
    }
  }
  var length = array.length, i = 0, comparison, j, min, tmp;
  for (; i < length; i++) 
    {
      min = i;
      for (j = i + 1; j < length; j++) 
        {
          if (sortFn) 
          {
            comparison = sortFn(array[j], array[min]);
            if (comparison < 0) 
            {
              min = j;
            }
          } else if (array[j] < array[min]) 
          {
            min = j;
          }
        }
      if (min !== i) 
      {
        tmp = array[i];
        array[i] = array[min];
        array[min] = tmp;
      }
    }
  return array;
}, flatten: function(array) {
  var worker = [];
  function rFlatten(a) {
    var i, ln, v;
    for (i = 0 , ln = a.length; i < ln; i++) 
      {
        v = a[i];
        if (Ext.isArray(v)) 
        {
          rFlatten(v);
        } else {
          worker.push(v);
        }
      }
    return worker;
  }
  return rFlatten(array);
}, min: function(array, comparisonFn) {
  var min = array[0], i, ln, item;
  for (i = 0 , ln = array.length; i < ln; i++) 
    {
      item = array[i];
      if (comparisonFn) 
      {
        if (comparisonFn(min, item) === 1) 
        {
          min = item;
        }
      } else {
        if (item < min) 
        {
          min = item;
        }
      }
    }
  return min;
}, max: function(array, comparisonFn) {
  var max = array[0], i, ln, item;
  for (i = 0 , ln = array.length; i < ln; i++) 
    {
      item = array[i];
      if (comparisonFn) 
      {
        if (comparisonFn(max, item) === -1) 
        {
          max = item;
        }
      } else {
        if (item > max) 
        {
          max = item;
        }
      }
    }
  return max;
}, mean: function(array) {
  return array.length > 0 ? ExtArray.sum(array) / array.length : undefined;
}, sum: function(array) {
  var sum = 0, i, ln, item;
  for (i = 0 , ln = array.length; i < ln; i++) 
    {
      item = array[i];
      sum += item;
    }
  return sum;
}, erase: erase, insert: function(array, index, items) {
  return replace(array, index, 0, items);
}, replace: replace, splice: splice};
  Ext.each = ExtArray.each;
  ExtArray.union = ExtArray.merge;
  Ext.min = ExtArray.min;
  Ext.max = ExtArray.max;
  Ext.sum = ExtArray.sum;
  Ext.mean = ExtArray.mean;
  Ext.flatten = ExtArray.flatten;
  Ext.clean = ExtArray.clean;
  Ext.unique = ExtArray.unique;
  Ext.pluck = ExtArray.pluck;
  Ext.toArray = function() {
  return ExtArray.toArray.apply(ExtArray, arguments);
};
})();

(function() {
  var isToFixedBroken = (0.9).toFixed() !== '1';
  Ext.Number = {constrain: function(number, min, max) {
  number = parseFloat(number);
  if (!isNaN(min)) 
  {
    number = Math.max(number, min);
  }
  if (!isNaN(max)) 
  {
    number = Math.min(number, max);
  }
  return number;
}, snap: function(value, increment, minValue, maxValue) {
  var newValue = value, m;
  if (!(increment && value)) 
  {
    return value;
  }
  m = value % increment;
  if (m !== 0) 
  {
    newValue -= m;
    if (m * 2 >= increment) 
    {
      newValue += increment;
    } else if (m * 2 < -increment) 
    {
      newValue -= increment;
    }
  }
  return Ext.Number.constrain(newValue, minValue, maxValue);
}, toFixed: function(value, precision) {
  if (isToFixedBroken) 
  {
    precision = precision || 0;
    var pow = Math.pow(10, precision);
    return (Math.round(value * pow) / pow).toFixed(precision);
  }
  return value.toFixed(precision);
}, from: function(value, defaultValue) {
  if (isFinite(value)) 
  {
    value = parseFloat(value);
  }
  return !isNaN(value) ? value : defaultValue;
}};
})();
Ext.num = function() {
  return Ext.Number.from.apply(this, arguments);
};

(function() {
  var TemplateClass = function() {
};
  var ExtObject = Ext.Object = {chain: ('create' in Object) ? function(object) {
  return Object.create(object);
} : function(object) {
  TemplateClass.prototype = object;
  var result = new TemplateClass();
  TemplateClass.prototype = null;
  return result;
}, toQueryObjects: function(name, value, recursive) {
  var self = ExtObject.toQueryObjects, objects = [], i, ln;
  if (Ext.isArray(value)) 
  {
    for (i = 0 , ln = value.length; i < ln; i++) 
      {
        if (recursive) 
        {
          objects = objects.concat(self(name + '[' + i + ']', value[i], true));
        } else {
          objects.push({name: name, value: value[i]});
        }
      }
  } else if (Ext.isObject(value)) 
  {
    for (i in value) 
      {
        if (value.hasOwnProperty(i)) 
        {
          if (recursive) 
          {
            objects = objects.concat(self(name + '[' + i + ']', value[i], true));
          } else {
            objects.push({name: name, value: value[i]});
          }
        }
      }
  } else {
    objects.push({name: name, value: value});
  }
  return objects;
}, toQueryString: function(object, recursive) {
  var paramObjects = [], params = [], i, j, ln, paramObject, value;
  for (i in object) 
    {
      if (object.hasOwnProperty(i)) 
      {
        paramObjects = paramObjects.concat(ExtObject.toQueryObjects(i, object[i], recursive));
      }
    }
  for (j = 0 , ln = paramObjects.length; j < ln; j++) 
    {
      paramObject = paramObjects[j];
      value = paramObject.value;
      if (Ext.isEmpty(value)) 
      {
        value = '';
      } else if (Ext.isDate(value)) 
      {
        value = Ext.Date.toString(value);
      }
      params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
    }
  return params.join('&');
}, fromQueryString: function(queryString, recursive) {
  var parts = queryString.replace(/^\?/, '').split('&'), object = {}, temp, components, name, value, i, ln, part, j, subLn, matchedKeys, matchedName, keys, key, nextKey;
  for (i = 0 , ln = parts.length; i < ln; i++) 
    {
      part = parts[i];
      if (part.length > 0) 
      {
        components = part.split('=');
        name = decodeURIComponent(components[0]);
        value = (components[1] !== undefined) ? decodeURIComponent(components[1]) : '';
        if (!recursive) 
        {
          if (object.hasOwnProperty(name)) 
          {
            if (!Ext.isArray(object[name])) 
            {
              object[name] = [object[name]];
            }
            object[name].push(value);
          } else {
            object[name] = value;
          }
        } else {
          matchedKeys = name.match(/(\[):?([^\]]*)\]/g);
          matchedName = name.match(/^([^\[]+)/);
          name = matchedName[0];
          keys = [];
          if (matchedKeys === null) 
          {
            object[name] = value;
            continue;
          }
          for (j = 0 , subLn = matchedKeys.length; j < subLn; j++) 
            {
              key = matchedKeys[j];
              key = (key.length === 2) ? '' : key.substring(1, key.length - 1);
              keys.push(key);
            }
          keys.unshift(name);
          temp = object;
          for (j = 0 , subLn = keys.length; j < subLn; j++) 
            {
              key = keys[j];
              if (j === subLn - 1) 
              {
                if (Ext.isArray(temp) && key === '') 
                {
                  temp.push(value);
                } else {
                  temp[key] = value;
                }
              } else {
                if (temp[key] === undefined || typeof temp[key] === 'string') 
                {
                  nextKey = keys[j + 1];
                  temp[key] = (Ext.isNumeric(nextKey) || nextKey === '') ? [] : {};
                }
                temp = temp[key];
              }
            }
        }
      }
    }
  return object;
}, each: function(object, fn, scope) {
  for (var property in object) 
    {
      if (object.hasOwnProperty(property)) 
      {
        if (fn.call(scope || object, property, object[property], object) === false) 
        {
          return;
        }
      }
    }
}, merge: function(source) {
  var i = 1, ln = arguments.length, mergeFn = ExtObject.merge, cloneFn = Ext.clone, object, key, value, sourceKey;
  for (; i < ln; i++) 
    {
      object = arguments[i];
      for (key in object) 
        {
          value = object[key];
          if (value && value.constructor === Object) 
          {
            sourceKey = source[key];
            if (sourceKey && sourceKey.constructor === Object) 
            {
              mergeFn(sourceKey, value);
            } else {
              source[key] = cloneFn(value);
            }
          } else {
            source[key] = value;
          }
        }
    }
  return source;
}, mergeIf: function(source) {
  var i = 1, ln = arguments.length, cloneFn = Ext.clone, object, key, value;
  for (; i < ln; i++) 
    {
      object = arguments[i];
      for (key in object) 
        {
          if (!(key in source)) 
          {
            value = object[key];
            if (value && value.constructor === Object) 
            {
              source[key] = cloneFn(value);
            } else {
              source[key] = value;
            }
          }
        }
    }
  return source;
}, getKey: function(object, value) {
  for (var property in object) 
    {
      if (object.hasOwnProperty(property) && object[property] === value) 
      {
        return property;
      }
    }
  return null;
}, getValues: function(object) {
  var values = [], property;
  for (property in object) 
    {
      if (object.hasOwnProperty(property)) 
      {
        values.push(object[property]);
      }
    }
  return values;
}, getKeys: ('keys' in Object) ? Object.keys : function(object) {
  var keys = [], property;
  for (property in object) 
    {
      if (object.hasOwnProperty(property)) 
      {
        keys.push(property);
      }
    }
  return keys;
}, getSize: function(object) {
  var size = 0, property;
  for (property in object) 
    {
      if (object.hasOwnProperty(property)) 
      {
        size++;
      }
    }
  return size;
}, classify: function(object) {
  var objectProperties = [], arrayProperties = [], propertyClassesMap = {}, objectClass = function() {
  var i = 0, ln = objectProperties.length, property;
  for (; i < ln; i++) 
    {
      property = objectProperties[i];
      this[property] = new propertyClassesMap[property]();
    }
  ln = arrayProperties.length;
  for (i = 0; i < ln; i++) 
    {
      property = arrayProperties[i];
      this[property] = object[property].slice();
    }
}, key, value, constructor;
  for (key in object) 
    {
      if (object.hasOwnProperty(key)) 
      {
        value = object[key];
        if (value) 
        {
          constructor = value.constructor;
          if (constructor === Object) 
          {
            objectProperties.push(key);
            propertyClassesMap[key] = ExtObject.classify(value);
          } else if (constructor === Array) 
          {
            arrayProperties.push(key);
          }
        }
      }
    }
  objectClass.prototype = object;
  return objectClass;
}, equals: function(origin, target) {
  var originType = typeof origin, targetType = typeof target, key;
  if (targetType === targetType) 
  {
    if (originType === 'object') 
    {
      for (key in origin) 
        {
          if (!(key in target)) 
          {
            return false;
          }
          if (!ExtObject.equals(origin[key], target[key])) 
          {
            return false;
          }
        }
      for (key in target) 
        {
          if (!(key in origin)) 
          {
            return false;
          }
        }
      return true;
    } else {
      return origin === target;
    }
  }
  return false;
}, defineProperty: ('defineProperty' in Object) ? Object.defineProperty : function(object, name, descriptor) {
  if (descriptor.get) 
  {
    object.__defineGetter__(name, descriptor.get);
  }
  if (descriptor.set) 
  {
    object.__defineSetter__(name, descriptor.set);
  }
}};
  Ext.merge = Ext.Object.merge;
  Ext.mergeIf = Ext.Object.mergeIf;
  Ext.urlEncode = function() {
  var args = Ext.Array.from(arguments), prefix = '';
  if ((typeof args[1] === 'string')) 
  {
    prefix = args[1] + '&';
    args[1] = false;
  }
  return prefix + ExtObject.toQueryString.apply(ExtObject, args);
};
  Ext.urlDecode = function() {
  return ExtObject.fromQueryString.apply(ExtObject, arguments);
};
})();

Ext.Function = {flexSetter: function(fn) {
  return function(a, b) {
  var k, i;
  if (a === null) 
  {
    return this;
  }
  if (typeof a !== 'string') 
  {
    for (k in a) 
      {
        if (a.hasOwnProperty(k)) 
        {
          fn.call(this, k, a[k]);
        }
      }
    if (Ext.enumerables) 
    {
      for (i = Ext.enumerables.length; i--; ) 
        {
          k = Ext.enumerables[i];
          if (a.hasOwnProperty(k)) 
          {
            fn.call(this, k, a[k]);
          }
        }
    }
  } else {
    fn.call(this, a, b);
  }
  return this;
};
}, bind: function(fn, scope, args, appendArgs) {
  if (arguments.length === 2) 
  {
    return function() {
  return fn.apply(scope, arguments);
};
  }
  var method = fn, slice = Array.prototype.slice;
  return function() {
  var callArgs = args || arguments;
  if (appendArgs === true) 
  {
    callArgs = slice.call(arguments, 0);
    callArgs = callArgs.concat(args);
  } else if (typeof appendArgs == 'number') 
  {
    callArgs = slice.call(arguments, 0);
    Ext.Array.insert(callArgs, appendArgs, args);
  }
  return method.apply(scope || window, callArgs);
};
}, pass: function(fn, args, scope) {
  if (!Ext.isArray(args)) 
  {
    args = Ext.Array.clone(args);
  }
  return function() {
  args.push.apply(args, arguments);
  return fn.apply(scope || this, args);
};
}, alias: function(object, methodName) {
  return function() {
  return object[methodName].apply(object, arguments);
};
}, clone: function(method) {
  return function() {
  return method.apply(this, arguments);
};
}, createInterceptor: function(origFn, newFn, scope, returnValue) {
  var method = origFn;
  if (!Ext.isFunction(newFn)) 
  {
    return origFn;
  } else {
    return function() {
  var me = this, args = arguments;
  newFn.target = me;
  newFn.method = origFn;
  return (newFn.apply(scope || me || window, args) !== false) ? origFn.apply(me || window, args) : returnValue || null;
};
  }
}, createDelayed: function(fn, delay, scope, args, appendArgs) {
  if (scope || args) 
  {
    fn = Ext.Function.bind(fn, scope, args, appendArgs);
  }
  return function() {
  var me = this, args = Array.prototype.slice.call(arguments);
  setTimeout(function() {
  fn.apply(me, args);
}, delay);
};
}, defer: function(fn, millis, scope, args, appendArgs) {
  fn = Ext.Function.bind(fn, scope, args, appendArgs);
  if (millis > 0) 
  {
    return setTimeout(fn, millis);
  }
  fn();
  return 0;
}, createSequence: function(originalFn, newFn, scope) {
  if (!newFn) 
  {
    return originalFn;
  } else {
    return function() {
  var result = originalFn.apply(this, arguments);
  newFn.apply(scope || this, arguments);
  return result;
};
  }
}, createBuffered: function(fn, buffer, scope, args) {
  var timerId;
  return function() {
  var callArgs = args || Array.prototype.slice.call(arguments, 0), me = scope || this;
  if (timerId) 
  {
    clearTimeout(timerId);
  }
  timerId = setTimeout(function() {
  fn.apply(me, callArgs);
}, buffer);
};
}, createThrottled: function(fn, interval, scope) {
  var lastCallTime, elapsed, lastArgs, timer, execute = function() {
  fn.apply(scope || this, lastArgs);
  lastCallTime = new Date().getTime();
};
  return function() {
  elapsed = new Date().getTime() - lastCallTime;
  lastArgs = arguments;
  clearTimeout(timer);
  if (!lastCallTime || (elapsed >= interval)) 
  {
    execute();
  } else {
    timer = setTimeout(execute, interval - elapsed);
  }
};
}, interceptBefore: function(object, methodName, fn, scope) {
  var method = object[methodName] || Ext.emptyFn;
  return (object[methodName] = function() {
  var ret = fn.apply(scope || this, arguments);
  method.apply(this, arguments);
  return ret;
});
}, interceptAfter: function(object, methodName, fn, scope) {
  var method = object[methodName] || Ext.emptyFn;
  return (object[methodName] = function() {
  method.apply(this, arguments);
  return fn.apply(scope || this, arguments);
});
}};
Ext.defer = Ext.Function.alias(Ext.Function, 'defer');
Ext.pass = Ext.Function.alias(Ext.Function, 'pass');
Ext.bind = Ext.Function.alias(Ext.Function, 'bind');

Ext.JSON = new (function() {
  var useHasOwn = !!{}.hasOwnProperty, isNative = function() {
  var useNative = null;
  return function() {
  if (useNative === null) 
  {
    useNative = Ext.USE_NATIVE_JSON && window.JSON && JSON.toString() == '[object JSON]';
  }
  return useNative;
};
}(), pad = function(n) {
  return n < 10 ? "0" + n : n;
}, doDecode = function(json) {
  return eval("(" + json + ')');
}, doEncode = function(o) {
  if (!Ext.isDefined(o) || o === null) 
  {
    return "null";
  } else if (Ext.isArray(o)) 
  {
    return encodeArray(o);
  } else if (Ext.isDate(o)) 
  {
    return Ext.JSON.encodeDate(o);
  } else if (Ext.isString(o)) 
  {
    if (Ext.isMSDate(o)) 
    {
      return encodeMSDate(o);
    } else {
      return encodeString(o);
    }
  } else if (typeof o == "number") 
  {
    return isFinite(o) ? String(o) : "null";
  } else if (Ext.isBoolean(o)) 
  {
    return String(o);
  } else if (Ext.isObject(o)) 
  {
    return encodeObject(o);
  } else if (typeof o === "function") 
  {
    return "null";
  }
  return 'undefined';
}, m = {"\b": '\\b', "\t": '\\t', "\n": '\\n', "\f": '\\f', "\r": '\\r', '"': '\\"', "\\": '\\\\', '\v': '\\u000b'}, charToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g, encodeString = function(s) {
  return '"' + s.replace(charToReplace, function(a) {
  var c = m[a];
  return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
}) + '"';
}, encodeArray = function(o) {
  var a = ["[", ""], len = o.length, i;
  for (i = 0; i < len; i += 1) 
    {
      a.push(doEncode(o[i]), ',');
    }
  a[a.length - 1] = ']';
  return a.join("");
}, encodeObject = function(o) {
  var a = ["{", ""], i;
  for (i in o) 
    {
      if (!useHasOwn || o.hasOwnProperty(i)) 
      {
        a.push(doEncode(i), ":", doEncode(o[i]), ',');
      }
    }
  a[a.length - 1] = '}';
  return a.join("");
}, encodeMSDate = function(o) {
  return '"' + o + '"';
};
  this.encodeDate = function(o) {
  return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"';
};
  this.encode = function() {
  var ec;
  return function(o) {
  if (!ec) 
  {
    ec = isNative() ? JSON.stringify : doEncode;
  }
  return ec(o);
};
}();
  this.decode = function() {
  var dc;
  return function(json, safe) {
  if (!dc) 
  {
    dc = isNative() ? JSON.parse : doDecode;
  }
  try {
    return dc(json);
  }  catch (e) {
  if (safe === true) 
  {
    return null;
  }
  Ext.Error.raise({sourceClass: "Ext.JSON", sourceMethod: "decode", msg: "You're trying to decode an invalid JSON String: " + json});
}
};
}();
})();
if (!Ext.util) 
{
  Ext.util = {};
}
Ext.util.JSON = Ext.JSON;
Ext.encode = Ext.JSON.encode;
Ext.decode = Ext.JSON.decode;

Ext.Error = {raise: function(object) {
  throw new Error(object.msg);
}};

Ext.Date = {now: Date.now, toString: function(date) {
  if (!date) 
  {
    date = new Date();
  }
  var pad = Ext.String.leftPad;
  return date.getFullYear() + "-" + pad(date.getMonth() + 1, 2, '0') + "-" + pad(date.getDate(), 2, '0') + "T" + pad(date.getHours(), 2, '0') + ":" + pad(date.getMinutes(), 2, '0') + ":" + pad(date.getSeconds(), 2, '0');
}};


(function(flexSetter) {
  var noArgs = [], Base = function() {
};
  Ext.apply(Base, {$className: 'Ext.Base', $isClass: true, create: function() {
  return Ext.create.apply(Ext, [this].concat(Array.prototype.slice.call(arguments, 0)));
}, extend: function(parent) {
  var parentPrototype = parent.prototype, prototype, i, ln, name, statics;
  prototype = this.prototype = Ext.Object.chain(parentPrototype);
  prototype.self = this;
  this.superclass = prototype.superclass = parentPrototype;
  if (!parent.$isClass) 
  {
    Ext.apply(prototype, Ext.Base.prototype);
    prototype.constructor = function() {
  parentPrototype.constructor.apply(this, arguments);
};
  }
  statics = parentPrototype.$inheritableStatics;
  if (statics) 
  {
    for (i = 0 , ln = statics.length; i < ln; i++) 
      {
        name = statics[i];
        if (!this.hasOwnProperty(name)) 
        {
          this[name] = parent[name];
        }
      }
  }
  if (parent.$onExtended) 
  {
    this.$onExtended = parent.$onExtended.slice();
  }
  prototype.config = prototype.defaultConfig = new prototype.configClass();
  prototype.initConfigList = prototype.initConfigList.slice();
  prototype.initConfigMap = Ext.Object.chain(prototype.initConfigMap);
}, '$onExtended': [], triggerExtended: function() {
  var callbacks = this.$onExtended, ln = callbacks.length, i, callback;
  if (ln > 0) 
  {
    for (i = 0; i < ln; i++) 
      {
        callback = callbacks[i];
        callback.fn.apply(callback.scope || this, arguments);
      }
  }
}, onExtended: function(fn, scope) {
  this.$onExtended.push({fn: fn, scope: scope});
  return this;
}, addConfig: function(config, fullMerge) {
  var prototype = this.prototype, initConfigList = prototype.initConfigList, initConfigMap = prototype.initConfigMap, defaultConfig = prototype.defaultConfig, hasInitConfigItem, name, value;
  fullMerge = Boolean(fullMerge);
  for (name in config) 
    {
      if (config.hasOwnProperty(name) && (fullMerge || !(name in defaultConfig))) 
      {
        value = config[name];
        hasInitConfigItem = initConfigMap[name];
        if (value !== null) 
        {
          if (!hasInitConfigItem) 
          {
            initConfigMap[name] = true;
            initConfigList.push(name);
          }
        } else if (hasInitConfigItem) 
        {
          initConfigMap[name] = false;
          Ext.Array.remove(initConfigList, name);
        }
      }
    }
  if (fullMerge) 
  {
    Ext.merge(defaultConfig, config);
  } else {
    Ext.mergeIf(defaultConfig, config);
  }
  prototype.configClass = Ext.Object.classify(defaultConfig);
}, addStatics: function(members) {
  var member, name;
  for (name in members) 
    {
      if (members.hasOwnProperty(name)) 
      {
        member = members[name];
        this[name] = member;
      }
    }
  return this;
}, addInheritableStatics: function(members) {
  var inheritableStatics, hasInheritableStatics, prototype = this.prototype, name, member;
  inheritableStatics = prototype.$inheritableStatics;
  hasInheritableStatics = prototype.$hasInheritableStatics;
  if (!inheritableStatics) 
  {
    inheritableStatics = prototype.$inheritableStatics = [];
    hasInheritableStatics = prototype.$hasInheritableStatics = {};
  }
  for (name in members) 
    {
      if (members.hasOwnProperty(name)) 
      {
        member = members[name];
        this[name] = member;
        if (!hasInheritableStatics[name]) 
        {
          hasInheritableStatics[name] = true;
          inheritableStatics.push(name);
        }
      }
    }
  return this;
}, addMembers: function(members) {
  var prototype = this.prototype, names = [], name, member;
  for (name in members) 
    {
      if (members.hasOwnProperty(name)) 
      {
        member = members[name];
        if (typeof member == 'function' && !member.$isClass && member !== Ext.emptyFn) 
        {
          member.$owner = this;
          member.$name = name;
        }
        prototype[name] = member;
      }
    }
  return this;
}, addMember: function(name, member) {
  if (typeof member == 'function' && !member.$isClass && member !== Ext.emptyFn) 
  {
    member.$owner = this;
    member.$name = name;
  }
  this.prototype[name] = member;
  return this;
}, implement: function() {
  this.addMembers.apply(this, arguments);
}, borrow: function(fromClass, members) {
  var prototype = this.prototype, fromPrototype = fromClass.prototype, i, ln, name, fn, toBorrow;
  members = Ext.Array.from(members);
  for (i = 0 , ln = members.length; i < ln; i++) 
    {
      name = members[i];
      toBorrow = fromPrototype[name];
      if (typeof toBorrow == 'function') 
      {
        fn = function() {
  return toBorrow.apply(this, arguments);
};
        fn.$owner = this;
        fn.$name = name;
        prototype[name] = fn;
      } else {
        prototype[name] = toBorrow;
      }
    }
  return this;
}, override: function(members) {
  var me = this, enumerables = Ext.enumerables, target = me.prototype, cloneFunction = Ext.Function.clone, currentConfig = target.config, name, index, member, statics, names, previous, newConfig, prop;
  if (arguments.length === 2) 
  {
    name = members;
    members = {};
    members[name] = arguments[1];
    enumerables = null;
  }
  do {
    names = [];
    statics = null;
    for (name in members) 
      {
        if (name == 'statics') 
        {
          statics = members[name];
        } else if (name == 'config') 
        {
          newConfig = members[name];
          me.addConfig(newConfig, true);
        } else {
          names.push(name);
        }
      }
    if (enumerables) 
    {
      names.push.apply(names, enumerables);
    }
    for (index = names.length; index--; ) 
      {
        name = names[index];
        if (members.hasOwnProperty(name)) 
        {
          member = members[name];
          if (typeof member == 'function' && !member.$className && member !== Ext.emptyFn) 
          {
            if (typeof member.$owner != 'undefined') 
            {
              member = cloneFunction(member);
            }
            member.$owner = me;
            member.$name = name;
            previous = target[name];
            if (previous) 
            {
              member.$previous = previous;
            }
          }
          target[name] = member;
        }
      }
    target = me;
    members = statics;
  } while (members);
  return this;
}, callParent: function(args) {
  var method;
  return (method = this.callParent.caller) && (method.$previous || ((method = method.$owner ? method : method.caller) && method.$owner.superclass.$class[method.$name])).apply(this, args || noArgs);
}, mixin: function(name, mixinClass) {
  var mixin = mixinClass.prototype, prototype = this.prototype, key;
  if (typeof mixin.onClassMixedIn != 'undefined') 
  {
    mixin.onClassMixedIn.call(mixinClass, this);
  }
  if (!prototype.hasOwnProperty('mixins')) 
  {
    if ('mixins' in prototype) 
    {
      prototype.mixins = Ext.Object.chain(prototype.mixins);
    } else {
      prototype.mixins = {};
    }
  }
  for (key in mixin) 
    {
      if (key === 'mixins') 
      {
        Ext.merge(prototype.mixins, mixin[key]);
      } else if (typeof prototype[key] == 'undefined' && key != 'mixinId' && key != 'config') 
      {
        prototype[key] = mixin[key];
      }
    }
  if ('config' in mixin) 
  {
    this.addConfig(mixin.config, false);
  }
  prototype.mixins[name] = mixin;
}, getName: function() {
  return Ext.getClassName(this);
}, createAlias: flexSetter(function(alias, origin) {
  this.override(alias, function() {
  return this[origin].apply(this, arguments);
});
}), addXtype: function(xtype) {
  var prototype = this.prototype, xtypesMap = prototype.xtypesMap, xtypes = prototype.xtypes, xtypesChain = prototype.xtypesChain;
  if (!prototype.hasOwnProperty('xtypesMap')) 
  {
    xtypesMap = prototype.xtypesMap = Ext.merge({}, prototype.xtypesMap || {});
    xtypes = prototype.xtypes = prototype.xtypes ? [].concat(prototype.xtypes) : [];
    xtypesChain = prototype.xtypesChain = prototype.xtypesChain ? [].concat(prototype.xtypesChain) : [];
    prototype.xtype = xtype;
  }
  if (!xtypesMap[xtype]) 
  {
    xtypesMap[xtype] = true;
    xtypes.push(xtype);
    xtypesChain.push(xtype);
    Ext.ClassManager.setAlias(this, 'widget.' + xtype);
  }
  return this;
}});
  Base.implement({isInstance: true, $className: 'Ext.Base', configClass: Ext.emptyFn, initConfigList: [], initConfigMap: {}, statics: function() {
  var method = this.statics.caller, self = this.self;
  if (!method) 
  {
    return self;
  }
  return method.$owner;
}, callParent: function(args) {
  var method, superMethod = (method = this.callParent.caller) && (method.$previous || ((method = method.$owner ? method : method.caller) && method.$owner.superclass[method.$name]));
  return superMethod.apply(this, args || noArgs);
}, callSuper: function(args) {
  var method, superMethod = (method = this.callSuper.caller) && ((method = method.$owner ? method : method.caller) && method.$owner.superclass[method.$name]);
  return superMethod.apply(this, args || noArgs);
}, callOverridden: function(args) {
  var method = this.callOverridden.caller;
  return method && method.$previous.apply(this, args || noArgs);
}, self: Base, constructor: function() {
  return this;
}, wasInstantiated: false, initConfig: function(instanceConfig) {
  var configNameCache = Ext.Class.configNameCache, prototype = this.self.prototype, initConfigList = this.initConfigList, initConfigMap = this.initConfigMap, config = new this.configClass(), defaultConfig = this.defaultConfig, i, ln, name, value, nameMap, getName;
  this.initConfig = Ext.emptyFn;
  this.initialConfig = instanceConfig || {};
  if (instanceConfig) 
  {
    Ext.merge(config, instanceConfig);
  }
  this.config = config;
  if (!prototype.hasOwnProperty('wasInstantiated')) 
  {
    prototype.wasInstantiated = true;
    for (i = 0 , ln = initConfigList.length; i < ln; i++) 
      {
        name = initConfigList[i];
        nameMap = configNameCache[name];
        value = defaultConfig[name];
        if (!(nameMap.apply in prototype) && !(nameMap.update in prototype) && prototype[nameMap.set].$isDefault && typeof value != 'object') 
        {
          prototype[nameMap.internal] = defaultConfig[name];
          initConfigMap[name] = false;
          Ext.Array.remove(initConfigList, name);
          i--;
          ln--;
        }
      }
  }
  if (instanceConfig) 
  {
    initConfigList = initConfigList.slice();
    for (name in instanceConfig) 
      {
        if (name in defaultConfig && !initConfigMap[name]) 
        {
          initConfigList.push(name);
        }
      }
  }
  for (i = 0 , ln = initConfigList.length; i < ln; i++) 
    {
      name = initConfigList[i];
      nameMap = configNameCache[name];
      this[nameMap.get] = this[nameMap.initGet];
    }
  this.beforeInitConfig(config);
  for (i = 0 , ln = initConfigList.length; i < ln; i++) 
    {
      name = initConfigList[i];
      nameMap = configNameCache[name];
      getName = nameMap.get;
      if (this.hasOwnProperty(getName)) 
      {
        this[nameMap.set].call(this, config[name]);
        delete this[getName];
      }
    }
  return this;
}, beforeInitConfig: Ext.emptyFn, getCurrentConfig: function() {
  var defaultConfig = this.defaultConfig, configNameCache = Ext.Class.configNameCache, config = {}, name, nameMap;
  for (name in defaultConfig) 
    {
      nameMap = configNameCache[name];
      config[name] = this[nameMap.get].call(this);
    }
  return config;
}, setConfig: function(config, applyIfNotSet) {
  if (!config) 
  {
    return this;
  }
  var configNameCache = Ext.Class.configNameCache, currentConfig = this.config, defaultConfig = this.defaultConfig, initialConfig = this.initialConfig, configList = [], name, i, ln, nameMap;
  applyIfNotSet = Boolean(applyIfNotSet);
  for (name in config) 
    {
      if ((applyIfNotSet && (name in initialConfig))) 
      {
        continue;
      }
      currentConfig[name] = config[name];
      if (name in defaultConfig) 
      {
        configList.push(name);
        nameMap = configNameCache[name];
        this[nameMap.get] = this[nameMap.initGet];
      }
    }
  for (i = 0 , ln = configList.length; i < ln; i++) 
    {
      name = configList[i];
      nameMap = configNameCache[name];
      this[nameMap.set].call(this, config[name]);
      delete this[nameMap.get];
    }
  return this;
}, set: function(name, value) {
  return this[Ext.Class.configNameCache[name].set].call(this, value);
}, get: function(name) {
  return this[Ext.Class.configNameCache[name].get].call(this);
}, getConfig: function(name) {
  return this[Ext.Class.configNameCache[name].get].call(this);
}, hasConfig: function(name) {
  return (name in this.defaultConfig);
}, getInitialConfig: function(name) {
  var config = this.config;
  if (!name) 
  {
    return config;
  } else {
    return config[name];
  }
}, onConfigUpdate: function(names, callback, scope) {
  var self = this.self, i, ln, name, updaterName, updater, newUpdater;
  names = Ext.Array.from(names);
  scope = scope || this;
  for (i = 0 , ln = names.length; i < ln; i++) 
    {
      name = names[i];
      updaterName = 'update' + Ext.String.capitalize(name);
      updater = this[updaterName] || Ext.emptyFn;
      newUpdater = function() {
  updater.apply(this, arguments);
  scope[callback].apply(scope, arguments);
};
      newUpdater.$name = updaterName;
      newUpdater.$owner = self;
      this[updaterName] = newUpdater;
    }
}, link: function(name, value) {
  this.$links = {};
  this.link = this.doLink;
  return this.link.apply(this, arguments);
}, doLink: function(name, value) {
  this.$links[name] = true;
  this[name] = value;
  return value;
}, unlink: function() {
  var i, ln, link, value;
  for (i = 0 , ln = arguments.length; i < ln; i++) 
    {
      link = arguments[i];
      if (this.hasOwnProperty(link)) 
      {
        value = this[link];
        if (value) 
        {
          if (value.isInstance && !value.isDestroyed) 
          {
            value.destroy();
          } else if (value.parentNode && 'nodeType' in value) 
          {
            value.parentNode.removeChild(value);
          }
        }
        delete this[link];
      }
    }
  return this;
}, destroy: function() {
  this.destroy = Ext.emptyFn;
  this.isDestroyed = true;
  if (this.hasOwnProperty('$links')) 
  {
    this.unlink.apply(this, Ext.Object.getKeys(this.$links));
    delete this.$links;
  }
}});
  Ext.Base = Base;
})(Ext.Function.flexSetter);

(function() {
  var ExtClass, Base = Ext.Base, baseStaticMembers = [], baseStaticMember, baseStaticMemberLength;
  for (baseStaticMember in Base) 
    {
      if (Base.hasOwnProperty(baseStaticMember)) 
      {
        baseStaticMembers.push(baseStaticMember);
      }
    }
  baseStaticMemberLength = baseStaticMembers.length;
  Ext.Class = ExtClass = function(Class, data, onCreated) {
  if (typeof Class != 'function') 
  {
    onCreated = data;
    data = Class;
    Class = null;
  }
  if (!data) 
  {
    data = {};
  }
  Class = ExtClass.create(Class);
  ExtClass.process(Class, data, onCreated);
  return Class;
};
  Ext.apply(ExtClass, {onBeforeCreated: function(Class, data, hooks) {
  Class.addMembers(data);
  hooks.onCreated.call(Class, Class);
}, create: function(Class) {
  var name, i;
  if (!Class) 
  {
    Class = function() {
  return this.constructor.apply(this, arguments);
};
  }
  for (i = 0; i < baseStaticMemberLength; i++) 
    {
      name = baseStaticMembers[i];
      Class[name] = Base[name];
    }
  return Class;
}, process: function(Class, data, onCreated) {
  var preprocessorStack = data.preprocessors || ExtClass.defaultPreprocessors, preprocessors = this.preprocessors, hooks = {onBeforeCreated: this.onBeforeCreated, onCreated: onCreated || Ext.emptyFn}, index = 0, name, preprocessor, properties, i, ln, fn, property, process;
  delete data.preprocessors;
  process = function(Class, data, hooks) {
  fn = null;
  while (fn === null) 
    {
      name = preprocessorStack[index++];
      if (name) 
      {
        preprocessor = preprocessors[name];
        properties = preprocessor.properties;
        if (properties === true) 
        {
          fn = preprocessor.fn;
        } else {
          for (i = 0 , ln = properties.length; i < ln; i++) 
            {
              property = properties[i];
              if (data.hasOwnProperty(property)) 
              {
                fn = preprocessor.fn;
                break;
              }
            }
        }
      } else {
        hooks.onBeforeCreated.apply(this, arguments);
        return;
      }
    }
  if (fn.call(this, Class, data, hooks, process) !== false) 
  {
    process.apply(this, arguments);
  }
};
  process.call(this, Class, data, hooks);
}, preprocessors: {}, registerPreprocessor: function(name, fn, properties, position, relativeTo) {
  if (!position) 
  {
    position = 'last';
  }
  if (!properties) 
  {
    properties = [name];
  }
  this.preprocessors[name] = {name: name, properties: properties || false, fn: fn};
  this.setDefaultPreprocessorPosition(name, position, relativeTo);
  return this;
}, getPreprocessor: function(name) {
  return this.preprocessors[name];
}, getPreprocessors: function() {
  return this.preprocessors;
}, defaultPreprocessors: [], getDefaultPreprocessors: function() {
  return this.defaultPreprocessors;
}, setDefaultPreprocessors: function(preprocessors) {
  this.defaultPreprocessors = Ext.Array.from(preprocessors);
  return this;
}, setDefaultPreprocessorPosition: function(name, offset, relativeName) {
  var defaultPreprocessors = this.defaultPreprocessors, index;
  if (typeof offset == 'string') 
  {
    if (offset === 'first') 
    {
      defaultPreprocessors.unshift(name);
      return this;
    } else if (offset === 'last') 
    {
      defaultPreprocessors.push(name);
      return this;
    }
    offset = (offset === 'after') ? 1 : -1;
  }
  index = Ext.Array.indexOf(defaultPreprocessors, relativeName);
  if (index !== -1) 
  {
    Ext.Array.splice(defaultPreprocessors, Math.max(0, index + offset), 0, name);
  }
  return this;
}, configNameCache: {}, getConfigNameMap: function(name) {
  var cache = this.configNameCache, map = cache[name], capitalizedName;
  if (!map) 
  {
    capitalizedName = name.charAt(0).toUpperCase() + name.substr(1);
    map = cache[name] = {name: name, internal: '_' + name, initializing: 'is' + capitalizedName + 'Initializing', apply: 'apply' + capitalizedName, update: 'update' + capitalizedName, set: 'set' + capitalizedName, get: 'get' + capitalizedName, initGet: 'initGet' + capitalizedName, doSet: 'doSet' + capitalizedName, changeEvent: name.toLowerCase() + 'change'};
  }
  return map;
}, generateSetter: function(nameMap) {
  var internalName = nameMap.internal, getName = nameMap.get, applyName = nameMap.apply, updateName = nameMap.update, setter;
  setter = function(value) {
  var oldValue = this[internalName], applier = this[applyName], updater = this[updateName];
  delete this[getName];
  if (applier) 
  {
    value = applier.call(this, value, oldValue);
    if (typeof value == 'undefined') 
    {
      return this;
    }
  }
  this[internalName] = value;
  if (updater && value !== oldValue) 
  {
    updater.call(this, value, oldValue);
  }
  return this;
};
  setter.$isDefault = true;
  return setter;
}, generateInitGetter: function(nameMap) {
  var name = nameMap.name, setName = nameMap.set, getName = nameMap.get, initializingName = nameMap.initializing;
  return function() {
  this[initializingName] = true;
  delete this[getName];
  this[setName].call(this, this.config[name]);
  delete this[initializingName];
  return this[getName].apply(this, arguments);
};
}, generateGetter: function(nameMap) {
  var internalName = nameMap.internal;
  return function() {
  return this[internalName];
};
}});
  ExtClass.registerPreprocessor('extend', function(Class, data) {
  var Base = Ext.Base, extend = data.extend, Parent;
  delete data.extend;
  if (extend && extend !== Object) 
  {
    Parent = extend;
  } else {
    Parent = Base;
  }
  Class.extend(Parent);
  Class.triggerExtended.apply(Class, arguments);
  if (data.onClassExtended) 
  {
    Class.onExtended(data.onClassExtended, Class);
    delete data.onClassExtended;
  }
}, true);
  ExtClass.registerPreprocessor('statics', function(Class, data) {
  Class.addStatics(data.statics);
  delete data.statics;
});
  ExtClass.registerPreprocessor('inheritableStatics', function(Class, data) {
  Class.addInheritableStatics(data.inheritableStatics);
  delete data.inheritableStatics;
});
  ExtClass.registerPreprocessor('platformConfig', function(Class, data, hooks) {
  var platformConfigs = data.platformConfig, config = data.config || {}, platform, theme, platformConfig, i, ln, j, ln2, exclude;
  delete data.platformConfig;
  if (!Ext.filterPlatform) 
  {
    Ext.filterPlatform = function(platform) {
  var profileMatch = false, ua = navigator.userAgent, j, jln;
  platform = [].concat(platform);
  function isPhone(ua) {
    var isMobile = /Mobile(\/|\s)/.test(ua);
    return /(iPhone|iPod)/.test(ua) || (!/(Silk)/.test(ua) && (/(Android)/.test(ua) && (/(Android 2)/.test(ua) || isMobile))) || (/(BlackBerry|BB)/.test(ua) && isMobile) || /(Windows Phone)/.test(ua);
  }
  function isTablet(ua) {
    return !isPhone(ua) && (/iPad/.test(ua) || /Android/.test(ua) || /(RIM Tablet OS)/.test(ua) || (/MSIE 10/.test(ua) && /; Touch/.test(ua)));
  }
  var paramsString = window.location.search.substr(1), paramsArray = paramsString.split("&"), params = {}, testPlatform, i;
  for (i = 0; i < paramsArray.length; i++) 
    {
      var tmpArray = paramsArray[i].split("=");
      params[tmpArray[0]] = tmpArray[1];
    }
  testPlatform = params.platform;
  if (testPlatform) 
  {
    return platform.indexOf(testPlatform) != -1;
  }
  for (j = 0 , jln = platform.length; j < jln; j++) 
    {
      switch (platform[j]) {
        case 'phone':
          profileMatch = isPhone(ua);
          break;
        case 'tablet':
          profileMatch = isTablet(ua);
          break;
        case 'desktop':
          profileMatch = !isPhone(ua) && !isTablet(ua);
          break;
        case 'ios':
          profileMatch = /(iPad|iPhone|iPod)/.test(ua);
          break;
        case 'android':
          profileMatch = /(Android|Silk)/.test(ua);
          break;
        case 'blackberry':
          profileMatch = /(BlackBerry|BB)/.test(ua);
          break;
        case 'safari':
          profileMatch = /Safari/.test(ua) && !(/(BlackBerry|BB)/.test(ua));
          break;
        case 'chrome':
          profileMatch = /Chrome/.test(ua);
          break;
        case 'ie10':
          profileMatch = /MSIE 10/.test(ua);
          break;
        case 'windows':
          profileMatch = /MSIE 10/.test(ua) || /Trident/.test(ua);
          break;
        case 'tizen':
          profileMatch = /Tizen/.test(ua);
          break;
        case 'firefox':
          profileMatch = /Firefox/.test(ua);
      }
      if (profileMatch) 
      {
        return true;
      }
    }
  return false;
};
  }
  for (i = 0 , ln = platformConfigs.length; i < ln; i++) 
    {
      platformConfig = platformConfigs[i];
      platform = platformConfig.platform;
      exclude = platformConfig.exclude || [];
      delete platformConfig.platform;
      theme = [].concat(platformConfig.theme);
      ln2 = theme.length;
      delete platformConfig.theme;
      if (platform && Ext.filterPlatform(platform) && !Ext.filterPlatform(exclude)) 
      {
        Ext.merge(config, platformConfig);
      }
      if (ln2) 
      {
        for (j = 0; j < ln2; j++) 
          {
            if (Ext.theme.name == theme[j]) 
            {
              Ext.merge(config, platformConfig);
            }
          }
      }
    }
});
  ExtClass.registerPreprocessor('config', function(Class, data) {
  var config = data.config, prototype = Class.prototype, defaultConfig = prototype.config, nameMap, name, setName, getName, initGetName, internalName, value;
  delete data.config;
  for (name in config) 
    {
      if (config.hasOwnProperty(name) && !(name in defaultConfig)) 
      {
        value = config[name];
        nameMap = this.getConfigNameMap(name);
        setName = nameMap.set;
        getName = nameMap.get;
        initGetName = nameMap.initGet;
        internalName = nameMap.internal;
        data[initGetName] = this.generateInitGetter(nameMap);
        if (value === null && !data.hasOwnProperty(internalName)) 
        {
          data[internalName] = null;
        }
        if (!data.hasOwnProperty(getName)) 
        {
          data[getName] = this.generateGetter(nameMap);
        }
        if (!data.hasOwnProperty(setName)) 
        {
          data[setName] = this.generateSetter(nameMap);
        }
      }
    }
  Class.addConfig(config, true);
});
  ExtClass.registerPreprocessor('mixins', function(Class, data, hooks) {
  var mixins = data.mixins, name, mixin, i, ln;
  delete data.mixins;
  Ext.Function.interceptBefore(hooks, 'onCreated', function() {
  if (mixins instanceof Array) 
  {
    for (i = 0 , ln = mixins.length; i < ln; i++) 
      {
        mixin = mixins[i];
        name = mixin.prototype.mixinId || mixin.$className;
        Class.mixin(name, mixin);
      }
  } else {
    for (name in mixins) 
      {
        if (mixins.hasOwnProperty(name)) 
        {
          Class.mixin(name, mixins[name]);
        }
      }
  }
});
});
  Ext.extend = function(Class, Parent, members) {
  if (arguments.length === 2 && Ext.isObject(Parent)) 
  {
    members = Parent;
    Parent = Class;
    Class = null;
  }
  var cls;
  if (!Parent) 
  {
    throw new Error("[Ext.extend] Attempting to extend from a class which has not been loaded on the page.");
  }
  members.extend = Parent;
  members.preprocessors = ['extend', 'statics', 'inheritableStatics', 'mixins', 'platformConfig', 'config'];
  if (Class) 
  {
    cls = new ExtClass(Class, members);
  } else {
    cls = new ExtClass(members);
  }
  cls.prototype.override = function(o) {
  for (var m in o) 
    {
      if (o.hasOwnProperty(m)) 
      {
        this[m] = o[m];
      }
    }
};
  return cls;
};
})();

(function(Class, alias, arraySlice, arrayFrom, global) {
  var Manager = Ext.ClassManager = {classes: {}, existCache: {}, namespaceRewrites: [{from: 'Ext.', to: Ext}], maps: {alternateToName: {}, aliasToName: {}, nameToAliases: {}, nameToAlternates: {}}, enableNamespaceParseCache: true, namespaceParseCache: {}, instantiators: [], isCreated: function(className) {
  var existCache = this.existCache, i, ln, part, root, parts;
  if (this.classes[className] || existCache[className]) 
  {
    return true;
  }
  root = global;
  parts = this.parseNamespace(className);
  for (i = 0 , ln = parts.length; i < ln; i++) 
    {
      part = parts[i];
      if (typeof part != 'string') 
      {
        root = part;
      } else {
        if (!root || !root[part]) 
        {
          return false;
        }
        root = root[part];
      }
    }
  existCache[className] = true;
  this.triggerCreated(className);
  return true;
}, createdListeners: [], nameCreatedListeners: {}, triggerCreated: function(className) {
  var listeners = this.createdListeners, nameListeners = this.nameCreatedListeners, alternateNames = this.maps.nameToAlternates[className], names = [className], i, ln, j, subLn, listener, name;
  for (i = 0 , ln = listeners.length; i < ln; i++) 
    {
      listener = listeners[i];
      listener.fn.call(listener.scope, className);
    }
  if (alternateNames) 
  {
    names.push.apply(names, alternateNames);
  }
  for (i = 0 , ln = names.length; i < ln; i++) 
    {
      name = names[i];
      listeners = nameListeners[name];
      if (listeners) 
      {
        for (j = 0 , subLn = listeners.length; j < subLn; j++) 
          {
            listener = listeners[j];
            listener.fn.call(listener.scope, name);
          }
        delete nameListeners[name];
      }
    }
}, onCreated: function(fn, scope, className) {
  var listeners = this.createdListeners, nameListeners = this.nameCreatedListeners, listener = {fn: fn, scope: scope};
  if (className) 
  {
    if (this.isCreated(className)) 
    {
      fn.call(scope, className);
      return;
    }
    if (!nameListeners[className]) 
    {
      nameListeners[className] = [];
    }
    nameListeners[className].push(listener);
  } else {
    listeners.push(listener);
  }
}, parseNamespace: function(namespace) {
  var cache = this.namespaceParseCache;
  if (this.enableNamespaceParseCache) 
  {
    if (cache.hasOwnProperty(namespace)) 
    {
      return cache[namespace];
    }
  }
  var parts = [], rewrites = this.namespaceRewrites, root = global, name = namespace, rewrite, from, to, i, ln;
  for (i = 0 , ln = rewrites.length; i < ln; i++) 
    {
      rewrite = rewrites[i];
      from = rewrite.from;
      to = rewrite.to;
      if (name === from || name.substring(0, from.length) === from) 
      {
        name = name.substring(from.length);
        if (typeof to != 'string') 
        {
          root = to;
        } else {
          parts = parts.concat(to.split('.'));
        }
        break;
      }
    }
  parts.push(root);
  parts = parts.concat(name.split('.'));
  if (this.enableNamespaceParseCache) 
  {
    cache[namespace] = parts;
  }
  return parts;
}, setNamespace: function(name, value) {
  var root = global, parts = this.parseNamespace(name), ln = parts.length - 1, leaf = parts[ln], i, part;
  for (i = 0; i < ln; i++) 
    {
      part = parts[i];
      if (typeof part != 'string') 
      {
        root = part;
      } else {
        if (!root[part]) 
        {
          root[part] = {};
        }
        root = root[part];
      }
    }
  root[leaf] = value;
  return root[leaf];
}, createNamespaces: function() {
  var root = global, parts, part, i, j, ln, subLn;
  for (i = 0 , ln = arguments.length; i < ln; i++) 
    {
      parts = this.parseNamespace(arguments[i]);
      for (j = 0 , subLn = parts.length; j < subLn; j++) 
        {
          part = parts[j];
          if (typeof part != 'string') 
          {
            root = part;
          } else {
            if (!root[part]) 
            {
              root[part] = {};
            }
            root = root[part];
          }
        }
    }
  return root;
}, set: function(name, value) {
  var me = this, maps = me.maps, nameToAlternates = maps.nameToAlternates, targetName = me.getName(value), alternates;
  me.classes[name] = me.setNamespace(name, value);
  if (targetName && targetName !== name) 
  {
    maps.alternateToName[name] = targetName;
    alternates = nameToAlternates[targetName] || (nameToAlternates[targetName] = []);
    alternates.push(name);
  }
  return this;
}, get: function(name) {
  var classes = this.classes;
  if (classes[name]) 
  {
    return classes[name];
  }
  var root = global, parts = this.parseNamespace(name), part, i, ln;
  for (i = 0 , ln = parts.length; i < ln; i++) 
    {
      part = parts[i];
      if (typeof part != 'string') 
      {
        root = part;
      } else {
        if (!root || !root[part]) 
        {
          return null;
        }
        root = root[part];
      }
    }
  return root;
}, setAlias: function(cls, alias) {
  var aliasToNameMap = this.maps.aliasToName, nameToAliasesMap = this.maps.nameToAliases, className;
  if (typeof cls == 'string') 
  {
    className = cls;
  } else {
    className = this.getName(cls);
  }
  if (alias && aliasToNameMap[alias] !== className) 
  {
    aliasToNameMap[alias] = className;
  }
  if (!nameToAliasesMap[className]) 
  {
    nameToAliasesMap[className] = [];
  }
  if (alias) 
  {
    Ext.Array.include(nameToAliasesMap[className], alias);
  }
  return this;
}, addNameAliasMappings: function(aliases) {
  var aliasToNameMap = this.maps.aliasToName, nameToAliasesMap = this.maps.nameToAliases, className, aliasList, alias, i;
  for (className in aliases) 
    {
      aliasList = nameToAliasesMap[className] || (nameToAliasesMap[className] = []);
      for (i = 0; i < aliases[className].length; i++) 
        {
          alias = aliases[className][i];
          if (!aliasToNameMap[alias]) 
          {
            aliasToNameMap[alias] = className;
            aliasList.push(alias);
          }
        }
    }
  return this;
}, addNameAlternateMappings: function(alternates) {
  var alternateToName = this.maps.alternateToName, nameToAlternates = this.maps.nameToAlternates, className, aliasList, alternate, i;
  for (className in alternates) 
    {
      aliasList = nameToAlternates[className] || (nameToAlternates[className] = []);
      for (i = 0; i < alternates[className].length; i++) 
        {
          alternate = alternates[className];
          if (!alternateToName[alternate]) 
          {
            alternateToName[alternate] = className;
            aliasList.push(alternate);
          }
        }
    }
  return this;
}, getByAlias: function(alias) {
  return this.get(this.getNameByAlias(alias));
}, getNameByAlias: function(alias) {
  return this.maps.aliasToName[alias] || '';
}, getNameByAlternate: function(alternate) {
  return this.maps.alternateToName[alternate] || '';
}, getAliasesByName: function(name) {
  return this.maps.nameToAliases[name] || [];
}, getName: function(object) {
  return object && object.$className || '';
}, getClass: function(object) {
  return object && object.self || null;
}, create: function(className, data, createdFn) {
  data.$className = className;
  return new Class(data, function() {
  var postprocessorStack = data.postprocessors || Manager.defaultPostprocessors, registeredPostprocessors = Manager.postprocessors, index = 0, postprocessors = [], postprocessor, process, i, ln, j, subLn, postprocessorProperties, postprocessorProperty;
  delete data.postprocessors;
  for (i = 0 , ln = postprocessorStack.length; i < ln; i++) 
    {
      postprocessor = postprocessorStack[i];
      if (typeof postprocessor == 'string') 
      {
        postprocessor = registeredPostprocessors[postprocessor];
        postprocessorProperties = postprocessor.properties;
        if (postprocessorProperties === true) 
        {
          postprocessors.push(postprocessor.fn);
        } else if (postprocessorProperties) 
        {
          for (j = 0 , subLn = postprocessorProperties.length; j < subLn; j++) 
            {
              postprocessorProperty = postprocessorProperties[j];
              if (data.hasOwnProperty(postprocessorProperty)) 
              {
                postprocessors.push(postprocessor.fn);
                break;
              }
            }
        }
      } else {
        postprocessors.push(postprocessor);
      }
    }
  process = function(clsName, cls, clsData) {
  postprocessor = postprocessors[index++];
  if (!postprocessor) 
  {
    Manager.set(className, cls);
    if (createdFn) 
    {
      createdFn.call(cls, cls);
    }
    Manager.triggerCreated(className);
    return;
  }
  if (postprocessor.call(this, clsName, cls, clsData, process) !== false) 
  {
    process.apply(this, arguments);
  }
};
  process.call(Manager, className, this, data);
});
}, createOverride: function(className, data, createdFn) {
  var overriddenClassName = data.override, requires = Ext.Array.from(data.requires);
  delete data.override;
  delete data.requires;
  this.existCache[className] = true;
  Ext.require(requires, function() {
  this.onCreated(function() {
  var overridenClass = this.get(overriddenClassName);
  if (overridenClass.singleton) 
  {
    overridenClass.self.override(data);
  } else {
    overridenClass.override(data);
  }
  if (createdFn) 
  {
    createdFn.call(overridenClass, overridenClass);
  }
  this.triggerCreated(className);
}, this, overriddenClassName);
}, this);
  return this;
}, instantiateByAlias: function() {
  var alias = arguments[0], args = arraySlice.call(arguments), className = this.getNameByAlias(alias);
  if (!className) 
  {
    className = this.maps.aliasToName[alias];
    Ext.syncRequire(className);
  }
  args[0] = className;
  return this.instantiate.apply(this, args);
}, instantiate: function() {
  var name = arguments[0], args = arraySlice.call(arguments, 1), alias = name, possibleName, cls;
  if (typeof name != 'function') 
  {
    cls = this.get(name);
  } else {
    cls = name;
  }
  if (!cls) 
  {
    possibleName = this.getNameByAlias(name);
    if (possibleName) 
    {
      name = possibleName;
      cls = this.get(name);
    }
  }
  if (!cls) 
  {
    possibleName = this.getNameByAlternate(name);
    if (possibleName) 
    {
      name = possibleName;
      cls = this.get(name);
    }
  }
  if (!cls) 
  {
    Ext.syncRequire(name);
    cls = this.get(name);
  }
  return this.getInstantiator(args.length)(cls, args);
}, dynInstantiate: function(name, args) {
  args = arrayFrom(args, true);
  args.unshift(name);
  return this.instantiate.apply(this, args);
}, getInstantiator: function(length) {
  var instantiators = this.instantiators, instantiator;
  instantiator = instantiators[length];
  if (!instantiator) 
  {
    var i = length, args = [];
    for (i = 0; i < length; i++) 
      {
        args.push('a[' + i + ']');
      }
    instantiator = instantiators[length] = new Function('c', 'a', 'return new c(' + args.join(',') + ')');
  }
  return instantiator;
}, postprocessors: {}, defaultPostprocessors: [], registerPostprocessor: function(name, fn, properties, position, relativeTo) {
  if (!position) 
  {
    position = 'last';
  }
  if (!properties) 
  {
    properties = [name];
  }
  this.postprocessors[name] = {name: name, properties: properties || false, fn: fn};
  this.setDefaultPostprocessorPosition(name, position, relativeTo);
  return this;
}, setDefaultPostprocessors: function(postprocessors) {
  this.defaultPostprocessors = arrayFrom(postprocessors);
  return this;
}, setDefaultPostprocessorPosition: function(name, offset, relativeName) {
  var defaultPostprocessors = this.defaultPostprocessors, index;
  if (typeof offset == 'string') 
  {
    if (offset === 'first') 
    {
      defaultPostprocessors.unshift(name);
      return this;
    } else if (offset === 'last') 
    {
      defaultPostprocessors.push(name);
      return this;
    }
    offset = (offset === 'after') ? 1 : -1;
  }
  index = Ext.Array.indexOf(defaultPostprocessors, relativeName);
  if (index !== -1) 
  {
    Ext.Array.splice(defaultPostprocessors, Math.max(0, index + offset), 0, name);
  }
  return this;
}, getNamesByExpression: function(expression) {
  var nameToAliasesMap = this.maps.nameToAliases, names = [], name, alias, aliases, possibleName, regex, i, ln;
  if (expression.indexOf('*') !== -1) 
  {
    expression = expression.replace(/\*/g, '(.*?)');
    regex = new RegExp('^' + expression + '$');
    for (name in nameToAliasesMap) 
      {
        if (nameToAliasesMap.hasOwnProperty(name)) 
        {
          aliases = nameToAliasesMap[name];
          if (name.search(regex) !== -1) 
          {
            names.push(name);
          } else {
            for (i = 0 , ln = aliases.length; i < ln; i++) 
              {
                alias = aliases[i];
                if (alias.search(regex) !== -1) 
                {
                  names.push(name);
                  break;
                }
              }
          }
        }
      }
  } else {
    possibleName = this.getNameByAlias(expression);
    if (possibleName) 
    {
      names.push(possibleName);
    } else {
      possibleName = this.getNameByAlternate(expression);
      if (possibleName) 
      {
        names.push(possibleName);
      } else {
        names.push(expression);
      }
    }
  }
  return names;
}};
  Manager.registerPostprocessor('alias', function(name, cls, data) {
  var aliases = data.alias, i, ln;
  for (i = 0 , ln = aliases.length; i < ln; i++) 
    {
      alias = aliases[i];
      this.setAlias(cls, alias);
    }
}, ['xtype', 'alias']);
  Manager.registerPostprocessor('singleton', function(name, cls, data, fn) {
  fn.call(this, name, new cls(), data);
  return false;
});
  Manager.registerPostprocessor('alternateClassName', function(name, cls, data) {
  var alternates = data.alternateClassName, i, ln, alternate;
  if (!(alternates instanceof Array)) 
  {
    alternates = [alternates];
  }
  for (i = 0 , ln = alternates.length; i < ln; i++) 
    {
      alternate = alternates[i];
      this.set(alternate, cls);
    }
});
  Ext.apply(Ext, {create: alias(Manager, 'instantiate'), widget: function(name) {
  var args = arraySlice.call(arguments);
  args[0] = 'widget.' + name;
  return Manager.instantiateByAlias.apply(Manager, args);
}, createByAlias: alias(Manager, 'instantiateByAlias'), define: function(className, data, createdFn) {
  if ('override' in data) 
  {
    return Manager.createOverride.apply(Manager, arguments);
  }
  return Manager.create.apply(Manager, arguments);
}, getClassName: alias(Manager, 'getName'), getDisplayName: function(object) {
  if (object) 
  {
    if (object.displayName) 
    {
      return object.displayName;
    }
    if (object.$name && object.$class) 
    {
      return Ext.getClassName(object.$class) + '#' + object.$name;
    }
    if (object.$className) 
    {
      return object.$className;
    }
  }
  return 'Anonymous';
}, getClass: alias(Manager, 'getClass'), namespace: alias(Manager, 'createNamespaces')});
  Ext.createWidget = Ext.widget;
  Ext.ns = Ext.namespace;
  Class.registerPreprocessor('className', function(cls, data) {
  if (data.$className) 
  {
    cls.$className = data.$className;
  }
}, true, 'first');
  Class.registerPreprocessor('alias', function(cls, data) {
  var prototype = cls.prototype, xtypes = arrayFrom(data.xtype), aliases = arrayFrom(data.alias), widgetPrefix = 'widget.', widgetPrefixLength = widgetPrefix.length, xtypesChain = Array.prototype.slice.call(prototype.xtypesChain || []), xtypesMap = Ext.merge({}, prototype.xtypesMap || {}), i, ln, alias, xtype;
  for (i = 0 , ln = aliases.length; i < ln; i++) 
    {
      alias = aliases[i];
      if (alias.substring(0, widgetPrefixLength) === widgetPrefix) 
      {
        xtype = alias.substring(widgetPrefixLength);
        Ext.Array.include(xtypes, xtype);
      }
    }
  cls.xtype = data.xtype = xtypes[0];
  data.xtypes = xtypes;
  for (i = 0 , ln = xtypes.length; i < ln; i++) 
    {
      xtype = xtypes[i];
      if (!xtypesMap[xtype]) 
      {
        xtypesMap[xtype] = true;
        xtypesChain.push(xtype);
      }
    }
  data.xtypesChain = xtypesChain;
  data.xtypesMap = xtypesMap;
  Ext.Function.interceptAfter(data, 'onClassCreated', function() {
  var mixins = prototype.mixins, key, mixin;
  for (key in mixins) 
    {
      if (mixins.hasOwnProperty(key)) 
      {
        mixin = mixins[key];
        xtypes = mixin.xtypes;
        if (xtypes) 
        {
          for (i = 0 , ln = xtypes.length; i < ln; i++) 
            {
              xtype = xtypes[i];
              if (!xtypesMap[xtype]) 
              {
                xtypesMap[xtype] = true;
                xtypesChain.push(xtype);
              }
            }
        }
      }
    }
});
  for (i = 0 , ln = xtypes.length; i < ln; i++) 
    {
      xtype = xtypes[i];
      Ext.Array.include(aliases, widgetPrefix + xtype);
    }
  data.alias = aliases;
}, ['xtype', 'alias']);
})(Ext.Class, Ext.Function.alias, Array.prototype.slice, Ext.Array.from, Ext.global);

(function(Manager, Class, flexSetter, alias, pass, arrayFrom, arrayErase, arrayInclude) {
  var dependencyProperties = ['extend', 'mixins', 'requires'], Loader, setPathCount = 0;
  ;
  Loader = Ext.Loader = {isInHistory: {}, history: [], config: {enabled: true, disableCaching: true, disableCachingParam: '_dc', paths: {'Ext': '.'}}, setConfig: function(name, value) {
  if (Ext.isObject(name) && arguments.length === 1) 
  {
    Ext.merge(this.config, name);
  } else {
    this.config[name] = (Ext.isObject(value)) ? Ext.merge(this.config[name], value) : value;
  }
  setPathCount += 1;
  return this;
}, getConfig: function(name) {
  if (name) 
  {
    return this.config[name];
  }
  return this.config;
}, setPath: flexSetter(function(name, path) {
  this.config.paths[name] = path;
  setPathCount += 1;
  return this;
}), addClassPathMappings: function(paths) {
  var name;
  if (setPathCount == 0) 
  {
    Loader.config.paths = paths;
  } else {
    for (name in paths) 
      {
        Loader.config.paths[name] = paths[name];
      }
  }
  setPathCount++;
  return Loader;
}, getPath: function(className) {
  var path = '', paths = this.config.paths, prefix = this.getPrefix(className);
  if (prefix.length > 0) 
  {
    if (prefix === className) 
    {
      return paths[prefix];
    }
    path = paths[prefix];
    className = className.substring(prefix.length + 1);
  }
  if (path.length > 0) 
  {
    path += '/';
  }
  return path.replace(/\/\.\//g, '/') + className.replace(/\./g, "/") + '.js';
}, getPrefix: function(className) {
  var paths = this.config.paths, prefix, deepestPrefix = '';
  if (paths.hasOwnProperty(className)) 
  {
    return className;
  }
  for (prefix in paths) 
    {
      if (paths.hasOwnProperty(prefix) && prefix + '.' === className.substring(0, prefix.length + 1)) 
      {
        if (prefix.length > deepestPrefix.length) 
        {
          deepestPrefix = prefix;
        }
      }
    }
  return deepestPrefix;
}, require: function(expressions, fn, scope, excludes) {
  if (fn) 
  {
    fn.call(scope);
  }
}, syncRequire: function() {
}, exclude: function(excludes) {
  var me = this;
  return {require: function(expressions, fn, scope) {
  return me.require(expressions, fn, scope, excludes);
}, syncRequire: function(expressions, fn, scope) {
  return me.syncRequire(expressions, fn, scope, excludes);
}};
}, onReady: function(fn, scope, withDomReady, options) {
  var oldFn;
  if (withDomReady !== false && Ext.onDocumentReady) 
  {
    oldFn = fn;
    fn = function() {
  Ext.onDocumentReady(oldFn, scope, options);
};
  }
  fn.call(scope);
}};
  Ext.apply(Loader, {documentHead: typeof document != 'undefined' && (document.head || document.getElementsByTagName('head')[0]), isLoading: false, queue: [], isClassFileLoaded: {}, isFileLoaded: {}, readyListeners: [], optionalRequires: [], requiresMap: {}, numPendingFiles: 0, numLoadedFiles: 0, hasFileLoadError: false, classNameToFilePathMap: {}, syncModeEnabled: false, scriptElements: {}, refreshQueue: function() {
  var queue = this.queue, ln = queue.length, i, item, j, requires, references;
  if (ln === 0) 
  {
    this.triggerReady();
    return;
  }
  for (i = 0; i < ln; i++) 
    {
      item = queue[i];
      if (item) 
      {
        requires = item.requires;
        references = item.references;
        if (requires.length > this.numLoadedFiles) 
        {
          continue;
        }
        j = 0;
        do {
          if (Manager.isCreated(requires[j])) 
          {
            arrayErase(requires, j, 1);
          } else {
            j++;
          }
        } while (j < requires.length);
        if (item.requires.length === 0) 
        {
          arrayErase(queue, i, 1);
          item.callback.call(item.scope);
          this.refreshQueue();
          break;
        }
      }
    }
  return this;
}, injectScriptElement: function(url, onLoad, onError, scope, charset) {
  var script = document.createElement('script'), me = this, onLoadFn = function() {
  me.cleanupScriptElement(script);
  onLoad.call(scope);
}, onErrorFn = function() {
  me.cleanupScriptElement(script);
  onError.call(scope);
};
  script.type = 'text/javascript';
  script.src = url;
  script.onload = onLoadFn;
  script.onerror = onErrorFn;
  script.onreadystatechange = function() {
  if (this.readyState === 'loaded' || this.readyState === 'complete') 
  {
    onLoadFn();
  }
};
  if (charset) 
  {
    script.charset = charset;
  }
  this.documentHead.appendChild(script);
  return script;
}, removeScriptElement: function(url) {
  var scriptElements = this.scriptElements;
  if (scriptElements[url]) 
  {
    this.cleanupScriptElement(scriptElements[url], true);
    delete scriptElements[url];
  }
  return this;
}, cleanupScriptElement: function(script, remove) {
  script.onload = null;
  script.onreadystatechange = null;
  script.onerror = null;
  if (remove) 
  {
    this.documentHead.removeChild(script);
  }
  return this;
}, loadScriptFile: function(url, onLoad, onError, scope, synchronous) {
  var me = this, isFileLoaded = this.isFileLoaded, scriptElements = this.scriptElements, noCacheUrl = url + (this.getConfig('disableCaching') ? ('?' + this.getConfig('disableCachingParam') + '=' + Ext.Date.now()) : ''), xhr, status, content, onScriptError;
  if (isFileLoaded[url]) 
  {
    return this;
  }
  scope = scope || this;
  this.isLoading = true;
  if (!synchronous) 
  {
    onScriptError = function() {
};
    if (!Ext.isReady && Ext.onDocumentReady) 
    {
      Ext.onDocumentReady(function() {
  if (!isFileLoaded[url]) 
  {
    scriptElements[url] = me.injectScriptElement(noCacheUrl, onLoad, onScriptError, scope);
  }
});
    } else {
      scriptElements[url] = this.injectScriptElement(noCacheUrl, onLoad, onScriptError, scope);
    }
  } else {
    if (typeof XMLHttpRequest != 'undefined') 
    {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    try {
      xhr.open('GET', noCacheUrl, false);
      xhr.send(null);
    }    catch (e) {
}
    status = (xhr.status == 1223) ? 204 : xhr.status;
    content = xhr.responseText;
    if ((status >= 200 && status < 300) || status == 304 || (status == 0 && content.length > 0)) 
    {
      Ext.globalEval(content + "\n//@ sourceURL=" + url);
      onLoad.call(scope);
    } else {
    }
    xhr = null;
  }
}, syncRequire: function() {
  var syncModeEnabled = this.syncModeEnabled;
  if (!syncModeEnabled) 
  {
    this.syncModeEnabled = true;
  }
  this.require.apply(this, arguments);
  if (!syncModeEnabled) 
  {
    this.syncModeEnabled = false;
  }
  this.refreshQueue();
}, require: function(expressions, fn, scope, excludes) {
  var excluded = {}, included = {}, queue = this.queue, classNameToFilePathMap = this.classNameToFilePathMap, isClassFileLoaded = this.isClassFileLoaded, excludedClassNames = [], possibleClassNames = [], classNames = [], references = [], callback, syncModeEnabled, filePath, expression, exclude, className, possibleClassName, i, j, ln, subLn;
  if (excludes) 
  {
    excludes = arrayFrom(excludes);
    for (i = 0 , ln = excludes.length; i < ln; i++) 
      {
        exclude = excludes[i];
        if (typeof exclude == 'string' && exclude.length > 0) 
        {
          excludedClassNames = Manager.getNamesByExpression(exclude);
          for (j = 0 , subLn = excludedClassNames.length; j < subLn; j++) 
            {
              excluded[excludedClassNames[j]] = true;
            }
        }
      }
  }
  expressions = arrayFrom(expressions);
  if (fn) 
  {
    if (fn.length > 0) 
    {
      callback = function() {
  var classes = [], i, ln, name;
  for (i = 0 , ln = references.length; i < ln; i++) 
    {
      name = references[i];
      classes.push(Manager.get(name));
    }
  return fn.apply(this, classes);
};
    } else {
      callback = fn;
    }
  } else {
    callback = Ext.emptyFn;
  }
  scope = scope || Ext.global;
  for (i = 0 , ln = expressions.length; i < ln; i++) 
    {
      expression = expressions[i];
      if (typeof expression == 'string' && expression.length > 0) 
      {
        possibleClassNames = Manager.getNamesByExpression(expression);
        subLn = possibleClassNames.length;
        for (j = 0; j < subLn; j++) 
          {
            possibleClassName = possibleClassNames[j];
            if (excluded[possibleClassName] !== true) 
            {
              references.push(possibleClassName);
              if (!Manager.isCreated(possibleClassName) && !included[possibleClassName]) 
              {
                included[possibleClassName] = true;
                classNames.push(possibleClassName);
              }
            }
          }
      }
    }
  if (classNames.length > 0) 
  {
    if (!this.config.enabled) 
    {
      throw new Error("Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. " + "Missing required class" + ((classNames.length > 1) ? "es" : "") + ": " + classNames.join(', '));
    }
  } else {
    callback.call(scope);
    return this;
  }
  syncModeEnabled = this.syncModeEnabled;
  if (!syncModeEnabled) 
  {
    queue.push({requires: classNames.slice(), callback: callback, scope: scope});
  }
  ln = classNames.length;
  for (i = 0; i < ln; i++) 
    {
      className = classNames[i];
      filePath = this.getPath(className);
      if (syncModeEnabled && isClassFileLoaded.hasOwnProperty(className)) 
      {
        this.numPendingFiles--;
        this.removeScriptElement(filePath);
        delete isClassFileLoaded[className];
      }
      if (!isClassFileLoaded.hasOwnProperty(className)) 
      {
        isClassFileLoaded[className] = false;
        classNameToFilePathMap[className] = filePath;
        this.numPendingFiles++;
        this.loadScriptFile(filePath, pass(this.onFileLoaded, [className, filePath], this), pass(this.onFileLoadError, [className, filePath]), this, syncModeEnabled);
      }
    }
  if (syncModeEnabled) 
  {
    callback.call(scope);
    if (ln === 1) 
    {
      return Manager.get(className);
    }
  }
  return this;
}, onFileLoaded: function(className, filePath) {
  this.numLoadedFiles++;
  this.isClassFileLoaded[className] = true;
  this.isFileLoaded[filePath] = true;
  this.numPendingFiles--;
  if (this.numPendingFiles === 0) 
  {
    this.refreshQueue();
  }
}, onFileLoadError: function(className, filePath, errorMessage, isSynchronous) {
  this.numPendingFiles--;
  this.hasFileLoadError = true;
}, addOptionalRequires: function(requires) {
  var optionalRequires = this.optionalRequires, i, ln, require;
  requires = arrayFrom(requires);
  for (i = 0 , ln = requires.length; i < ln; i++) 
    {
      require = requires[i];
      arrayInclude(optionalRequires, require);
    }
  return this;
}, triggerReady: function(force) {
  var readyListeners = this.readyListeners, optionalRequires = this.optionalRequires, listener;
  if (this.isLoading || force) 
  {
    this.isLoading = false;
    if (optionalRequires.length !== 0) 
    {
      optionalRequires = optionalRequires.slice();
      this.optionalRequires.length = 0;
      this.require(optionalRequires, pass(this.triggerReady, [true], this), this);
      return this;
    }
    while (readyListeners.length) 
      {
        listener = readyListeners.shift();
        listener.fn.call(listener.scope);
        if (this.isLoading) 
        {
          return this;
        }
      }
  }
  return this;
}, onReady: function(fn, scope, withDomReady, options) {
  var oldFn;
  if (withDomReady !== false && Ext.onDocumentReady) 
  {
    oldFn = fn;
    fn = function() {
  Ext.onDocumentReady(oldFn, scope, options);
};
  }
  if (!this.isLoading) 
  {
    fn.call(scope);
  } else {
    this.readyListeners.push({fn: fn, scope: scope});
  }
}, historyPush: function(className) {
  var isInHistory = this.isInHistory;
  if (className && this.isClassFileLoaded.hasOwnProperty(className) && !isInHistory[className]) 
  {
    isInHistory[className] = true;
    this.history.push(className);
  }
  return this;
}});
  Ext.require = alias(Loader, 'require');
  Ext.syncRequire = alias(Loader, 'syncRequire');
  Ext.exclude = alias(Loader, 'exclude');
  Ext.onReady = function(fn, scope, options) {
  Loader.onReady(fn, scope, true, options);
};
  Class.registerPreprocessor('loader', function(cls, data, hooks, continueFn) {
  var me = this, dependencies = [], className = Manager.getName(cls), i, j, ln, subLn, value, propertyName, propertyValue;
  for (i = 0 , ln = dependencyProperties.length; i < ln; i++) 
    {
      propertyName = dependencyProperties[i];
      if (data.hasOwnProperty(propertyName)) 
      {
        propertyValue = data[propertyName];
        if (typeof propertyValue == 'string') 
        {
          dependencies.push(propertyValue);
        } else if (propertyValue instanceof Array) 
        {
          for (j = 0 , subLn = propertyValue.length; j < subLn; j++) 
            {
              value = propertyValue[j];
              if (typeof value == 'string') 
              {
                dependencies.push(value);
              }
            }
        } else if (typeof propertyValue != 'function') 
        {
          for (j in propertyValue) 
            {
              if (propertyValue.hasOwnProperty(j)) 
              {
                value = propertyValue[j];
                if (typeof value == 'string') 
                {
                  dependencies.push(value);
                }
              }
            }
        }
      }
    }
  if (dependencies.length === 0) 
  {
    return;
  }
  Loader.require(dependencies, function() {
  for (i = 0 , ln = dependencyProperties.length; i < ln; i++) 
    {
      propertyName = dependencyProperties[i];
      if (data.hasOwnProperty(propertyName)) 
      {
        propertyValue = data[propertyName];
        if (typeof propertyValue == 'string') 
        {
          data[propertyName] = Manager.get(propertyValue);
        } else if (propertyValue instanceof Array) 
        {
          for (j = 0 , subLn = propertyValue.length; j < subLn; j++) 
            {
              value = propertyValue[j];
              if (typeof value == 'string') 
              {
                data[propertyName][j] = Manager.get(value);
              }
            }
        } else if (typeof propertyValue != 'function') 
        {
          for (var k in propertyValue) 
            {
              if (propertyValue.hasOwnProperty(k)) 
              {
                value = propertyValue[k];
                if (typeof value == 'string') 
                {
                  data[propertyName][k] = Manager.get(value);
                }
              }
            }
        }
      }
    }
  continueFn.call(me, cls, data, hooks);
});
  return false;
}, true, 'after', 'className');
  Manager.registerPostprocessor('uses', function(name, cls, data) {
  var uses = arrayFrom(data.uses), items = [], i, ln, item;
  for (i = 0 , ln = uses.length; i < ln; i++) 
    {
      item = uses[i];
      if (typeof item == 'string') 
      {
        items.push(item);
      }
    }
  Loader.addOptionalRequires(items);
});
  Manager.onCreated(function(className) {
  this.historyPush(className);
}, Loader);
})(Ext.ClassManager, Ext.Class, Ext.Function.flexSetter, Ext.Function.alias, Ext.Function.pass, Ext.Array.from, Ext.Array.erase, Ext.Array.include);
(function() {
  var scripts = document.getElementsByTagName('script'), currentScript = scripts[scripts.length - 1], src = currentScript.src, path = src.substring(0, src.lastIndexOf('/') + 1), Loader = Ext.Loader;
  Loader.setConfig({enabled: true, disableCaching: !/[?&](cache|breakpoint)/i.test(location.search), paths: {'Ext': path + 'src'}});
})();

//@tag dom,core
//@define Ext.EventManager
//@define Ext.core.EventManager
//@require Ext.Loader

/**
 * @class Ext.EventManager
 *
 * This object has been deprecated in Sencha Touch 2.0.0. Please refer to the method documentation for specific alternatives.
 *
 * @deprecated 2.0.0
 * @singleton
 * @private
 */


Ext.setVersion('touch', '2.4.0.487');
Ext.apply(Ext, {version: Ext.getVersion('touch'), idSeed: 0, repaint: function() {
  var mask = Ext.getBody().createChild({cls: Ext.baseCSSPrefix + 'mask ' + Ext.baseCSSPrefix + 'mask-transparent'});
  setTimeout(function() {
  mask.destroy();
}, 0);
}, id: function(el, prefix) {
  if (el && el.id) 
  {
    return el.id;
  }
  el = Ext.getDom(el) || {};
  if (el === document || el === document.documentElement) 
  {
    el.id = 'ext-app';
  } else if (el === document.body) 
  {
    el.id = 'ext-body';
  } else if (el === window) 
  {
    el.id = 'ext-window';
  }
  el.id = el.id || ((prefix || 'ext-') + (++Ext.idSeed));
  return el.id;
}, getBody: function() {
  if (!Ext.documentBodyElement) 
  {
    if (!document.body) 
    {
      throw new Error("[Ext.getBody] document.body does not exist at this point");
    }
    Ext.documentBodyElement = Ext.get(document.body);
  }
  return Ext.documentBodyElement;
}, getHead: function() {
  if (!Ext.documentHeadElement) 
  {
    Ext.documentHeadElement = Ext.get(document.head || document.getElementsByTagName('head')[0]);
  }
  return Ext.documentHeadElement;
}, getDoc: function() {
  if (!Ext.documentElement) 
  {
    Ext.documentElement = Ext.get(document);
  }
  return Ext.documentElement;
}, getCmp: function(id) {
  return Ext.ComponentMgr.get(id);
}, copyTo: function(dest, source, names, usePrototypeKeys) {
  if (typeof names == 'string') 
  {
    names = names.split(/[,;\s]/);
  }
  Ext.each(names, function(name) {
  if (usePrototypeKeys || source.hasOwnProperty(name)) 
  {
    dest[name] = source[name];
  }
}, this);
  return dest;
}, destroy: function() {
  var args = arguments, ln = args.length, i, item;
  for (i = 0; i < ln; i++) 
    {
      item = args[i];
      if (item) 
      {
        if (Ext.isArray(item)) 
        {
          this.destroy.apply(this, item);
        } else if (Ext.isFunction(item.destroy)) 
        {
          item.destroy();
        }
      }
    }
}, getDom: function(el) {
  if (!el || !document) 
  {
    return null;
  }
  return el.dom ? el.dom : (typeof el == 'string' ? document.getElementById(el) : el);
}, removeNode: function(node) {
  if (node && node.parentNode && node.tagName != 'BODY') 
  {
    Ext.get(node).clearListeners();
    node.parentNode.removeChild(node);
    delete Ext.cache[node.id];
  }
}, defaultSetupConfig: {eventPublishers: {dom: {xclass: 'Ext.event.publisher.Dom'}, touchGesture: {xclass: 'Ext.event.publisher.TouchGesture', recognizers: {drag: {xclass: 'Ext.event.recognizer.Drag'}, tap: {xclass: 'Ext.event.recognizer.Tap'}, doubleTap: {xclass: 'Ext.event.recognizer.DoubleTap'}, longPress: {xclass: 'Ext.event.recognizer.LongPress'}, swipe: {xclass: 'Ext.event.recognizer.Swipe'}, pinch: {xclass: 'Ext.event.recognizer.Pinch'}, rotate: {xclass: 'Ext.event.recognizer.Rotate'}, edgeSwipe: {xclass: 'Ext.event.recognizer.EdgeSwipe'}}}, componentDelegation: {xclass: 'Ext.event.publisher.ComponentDelegation'}, componentPaint: {xclass: 'Ext.event.publisher.ComponentPaint'}, elementPaint: {xclass: 'Ext.event.publisher.ElementPaint'}, elementSize: {xclass: 'Ext.event.publisher.ElementSize'}}, animator: {xclass: 'Ext.fx.Runner'}, viewport: {xclass: 'Ext.viewport.Viewport'}}, isSetup: false, frameStartTime: +new Date(), setupListeners: [], onSetup: function(fn, scope) {
  if (Ext.isSetup) 
  {
    fn.call(scope);
  } else {
    Ext.setupListeners.push({fn: fn, scope: scope});
  }
}, setup: function(config) {
  var defaultSetupConfig = Ext.defaultSetupConfig, emptyFn = Ext.emptyFn, onReady = config.onReady || emptyFn, onUpdated = config.onUpdated || emptyFn, scope = config.scope, requires = Ext.Array.from(config.requires), extOnReady = Ext.onReady, head = Ext.getHead(), callback, viewport, precomposed;
  Ext.setup = function() {
  throw new Error("Ext.setup has already been called before");
};
  delete config.requires;
  delete config.onReady;
  delete config.onUpdated;
  delete config.scope;
  Ext.require(['Ext.event.Dispatcher']);
  callback = function() {
  var listeners = Ext.setupListeners, ln = listeners.length, i, listener;
  delete Ext.setupListeners;
  Ext.isSetup = true;
  for (i = 0; i < ln; i++) 
    {
      listener = listeners[i];
      listener.fn.call(listener.scope);
    }
  Ext.onReady = extOnReady;
  Ext.onReady(onReady, scope);
};
  Ext.onUpdated = onUpdated;
  Ext.onReady = function(fn, scope) {
  var origin = onReady;
  onReady = function() {
  origin();
  Ext.onReady(fn, scope);
};
};
  config = Ext.merge({}, defaultSetupConfig, config);
  Ext.onDocumentReady(function() {
  Ext.factoryConfig(config, function(data) {
  Ext.event.Dispatcher.getInstance().setPublishers(data.eventPublishers);
  if (data.logger) 
  {
    Ext.Logger = data.logger;
  }
  if (data.animator) 
  {
    Ext.Animator = data.animator;
  }
  if (data.viewport) 
  {
    Ext.Viewport = viewport = data.viewport;
    if (!scope) 
    {
      scope = viewport;
    }
    Ext.require(requires, function() {
  Ext.Viewport.on('ready', callback, null, {single: true});
});
  } else {
    Ext.require(requires, callback);
  }
});
  if (!Ext.microloaded && navigator.userAgent.match(/IEMobile\/10\.0/)) 
  {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(document.createTextNode("@media screen and (orientation: portrait) {" + "@-ms-viewport {width: 320px !important;}" + "}" + "@media screen and (orientation: landscape) {" + "@-ms-viewport {width: 560px !important;}" + "}"));
    head.appendChild(msViewportStyle);
  }
});
  function addMeta(name, content) {
    var meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    head.append(meta);
  }
  function addIcon(href, sizes, precomposed) {
    var link = document.createElement('link');
    link.setAttribute('rel', 'apple-touch-icon' + (precomposed ? '-precomposed' : ''));
    link.setAttribute('href', href);
    if (sizes) 
    {
      link.setAttribute('sizes', sizes);
    }
    head.append(link);
  }
  function addStartupImage(href, media) {
    var link = document.createElement('link');
    link.setAttribute('rel', 'apple-touch-startup-image');
    link.setAttribute('href', href);
    if (media) 
    {
      link.setAttribute('media', media);
    }
    head.append(link);
  }
  var icon = config.icon, isIconPrecomposed = Boolean(config.isIconPrecomposed), startupImage = config.startupImage || {}, statusBarStyle = config.statusBarStyle || 'black', devicePixelRatio = window.devicePixelRatio || 1;
  if (navigator.standalone) 
  {
    addMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0');
  } else {
    addMeta('viewport', 'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, minimum-ui');
  }
  addMeta('apple-mobile-web-app-capable', 'yes');
  addMeta('apple-touch-fullscreen', 'yes');
  if (Ext.browser.is.ie) 
  {
    addMeta('msapplication-tap-highlight', 'no');
  }
  if (statusBarStyle) 
  {
    addMeta('apple-mobile-web-app-status-bar-style', statusBarStyle);
  }
  if (Ext.isString(icon)) 
  {
    icon = {57: icon, 72: icon, 114: icon, 144: icon};
  } else if (!icon) 
  {
    icon = {};
  }
  if (Ext.os.is.iPad) 
  {
    if (devicePixelRatio >= 2) 
    {
      if ('1496x2048' in startupImage) 
      {
        addStartupImage(startupImage['1496x2048'], '(orientation: landscape)');
      }
      if ('1536x2008' in startupImage) 
      {
        addStartupImage(startupImage['1536x2008'], '(orientation: portrait)');
      }
      if ('144' in icon) 
      {
        addIcon(icon['144'], '144x144', isIconPrecomposed);
      }
    } else {
      if ('748x1024' in startupImage) 
      {
        addStartupImage(startupImage['748x1024'], '(orientation: landscape)');
      }
      if ('768x1004' in startupImage) 
      {
        addStartupImage(startupImage['768x1004'], '(orientation: portrait)');
      }
      if ('72' in icon) 
      {
        addIcon(icon['72'], '72x72', isIconPrecomposed);
      }
    }
  } else {
    if (devicePixelRatio >= 2 && Ext.os.version.gtEq('4.3')) 
    {
      if (Ext.os.is.iPhone5) 
      {
        addStartupImage(startupImage['640x1096']);
      } else {
        addStartupImage(startupImage['640x920']);
      }
      if ('114' in icon) 
      {
        addIcon(icon['114'], '114x114', isIconPrecomposed);
      }
    } else {
      addStartupImage(startupImage['320x460']);
      if ('57' in icon) 
      {
        addIcon(icon['57'], null, isIconPrecomposed);
      }
    }
  }
}, application: function(config) {
  var appName = config.name, onReady, scope, requires;
  if (!config) 
  {
    config = {};
  }
  if (!Ext.Loader.config.paths[appName]) 
  {
    Ext.Loader.setPath(appName, config.appFolder || 'app');
  }
  requires = Ext.Array.from(config.requires);
  config.requires = ['Ext.app.Application'];
  onReady = config.onReady;
  scope = config.scope;
  config.onReady = function() {
  config.requires = requires;
  new Ext.app.Application(config);
  if (onReady) 
  {
    onReady.call(scope);
  }
};
  Ext.setup(config);
}, factoryConfig: function(config, callback) {
  var isSimpleObject = Ext.isSimpleObject(config);
  if (isSimpleObject && config.xclass) 
  {
    var className = config.xclass;
    delete config.xclass;
    Ext.require(className, function() {
  Ext.factoryConfig(config, function(cfg) {
  callback(Ext.create(className, cfg));
});
});
    return;
  }
  var isArray = Ext.isArray(config), keys = [], key, value, i, ln;
  if (isSimpleObject || isArray) 
  {
    if (isSimpleObject) 
    {
      for (key in config) 
        {
          if (config.hasOwnProperty(key)) 
          {
            value = config[key];
            if (Ext.isSimpleObject(value) || Ext.isArray(value)) 
            {
              keys.push(key);
            }
          }
        }
    } else {
      for (i = 0 , ln = config.length; i < ln; i++) 
        {
          value = config[i];
          if (Ext.isSimpleObject(value) || Ext.isArray(value)) 
          {
            keys.push(i);
          }
        }
    }
    i = 0;
    ln = keys.length;
    if (ln === 0) 
    {
      callback(config);
      return;
    }
    function fn(value) {
      config[key] = value;
      i++;
      factory();
    }    function factory() {
      if (i >= ln) 
      {
        callback(config);
        return;
      }
      key = keys[i];
      value = config[key];
      Ext.factoryConfig(value, fn);
    }    factory();
    return;
  }
  callback(config);
}, factory: function(config, classReference, instance, aliasNamespace) {
  var manager = Ext.ClassManager, newInstance;
  if (!config || config.isInstance) 
  {
    if (instance && instance !== config) 
    {
      instance.destroy();
    }
    return config;
  }
  if (aliasNamespace) 
  {
    if (typeof config == 'string') 
    {
      return manager.instantiateByAlias(aliasNamespace + '.' + config);
    } else if (Ext.isObject(config) && 'type' in config) 
    {
      return manager.instantiateByAlias(aliasNamespace + '.' + config.type, config);
    }
  }
  if (config === true) 
  {
    return instance || manager.instantiate(classReference);
  }
  if ('xtype' in config) 
  {
    newInstance = manager.instantiateByAlias('widget.' + config.xtype, config);
  } else if ('xclass' in config) 
  {
    newInstance = manager.instantiate(config.xclass, config);
  }
  if (newInstance) 
  {
    if (instance) 
    {
      instance.destroy();
    }
    return newInstance;
  }
  if (instance) 
  {
    return instance.setConfig(config);
  }
  return manager.instantiate(classReference, config);
}, deprecateClassMember: function(cls, oldName, newName, message) {
  return this.deprecateProperty(cls.prototype, oldName, newName, message);
}, deprecateClassMembers: function(cls, members) {
  var prototype = cls.prototype, oldName, newName;
  for (oldName in members) 
    {
      if (members.hasOwnProperty(oldName)) 
      {
        newName = members[oldName];
        this.deprecateProperty(prototype, oldName, newName);
      }
    }
}, deprecateProperty: function(object, oldName, newName, message) {
  if (!message) 
  {
    message = "'" + oldName + "' is deprecated";
  }
  if (newName) 
  {
    message += ", please use '" + newName + "' instead";
  }
  if (newName) 
  {
    Ext.Object.defineProperty(object, oldName, {get: function() {
  return this[newName];
}, set: function(value) {
  this[newName] = value;
}, configurable: true});
  }
}, deprecatePropertyValue: function(object, name, value, message) {
  Ext.Object.defineProperty(object, name, {get: function() {
  return value;
}, configurable: true});
}, deprecateMethod: function(object, name, method, message) {
  object[name] = function() {
  if (method) 
  {
    return method.apply(this, arguments);
  }
};
}, deprecateClassMethod: function(cls, name, method, message) {
  if (typeof name != 'string') 
  {
    var from, to;
    for (from in name) 
      {
        if (name.hasOwnProperty(from)) 
        {
          to = name[from];
          Ext.deprecateClassMethod(cls, from, to);
        }
      }
    return;
  }
  var isLateBinding = typeof method == 'string', member;
  if (!message) 
  {
    message = "'" + name + "()' is deprecated, please use '" + (isLateBinding ? method : method.name) + "()' instead";
  }
  if (isLateBinding) 
  {
    member = function() {
  return this[method].apply(this, arguments);
};
  } else {
    member = function() {
  return method.apply(this, arguments);
};
  }
  if (name in cls.prototype) 
  {
    Ext.Object.defineProperty(cls.prototype, name, {value: null, writable: true, configurable: true});
  }
  cls.addMember(name, member);
}, isReady: false, readyListeners: [], triggerReady: function() {
  var listeners = Ext.readyListeners, i, ln, listener;
  if (!Ext.isReady) 
  {
    Ext.isReady = true;
    for (i = 0 , ln = listeners.length; i < ln; i++) 
      {
        listener = listeners[i];
        listener.fn.call(listener.scope);
      }
    delete Ext.readyListeners;
  }
}, onDocumentReady: function(fn, scope) {
  if (Ext.isReady) 
  {
    fn.call(scope);
  } else {
    var triggerFn = Ext.triggerReady;
    Ext.readyListeners.push({fn: fn, scope: scope});
    if ((Ext.browser.is.WebWorks || Ext.browser.is.PhoneGap) && !Ext.os.is.Desktop) 
    {
      if (!Ext.readyListenerAttached) 
      {
        Ext.readyListenerAttached = true;
        document.addEventListener(Ext.browser.is.PhoneGap ? 'deviceready' : 'webworksready', triggerFn, false);
      }
    } else {
      var readyStateRe = (/MSIE 10/.test(navigator.userAgent)) ? /complete|loaded/ : /interactive|complete|loaded/;
      if (document.readyState.match(readyStateRe) !== null) 
      {
        triggerFn();
      } else if (!Ext.readyListenerAttached) 
      {
        Ext.readyListenerAttached = true;
        window.addEventListener('DOMContentLoaded', function() {
  if (navigator.standalone) 
  {
    setTimeout(function() {
  setTimeout(function() {
  triggerFn();
}, 1);
}, 1);
  } else {
    setTimeout(function() {
  triggerFn();
}, 1);
  }
}, false);
      }
    }
  }
}, callback: function(callback, scope, args, delay) {
  if (Ext.isFunction(callback)) 
  {
    args = args || [];
    scope = scope || window;
    if (delay) 
    {
      Ext.defer(callback, delay, scope, args);
    } else {
      callback.apply(scope, args);
    }
  }
}});

Ext.define('Ext.env.Browser', {statics: {browserNames: {ie: 'IE', firefox: 'Firefox', safari: 'Safari', chrome: 'Chrome', opera: 'Opera', dolfin: 'Dolfin', webosbrowser: 'webOSBrowser', chromeMobile: 'ChromeMobile', chromeiOS: 'ChromeiOS', silk: 'Silk', other: 'Other'}, engineNames: {webkit: 'WebKit', gecko: 'Gecko', presto: 'Presto', trident: 'Trident', other: 'Other'}, enginePrefixes: {webkit: 'AppleWebKit/', gecko: 'Gecko/', presto: 'Presto/', trident: 'Trident/'}, browserPrefixes: {ie: 'MSIE ', firefox: 'Firefox/', chrome: 'Chrome/', safari: 'Version/', opera: 'OPR/', dolfin: 'Dolfin/', webosbrowser: 'wOSBrowser/', chromeMobile: 'CrMo/', chromeiOS: 'CriOS/', silk: 'Silk/'}}, styleDashPrefixes: {WebKit: '-webkit-', Gecko: '-moz-', Trident: '-ms-', Presto: '-o-', Other: ''}, stylePrefixes: {WebKit: 'Webkit', Gecko: 'Moz', Trident: 'ms', Presto: 'O', Other: ''}, propertyPrefixes: {WebKit: 'webkit', Gecko: 'moz', Trident: 'ms', Presto: 'o', Other: ''}, is: Ext.emptyFn, name: null, version: null, engineName: null, engineVersion: null, setFlag: function(name, value) {
  if (typeof value == 'undefined') 
  {
    value = true;
  }
  this.is[name] = value;
  this.is[name.toLowerCase()] = value;
  return this;
}, constructor: function(userAgent) {
  this.userAgent = userAgent;
  var statics = this.statics(), browserMatch = userAgent.match(new RegExp('((?:' + Ext.Object.getValues(statics.browserPrefixes).join(')|(?:') + '))([\\w\\._]+)')), engineMatch = userAgent.match(new RegExp('((?:' + Ext.Object.getValues(statics.enginePrefixes).join(')|(?:') + '))([\\w\\._]+)')), browserNames = statics.browserNames, browserName = browserNames.other, engineNames = statics.engineNames, engineName = engineNames.other, browserVersion = '', engineVersion = '', isWebView = false, is, i, name;
  is = this.is = function(name) {
  return is[name] === true;
};
  if (browserMatch) 
  {
    browserName = browserNames[Ext.Object.getKey(statics.browserPrefixes, browserMatch[1])];
    browserVersion = new Ext.Version(browserMatch[2]);
  }
  if (engineMatch) 
  {
    engineName = engineNames[Ext.Object.getKey(statics.enginePrefixes, engineMatch[1])];
    engineVersion = new Ext.Version(engineMatch[2]);
  }
  if (engineName == 'Trident' && browserName != 'IE') 
  {
    browserName = 'IE';
    var version = userAgent.match(/.*rv:(\d+.\d+)/);
    if (version && version.length) 
    {
      version = version[1];
      browserVersion = new Ext.Version(version);
    }
  }
  if (userAgent.match(/FB/) && browserName == "Other") 
  {
    browserName = browserNames.safari;
    engineName = engineNames.webkit;
  }
  if (userAgent.match(/Android.*Chrome/g)) 
  {
    browserName = 'ChromeMobile';
  }
  if (userAgent.match(/OPR/)) 
  {
    browserName = 'Opera';
    browserMatch = userAgent.match(/OPR\/(\d+.\d+)/);
    browserVersion = new Ext.Version(browserMatch[1]);
  }
  if (browserName === 'Safari' && userAgent.match(/BB10/)) 
  {
    browserName = 'BlackBerry';
  }
  Ext.apply(this, {engineName: engineName, engineVersion: engineVersion, name: browserName, version: browserVersion});
  this.setFlag(browserName);
  if (browserVersion) 
  {
    this.setFlag(browserName + (browserVersion.getMajor() || ''));
    this.setFlag(browserName + browserVersion.getShortVersion());
  }
  for (i in browserNames) 
    {
      if (browserNames.hasOwnProperty(i)) 
      {
        name = browserNames[i];
        this.setFlag(name, browserName === name);
      }
    }
  this.setFlag(name);
  if (engineVersion) 
  {
    this.setFlag(engineName + (engineVersion.getMajor() || ''));
    this.setFlag(engineName + engineVersion.getShortVersion());
  }
  for (i in engineNames) 
    {
      if (engineNames.hasOwnProperty(i)) 
      {
        name = engineNames[i];
        this.setFlag(name, engineName === name);
      }
    }
  this.setFlag('Standalone', !!navigator.standalone);
  this.setFlag('Ripple', !!document.getElementById("tinyhippos-injected") && !Ext.isEmpty(window.top.ripple));
  this.setFlag('WebWorks', !!window.blackberry);
  if (typeof window.PhoneGap != 'undefined' || typeof window.Cordova != 'undefined' || typeof window.cordova != 'undefined') 
  {
    isWebView = true;
    this.setFlag('PhoneGap');
    this.setFlag('Cordova');
  } else if (!!window.isNK) 
  {
    isWebView = true;
    this.setFlag('Sencha');
  }
  if (/(Glass)/i.test(userAgent)) 
  {
    this.setFlag('GoogleGlass');
  }
  if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)(?!.*FBAN)/i.test(userAgent)) 
  {
    isWebView = true;
  }
  this.setFlag('WebView', isWebView);
  this.isStrict = document.compatMode == "CSS1Compat";
  this.isSecure = /^https/i.test(window.location.protocol);
  return this;
}, getStyleDashPrefix: function() {
  return this.styleDashPrefixes[this.engineName];
}, getStylePrefix: function() {
  return this.stylePrefixes[this.engineName];
}, getVendorProperyName: function(name) {
  var prefix = this.propertyPrefixes[this.engineName];
  if (prefix.length > 0) 
  {
    return prefix + Ext.String.capitalize(name);
  }
  return name;
}, getPreferredTranslationMethod: function(config) {
  if (typeof config == 'object' && 'translationMethod' in config && config.translationMethod !== 'auto') 
  {
    return config.translationMethod;
  } else {
    if (this.is.AndroidStock2 || this.is.IE) 
    {
      return 'scrollposition';
    } else {
      return 'csstransform';
    }
  }
}}, function() {
  var browserEnv = Ext.browser = new this(Ext.global.navigator.userAgent);
});

Ext.define('Ext.env.OS', {statics: {names: {ios: 'iOS', android: 'Android', windowsPhone: 'WindowsPhone', webos: 'webOS', blackberry: 'BlackBerry', rimTablet: 'RIMTablet', mac: 'MacOS', win: 'Windows', tizen: 'Tizen', linux: 'Linux', bada: 'Bada', chrome: 'ChromeOS', other: 'Other'}, prefixes: {tizen: '(Tizen )', ios: 'i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ', android: '(Android |HTC_|Silk/)', windowsPhone: 'Windows Phone ', blackberry: '(?:BlackBerry|BB)(?:.*)Version/', rimTablet: 'RIM Tablet OS ', webos: '(?:webOS|hpwOS)/', bada: 'Bada/', chrome: 'CrOS '}}, is: Ext.emptyFn, name: null, version: null, setFlag: function(name, value) {
  if (typeof value == 'undefined') 
  {
    value = true;
  }
  this.is[name] = value;
  this.is[name.toLowerCase()] = value;
  return this;
}, constructor: function(userAgent, platform, browserScope) {
  var statics = this.statics(), names = statics.names, prefixes = statics.prefixes, name, version = '', i, prefix, match, item, is, match1;
  browserScope = browserScope || Ext.browser;
  is = this.is = function(name) {
  return this.is[name] === true;
};
  for (i in prefixes) 
    {
      if (prefixes.hasOwnProperty(i)) 
      {
        prefix = prefixes[i];
        match = userAgent.match(new RegExp('(?:' + prefix + ')([^\\s;]+)'));
        if (match) 
        {
          name = names[i];
          match1 = match[1];
          if (match1 && match1 == "HTC_") 
          {
            version = new Ext.Version("2.3");
          } else if (match1 && match1 == "Silk/") 
          {
            version = new Ext.Version("2.3");
          } else {
            version = new Ext.Version(match[match.length - 1]);
          }
          break;
        }
      }
    }
  if (!name) 
  {
    name = names[(userAgent.toLowerCase().match(/mac|win|linux/) || ['other'])[0]];
    version = new Ext.Version('');
  }
  this.name = name;
  this.version = version;
  if (platform) 
  {
    this.setFlag(platform.replace(/ simulator$/i, ''));
  }
  this.setFlag(name);
  if (version) 
  {
    this.setFlag(name + (version.getMajor() || ''));
    this.setFlag(name + version.getShortVersion());
  }
  for (i in names) 
    {
      if (names.hasOwnProperty(i)) 
      {
        item = names[i];
        if (!is.hasOwnProperty(name)) 
        {
          this.setFlag(item, (name === item));
        }
      }
    }
  if (this.name == "iOS" && window.screen.height == 568) 
  {
    this.setFlag('iPhone5');
  }
  if (browserScope.is.Safari || browserScope.is.Silk) 
  {
    if (this.is.Android2 || this.is.Android3 || browserScope.version.shortVersion == 501) 
    {
      browserScope.setFlag("AndroidStock");
      browserScope.setFlag("AndroidStock2");
    }
    if (this.is.Android4) 
    {
      browserScope.setFlag("AndroidStock");
      browserScope.setFlag("AndroidStock4");
    }
  }
  return this;
}}, function() {
  var navigation = Ext.global.navigator, userAgent = navigation.userAgent, osEnv, osName, deviceType;
  Ext.os = osEnv = new this(userAgent, navigation.platform);
  osName = osEnv.name;
  var search = window.location.search.match(/deviceType=(Tablet|Phone)/), nativeDeviceType = window.deviceType;
  if (search && search[1]) 
  {
    deviceType = search[1];
  } else if (nativeDeviceType === 'iPhone') 
  {
    deviceType = 'Phone';
  } else if (nativeDeviceType === 'iPad') 
  {
    deviceType = 'Tablet';
  } else {
    if (!osEnv.is.Android && !osEnv.is.iOS && !osEnv.is.WindowsPhone && /Windows|Linux|MacOS/.test(osName)) 
    {
      deviceType = 'Desktop';
      Ext.browser.is.WebView = Ext.browser.is.Ripple ? true : false;
    } else if (osEnv.is.iPad || osEnv.is.RIMTablet || osEnv.is.Android3 || Ext.browser.is.Silk || (osEnv.is.Android4 && userAgent.search(/mobile/i) == -1)) 
    {
      deviceType = 'Tablet';
    } else {
      deviceType = 'Phone';
    }
  }
  osEnv.setFlag(deviceType, true);
  osEnv.deviceType = deviceType;
});

Ext.define('Ext.env.Feature', {constructor: function() {
  this.testElements = {};
  this.has = function(name) {
  return !!this.has[name];
};
  if (!Ext.theme) 
  {
    Ext.theme = {name: 'Default'};
  }
  Ext.theme.is = {};
  Ext.theme.is[Ext.theme.name] = true;
  Ext.onDocumentReady(function() {
  this.registerTest({ProperHBoxStretching: function() {
  var bodyElement = document.createElement('div'), innerElement = bodyElement.appendChild(document.createElement('div')), contentElement = innerElement.appendChild(document.createElement('div')), innerWidth;
  bodyElement.setAttribute('style', 'width: 100px; height: 100px; position: relative;');
  innerElement.setAttribute('style', 'position: absolute; display: -ms-flexbox; display: -webkit-flex; display: -moz-flexbox; display: flex; -ms-flex-direction: row; -webkit-flex-direction: row; -moz-flex-direction: row; flex-direction: row; min-width: 100%;');
  contentElement.setAttribute('style', 'width: 200px; height: 50px;');
  document.body.appendChild(bodyElement);
  innerWidth = innerElement.offsetWidth;
  document.body.removeChild(bodyElement);
  return (innerWidth > 100);
}});
}, this);
}, getTestElement: function(tag, createNew) {
  if (tag === undefined) 
  {
    tag = 'div';
  } else if (typeof tag !== 'string') 
  {
    return tag;
  }
  if (createNew) 
  {
    return document.createElement(tag);
  }
  if (!this.testElements[tag]) 
  {
    this.testElements[tag] = document.createElement(tag);
  }
  return this.testElements[tag];
}, isStyleSupported: function(name, tag) {
  var elementStyle = this.getTestElement(tag).style, cName = Ext.String.capitalize(name);
  if (typeof elementStyle[name] !== 'undefined' || typeof elementStyle[Ext.browser.getStylePrefix(name) + cName] !== 'undefined') 
  {
    return true;
  }
  return false;
}, isStyleSupportedWithoutPrefix: function(name, tag) {
  var elementStyle = this.getTestElement(tag).style;
  if (typeof elementStyle[name] !== 'undefined') 
  {
    return true;
  }
  return false;
}, isEventSupported: function(name, tag) {
  if (tag === undefined) 
  {
    tag = window;
  }
  var element = this.getTestElement(tag), eventName = 'on' + name.toLowerCase(), isSupported = (eventName in element);
  if (!isSupported) 
  {
    if (element.setAttribute && element.removeAttribute) 
    {
      element.setAttribute(eventName, '');
      isSupported = typeof element[eventName] === 'function';
      if (typeof element[eventName] !== 'undefined') 
      {
        element[eventName] = undefined;
      }
      element.removeAttribute(eventName);
    }
  }
  return isSupported;
}, getSupportedPropertyName: function(object, name) {
  var vendorName = Ext.browser.getVendorProperyName(name);
  if (vendorName in object) 
  {
    return vendorName;
  } else if (name in object) 
  {
    return name;
  }
  return null;
}, registerTest: Ext.Function.flexSetter(function(name, fn) {
  this.has[name] = fn.call(this);
  return this;
})}, function() {
  Ext.feature = new this();
  var has = Ext.feature.has;
  Ext.feature.registerTest({Canvas: function() {
  var element = this.getTestElement('canvas');
  return !!(element && element.getContext && element.getContext('2d'));
}, Svg: function() {
  var doc = document;
  return !!(doc.createElementNS && !!doc.createElementNS("http:/" + "/www.w3.org/2000/svg", "svg").createSVGRect);
}, Vml: function() {
  var element = this.getTestElement(), ret = false;
  element.innerHTML = "<!--[if vml]><br><![endif]-->";
  ret = (element.childNodes.length === 1);
  element.innerHTML = "";
  return ret;
}, Touch: function() {
  return Ext.browser.is.Ripple || (this.isEventSupported('touchstart') && !(Ext.os && Ext.os.name.match(/Windows|MacOS|Linux/) && !Ext.os.is.BlackBerry6));
}, Pointer: function() {
  return !!window.navigator.msPointerEnabled;
}, Orientation: function() {
  return ('orientation' in window) && this.isEventSupported('orientationchange');
}, OrientationChange: function() {
  return this.isEventSupported('orientationchange');
}, DeviceMotion: function() {
  return this.isEventSupported('devicemotion');
}, Geolocation: function() {
  return 'geolocation' in window.navigator;
}, SqlDatabase: function() {
  return 'openDatabase' in window;
}, WebSockets: function() {
  return 'WebSocket' in window;
}, Range: function() {
  return !!document.createRange;
}, CreateContextualFragment: function() {
  var range = !!document.createRange ? document.createRange() : false;
  return range && !!range.createContextualFragment;
}, History: function() {
  return ('history' in window && 'pushState' in window.history);
}, CssTransforms: function() {
  return this.isStyleSupported('transform');
}, CssTransformNoPrefix: function() {
  if (!Ext.browser.is.AndroidStock) 
  {
    return this.isStyleSupportedWithoutPrefix('transform');
  } else {
    return this.isStyleSupportedWithoutPrefix('transform') && !this.isStyleSupportedWithoutPrefix('-webkit-transform');
  }
}, Css3dTransforms: function() {
  return this.has('CssTransforms') && this.isStyleSupported('perspective') && !Ext.browser.is.AndroidStock2;
}, CssAnimations: function() {
  return this.isStyleSupported('animationName');
}, CssTransitions: function() {
  return this.isStyleSupported('transitionProperty');
}, Audio: function() {
  return !!this.getTestElement('audio').canPlayType;
}, Video: function() {
  return !!this.getTestElement('video').canPlayType;
}, ClassList: function() {
  return "classList" in this.getTestElement();
}, LocalStorage: function() {
  var supported = false;
  try {
    if ('localStorage' in window && window['localStorage'] !== null) 
    {
      localStorage.setItem('sencha-localstorage-test', 'test success');
      localStorage.removeItem('sencha-localstorage-test');
      supported = true;
    }
  }  catch (e) {
}
  return supported;
}, XHR2: function() {
  return window.ProgressEvent && window.FormData && window.XMLHttpRequest && ('withCredentials' in new XMLHttpRequest());
}, XHRUploadProgress: function() {
  if (window.XMLHttpRequest && !Ext.browser.is.AndroidStock) 
  {
    var xhr = new XMLHttpRequest();
    return xhr && ('upload' in xhr) && ('onprogress' in xhr.upload);
  }
  return false;
}, NumericInputPlaceHolder: function() {
  return !(Ext.browser.is.AndroidStock4 && Ext.os.version.getMinor() < 2);
}});
});

Ext.define('Ext.dom.Query', {select: function(q, root) {
  var results = [], nodes, i, j, qlen, nlen;
  root = root || document;
  if (typeof root == 'string') 
  {
    root = document.getElementById(root);
  }
  q = q.split(",");
  for (i = 0 , qlen = q.length; i < qlen; i++) 
    {
      if (typeof q[i] == 'string') 
      {
        if (q[i][0] == '@') 
        {
          nodes = root.getAttributeNode(q[i].substring(1));
          results.push(nodes);
        } else {
          nodes = root.querySelectorAll(q[i]);
          for (j = 0 , nlen = nodes.length; j < nlen; j++) 
            {
              results.push(nodes[j]);
            }
        }
      }
    }
  return results;
}, selectNode: function(q, root) {
  return this.select(q, root)[0];
}, is: function(el, q) {
  var root, is, i, ln;
  if (typeof el == "string") 
  {
    el = document.getElementById(el);
  }
  if (Ext.isArray(el)) 
  {
    is = true;
    ln = el.length;
    for (i = 0; i < ln; i++) 
      {
        if (!this.is(el[i], q)) 
        {
          is = false;
          break;
        }
      }
  } else {
    root = el.parentNode;
    if (!root) 
    {
      root = document.createDocumentFragment();
      root.appendChild(el);
      is = this.select(q, root).indexOf(el) !== -1;
      root.removeChild(el);
      root = null;
    } else {
      is = this.select(q, root).indexOf(el) !== -1;
    }
  }
  return is;
}, isXml: function(el) {
  var docEl = (el ? el.ownerDocument || el : 0).documentElement;
  return docEl ? docEl.nodeName !== "HTML" : false;
}}, function() {
  Ext.ns('Ext.core');
  Ext.core.DomQuery = Ext.DomQuery = new this();
  Ext.query = Ext.Function.alias(Ext.DomQuery, 'select');
});

Ext.define('Ext.dom.Helper', {emptyTags: /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i, confRe: /tag|children|cn|html|tpl|tplData$/i, endRe: /end/i, attribXlat: {cls: 'class', htmlFor: 'for'}, closeTags: {}, decamelizeName: function() {
  var camelCaseRe = /([a-z])([A-Z])/g, cache = {};
  function decamel(match, p1, p2) {
    return p1 + '-' + p2.toLowerCase();
  }
  return function(s) {
  return cache[s] || (cache[s] = s.replace(camelCaseRe, decamel));
};
}(), generateMarkup: function(spec, buffer) {
  var me = this, attr, val, tag, i, closeTags;
  if (typeof spec == "string") 
  {
    buffer.push(spec);
  } else if (Ext.isArray(spec)) 
  {
    for (i = 0; i < spec.length; i++) 
      {
        if (spec[i]) 
        {
          me.generateMarkup(spec[i], buffer);
        }
      }
  } else {
    tag = spec.tag || 'div';
    buffer.push('<', tag);
    for (attr in spec) 
      {
        if (spec.hasOwnProperty(attr)) 
        {
          val = spec[attr];
          if (!me.confRe.test(attr)) 
          {
            if (typeof val == "object") 
            {
              buffer.push(' ', attr, '="');
              me.generateStyles(val, buffer).push('"');
            } else {
              buffer.push(' ', me.attribXlat[attr] || attr, '="', val, '"');
            }
          }
        }
      }
    if (me.emptyTags.test(tag)) 
    {
      buffer.push('/>');
    } else {
      buffer.push('>');
      if ((val = spec.tpl)) 
      {
        val.applyOut(spec.tplData, buffer);
      }
      if ((val = spec.html)) 
      {
        buffer.push(val);
      }
      if ((val = spec.cn || spec.children)) 
      {
        me.generateMarkup(val, buffer);
      }
      closeTags = me.closeTags;
      buffer.push(closeTags[tag] || (closeTags[tag] = '</' + tag + '>'));
    }
  }
  return buffer;
}, generateStyles: function(styles, buffer) {
  var a = buffer || [], name;
  for (name in styles) 
    {
      if (styles.hasOwnProperty(name)) 
      {
        a.push(this.decamelizeName(name), ':', styles[name], ';');
      }
    }
  return buffer || a.join('');
}, markup: function(spec) {
  if (typeof spec == "string") 
  {
    return spec;
  }
  var buf = this.generateMarkup(spec, []);
  return buf.join('');
}, applyStyles: function(el, styles) {
  Ext.fly(el).applyStyles(styles);
}, createContextualFragment: function(html) {
  var div = document.createElement("div"), fragment = document.createDocumentFragment(), i = 0, length, childNodes;
  div.innerHTML = html;
  childNodes = div.childNodes;
  length = childNodes.length;
  for (; i < length; i++) 
    {
      fragment.appendChild(childNodes[i].cloneNode(true));
    }
  return fragment;
}, insertHtml: function(where, el, html) {
  var setStart, range, frag, rangeEl, isBeforeBegin, isAfterBegin;
  where = where.toLowerCase();
  if (Ext.isTextNode(el)) 
  {
    if (where == 'afterbegin') 
    {
      where = 'beforebegin';
    } else if (where == 'beforeend') 
    {
      where = 'afterend';
    }
  }
  isBeforeBegin = where == 'beforebegin';
  isAfterBegin = where == 'afterbegin';
  range = Ext.feature.has.CreateContextualFragment ? el.ownerDocument.createRange() : undefined;
  setStart = 'setStart' + (this.endRe.test(where) ? 'After' : 'Before');
  if (isBeforeBegin || where == 'afterend') 
  {
    if (range) 
    {
      range[setStart](el);
      frag = range.createContextualFragment(html);
    } else {
      frag = this.createContextualFragment(html);
    }
    el.parentNode.insertBefore(frag, isBeforeBegin ? el : el.nextSibling);
    return el[(isBeforeBegin ? 'previous' : 'next') + 'Sibling'];
  } else {
    rangeEl = (isAfterBegin ? 'first' : 'last') + 'Child';
    if (el.firstChild) 
    {
      if (range) 
      {
        try {
          range[setStart](el[rangeEl]);
          frag = range.createContextualFragment(html);
        }        catch (e) {
  frag = this.createContextualFragment(html);
}
      } else {
        frag = this.createContextualFragment(html);
      }
      if (isAfterBegin) 
      {
        el.insertBefore(frag, el.firstChild);
      } else {
        el.appendChild(frag);
      }
    } else {
      el.innerHTML = html;
    }
    return el[rangeEl];
  }
}, insertBefore: function(el, o, returnElement) {
  return this.doInsert(el, o, returnElement, 'beforebegin');
}, insertAfter: function(el, o, returnElement) {
  return this.doInsert(el, o, returnElement, 'afterend');
}, insertFirst: function(el, o, returnElement) {
  return this.doInsert(el, o, returnElement, 'afterbegin');
}, append: function(el, o, returnElement) {
  return this.doInsert(el, o, returnElement, 'beforeend');
}, overwrite: function(el, o, returnElement) {
  el = Ext.getDom(el);
  el.innerHTML = this.markup(o);
  return returnElement ? Ext.get(el.firstChild) : el.firstChild;
}, doInsert: function(el, o, returnElement, pos) {
  var newNode = this.insertHtml(pos, Ext.getDom(el), this.markup(o));
  return returnElement ? Ext.get(newNode, true) : newNode;
}, createTemplate: function(o) {
  var html = this.markup(o);
  return new Ext.Template(html);
}}, function() {
  Ext.ns('Ext.core');
  Ext.core.DomHelper = Ext.DomHelper = new this();
});

Ext.define('Ext.mixin.Identifiable', {statics: {uniqueIds: {}}, isIdentifiable: true, mixinId: 'identifiable', idCleanRegex: /\.|[^\w\-]/g, defaultIdPrefix: 'ext-', defaultIdSeparator: '-', getOptimizedId: function() {
  return this.id;
}, getUniqueId: function() {
  var id = this.id, prototype, separator, xtype, uniqueIds, prefix;
  if (!id) 
  {
    prototype = this.self.prototype;
    separator = this.defaultIdSeparator;
    uniqueIds = Ext.mixin.Identifiable.uniqueIds;
    if (!prototype.hasOwnProperty('identifiablePrefix')) 
    {
      xtype = this.xtype;
      if (xtype) 
      {
        prefix = this.defaultIdPrefix + xtype + separator;
      } else {
        prefix = prototype.$className.replace(this.idCleanRegex, separator).toLowerCase() + separator;
      }
      prototype.identifiablePrefix = prefix;
    }
    prefix = this.identifiablePrefix;
    if (!uniqueIds.hasOwnProperty(prefix)) 
    {
      uniqueIds[prefix] = 0;
    }
    id = this.id = prefix + (++uniqueIds[prefix]);
  }
  this.getUniqueId = this.getOptimizedId;
  return id;
}, setId: function(id) {
  this.id = id;
}, getId: function() {
  var id = this.id;
  if (!id) 
  {
    id = this.getUniqueId();
  }
  this.getId = this.getOptimizedId;
  return id;
}});

Ext.define('Ext.dom.Element', {alternateClassName: 'Ext.Element', mixins: ['Ext.mixin.Identifiable'], observableType: 'element', xtype: 'element', statics: {CREATE_ATTRIBUTES: {style: 'style', className: 'className', cls: 'cls', classList: 'classList', text: 'text', hidden: 'hidden', html: 'html', children: 'children'}, create: function(attributes, domNode) {
  var ATTRIBUTES = this.CREATE_ATTRIBUTES, element, elementStyle, tag, value, name, i, ln;
  if (!attributes) 
  {
    attributes = {};
  }
  if (attributes.isElement) 
  {
    return attributes.dom;
  } else if ('nodeType' in attributes) 
  {
    return attributes;
  }
  if (typeof attributes == 'string') 
  {
    return document.createTextNode(attributes);
  }
  tag = attributes.tag;
  if (!tag) 
  {
    tag = 'div';
  }
  if (attributes.namespace) 
  {
    element = document.createElementNS(attributes.namespace, tag);
  } else {
    element = document.createElement(tag);
  }
  elementStyle = element.style;
  for (name in attributes) 
    {
      if (name != 'tag') 
      {
        value = attributes[name];
        switch (name) {
          case ATTRIBUTES.style:
            if (typeof value == 'string') 
            {
              element.setAttribute(name, value);
            } else {
              for (i in value) 
                {
                  if (value.hasOwnProperty(i)) 
                  {
                    elementStyle[i] = value[i];
                  }
                }
            }
            break;
          case ATTRIBUTES.className:
          case ATTRIBUTES.cls:
            element.className = value;
            break;
          case ATTRIBUTES.classList:
            element.className = value.join(' ');
            break;
          case ATTRIBUTES.text:
            element.textContent = value;
            break;
          case ATTRIBUTES.hidden:
            if (value) 
            {
              element.style.display = 'none';
            }
            break;
          case ATTRIBUTES.html:
            element.innerHTML = value;
            break;
          case ATTRIBUTES.children:
            for (i = 0 , ln = value.length; i < ln; i++) 
              {
                element.appendChild(this.create(value[i], true));
              }
            break;
          default:
            element.setAttribute(name, value);
        }
      }
    }
  if (domNode) 
  {
    return element;
  } else {
    return this.get(element);
  }
}, documentElement: null, cache: {}, get: function(element) {
  var cache = this.cache, instance, dom, id;
  if (!element) 
  {
    return null;
  }
  if (typeof element == 'string') 
  {
    dom = document.getElementById(element);
    if (cache.hasOwnProperty(element)) 
    {
      instance = cache[element];
    }
    if (dom) 
    {
      if (instance) 
      {
        instance.dom = dom;
      } else {
        instance = cache[element] = new this(dom);
      }
    } else if (!instance) 
    {
      instance = null;
    }
    return instance;
  }
  if ('tagName' in element) 
  {
    id = element.id;
    if (cache.hasOwnProperty(id)) 
    {
      instance = cache[id];
      instance.dom = element;
      return instance;
    } else {
      instance = new this(element);
      cache[instance.getId()] = instance;
    }
    return instance;
  }
  if (element.isElement) 
  {
    return element;
  }
  if (element.isComposite) 
  {
    return element;
  }
  if (Ext.isArray(element)) 
  {
    return this.select(element);
  }
  if (element === document) 
  {
    if (!this.documentElement) 
    {
      this.documentElement = new this(document.documentElement);
      this.documentElement.setId('ext-application');
    }
    return this.documentElement;
  }
  return null;
}, data: function(element, key, value) {
  var cache = Ext.cache, id, data;
  element = this.get(element);
  if (!element) 
  {
    return null;
  }
  id = element.id;
  data = cache[id].data;
  if (!data) 
  {
    cache[id].data = data = {};
  }
  if (arguments.length == 2) 
  {
    return data[key];
  } else {
    return (data[key] = value);
  }
}, serializeForm: function(form) {
  var fElements = form.elements || (document.forms[form] || Ext.getDom(form)).elements, hasSubmit = false, encoder = encodeURIComponent, data = '', eLen = fElements.length, element, name, type, options, hasValue, e, o, oLen, opt;
  for (e = 0; e < eLen; e++) 
    {
      element = fElements[e];
      name = element.name;
      type = element.type;
      options = element.options;
      if (!element.disabled && name) 
      {
        if (/select-(one|multiple)/i.test(type)) 
        {
          oLen = options.length;
          for (o = 0; o < oLen; o++) 
            {
              opt = options[o];
              if (opt.selected) 
              {
                hasValue = opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttributeNode('value').specified;
                data += Ext.String.format('{0}={1}&', encoder(name), encoder(hasValue ? opt.value : opt.text));
              }
            }
        } else if (!(/file|undefined|reset|button/i.test(type))) 
        {
          if (!(/radio|checkbox/i.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)) 
          {
            data += encoder(name) + '=' + encoder(element.value) + '&';
            hasSubmit = /submit/i.test(type);
          }
        }
      }
    }
  return data.substr(0, data.length - 1);
}, serializeNode: function(node) {
  var result = '', i, n, attr, child;
  if (node.nodeType === document.TEXT_NODE) 
  {
    return node.nodeValue;
  }
  result += '<' + node.nodeName;
  if (node.attributes.length) 
  {
    for (i = 0 , n = node.attributes.length; i < n; i++) 
      {
        attr = node.attributes[i];
        result += ' ' + attr.name + '="' + attr.value + '"';
      }
  }
  result += '>';
  if (node.childNodes && node.childNodes.length) 
  {
    for (i = 0 , n = node.childNodes.length; i < n; i++) 
      {
        child = node.childNodes[i];
        result += this.serializeNode(child);
      }
  }
  result += '</' + node.nodeName + '>';
  return result;
}}, isElement: true, constructor: function(dom) {
  if (typeof dom == 'string') 
  {
    dom = document.getElementById(dom);
  }
  if (!dom) 
  {
    throw new Error("Invalid domNode reference or an id of an existing domNode: " + dom);
  }
  this.dom = dom;
  this.getUniqueId();
}, attach: function(dom) {
  this.dom = dom;
  this.id = dom.id;
  return this;
}, getUniqueId: function() {
  var id = this.id, dom;
  if (!id) 
  {
    dom = this.dom;
    if (dom.id.length > 0) 
    {
      this.id = id = dom.id;
    } else {
      dom.id = id = this.mixins.identifiable.getUniqueId.call(this);
    }
    Ext.Element.cache[id] = this;
  }
  return id;
}, setId: function(id) {
  var currentId = this.id, cache = Ext.Element.cache;
  if (currentId) 
  {
    delete cache[currentId];
  }
  this.dom.id = id;
  this.id = id;
  cache[id] = this;
  return this;
}, setHtml: function(html) {
  this.dom.innerHTML = html;
}, getHtml: function() {
  return this.dom.innerHTML;
}, setText: function(text) {
  this.dom.textContent = text;
}, redraw: function() {
  var dom = this.dom, domStyle = dom.style;
  domStyle.display = 'none';
  dom.offsetHeight;
  domStyle.display = '';
}, isPainted: (function() {
  return !Ext.browser.is.IE ? function() {
  var dom = this.dom;
  return Boolean(dom && dom.offsetParent);
} : function() {
  var dom = this.dom;
  return Boolean(dom && (dom.offsetHeight !== 0 && dom.offsetWidth !== 0));
};
})(), set: function(attributes, useSet) {
  var dom = this.dom, attribute, value;
  for (attribute in attributes) 
    {
      if (attributes.hasOwnProperty(attribute)) 
      {
        value = attributes[attribute];
        if (attribute == 'style') 
        {
          this.applyStyles(value);
        } else if (attribute == 'cls') 
        {
          dom.className = value;
        } else if (useSet !== false) 
        {
          if (value === undefined) 
          {
            dom.removeAttribute(attribute);
          } else {
            dom.setAttribute(attribute, value);
          }
        } else {
          dom[attribute] = value;
        }
      }
    }
  return this;
}, is: function(selector) {
  return Ext.DomQuery.is(this.dom, selector);
}, getValue: function(asNumber) {
  var value = this.dom.value;
  return asNumber ? parseInt(value, 10) : value;
}, getAttribute: function(name, namespace) {
  var dom = this.dom;
  return dom.getAttributeNS(namespace, name) || dom.getAttribute(namespace + ":" + name) || dom.getAttribute(name) || dom[name];
}, setSizeState: function(state) {
  var classes = ['x-sized', 'x-unsized', 'x-stretched'], states = [true, false, null], index = states.indexOf(state), addedClass;
  if (index !== -1) 
  {
    addedClass = classes[index];
    classes.splice(index, 1);
    this.addCls(addedClass);
  }
  this.removeCls(classes);
  return this;
}, destroy: function() {
  this.isDestroyed = true;
  var cache = Ext.Element.cache, dom = this.dom;
  if (dom && dom.parentNode && dom.tagName != 'BODY') 
  {
    dom.parentNode.removeChild(dom);
  }
  delete cache[this.id];
  delete this.dom;
}}, function(Element) {
  Ext.elements = Ext.cache = Element.cache;
  this.addStatics({Fly: new Ext.Class({extend: Element, constructor: function(dom) {
  this.dom = dom;
}}), _flyweights: {}, fly: function(element, named) {
  var fly = null, flyweights = Element._flyweights, cachedElement;
  named = named || '_global';
  element = Ext.getDom(element);
  if (element) 
  {
    fly = flyweights[named] || (flyweights[named] = new Element.Fly());
    fly.dom = element;
    fly.isSynchronized = false;
    cachedElement = Ext.cache[element.id];
    if (cachedElement && cachedElement.isElement) 
    {
      cachedElement.isSynchronized = false;
    }
  }
  return fly;
}});
  Ext.get = function(element) {
  return Element.get(element);
};
  Ext.fly = function() {
  return Element.fly.apply(Element, arguments);
};
  Ext.ClassManager.onCreated(function() {
  Element.mixin('observable', Ext.mixin.Observable);
}, null, 'Ext.mixin.Observable');
});

Ext.dom.Element.addStatics({numberRe: /\d+$/, unitRe: /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i, camelRe: /(-[a-z])/gi, cssRe: /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi, opacityRe: /alpha\(opacity=(.*)\)/i, propertyCache: {}, defaultUnit: "px", borders: {l: 'border-left-width', r: 'border-right-width', t: 'border-top-width', b: 'border-bottom-width'}, paddings: {l: 'padding-left', r: 'padding-right', t: 'padding-top', b: 'padding-bottom'}, margins: {l: 'margin-left', r: 'margin-right', t: 'margin-top', b: 'margin-bottom'}, addUnits: function(size, units) {
  if (size === "" || size == "auto" || size === undefined || size === null) 
  {
    return size || '';
  }
  if (Ext.isNumber(size) || this.numberRe.test(size)) 
  {
    return size + (units || this.defaultUnit || 'px');
  } else if (!this.unitRe.test(size)) 
  {
    return size || '';
  }
  return size;
}, isAncestor: function(p, c) {
  var ret = false;
  p = Ext.getDom(p);
  c = Ext.getDom(c);
  if (p && c) 
  {
    if (p.contains) 
    {
      return p.contains(c);
    } else if (p.compareDocumentPosition) 
    {
      return !!(p.compareDocumentPosition(c) & 16);
    } else {
      while ((c = c.parentNode)) 
        {
          ret = c == p || ret;
        }
    }
  }
  return ret;
}, parseBox: function(box) {
  if (typeof box != 'string') 
  {
    box = box.toString();
  }
  var parts = box.split(' '), ln = parts.length;
  if (ln == 1) 
  {
    parts[1] = parts[2] = parts[3] = parts[0];
  } else if (ln == 2) 
  {
    parts[2] = parts[0];
    parts[3] = parts[1];
  } else if (ln == 3) 
  {
    parts[3] = parts[1];
  }
  return {top: parts[0] || 0, right: parts[1] || 0, bottom: parts[2] || 0, left: parts[3] || 0};
}, unitizeBox: function(box, units) {
  var me = this;
  box = me.parseBox(box);
  return me.addUnits(box.top, units) + ' ' + me.addUnits(box.right, units) + ' ' + me.addUnits(box.bottom, units) + ' ' + me.addUnits(box.left, units);
}, camelReplaceFn: function(m, a) {
  return a.charAt(1).toUpperCase();
}, normalize: function(prop) {
  return this.propertyCache[prop] || (this.propertyCache[prop] = prop.replace(this.camelRe, this.camelReplaceFn));
}, fromPoint: function(x, y) {
  return Ext.get(document.elementFromPoint(x, y));
}, parseStyles: function(styles) {
  var out = {}, cssRe = this.cssRe, matches;
  if (styles) 
  {
    cssRe.lastIndex = 0;
    while ((matches = cssRe.exec(styles))) 
      {
        out[matches[1]] = matches[2];
      }
  }
  return out;
}});

//@tag dom,core
//@define Ext.Element-all
//@define Ext.Element-alignment
//@require Ext.Element-static

/**
 * @class Ext.dom.Element
 */

Ext.dom.Element.addMembers({appendChild: function(element) {
  this.dom.appendChild(Ext.getDom(element));
  return this;
}, removeChild: function(element) {
  this.dom.removeChild(Ext.getDom(element));
  return this;
}, append: function() {
  this.appendChild.apply(this, arguments);
}, appendTo: function(el) {
  Ext.getDom(el).appendChild(this.dom);
  return this;
}, insertBefore: function(el) {
  el = Ext.getDom(el);
  el.parentNode.insertBefore(this.dom, el);
  return this;
}, insertAfter: function(el) {
  el = Ext.getDom(el);
  el.parentNode.insertBefore(this.dom, el.nextSibling);
  return this;
}, insertFirst: function(element) {
  var elementDom = Ext.getDom(element), dom = this.dom, firstChild = dom.firstChild;
  if (!firstChild) 
  {
    dom.appendChild(elementDom);
  } else {
    dom.insertBefore(elementDom, firstChild);
  }
  return this;
}, insertSibling: function(el, where, returnDom) {
  var me = this, rt, isAfter = (where || 'before').toLowerCase() == 'after', insertEl;
  if (Ext.isArray(el)) 
  {
    insertEl = me;
    Ext.each(el, function(e) {
  rt = Ext.fly(insertEl, '_internal').insertSibling(e, where, returnDom);
  if (isAfter) 
  {
    insertEl = rt;
  }
});
    return rt;
  }
  el = el || {};
  if (el.nodeType || el.dom) 
  {
    rt = me.dom.parentNode.insertBefore(Ext.getDom(el), isAfter ? me.dom.nextSibling : me.dom);
    if (!returnDom) 
    {
      rt = Ext.get(rt);
    }
  } else {
    if (isAfter && !me.dom.nextSibling) 
    {
      rt = Ext.core.DomHelper.append(me.dom.parentNode, el, !returnDom);
    } else {
      rt = Ext.core.DomHelper[isAfter ? 'insertAfter' : 'insertBefore'](me.dom, el, !returnDom);
    }
  }
  return rt;
}, replace: function(element) {
  element = Ext.getDom(element);
  element.parentNode.replaceChild(this.dom, element);
  return this;
}, replaceWith: function(el) {
  var me = this;
  if (el.nodeType || el.dom || typeof el == 'string') 
  {
    el = Ext.get(el);
    me.dom.parentNode.insertBefore(el.dom, me.dom);
  } else {
    el = Ext.core.DomHelper.insertBefore(me.dom, el);
  }
  delete Ext.cache[me.id];
  Ext.removeNode(me.dom);
  me.id = Ext.id(me.dom = el);
  return me;
}, doReplaceWith: function(element) {
  var dom = this.dom;
  dom.parentNode.replaceChild(Ext.getDom(element), dom);
}, createChild: function(config, insertBefore, returnDom) {
  config = config || {tag: 'div'};
  if (insertBefore) 
  {
    return Ext.core.DomHelper.insertBefore(insertBefore, config, returnDom !== true);
  } else {
    return Ext.core.DomHelper[!this.dom.firstChild ? 'insertFirst' : 'append'](this.dom, config, returnDom !== true);
  }
}, wrap: function(config, domNode) {
  var dom = this.dom, wrapper = this.self.create(config, domNode), wrapperDom = (domNode) ? wrapper : wrapper.dom, parentNode = dom.parentNode;
  if (parentNode) 
  {
    parentNode.insertBefore(wrapperDom, dom);
  }
  wrapperDom.appendChild(dom);
  return wrapper;
}, wrapAllChildren: function(config) {
  var dom = this.dom, children = dom.childNodes, wrapper = this.self.create(config), wrapperDom = wrapper.dom;
  while (children.length > 0) 
    {
      wrapperDom.appendChild(dom.firstChild);
    }
  dom.appendChild(wrapperDom);
  return wrapper;
}, unwrapAllChildren: function() {
  var dom = this.dom, children = dom.childNodes, parentNode = dom.parentNode;
  if (parentNode) 
  {
    while (children.length > 0) 
      {
        parentNode.insertBefore(dom, dom.firstChild);
      }
    this.destroy();
  }
}, unwrap: function() {
  var dom = this.dom, parentNode = dom.parentNode, grandparentNode;
  if (parentNode) 
  {
    grandparentNode = parentNode.parentNode;
    grandparentNode.insertBefore(dom, parentNode);
    grandparentNode.removeChild(parentNode);
  } else {
    grandparentNode = document.createDocumentFragment();
    grandparentNode.appendChild(dom);
  }
  return this;
}, detach: function() {
  var dom = this.dom;
  if (dom && dom.parentNode && dom.tagName !== 'BODY') 
  {
    dom.parentNode.removeChild(dom);
  }
  return this;
}, insertHtml: function(where, html, returnEl) {
  var el = Ext.core.DomHelper.insertHtml(where, this.dom, html);
  return returnEl ? Ext.get(el) : el;
}});

Ext.dom.Element.override({getX: function() {
  return this.getXY()[0];
}, getY: function() {
  return this.getXY()[1];
}, getXY: function() {
  var rect = this.dom.getBoundingClientRect(), round = Math.round;
  return [round(rect.left + window.pageXOffset), round(rect.top + window.pageYOffset)];
}, getOffsetsTo: function(el) {
  var o = this.getXY(), e = Ext.fly(el, '_internal').getXY();
  return [o[0] - e[0], o[1] - e[1]];
}, setX: function(x) {
  return this.setXY([x, this.getY()]);
}, setY: function(y) {
  return this.setXY([this.getX(), y]);
}, setXY: function(pos) {
  var me = this;
  if (arguments.length > 1) 
  {
    pos = [pos, arguments[1]];
  }
  var pts = me.translatePoints(pos), style = me.dom.style;
  for (pos in pts) 
    {
      if (!pts.hasOwnProperty(pos)) 
      {
        continue;
      }
      if (!isNaN(pts[pos])) 
      style[pos] = pts[pos] + "px";
    }
  return me;
}, getLeft: function() {
  return parseInt(this.getStyle('left'), 10) || 0;
}, getRight: function() {
  return parseInt(this.getStyle('right'), 10) || 0;
}, getTop: function() {
  return parseInt(this.getStyle('top'), 10) || 0;
}, getBottom: function() {
  return parseInt(this.getStyle('bottom'), 10) || 0;
}, translatePoints: function(x, y) {
  y = isNaN(x[1]) ? y : x[1];
  x = isNaN(x[0]) ? x : x[0];
  var me = this, relative = me.isStyle('position', 'relative'), o = me.getXY(), l = parseInt(me.getStyle('left'), 10), t = parseInt(me.getStyle('top'), 10);
  l = !isNaN(l) ? l : (relative ? 0 : me.dom.offsetLeft);
  t = !isNaN(t) ? t : (relative ? 0 : me.dom.offsetTop);
  return {left: (x - o[0] + l), top: (y - o[1] + t)};
}, setBox: function(box) {
  var me = this, width = box.width, height = box.height, top = box.top, left = box.left;
  if (left !== undefined) 
  {
    me.setLeft(left);
  }
  if (top !== undefined) 
  {
    me.setTop(top);
  }
  if (width !== undefined) 
  {
    me.setWidth(width);
  }
  if (height !== undefined) 
  {
    me.setHeight(height);
  }
  return this;
}, getBox: function(contentBox, local) {
  var me = this, dom = me.dom, width = dom.offsetWidth, height = dom.offsetHeight, xy, box, l, r, t, b;
  if (!local) 
  {
    xy = me.getXY();
  } else if (contentBox) 
  {
    xy = [0, 0];
  } else {
    xy = [parseInt(me.getStyle("left"), 10) || 0, parseInt(me.getStyle("top"), 10) || 0];
  }
  if (!contentBox) 
  {
    box = {x: xy[0], y: xy[1], 0: xy[0], 1: xy[1], width: width, height: height};
  } else {
    l = me.getBorderWidth.call(me, "l") + me.getPadding.call(me, "l");
    r = me.getBorderWidth.call(me, "r") + me.getPadding.call(me, "r");
    t = me.getBorderWidth.call(me, "t") + me.getPadding.call(me, "t");
    b = me.getBorderWidth.call(me, "b") + me.getPadding.call(me, "b");
    box = {x: xy[0] + l, y: xy[1] + t, 0: xy[0] + l, 1: xy[1] + t, width: width - (l + r), height: height - (t + b)};
  }
  box.left = box.x;
  box.top = box.y;
  box.right = box.x + box.width;
  box.bottom = box.y + box.height;
  return box;
}, getPageBox: function(getRegion) {
  var me = this, el = me.dom;
  if (!el) 
  {
    return new Ext.util.Region();
  }
  var w = el.offsetWidth, h = el.offsetHeight, xy = me.getXY(), t = xy[1], r = xy[0] + w, b = xy[1] + h, l = xy[0];
  if (getRegion) 
  {
    return new Ext.util.Region(t, r, b, l);
  } else {
    return {left: l, top: t, width: w, height: h, right: r, bottom: b};
  }
}});

Ext.dom.Element.addMembers({WIDTH: 'width', HEIGHT: 'height', MIN_WIDTH: 'min-width', MIN_HEIGHT: 'min-height', MAX_WIDTH: 'max-width', MAX_HEIGHT: 'max-height', TOP: 'top', RIGHT: 'right', BOTTOM: 'bottom', LEFT: 'left', VISIBILITY: 1, DISPLAY: 2, OFFSETS: 3, SEPARATOR: '-', trimRe: /^\s+|\s+$/g, wordsRe: /\w/g, spacesRe: /\s+/, styleSplitRe: /\s*(?::|;)\s*/, transparentRe: /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i, classNameSplitRegex: /[\s]+/, borders: {t: 'border-top-width', r: 'border-right-width', b: 'border-bottom-width', l: 'border-left-width'}, paddings: {t: 'padding-top', r: 'padding-right', b: 'padding-bottom', l: 'padding-left'}, margins: {t: 'margin-top', r: 'margin-right', b: 'margin-bottom', l: 'margin-left'}, defaultUnit: "px", isSynchronized: false, synchronize: function() {
  var dom = this.dom, hasClassMap = {}, className = dom.className, classList, i, ln, name;
  if (className.length > 0) 
  {
    classList = dom.className.split(this.classNameSplitRegex);
    for (i = 0 , ln = classList.length; i < ln; i++) 
      {
        name = classList[i];
        hasClassMap[name] = true;
      }
  } else {
    classList = [];
  }
  this.classList = classList;
  this.hasClassMap = hasClassMap;
  this.isSynchronized = true;
  return this;
}, addCls: function(names, prefix, suffix) {
  if (!names) 
  {
    return this;
  }
  if (!this.isSynchronized) 
  {
    this.synchronize();
  }
  var dom = this.dom, map = this.hasClassMap, classList = this.classList, SEPARATOR = this.SEPARATOR, i, ln, name;
  prefix = prefix ? prefix + SEPARATOR : '';
  suffix = suffix ? SEPARATOR + suffix : '';
  if (typeof names == 'string') 
  {
    names = names.split(this.spacesRe);
  }
  for (i = 0 , ln = names.length; i < ln; i++) 
    {
      name = prefix + names[i] + suffix;
      if (!map[name]) 
      {
        map[name] = true;
        classList.push(name);
      }
    }
  dom.className = classList.join(' ');
  return this;
}, removeCls: function(names, prefix, suffix) {
  if (!names) 
  {
    return this;
  }
  if (!this.isSynchronized) 
  {
    this.synchronize();
  }
  if (!suffix) 
  {
    suffix = '';
  }
  var dom = this.dom, map = this.hasClassMap, classList = this.classList, SEPARATOR = this.SEPARATOR, i, ln, name;
  prefix = prefix ? prefix + SEPARATOR : '';
  suffix = suffix ? SEPARATOR + suffix : '';
  if (typeof names == 'string') 
  {
    names = names.split(this.spacesRe);
  }
  for (i = 0 , ln = names.length; i < ln; i++) 
    {
      name = prefix + names[i] + suffix;
      if (map[name]) 
      {
        delete map[name];
        Ext.Array.remove(classList, name);
      }
    }
  dom.className = classList.join(' ');
  return this;
}, replaceCls: function(oldName, newName, prefix, suffix) {
  if (!oldName && !newName) 
  {
    return this;
  }
  oldName = oldName || [];
  newName = newName || [];
  if (!this.isSynchronized) 
  {
    this.synchronize();
  }
  if (!suffix) 
  {
    suffix = '';
  }
  var dom = this.dom, map = this.hasClassMap, classList = this.classList, SEPARATOR = this.SEPARATOR, i, ln, name;
  prefix = prefix ? prefix + SEPARATOR : '';
  suffix = suffix ? SEPARATOR + suffix : '';
  if (typeof oldName == 'string') 
  {
    oldName = oldName.split(this.spacesRe);
  }
  if (typeof newName == 'string') 
  {
    newName = newName.split(this.spacesRe);
  }
  for (i = 0 , ln = oldName.length; i < ln; i++) 
    {
      name = prefix + oldName[i] + suffix;
      if (map[name]) 
      {
        delete map[name];
        Ext.Array.remove(classList, name);
      }
    }
  for (i = 0 , ln = newName.length; i < ln; i++) 
    {
      name = prefix + newName[i] + suffix;
      if (!map[name]) 
      {
        map[name] = true;
        classList.push(name);
      }
    }
  dom.className = classList.join(' ');
  return this;
}, hasCls: function(name) {
  if (!this.isSynchronized) 
  {
    this.synchronize();
  }
  return this.hasClassMap.hasOwnProperty(name);
}, setCls: function(className) {
  var map = this.hasClassMap, i, ln, name;
  if (typeof className == 'string') 
  {
    className = className.split(this.spacesRe);
  }
  for (i = 0 , ln = className.length; i < ln; i++) 
    {
      name = className[i];
      if (!map[name]) 
      {
        map[name] = true;
      }
    }
  this.classList = className.slice();
  this.dom.className = className.join(' ');
}, toggleCls: function(className, force) {
  if (typeof force !== 'boolean') 
  {
    force = !this.hasCls(className);
  }
  return (force) ? this.addCls(className) : this.removeCls(className);
}, swapCls: function(firstClass, secondClass, flag, prefix) {
  if (flag === undefined) 
  {
    flag = true;
  }
  var addedClass = flag ? firstClass : secondClass, removedClass = flag ? secondClass : firstClass;
  if (removedClass) 
  {
    this.removeCls(prefix ? prefix + '-' + removedClass : removedClass);
  }
  if (addedClass) 
  {
    this.addCls(prefix ? prefix + '-' + addedClass : addedClass);
  }
  return this;
}, setWidth: function(width) {
  return this.setLengthValue(this.WIDTH, width);
}, setHeight: function(height) {
  return this.setLengthValue(this.HEIGHT, height);
}, setSize: function(width, height) {
  if (Ext.isObject(width)) 
  {
    height = width.height;
    width = width.width;
  }
  this.setWidth(width);
  this.setHeight(height);
  return this;
}, setMinWidth: function(width) {
  return this.setLengthValue(this.MIN_WIDTH, width);
}, setMinHeight: function(height) {
  return this.setLengthValue(this.MIN_HEIGHT, height);
}, setMaxWidth: function(width) {
  return this.setLengthValue(this.MAX_WIDTH, width);
}, setMaxHeight: function(height) {
  return this.setLengthValue(this.MAX_HEIGHT, height);
}, setTop: function(top) {
  return this.setLengthValue(this.TOP, top);
}, setRight: function(right) {
  return this.setLengthValue(this.RIGHT, right);
}, setBottom: function(bottom) {
  return this.setLengthValue(this.BOTTOM, bottom);
}, setLeft: function(left) {
  return this.setLengthValue(this.LEFT, left);
}, setMargin: function(margin) {
  var domStyle = this.dom.style;
  if (margin || margin === 0) 
  {
    margin = this.self.unitizeBox((margin === true) ? 5 : margin);
    domStyle.setProperty('margin', margin, 'important');
  } else {
    domStyle.removeProperty('margin-top');
    domStyle.removeProperty('margin-right');
    domStyle.removeProperty('margin-bottom');
    domStyle.removeProperty('margin-left');
  }
}, setPadding: function(padding) {
  var domStyle = this.dom.style;
  if (padding || padding === 0) 
  {
    padding = this.self.unitizeBox((padding === true) ? 5 : padding);
    domStyle.setProperty('padding', padding, 'important');
  } else {
    domStyle.removeProperty('padding-top');
    domStyle.removeProperty('padding-right');
    domStyle.removeProperty('padding-bottom');
    domStyle.removeProperty('padding-left');
  }
}, setBorder: function(border) {
  var domStyle = this.dom.style;
  if (border || border === 0) 
  {
    border = this.self.unitizeBox((border === true) ? 1 : border);
    domStyle.setProperty('border-width', border, 'important');
  } else {
    domStyle.removeProperty('border-top-width');
    domStyle.removeProperty('border-right-width');
    domStyle.removeProperty('border-bottom-width');
    domStyle.removeProperty('border-left-width');
  }
}, setLengthValue: function(name, value) {
  var domStyle = this.dom.style;
  if (value === null) 
  {
    domStyle.removeProperty(name);
    return this;
  }
  if (typeof value == 'number') 
  {
    value = value + 'px';
  }
  domStyle.setProperty(name, value, 'important');
  return this;
}, setVisible: function(visible) {
  var mode = this.getVisibilityMode(), method = visible ? 'removeCls' : 'addCls';
  switch (mode) {
    case this.VISIBILITY:
      this.removeCls(['x-hidden-display', 'x-hidden-offsets']);
      this[method]('x-hidden-visibility');
      break;
    case this.DISPLAY:
      this.removeCls(['x-hidden-visibility', 'x-hidden-offsets']);
      this[method]('x-hidden-display');
      break;
    case this.OFFSETS:
      this.removeCls(['x-hidden-visibility', 'x-hidden-display']);
      this[method]('x-hidden-offsets');
      break;
  }
  return this;
}, getVisibilityMode: function() {
  var dom = this.dom, mode = Ext.dom.Element.data(dom, 'visibilityMode');
  if (mode === undefined) 
  {
    Ext.dom.Element.data(dom, 'visibilityMode', mode = this.DISPLAY);
  }
  return mode;
}, setVisibilityMode: function(mode) {
  this.self.data(this.dom, 'visibilityMode', mode);
  return this;
}, show: function() {
  var dom = this.dom;
  if (dom) 
  {
    dom.style.removeProperty('display');
  }
}, hide: function() {
  this.dom.style.setProperty('display', 'none', 'important');
}, setVisibility: function(isVisible) {
  var domStyle = this.dom.style;
  if (isVisible) 
  {
    domStyle.removeProperty('visibility');
  } else {
    domStyle.setProperty('visibility', 'hidden', 'important');
  }
}, styleHooks: {}, addStyles: function(sides, styles) {
  var totalSize = 0, sidesArr = sides.match(this.wordsRe), i = 0, len = sidesArr.length, side, size;
  for (; i < len; i++) 
    {
      side = sidesArr[i];
      size = side && parseInt(this.getStyle(styles[side]), 10);
      if (size) 
      {
        totalSize += Math.abs(size);
      }
    }
  return totalSize;
}, isStyle: function(style, val) {
  return this.getStyle(style) == val;
}, getStyleValue: function(name) {
  return this.dom.style.getPropertyValue(name);
}, getStyle: function(prop) {
  var me = this, dom = me.dom, hook = me.styleHooks[prop], cs, result;
  if (dom == document) 
  {
    return null;
  }
  if (!hook) 
  {
    me.styleHooks[prop] = hook = {name: Ext.dom.Element.normalize(prop)};
  }
  if (hook.get) 
  {
    return hook.get(dom, me);
  }
  cs = window.getComputedStyle(dom, '');
  result = (cs && cs[hook.name]);
  return result;
}, setStyle: function(prop, value) {
  var me = this, dom = me.dom, hooks = me.styleHooks, style = dom.style, valueFrom = Ext.valueFrom, name, hook;
  if (typeof prop == 'string') 
  {
    hook = hooks[prop];
    if (!hook) 
    {
      hooks[prop] = hook = {name: Ext.dom.Element.normalize(prop)};
    }
    value = valueFrom(value, '');
    if (hook.set) 
    {
      hook.set(dom, value, me);
    } else {
      style[hook.name] = value;
    }
  } else {
    for (name in prop) 
      {
        if (prop.hasOwnProperty(name)) 
        {
          hook = hooks[name];
          if (!hook) 
          {
            hooks[name] = hook = {name: Ext.dom.Element.normalize(name)};
          }
          value = valueFrom(prop[name], '');
          if (hook.set) 
          {
            hook.set(dom, value, me);
          } else {
            style[hook.name] = value;
          }
        }
      }
  }
  return me;
}, getHeight: function(contentHeight) {
  var dom = this.dom, height = contentHeight ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight;
  return height > 0 ? height : 0;
}, getWidth: function(contentWidth) {
  var dom = this.dom, width = contentWidth ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth;
  return width > 0 ? width : 0;
}, getBorderWidth: function(side) {
  return this.addStyles(side, this.borders);
}, getPadding: function(side) {
  return this.addStyles(side, this.paddings);
}, applyStyles: function(styles) {
  if (styles) 
  {
    var dom = this.dom, styleType, i, len;
    if (typeof styles == 'function') 
    {
      styles = styles.call();
    }
    styleType = typeof styles;
    if (styleType == 'string') 
    {
      styles = Ext.util.Format.trim(styles).split(this.styleSplitRe);
      for (i = 0 , len = styles.length; i < len; ) 
        {
          dom.style[Ext.dom.Element.normalize(styles[i++])] = styles[i++];
        }
    } else if (styleType == 'object') 
    {
      this.setStyle(styles);
    }
  }
  return this;
}, getSize: function(contentSize) {
  var dom = this.dom;
  return {width: Math.max(0, contentSize ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth), height: Math.max(0, contentSize ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight)};
}, repaint: function() {
  var dom = this.dom;
  this.addCls(Ext.baseCSSPrefix + 'repaint');
  setTimeout(function() {
  Ext.fly(dom).removeCls(Ext.baseCSSPrefix + 'repaint');
}, 1);
  return this;
}, getMargin: function(side) {
  var me = this, hash = {t: "top", l: "left", r: "right", b: "bottom"}, o = {}, key;
  if (!side) 
  {
    for (key in me.margins) 
      {
        o[hash[key]] = parseFloat(me.getStyle(me.margins[key])) || 0;
      }
    return o;
  } else {
    return me.addStyles.call(me, side, me.margins);
  }
}, translate: function() {
  var transformStyleName = 'webkitTransform' in document.createElement('div').style ? 'webkitTransform' : 'transform';
  return function(x, y, z) {
  this.dom.style[transformStyleName] = 'translate3d(' + (x || 0) + 'px, ' + (y || 0) + 'px, ' + (z || 0) + 'px)';
};
}()});

Ext.dom.Element.addMembers({getParent: function() {
  return Ext.get(this.dom.parentNode);
}, getFirstChild: function() {
  return Ext.get(this.dom.firstElementChild);
}, contains: function(element) {
  if (!element) 
  {
    return false;
  }
  var dom = Ext.getDom(element);
  return (dom === this.dom) || this.self.isAncestor(this.dom, dom);
}, findParent: function(simpleSelector, maxDepth, returnEl) {
  var p = this.dom, b = document.body, depth = 0, stopEl;
  maxDepth = maxDepth || 50;
  if (isNaN(maxDepth)) 
  {
    stopEl = Ext.getDom(maxDepth);
    maxDepth = Number.MAX_VALUE;
  }
  while (p && p.nodeType == 1 && depth < maxDepth && p != b && p != stopEl) 
    {
      if (Ext.DomQuery.is(p, simpleSelector)) 
      {
        return returnEl ? Ext.get(p) : p;
      }
      depth++;
      p = p.parentNode;
    }
  return null;
}, findParentNode: function(simpleSelector, maxDepth, returnEl) {
  var p = Ext.fly(this.dom.parentNode, '_internal');
  return p ? p.findParent(simpleSelector, maxDepth, returnEl) : null;
}, up: function(simpleSelector, maxDepth) {
  return this.findParentNode(simpleSelector, maxDepth, true);
}, select: function(selector, composite) {
  return Ext.dom.Element.select(selector, composite, this.dom);
}, query: function(selector) {
  return Ext.DomQuery.select(selector, this.dom);
}, down: function(selector, returnDom) {
  var n = Ext.DomQuery.selectNode(selector, this.dom);
  return returnDom ? n : Ext.get(n);
}, child: function(selector, returnDom) {
  var node, me = this, id;
  id = Ext.get(me).id;
  id = id.replace(/[\.:]/g, "\\$0");
  node = Ext.DomQuery.selectNode('#' + id + " > " + selector, me.dom);
  return returnDom ? node : Ext.get(node);
}, parent: function(selector, returnDom) {
  return this.matchNode('parentNode', 'parentNode', selector, returnDom);
}, next: function(selector, returnDom) {
  return this.matchNode('nextSibling', 'nextSibling', selector, returnDom);
}, prev: function(selector, returnDom) {
  return this.matchNode('previousSibling', 'previousSibling', selector, returnDom);
}, first: function(selector, returnDom) {
  return this.matchNode('nextSibling', 'firstChild', selector, returnDom);
}, last: function(selector, returnDom) {
  return this.matchNode('previousSibling', 'lastChild', selector, returnDom);
}, matchNode: function(dir, start, selector, returnDom) {
  if (!this.dom) 
  {
    return null;
  }
  var n = this.dom[start];
  while (n) 
    {
      if (n.nodeType == 1 && (!selector || Ext.DomQuery.is(n, selector))) 
      {
        return !returnDom ? Ext.get(n) : n;
      }
      n = n[dir];
    }
  return null;
}, isAncestor: function(element) {
  return this.self.isAncestor.call(this.self, this.dom, element);
}});

Ext.define('Ext.dom.CompositeElementLite', {alternateClassName: ['Ext.CompositeElementLite', 'Ext.CompositeElement'], statics: {importElementMethods: function() {
}}, constructor: function(elements, root) {
  this.elements = [];
  this.add(elements, root);
  this.el = new Ext.dom.Element.Fly();
}, isComposite: true, getElement: function(el) {
  return this.el.attach(el).synchronize();
}, transformElement: function(el) {
  return Ext.getDom(el);
}, getCount: function() {
  return this.elements.length;
}, add: function(els, root) {
  var elements = this.elements, i, ln;
  if (!els) 
  {
    return this;
  }
  if (typeof els == "string") 
  {
    els = Ext.dom.Element.selectorFunction(els, root);
  } else if (els.isComposite) 
  {
    els = els.elements;
  } else if (!Ext.isIterable(els)) 
  {
    els = [els];
  }
  for (i = 0 , ln = els.length; i < ln; ++i) 
    {
      elements.push(this.transformElement(els[i]));
    }
  return this;
}, invoke: function(fn, args) {
  var elements = this.elements, ln = elements.length, element, i;
  for (i = 0; i < ln; i++) 
    {
      element = elements[i];
      if (element) 
      {
        Ext.dom.Element.prototype[fn].apply(this.getElement(element), args);
      }
    }
  return this;
}, item: function(index) {
  var el = this.elements[index], out = null;
  if (el) 
  {
    out = this.getElement(el);
  }
  return out;
}, addListener: function(eventName, handler, scope, opt) {
  var els = this.elements, len = els.length, i, e;
  for (i = 0; i < len; i++) 
    {
      e = els[i];
      if (e) 
      {
        e.on(eventName, handler, scope || e, opt);
      }
    }
  return this;
}, each: function(fn, scope) {
  var me = this, els = me.elements, len = els.length, i, e;
  for (i = 0; i < len; i++) 
    {
      e = els[i];
      if (e) 
      {
        e = this.getElement(e);
        if (fn.call(scope || e, e, me, i) === false) 
        {
          break;
        }
      }
    }
  return me;
}, fill: function(els) {
  var me = this;
  me.elements = [];
  me.add(els);
  return me;
}, filter: function(selector) {
  var els = [], me = this, fn = Ext.isFunction(selector) ? selector : function(el) {
  return el.is(selector);
};
  me.each(function(el, self, i) {
  if (fn(el, i) !== false) 
  {
    els[els.length] = me.transformElement(el);
  }
});
  me.elements = els;
  return me;
}, indexOf: function(el) {
  return Ext.Array.indexOf(this.elements, this.transformElement(el));
}, replaceElement: function(el, replacement, domReplace) {
  var index = !isNaN(el) ? el : this.indexOf(el), d;
  if (index > -1) 
  {
    replacement = Ext.getDom(replacement);
    if (domReplace) 
    {
      d = this.elements[index];
      d.parentNode.insertBefore(replacement, d);
      Ext.removeNode(d);
    }
    Ext.Array.splice(this.elements, index, 1, replacement);
  }
  return this;
}, clear: function() {
  this.elements = [];
}, addElements: function(els, root) {
  if (!els) 
  {
    return this;
  }
  if (typeof els == "string") 
  {
    els = Ext.dom.Element.selectorFunction(els, root);
  }
  var yels = this.elements;
  Ext.each(els, function(e) {
  yels.push(Ext.get(e));
});
  return this;
}, first: function() {
  return this.item(0);
}, last: function() {
  return this.item(this.getCount() - 1);
}, contains: function(el) {
  return this.indexOf(el) != -1;
}, removeElement: function(keys, removeDom) {
  var me = this, elements = this.elements, el;
  Ext.each(keys, function(val) {
  if ((el = (elements[val] || elements[val = me.indexOf(val)]))) 
  {
    if (removeDom) 
    {
      if (el.dom) 
      {
        el.remove();
      } else {
        Ext.removeNode(el);
      }
    }
    Ext.Array.erase(elements, val, 1);
  }
});
  return this;
}}, function() {
  var Element = Ext.dom.Element, elementPrototype = Element.prototype, prototype = this.prototype, name;
  for (name in elementPrototype) 
    {
      if (typeof elementPrototype[name] == 'function') 
      {
        (function(key) {
  if (key === 'destroy') 
  {
    prototype[key] = function() {
  return this.invoke(key, arguments);
};
  } else {
    prototype[key] = prototype[key] || function() {
  return this.invoke(key, arguments);
};
  }
}).call(prototype, name);
      }
    }
  prototype.on = prototype.addListener;
  Element.selectorFunction = Ext.DomQuery.select;
  Ext.dom.Element.select = function(selector, composite, root) {
  var elements;
  if (typeof selector == "string") 
  {
    elements = Ext.dom.Element.selectorFunction(selector, root);
  } else if (selector.length !== undefined) 
  {
    elements = selector;
  } else {
  }
  return (composite === true) ? new Ext.dom.CompositeElement(elements) : new Ext.dom.CompositeElementLite(elements);
};
  Ext.select = function() {
  return Element.select.apply(Element, arguments);
};
});

Ext.define('Ext.event.ListenerStack', {currentOrder: 'current', length: 0, constructor: function() {
  this.listeners = {before: [], current: [], after: []};
  this.lateBindingMap = {};
  return this;
}, add: function(fn, scope, options, order) {
  var lateBindingMap = this.lateBindingMap, listeners = this.getAll(order), i = listeners.length, bindingMap, listener, id;
  if (typeof fn == 'string' && scope.isIdentifiable) 
  {
    id = scope.getId();
    bindingMap = lateBindingMap[id];
    if (bindingMap) 
    {
      if (bindingMap[fn]) 
      {
        return false;
      } else {
        bindingMap[fn] = true;
      }
    } else {
      lateBindingMap[id] = bindingMap = {};
      bindingMap[fn] = true;
    }
  } else {
    if (i > 0) 
    {
      while (i--) 
        {
          listener = listeners[i];
          if (listener.fn === fn && listener.scope === scope) 
          {
            listener.options = options;
            return false;
          }
        }
    }
  }
  listener = this.create(fn, scope, options, order);
  if (options && options.prepend) 
  {
    delete options.prepend;
    listeners.unshift(listener);
  } else {
    listeners.push(listener);
  }
  this.length++;
  return true;
}, getAt: function(index, order) {
  return this.getAll(order)[index];
}, getAll: function(order) {
  if (!order) 
  {
    order = this.currentOrder;
  }
  return this.listeners[order];
}, count: function(order) {
  return this.getAll(order).length;
}, create: function(fn, scope, options, order) {
  return {stack: this, fn: fn, firingFn: false, boundFn: false, isLateBinding: typeof fn == 'string', scope: scope, options: options || {}, order: order};
}, remove: function(fn, scope, order) {
  var listeners = this.getAll(order), i = listeners.length, isRemoved = false, lateBindingMap = this.lateBindingMap, listener, id;
  if (i > 0) 
  {
    while (i--) 
      {
        listener = listeners[i];
        if (listener.fn === fn && listener.scope === scope) 
        {
          listeners.splice(i, 1);
          isRemoved = true;
          this.length--;
          if (typeof fn == 'string' && scope.isIdentifiable) 
          {
            id = scope.getId();
            if (lateBindingMap[id] && lateBindingMap[id][fn]) 
            {
              delete lateBindingMap[id][fn];
            }
          }
          break;
        }
      }
  }
  return isRemoved;
}});

Ext.define('Ext.event.Controller', {isFiring: false, listenerStack: null, constructor: function(info) {
  this.firingListeners = [];
  this.firingArguments = [];
  this.setInfo(info);
  return this;
}, setInfo: function(info) {
  this.info = info;
}, getInfo: function() {
  return this.info;
}, setListenerStacks: function(listenerStacks) {
  this.listenerStacks = listenerStacks;
}, fire: function(args, action) {
  var listenerStacks = this.listenerStacks, firingListeners = this.firingListeners, firingArguments = this.firingArguments, push = firingListeners.push, ln = listenerStacks.length, listeners, beforeListeners, currentListeners, afterListeners, isActionBefore = false, isActionAfter = false, i;
  firingListeners.length = 0;
  if (action) 
  {
    if (action.order !== 'after') 
    {
      isActionBefore = true;
    } else {
      isActionAfter = true;
    }
  }
  if (ln === 1) 
  {
    listeners = listenerStacks[0].listeners;
    beforeListeners = listeners.before;
    currentListeners = listeners.current;
    afterListeners = listeners.after;
    if (beforeListeners.length > 0) 
    {
      push.apply(firingListeners, beforeListeners);
    }
    if (isActionBefore) 
    {
      push.call(firingListeners, action);
    }
    if (currentListeners.length > 0) 
    {
      push.apply(firingListeners, currentListeners);
    }
    if (isActionAfter) 
    {
      push.call(firingListeners, action);
    }
    if (afterListeners.length > 0) 
    {
      push.apply(firingListeners, afterListeners);
    }
  } else {
    for (i = 0; i < ln; i++) 
      {
        beforeListeners = listenerStacks[i].listeners.before;
        if (beforeListeners.length > 0) 
        {
          push.apply(firingListeners, beforeListeners);
        }
      }
    if (isActionBefore) 
    {
      push.call(firingListeners, action);
    }
    for (i = 0; i < ln; i++) 
      {
        currentListeners = listenerStacks[i].listeners.current;
        if (currentListeners.length > 0) 
        {
          push.apply(firingListeners, currentListeners);
        }
      }
    if (isActionAfter) 
    {
      push.call(firingListeners, action);
    }
    for (i = 0; i < ln; i++) 
      {
        afterListeners = listenerStacks[i].listeners.after;
        if (afterListeners.length > 0) 
        {
          push.apply(firingListeners, afterListeners);
        }
      }
  }
  if (firingListeners.length === 0) 
  {
    return this;
  }
  if (!args) 
  {
    args = [];
  }
  firingArguments.length = 0;
  firingArguments.push.apply(firingArguments, args);
  firingArguments.push(null, this);
  this.doFire();
  return this;
}, doFire: function() {
  var firingListeners = this.firingListeners, firingArguments = this.firingArguments, optionsArgumentIndex = firingArguments.length - 2, i, ln, listener, options, fn, firingFn, boundFn, isLateBinding, scope, args, result;
  this.isPausing = false;
  this.isPaused = false;
  this.isStopped = false;
  this.isFiring = true;
  for (i = 0 , ln = firingListeners.length; i < ln; i++) 
    {
      listener = firingListeners[i];
      options = listener.options;
      fn = listener.fn;
      firingFn = listener.firingFn;
      boundFn = listener.boundFn;
      isLateBinding = listener.isLateBinding;
      scope = listener.scope;
      if (isLateBinding && boundFn && boundFn !== scope[fn]) 
      {
        boundFn = false;
        firingFn = false;
      }
      if (!boundFn) 
      {
        if (isLateBinding) 
        {
          boundFn = scope[fn];
          if (!boundFn) 
          {
            continue;
          }
        } else {
          boundFn = fn;
        }
        listener.boundFn = boundFn;
      }
      if (!firingFn) 
      {
        firingFn = boundFn;
        if (options.buffer) 
        {
          firingFn = Ext.Function.createBuffered(firingFn, options.buffer, scope);
        }
        if (options.delay) 
        {
          firingFn = Ext.Function.createDelayed(firingFn, options.delay, scope);
        }
        listener.firingFn = firingFn;
      }
      firingArguments[optionsArgumentIndex] = options;
      args = firingArguments;
      if (options.args) 
      {
        args = options.args.concat(args);
      }
      if (options.single === true) 
      {
        listener.stack.remove(fn, scope, listener.order);
      }
      result = firingFn.apply(scope, args);
      if (result === false) 
      {
        this.stop();
      }
      if (this.isStopped) 
      {
        break;
      }
      if (this.isPausing) 
      {
        this.isPaused = true;
        firingListeners.splice(0, i + 1);
        return;
      }
    }
  this.isFiring = false;
  this.listenerStacks = null;
  firingListeners.length = 0;
  firingArguments.length = 0;
  this.connectingController = null;
}, connect: function(controller) {
  this.connectingController = controller;
}, resume: function() {
  var connectingController = this.connectingController;
  this.isPausing = false;
  if (this.isPaused && this.firingListeners.length > 0) 
  {
    this.isPaused = false;
    this.doFire();
  }
  if (connectingController) 
  {
    connectingController.resume();
  }
  return this;
}, isInterrupted: function() {
  return this.isStopped || this.isPaused;
}, stop: function() {
  var connectingController = this.connectingController;
  this.isStopped = true;
  if (connectingController) 
  {
    this.connectingController = null;
    connectingController.stop();
  }
  this.isFiring = false;
  this.listenerStacks = null;
  return this;
}, pause: function() {
  var connectingController = this.connectingController;
  this.isPausing = true;
  if (connectingController) 
  {
    connectingController.pause();
  }
  return this;
}});

Ext.define('Ext.event.Dispatcher', {statics: {getInstance: function() {
  if (!this.instance) 
  {
    this.instance = new this();
  }
  return this.instance;
}, setInstance: function(instance) {
  this.instance = instance;
  return this;
}}, config: {publishers: {}}, wildcard: '*', constructor: function(config) {
  this.listenerStacks = {};
  this.activePublishers = {};
  this.publishersCache = {};
  this.noActivePublishers = [];
  this.controller = null;
  this.initConfig(config);
  return this;
}, getListenerStack: function(targetType, target, eventName, createIfNotExist) {
  var listenerStacks = this.listenerStacks, map = listenerStacks[targetType], listenerStack;
  createIfNotExist = Boolean(createIfNotExist);
  if (!map) 
  {
    if (createIfNotExist) 
    {
      listenerStacks[targetType] = map = {};
    } else {
      return null;
    }
  }
  map = map[target];
  if (!map) 
  {
    if (createIfNotExist) 
    {
      listenerStacks[targetType][target] = map = {};
    } else {
      return null;
    }
  }
  listenerStack = map[eventName];
  if (!listenerStack) 
  {
    if (createIfNotExist) 
    {
      map[eventName] = listenerStack = new Ext.event.ListenerStack();
    } else {
      return null;
    }
  }
  return listenerStack;
}, getController: function(targetType, target, eventName, connectedController) {
  var controller = this.controller, info = {targetType: targetType, target: target, eventName: eventName};
  if (!controller) 
  {
    this.controller = controller = new Ext.event.Controller();
  }
  if (controller.isFiring) 
  {
    controller = new Ext.event.Controller();
  }
  controller.setInfo(info);
  if (connectedController && controller !== connectedController) 
  {
    controller.connect(connectedController);
  }
  return controller;
}, applyPublishers: function(publishers) {
  var i, publisher;
  this.publishersCache = {};
  for (i in publishers) 
    {
      if (publishers.hasOwnProperty(i)) 
      {
        publisher = publishers[i];
        this.registerPublisher(publisher);
      }
    }
  return publishers;
}, registerPublisher: function(publisher) {
  var activePublishers = this.activePublishers, targetType = publisher.getTargetType(), publishers = activePublishers[targetType];
  if (!publishers) 
  {
    activePublishers[targetType] = publishers = [];
  }
  publishers.push(publisher);
  publisher.setDispatcher(this);
  return this;
}, getCachedActivePublishers: function(targetType, eventName) {
  var cache = this.publishersCache, publishers;
  if ((publishers = cache[targetType]) && (publishers = publishers[eventName])) 
  {
    return publishers;
  }
  return null;
}, cacheActivePublishers: function(targetType, eventName, publishers) {
  var cache = this.publishersCache;
  if (!cache[targetType]) 
  {
    cache[targetType] = {};
  }
  cache[targetType][eventName] = publishers;
  return publishers;
}, getActivePublishers: function(targetType, eventName) {
  var publishers, activePublishers, i, ln, publisher;
  if ((publishers = this.getCachedActivePublishers(targetType, eventName))) 
  {
    return publishers;
  }
  activePublishers = this.activePublishers[targetType];
  if (activePublishers) 
  {
    publishers = [];
    for (i = 0 , ln = activePublishers.length; i < ln; i++) 
      {
        publisher = activePublishers[i];
        if (publisher.handles(eventName)) 
        {
          publishers.push(publisher);
        }
      }
  } else {
    publishers = this.noActivePublishers;
  }
  return this.cacheActivePublishers(targetType, eventName, publishers);
}, hasListener: function(targetType, target, eventName) {
  var listenerStack = this.getListenerStack(targetType, target, eventName);
  if (listenerStack) 
  {
    return listenerStack.count() > 0;
  }
  return false;
}, addListener: function(targetType, target, eventName) {
  var publishers = this.getActivePublishers(targetType, eventName), ln = publishers.length, i, result;
  result = this.doAddListener.apply(this, arguments);
  if (result && ln > 0) 
  {
    for (i = 0; i < ln; i++) 
      {
        publishers[i].subscribe(target, eventName);
      }
  }
  return result;
}, doAddListener: function(targetType, target, eventName, fn, scope, options, order) {
  var listenerStack = this.getListenerStack(targetType, target, eventName, true);
  return listenerStack.add(fn, scope, options, order);
}, removeListener: function(targetType, target, eventName) {
  var publishers = this.getActivePublishers(targetType, eventName), ln = publishers.length, i, result;
  result = this.doRemoveListener.apply(this, arguments);
  if (result && ln > 0) 
  {
    for (i = 0; i < ln; i++) 
      {
        publishers[i].unsubscribe(target, eventName);
      }
  }
  return result;
}, doRemoveListener: function(targetType, target, eventName, fn, scope, order) {
  var listenerStack = this.getListenerStack(targetType, target, eventName);
  if (listenerStack === null) 
  {
    return false;
  }
  return listenerStack.remove(fn, scope, order);
}, clearListeners: function(targetType, target, eventName) {
  var listenerStacks = this.listenerStacks, ln = arguments.length, stacks, publishers, i, publisherGroup;
  if (ln === 3) 
  {
    if (listenerStacks[targetType] && listenerStacks[targetType][target]) 
    {
      this.removeListener(targetType, target, eventName);
      delete listenerStacks[targetType][target][eventName];
    }
  } else if (ln === 2) 
  {
    if (listenerStacks[targetType]) 
    {
      stacks = listenerStacks[targetType][target];
      if (stacks) 
      {
        for (eventName in stacks) 
          {
            if (stacks.hasOwnProperty(eventName)) 
            {
              publishers = this.getActivePublishers(targetType, eventName);
              for (i = 0 , ln = publishers.length; i < ln; i++) 
                {
                  publishers[i].unsubscribe(target, eventName, true);
                }
            }
          }
        delete listenerStacks[targetType][target];
      }
    }
  } else if (ln === 1) 
  {
    publishers = this.activePublishers[targetType];
    for (i = 0 , ln = publishers.length; i < ln; i++) 
      {
        publishers[i].unsubscribeAll();
      }
    delete listenerStacks[targetType];
  } else {
    publishers = this.activePublishers;
    for (targetType in publishers) 
      {
        if (publishers.hasOwnProperty(targetType)) 
        {
          publisherGroup = publishers[targetType];
          for (i = 0 , ln = publisherGroup.length; i < ln; i++) 
            {
              publisherGroup[i].unsubscribeAll();
            }
        }
      }
    delete this.listenerStacks;
    this.listenerStacks = {};
  }
  return this;
}, dispatchEvent: function(targetType, target, eventName) {
  var publishers = this.getActivePublishers(targetType, eventName), ln = publishers.length, i;
  if (ln > 0) 
  {
    for (i = 0; i < ln; i++) 
      {
        publishers[i].notify(target, eventName);
      }
  }
  return this.doDispatchEvent.apply(this, arguments);
}, doDispatchEvent: function(targetType, target, eventName, args, action, connectedController) {
  var listenerStack = this.getListenerStack(targetType, target, eventName), wildcardStacks = this.getWildcardListenerStacks(targetType, target, eventName), controller;
  if ((listenerStack === null || listenerStack.length == 0)) 
  {
    if (wildcardStacks.length == 0 && !action) 
    {
      return;
    }
  } else {
    wildcardStacks.push(listenerStack);
  }
  controller = this.getController(targetType, target, eventName, connectedController);
  controller.setListenerStacks(wildcardStacks);
  controller.fire(args, action);
  return !controller.isInterrupted();
}, getWildcardListenerStacks: function(targetType, target, eventName) {
  var stacks = [], wildcard = this.wildcard, isEventNameNotWildcard = eventName !== wildcard, isTargetNotWildcard = target !== wildcard, stack;
  if (isEventNameNotWildcard && (stack = this.getListenerStack(targetType, target, wildcard))) 
  {
    stacks.push(stack);
  }
  if (isTargetNotWildcard && (stack = this.getListenerStack(targetType, wildcard, eventName))) 
  {
    stacks.push(stack);
  }
  return stacks;
}, getPublisher: function(name) {
  return this.getPublishers()[name];
}});

Ext.define('Ext.mixin.Mixin', {onClassExtended: function(cls, data) {
  var mixinConfig = data.mixinConfig, parentClassMixinConfig, beforeHooks, afterHooks;
  if (mixinConfig) 
  {
    parentClassMixinConfig = cls.superclass.mixinConfig;
    if (parentClassMixinConfig) 
    {
      mixinConfig = data.mixinConfig = Ext.merge({}, parentClassMixinConfig, mixinConfig);
    }
    data.mixinId = mixinConfig.id;
    beforeHooks = mixinConfig.beforeHooks;
    afterHooks = mixinConfig.hooks || mixinConfig.afterHooks;
    if (beforeHooks || afterHooks) 
    {
      Ext.Function.interceptBefore(data, 'onClassMixedIn', function(targetClass) {
  var mixin = this.prototype;
  if (beforeHooks) 
  {
    Ext.Object.each(beforeHooks, function(from, to) {
  targetClass.override(to, function() {
  if (mixin[from].apply(this, arguments) !== false) 
  {
    return this.callOverridden(arguments);
  }
});
});
  }
  if (afterHooks) 
  {
    Ext.Object.each(afterHooks, function(from, to) {
  targetClass.override(to, function() {
  var ret = this.callOverridden(arguments);
  mixin[from].apply(this, arguments);
  return ret;
});
});
  }
});
    }
  }
}});

Ext.define('Ext.mixin.Observable', {extend: 'Ext.mixin.Mixin', mixins: ['Ext.mixin.Identifiable'], mixinConfig: {id: 'observable', hooks: {destroy: 'destroy'}}, alternateClassName: 'Ext.util.Observable', isObservable: true, observableType: 'observable', validIdRegex: /^([\w\-]+)$/, observableIdPrefix: '#', listenerOptionsRegex: /^(?:delegate|single|delay|buffer|args|prepend)$/, eventFiringSuspended: false, config: {listeners: null, bubbleEvents: null}, constructor: function(config) {
  this.initConfig(config);
}, applyListeners: function(listeners) {
  if (listeners) 
  {
    this.addListener(listeners);
  }
}, applyBubbleEvents: function(bubbleEvents) {
  if (bubbleEvents) 
  {
    this.enableBubble(bubbleEvents);
  }
}, getOptimizedObservableId: function() {
  return this.observableId;
}, getObservableId: function() {
  if (!this.observableId) 
  {
    var id = this.getUniqueId();
    this.observableId = this.observableIdPrefix + id;
    this.getObservableId = this.getOptimizedObservableId;
  }
  return this.observableId;
}, getOptimizedEventDispatcher: function() {
  return this.eventDispatcher;
}, getEventDispatcher: function() {
  if (!this.eventDispatcher) 
  {
    this.eventDispatcher = Ext.event.Dispatcher.getInstance();
    this.getEventDispatcher = this.getOptimizedEventDispatcher;
    this.getListeners();
    this.getBubbleEvents();
  }
  return this.eventDispatcher;
}, getManagedListeners: function(object, eventName) {
  var id = object.getUniqueId(), managedListeners = this.managedListeners;
  if (!managedListeners) 
  {
    this.managedListeners = managedListeners = {};
  }
  if (!managedListeners[id]) 
  {
    managedListeners[id] = {};
    object.doAddListener('destroy', 'clearManagedListeners', this, {single: true, args: [object]});
  }
  if (!managedListeners[id][eventName]) 
  {
    managedListeners[id][eventName] = [];
  }
  return managedListeners[id][eventName];
}, getUsedSelectors: function() {
  var selectors = this.usedSelectors;
  if (!selectors) 
  {
    selectors = this.usedSelectors = [];
    selectors.$map = {};
  }
  return selectors;
}, fireEvent: function(eventName) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this.doFireEvent(eventName, args);
}, fireAction: function(eventName, args, fn, scope, options, order) {
  var fnType = typeof fn, action;
  if (args === undefined) 
  {
    args = [];
  }
  if (fnType != 'undefined') 
  {
    action = {fn: fn, isLateBinding: fnType == 'string', scope: scope || this, options: options || {}, order: order};
  }
  return this.doFireEvent(eventName, args, action);
}, doFireEvent: function(eventName, args, action, connectedController) {
  var me = this, ret = true, eventQueue;
  if (me.eventFiringSuspended) 
  {
    eventQueue = me.eventQueue;
    if (!eventQueue) 
    {
      me.eventQueue = eventQueue = [];
    }
    eventQueue.push([eventName, args, action, connectedController]);
  } else {
    ret = me.getEventDispatcher().dispatchEvent(me.observableType, me.getObservableId(), eventName, args, action, connectedController);
  }
  return ret;
}, doAddListener: function(name, fn, scope, options, order) {
  var isManaged = (scope && scope !== this && scope.isIdentifiable), usedSelectors = this.getUsedSelectors(), usedSelectorsMap = usedSelectors.$map, selector = this.getObservableId(), isAdded, managedListeners, delegate;
  if (!options) 
  {
    options = {};
  }
  if (!scope) 
  {
    scope = this;
  }
  if (options.delegate) 
  {
    delegate = options.delegate;
    selector += ' ' + delegate;
  }
  if (!(selector in usedSelectorsMap)) 
  {
    usedSelectorsMap[selector] = true;
    usedSelectors.push(selector);
  }
  isAdded = this.addDispatcherListener(selector, name, fn, scope, options, order);
  if (isAdded && isManaged) 
  {
    managedListeners = this.getManagedListeners(scope, name);
    managedListeners.push({delegate: delegate, scope: scope, fn: fn, order: order});
  }
  return isAdded;
}, addDispatcherListener: function(selector, name, fn, scope, options, order) {
  return this.getEventDispatcher().addListener(this.observableType, selector, name, fn, scope, options, order);
}, doRemoveListener: function(name, fn, scope, options, order) {
  var isManaged = (scope && scope !== this && scope.isIdentifiable), selector = this.getObservableId(), isRemoved, managedListeners, i, ln, listener, delegate;
  if (options && options.delegate) 
  {
    delegate = options.delegate;
    selector += ' ' + delegate;
  }
  if (!scope) 
  {
    scope = this;
  }
  isRemoved = this.removeDispatcherListener(selector, name, fn, scope, order);
  if (isRemoved && isManaged) 
  {
    managedListeners = this.getManagedListeners(scope, name);
    for (i = 0 , ln = managedListeners.length; i < ln; i++) 
      {
        listener = managedListeners[i];
        if (listener.fn === fn && listener.scope === scope && listener.delegate === delegate && listener.order === order) 
        {
          managedListeners.splice(i, 1);
          break;
        }
      }
  }
  return isRemoved;
}, removeDispatcherListener: function(selector, name, fn, scope, order) {
  return this.getEventDispatcher().removeListener(this.observableType, selector, name, fn, scope, order);
}, clearManagedListeners: function(object) {
  var managedListeners = this.managedListeners, id, namedListeners, listeners, eventName, i, ln, listener, options;
  if (!managedListeners) 
  {
    return this;
  }
  if (object) 
  {
    if (typeof object != 'string') 
    {
      id = object.getUniqueId();
    } else {
      id = object;
    }
    namedListeners = managedListeners[id];
    for (eventName in namedListeners) 
      {
        if (namedListeners.hasOwnProperty(eventName)) 
        {
          listeners = namedListeners[eventName];
          for (i = 0 , ln = listeners.length; i < ln; i++) 
            {
              listener = listeners[i];
              options = {};
              if (listener.delegate) 
              {
                options.delegate = listener.delegate;
              }
              if (this.doRemoveListener(eventName, listener.fn, listener.scope, options, listener.order)) 
              {
                i--;
                ln--;
              }
            }
        }
      }
    delete managedListeners[id];
    return this;
  }
  for (id in managedListeners) 
    {
      if (managedListeners.hasOwnProperty(id)) 
      {
        this.clearManagedListeners(id);
      }
    }
}, changeListener: function(actionFn, eventName, fn, scope, options, order) {
  var eventNames, listeners, listenerOptionsRegex, actualOptions, name, value, i, ln, listener, valueType;
  if (typeof fn != 'undefined') 
  {
    if (typeof eventName != 'string') 
    {
      for (i = 0 , ln = eventName.length; i < ln; i++) 
        {
          name = eventName[i];
          actionFn.call(this, name, fn, scope, options, order);
        }
      return this;
    }
    actionFn.call(this, eventName, fn, scope, options, order);
  } else if (Ext.isArray(eventName)) 
  {
    listeners = eventName;
    for (i = 0 , ln = listeners.length; i < ln; i++) 
      {
        listener = listeners[i];
        actionFn.call(this, listener.event, listener.fn, listener.scope, listener, listener.order);
      }
  } else {
    listenerOptionsRegex = this.listenerOptionsRegex;
    options = eventName;
    eventNames = [];
    listeners = [];
    actualOptions = {};
    for (name in options) 
      {
        value = options[name];
        if (name === 'scope') 
        {
          scope = value;
          continue;
        } else if (name === 'order') 
        {
          order = value;
          continue;
        }
        if (!listenerOptionsRegex.test(name)) 
        {
          valueType = typeof value;
          if (valueType != 'string' && valueType != 'function') 
          {
            actionFn.call(this, name, value.fn, value.scope || scope, value, value.order || order);
            continue;
          }
          eventNames.push(name);
          listeners.push(value);
        } else {
          actualOptions[name] = value;
        }
      }
    for (i = 0 , ln = eventNames.length; i < ln; i++) 
      {
        actionFn.call(this, eventNames[i], listeners[i], scope, actualOptions, order);
      }
  }
  return this;
}, addListener: function(eventName, fn, scope, options, order) {
  return this.changeListener(this.doAddListener, eventName, fn, scope, options, order);
}, toggleListener: function(toggle, eventName, fn, scope, options, order) {
  return this.changeListener(toggle ? this.doAddListener : this.doRemoveListener, eventName, fn, scope, options, order);
}, addBeforeListener: function(eventName, fn, scope, options) {
  return this.addListener(eventName, fn, scope, options, 'before');
}, addAfterListener: function(eventName, fn, scope, options) {
  return this.addListener(eventName, fn, scope, options, 'after');
}, removeListener: function(eventName, fn, scope, options, order) {
  return this.changeListener(this.doRemoveListener, eventName, fn, scope, options, order);
}, removeBeforeListener: function(eventName, fn, scope, options) {
  return this.removeListener(eventName, fn, scope, options, 'before');
}, removeAfterListener: function(eventName, fn, scope, options) {
  return this.removeListener(eventName, fn, scope, options, 'after');
}, clearListeners: function() {
  var usedSelectors = this.getUsedSelectors(), dispatcher = this.getEventDispatcher(), i, ln, selector;
  for (i = 0 , ln = usedSelectors.length; i < ln; i++) 
    {
      selector = usedSelectors[i];
      dispatcher.clearListeners(this.observableType, selector);
    }
}, hasListener: function(eventName) {
  return this.getEventDispatcher().hasListener(this.observableType, this.getObservableId(), eventName);
}, suspendEvents: function() {
  this.eventFiringSuspended = true;
}, resumeEvents: function(discardQueuedEvents) {
  var me = this, eventQueue = me.eventQueue || [], i, ln;
  me.eventFiringSuspended = false;
  if (!discardQueuedEvents) 
  {
    for (i = 0 , ln = eventQueue.length; i < ln; i++) 
      {
        me.doFireEvent.apply(me, eventQueue[i]);
      }
  }
  me.eventQueue = [];
}, relayEvents: function(object, events, prefix) {
  var i, ln, oldName, newName;
  if (typeof prefix == 'undefined') 
  {
    prefix = '';
  }
  if (typeof events == 'string') 
  {
    events = [events];
  }
  if (Ext.isArray(events)) 
  {
    for (i = 0 , ln = events.length; i < ln; i++) 
      {
        oldName = events[i];
        newName = prefix + oldName;
        object.addListener(oldName, this.createEventRelayer(newName), this);
      }
  } else {
    for (oldName in events) 
      {
        if (events.hasOwnProperty(oldName)) 
        {
          newName = prefix + events[oldName];
          object.addListener(oldName, this.createEventRelayer(newName), this);
        }
      }
  }
  return this;
}, relayEvent: function(args, fn, scope, options, order) {
  var fnType = typeof fn, controller = args[args.length - 1], eventName = controller.getInfo().eventName, action;
  args = Array.prototype.slice.call(args, 0, -2);
  args[0] = this;
  if (fnType != 'undefined') 
  {
    action = {fn: fn, scope: scope || this, options: options || {}, order: order, isLateBinding: fnType == 'string'};
  }
  return this.doFireEvent(eventName, args, action, controller);
}, createEventRelayer: function(newName) {
  return function() {
  return this.doFireEvent(newName, Array.prototype.slice.call(arguments, 0, -2));
};
}, enableBubble: function(events) {
  var isBubblingEnabled = this.isBubblingEnabled, i, ln, name;
  if (!isBubblingEnabled) 
  {
    isBubblingEnabled = this.isBubblingEnabled = {};
  }
  if (typeof events == 'string') 
  {
    events = Ext.Array.clone(arguments);
  }
  for (i = 0 , ln = events.length; i < ln; i++) 
    {
      name = events[i];
      if (!isBubblingEnabled[name]) 
      {
        isBubblingEnabled[name] = true;
        this.addListener(name, this.createEventBubbler(name), this);
      }
    }
}, createEventBubbler: function(name) {
  return function doBubbleEvent() {
  var bubbleTarget = ('getBubbleTarget' in this) ? this.getBubbleTarget() : null;
  if (bubbleTarget && bubbleTarget !== this && bubbleTarget.isObservable) 
  {
    bubbleTarget.fireAction(name, Array.prototype.slice.call(arguments, 0, -2), doBubbleEvent, bubbleTarget, null, 'after');
  }
};
}, getBubbleTarget: function() {
  return false;
}, destroy: function() {
  if (this.observableId) 
  {
    this.fireEvent('destroy', this);
    this.clearListeners();
    this.clearManagedListeners();
  }
}, addEvents: Ext.emptyFn}, function() {
  this.createAlias({on: 'addListener', un: 'removeListener', onBefore: 'addBeforeListener', onAfter: 'addAfterListener', unBefore: 'removeBeforeListener', unAfter: 'removeAfterListener'});
});

Ext.define('Ext.Evented', {alternateClassName: 'Ext.EventedBase', mixins: ['Ext.mixin.Observable'], statics: {generateSetter: function(nameMap) {
  var internalName = nameMap.internal, applyName = nameMap.apply, changeEventName = nameMap.changeEvent, doSetName = nameMap.doSet;
  return function(value) {
  var initialized = this.initialized, oldValue = this[internalName], applier = this[applyName];
  if (applier) 
  {
    value = applier.call(this, value, oldValue);
    if (typeof value == 'undefined') 
    {
      return this;
    }
  }
  oldValue = this[internalName];
  if (value !== oldValue) 
  {
    if (initialized) 
    {
      this.fireAction(changeEventName, [this, value, oldValue], this.doSet, this, {nameMap: nameMap});
    } else {
      this[internalName] = value;
      if (this[doSetName]) 
      {
        this[doSetName].call(this, value, oldValue);
      }
    }
  }
  return this;
};
}}, initialized: false, constructor: function(config) {
  this.initialConfig = config;
  this.initialize();
}, initialize: function() {
  this.initConfig(this.initialConfig);
  this.initialized = true;
}, doSet: function(me, value, oldValue, options) {
  var nameMap = options.nameMap;
  me[nameMap.internal] = value;
  if (me[nameMap.doSet]) 
  {
    me[nameMap.doSet].call(this, value, oldValue);
  }
}, onClassExtended: function(Class, data) {
  if (!data.hasOwnProperty('eventedConfig')) 
  {
    return;
  }
  var ExtClass = Ext.Class, config = data.config, eventedConfig = data.eventedConfig, name, nameMap;
  data.config = (config) ? Ext.applyIf(config, eventedConfig) : eventedConfig;
  for (name in eventedConfig) 
    {
      if (eventedConfig.hasOwnProperty(name)) 
      {
        nameMap = ExtClass.getConfigNameMap(name);
        data[nameMap.set] = this.generateSetter(nameMap);
      }
    }
}});

Ext.define('Ext.AbstractComponent', {extend: 'Ext.Evented', onClassExtended: function(Class, members) {
  if (!members.hasOwnProperty('cachedConfig')) 
  {
    return;
  }
  var prototype = Class.prototype, config = members.config, cachedConfig = members.cachedConfig, cachedConfigList = prototype.cachedConfigList, hasCachedConfig = prototype.hasCachedConfig, name, value;
  delete members.cachedConfig;
  prototype.cachedConfigList = cachedConfigList = (cachedConfigList) ? cachedConfigList.slice() : [];
  prototype.hasCachedConfig = hasCachedConfig = (hasCachedConfig) ? Ext.Object.chain(hasCachedConfig) : {};
  if (!config) 
  {
    members.config = config = {};
  }
  for (name in cachedConfig) 
    {
      if (cachedConfig.hasOwnProperty(name)) 
      {
        value = cachedConfig[name];
        if (!hasCachedConfig[name]) 
        {
          hasCachedConfig[name] = true;
          cachedConfigList.push(name);
        }
        config[name] = value;
      }
    }
}, getElementConfig: Ext.emptyFn, referenceAttributeName: 'reference', referenceSelector: '[reference]', addReferenceNode: function(name, domNode) {
  Ext.Object.defineProperty(this, name, {get: function() {
  var reference;
  delete this[name];
  this[name] = reference = new Ext.Element(domNode);
  return reference;
}, configurable: true});
}, initElement: function() {
  var prototype = this.self.prototype, id = this.getId(), referenceList = [], cleanAttributes = true, referenceAttributeName = this.referenceAttributeName, needsOptimization = false, renderTemplate, renderElement, element, referenceNodes, i, ln, referenceNode, reference, configNameCache, defaultConfig, cachedConfigList, initConfigList, initConfigMap, configList, elements, name, nameMap, internalName;
  if (prototype.hasOwnProperty('renderTemplate')) 
  {
    renderTemplate = this.renderTemplate.cloneNode(true);
    renderElement = renderTemplate.firstChild;
  } else {
    cleanAttributes = false;
    needsOptimization = true;
    renderTemplate = document.createDocumentFragment();
    renderElement = Ext.Element.create(this.getElementConfig(), true);
    renderTemplate.appendChild(renderElement);
  }
  referenceNodes = renderTemplate.querySelectorAll(this.referenceSelector);
  for (i = 0 , ln = referenceNodes.length; i < ln; i++) 
    {
      referenceNode = referenceNodes[i];
      reference = referenceNode.getAttribute(referenceAttributeName);
      if (cleanAttributes) 
      {
        referenceNode.removeAttribute(referenceAttributeName);
      }
      if (reference == 'element') 
      {
        referenceNode.id = id;
        this.element = element = new Ext.Element(referenceNode);
      } else {
        this.addReferenceNode(reference, referenceNode);
      }
      referenceList.push(reference);
    }
  this.referenceList = referenceList;
  if (!this.innerElement) 
  {
    this.innerElement = element;
  }
  if (!this.bodyElement) 
  {
    this.bodyElement = this.innerElement;
  }
  if (renderElement === element.dom) 
  {
    this.renderElement = element;
  } else {
    this.addReferenceNode('renderElement', renderElement);
  }
  if (needsOptimization) 
  {
    configNameCache = Ext.Class.configNameCache;
    defaultConfig = this.config;
    cachedConfigList = this.cachedConfigList;
    initConfigList = this.initConfigList;
    initConfigMap = this.initConfigMap;
    configList = [];
    for (i = 0 , ln = cachedConfigList.length; i < ln; i++) 
      {
        name = cachedConfigList[i];
        nameMap = configNameCache[name];
        if (initConfigMap[name]) 
        {
          initConfigMap[name] = false;
          Ext.Array.remove(initConfigList, name);
        }
        if (defaultConfig[name] !== null) 
        {
          configList.push(name);
          this[nameMap.get] = this[nameMap.initGet];
        }
      }
    for (i = 0 , ln = configList.length; i < ln; i++) 
      {
        name = configList[i];
        nameMap = configNameCache[name];
        internalName = nameMap.internal;
        this[internalName] = null;
        this[nameMap.set].call(this, defaultConfig[name]);
        delete this[nameMap.get];
        prototype[internalName] = this[internalName];
      }
    renderElement = this.renderElement.dom;
    prototype.renderTemplate = renderTemplate = document.createDocumentFragment();
    renderTemplate.appendChild(renderElement.cloneNode(true));
    elements = renderTemplate.querySelectorAll('[id]');
    for (i = 0 , ln = elements.length; i < ln; i++) 
      {
        element = elements[i];
        element.removeAttribute('id');
      }
    for (i = 0 , ln = referenceList.length; i < ln; i++) 
      {
        reference = referenceList[i];
        this[reference].dom.removeAttribute('reference');
      }
  }
  return this;
}});

Ext.define('Ext.util.HashMap', {mixins: {observable: 'Ext.mixin.Observable'}, constructor: function(config) {
  this.callParent();
  this.mixins.observable.constructor.call(this);
  this.clear(true);
}, getCount: function() {
  return this.length;
}, getData: function(key, value) {
  if (value === undefined) 
  {
    value = key;
    key = this.getKey(value);
  }
  return [key, value];
}, getKey: function(o) {
  return o.id;
}, add: function(key, value) {
  var me = this, data;
  if (me.containsKey(key)) 
  {
    throw new Error('This key already exists in the HashMap');
  }
  data = this.getData(key, value);
  key = data[0];
  value = data[1];
  me.map[key] = value;
  ++me.length;
  me.fireEvent('add', me, key, value);
  return value;
}, replace: function(key, value) {
  var me = this, map = me.map, old;
  if (!me.containsKey(key)) 
  {
    me.add(key, value);
  }
  old = map[key];
  map[key] = value;
  me.fireEvent('replace', me, key, value, old);
  return value;
}, remove: function(o) {
  var key = this.findKey(o);
  if (key !== undefined) 
  {
    return this.removeByKey(key);
  }
  return false;
}, removeByKey: function(key) {
  var me = this, value;
  if (me.containsKey(key)) 
  {
    value = me.map[key];
    delete me.map[key];
    --me.length;
    me.fireEvent('remove', me, key, value);
    return true;
  }
  return false;
}, get: function(key) {
  return this.map[key];
}, clear: function(initial) {
  var me = this;
  me.map = {};
  me.length = 0;
  if (initial !== true) 
  {
    me.fireEvent('clear', me);
  }
  return me;
}, containsKey: function(key) {
  return this.map[key] !== undefined;
}, contains: function(value) {
  return this.containsKey(this.findKey(value));
}, getKeys: function() {
  return this.getArray(true);
}, getValues: function() {
  return this.getArray(false);
}, getArray: function(isKey) {
  var arr = [], key, map = this.map;
  for (key in map) 
    {
      if (map.hasOwnProperty(key)) 
      {
        arr.push(isKey ? key : map[key]);
      }
    }
  return arr;
}, each: function(fn, scope) {
  var items = Ext.apply({}, this.map), key, length = this.length;
  scope = scope || this;
  for (key in items) 
    {
      if (items.hasOwnProperty(key)) 
      {
        if (fn.call(scope, key, items[key], length) === false) 
        {
          break;
        }
      }
    }
  return this;
}, clone: function() {
  var hash = new Ext.util.HashMap(), map = this.map, key;
  hash.suspendEvents();
  for (key in map) 
    {
      if (map.hasOwnProperty(key)) 
      {
        hash.add(key, map[key]);
      }
    }
  hash.resumeEvents();
  return hash;
}, findKey: function(value) {
  var key, map = this.map;
  for (key in map) 
    {
      if (map.hasOwnProperty(key) && map[key] === value) 
      {
        return key;
      }
    }
  return undefined;
}});

Ext.define('Ext.AbstractManager', {typeName: 'type', constructor: function(config) {
  Ext.apply(this, config || {});
  this.all = Ext.create('Ext.util.HashMap');
  this.types = {};
}, get: function(id) {
  return this.all.get(id);
}, register: function(item) {
  this.all.add(item);
}, unregister: function(item) {
  this.all.remove(item);
}, registerType: function(type, cls) {
  this.types[type] = cls;
  cls[this.typeName] = type;
}, isRegistered: function(type) {
  return this.types[type] !== undefined;
}, create: function(config, defaultType) {
  var type = config[this.typeName] || config.type || defaultType, Constructor = this.types[type];
  return new Constructor(config);
}, onAvailable: function(id, fn, scope) {
  var all = this.all, item;
  if (all.containsKey(id)) 
  {
    item = all.get(id);
    fn.call(scope || item, item);
  } else {
    all.on('add', function(map, key, item) {
  if (key == id) 
  {
    fn.call(scope || item, item);
    all.un('add', fn, scope);
  }
});
  }
}, each: function(fn, scope) {
  this.all.each(fn, scope || this);
}, getCount: function() {
  return this.all.getCount();
}});

Ext.define('Ext.mixin.Traversable', {extend: 'Ext.mixin.Mixin', mixinConfig: {id: 'traversable'}, setParent: function(parent) {
  this.parent = parent;
  return this;
}, hasParent: function() {
  return Boolean(this.parent);
}, getParent: function() {
  return this.parent;
}, getAncestors: function() {
  var ancestors = [], parent = this.getParent();
  while (parent) 
    {
      ancestors.push(parent);
      parent = parent.getParent();
    }
  return ancestors;
}, getAncestorIds: function() {
  var ancestorIds = [], parent = this.getParent();
  while (parent) 
    {
      ancestorIds.push(parent.getId());
      parent = parent.getParent();
    }
  return ancestorIds;
}});

Ext.define('Ext.ComponentManager', {alternateClassName: 'Ext.ComponentMgr', singleton: true, constructor: function() {
  var map = {};
  this.all = {map: map, getArray: function() {
  var list = [], id;
  for (id in map) 
    {
      if (map.hasOwnProperty(id)) 
      {
        list.push(map[id]);
      }
    }
  return list;
}};
  this.map = map;
}, register: function(component) {
  var id = component.getId();
  this.map[component.getId()] = component;
}, unregister: function(component) {
  delete this.map[component.getId()];
}, isRegistered: function(component) {
  return this.map[component] !== undefined;
}, get: function(id) {
  return this.map[id];
}, create: function(component, defaultType) {
  if (component.isComponent) 
  {
    return component;
  } else if (Ext.isString(component)) 
  {
    return Ext.createByAlias('widget.' + component);
  } else {
    var type = component.xtype || defaultType;
    return Ext.createByAlias('widget.' + type, component);
  }
}, registerType: Ext.emptyFn});

(function() {
  function xf(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\{(\d+)\}/g, function(m, i) {
  return args[i];
});
  }
  Ext.DateExtras = {now: Date.now || function() {
  return +new Date();
}, getElapsed: function(dateA, dateB) {
  return Math.abs(dateA - (dateB || new Date()));
}, useStrict: false, formatCodeToRegex: function(character, currentGroup) {
  var p = utilDate.parseCodes[character];
  if (p) 
  {
    p = typeof p == 'function' ? p() : p;
    utilDate.parseCodes[character] = p;
  }
  return p ? Ext.applyIf({c: p.c ? xf(p.c, currentGroup || "{0}") : p.c}, p) : {g: 0, c: null, s: Ext.String.escapeRegex(character)};
}, parseFunctions: {"MS": function(input, strict) {
  var re = new RegExp('\\\\?/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\\\?/');
  var r = (input || '').match(re);
  return r ? new Date(((r[1] || '') + r[2]) * 1) : null;
}}, parseRegexes: [], formatFunctions: {"MS": function() {
  return '\\/Date(' + this.getTime() + ')\\/';
}}, y2kYear: 50, MILLI: "ms", SECOND: "s", MINUTE: "mi", HOUR: "h", DAY: "d", MONTH: "mo", YEAR: "y", defaults: {}, dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNumbers: {Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11}, defaultFormat: "m/d/Y", getShortMonthName: function(month) {
  return utilDate.monthNames[month].substring(0, 3);
}, getShortDayName: function(day) {
  return utilDate.dayNames[day].substring(0, 3);
}, getMonthNumber: function(name) {
  return utilDate.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
}, formatCodes: {d: "Ext.String.leftPad(this.getDate(), 2, '0')", D: "Ext.Date.getShortDayName(this.getDay())", j: "this.getDate()", l: "Ext.Date.dayNames[this.getDay()]", N: "(this.getDay() ? this.getDay() : 7)", S: "Ext.Date.getSuffix(this)", w: "this.getDay()", z: "Ext.Date.getDayOfYear(this)", W: "Ext.String.leftPad(Ext.Date.getWeekOfYear(this), 2, '0')", F: "Ext.Date.monthNames[this.getMonth()]", m: "Ext.String.leftPad(this.getMonth() + 1, 2, '0')", M: "Ext.Date.getShortMonthName(this.getMonth())", n: "(this.getMonth() + 1)", t: "Ext.Date.getDaysInMonth(this)", L: "(Ext.Date.isLeapYear(this) ? 1 : 0)", o: "(this.getFullYear() + (Ext.Date.getWeekOfYear(this) == 1 && this.getMonth() > 0 ? +1 : (Ext.Date.getWeekOfYear(this) >= 52 && this.getMonth() < 11 ? -1 : 0)))", Y: "Ext.String.leftPad(this.getFullYear(), 4, '0')", y: "('' + this.getFullYear()).substring(2, 4)", a: "(this.getHours() < 12 ? 'am' : 'pm')", A: "(this.getHours() < 12 ? 'AM' : 'PM')", g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)", G: "this.getHours()", h: "Ext.String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')", H: "Ext.String.leftPad(this.getHours(), 2, '0')", i: "Ext.String.leftPad(this.getMinutes(), 2, '0')", s: "Ext.String.leftPad(this.getSeconds(), 2, '0')", u: "Ext.String.leftPad(this.getMilliseconds(), 3, '0')", O: "Ext.Date.getGMTOffset(this)", P: "Ext.Date.getGMTOffset(this, true)", T: "Ext.Date.getTimezone(this)", Z: "(this.getTimezoneOffset() * -60)", c: function() {
  for (var c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) 
    {
      var e = c.charAt(i);
      code.push(e == "T" ? "'T'" : utilDate.getFormatCode(e));
    }
  return code.join(" + ");
}, U: "Math.round(this.getTime() / 1000)"}, isValid: function(y, m, d, h, i, s, ms) {
  h = h || 0;
  i = i || 0;
  s = s || 0;
  ms = ms || 0;
  var dt = utilDate.add(new Date(y < 100 ? 100 : y, m - 1, d, h, i, s, ms), utilDate.YEAR, y < 100 ? y - 100 : 0);
  return y == dt.getFullYear() && m == dt.getMonth() + 1 && d == dt.getDate() && h == dt.getHours() && i == dt.getMinutes() && s == dt.getSeconds() && ms == dt.getMilliseconds();
}, parse: function(input, format, strict) {
  var p = utilDate.parseFunctions;
  if (p[format] == null) 
  {
    utilDate.createParser(format);
  }
  return p[format](input, Ext.isDefined(strict) ? strict : utilDate.useStrict);
}, parseDate: function(input, format, strict) {
  return utilDate.parse(input, format, strict);
}, getFormatCode: function(character) {
  var f = utilDate.formatCodes[character];
  if (f) 
  {
    f = typeof f == 'function' ? f() : f;
    utilDate.formatCodes[character] = f;
  }
  return f || ("'" + Ext.String.escape(character) + "'");
}, createFormat: function(format) {
  var code = [], special = false, ch = '';
  for (var i = 0; i < format.length; ++i) 
    {
      ch = format.charAt(i);
      if (!special && ch == "\\") 
      {
        special = true;
      } else if (special) 
      {
        special = false;
        code.push("'" + Ext.String.escape(ch) + "'");
      } else if (ch == '\n') 
      {
        code.push(Ext.JSON.encode(ch));
      } else {
        code.push(utilDate.getFormatCode(ch));
      }
    }
  utilDate.formatFunctions[format] = Ext.functionFactory("return " + code.join('+'));
}, createParser: (function() {
  var code = ["var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,", "def = Ext.Date.defaults,", "results = String(input).match(Ext.Date.parseRegexes[{0}]);", "if(results){", "{1}", "if(u != null){", "v = new Date(u * 1000);", "}else{", "dt = Ext.Date.clearTime(new Date);", "y = Ext.Number.from(y, Ext.Number.from(def.y, dt.getFullYear()));", "m = Ext.Number.from(m, Ext.Number.from(def.m - 1, dt.getMonth()));", "d = Ext.Number.from(d, Ext.Number.from(def.d, dt.getDate()));", "h  = Ext.Number.from(h, Ext.Number.from(def.h, dt.getHours()));", "i  = Ext.Number.from(i, Ext.Number.from(def.i, dt.getMinutes()));", "s  = Ext.Number.from(s, Ext.Number.from(def.s, dt.getSeconds()));", "ms = Ext.Number.from(ms, Ext.Number.from(def.ms, dt.getMilliseconds()));", "if(z >= 0 && y >= 0){", "v = Ext.Date.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), Ext.Date.YEAR, y < 100 ? y - 100 : 0);", "v = !strict? v : (strict === true && (z <= 364 || (Ext.Date.isLeapYear(v) && z <= 365))? Ext.Date.add(v, Ext.Date.DAY, z) : null);", "}else if(strict === true && !Ext.Date.isValid(y, m + 1, d, h, i, s, ms)){", "v = null;", "}else{", "v = Ext.Date.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), Ext.Date.YEAR, y < 100 ? y - 100 : 0);", "}", "}", "}", "if(v){", "if(zz != null){", "v = Ext.Date.add(v, Ext.Date.SECOND, -v.getTimezoneOffset() * 60 - zz);", "}else if(o){", "v = Ext.Date.add(v, Ext.Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));", "}", "}", "return v;"].join('\n');
  return function(format) {
  var regexNum = utilDate.parseRegexes.length, currentGroup = 1, calc = [], regex = [], special = false, ch = "";
  for (var i = 0; i < format.length; ++i) 
    {
      ch = format.charAt(i);
      if (!special && ch == "\\") 
      {
        special = true;
      } else if (special) 
      {
        special = false;
        regex.push(Ext.String.escape(ch));
      } else {
        var obj = utilDate.formatCodeToRegex(ch, currentGroup);
        currentGroup += obj.g;
        regex.push(obj.s);
        if (obj.g && obj.c) 
        {
          calc.push(obj.c);
        }
      }
    }
  utilDate.parseRegexes[regexNum] = new RegExp("^" + regex.join('') + "$", 'i');
  utilDate.parseFunctions[format] = Ext.functionFactory("input", "strict", xf(code, regexNum, calc.join('')));
};
})(), parseCodes: {d: {g: 1, c: "d = parseInt(results[{0}], 10);\n", s: "(\\d{2})"}, j: {g: 1, c: "d = parseInt(results[{0}], 10);\n", s: "(\\d{1,2})"}, D: function() {
  for (var a = [], i = 0; i < 7; a.push(utilDate.getShortDayName(i)) , ++i) 
    ;
  return {g: 0, c: null, s: "(?:" + a.join("|") + ")"};
}, l: function() {
  return {g: 0, c: null, s: "(?:" + utilDate.dayNames.join("|") + ")"};
}, N: {g: 0, c: null, s: "[1-7]"}, S: {g: 0, c: null, s: "(?:st|nd|rd|th)"}, w: {g: 0, c: null, s: "[0-6]"}, z: {g: 1, c: "z = parseInt(results[{0}], 10);\n", s: "(\\d{1,3})"}, W: {g: 0, c: null, s: "(?:\\d{2})"}, F: function() {
  return {g: 1, c: "m = parseInt(Ext.Date.getMonthNumber(results[{0}]), 10);\n", s: "(" + utilDate.monthNames.join("|") + ")"};
}, M: function() {
  for (var a = [], i = 0; i < 12; a.push(utilDate.getShortMonthName(i)) , ++i) 
    ;
  return Ext.applyIf({s: "(" + a.join("|") + ")"}, utilDate.formatCodeToRegex("F"));
}, m: {g: 1, c: "m = parseInt(results[{0}], 10) - 1;\n", s: "(\\d{2})"}, n: {g: 1, c: "m = parseInt(results[{0}], 10) - 1;\n", s: "(\\d{1,2})"}, t: {g: 0, c: null, s: "(?:\\d{2})"}, L: {g: 0, c: null, s: "(?:1|0)"}, o: function() {
  return utilDate.formatCodeToRegex("Y");
}, Y: {g: 1, c: "y = parseInt(results[{0}], 10);\n", s: "(\\d{4})"}, y: {g: 1, c: "var ty = parseInt(results[{0}], 10);\n" + "y = ty > Ext.Date.y2kYear ? 1900 + ty : 2000 + ty;\n", s: "(\\d{1,2})"}, a: {g: 1, c: "if (/(am)/i.test(results[{0}])) {\n" + "if (!h || h == 12) { h = 0; }\n" + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}", s: "(am|pm|AM|PM)"}, A: {g: 1, c: "if (/(am)/i.test(results[{0}])) {\n" + "if (!h || h == 12) { h = 0; }\n" + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}", s: "(AM|PM|am|pm)"}, g: function() {
  return utilDate.formatCodeToRegex("G");
}, G: {g: 1, c: "h = parseInt(results[{0}], 10);\n", s: "(\\d{1,2})"}, h: function() {
  return utilDate.formatCodeToRegex("H");
}, H: {g: 1, c: "h = parseInt(results[{0}], 10);\n", s: "(\\d{2})"}, i: {g: 1, c: "i = parseInt(results[{0}], 10);\n", s: "(\\d{2})"}, s: {g: 1, c: "s = parseInt(results[{0}], 10);\n", s: "(\\d{2})"}, u: {g: 1, c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n", s: "(\\d+)"}, O: {g: 1, c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", "mn = o.substring(3,5) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"].join("\n"), s: "([+-]\\d{4})"}, P: {g: 1, c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", "mn = o.substring(4,6) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"].join("\n"), s: "([+-]\\d{2}:\\d{2})"}, T: {g: 0, c: null, s: "[A-Z]{1,4}"}, Z: {g: 1, c: "zz = results[{0}] * 1;\n" + "zz = (-43200 <= zz && zz <= 50400)? zz : null;\n", s: "([+-]?\\d{1,5})"}, c: function() {
  var calc = [], arr = [utilDate.formatCodeToRegex("Y", 1), utilDate.formatCodeToRegex("m", 2), utilDate.formatCodeToRegex("d", 3), utilDate.formatCodeToRegex("h", 4), utilDate.formatCodeToRegex("i", 5), utilDate.formatCodeToRegex("s", 6), {c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"}, {c: ["if(results[8]) {", "if(results[8] == 'Z'){", "zz = 0;", "}else if (results[8].indexOf(':') > -1){", utilDate.formatCodeToRegex("P", 8).c, "}else{", utilDate.formatCodeToRegex("O", 8).c, "}", "}"].join('\n')}];
  for (var i = 0, l = arr.length; i < l; ++i) 
    {
      calc.push(arr[i].c);
    }
  return {g: 1, c: calc.join(""), s: [arr[0].s, "(?:", "-", arr[1].s, "(?:", "-", arr[2].s, "(?:", "(?:T| )?", arr[3].s, ":", arr[4].s, "(?::", arr[5].s, ")?", "(?:(?:\\.|,)(\\d+))?", "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", ")?", ")?", ")?"].join("")};
}, U: {g: 1, c: "u = parseInt(results[{0}], 10);\n", s: "(-?\\d+)"}}, dateFormat: function(date, format) {
  return utilDate.format(date, format);
}, format: function(date, format) {
  if (utilDate.formatFunctions[format] == null) 
  {
    utilDate.createFormat(format);
  }
  var result = utilDate.formatFunctions[format].call(date);
  return result + '';
}, getTimezone: function(date) {
  return date.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
}, getGMTOffset: function(date, colon) {
  var offset = date.getTimezoneOffset();
  return (offset > 0 ? "-" : "+") + Ext.String.leftPad(Math.floor(Math.abs(offset) / 60), 2, "0") + (colon ? ":" : "") + Ext.String.leftPad(Math.abs(offset % 60), 2, "0");
}, getDayOfYear: function(date) {
  var num = 0, d = Ext.Date.clone(date), m = date.getMonth(), i;
  for (i = 0 , d.setDate(1) , d.setMonth(0); i < m; d.setMonth(++i)) 
    {
      num += utilDate.getDaysInMonth(d);
    }
  return num + date.getDate() - 1;
}, getWeekOfYear: (function() {
  var ms1d = 86400000, ms7d = 7 * ms1d;
  return function(date) {
  var DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d, AWN = Math.floor(DC3 / 7), Wyr = new Date(AWN * ms7d).getUTCFullYear();
  return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
};
})(), isLeapYear: function(date) {
  var year = date.getFullYear();
  return !!((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
}, getFirstDayOfMonth: function(date) {
  var day = (date.getDay() - (date.getDate() - 1)) % 7;
  return (day < 0) ? (day + 7) : day;
}, getLastDayOfMonth: function(date) {
  return utilDate.getLastDateOfMonth(date).getDay();
}, getFirstDateOfMonth: function(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}, getLastDateOfMonth: function(date) {
  return new Date(date.getFullYear(), date.getMonth(), utilDate.getDaysInMonth(date));
}, getDaysInMonth: (function() {
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return function(date) {
  var m = date.getMonth();
  return m == 1 && utilDate.isLeapYear(date) ? 29 : daysInMonth[m];
};
})(), getSuffix: function(date) {
  switch (date.getDate()) {
    case 1:
    case 21:
    case 31:
      return "st";
    case 2:
    case 22:
      return "nd";
    case 3:
    case 23:
      return "rd";
    default:
      return "th";
  }
}, clone: function(date) {
  return new Date(date.getTime());
}, isDST: function(date) {
  return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() != date.getTimezoneOffset();
}, clearTime: function(date, clone) {
  if (clone) 
  {
    return Ext.Date.clearTime(Ext.Date.clone(date));
  }
  var d = date.getDate();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  if (date.getDate() != d) 
  {
    for (var hr = 1, c = utilDate.add(date, Ext.Date.HOUR, hr); c.getDate() != d; hr++ , c = utilDate.add(date, Ext.Date.HOUR, hr)) 
      ;
    date.setDate(d);
    date.setHours(c.getHours());
  }
  return date;
}, add: function(date, interval, value) {
  var d = Ext.Date.clone(date);
  if (!interval || value === 0) 
  return d;
  switch (interval.toLowerCase()) {
    case Ext.Date.MILLI:
      d = new Date(d.valueOf() + value);
      break;
    case Ext.Date.SECOND:
      d = new Date(d.valueOf() + value * 1000);
      break;
    case Ext.Date.MINUTE:
      d = new Date(d.valueOf() + value * 60000);
      break;
    case Ext.Date.HOUR:
      d = new Date(d.valueOf() + value * 3600000);
      break;
    case Ext.Date.DAY:
      d = new Date(d.valueOf() + value * 86400000);
      break;
    case Ext.Date.MONTH:
      var day = date.getDate();
      if (day > 28) 
      {
        day = Math.min(day, Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.getFirstDateOfMonth(date), 'mo', value)).getDate());
      }
      d.setDate(day);
      d.setMonth(date.getMonth() + value);
      break;
    case Ext.Date.YEAR:
      d.setFullYear(date.getFullYear() + value);
      break;
  }
  return d;
}, between: function(date, start, end) {
  var t = date.getTime();
  return start.getTime() <= t && t <= end.getTime();
}, diff: function(min, max, unit) {
  var ExtDate = Ext.Date, est, diff = +max - min;
  switch (unit) {
    case ExtDate.MILLI:
      return diff;
    case ExtDate.SECOND:
      return Math.floor(diff / 1000);
    case ExtDate.MINUTE:
      return Math.floor(diff / 60000);
    case ExtDate.HOUR:
      return Math.floor(diff / 3600000);
    case ExtDate.DAY:
      return Math.floor(diff / 86400000);
    case 'w':
      return Math.floor(diff / 604800000);
    case ExtDate.MONTH:
      est = (max.getFullYear() * 12 + max.getMonth()) - (min.getFullYear() * 12 + min.getMonth());
      if (Ext.Date.add(min, unit, est) > max) 
      {
        return est - 1;
      } else {
        return est;
      }
    case ExtDate.YEAR:
      est = max.getFullYear() - min.getFullYear();
      if (Ext.Date.add(min, unit, est) > max) 
      {
        return est - 1;
      } else {
        return est;
      }
  }
}, align: function(date, unit, step) {
  var num = new Date(+date);
  switch (unit.toLowerCase()) {
    case Ext.Date.MILLI:
      return num;
      break;
    case Ext.Date.SECOND:
      num.setUTCSeconds(num.getUTCSeconds() - num.getUTCSeconds() % step);
      num.setUTCMilliseconds(0);
      return num;
      break;
    case Ext.Date.MINUTE:
      num.setUTCMinutes(num.getUTCMinutes() - num.getUTCMinutes() % step);
      num.setUTCSeconds(0);
      num.setUTCMilliseconds(0);
      return num;
      break;
    case Ext.Date.HOUR:
      num.setUTCHours(num.getUTCHours() - num.getUTCHours() % step);
      num.setUTCMinutes(0);
      num.setUTCSeconds(0);
      num.setUTCMilliseconds(0);
      return num;
      break;
    case Ext.Date.DAY:
      if (step == 7 || step == 14) 
      {
        num.setUTCDate(num.getUTCDate() - num.getUTCDay() + 1);
      }
      num.setUTCHours(0);
      num.setUTCMinutes(0);
      num.setUTCSeconds(0);
      num.setUTCMilliseconds(0);
      return num;
      break;
    case Ext.Date.MONTH:
      num.setUTCMonth(num.getUTCMonth() - (num.getUTCMonth() - 1) % step, 1);
      num.setUTCHours(0);
      num.setUTCMinutes(0);
      num.setUTCSeconds(0);
      num.setUTCMilliseconds(0);
      return num;
      break;
    case Ext.Date.YEAR:
      num.setUTCFullYear(num.getUTCFullYear() - num.getUTCFullYear() % step, 1, 1);
      num.setUTCHours(0);
      num.setUTCMinutes(0);
      num.setUTCSeconds(0);
      num.setUTCMilliseconds(0);
      return date;
      break;
  }
}};
  var utilDate = Ext.DateExtras;
  Ext.apply(Ext.Date, utilDate);
})();

Ext.define('Ext.util.Format', {singleton: true, defaultDateFormat: 'm/d/Y', escapeRe: /('|\\)/g, trimRe: /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g, formatRe: /\{(\d+)\}/g, escapeRegexRe: /([-.*+?^${}()|[\]\/\\])/g, dashesRe: /-/g, iso8601TestRe: /\d\dT\d\d/, iso8601SplitRe: /[- :T\.Z\+]/, ellipsis: function(value, len, word) {
  if (value && value.length > len) 
  {
    if (word) 
    {
      var vs = value.substr(0, len - 2), index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
      if (index != -1 && index >= (len - 15)) 
      {
        return vs.substr(0, index) + "...";
      }
    }
    return value.substr(0, len - 3) + "...";
  }
  return value;
}, escapeRegex: function(s) {
  return s.replace(Ext.util.Format.escapeRegexRe, "\\$1");
}, escape: function(string) {
  return string.replace(Ext.util.Format.escapeRe, "\\$1");
}, toggle: function(string, value, other) {
  return string == value ? other : value;
}, trim: function(string) {
  return string.replace(Ext.util.Format.trimRe, "");
}, leftPad: function(val, size, ch) {
  var result = String(val);
  ch = ch || " ";
  while (result.length < size) 
    {
      result = ch + result;
    }
  return result;
}, format: function(format) {
  var args = Ext.toArray(arguments, 1);
  return format.replace(Ext.util.Format.formatRe, function(m, i) {
  return args[i];
});
}, htmlEncode: function(value) {
  return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}, htmlDecode: function(value) {
  return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}, date: function(value, format) {
  var date = value;
  if (!value) 
  {
    return "";
  }
  if (!Ext.isDate(value)) 
  {
    date = new Date(Date.parse(value));
    if (isNaN(date)) 
    {
      if (this.iso8601TestRe.test(value)) 
      {
        if (Ext.os.is.Android && Ext.os.version.isLessThan("3.0")) 
        {
          var potentialUndefinedKeys = [1, 4, 5, 6, 7, 10, 11];
          var dateParsed, minutesOffset = 0;
          if ((dateParsed = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(value))) 
          {
            for (var i = 0, k; (k = potentialUndefinedKeys[i]); ++i) 
              {
                dateParsed[k] = +dateParsed[k] || 0;
              }
            dateParsed[2] = (+dateParsed[2] || 1) - 1;
            dateParsed[3] = +dateParsed[3] || 1;
            if (dateParsed[8] !== 'Z' && dateParsed[9] !== undefined) 
            {
              minutesOffset = dateParsed[10] * 60 + dateParsed[11];
              if (dateParsed[9] === '+') 
              {
                minutesOffset = 0 - minutesOffset;
              }
            }
            date = new Date(Date.UTC(dateParsed[1], dateParsed[2], dateParsed[3], dateParsed[4], dateParsed[5] + minutesOffset, dateParsed[6], dateParsed[7]));
          }
        } else {
          date = value.split(this.iso8601SplitRe);
          date = new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]);
        }
      }
    }
    if (isNaN(date)) 
    {
      date = new Date(Date.parse(value.replace(this.dashesRe, "/")));
    }
    value = date;
  }
  return Ext.Date.format(value, format || Ext.util.Format.defaultDateFormat);
}});

Ext.define('Ext.Template', {inheritableStatics: {from: function(el, config) {
  el = Ext.getDom(el);
  return new this(el.value || el.innerHTML, config || '');
}}, constructor: function(html) {
  var me = this, args = arguments, buffer = [], i = 0, length = args.length, value;
  me.initialConfig = {};
  if (length === 1 && Ext.isArray(html)) 
  {
    args = html;
    length = args.length;
  }
  if (length > 1) 
  {
    for (; i < length; i++) 
      {
        value = args[i];
        if (typeof value == 'object') 
        {
          Ext.apply(me.initialConfig, value);
          Ext.apply(me, value);
        } else {
          buffer.push(value);
        }
      }
  } else {
    buffer.push(html);
  }
  me.html = buffer.join('');
  if (me.compiled) 
  {
    me.compile();
  }
}, isTemplate: true, disableFormats: false, re: /\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, apply: function(values) {
  var me = this, useFormat = me.disableFormats !== true, fm = Ext.util.Format, tpl = me, ret;
  if (me.compiled) 
  {
    return me.compiled(values).join('');
  }
  function fn(m, name, format, args) {
    if (format && useFormat) 
    {
      if (args) 
      {
        args = [values[name]].concat(Ext.functionFactory('return [' + args + '];')());
      } else {
        args = [values[name]];
      }
      if (format.substr(0, 5) == "this.") 
      {
        return tpl[format.substr(5)].apply(tpl, args);
      } else {
        return fm[format].apply(fm, args);
      }
    } else {
      return values[name] !== undefined ? values[name] : "";
    }
  }
  ret = me.html.replace(me.re, fn);
  return ret;
}, applyOut: function(values, out) {
  var me = this;
  if (me.compiled) 
  {
    out.push.apply(out, me.compiled(values));
  } else {
    out.push(me.apply(values));
  }
  return out;
}, applyTemplate: function() {
  return this.apply.apply(this, arguments);
}, set: function(html, compile) {
  var me = this;
  me.html = html;
  me.compiled = null;
  return compile ? me.compile() : me;
}, compileARe: /\\/g, compileBRe: /(\r\n|\n)/g, compileCRe: /'/g, compile: function() {
  var me = this, fm = Ext.util.Format, useFormat = me.disableFormats !== true, body, bodyReturn;
  function fn(m, name, format, args) {
    if (format && useFormat) 
    {
      args = args ? ',' + args : "";
      if (format.substr(0, 5) != "this.") 
      {
        format = "fm." + format + '(';
      } else {
        format = 'this.' + format.substr(5) + '(';
      }
    } else {
      args = '';
      format = "(values['" + name + "'] == undefined ? '' : ";
    }
    return "'," + format + "values['" + name + "']" + args + ") ,'";
  }
  bodyReturn = me.html.replace(me.compileARe, '\\\\').replace(me.compileBRe, '\\n').replace(me.compileCRe, "\\'").replace(me.re, fn);
  body = "this.compiled = function(values){ return ['" + bodyReturn + "'];};";
  eval(body);
  return me;
}, insertFirst: function(el, values, returnElement) {
  return this.doInsert('afterBegin', el, values, returnElement);
}, insertBefore: function(el, values, returnElement) {
  return this.doInsert('beforeBegin', el, values, returnElement);
}, insertAfter: function(el, values, returnElement) {
  return this.doInsert('afterEnd', el, values, returnElement);
}, append: function(el, values, returnElement) {
  return this.doInsert('beforeEnd', el, values, returnElement);
}, doInsert: function(where, el, values, returnElement) {
  var newNode = Ext.DomHelper.insertHtml(where, Ext.getDom(el), this.apply(values));
  return returnElement ? Ext.get(newNode) : newNode;
}, overwrite: function(el, values, returnElement) {
  var newNode = Ext.DomHelper.overwrite(Ext.getDom(el), this.apply(values));
  return returnElement ? Ext.get(newNode) : newNode;
}});

Ext.define('Ext.XTemplateParser', {constructor: function(config) {
  Ext.apply(this, config);
}, doTpl: Ext.emptyFn, parse: function(str) {
  var me = this, len = str.length, aliases = {elseif: 'elif'}, topRe = me.topRe, actionsRe = me.actionsRe, index, stack, s, m, t, prev, frame, subMatch, begin, end, actions, prop;
  me.level = 0;
  me.stack = stack = [];
  for (index = 0; index < len; index = end) 
    {
      topRe.lastIndex = index;
      m = topRe.exec(str);
      if (!m) 
      {
        me.doText(str.substring(index, len));
        break;
      }
      begin = m.index;
      end = topRe.lastIndex;
      if (index < begin) 
      {
        me.doText(str.substring(index, begin));
      }
      if (m[1]) 
      {
        end = str.indexOf('%}', begin + 2);
        me.doEval(str.substring(begin + 2, end));
        end += 2;
      } else if (m[2]) 
      {
        end = str.indexOf(']}', begin + 2);
        me.doExpr(str.substring(begin + 2, end));
        end += 2;
      } else if (m[3]) 
      {
        me.doTag(m[3]);
      } else if (m[4]) 
      {
        actions = null;
        while ((subMatch = actionsRe.exec(m[4])) !== null) 
          {
            s = subMatch[2] || subMatch[3];
            if (s) 
            {
              s = Ext.String.htmlDecode(s);
              t = subMatch[1];
              t = aliases[t] || t;
              actions = actions || {};
              prev = actions[t];
              if (typeof prev == 'string') 
              {
                actions[t] = [prev, s];
              } else if (prev) 
              {
                actions[t].push(s);
              } else {
                actions[t] = s;
              }
            }
          }
        if (!actions) 
        {
          if (me.elseRe.test(m[4])) 
          {
            me.doElse();
          } else if (me.defaultRe.test(m[4])) 
          {
            me.doDefault();
          } else {
            me.doTpl();
            stack.push({type: 'tpl'});
          }
        } else if (actions['if']) 
        {
          me.doIf(actions['if'], actions);
          stack.push({type: 'if'});
        } else if (actions['switch']) 
        {
          me.doSwitch(actions['switch'], actions);
          stack.push({type: 'switch'});
        } else if (actions['case']) 
        {
          me.doCase(actions['case'], actions);
        } else if (actions['elif']) 
        {
          me.doElseIf(actions['elif'], actions);
        } else if (actions['for']) 
        {
          ++me.level;
          if (prop = me.propRe.exec(m[4])) 
          {
            actions.propName = prop[1] || prop[2];
          }
          me.doFor(actions['for'], actions);
          stack.push({type: 'for', actions: actions});
        } else if (actions.exec) 
        {
          me.doExec(actions.exec, actions);
          stack.push({type: 'exec', actions: actions});
        }
      } else if (m[0].length === 5) 
      {
        stack.push({type: 'tpl'});
      } else {
        frame = stack.pop();
        me.doEnd(frame.type, frame.actions);
        if (frame.type == 'for') 
        {
          --me.level;
        }
      }
    }
}, topRe: /(?:(\{\%)|(\{\[)|\{([^{}]*)\})|(?:<tpl([^>]*)\>)|(?:<\/tpl>)/g, actionsRe: /\s*(elif|elseif|if|for|exec|switch|case|eval)\s*\=\s*(?:(?:"([^"]*)")|(?:'([^']*)'))\s*/g, propRe: /prop=(?:(?:"([^"]*)")|(?:'([^']*)'))/, defaultRe: /^\s*default\s*$/, elseRe: /^\s*else\s*$/});

Ext.define('Ext.XTemplateCompiler', {extend: 'Ext.XTemplateParser', useEval: Ext.isGecko, useIndex: Ext.isIE6 || Ext.isIE7, useFormat: true, propNameRe: /^[\w\d\$]*$/, compile: function(tpl) {
  var me = this, code = me.generate(tpl);
  return me.useEval ? me.evalTpl(code) : (new Function('Ext', code))(Ext);
}, generate: function(tpl) {
  var me = this, definitions = 'var fm=Ext.util.Format,ts=Object.prototype.toString;', code;
  me.maxLevel = 0;
  me.body = ['var c0=values, a0=' + me.createArrayTest(0) + ', p0=parent, n0=xcount, i0=xindex, v;\n'];
  if (me.definitions) 
  {
    if (typeof me.definitions === 'string') 
    {
      me.definitions = [me.definitions, definitions];
    } else {
      me.definitions.push(definitions);
    }
  } else {
    me.definitions = [definitions];
  }
  me.switches = [];
  me.parse(tpl);
  me.definitions.push((me.useEval ? '$=' : 'return') + ' function (' + me.fnArgs + ') {', me.body.join(''), '}');
  code = me.definitions.join('\n');
  me.definitions.length = me.body.length = me.switches.length = 0;
  delete me.definitions;
  delete me.body;
  delete me.switches;
  return code;
}, doText: function(text) {
  var me = this, out = me.body;
  text = text.replace(me.aposRe, "\\'").replace(me.newLineRe, '\\n');
  if (me.useIndex) 
  {
    out.push('out[out.length]=\'', text, '\'\n');
  } else {
    out.push('out.push(\'', text, '\')\n');
  }
}, doExpr: function(expr) {
  var out = this.body;
  out.push('v=' + expr + '; if (v !== undefined && v !== null) out');
  if (this.useIndex) 
  {
    out.push('[out.length]=v+\'\'\n');
  } else {
    out.push('.push(v+\'\')\n');
  }
}, doTag: function(tag) {
  this.doExpr(this.parseTag(tag));
}, doElse: function() {
  this.body.push('} else {\n');
}, doEval: function(text) {
  this.body.push(text, '\n');
}, doIf: function(action, actions) {
  var me = this;
  if (action === '.') 
  {
    me.body.push('if (values) {\n');
  } else if (me.propNameRe.test(action)) 
  {
    me.body.push('if (', me.parseTag(action), ') {\n');
  } else {
    me.body.push('if (', me.addFn(action), me.callFn, ') {\n');
  }
  if (actions.exec) 
  {
    me.doExec(actions.exec);
  }
}, doElseIf: function(action, actions) {
  var me = this;
  if (action === '.') 
  {
    me.body.push('else if (values) {\n');
  } else if (me.propNameRe.test(action)) 
  {
    me.body.push('} else if (', me.parseTag(action), ') {\n');
  } else {
    me.body.push('} else if (', me.addFn(action), me.callFn, ') {\n');
  }
  if (actions.exec) 
  {
    me.doExec(actions.exec);
  }
}, doSwitch: function(action) {
  var me = this;
  if (action === '.') 
  {
    me.body.push('switch (values) {\n');
  } else if (me.propNameRe.test(action)) 
  {
    me.body.push('switch (', me.parseTag(action), ') {\n');
  } else {
    me.body.push('switch (', me.addFn(action), me.callFn, ') {\n');
  }
  me.switches.push(0);
}, doCase: function(action) {
  var me = this, cases = Ext.isArray(action) ? action : [action], n = me.switches.length - 1, match, i;
  if (me.switches[n]) 
  {
    me.body.push('break;\n');
  } else {
    me.switches[n]++;
  }
  for (i = 0 , n = cases.length; i < n; ++i) 
    {
      match = me.intRe.exec(cases[i]);
      cases[i] = match ? match[1] : ("'" + cases[i].replace(me.aposRe, "\\'") + "'");
    }
  me.body.push('case ', cases.join(': case '), ':\n');
}, doDefault: function() {
  var me = this, n = me.switches.length - 1;
  if (me.switches[n]) 
  {
    me.body.push('break;\n');
  } else {
    me.switches[n]++;
  }
  me.body.push('default:\n');
}, doEnd: function(type, actions) {
  var me = this, L = me.level - 1;
  if (type == 'for') 
  {
    if (actions.exec) 
    {
      me.doExec(actions.exec);
    }
    me.body.push('}\n');
    me.body.push('parent=p', L, ';values=r', L + 1, ';xcount=n', L, ';xindex=i', L, '\n');
  } else if (type == 'if' || type == 'switch') 
  {
    me.body.push('}\n');
  }
}, doFor: function(action, actions) {
  var me = this, s, L = me.level, up = L - 1, pL = 'p' + L, parentAssignment;
  if (action === '.') 
  {
    s = 'values';
  } else if (me.propNameRe.test(action)) 
  {
    s = me.parseTag(action);
  } else {
    s = me.addFn(action) + me.callFn;
  }
  if (me.maxLevel < L) 
  {
    me.maxLevel = L;
    me.body.push('var ');
  }
  if (action == '.') 
  {
    parentAssignment = 'c' + L;
  } else {
    parentAssignment = 'a' + up + '?c' + up + '[i' + up + ']:p' + L;
  }
  me.body.push('i', L, '=0,n', L, '=0,c', L, '=', s, ',a', L, '=', me.createArrayTest(L), ',p', L, '=c', up, ',r', L, '=values;\n', 'parent=', parentAssignment, '\n', 'if (c', L, '){if(a', L, '){n', L, '=c', L, '.length;}else if (c', L, '.isMixedCollection){c', L, '=c', L, '.items;n', L, '=c', L, '.length;}else if(c', L, '.isStore){c', L, '=c', L, '.data.items;n', L, '=c', L, '.length;}else{c', L, '=[c', L, '];n', L, '=1;}}\n', 'for (xcount=n', L, ';i', L, '<n' + L + ';++i', L, '){\n', 'values=c', L, '[i', L, ']');
  if (actions.propName) 
  {
    me.body.push('.', actions.propName);
  }
  me.body.push('\n', 'xindex=i', L, '+1\n');
}, createArrayTest: ('isArray' in Array) ? function(L) {
  return 'Array.isArray(c' + L + ')';
} : function(L) {
  return 'ts.call(c' + L + ')==="[object Array]"';
}, doExec: function(action, actions) {
  var me = this, name = 'f' + me.definitions.length;
  me.definitions.push('function ' + name + '(' + me.fnArgs + ') {', ' try { with(values) {', '  ' + action, ' }} catch(e) {', '}', '}');
  me.body.push(name + me.callFn + '\n');
}, addFn: function(body) {
  var me = this, name = 'f' + me.definitions.length;
  if (body === '.') 
  {
    me.definitions.push('function ' + name + '(' + me.fnArgs + ') {', ' return values', '}');
  } else if (body === '..') 
  {
    me.definitions.push('function ' + name + '(' + me.fnArgs + ') {', ' return parent', '}');
  } else {
    me.definitions.push('function ' + name + '(' + me.fnArgs + ') {', ' try { with(values) {', '  return(' + body + ')', ' }} catch(e) {', '}', '}');
  }
  return name;
}, parseTag: function(tag) {
  var me = this, m = me.tagRe.exec(tag), name = m[1], format = m[2], args = m[3], math = m[4], v;
  if (name == '.') 
  {
    if (!me.validTypes) 
    {
      me.definitions.push('var validTypes={string:1,number:1,boolean:1};');
      me.validTypes = true;
    }
    v = 'validTypes[typeof values] || ts.call(values) === "[object Date]" ? values : ""';
  } else if (name == '#') 
  {
    v = 'xindex';
  } else if (name.substr(0, 7) == "parent.") 
  {
    v = name;
  } else if (isNaN(name) && name.indexOf('-') == -1 && name.indexOf('.') != -1) 
  {
    v = "values." + name;
  } else {
    v = "values['" + name + "']";
  }
  if (math) 
  {
    v = '(' + v + math + ')';
  }
  if (format && me.useFormat) 
  {
    args = args ? ',' + args : "";
    if (format.substr(0, 5) != "this.") 
    {
      format = "fm." + format + '(';
    } else {
      format += '(';
    }
  } else {
    return v;
  }
  return format + v + args + ')';
}, evalTpl: function($) {
  eval($);
  return $;
}, newLineRe: /\r\n|\r|\n/g, aposRe: /[']/g, intRe: /^\s*(\d+)\s*$/, tagRe: /([\w-\.\#\$]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\/]\s?[\d\.\+\-\*\/\(\)]+)?/}, function() {
  var proto = this.prototype;
  proto.fnArgs = 'out,values,parent,xindex,xcount';
  proto.callFn = '.call(this,' + proto.fnArgs + ')';
});

Ext.define('Ext.XTemplate', {extend: 'Ext.Template', emptyObj: {}, apply: function(values) {
  return this.applyOut(values, []).join('');
}, applyOut: function(values, out, parent) {
  var me = this, xindex = values.xindex, xcount = values.xcount, compiler;
  if (!me.fn) 
  {
    compiler = new Ext.XTemplateCompiler({useFormat: me.disableFormats !== true, definitions: me.definitions});
    me.fn = compiler.compile(me.html);
  }
  try {
    xindex = typeof xindex === 'number' ? xindex : 1;
    xcount = typeof xcount === 'number' ? xcount : 1;
    me.fn.call(me, out, values, parent || me.emptyObj, xindex, xcount);
  }  catch (e) {
}
  return out;
}, compile: function() {
  return this;
}, statics: {getTpl: function(instance, name) {
  var tpl = instance[name], proto;
  if (tpl && !tpl.isTemplate) 
  {
    tpl = Ext.ClassManager.dynInstantiate('Ext.XTemplate', tpl);
    if (instance.hasOwnProperty(name)) 
    {
      instance[name] = tpl;
    } else {
      for (proto = instance.self.prototype; proto; proto = proto.superclass) 
        {
          if (proto.hasOwnProperty(name)) 
          {
            proto[name] = tpl;
            break;
          }
        }
    }
  }
  return tpl || null;
}}});

Ext.define('Ext.behavior.Behavior', {constructor: function(component) {
  this.component = component;
  component.on('destroy', 'onComponentDestroy', this);
}, onComponentDestroy: Ext.emptyFn});

Ext.define('Ext.fx.easing.Abstract', {config: {startTime: 0, startValue: 0}, isEasing: true, isEnded: false, constructor: function(config) {
  this.initConfig(config);
  return this;
}, applyStartTime: function(startTime) {
  if (!startTime) 
  {
    startTime = Ext.Date.now();
  }
  return startTime;
}, updateStartTime: function(startTime) {
  this.reset();
}, reset: function() {
  this.isEnded = false;
}, getValue: Ext.emptyFn});

Ext.define('Ext.fx.easing.Linear', {extend: 'Ext.fx.easing.Abstract', alias: 'easing.linear', config: {duration: 0, endValue: 0}, updateStartValue: function(startValue) {
  this.distance = this.getEndValue() - startValue;
}, updateEndValue: function(endValue) {
  this.distance = endValue - this.getStartValue();
}, getValue: function() {
  var deltaTime = Ext.Date.now() - this.getStartTime(), duration = this.getDuration();
  if (deltaTime > duration) 
  {
    this.isEnded = true;
    return this.getEndValue();
  } else {
    return this.getStartValue() + ((deltaTime / duration) * this.distance);
  }
}});

Ext.define('Ext.util.translatable.Abstract', {extend: 'Ext.Evented', config: {useWrapper: null, easing: null, easingX: null, easingY: null}, x: 0, y: 0, activeEasingX: null, activeEasingY: null, isAnimating: false, isTranslatable: true, constructor: function(config) {
  this.initConfig(config);
}, factoryEasing: function(easing) {
  return Ext.factory(easing, Ext.fx.easing.Linear, null, 'easing');
}, applyEasing: function(easing) {
  if (!this.getEasingX()) 
  {
    this.setEasingX(this.factoryEasing(easing));
  }
  if (!this.getEasingY()) 
  {
    this.setEasingY(this.factoryEasing(easing));
  }
}, applyEasingX: function(easing) {
  return this.factoryEasing(easing);
}, applyEasingY: function(easing) {
  return this.factoryEasing(easing);
}, doTranslate: Ext.emptyFn, translate: function(x, y, animation) {
  if (animation) 
  {
    return this.translateAnimated(x, y, animation);
  }
  if (this.isAnimating) 
  {
    this.stopAnimation();
  }
  if (!isNaN(x) && typeof x == 'number') 
  {
    this.x = x;
  }
  if (!isNaN(y) && typeof y == 'number') 
  {
    this.y = y;
  }
  this.doTranslate(x, y);
}, translateAxis: function(axis, value, animation) {
  var x, y;
  if (axis == 'x') 
  {
    x = value;
  } else {
    y = value;
  }
  return this.translate(x, y, animation);
}, animate: function(easingX, easingY) {
  this.activeEasingX = easingX;
  this.activeEasingY = easingY;
  this.isAnimating = true;
  this.lastX = null;
  this.lastY = null;
  Ext.AnimationQueue.start(this.doAnimationFrame, this);
  this.fireEvent('animationstart', this, this.x, this.y);
  return this;
}, translateAnimated: function(x, y, animation) {
  if (!Ext.isObject(animation)) 
  {
    animation = {};
  }
  if (this.isAnimating) 
  {
    this.stopAnimation();
  }
  var now = Ext.Date.now(), easing = animation.easing, easingX = (typeof x == 'number') ? (animation.easingX || easing || this.getEasingX() || true) : null, easingY = (typeof y == 'number') ? (animation.easingY || easing || this.getEasingY() || true) : null;
  if (easingX) 
  {
    easingX = this.factoryEasing(easingX);
    easingX.setStartTime(now);
    easingX.setStartValue(this.x);
    easingX.setEndValue(x);
    if ('duration' in animation) 
    {
      easingX.setDuration(animation.duration);
    }
  }
  if (easingY) 
  {
    easingY = this.factoryEasing(easingY);
    easingY.setStartTime(now);
    easingY.setStartValue(this.y);
    easingY.setEndValue(y);
    if ('duration' in animation) 
    {
      easingY.setDuration(animation.duration);
    }
  }
  return this.animate(easingX, easingY);
}, doAnimationFrame: function() {
  var me = this, easingX = me.activeEasingX, easingY = me.activeEasingY, now = Date.now(), x, y;
  if (!me.isAnimating) 
  {
    return;
  }
  me.lastRun = now;
  if (easingX === null && easingY === null) 
  {
    me.stopAnimation();
    return;
  }
  if (easingX !== null) 
  {
    me.x = x = Math.round(easingX.getValue());
    if (easingX.isEnded) 
    {
      me.activeEasingX = null;
      me.fireEvent('axisanimationend', me, 'x', x);
    }
  } else {
    x = me.x;
  }
  if (easingY !== null) 
  {
    me.y = y = Math.round(easingY.getValue());
    if (easingY.isEnded) 
    {
      me.activeEasingY = null;
      me.fireEvent('axisanimationend', me, 'y', y);
    }
  } else {
    y = me.y;
  }
  if (me.lastX !== x || me.lastY !== y) 
  {
    me.doTranslate(x, y);
    me.lastX = x;
    me.lastY = y;
  }
  me.fireEvent('animationframe', me, x, y);
}, stopAnimation: function() {
  if (!this.isAnimating) 
  {
    return;
  }
  this.activeEasingX = null;
  this.activeEasingY = null;
  this.isAnimating = false;
  Ext.AnimationQueue.stop(this.doAnimationFrame, this);
  this.fireEvent('animationend', this, this.x, this.y);
}, refresh: function() {
  this.translate(this.x, this.y);
}, destroy: function() {
  if (this.isAnimating) 
  {
    this.stopAnimation();
  }
  this.callParent(arguments);
}});

Ext.define('Ext.util.translatable.Dom', {extend: 'Ext.util.translatable.Abstract', config: {element: null}, applyElement: function(element) {
  if (!element) 
  {
    return;
  }
  return Ext.get(element);
}, updateElement: function() {
  this.refresh();
}});

Ext.define('Ext.util.translatable.CssTransform', {extend: 'Ext.util.translatable.Dom', doTranslate: function(x, y) {
  var element = this.getElement();
  if (!this.isDestroyed && !element.isDestroyed) 
  {
    element.translate(x, y);
  }
}, destroy: function() {
  var element = this.getElement();
  if (element && !element.isDestroyed) 
  {
    element.dom.style.webkitTransform = null;
  }
  this.callSuper();
}});

Ext.define('Ext.util.translatable.ScrollPosition', {extend: 'Ext.util.translatable.Dom', type: 'scrollposition', config: {useWrapper: true}, getWrapper: function() {
  var wrapper = this.wrapper, element = this.getElement(), container;
  if (!wrapper) 
  {
    container = element.getParent();
    if (!container) 
    {
      return null;
    }
    if (container.hasCls(Ext.baseCSSPrefix + 'translatable-hboxfix')) 
    {
      container = container.getParent();
    }
    if (this.getUseWrapper()) 
    {
      wrapper = element.wrap();
    } else {
      wrapper = container;
    }
    element.addCls('x-translatable');
    wrapper.addCls('x-translatable-container');
    this.wrapper = wrapper;
    wrapper.on('painted', function() {
  if (!this.isAnimating) 
  {
    this.refresh();
  }
}, this);
    this.refresh();
  }
  return wrapper;
}, doTranslate: function(x, y) {
  var wrapper = this.getWrapper(), dom;
  if (wrapper) 
  {
    dom = wrapper.dom;
    if (typeof x == 'number') 
    {
      dom.scrollLeft = 500000 - x;
    }
    if (typeof y == 'number') 
    {
      dom.scrollTop = 500000 - y;
    }
  }
}, destroy: function() {
  var element = this.getElement(), wrapper = this.wrapper;
  if (wrapper) 
  {
    if (!element.isDestroyed) 
    {
      if (this.getUseWrapper()) 
      {
        wrapper.doReplaceWith(element);
      }
      element.removeCls('x-translatable');
    }
    if (!wrapper.isDestroyed) 
    {
      wrapper.removeCls('x-translatable-container');
      wrapper.un('painted', 'refresh', this);
    }
    delete this.wrapper;
    delete this._element;
  }
  this.callSuper();
}});

Ext.define('Ext.util.translatable.CssPosition', {extend: 'Ext.util.translatable.Dom', doTranslate: function(x, y) {
  var domStyle = this.getElement().dom.style;
  if (typeof x == 'number') 
  {
    domStyle.left = x + 'px';
  }
  if (typeof y == 'number') 
  {
    domStyle.top = y + 'px';
  }
}, destroy: function() {
  var domStyle = this.getElement().dom.style;
  domStyle.left = null;
  domStyle.top = null;
  this.callParent(arguments);
}});

Ext.define('Ext.util.Translatable', {constructor: function(config) {
  var namespace = Ext.util.translatable;
  switch (Ext.browser.getPreferredTranslationMethod(config)) {
    case 'scrollposition':
      return new namespace.ScrollPosition(config);
    case 'csstransform':
      return new namespace.CssTransform(config);
    case 'cssposition':
      return new namespace.CssPosition(config);
  }
}});

Ext.define('Ext.behavior.Translatable', {extend: 'Ext.behavior.Behavior', setConfig: function(config) {
  var translatable = this.translatable, component = this.component;
  if (config) 
  {
    if (!translatable) 
    {
      this.translatable = translatable = new Ext.util.Translatable(config);
      translatable.setElement(component.renderElement);
      translatable.on('destroy', 'onTranslatableDestroy', this);
    } else if (Ext.isObject(config)) 
    {
      translatable.setConfig(config);
    }
  } else if (translatable) 
  {
    translatable.destroy();
  }
  return this;
}, getTranslatable: function() {
  return this.translatable;
}, onTranslatableDestroy: function() {
  delete this.translatable;
}, onComponentDestroy: function() {
  var translatable = this.translatable;
  if (translatable) 
  {
    translatable.destroy();
  }
}});

Ext.define('Ext.util.Draggable', {isDraggable: true, mixins: ['Ext.mixin.Observable'], config: {cls: Ext.baseCSSPrefix + 'draggable', draggingCls: Ext.baseCSSPrefix + 'dragging', element: null, constraint: 'container', disabled: null, direction: 'both', initialOffset: {x: 0, y: 0}, translatable: {}}, DIRECTION_BOTH: 'both', DIRECTION_VERTICAL: 'vertical', DIRECTION_HORIZONTAL: 'horizontal', defaultConstraint: {min: {x: -Infinity, y: -Infinity}, max: {x: Infinity, y: Infinity}}, containerWidth: 0, containerHeight: 0, width: 0, height: 0, constructor: function(config) {
  var element;
  this.extraConstraint = {};
  this.initialConfig = config;
  this.offset = {x: 0, y: 0};
  this.listeners = {dragstart: 'onDragStart', drag: 'onDrag', dragend: 'onDragEnd', resize: 'onElementResize', touchstart: 'onPress', touchend: 'onRelease', scope: this};
  if (config && config.element) 
  {
    element = config.element;
    delete config.element;
    this.setElement(element);
  }
  return this;
}, applyElement: function(element) {
  if (!element) 
  {
    return;
  }
  return Ext.get(element);
}, updateElement: function(element) {
  element.on(this.listeners);
  this.initConfig(this.initialConfig);
}, updateInitialOffset: function(initialOffset) {
  if (typeof initialOffset == 'number') 
  {
    initialOffset = {x: initialOffset, y: initialOffset};
  }
  var offset = this.offset, x, y;
  offset.x = x = initialOffset.x;
  offset.y = y = initialOffset.y;
  this.getTranslatable().translate(x, y);
}, updateCls: function(cls) {
  this.getElement().addCls(cls);
}, applyTranslatable: function(translatable, currentInstance) {
  translatable = Ext.factory(translatable, Ext.util.Translatable, currentInstance);
  if (translatable) 
  {
    translatable.setElement(this.getElement());
  }
  return translatable;
}, setExtraConstraint: function(constraint) {
  this.extraConstraint = constraint || {};
  this.refreshConstraint();
  return this;
}, addExtraConstraint: function(constraint) {
  Ext.merge(this.extraConstraint, constraint);
  this.refreshConstraint();
  return this;
}, applyConstraint: function(newConstraint) {
  this.currentConstraint = newConstraint;
  if (!newConstraint) 
  {
    newConstraint = this.defaultConstraint;
  }
  if (newConstraint === 'container') 
  {
    return Ext.merge(this.getContainerConstraint(), this.extraConstraint);
  }
  return Ext.merge({}, this.extraConstraint, newConstraint);
}, updateConstraint: function() {
  this.refreshOffset();
}, getContainerConstraint: function() {
  var container = this.getContainer(), element = this.getElement();
  if (!container || !element.dom) 
  {
    return this.defaultConstraint;
  }
  return {min: {x: 0, y: 0}, max: {x: this.containerWidth - this.width, y: this.containerHeight - this.height}};
}, getContainer: function() {
  var container = this.container;
  if (!container) 
  {
    container = this.getElement().getParent();
    if (container) 
    {
      this.container = container;
      container.on({resize: 'onContainerResize', destroy: 'onContainerDestroy', scope: this});
    }
  }
  return container;
}, onElementResize: function(element, info) {
  this.width = info.width;
  this.height = info.height;
  this.refresh();
}, onContainerResize: function(container, info) {
  this.containerWidth = info.width;
  this.containerHeight = info.height;
  this.refresh();
}, onContainerDestroy: function() {
  delete this.container;
  delete this.containerSizeMonitor;
}, detachListeners: function() {
  this.getElement().un(this.listeners);
}, isAxisEnabled: function(axis) {
  var direction = this.getDirection();
  if (axis === 'x') 
  {
    return (direction === this.DIRECTION_BOTH || direction === this.DIRECTION_HORIZONTAL);
  }
  return (direction === this.DIRECTION_BOTH || direction === this.DIRECTION_VERTICAL);
}, onPress: function(e) {
  this.fireAction('touchstart', [this, e]);
}, onRelease: function(e) {
  this.fireAction('touchend', [this, e]);
}, onDragStart: function(e) {
  if (this.getDisabled()) 
  {
    return false;
  }
  var offset = this.offset;
  this.fireAction('dragstart', [this, e, offset.x, offset.y], this.initDragStart);
}, initDragStart: function(me, e, offsetX, offsetY) {
  this.dragStartOffset = {x: offsetX, y: offsetY};
  this.isDragging = true;
  this.getElement().addCls(this.getDraggingCls());
}, onDrag: function(e) {
  if (!this.isDragging) 
  {
    return;
  }
  var startOffset = this.dragStartOffset;
  this.fireAction('drag', [this, e, startOffset.x + e.deltaX, startOffset.y + e.deltaY], this.doDrag);
}, doDrag: function(me, e, offsetX, offsetY) {
  me.setOffset(offsetX, offsetY);
}, onDragEnd: function(e) {
  if (!this.isDragging) 
  {
    return;
  }
  this.onDrag(e);
  this.isDragging = false;
  this.getElement().removeCls(this.getDraggingCls());
  this.fireEvent('dragend', this, e, this.offset.x, this.offset.y);
}, setOffset: function(x, y, animation) {
  var currentOffset = this.offset, constraint = this.getConstraint(), minOffset = constraint.min, maxOffset = constraint.max, min = Math.min, max = Math.max;
  if (this.isAxisEnabled('x') && typeof x == 'number') 
  {
    x = min(max(x, minOffset.x), maxOffset.x);
  } else {
    x = currentOffset.x;
  }
  if (this.isAxisEnabled('y') && typeof y == 'number') 
  {
    y = min(max(y, minOffset.y), maxOffset.y);
  } else {
    y = currentOffset.y;
  }
  currentOffset.x = x;
  currentOffset.y = y;
  this.getTranslatable().translate(x, y, animation);
}, getOffset: function() {
  return this.offset;
}, refreshConstraint: function() {
  this.setConstraint(this.currentConstraint);
}, refreshOffset: function() {
  var offset = this.offset;
  this.setOffset(offset.x, offset.y);
}, refresh: function() {
  this.refreshConstraint();
  this.getTranslatable().refresh();
  this.refreshOffset();
}, enable: function() {
  return this.setDisabled(false);
}, disable: function() {
  return this.setDisabled(true);
}, destroy: function() {
  var translatable = this.getTranslatable();
  var element = this.getElement();
  if (element && !element.isDestroyed) 
  {
    element.removeCls(this.getCls());
  }
  this.detachListeners();
  if (translatable) 
  {
    translatable.destroy();
  }
}}, function() {
});

Ext.define('Ext.behavior.Draggable', {extend: 'Ext.behavior.Behavior', setConfig: function(config) {
  var draggable = this.draggable, component = this.component;
  if (config) 
  {
    if (!draggable) 
    {
      component.setTranslatable(config.translatable);
      this.draggable = draggable = new Ext.util.Draggable(config);
      draggable.setTranslatable(component.getTranslatable());
      draggable.setElement(component.renderElement);
      draggable.on('destroy', 'onDraggableDestroy', this);
      component.on(this.listeners);
    } else if (Ext.isObject(config)) 
    {
      draggable.setConfig(config);
    }
  } else if (draggable) 
  {
    draggable.destroy();
  }
  return this;
}, getDraggable: function() {
  return this.draggable;
}, onDraggableDestroy: function() {
  delete this.draggable;
}, onComponentDestroy: function() {
  var draggable = this.draggable;
  if (draggable) 
  {
    draggable.destroy();
  }
}});

(function(clsPrefix) {
  Ext.define('Ext.Component', {extend: 'Ext.AbstractComponent', alternateClassName: 'Ext.lib.Component', mixins: ['Ext.mixin.Traversable'], xtype: 'component', observableType: 'component', cachedConfig: {baseCls: null, cls: null, floatingCls: clsPrefix + 'floating', hiddenCls: clsPrefix + 'item-hidden', ui: null, margin: null, padding: null, border: null, styleHtmlCls: clsPrefix + 'html', styleHtmlContent: null}, eventedConfig: {flex: null, left: null, top: null, right: null, bottom: null, width: null, height: null, minWidth: null, minHeight: null, maxWidth: null, maxHeight: null, docked: null, centered: null, hidden: null, disabled: null}, config: {style: null, html: null, draggable: null, translatable: null, renderTo: null, zIndex: null, tpl: null, enterAnimation: null, exitAnimation: null, showAnimation: null, hideAnimation: null, tplWriteMode: 'overwrite', data: null, disabledCls: clsPrefix + 'item-disabled', contentEl: null, itemId: undefined, record: null, plugins: null}, listenerOptionsRegex: /^(?:delegate|single|delay|buffer|args|prepend|element)$/, alignmentRegex: /^([a-z]+)-([a-z]+)(\?)?$/, isComponent: true, floating: false, rendered: false, isInner: true, activeAnimation: null, dockPositions: {top: true, right: true, bottom: true, left: true}, innerElement: null, element: null, template: [], widthLayoutSized: false, heightLayoutSized: false, layoutStretched: false, sizeState: false, sizeFlags: 0, LAYOUT_WIDTH: 1, LAYOUT_HEIGHT: 2, LAYOUT_BOTH: 3, LAYOUT_STRETCHED: 4, constructor: function(config) {
  var me = this, currentConfig = me.config, id;
  me.onInitializedListeners = [];
  me.initialConfig = config;
  if (config !== undefined && 'id' in config) 
  {
    id = config.id;
  } else if ('id' in currentConfig) 
  {
    id = currentConfig.id;
  } else {
    id = me.getId();
  }
  me.id = id;
  me.setId(id);
  Ext.ComponentManager.register(me);
  me.initElement();
  me.initConfig(me.initialConfig);
  me.refreshSizeState = me.doRefreshSizeState;
  me.refreshFloating = me.doRefreshFloating;
  if (me.refreshSizeStateOnInitialized) 
  {
    me.refreshSizeState();
  }
  if (me.refreshFloatingOnInitialized) 
  {
    me.refreshFloating();
  }
  me.initialize();
  me.triggerInitialized();
  if (me.config.fullscreen) 
  {
    me.fireEvent('fullscreen', me);
  }
  me.fireEvent('initialize', me);
}, beforeInitConfig: function(config) {
  this.beforeInitialize.apply(this, arguments);
}, beforeInitialize: Ext.emptyFn, initialize: Ext.emptyFn, getTemplate: function() {
  return this.template;
}, getElementConfig: function() {
  return {reference: 'element', classList: ['x-unsized'], children: this.getTemplate()};
}, triggerInitialized: function() {
  var listeners = this.onInitializedListeners, ln = listeners.length, listener, fn, scope, args, i;
  if (!this.initialized) 
  {
    this.initialized = true;
    if (ln > 0) 
    {
      for (i = 0; i < ln; i++) 
        {
          listener = listeners[i];
          fn = listener.fn;
          scope = listener.scope;
          args = listener.args;
          if (typeof fn == 'string') 
          {
            scope[fn].apply(scope, args);
          } else {
            fn.apply(scope, args);
          }
        }
      listeners.length = 0;
    }
  }
}, onInitialized: function(fn, scope, args) {
  var listeners = this.onInitializedListeners;
  if (!scope) 
  {
    scope = this;
  }
  if (this.initialized) 
  {
    if (typeof fn == 'string') 
    {
      scope[fn].apply(scope, args);
    } else {
      fn.apply(scope, args);
    }
  } else {
    listeners.push({fn: fn, scope: scope, args: args});
  }
}, renderTo: function(container, insertBeforeElement) {
  var dom = this.renderElement.dom, containerDom = Ext.getDom(container), insertBeforeChildDom = Ext.getDom(insertBeforeElement);
  if (containerDom) 
  {
    if (insertBeforeChildDom) 
    {
      containerDom.insertBefore(dom, insertBeforeChildDom);
    } else {
      containerDom.appendChild(dom);
    }
    this.setRendered(Boolean(dom.offsetParent));
  }
}, setParent: function(parent) {
  var currentParent = this.parent;
  if (parent && currentParent && currentParent !== parent) 
  {
    currentParent.remove(this, false);
  }
  this.parent = parent;
  return this;
}, applyPlugins: function(config) {
  var ln, i, configObj;
  if (!config) 
  {
    return config;
  }
  config = [].concat(config);
  for (i = 0 , ln = config.length; i < ln; i++) 
    {
      configObj = config[i];
      config[i] = Ext.factory(configObj, 'Ext.plugin.Plugin', null, 'plugin');
    }
  return config;
}, updatePlugins: function(newPlugins, oldPlugins) {
  var ln, i;
  if (newPlugins) 
  {
    for (i = 0 , ln = newPlugins.length; i < ln; i++) 
      {
        newPlugins[i].init(this);
      }
  }
  if (oldPlugins) 
  {
    for (i = 0 , ln = oldPlugins.length; i < ln; i++) 
      {
        Ext.destroy(oldPlugins[i]);
      }
  }
}, updateRenderTo: function(newContainer) {
  this.renderTo(newContainer);
}, updateStyle: function(style) {
  this.element.applyStyles(style);
}, updateBorder: function(border) {
  this.element.setBorder(border);
}, updatePadding: function(padding) {
  this.innerElement.setPadding(padding);
}, updateMargin: function(margin) {
  this.element.setMargin(margin);
}, updateUi: function(newUi, oldUi) {
  var baseCls = this.getBaseCls(), element = this.element, currentUi = this.currentUi;
  if (baseCls) 
  {
    if (oldUi) 
    {
      if (currentUi) 
      {
        element.removeCls(currentUi);
      } else {
        element.removeCls(baseCls + '-' + oldUi);
      }
    }
    if (newUi) 
    {
      element.addCls(newUi, baseCls);
      this.currentUi = baseCls + '-' + newUi;
      if (!this.self.prototype.currentUi) 
      {
        this.self.prototype.currentUi = this.currentUi;
      }
    }
  }
}, applyBaseCls: function(baseCls) {
  return baseCls || clsPrefix + this.xtype;
}, updateBaseCls: function(newBaseCls, oldBaseCls) {
  var me = this, ui = me.getUi();
  if (oldBaseCls) 
  {
    this.element.removeCls(oldBaseCls);
    if (ui) 
    {
      this.element.removeCls(this.currentUi);
    }
  }
  if (newBaseCls) 
  {
    this.element.addCls(newBaseCls);
    if (ui) 
    {
      this.element.addCls(newBaseCls, null, ui);
      this.currentUi = newBaseCls + '-' + ui;
    }
  }
}, addCls: function(cls, prefix, suffix) {
  var oldCls = this.getCls(), newCls = (oldCls) ? oldCls.slice() : [], ln, i, cachedCls;
  prefix = prefix || '';
  suffix = suffix || '';
  if (typeof cls == "string") 
  {
    cls = [cls];
  }
  ln = cls.length;
  if (!newCls.length && prefix === '' && suffix === '') 
  {
    newCls = cls;
  } else {
    for (i = 0; i < ln; i++) 
      {
        cachedCls = prefix + cls[i] + suffix;
        if (newCls.indexOf(cachedCls) == -1) 
        {
          newCls.push(cachedCls);
        }
      }
  }
  this.setCls(newCls);
}, removeCls: function(cls, prefix, suffix) {
  var oldCls = this.getCls(), newCls = (oldCls) ? oldCls.slice() : [], ln, i;
  prefix = prefix || '';
  suffix = suffix || '';
  if (typeof cls == "string") 
  {
    newCls = Ext.Array.remove(newCls, prefix + cls + suffix);
  } else {
    ln = cls.length;
    for (i = 0; i < ln; i++) 
      {
        newCls = Ext.Array.remove(newCls, prefix + cls[i] + suffix);
      }
  }
  this.setCls(newCls);
}, replaceCls: function(oldCls, newCls, prefix, suffix) {
  var cls = this.getCls(), array = (cls) ? cls.slice() : [], ln, i, cachedCls;
  prefix = prefix || '';
  suffix = suffix || '';
  if (typeof oldCls == "string") 
  {
    array = Ext.Array.remove(array, prefix + oldCls + suffix);
  } else if (oldCls) 
  {
    ln = oldCls.length;
    for (i = 0; i < ln; i++) 
      {
        array = Ext.Array.remove(array, prefix + oldCls[i] + suffix);
      }
  }
  if (typeof newCls == "string") 
  {
    array.push(prefix + newCls + suffix);
  } else if (newCls) 
  {
    ln = newCls.length;
    if (!array.length && prefix === '' && suffix === '') 
    {
      array = newCls;
    } else {
      for (i = 0; i < ln; i++) 
        {
          cachedCls = prefix + newCls[i] + suffix;
          if (array.indexOf(cachedCls) == -1) 
          {
            array.push(cachedCls);
          }
        }
    }
  }
  this.setCls(array);
}, toggleCls: function(className, force) {
  var oldCls = this.getCls(), newCls = (oldCls) ? oldCls.slice() : [];
  if (force || newCls.indexOf(className) == -1) 
  {
    newCls.push(className);
  } else {
    Ext.Array.remove(newCls, className);
  }
  this.setCls(newCls);
  return this;
}, applyCls: function(cls) {
  if (typeof cls == "string") 
  {
    cls = [cls];
  }
  if (!cls || !cls.length) 
  {
    cls = null;
  }
  return cls;
}, updateCls: function(newCls, oldCls) {
  if (this.element && ((newCls && !oldCls) || (!newCls && oldCls) || newCls.length != oldCls.length || Ext.Array.difference(newCls, oldCls).length > 0)) 
  {
    this.element.replaceCls(oldCls, newCls);
  }
}, updateStyleHtmlCls: function(newHtmlCls, oldHtmlCls) {
  var innerHtmlElement = this.innerHtmlElement, innerElement = this.innerElement;
  if (this.getStyleHtmlContent() && oldHtmlCls) 
  {
    if (innerHtmlElement) 
    {
      innerHtmlElement.replaceCls(oldHtmlCls, newHtmlCls);
    } else {
      innerElement.replaceCls(oldHtmlCls, newHtmlCls);
    }
  }
}, applyStyleHtmlContent: function(config) {
  return Boolean(config);
}, updateStyleHtmlContent: function(styleHtmlContent) {
  var htmlCls = this.getStyleHtmlCls(), innerElement = this.innerElement, innerHtmlElement = this.innerHtmlElement;
  if (styleHtmlContent) 
  {
    if (innerHtmlElement) 
    {
      innerHtmlElement.addCls(htmlCls);
    } else {
      innerElement.addCls(htmlCls);
    }
  } else {
    if (innerHtmlElement) 
    {
      innerHtmlElement.removeCls(htmlCls);
    } else {
      innerElement.addCls(htmlCls);
    }
  }
}, applyContentEl: function(contentEl) {
  if (contentEl) 
  {
    return Ext.get(contentEl);
  }
}, updateContentEl: function(newContentEl, oldContentEl) {
  if (oldContentEl) 
  {
    oldContentEl.hide();
    Ext.getBody().append(oldContentEl);
  }
  if (newContentEl) 
  {
    this.setHtml(newContentEl.dom);
    newContentEl.show();
  }
}, getSize: function() {
  return {width: this.getWidth(), height: this.getHeight()};
}, isCentered: function() {
  return Boolean(this.getCentered());
}, isFloating: function() {
  return this.floating;
}, isDocked: function() {
  return Boolean(this.getDocked());
}, isInnerItem: function() {
  return this.isInner;
}, setIsInner: function(isInner) {
  if (isInner !== this.isInner) 
  {
    this.isInner = isInner;
    if (this.initialized) 
    {
      this.fireEvent('innerstatechange', this, isInner);
    }
  }
}, filterLengthValue: function(value) {
  if (value === 'auto' || (!value && value !== 0)) 
  {
    return null;
  }
  return value;
}, applyTop: function(top) {
  return this.filterLengthValue(top);
}, applyRight: function(right) {
  return this.filterLengthValue(right);
}, applyBottom: function(bottom) {
  return this.filterLengthValue(bottom);
}, applyLeft: function(left) {
  return this.filterLengthValue(left);
}, applyWidth: function(width) {
  return this.filterLengthValue(width);
}, applyHeight: function(height) {
  return this.filterLengthValue(height);
}, applyMinWidth: function(width) {
  return this.filterLengthValue(width);
}, applyMinHeight: function(height) {
  return this.filterLengthValue(height);
}, applyMaxWidth: function(width) {
  return this.filterLengthValue(width);
}, applyMaxHeight: function(height) {
  return this.filterLengthValue(height);
}, doSetTop: function(top) {
  this.element.setTop(top);
  this.refreshFloating();
}, doSetRight: function(right) {
  this.element.setRight(right);
  this.refreshFloating();
}, doSetBottom: function(bottom) {
  this.element.setBottom(bottom);
  this.refreshFloating();
}, doSetLeft: function(left) {
  this.element.setLeft(left);
  this.refreshFloating();
}, doSetWidth: function(width) {
  this.element.setWidth(width);
  this.refreshSizeState();
}, doSetHeight: function(height) {
  this.element.setHeight(height);
  this.refreshSizeState();
}, applyFlex: function(flex) {
  if (flex) 
  {
    flex = Number(flex);
    if (isNaN(flex)) 
    {
      flex = null;
    }
  } else {
    flex = null;
  }
  return flex;
}, doSetFlex: Ext.emptyFn, refreshSizeState: function() {
  this.refreshSizeStateOnInitialized = true;
}, doRefreshSizeState: function() {
  var hasWidth = this.getWidth() !== null || this.widthLayoutSized || (this.getLeft() !== null && this.getRight() !== null), hasHeight = this.getHeight() !== null || this.heightLayoutSized || (this.getTop() !== null && this.getBottom() !== null), stretched = this.layoutStretched || this.hasCSSMinHeight || (!hasHeight && this.getMinHeight() !== null), state = hasWidth && hasHeight, flags = (hasWidth && this.LAYOUT_WIDTH) | (hasHeight && this.LAYOUT_HEIGHT) | (stretched && this.LAYOUT_STRETCHED);
  if (!state && stretched) 
  {
    state = null;
  }
  this.setSizeState(state);
  this.setSizeFlags(flags);
}, setLayoutSizeFlags: function(flags) {
  this.layoutStretched = !!(flags & this.LAYOUT_STRETCHED);
  this.widthLayoutSized = !!(flags & this.LAYOUT_WIDTH);
  this.heightLayoutSized = !!(flags & this.LAYOUT_HEIGHT);
  this.refreshSizeState();
}, setSizeFlags: function(flags) {
  if (flags !== this.sizeFlags) 
  {
    this.sizeFlags = flags;
    var hasWidth = !!(flags & this.LAYOUT_WIDTH), hasHeight = !!(flags & this.LAYOUT_HEIGHT), stretched = !!(flags & this.LAYOUT_STRETCHED);
    if (hasWidth && !stretched && !hasHeight) 
    {
      this.element.addCls('x-has-width');
    } else {
      this.element.removeCls('x-has-width');
    }
    if (hasHeight && !stretched && !hasWidth) 
    {
      this.element.addCls('x-has-height');
    } else {
      this.element.removeCls('x-has-height');
    }
    if (this.initialized) 
    {
      this.fireEvent('sizeflagschange', this, flags);
    }
  }
}, getSizeFlags: function() {
  if (!this.initialized) 
  {
    this.doRefreshSizeState();
  }
  return this.sizeFlags;
}, setSizeState: function(state) {
  if (state !== this.sizeState) 
  {
    this.sizeState = state;
    this.element.setSizeState(state);
    if (this.initialized) 
    {
      this.fireEvent('sizestatechange', this, state);
    }
  }
}, getSizeState: function() {
  if (!this.initialized) 
  {
    this.doRefreshSizeState();
  }
  return this.sizeState;
}, doSetMinWidth: function(width) {
  this.element.setMinWidth(width);
}, doSetMinHeight: function(height) {
  this.element.setMinHeight(height);
  this.refreshSizeState();
}, doSetMaxWidth: function(width) {
  this.element.setMaxWidth(width);
}, doSetMaxHeight: function(height) {
  this.element.setMaxHeight(height);
}, applyCentered: function(centered) {
  centered = Boolean(centered);
  if (centered) 
  {
    this.refreshInnerState = Ext.emptyFn;
    if (this.isFloating()) 
    {
      this.resetFloating();
    }
    if (this.isDocked()) 
    {
      this.setDocked(false);
    }
    this.setIsInner(false);
    delete this.refreshInnerState;
  }
  return centered;
}, doSetCentered: function(centered) {
  this.toggleCls(this.getFloatingCls(), centered);
  if (!centered) 
  {
    this.refreshInnerState();
  }
}, applyDocked: function(docked) {
  if (!docked) 
  {
    return null;
  }
  this.refreshInnerState = Ext.emptyFn;
  if (this.isFloating()) 
  {
    this.resetFloating();
  }
  if (this.isCentered()) 
  {
    this.setCentered(false);
  }
  this.setIsInner(false);
  delete this.refreshInnerState;
  return docked;
}, doSetDocked: function(docked, oldDocked) {
  this.fireEvent('afterdockedchange', this, docked, oldDocked);
  if (!docked) 
  {
    this.refreshInnerState();
  }
}, resetFloating: function() {
  this.setTop(null);
  this.setRight(null);
  this.setBottom(null);
  this.setLeft(null);
}, refreshInnerState: function() {
  this.setIsInner(!this.isCentered() && !this.isFloating() && !this.isDocked());
}, refreshFloating: function() {
  this.refreshFloatingOnInitialized = true;
}, doRefreshFloating: function() {
  var floating = true, floatingCls = this.getFloatingCls();
  if (this.getTop() === null && this.getBottom() === null && this.getRight() === null && this.getLeft() === null) 
  {
    floating = false;
  } else {
    this.refreshSizeState();
  }
  if (floating !== this.floating) 
  {
    this.floating = floating;
    if (floating) 
    {
      this.refreshInnerState = Ext.emptyFn;
      if (this.isCentered()) 
      {
        this.setCentered(false);
      }
      if (this.isDocked()) 
      {
        this.setDocked(false);
      }
      this.setIsInner(false);
      delete this.refreshInnerState;
    }
    this.element.toggleCls(floatingCls, floating);
    if (this.initialized) 
    {
      this.fireEvent('floatingchange', this, floating);
    }
    if (!floating) 
    {
      this.refreshInnerState();
    }
  }
}, updateFloatingCls: function(newFloatingCls, oldFloatingCls) {
  if (this.isFloating()) 
  {
    this.replaceCls(oldFloatingCls, newFloatingCls);
  }
}, applyDisabled: function(disabled) {
  return Boolean(disabled);
}, doSetDisabled: function(disabled) {
  this.element[disabled ? 'addCls' : 'removeCls'](this.getDisabledCls());
}, updateDisabledCls: function(newDisabledCls, oldDisabledCls) {
  if (this.isDisabled()) 
  {
    this.element.replaceCls(oldDisabledCls, newDisabledCls);
  }
}, disable: function() {
  this.setDisabled(true);
}, enable: function() {
  this.setDisabled(false);
}, isDisabled: function() {
  return this.getDisabled();
}, applyZIndex: function(zIndex) {
  if (!zIndex && zIndex !== 0) 
  {
    zIndex = null;
  }
  if (zIndex !== null) 
  {
    zIndex = Number(zIndex);
    if (isNaN(zIndex)) 
    {
      zIndex = null;
    }
  }
  return zIndex;
}, updateZIndex: function(zIndex) {
  var element = this.element, domStyle;
  if (element && !element.isDestroyed) 
  {
    domStyle = element.dom.style;
    if (zIndex !== null) 
    {
      domStyle.setProperty('z-index', zIndex, 'important');
    } else {
      domStyle.removeProperty('z-index');
    }
  }
}, getInnerHtmlElement: function() {
  var innerHtmlElement = this.innerHtmlElement, styleHtmlCls;
  if (!innerHtmlElement || !innerHtmlElement.dom || !innerHtmlElement.dom.parentNode) 
  {
    this.innerHtmlElement = innerHtmlElement = Ext.Element.create({cls: 'x-innerhtml'});
    if (this.getStyleHtmlContent()) 
    {
      styleHtmlCls = this.getStyleHtmlCls();
      this.innerHtmlElement.addCls(styleHtmlCls);
      this.innerElement.removeCls(styleHtmlCls);
    }
    this.innerElement.appendChild(innerHtmlElement);
  }
  return innerHtmlElement;
}, updateHtml: function(html) {
  if (!this.isDestroyed) 
  {
    var innerHtmlElement = this.getInnerHtmlElement();
    if (Ext.isElement(html)) 
    {
      innerHtmlElement.setHtml('');
      innerHtmlElement.append(html);
    } else {
      innerHtmlElement.setHtml(html);
    }
  }
}, applyHidden: function(hidden) {
  return Boolean(hidden);
}, doSetHidden: function(hidden) {
  var element = this.renderElement;
  if (element.isDestroyed) 
  {
    return;
  }
  if (hidden) 
  {
    element.hide();
  } else {
    element.show();
  }
  if (this.element) 
  {
    this.element[hidden ? 'addCls' : 'removeCls'](this.getHiddenCls());
  }
  this.fireEvent(hidden ? 'hide' : 'show', this);
}, updateHiddenCls: function(newHiddenCls, oldHiddenCls) {
  if (this.isHidden()) 
  {
    this.element.replaceCls(oldHiddenCls, newHiddenCls);
  }
}, isHidden: function() {
  return this.getHidden();
}, hide: function(animation) {
  this.setCurrentAlignmentInfo(null);
  if (this.activeAnimation) 
  {
    this.activeAnimation.on({animationend: function() {
  this.hide(animation);
}, scope: this, single: true});
    return this;
  }
  if (!this.getHidden()) 
  {
    if (animation === undefined || (animation && animation.isComponent)) 
    {
      animation = this.getHideAnimation();
    }
    if (animation) 
    {
      if (animation === true) 
      {
        animation = 'fadeOut';
      }
      this.onBefore({hiddenchange: 'animateFn', scope: this, single: true, args: [animation]});
    }
    this.setHidden(true);
  }
  return this;
}, show: function(animation) {
  if (this.activeAnimation) 
  {
    this.activeAnimation.on({animationend: function() {
  this.show(animation);
}, scope: this, single: true});
    return this;
  }
  var hidden = this.getHidden();
  if (hidden || hidden === null) 
  {
    if (animation === true) 
    {
      animation = 'fadeIn';
    } else if (animation === undefined || (animation && animation.isComponent)) 
    {
      animation = this.getShowAnimation();
    }
    if (animation) 
    {
      this.beforeShowAnimation();
      this.onBefore({hiddenchange: 'animateFn', scope: this, single: true, args: [animation]});
    }
    this.setHidden(false);
  }
  return this;
}, beforeShowAnimation: function() {
  if (this.element) 
  {
    this.renderElement.show();
    this.element.removeCls(this.getHiddenCls());
  }
}, animateFn: function(animation, component, newState, oldState, options, controller) {
  var me = this;
  if (animation && (!newState || (newState && this.isPainted()))) 
  {
    this.activeAnimation = new Ext.fx.Animation(animation);
    this.activeAnimation.setElement(component.element);
    if (!Ext.isEmpty(newState)) 
    {
      this.activeAnimation.setOnEnd(function() {
  me.activeAnimation = null;
  controller.resume();
});
      controller.pause();
    }
    Ext.Animator.run(me.activeAnimation);
  }
}, setVisibility: function(isVisible) {
  this.renderElement.setVisibility(isVisible);
}, isRendered: function() {
  return this.rendered;
}, isPainted: function() {
  return this.renderElement.isPainted();
}, applyTpl: function(config) {
  return (Ext.isObject(config) && config.isTemplate) ? config : new Ext.XTemplate(config);
}, applyData: function(data) {
  if (Ext.isObject(data)) 
  {
    return Ext.apply({}, data);
  } else if (!data) 
  {
    data = {};
  }
  return data;
}, updateData: function(newData) {
  var me = this;
  if (newData) 
  {
    var tpl = me.getTpl(), tplWriteMode = me.getTplWriteMode();
    if (tpl) 
    {
      tpl[tplWriteMode](me.getInnerHtmlElement(), newData);
    }
    this.fireEvent('updatedata', me, newData);
  }
}, applyRecord: function(config) {
  if (config && Ext.isObject(config) && config.isModel) 
  {
    return config;
  }
  return null;
}, updateRecord: function(newRecord, oldRecord) {
  var me = this;
  if (oldRecord) 
  {
    oldRecord.unjoin(me);
  }
  if (!newRecord) 
  {
    me.updateData('');
  } else {
    newRecord.join(me);
    me.updateData(newRecord.getData(true));
  }
}, afterEdit: function() {
  this.updateRecord(this.getRecord());
}, afterErase: function() {
  this.setRecord(null);
}, applyItemId: function(itemId) {
  return itemId || this.getId();
}, isXType: function(xtype, shallow) {
  if (shallow) 
  {
    return this.xtypes.indexOf(xtype) != -1;
  }
  return Boolean(this.xtypesMap[xtype]);
}, getXTypes: function() {
  return this.xtypesChain.join('/');
}, getDraggableBehavior: function() {
  var behavior = this.draggableBehavior;
  if (!behavior) 
  {
    behavior = this.draggableBehavior = new Ext.behavior.Draggable(this);
  }
  return behavior;
}, applyDraggable: function(config) {
  this.getDraggableBehavior().setConfig(config);
}, getDraggable: function() {
  return this.getDraggableBehavior().getDraggable();
}, getTranslatableBehavior: function() {
  var behavior = this.translatableBehavior;
  if (!behavior) 
  {
    behavior = this.translatableBehavior = new Ext.behavior.Translatable(this);
  }
  return behavior;
}, applyTranslatable: function(config) {
  this.getTranslatableBehavior().setConfig(config);
}, getTranslatable: function() {
  return this.getTranslatableBehavior().getTranslatable();
}, translateAxis: function(axis, value, animation) {
  var x, y;
  if (axis === 'x') 
  {
    x = value;
  } else {
    y = value;
  }
  return this.translate(x, y, animation);
}, translate: function() {
  var translatable = this.getTranslatable();
  if (!translatable) 
  {
    this.setTranslatable(true);
    translatable = this.getTranslatable();
  }
  translatable.translate.apply(translatable, arguments);
}, setRendered: function(rendered) {
  var wasRendered = this.rendered;
  if (rendered !== wasRendered) 
  {
    this.rendered = rendered;
    return true;
  }
  return false;
}, setSize: function(width, height) {
  if (width != undefined) 
  {
    this.setWidth(width);
  }
  if (height != undefined) 
  {
    this.setHeight(height);
  }
}, doAddListener: function(name, fn, scope, options, order) {
  if (options && 'element' in options) 
  {
    return this[options.element].doAddListener(name, fn, scope || this, options, order);
  }
  if (name == 'painted' || name == 'resize') 
  {
    return this.element.doAddListener(name, fn, scope || this, options, order);
  }
  return this.callParent(arguments);
}, doRemoveListener: function(name, fn, scope, options, order) {
  if (options && 'element' in options) 
  {
    this[options.element].doRemoveListener(name, fn, scope || this, options, order);
  }
  return this.callParent(arguments);
}, showBy: function(component, alignment) {
  var me = this, viewport = Ext.Viewport, parent = me.getParent();
  me.setVisibility(false);
  if (parent !== viewport) 
  {
    viewport.add(me);
  }
  me.show();
  me.on({hide: 'onShowByErased', destroy: 'onShowByErased', single: true, scope: me});
  viewport.on('resize', 'alignTo', me, {args: [component, alignment]});
  me.alignTo(component, alignment);
  me.setVisibility(true);
}, onShowByErased: function() {
  Ext.Viewport.un('resize', 'alignTo', this);
}, getAlignmentInfo: function(component, alignment) {
  var alignToElement = component.isComponent ? component.renderElement : component, alignToBox = alignToElement.getPageBox(), element = this.renderElement, box = element.getPageBox(), stats = {alignToBox: alignToBox, alignment: alignment, top: alignToBox.top, left: alignToBox.left, alignToWidth: alignToBox.width, alignToHeight: alignToBox.height, width: box.width, height: box.height}, currentAlignmentInfo = this.getCurrentAlignmentInfo(), isAligned = true;
  if (!Ext.isEmpty(currentAlignmentInfo)) 
  {
    Ext.Object.each(stats, function(key, value) {
  if (!Ext.isObject(value) && currentAlignmentInfo[key] != value) 
  {
    isAligned = false;
    return false;
  }
  return true;
});
  } else {
    isAligned = false;
  }
  return {isAligned: isAligned, stats: stats};
}, getCurrentAlignmentInfo: function() {
  return this.$currentAlignmentInfo;
}, setCurrentAlignmentInfo: function(alignmentInfo) {
  this.$currentAlignmentInfo = Ext.isEmpty(alignmentInfo) ? null : Ext.merge({}, alignmentInfo.stats ? alignmentInfo.stats : alignmentInfo);
}, alignTo: function(component, alignment) {
  var alignmentInfo = this.getAlignmentInfo(component, alignment);
  if (alignmentInfo.isAligned) 
  return;
  var alignToBox = alignmentInfo.stats.alignToBox, constrainBox = this.getParent().element.getPageBox(), alignToHeight = alignmentInfo.stats.alignToHeight, alignToWidth = alignmentInfo.stats.alignToWidth, height = alignmentInfo.stats.height, width = alignmentInfo.stats.width;
  constrainBox.bottom -= 5;
  constrainBox.height -= 10;
  constrainBox.left += 5;
  constrainBox.right -= 5;
  constrainBox.top += 5;
  constrainBox.width -= 10;
  if (!alignment || alignment === 'auto') 
  {
    if (constrainBox.bottom - alignToBox.bottom < height) 
    {
      if (alignToBox.top - constrainBox.top < height) 
      {
        if (alignToBox.left - constrainBox.left < width) 
        {
          alignment = 'cl-cr?';
        } else {
          alignment = 'cr-cl?';
        }
      } else {
        alignment = 'bc-tc?';
      }
    } else {
      alignment = 'tc-bc?';
    }
  }
  var matches = alignment.match(this.alignmentRegex);
  var from = matches[1].split(''), to = matches[2].split(''), constrained = (matches[3] === '?'), fromVertical = from[0], fromHorizontal = from[1] || fromVertical, toVertical = to[0], toHorizontal = to[1] || toVertical, top = alignToBox.top, left = alignToBox.left, halfAlignHeight = alignToHeight / 2, halfAlignWidth = alignToWidth / 2, halfWidth = width / 2, halfHeight = height / 2, maxLeft, maxTop;
  switch (fromVertical) {
    case 't':
      switch (toVertical) {
        case 'c':
          top += halfAlignHeight;
          break;
        case 'b':
          top += alignToHeight;
      }
      break;
    case 'b':
      switch (toVertical) {
        case 'c':
          top -= (height - halfAlignHeight);
          break;
        case 't':
          top -= height;
          break;
        case 'b':
          top -= height - alignToHeight;
      }
      break;
    case 'c':
      switch (toVertical) {
        case 't':
          top -= halfHeight;
          break;
        case 'c':
          top -= (halfHeight - halfAlignHeight);
          break;
        case 'b':
          top -= (halfHeight - alignToHeight);
      }
      break;
  }
  switch (fromHorizontal) {
    case 'l':
      switch (toHorizontal) {
        case 'c':
          left += halfAlignHeight;
          break;
        case 'r':
          left += alignToWidth;
      }
      break;
    case 'r':
      switch (toHorizontal) {
        case 'r':
          left -= (width - alignToWidth);
          break;
        case 'c':
          left -= (width - halfWidth);
          break;
        case 'l':
          left -= width;
      }
      break;
    case 'c':
      switch (toHorizontal) {
        case 'l':
          left -= halfWidth;
          break;
        case 'c':
          left -= (halfWidth - halfAlignWidth);
          break;
        case 'r':
          left -= (halfWidth - alignToWidth);
      }
      break;
  }
  if (constrained) 
  {
    maxLeft = (constrainBox.left + constrainBox.width) - width;
    maxTop = (constrainBox.top + constrainBox.height) - height;
    left = Math.max(constrainBox.left, Math.min(maxLeft, left));
    top = Math.max(constrainBox.top, Math.min(maxTop, top));
  }
  this.setLeft(left);
  this.setTop(top);
  this.setCurrentAlignmentInfo(alignmentInfo);
}, up: function(selector) {
  var result = this.parent;
  if (selector) 
  {
    for (; result; result = result.parent) 
      {
        if (Ext.ComponentQuery.is(result, selector)) 
        {
          return result;
        }
      }
  }
  return result;
}, getBubbleTarget: function() {
  return this.getParent();
}, destroy: function() {
  this.destroy = Ext.emptyFn;
  var parent = this.getParent(), referenceList = this.referenceList, i, ln, reference;
  this.isDestroying = true;
  Ext.destroy(this.getTranslatable(), this.getPlugins());
  if (parent) 
  {
    parent.remove(this, false);
  }
  for (i = 0 , ln = referenceList.length; i < ln; i++) 
    {
      reference = referenceList[i];
      this[reference].destroy();
      delete this[reference];
    }
  Ext.destroy(this.innerHtmlElement);
  this.setRecord(null);
  this.callSuper();
  Ext.ComponentManager.unregister(this);
}}, function() {
});
})(Ext.baseCSSPrefix);

Ext.define('Ext.layout.Abstract', {mixins: ['Ext.mixin.Observable'], isLayout: true, constructor: function(config) {
  this.initialConfig = config;
}, setContainer: function(container) {
  this.container = container;
  this.initConfig(this.initialConfig);
  return this;
}, onItemAdd: function() {
}, onItemRemove: function() {
}, onItemMove: function() {
}, onItemCenteredChange: function() {
}, onItemFloatingChange: function() {
}, onItemDockedChange: function() {
}, onItemInnerStateChange: function() {
}});

Ext.define('Ext.mixin.Bindable', {extend: 'Ext.mixin.Mixin', mixinConfig: {id: 'bindable'}, bind: function(instance, boundMethod, bindingMethod, preventDefault, extraArgs) {
  if (!bindingMethod) 
  {
    bindingMethod = boundMethod;
  }
  var boundFn = instance[boundMethod], fn, binding;
  if (boundFn && boundFn.hasOwnProperty('$binding')) 
  {
    binding = boundFn.$binding;
    if (binding.bindingMethod === bindingMethod && binding.bindingScope === this) 
    {
      return this;
    }
  }
  instance[boundMethod] = fn = function() {
  var binding = fn.$binding, scope = binding.bindingScope, args = Array.prototype.slice.call(arguments);
  args.push(arguments);
  if (extraArgs) 
  {
    args.push.apply(args, extraArgs);
  }
  if (!binding.preventDefault && scope[binding.bindingMethod].apply(scope, args) !== false) 
  {
    return binding.boundFn.apply(this, arguments);
  }
};
  fn.$binding = {preventDefault: !!preventDefault, boundFn: boundFn, bindingMethod: bindingMethod, bindingScope: this};
  return this;
}, unbind: function(instance, boundMethod, bindingMethod) {
  if (!bindingMethod) 
  {
    bindingMethod = boundMethod;
  }
  var fn = instance[boundMethod], binding = fn.$binding, boundFn, currentBinding;
  while (binding) 
    {
      boundFn = binding.boundFn;
      if (binding.bindingMethod === bindingMethod && binding.bindingScope === this) 
      {
        if (currentBinding) 
        {
          currentBinding.boundFn = boundFn;
        } else {
          instance[boundMethod] = boundFn;
        }
        return this;
      }
      currentBinding = binding;
      binding = boundFn.$binding;
    }
  return this;
}});

Ext.define('Ext.util.Wrapper', {mixins: ['Ext.mixin.Bindable'], constructor: function(elementConfig, wrappedElement) {
  var element = this.link('element', Ext.Element.create(elementConfig));
  if (wrappedElement) 
  {
    element.insertBefore(wrappedElement);
    this.wrap(wrappedElement);
  }
}, bindSize: function(sizeName) {
  var wrappedElement = this.wrappedElement, boundMethodName;
  this.boundSizeName = sizeName;
  this.boundMethodName = boundMethodName = sizeName === 'width' ? 'setWidth' : 'setHeight';
  this.bind(wrappedElement, boundMethodName, 'onBoundSizeChange');
  wrappedElement[boundMethodName].call(wrappedElement, wrappedElement.getStyleValue(sizeName));
}, onBoundSizeChange: function(size, args) {
  var element = this.element;
  if (typeof size === 'string' && size.substr(-1) === '%') 
  {
    args[0] = '100%';
  } else {
    size = '';
  }
  element[this.boundMethodName].call(element, size);
}, wrap: function(wrappedElement) {
  var element = this.element, innerDom;
  this.wrappedElement = wrappedElement;
  innerDom = element.dom;
  while (innerDom.firstElementChild !== null) 
    {
      innerDom = innerDom.firstElementChild;
    }
  innerDom.appendChild(wrappedElement.dom);
}, destroy: function() {
  var element = this.element, dom = element.dom, wrappedElement = this.wrappedElement, boundMethodName = this.boundMethodName, parentNode = dom.parentNode, size;
  if (boundMethodName) 
  {
    this.unbind(wrappedElement, boundMethodName, 'onBoundSizeChange');
    size = element.getStyle(this.boundSizeName);
    if (size) 
    {
      wrappedElement[boundMethodName].call(wrappedElement, size);
    }
  }
  if (parentNode) 
  {
    if (!wrappedElement.isDestroyed) 
    {
      parentNode.replaceChild(dom.firstElementChild, dom);
    }
    delete this.wrappedElement;
  }
  this.callSuper();
}});

Ext.define('Ext.layout.wrapper.BoxDock', {config: {direction: 'horizontal', element: {className: 'x-dock'}, bodyElement: {className: 'x-dock-body'}, innerWrapper: null, sizeState: false, container: null}, positionMap: {top: 'start', left: 'start', bottom: 'end', right: 'end'}, constructor: function(config) {
  this.items = {start: [], end: []};
  this.itemsCount = 0;
  this.initConfig(config);
}, addItems: function(items) {
  var i, ln, item;
  for (i = 0 , ln = items.length; i < ln; i++) 
    {
      item = items[i];
      this.addItem(item);
    }
}, addItem: function(item) {
  var docked = item.getDocked(), position = this.positionMap[docked], wrapper = item.$dockWrapper, container = this.getContainer(), index = container.indexOf(item), element = item.element, items = this.items, sideItems = items[position], i, ln, sibling, referenceElement, siblingIndex;
  if (wrapper) 
  {
    wrapper.removeItem(item);
  }
  item.$dockWrapper = this;
  item.addCls('x-dock-item');
  item.addCls('x-docked-' + docked);
  for (i = 0 , ln = sideItems.length; i < ln; i++) 
    {
      sibling = sideItems[i];
      siblingIndex = container.indexOf(sibling);
      if (siblingIndex > index) 
      {
        referenceElement = sibling.element;
        sideItems.splice(i, 0, item);
        break;
      }
    }
  if (!referenceElement) 
  {
    sideItems.push(item);
    referenceElement = this.getBodyElement();
  }
  this.itemsCount++;
  if (position === 'start') 
  {
    element.insertBefore(referenceElement);
  } else {
    element.insertAfter(referenceElement);
  }
}, removeItem: function(item) {
  var position = item.getDocked(), items = this.items[this.positionMap[position]];
  Ext.Array.remove(items, item);
  item.element.detach();
  delete item.$dockWrapper;
  item.removeCls('x-dock-item');
  item.removeCls('x-docked-' + position);
  if (--this.itemsCount === 0) 
  {
    this.destroy();
  }
}, getItemsSlice: function(index) {
  var container = this.getContainer(), items = this.items, slice = [], sideItems, i, ln, item;
  for (sideItems = items.start , i = 0 , ln = sideItems.length; i < ln; i++) 
    {
      item = sideItems[i];
      if (container.indexOf(item) > index) 
      {
        slice.push(item);
      }
    }
  for (sideItems = items.end , i = 0 , ln = sideItems.length; i < ln; i++) 
    {
      item = sideItems[i];
      if (container.indexOf(item) > index) 
      {
        slice.push(item);
      }
    }
  return slice;
}, applyElement: function(element) {
  return Ext.Element.create(element);
}, updateElement: function(element) {
  element.addCls('x-dock-' + this.getDirection());
}, applyBodyElement: function(bodyElement) {
  return Ext.Element.create(bodyElement);
}, updateBodyElement: function(bodyElement) {
  this.getElement().append(bodyElement);
}, updateInnerWrapper: function(innerWrapper, oldInnerWrapper) {
  var bodyElement = this.getBodyElement();
  if (oldInnerWrapper && oldInnerWrapper.$outerWrapper === this) 
  {
    oldInnerWrapper.getElement().detach();
    delete oldInnerWrapper.$outerWrapper;
  }
  if (innerWrapper) 
  {
    innerWrapper.setSizeState(this.getSizeState());
    innerWrapper.$outerWrapper = this;
    bodyElement.append(innerWrapper.getElement());
  }
}, updateSizeState: function(state) {
  var innerWrapper = this.getInnerWrapper();
  this.getElement().setSizeState(state);
  if (innerWrapper) 
  {
    innerWrapper.setSizeState(state);
  }
}, destroy: function() {
  var innerWrapper = this.getInnerWrapper(), outerWrapper = this.$outerWrapper, innerWrapperElement;
  if (innerWrapper) 
  {
    if (outerWrapper) 
    {
      outerWrapper.setInnerWrapper(innerWrapper);
    } else {
      innerWrapperElement = innerWrapper.getElement();
      if (!innerWrapperElement.isDestroyed) 
      {
        innerWrapperElement.replace(this.getElement());
      }
      delete innerWrapper.$outerWrapper;
    }
  }
  delete this.$outerWrapper;
  this.setInnerWrapper(null);
  this.unlink('_bodyElement', '_element');
  this.callSuper();
}});

Ext.define('Ext.layout.wrapper.Inner', {config: {sizeState: null, container: null}, constructor: function(config) {
  this.initConfig(config);
}, getElement: function() {
  return this.getContainer().bodyElement;
}, setInnerWrapper: Ext.emptyFn, getInnerWrapper: Ext.emptyFn});

Ext.define('Ext.layout.Default', {extend: 'Ext.layout.Abstract', isAuto: true, alias: ['layout.default', 'layout.auto'], config: {animation: null}, centerWrapperClass: 'x-center', dockWrapperClass: 'x-dock', positionMap: {top: 'start', left: 'start', middle: 'center', bottom: 'end', right: 'end'}, positionDirectionMap: {top: 'vertical', bottom: 'vertical', left: 'horizontal', right: 'horizontal'}, setContainer: function(container) {
  var options = {delegate: '> component'};
  this.dockedItems = [];
  this.callSuper(arguments);
  container.on('centeredchange', 'onItemCenteredChange', this, options, 'before').on('floatingchange', 'onItemFloatingChange', this, options, 'before').on('dockedchange', 'onBeforeItemDockedChange', this, options, 'before').on('afterdockedchange', 'onAfterItemDockedChange', this, options);
}, monitorSizeStateChange: function() {
  this.monitorSizeStateChange = Ext.emptyFn;
  this.container.on('sizestatechange', 'onContainerSizeStateChange', this);
}, monitorSizeFlagsChange: function() {
  this.monitorSizeFlagsChange = Ext.emptyFn;
  this.container.on('sizeflagschange', 'onContainerSizeFlagsChange', this);
}, onItemAdd: function(item) {
  var docked = item.getDocked();
  if (docked !== null) 
  {
    this.dockItem(item);
  } else if (item.isCentered()) 
  {
    this.onItemCenteredChange(item, true);
  } else if (item.isFloating()) 
  {
    this.onItemFloatingChange(item, true);
  } else {
    this.onItemInnerStateChange(item, true);
  }
}, onItemInnerStateChange: function(item, isInner, destroying) {
  if (isInner) 
  {
    this.insertInnerItem(item, this.container.innerIndexOf(item));
  } else {
    this.removeInnerItem(item);
  }
}, insertInnerItem: function(item, index) {
  var container = this.container, containerDom = container.innerElement.dom, itemDom = item.element.dom, nextSibling = index !== -1 ? container.getInnerAt(index + 1) : null, nextSiblingDom = null, translatable;
  if (nextSibling) 
  {
    translatable = nextSibling.getTranslatable();
    if (translatable && translatable.getUseWrapper()) 
    {
      nextSiblingDom = translatable.getWrapper().dom;
    } else {
      nextSiblingDom = nextSibling ? nextSibling.element.dom : null;
    }
  }
  containerDom.insertBefore(itemDom, nextSiblingDom);
  return this;
}, insertBodyItem: function(item) {
  var container = this.container.setUseBodyElement(true), bodyDom = container.bodyElement.dom;
  if (item.getZIndex() === null) 
  {
    item.setZIndex((container.indexOf(item) + 1) * 2);
  }
  bodyDom.insertBefore(item.element.dom, bodyDom.firstChild);
  return this;
}, removeInnerItem: function(item) {
  item.element.detach();
}, removeBodyItem: function(item) {
  item.setZIndex(null);
  item.element.detach();
}, onItemRemove: function(item, index, destroying) {
  var docked = item.getDocked();
  if (docked) 
  {
    this.undockItem(item);
  } else if (item.isCentered()) 
  {
    this.onItemCenteredChange(item, false);
  } else if (item.isFloating()) 
  {
    this.onItemFloatingChange(item, false);
  } else {
    this.onItemInnerStateChange(item, false, destroying);
  }
}, onItemMove: function(item, toIndex, fromIndex) {
  if (item.isCentered() || item.isFloating()) 
  {
    item.setZIndex((toIndex + 1) * 2);
  } else if (item.isInnerItem()) 
  {
    this.insertInnerItem(item, this.container.innerIndexOf(item));
  } else {
    this.undockItem(item);
    this.dockItem(item);
  }
}, onItemCenteredChange: function(item, centered) {
  var wrapperName = '$centerWrapper';
  if (centered) 
  {
    this.insertBodyItem(item);
    item.link(wrapperName, new Ext.util.Wrapper({className: this.centerWrapperClass}, item.element));
  } else {
    item.unlink(wrapperName);
    this.removeBodyItem(item);
  }
}, onItemFloatingChange: function(item, floating) {
  if (floating) 
  {
    this.insertBodyItem(item);
  } else {
    this.removeBodyItem(item);
  }
}, onBeforeItemDockedChange: function(item, docked, oldDocked) {
  if (oldDocked) 
  {
    this.undockItem(item);
  }
}, onAfterItemDockedChange: function(item, docked, oldDocked) {
  if (docked) 
  {
    this.dockItem(item);
  }
}, onContainerSizeStateChange: function() {
  var dockWrapper = this.getDockWrapper();
  if (dockWrapper) 
  {
    dockWrapper.setSizeState(this.container.getSizeState());
  }
}, onContainerSizeFlagsChange: function() {
  var items = this.dockedItems, i, ln, item;
  for (i = 0 , ln = items.length; i < ln; i++) 
    {
      item = items[i];
      this.refreshDockedItemLayoutSizeFlags(item);
    }
}, refreshDockedItemLayoutSizeFlags: function(item) {
  var container = this.container, dockedDirection = this.positionDirectionMap[item.getDocked()], binaryMask = (dockedDirection === 'horizontal') ? container.LAYOUT_HEIGHT : container.LAYOUT_WIDTH, flags = (container.getSizeFlags() & binaryMask);
  item.setLayoutSizeFlags(flags);
}, dockItem: function(item) {
  var DockClass = Ext.layout.wrapper.BoxDock, dockedItems = this.dockedItems, ln = dockedItems.length, container = this.container, itemIndex = container.indexOf(item), positionDirectionMap = this.positionDirectionMap, direction = positionDirectionMap[item.getDocked()], dockInnerWrapper = this.dockInnerWrapper, referenceDirection, i, dockedItem, index, previousItem, slice, referenceItem, referenceDocked, referenceWrapper, newWrapper, nestedWrapper, oldInnerWrapper;
  this.monitorSizeStateChange();
  this.monitorSizeFlagsChange();
  if (!dockInnerWrapper) 
  {
    dockInnerWrapper = this.link('dockInnerWrapper', new Ext.layout.wrapper.Inner({container: this.container}));
  }
  if (ln === 0) 
  {
    dockedItems.push(item);
    newWrapper = new DockClass({container: this.container, direction: direction});
    newWrapper.addItem(item);
    newWrapper.getElement().replace(dockInnerWrapper.getElement());
    newWrapper.setInnerWrapper(dockInnerWrapper);
    container.onInitialized('onContainerSizeStateChange', this);
  } else {
    for (i = 0; i < ln; i++) 
      {
        dockedItem = dockedItems[i];
        index = container.indexOf(dockedItem);
        if (index > itemIndex) 
        {
          referenceItem = previousItem || dockedItems[0];
          dockedItems.splice(i, 0, item);
          break;
        }
        previousItem = dockedItem;
      }
    if (!referenceItem) 
    {
      referenceItem = dockedItems[ln - 1];
      dockedItems.push(item);
    }
    referenceDocked = referenceItem.getDocked();
    referenceWrapper = referenceItem.$dockWrapper;
    referenceDirection = positionDirectionMap[referenceDocked];
    if (direction === referenceDirection) 
    {
      referenceWrapper.addItem(item);
    } else {
      slice = referenceWrapper.getItemsSlice(itemIndex);
      newWrapper = new DockClass({container: this.container, direction: direction});
      if (slice.length > 0) 
      {
        if (slice.length === referenceWrapper.itemsCount) 
        {
          nestedWrapper = referenceWrapper;
          newWrapper.setSizeState(nestedWrapper.getSizeState());
          newWrapper.getElement().replace(nestedWrapper.getElement());
        } else {
          nestedWrapper = new DockClass({container: this.container, direction: referenceDirection});
          nestedWrapper.setInnerWrapper(referenceWrapper.getInnerWrapper());
          nestedWrapper.addItems(slice);
          referenceWrapper.setInnerWrapper(newWrapper);
        }
        newWrapper.setInnerWrapper(nestedWrapper);
      } else {
        oldInnerWrapper = referenceWrapper.getInnerWrapper();
        referenceWrapper.setInnerWrapper(null);
        newWrapper.setInnerWrapper(oldInnerWrapper);
        referenceWrapper.setInnerWrapper(newWrapper);
      }
      newWrapper.addItem(item);
    }
  }
  container.onInitialized('refreshDockedItemLayoutSizeFlags', this, [item]);
}, getDockWrapper: function() {
  var dockedItems = this.dockedItems;
  if (dockedItems.length > 0) 
  {
    return dockedItems[0].$dockWrapper;
  }
  return null;
}, undockItem: function(item) {
  var dockedItems = this.dockedItems;
  if (item.$dockWrapper) 
  {
    item.$dockWrapper.removeItem(item);
  }
  Ext.Array.remove(dockedItems, item);
  item.setLayoutSizeFlags(0);
}, destroy: function() {
  this.dockedItems.length = 0;
  delete this.dockedItems;
  this.callSuper();
}});

Ext.define('Ext.layout.Box', {extend: 'Ext.layout.Default', config: {orient: 'horizontal', align: 'start', pack: 'start'}, alias: 'layout.tablebox', layoutBaseClass: 'x-layout-tablebox', itemClass: 'x-layout-tablebox-item', setContainer: function(container) {
  this.callSuper(arguments);
  container.innerElement.addCls(this.layoutBaseClass);
  container.on('flexchange', 'onItemFlexChange', this, {delegate: '> component'});
}, onItemInnerStateChange: function(item, isInner) {
  this.callSuper(arguments);
  item.toggleCls(this.itemClass, isInner);
}, onItemFlexChange: function() {
}});

Ext.define('Ext.fx.layout.card.Abstract', {extend: 'Ext.Evented', isAnimation: true, config: {direction: 'left', duration: null, reverse: null, layout: null}, updateLayout: function() {
  this.enable();
}, enable: function() {
  var layout = this.getLayout();
  if (layout) 
  {
    layout.onBefore('activeitemchange', 'onActiveItemChange', this);
  }
}, disable: function() {
  var layout = this.getLayout();
  if (this.isAnimating) 
  {
    this.stopAnimation();
  }
  if (layout) 
  {
    layout.unBefore('activeitemchange', 'onActiveItemChange', this);
  }
}, onActiveItemChange: Ext.emptyFn, destroy: function() {
  var layout = this.getLayout();
  if (this.isAnimating) 
  {
    this.stopAnimation();
  }
  if (layout) 
  {
    layout.unBefore('activeitemchange', 'onActiveItemChange', this);
  }
  this.setLayout(null);
  if (this.observableId) 
  {
    this.fireEvent('destroy', this);
    this.clearListeners();
    this.clearManagedListeners();
  }
}});

Ext.define('Ext.fx.State', {isAnimatable: {'background-color': true, 'background-image': true, 'background-position': true, 'border-bottom-color': true, 'border-bottom-width': true, 'border-color': true, 'border-left-color': true, 'border-left-width': true, 'border-right-color': true, 'border-right-width': true, 'border-spacing': true, 'border-top-color': true, 'border-top-width': true, 'border-width': true, 'bottom': true, 'color': true, 'crop': true, 'font-size': true, 'font-weight': true, 'height': true, 'left': true, 'letter-spacing': true, 'line-height': true, 'margin-bottom': true, 'margin-left': true, 'margin-right': true, 'margin-top': true, 'max-height': true, 'max-width': true, 'min-height': true, 'min-width': true, 'opacity': true, 'outline-color': true, 'outline-offset': true, 'outline-width': true, 'padding-bottom': true, 'padding-left': true, 'padding-right': true, 'padding-top': true, 'right': true, 'text-indent': true, 'text-shadow': true, 'top': true, 'vertical-align': true, 'visibility': true, 'width': true, 'word-spacing': true, 'z-index': true, 'zoom': true, 'transform': true}, constructor: function(data) {
  this.data = {};
  this.set(data);
}, setConfig: function(data) {
  this.set(data);
  return this;
}, setRaw: function(data) {
  this.data = data;
  return this;
}, clear: function() {
  return this.setRaw({});
}, setTransform: function(name, value) {
  var data = this.data, isArray = Ext.isArray(value), transform = data.transform, ln, key;
  if (!transform) 
  {
    transform = data.transform = {translateX: 0, translateY: 0, translateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1, rotate: 0, rotateX: 0, rotateY: 0, rotateZ: 0, skewX: 0, skewY: 0};
  }
  if (typeof name == 'string') 
  {
    switch (name) {
      case 'translate':
        if (isArray) 
        {
          ln = value.length;
          if (ln == 0) 
          {
            break;
          }
          transform.translateX = value[0];
          if (ln == 1) 
          {
            break;
          }
          transform.translateY = value[1];
          if (ln == 2) 
          {
            break;
          }
          transform.translateZ = value[2];
        } else {
          transform.translateX = value;
        }
        break;
      case 'rotate':
        if (isArray) 
        {
          ln = value.length;
          if (ln == 0) 
          {
            break;
          }
          transform.rotateX = value[0];
          if (ln == 1) 
          {
            break;
          }
          transform.rotateY = value[1];
          if (ln == 2) 
          {
            break;
          }
          transform.rotateZ = value[2];
        } else {
          transform.rotate = value;
        }
        break;
      case 'scale':
        if (isArray) 
        {
          ln = value.length;
          if (ln == 0) 
          {
            break;
          }
          transform.scaleX = value[0];
          if (ln == 1) 
          {
            break;
          }
          transform.scaleY = value[1];
          if (ln == 2) 
          {
            break;
          }
          transform.scaleZ = value[2];
        } else {
          transform.scaleX = value;
          transform.scaleY = value;
        }
        break;
      case 'skew':
        if (isArray) 
        {
          ln = value.length;
          if (ln == 0) 
          {
            break;
          }
          transform.skewX = value[0];
          if (ln == 1) 
          {
            break;
          }
          transform.skewY = value[1];
        } else {
          transform.skewX = value;
        }
        break;
      default:
        transform[name] = value;
    }
  } else {
    for (key in name) 
      {
        if (name.hasOwnProperty(key)) 
        {
          value = name[key];
          this.setTransform(key, value);
        }
      }
  }
}, set: function(name, value) {
  var data = this.data, key;
  if (typeof name != 'string') 
  {
    for (key in name) 
      {
        value = name[key];
        if (key === 'transform') 
        {
          this.setTransform(value);
        } else {
          data[key] = value;
        }
      }
  } else {
    if (name === 'transform') 
    {
      this.setTransform(value);
    } else {
      data[name] = value;
    }
  }
  return this;
}, unset: function(name) {
  var data = this.data;
  if (data.hasOwnProperty(name)) 
  {
    delete data[name];
  }
  return this;
}, getData: function() {
  return this.data;
}});

Ext.define('Ext.fx.animation.Abstract', {extend: 'Ext.Evented', isAnimation: true, config: {name: '', element: null, before: null, from: {}, to: {}, after: null, states: {}, duration: 300, easing: 'linear', iteration: 1, direction: 'normal', delay: 0, onBeforeStart: null, onEnd: null, onBeforeEnd: null, scope: null, reverse: null, preserveEndState: false, replacePrevious: true}, STATE_FROM: '0%', STATE_TO: '100%', DIRECTION_UP: 'up', DIRECTION_DOWN: 'down', DIRECTION_LEFT: 'left', DIRECTION_RIGHT: 'right', stateNameRegex: /^(?:[\d\.]+)%$/, constructor: function() {
  this.states = {};
  this.callParent(arguments);
  return this;
}, applyElement: function(element) {
  return Ext.get(element);
}, applyBefore: function(before, current) {
  if (before) 
  {
    return Ext.factory(before, Ext.fx.State, current);
  }
}, applyAfter: function(after, current) {
  if (after) 
  {
    return Ext.factory(after, Ext.fx.State, current);
  }
}, setFrom: function(from) {
  return this.setState(this.STATE_FROM, from);
}, setTo: function(to) {
  return this.setState(this.STATE_TO, to);
}, getFrom: function() {
  return this.getState(this.STATE_FROM);
}, getTo: function() {
  return this.getState(this.STATE_TO);
}, setStates: function(states) {
  var validNameRegex = this.stateNameRegex, name;
  for (name in states) 
    {
      if (validNameRegex.test(name)) 
      {
        this.setState(name, states[name]);
      }
    }
  return this;
}, getStates: function() {
  return this.states;
}, stop: function() {
  this.fireEvent('stop', this);
}, destroy: function() {
  this.stop();
  this.callParent();
}, setState: function(name, state) {
  var states = this.getStates(), stateInstance;
  stateInstance = Ext.factory(state, Ext.fx.State, states[name]);
  if (stateInstance) 
  {
    states[name] = stateInstance;
  }
  return this;
}, getState: function(name) {
  return this.getStates()[name];
}, getData: function() {
  var states = this.getStates(), statesData = {}, before = this.getBefore(), after = this.getAfter(), from = states[this.STATE_FROM], to = states[this.STATE_TO], fromData = from.getData(), toData = to.getData(), data, name, state;
  for (name in states) 
    {
      if (states.hasOwnProperty(name)) 
      {
        state = states[name];
        data = state.getData();
        statesData[name] = data;
      }
    }
  if (Ext.browser.is.AndroidStock2) 
  {
    statesData['0.0001%'] = fromData;
  }
  return {before: before ? before.getData() : {}, after: after ? after.getData() : {}, states: statesData, from: fromData, to: toData, duration: this.getDuration(), iteration: this.getIteration(), direction: this.getDirection(), easing: this.getEasing(), delay: this.getDelay(), onEnd: this.getOnEnd(), onBeforeEnd: this.getOnBeforeEnd(), onBeforeStart: this.getOnBeforeStart(), scope: this.getScope(), preserveEndState: this.getPreserveEndState(), replacePrevious: this.getReplacePrevious()};
}});

Ext.define('Ext.fx.animation.Slide', {extend: 'Ext.fx.animation.Abstract', alternateClassName: 'Ext.fx.animation.SlideIn', alias: ['animation.slide', 'animation.slideIn'], config: {direction: 'left', out: false, offset: 0, easing: 'auto', containerBox: 'auto', elementBox: 'auto', isElementBoxFit: true, useCssTransform: true}, reverseDirectionMap: {up: 'down', down: 'up', left: 'right', right: 'left'}, applyEasing: function(easing) {
  if (easing === 'auto') 
  {
    return 'ease-' + ((this.getOut()) ? 'in' : 'out');
  }
  return easing;
}, getContainerBox: function() {
  var box = this._containerBox;
  if (box === 'auto') 
  {
    box = this.getElement().getParent().getPageBox();
  }
  return box;
}, getElementBox: function() {
  var box = this._elementBox;
  if (this.getIsElementBoxFit()) 
  {
    return this.getContainerBox();
  }
  if (box === 'auto') 
  {
    box = this.getElement().getPageBox();
  }
  return box;
}, getData: function() {
  var elementBox = this.getElementBox(), containerBox = this.getContainerBox(), box = elementBox ? elementBox : containerBox, from = this.getFrom(), to = this.getTo(), out = this.getOut(), offset = this.getOffset(), direction = this.getDirection(), useCssTransform = this.getUseCssTransform(), reverse = this.getReverse(), translateX = 0, translateY = 0, fromX, fromY, toX, toY;
  if (reverse) 
  {
    direction = this.reverseDirectionMap[direction];
  }
  switch (direction) {
    case this.DIRECTION_UP:
      if (out) 
      {
        translateY = containerBox.top - box.top - box.height - offset;
      } else {
        translateY = containerBox.bottom - box.bottom + box.height + offset;
      }
      break;
    case this.DIRECTION_DOWN:
      if (out) 
      {
        translateY = containerBox.bottom - box.bottom + box.height + offset;
      } else {
        translateY = containerBox.top - box.height - box.top - offset;
      }
      break;
    case this.DIRECTION_RIGHT:
      if (out) 
      {
        translateX = containerBox.right - box.right + box.width + offset;
      } else {
        translateX = containerBox.left - box.left - box.width - offset;
      }
      break;
    case this.DIRECTION_LEFT:
      if (out) 
      {
        translateX = containerBox.left - box.left - box.width - offset;
      } else {
        translateX = containerBox.right - box.right + box.width + offset;
      }
      break;
  }
  fromX = (out) ? 0 : translateX;
  fromY = (out) ? 0 : translateY;
  if (useCssTransform) 
  {
    from.setTransform({translateX: fromX, translateY: fromY});
  } else {
    from.set('left', fromX);
    from.set('top', fromY);
  }
  toX = (out) ? translateX : 0;
  toY = (out) ? translateY : 0;
  if (useCssTransform) 
  {
    to.setTransform({translateX: toX, translateY: toY});
  } else {
    to.set('left', toX);
    to.set('top', toY);
  }
  return this.callParent(arguments);
}});

Ext.define('Ext.fx.animation.SlideOut', {extend: 'Ext.fx.animation.Slide', alias: ['animation.slideOut'], config: {out: true}});

Ext.define('Ext.fx.animation.Fade', {extend: 'Ext.fx.animation.Abstract', alternateClassName: 'Ext.fx.animation.FadeIn', alias: ['animation.fade', 'animation.fadeIn'], config: {out: false, before: {display: null, opacity: 0}, after: {opacity: null}, reverse: null}, updateOut: function(newOut) {
  var to = this.getTo(), from = this.getFrom();
  if (newOut) 
  {
    from.set('opacity', 1);
    to.set('opacity', 0);
  } else {
    from.set('opacity', 0);
    to.set('opacity', 1);
  }
}});

Ext.define('Ext.fx.animation.FadeOut', {extend: 'Ext.fx.animation.Fade', alias: 'animation.fadeOut', config: {out: true, before: {}}});

Ext.define('Ext.fx.animation.Flip', {extend: 'Ext.fx.animation.Abstract', alias: 'animation.flip', config: {easing: 'ease-in', direction: 'right', half: false, out: null}, getData: function() {
  var from = this.getFrom(), to = this.getTo(), direction = this.getDirection(), out = this.getOut(), half = this.getHalf(), rotate = (half) ? 90 : 180, fromScale = 1, toScale = 1, fromRotateX = 0, fromRotateY = 0, toRotateX = 0, toRotateY = 0;
  if (out) 
  {
    toScale = 0.8;
  } else {
    fromScale = 0.8;
  }
  switch (direction) {
    case this.DIRECTION_UP:
      if (out) 
      {
        toRotateX = rotate;
      } else {
        fromRotateX = -rotate;
      }
      break;
    case this.DIRECTION_DOWN:
      if (out) 
      {
        toRotateX = -rotate;
      } else {
        fromRotateX = rotate;
      }
      break;
    case this.DIRECTION_RIGHT:
      if (out) 
      {
        toRotateY = rotate;
      } else {
        fromRotateY = -rotate;
      }
      break;
    case this.DIRECTION_LEFT:
      if (out) 
      {
        toRotateY = -rotate;
      } else {
        fromRotateY = rotate;
      }
      break;
  }
  from.setTransform({rotateX: fromRotateX, rotateY: fromRotateY, scale: fromScale});
  to.setTransform({rotateX: toRotateX, rotateY: toRotateY, scale: toScale});
  return this.callParent(arguments);
}});

Ext.define('Ext.fx.animation.Pop', {extend: 'Ext.fx.animation.Abstract', alias: ['animation.pop', 'animation.popIn'], alternateClassName: 'Ext.fx.animation.PopIn', config: {out: false, before: {display: null, opacity: 0}, after: {opacity: null}}, getData: function() {
  var to = this.getTo(), from = this.getFrom(), out = this.getOut();
  if (out) 
  {
    from.set('opacity', 1);
    from.setTransform({scale: 1});
    to.set('opacity', 0);
    to.setTransform({scale: 0});
  } else {
    from.set('opacity', 0);
    from.setTransform({scale: 0});
    to.set('opacity', 1);
    to.setTransform({scale: 1});
  }
  return this.callParent(arguments);
}});

Ext.define('Ext.fx.animation.PopOut', {extend: 'Ext.fx.animation.Pop', alias: 'animation.popOut', config: {out: true, before: {}}});

Ext.define('Ext.fx.Animation', {constructor: function(config) {
  var defaultClass = Ext.fx.animation.Abstract, type;
  if (typeof config == 'string') 
  {
    type = config;
    config = {};
  } else if (config && config.type) 
  {
    type = config.type;
  }
  if (type) 
  {
    if (Ext.browser.is.AndroidStock2) 
    {
      if (type == 'pop') 
      {
        type = 'fade';
      }
      if (type == 'popIn') 
      {
        type = 'fadeIn';
      }
      if (type == 'popOut') 
      {
        type = 'fadeOut';
      }
    }
    defaultClass = Ext.ClassManager.getByAlias('animation.' + type);
  }
  return Ext.factory(config, defaultClass);
}});

Ext.define('Ext.fx.layout.card.Style', {extend: 'Ext.fx.layout.card.Abstract', config: {inAnimation: {before: {visibility: null}, preserveEndState: false, replacePrevious: true}, outAnimation: {preserveEndState: false, replacePrevious: true}}, constructor: function(config) {
  var inAnimation, outAnimation;
  this.initConfig(config);
  this.endAnimationCounter = 0;
  inAnimation = this.getInAnimation();
  outAnimation = this.getOutAnimation();
  inAnimation.on('animationend', 'incrementEnd', this);
  outAnimation.on('animationend', 'incrementEnd', this);
}, updateDirection: function(direction) {
  this.getInAnimation().setDirection(direction);
  this.getOutAnimation().setDirection(direction);
}, updateDuration: function(duration) {
  this.getInAnimation().setDuration(duration);
  this.getOutAnimation().setDuration(duration);
}, updateReverse: function(reverse) {
  this.getInAnimation().setReverse(reverse);
  this.getOutAnimation().setReverse(reverse);
}, incrementEnd: function() {
  this.endAnimationCounter++;
  if (this.endAnimationCounter > 1) 
  {
    this.endAnimationCounter = 0;
    this.fireEvent('animationend', this);
  }
}, applyInAnimation: function(animation, inAnimation) {
  return Ext.factory(animation, Ext.fx.Animation, inAnimation);
}, applyOutAnimation: function(animation, outAnimation) {
  return Ext.factory(animation, Ext.fx.Animation, outAnimation);
}, updateInAnimation: function(animation) {
  animation.setScope(this);
}, updateOutAnimation: function(animation) {
  animation.setScope(this);
}, onActiveItemChange: function(cardLayout, newItem, oldItem, options, controller) {
  var inAnimation = this.getInAnimation(), outAnimation = this.getOutAnimation(), inElement, outElement;
  if (newItem && oldItem && oldItem.isPainted()) 
  {
    inElement = newItem.renderElement;
    outElement = oldItem.renderElement;
    inAnimation.setElement(inElement);
    outAnimation.setElement(outElement);
    outAnimation.setOnBeforeEnd(function(element, interrupted) {
  if (interrupted || Ext.Animator.hasRunningAnimations(element)) 
  {
    controller.firingArguments[1] = null;
    controller.firingArguments[2] = null;
  }
});
    outAnimation.setOnEnd(function() {
  controller.resume();
});
    inElement.dom.style.setProperty('visibility', 'hidden', 'important');
    newItem.show();
    Ext.Animator.run([outAnimation, inAnimation]);
    controller.pause();
  }
}, destroy: function() {
  Ext.destroy(this.getInAnimation(), this.getOutAnimation());
  this.callParent(arguments);
}});

Ext.define('Ext.fx.layout.card.Slide', {extend: 'Ext.fx.layout.card.Style', alias: 'fx.layout.card.slide', config: {inAnimation: {type: 'slide', easing: 'ease-out'}, outAnimation: {type: 'slide', easing: 'ease-out', out: true}}, updateReverse: function(reverse) {
  this.getInAnimation().setReverse(reverse);
  this.getOutAnimation().setReverse(reverse);
}});

Ext.define('Ext.fx.layout.card.Cover', {extend: 'Ext.fx.layout.card.Style', alias: 'fx.layout.card.cover', config: {reverse: null, inAnimation: {before: {'z-index': 100}, after: {'z-index': 0}, type: 'slide', easing: 'ease-out'}, outAnimation: {easing: 'ease-out', from: {opacity: 0.99}, to: {opacity: 1}, out: true}}, updateReverse: function(reverse) {
  this.getInAnimation().setReverse(reverse);
  this.getOutAnimation().setReverse(reverse);
}});

Ext.define('Ext.fx.layout.card.Reveal', {extend: 'Ext.fx.layout.card.Style', alias: 'fx.layout.card.reveal', config: {inAnimation: {easing: 'ease-out', from: {opacity: 0.99}, to: {opacity: 1}}, outAnimation: {before: {'z-index': 100}, after: {'z-index': 0}, type: 'slide', easing: 'ease-out', out: true}}, updateReverse: function(reverse) {
  this.getInAnimation().setReverse(reverse);
  this.getOutAnimation().setReverse(reverse);
}});

Ext.define('Ext.fx.layout.card.Fade', {extend: 'Ext.fx.layout.card.Style', alias: 'fx.layout.card.fade', config: {reverse: null, inAnimation: {type: 'fade', easing: 'ease-out'}, outAnimation: {type: 'fade', easing: 'ease-out', out: true}}});

Ext.define('Ext.fx.layout.card.Flip', {extend: 'Ext.fx.layout.card.Style', alias: 'fx.layout.card.flip', config: {duration: 500, inAnimation: {type: 'flip', half: true, easing: 'ease-out', before: {'backface-visibility': 'hidden'}, after: {'backface-visibility': null}}, outAnimation: {type: 'flip', half: true, easing: 'ease-in', before: {'backface-visibility': 'hidden'}, after: {'backface-visibility': null}, out: true}}, onActiveItemChange: function(cardLayout, newItem, oldItem, options, controller) {
  var parent = newItem.element.getParent();
  parent.addCls('x-layout-card-perspective');
  this.on('animationend', function() {
  parent.removeCls('x-layout-card-perspective');
}, this, {single: true});
  this.callParent(arguments);
}, updateDuration: function(duration) {
  var halfDuration = duration / 2, inAnimation = this.getInAnimation(), outAnimation = this.getOutAnimation();
  inAnimation.setDelay(halfDuration);
  inAnimation.setDuration(halfDuration);
  outAnimation.setDuration(halfDuration);
}});

Ext.define('Ext.fx.layout.card.Pop', {extend: 'Ext.fx.layout.card.Style', alias: 'fx.layout.card.pop', config: {duration: 500, inAnimation: {type: 'pop', easing: 'ease-out'}, outAnimation: {type: 'pop', easing: 'ease-in', out: true}}, updateDuration: function(duration) {
  var halfDuration = duration / 2, inAnimation = this.getInAnimation(), outAnimation = this.getOutAnimation();
  inAnimation.setDelay(halfDuration);
  inAnimation.setDuration(halfDuration);
  outAnimation.setDuration(halfDuration);
}});

Ext.define('Ext.fx.layout.card.Scroll', {extend: 'Ext.fx.layout.card.Abstract', alias: 'fx.layout.card.scroll', config: {duration: 150}, constructor: function(config) {
  this.initConfig(config);
}, getEasing: function() {
  var easing = this.easing;
  if (!easing) 
  {
    this.easing = easing = new Ext.fx.easing.Linear();
  }
  return easing;
}, updateDuration: function(duration) {
  this.getEasing().setDuration(duration);
}, onActiveItemChange: function(cardLayout, newItem, oldItem, options, controller) {
  var direction = this.getDirection(), easing = this.getEasing(), containerElement, inElement, outElement, containerWidth, containerHeight, reverse;
  if (newItem && oldItem) 
  {
    if (this.isAnimating) 
    {
      this.stopAnimation();
    }
    newItem.setWidth('100%');
    newItem.setHeight('100%');
    containerElement = this.getLayout().container.innerElement;
    containerWidth = containerElement.getWidth();
    containerHeight = containerElement.getHeight();
    inElement = newItem.renderElement;
    outElement = oldItem.renderElement;
    this.oldItem = oldItem;
    this.newItem = newItem;
    this.currentEventController = controller;
    this.containerElement = containerElement;
    this.isReverse = reverse = this.getReverse();
    newItem.show();
    if (direction == 'right') 
    {
      direction = 'left';
      this.isReverse = reverse = !reverse;
    } else if (direction == 'down') 
    {
      direction = 'up';
      this.isReverse = reverse = !reverse;
    }
    if (direction == 'left') 
    {
      if (reverse) 
      {
        easing.setConfig({startValue: containerWidth, endValue: 0});
        containerElement.dom.scrollLeft = containerWidth;
        outElement.setLeft(containerWidth);
      } else {
        easing.setConfig({startValue: 0, endValue: containerWidth});
        inElement.setLeft(containerWidth);
      }
    } else {
      if (reverse) 
      {
        easing.setConfig({startValue: containerHeight, endValue: 0});
        containerElement.dom.scrollTop = containerHeight;
        outElement.setTop(containerHeight);
      } else {
        easing.setConfig({startValue: 0, endValue: containerHeight});
        inElement.setTop(containerHeight);
      }
    }
    this.startAnimation();
    controller.pause();
  }
}, startAnimation: function() {
  this.isAnimating = true;
  this.getEasing().setStartTime(Date.now());
  Ext.AnimationQueue.start(this.doAnimationFrame, this);
}, doAnimationFrame: function() {
  var easing = this.getEasing(), direction = this.getDirection(), scroll = 'scrollTop', value;
  if (direction == 'left' || direction == 'right') 
  {
    scroll = 'scrollLeft';
  }
  if (easing.isEnded) 
  {
    this.stopAnimation();
  } else {
    value = easing.getValue();
    this.containerElement.dom[scroll] = value;
  }
}, stopAnimation: function() {
  var me = this, direction = me.getDirection(), scroll = 'setTop', oldItem = me.oldItem, newItem = me.newItem;
  if (direction == 'left' || direction == 'right') 
  {
    scroll = 'setLeft';
  }
  me.currentEventController.resume();
  if (me.isReverse && oldItem && oldItem.renderElement && oldItem.renderElement.dom) 
  {
    oldItem.renderElement[scroll](null);
  } else if (newItem && newItem.renderElement && newItem.renderElement.dom) 
  {
    newItem.renderElement[scroll](null);
  }
  Ext.AnimationQueue.stop(this.doAnimationFrame, this);
  me.isAnimating = false;
  me.fireEvent('animationend', me);
}});

Ext.define('Ext.fx.layout.Card', {constructor: function(config) {
  var defaultClass = Ext.fx.layout.card.Abstract, type;
  if (!config) 
  {
    return null;
  }
  if (typeof config == 'string') 
  {
    type = config;
    config = {};
  } else if (config.type) 
  {
    type = config.type;
  }
  config.elementBox = false;
  if (type) 
  {
    if (Ext.browser.is.AndroidStock2) 
    {
      if (type != 'fade') 
      {
        type = 'scroll';
      }
    }
    defaultClass = Ext.ClassManager.getByAlias('fx.layout.card.' + type);
  }
  return Ext.factory(config, defaultClass);
}});

Ext.define('Ext.layout.Card', {extend: 'Ext.layout.Default', alias: 'layout.card', isCard: true, layoutClass: 'x-layout-card', itemClass: 'x-layout-card-item', applyAnimation: function(animation) {
  return new Ext.fx.layout.Card(animation);
}, updateAnimation: function(animation, oldAnimation) {
  if (animation && animation.isAnimation) 
  {
    animation.setLayout(this);
  }
  if (oldAnimation) 
  {
    oldAnimation.destroy();
  }
}, setContainer: function(container) {
  this.callSuper(arguments);
  container.innerElement.addCls(this.layoutClass);
  container.onInitialized('onContainerInitialized', this);
}, onContainerInitialized: function() {
  var container = this.container, firstItem = container.getInnerAt(0), activeItem = container.getActiveItem();
  if (activeItem) 
  {
    activeItem.show();
    if (firstItem && firstItem !== activeItem) 
    {
      firstItem.hide();
    }
  }
  container.on('activeitemchange', 'onContainerActiveItemChange', this);
}, onContainerActiveItemChange: function(container) {
  this.relayEvent(arguments, 'doActiveItemChange');
}, onItemInnerStateChange: function(item, isInner, destroying) {
  this.callSuper(arguments);
  var container = this.container, activeItem = container.getActiveItem();
  item.toggleCls(this.itemClass, isInner);
  item.setLayoutSizeFlags(isInner ? container.LAYOUT_BOTH : 0);
  if (isInner) 
  {
    if (activeItem !== container.innerIndexOf(item) && activeItem !== item && item !== container.pendingActiveItem) 
    {
      item.hide();
    }
  } else {
    if (!destroying && !item.isDestroyed && item.isDestroying !== true) 
    {
      item.show();
    }
  }
}, doActiveItemChange: function(me, newActiveItem, oldActiveItem) {
  if (oldActiveItem) 
  {
    oldActiveItem.hide();
  }
  if (newActiveItem) 
  {
    newActiveItem.show();
  }
}, destroy: function() {
  this.callParent(arguments);
  Ext.destroy(this.getAnimation());
}});

Ext.define('Ext.layout.Fit', {extend: 'Ext.layout.Default', isFit: true, alias: 'layout.fit', layoutClass: 'x-layout-fit', itemClass: 'x-layout-fit-item', setContainer: function(container) {
  this.callSuper(arguments);
  container.innerElement.addCls(this.layoutClass);
  this.onContainerSizeFlagsChange();
  this.monitorSizeFlagsChange();
}, onContainerSizeFlagsChange: function() {
  var container = this.container, sizeFlags = container.getSizeFlags(), stretched = Boolean(sizeFlags & container.LAYOUT_STRETCHED), innerItems = container.innerItems, i, ln, item;
  this.callSuper();
  for (i = 0 , ln = innerItems.length; i < ln; i++) 
    {
      item = innerItems[i];
      item.setLayoutSizeFlags(sizeFlags);
    }
  container.innerElement.toggleCls('x-stretched', stretched);
}, onItemInnerStateChange: function(item, isInner) {
  this.callSuper(arguments);
  item.toggleCls(this.itemClass, isInner);
  item.setLayoutSizeFlags(isInner ? this.container.getSizeFlags() : 0);
}});

Ext.define('Ext.layout.FlexBox', {extend: 'Ext.layout.Box', alias: 'layout.box', config: {align: 'stretch'}, layoutBaseClass: 'x-layout-box', itemClass: 'x-layout-box-item', setContainer: function(container) {
  this.callSuper(arguments);
  this.monitorSizeFlagsChange();
}, applyOrient: function(orient) {
  return orient;
}, updateOrient: function(orient, oldOrient) {
  var container = this.container, delegation = {delegate: '> component'};
  if (orient === 'horizontal') 
  {
    this.sizePropertyName = 'width';
  } else {
    this.sizePropertyName = 'height';
  }
  container.innerElement.swapCls('x-' + orient, 'x-' + oldOrient);
  if (oldOrient) 
  {
    container.un(oldOrient === 'horizontal' ? 'widthchange' : 'heightchange', 'onItemSizeChange', this, delegation);
    this.redrawContainer();
  }
  container.on(orient === 'horizontal' ? 'widthchange' : 'heightchange', 'onItemSizeChange', this, delegation);
}, onItemInnerStateChange: function(item, isInner) {
  this.callSuper(arguments);
  var flex, size;
  item.toggleCls(this.itemClass, isInner);
  if (isInner) 
  {
    flex = item.getFlex();
    size = item.get(this.sizePropertyName);
    if (flex) 
    {
      this.doItemFlexChange(item, flex);
    } else if (size) 
    {
      this.doItemSizeChange(item, size);
    }
  }
  this.refreshItemSizeState(item);
}, refreshItemSizeState: function(item) {
  var isInner = item.isInnerItem(), container = this.container, LAYOUT_HEIGHT = container.LAYOUT_HEIGHT, LAYOUT_WIDTH = container.LAYOUT_WIDTH, dimension = this.sizePropertyName, layoutSizeFlags = 0, containerSizeFlags = container.getSizeFlags();
  if (isInner) 
  {
    layoutSizeFlags |= container.LAYOUT_STRETCHED;
    if (this.getAlign() === 'stretch') 
    {
      layoutSizeFlags |= containerSizeFlags & (dimension === 'width' ? LAYOUT_HEIGHT : LAYOUT_WIDTH);
    }
    if (item.getFlex()) 
    {
      layoutSizeFlags |= containerSizeFlags & (dimension === 'width' ? LAYOUT_WIDTH : LAYOUT_HEIGHT);
    }
  }
  item.setLayoutSizeFlags(layoutSizeFlags);
}, refreshAllItemSizedStates: function() {
  var innerItems = this.container.innerItems, i, ln, item;
  for (i = 0 , ln = innerItems.length; i < ln; i++) 
    {
      item = innerItems[i];
      this.refreshItemSizeState(item);
    }
}, onContainerSizeFlagsChange: function() {
  this.refreshAllItemSizedStates();
  this.callSuper(arguments);
}, onItemSizeChange: function(item, size) {
  if (item.isInnerItem()) 
  {
    this.doItemSizeChange(item, size);
  }
}, doItemSizeChange: function(item, size) {
  if (size) 
  {
    item.setFlex(null);
    this.redrawContainer();
  }
}, onItemFlexChange: function(item, flex) {
  if (item.isInnerItem()) 
  {
    this.doItemFlexChange(item, flex);
    this.refreshItemSizeState(item);
  }
}, doItemFlexChange: function(item, flex) {
  this.setItemFlex(item, flex);
  if (flex) 
  {
    item.set(this.sizePropertyName, null);
  } else {
    this.redrawContainer();
  }
}, redrawContainer: function() {
  var container = this.container, renderedTo = container.element.dom.parentNode;
  if (renderedTo && renderedTo.nodeType !== 11) 
  {
    container.innerElement.redraw();
  }
}, setItemFlex: function(item, flex) {
  var element = item.element;
  element.toggleCls('x-flexed', !!flex);
  if (!flex) 
  {
    flex = '';
  } else {
    flex = String(flex);
  }
  if (Ext.browser.is.WebKit) 
  {
    element.dom.style.setProperty('-webkit-box-flex', flex, null);
  } else if (Ext.browser.is.IE) 
  {
    element.dom.style.setProperty('-ms-flex', flex + ' 0 0px', null);
  } else {
    element.dom.style.setProperty('flex', flex + ' 0 0px', null);
  }
}, convertPosition: function(position) {
  var positionMap = this.positionMap;
  if (positionMap.hasOwnProperty(position)) 
  {
    return positionMap[position];
  }
  return position;
}, applyAlign: function(align) {
  return this.convertPosition(align);
}, updateAlign: function(align, oldAlign) {
  var container = this.container;
  container.innerElement.swapCls(align, oldAlign, true, 'x-align');
  if (oldAlign !== undefined) 
  {
    this.refreshAllItemSizedStates();
  }
}, applyPack: function(pack) {
  return this.convertPosition(pack);
}, updatePack: function(pack, oldPack) {
  this.container.innerElement.swapCls(pack, oldPack, true, 'x-pack');
}});

Ext.define('Ext.layout.Float', {extend: 'Ext.layout.Default', alias: 'layout.float', config: {direction: 'left'}, layoutClass: 'layout-float', itemClass: 'layout-float-item', setContainer: function(container) {
  this.callSuper(arguments);
  container.innerElement.addCls(this.layoutClass);
}, onItemInnerStateChange: function(item, isInner) {
  this.callSuper(arguments);
  item.toggleCls(this.itemClass, isInner);
}, updateDirection: function(direction, oldDirection) {
  var prefix = 'direction-';
  this.container.innerElement.swapCls(prefix + direction, prefix + oldDirection);
}});

Ext.define('Ext.layout.HBox', {extend: 'Ext.layout.FlexBox', alias: 'layout.hbox'});

Ext.define('Ext.layout.VBox', {extend: 'Ext.layout.FlexBox', alias: 'layout.vbox', config: {orient: 'vertical'}});

Ext.define('Ext.layout.wrapper.Dock', {config: {direction: 'horizontal', element: {className: 'x-dock'}, bodyElement: {className: 'x-dock-body'}, innerWrapper: null, sizeState: false, container: null}, positionMap: {top: 'start', left: 'start', bottom: 'end', right: 'end'}, constructor: function(config) {
  this.items = {start: [], end: []};
  this.itemsCount = 0;
  this.initConfig(config);
}, addItems: function(items) {
  var i, ln, item;
  for (i = 0 , ln = items.length; i < ln; i++) 
    {
      item = items[i];
      this.addItem(item);
    }
}, addItem: function(item) {
  var docked = item.getDocked(), position = this.positionMap[docked], wrapper = item.$dockWrapper, container = this.getContainer(), index = container.indexOf(item), items = this.items, sideItems = items[position], itemWrapper, element, i, ln, sibling, referenceElement, siblingIndex;
  if (wrapper) 
  {
    wrapper.removeItem(item);
  }
  item.$dockWrapper = this;
  itemWrapper = item.link('$dockItemWrapper', new Ext.util.Wrapper({className: 'x-dock-item'}));
  item.addCls('x-docked-' + docked);
  element = itemWrapper.element;
  for (i = 0 , ln = sideItems.length; i < ln; i++) 
    {
      sibling = sideItems[i];
      siblingIndex = container.indexOf(sibling);
      if (siblingIndex > index) 
      {
        referenceElement = sibling.element;
        sideItems.splice(i, 0, item);
        break;
      }
    }
  if (!referenceElement) 
  {
    sideItems.push(item);
    referenceElement = this.getBodyElement();
  }
  this.itemsCount++;
  if (position === 'start') 
  {
    element.insertBefore(referenceElement);
  } else {
    element.insertAfter(referenceElement);
  }
  itemWrapper.wrap(item.element);
  itemWrapper.bindSize(this.getDirection() === 'horizontal' ? 'width' : 'height');
}, removeItem: function(item) {
  var position = item.getDocked(), items = this.items[this.positionMap[position]];
  item.removeCls('x-docked-' + position);
  Ext.Array.remove(items, item);
  item.unlink('$dockItemWrapper');
  item.element.detach();
  delete item.$dockWrapper;
  if (--this.itemsCount === 0) 
  {
    this.destroy();
  }
}, getItemsSlice: function(index) {
  var container = this.getContainer(), items = this.items, slice = [], sideItems, i, ln, item;
  for (sideItems = items.start , i = 0 , ln = sideItems.length; i < ln; i++) 
    {
      item = sideItems[i];
      if (container.indexOf(item) > index) 
      {
        slice.push(item);
      }
    }
  for (sideItems = items.end , i = 0 , ln = sideItems.length; i < ln; i++) 
    {
      item = sideItems[i];
      if (container.indexOf(item) > index) 
      {
        slice.push(item);
      }
    }
  return slice;
}, applyElement: function(element) {
  return Ext.Element.create(element);
}, updateElement: function(element) {
  element.addCls('x-dock-' + this.getDirection());
}, applyBodyElement: function(bodyElement) {
  return Ext.Element.create(bodyElement);
}, updateBodyElement: function(bodyElement) {
  this.getElement().append(bodyElement);
}, updateInnerWrapper: function(innerWrapper, oldInnerWrapper) {
  var innerElement = this.getBodyElement();
  if (oldInnerWrapper && oldInnerWrapper.$outerWrapper === this) 
  {
    innerElement.remove(oldInnerWrapper.getElement());
    delete oldInnerWrapper.$outerWrapper;
  }
  if (innerWrapper) 
  {
    innerWrapper.setSizeState(this.getSizeState());
    innerWrapper.$outerWrapper = this;
    innerElement.append(innerWrapper.getElement());
  }
}, updateSizeState: function(state) {
  var innerWrapper = this.getInnerWrapper();
  this.getElement().setSizeState(state);
  if (innerWrapper) 
  {
    innerWrapper.setSizeState(state);
  }
}, destroy: function() {
  var innerWrapper = this.getInnerWrapper(), outerWrapper = this.$outerWrapper;
  if (innerWrapper) 
  {
    if (outerWrapper) 
    {
      outerWrapper.setInnerWrapper(innerWrapper);
    } else {
      innerWrapper.getElement().replace(this.getElement());
      delete innerWrapper.$outerWrapper;
    }
  }
  delete this.$outerWrapper;
  this.setInnerWrapper(null);
  this.unlink('_bodyElement', '_element');
  this.callSuper();
}});

Ext.define('Ext.util.Filter', {isFilter: true, config: {property: null, value: null, filterFn: Ext.emptyFn, anyMatch: false, exactMatch: false, caseSensitive: false, root: null, id: undefined, scope: null}, applyId: function(id) {
  if (!id) 
  {
    if (this.getProperty()) 
    {
      id = this.getProperty() + '-' + String(this.getValue());
    }
    if (!id) 
    {
      id = Ext.id(null, 'ext-filter-');
    }
  }
  return id;
}, constructor: function(config) {
  this.initConfig(config);
}, applyFilterFn: function(filterFn) {
  if (filterFn === Ext.emptyFn) 
  {
    filterFn = this.getInitialConfig('filter');
    if (filterFn) 
    {
      return filterFn;
    }
    var value = this.getValue();
    if (!this.getProperty() && !value && value !== 0) 
    {
      return Ext.emptyFn;
    } else {
      return this.createFilterFn();
    }
  }
  return filterFn;
}, createFilterFn: function() {
  var me = this, matcher = me.createValueMatcher();
  return function(item) {
  var root = me.getRoot(), property = me.getProperty();
  if (root) 
  {
    item = item[root];
  }
  return matcher.test(item[property]);
};
}, createValueMatcher: function() {
  var me = this, value = me.getValue(), anyMatch = me.getAnyMatch(), exactMatch = me.getExactMatch(), caseSensitive = me.getCaseSensitive(), escapeRe = Ext.String.escapeRegex;
  if (value === null || value === undefined || !value.exec) 
  {
    value = String(value);
    if (anyMatch === true) 
    {
      value = escapeRe(value);
    } else {
      value = '^' + escapeRe(value);
      if (exactMatch === true) 
      {
        value += '$';
      }
    }
    value = new RegExp(value, caseSensitive ? '' : 'i');
  }
  return value;
}});

Ext.define('Ext.util.AbstractMixedCollection', {mixins: {observable: 'Ext.mixin.Observable'}, constructor: function(allowFunctions, keyFn) {
  var me = this;
  me.items = [];
  me.map = {};
  me.keys = [];
  me.length = 0;
  me.allowFunctions = allowFunctions === true;
  if (keyFn) 
  {
    me.getKey = keyFn;
  }
  me.mixins.observable.constructor.call(me);
}, allowFunctions: false, add: function(key, obj) {
  var me = this, myObj = obj, myKey = key, old;
  if (arguments.length == 1) 
  {
    myObj = myKey;
    myKey = me.getKey(myObj);
  }
  if (typeof myKey != 'undefined' && myKey !== null) 
  {
    old = me.map[myKey];
    if (typeof old != 'undefined') 
    {
      return me.replace(myKey, myObj);
    }
    me.map[myKey] = myObj;
  }
  me.length++;
  me.items.push(myObj);
  me.keys.push(myKey);
  me.fireEvent('add', me.length - 1, myObj, myKey);
  return myObj;
}, getKey: function(o) {
  return o.id;
}, replace: function(key, o) {
  var me = this, old, index;
  if (arguments.length == 1) 
  {
    o = arguments[0];
    key = me.getKey(o);
  }
  old = me.map[key];
  if (typeof key == 'undefined' || key === null || typeof old == 'undefined') 
  {
    return me.add(key, o);
  }
  index = me.indexOfKey(key);
  me.items[index] = o;
  me.map[key] = o;
  me.fireEvent('replace', key, old, o);
  return o;
}, addAll: function(objs) {
  var me = this, i = 0, args, len, key;
  if (arguments.length > 1 || Ext.isArray(objs)) 
  {
    args = arguments.length > 1 ? arguments : objs;
    for (len = args.length; i < len; i++) 
      {
        me.add(args[i]);
      }
  } else {
    for (key in objs) 
      {
        if (objs.hasOwnProperty(key)) 
        {
          if (me.allowFunctions || typeof objs[key] != 'function') 
          {
            me.add(key, objs[key]);
          }
        }
      }
  }
}, each: function(fn, scope) {
  var items = [].concat(this.items), i = 0, len = items.length, item;
  for (; i < len; i++) 
    {
      item = items[i];
      if (fn.call(scope || item, item, i, len) === false) 
      {
        break;
      }
    }
}, eachKey: function(fn, scope) {
  var keys = this.keys, items = this.items, i = 0, len = keys.length;
  for (; i < len; i++) 
    {
      fn.call(scope || window, keys[i], items[i], i, len);
    }
}, findBy: function(fn, scope) {
  var keys = this.keys, items = this.items, i = 0, len = items.length;
  for (; i < len; i++) 
    {
      if (fn.call(scope || window, items[i], keys[i])) 
      {
        return items[i];
      }
    }
  return null;
}, insert: function(index, key, obj) {
  var me = this, myKey = key, myObj = obj;
  if (arguments.length == 2) 
  {
    myObj = myKey;
    myKey = me.getKey(myObj);
  }
  if (me.containsKey(myKey)) 
  {
    me.suspendEvents();
    me.removeAtKey(myKey);
    me.resumeEvents();
  }
  if (index >= me.length) 
  {
    return me.add(myKey, myObj);
  }
  me.length++;
  Ext.Array.splice(me.items, index, 0, myObj);
  if (typeof myKey != 'undefined' && myKey !== null) 
  {
    me.map[myKey] = myObj;
  }
  Ext.Array.splice(me.keys, index, 0, myKey);
  me.fireEvent('add', index, myObj, myKey);
  return myObj;
}, remove: function(o) {
  return this.removeAt(this.indexOf(o));
}, removeAll: function(items) {
  Ext.each(items || [], function(item) {
  this.remove(item);
}, this);
  return this;
}, removeAt: function(index) {
  var me = this, o, key;
  if (index < me.length && index >= 0) 
  {
    me.length--;
    o = me.items[index];
    Ext.Array.erase(me.items, index, 1);
    key = me.keys[index];
    if (typeof key != 'undefined') 
    {
      delete me.map[key];
    }
    Ext.Array.erase(me.keys, index, 1);
    me.fireEvent('remove', o, key);
    return o;
  }
  return false;
}, removeAtKey: function(key) {
  return this.removeAt(this.indexOfKey(key));
}, getCount: function() {
  return this.length;
}, indexOf: function(o) {
  return Ext.Array.indexOf(this.items, o);
}, indexOfKey: function(key) {
  return Ext.Array.indexOf(this.keys, key);
}, get: function(key) {
  var me = this, mk = me.map[key], item = mk !== undefined ? mk : (typeof key == 'number') ? me.items[key] : undefined;
  return typeof item != 'function' || me.allowFunctions ? item : null;
}, getAt: function(index) {
  return this.items[index];
}, getByKey: function(key) {
  return this.map[key];
}, contains: function(o) {
  return Ext.Array.contains(this.items, o);
}, containsKey: function(key) {
  return typeof this.map[key] != 'undefined';
}, clear: function() {
  var me = this;
  me.length = 0;
  me.items = [];
  me.keys = [];
  me.map = {};
  me.fireEvent('clear');
}, first: function() {
  return this.items[0];
}, last: function() {
  return this.items[this.length - 1];
}, sum: function(property, root, start, end) {
  var values = this.extractValues(property, root), length = values.length, sum = 0, i;
  start = start || 0;
  end = (end || end === 0) ? end : length - 1;
  for (i = start; i <= end; i++) 
    {
      sum += values[i];
    }
  return sum;
}, collect: function(property, root, allowNull) {
  var values = this.extractValues(property, root), length = values.length, hits = {}, unique = [], value, strValue, i;
  for (i = 0; i < length; i++) 
    {
      value = values[i];
      strValue = String(value);
      if ((allowNull || !Ext.isEmpty(value)) && !hits[strValue]) 
      {
        hits[strValue] = true;
        unique.push(value);
      }
    }
  return unique;
}, extractValues: function(property, root) {
  var values = this.items;
  if (root) 
  {
    values = Ext.Array.pluck(values, root);
  }
  return Ext.Array.pluck(values, property);
}, getRange: function(start, end) {
  var me = this, items = me.items, range = [], i;
  if (items.length < 1) 
  {
    return range;
  }
  start = start || 0;
  end = Math.min(typeof end == 'undefined' ? me.length - 1 : end, me.length - 1);
  if (start <= end) 
  {
    for (i = start; i <= end; i++) 
      {
        range[range.length] = items[i];
      }
  } else {
    for (i = start; i >= end; i--) 
      {
        range[range.length] = items[i];
      }
  }
  return range;
}, filter: function(property, value, anyMatch, caseSensitive) {
  var filters = [], filterFn;
  if (Ext.isString(property)) 
  {
    filters.push(Ext.create('Ext.util.Filter', {property: property, value: value, anyMatch: anyMatch, caseSensitive: caseSensitive}));
  } else if (Ext.isArray(property) || property instanceof Ext.util.Filter) 
  {
    filters = filters.concat(property);
  }
  filterFn = function(record) {
  var isMatch = true, length = filters.length, i;
  for (i = 0; i < length; i++) 
    {
      var filter = filters[i], fn = filter.getFilterFn(), scope = filter.getScope();
      isMatch = isMatch && fn.call(scope, record);
    }
  return isMatch;
};
  return this.filterBy(filterFn);
}, filterBy: function(fn, scope) {
  var me = this, newMC = new this.self(), keys = me.keys, items = me.items, length = items.length, i;
  newMC.getKey = me.getKey;
  for (i = 0; i < length; i++) 
    {
      if (fn.call(scope || me, items[i], keys[i])) 
      {
        newMC.add(keys[i], items[i]);
      }
    }
  return newMC;
}, findIndex: function(property, value, start, anyMatch, caseSensitive) {
  if (Ext.isEmpty(value, false)) 
  {
    return -1;
  }
  value = this.createValueMatcher(value, anyMatch, caseSensitive);
  return this.findIndexBy(function(o) {
  return o && value.test(o[property]);
}, null, start);
}, findIndexBy: function(fn, scope, start) {
  var me = this, keys = me.keys, items = me.items, i = start || 0, len = items.length;
  for (; i < len; i++) 
    {
      if (fn.call(scope || me, items[i], keys[i])) 
      {
        return i;
      }
    }
  return -1;
}, createValueMatcher: function(value, anyMatch, caseSensitive, exactMatch) {
  if (!value.exec) 
  {
    var er = Ext.String.escapeRegex;
    value = String(value);
    if (anyMatch === true) 
    {
      value = er(value);
    } else {
      value = '^' + er(value);
      if (exactMatch === true) 
      {
        value += '$';
      }
    }
    value = new RegExp(value, caseSensitive ? '' : 'i');
  }
  return value;
}, clone: function() {
  var me = this, copy = new this.self(), keys = me.keys, items = me.items, i = 0, len = items.length;
  for (; i < len; i++) 
    {
      copy.add(keys[i], items[i]);
    }
  copy.getKey = me.getKey;
  return copy;
}});

Ext.define('Ext.util.Sorter', {isSorter: true, config: {property: null, sorterFn: null, root: null, transform: null, direction: "ASC", id: undefined}, constructor: function(config) {
  this.initConfig(config);
}, applyId: function(id) {
  if (!id) 
  {
    id = this.getProperty();
    if (!id) 
    {
      id = Ext.id(null, 'ext-sorter-');
    }
  }
  return id;
}, createSortFunction: function(sorterFn) {
  var me = this, modifier = me.getDirection().toUpperCase() == "DESC" ? -1 : 1;
  return function(o1, o2) {
  return modifier * sorterFn.call(me, o1, o2);
};
}, defaultSortFn: function(item1, item2) {
  var me = this, transform = me._transform, root = me._root, value1, value2, property = me._property;
  if (root !== null && root !== undefined) 
  {
    item1 = item1[root];
    item2 = item2[root];
  }
  value1 = item1[property];
  value2 = item2[property];
  if (transform) 
  {
    value1 = transform(value1);
    value2 = transform(value2);
  }
  return value1 > value2 ? 1 : (value1 < value2 ? -1 : 0);
}, updateDirection: function() {
  this.updateSortFn();
}, updateSortFn: function() {
  this.sort = this.createSortFunction(this.getSorterFn() || this.defaultSortFn);
}, toggle: function() {
  this.setDirection(Ext.String.toggle(this.getDirection(), "ASC", "DESC"));
}});

Ext.define("Ext.util.Sortable", {extend: 'Ext.mixin.Mixin', isSortable: true, mixinConfig: {hooks: {destroy: 'destroy'}}, defaultSortDirection: "ASC", initSortable: function() {
  var me = this, sorters = me.sorters;
  me.sorters = Ext.create('Ext.util.AbstractMixedCollection', false, function(item) {
  return item.id || item.property;
});
  if (sorters) 
  {
    me.sorters.addAll(me.decodeSorters(sorters));
  }
}, sort: function(sorters, direction, where, doSort) {
  var me = this, sorter, sorterFn, newSorters;
  if (Ext.isArray(sorters)) 
  {
    doSort = where;
    where = direction;
    newSorters = sorters;
  } else if (Ext.isObject(sorters)) 
  {
    doSort = where;
    where = direction;
    newSorters = [sorters];
  } else if (Ext.isString(sorters)) 
  {
    sorter = me.sorters.get(sorters);
    if (!sorter) 
    {
      sorter = {property: sorters, direction: direction};
      newSorters = [sorter];
    } else if (direction === undefined) 
    {
      sorter.toggle();
    } else {
      sorter.setDirection(direction);
    }
  }
  if (newSorters && newSorters.length) 
  {
    newSorters = me.decodeSorters(newSorters);
    if (Ext.isString(where)) 
    {
      if (where === 'prepend') 
      {
        sorters = me.sorters.clone().items;
        me.sorters.clear();
        me.sorters.addAll(newSorters);
        me.sorters.addAll(sorters);
      } else {
        me.sorters.addAll(newSorters);
      }
    } else {
      me.sorters.clear();
      me.sorters.addAll(newSorters);
    }
    if (doSort !== false) 
    {
      me.onBeforeSort(newSorters);
    }
  }
  if (doSort !== false) 
  {
    sorters = me.sorters.items;
    if (sorters.length) 
    {
      sorterFn = function(r1, r2) {
  var result = sorters[0].sort(r1, r2), length = sorters.length, i;
  for (i = 1; i < length; i++) 
    {
      result = result || sorters[i].sort.call(this, r1, r2);
    }
  return result;
};
      me.doSort(sorterFn);
    }
  }
  return sorters;
}, onBeforeSort: Ext.emptyFn, decodeSorters: function(sorters) {
  if (!Ext.isArray(sorters)) 
  {
    if (sorters === undefined) 
    {
      sorters = [];
    } else {
      sorters = [sorters];
    }
  }
  var length = sorters.length, Sorter = Ext.util.Sorter, fields = this.model ? this.model.prototype.fields : null, field, config, i;
  for (i = 0; i < length; i++) 
    {
      config = sorters[i];
      if (!(config instanceof Sorter)) 
      {
        if (Ext.isString(config)) 
        {
          config = {property: config};
        }
        Ext.applyIf(config, {root: this.sortRoot, direction: "ASC"});
        if (config.fn) 
        {
          config.sorterFn = config.fn;
        }
        if (typeof config == 'function') 
        {
          config = {sorterFn: config};
        }
        if (fields && !config.transform) 
        {
          field = fields.get(config.property);
          config.transform = field ? field.sortType : undefined;
        }
        sorters[i] = Ext.create('Ext.util.Sorter', config);
      }
    }
  return sorters;
}, getSorters: function() {
  return this.sorters.items;
}, destroy: function() {
  this.callSuper();
  Ext.destroy(this.sorters);
}});

Ext.define('Ext.util.MixedCollection', {extend: 'Ext.util.AbstractMixedCollection', mixins: {sortable: 'Ext.util.Sortable'}, constructor: function() {
  var me = this;
  me.callParent(arguments);
  me.mixins.sortable.initSortable.call(me);
}, doSort: function(sorterFn) {
  this.sortBy(sorterFn);
}, _sort: function(property, dir, fn) {
  var me = this, i, len, dsc = String(dir).toUpperCase() == 'DESC' ? -1 : 1, c = [], keys = me.keys, items = me.items;
  fn = fn || function(a, b) {
  return a - b;
};
  for (i = 0 , len = items.length; i < len; i++) 
    {
      c[c.length] = {key: keys[i], value: items[i], index: i};
    }
  Ext.Array.sort(c, function(a, b) {
  var v = fn(a[property], b[property]) * dsc;
  if (v === 0) 
  {
    v = (a.index < b.index ? -1 : 1);
  }
  return v;
});
  for (i = 0 , len = c.length; i < len; i++) 
    {
      items[i] = c[i].value;
      keys[i] = c[i].key;
    }
  me.fireEvent('sort', me);
}, sortBy: function(sorterFn) {
  var me = this, items = me.items, keys = me.keys, length = items.length, temp = [], i;
  for (i = 0; i < length; i++) 
    {
      temp[i] = {key: keys[i], value: items[i], index: i};
    }
  Ext.Array.sort(temp, function(a, b) {
  var v = sorterFn(a.value, b.value);
  if (v === 0) 
  {
    v = (a.index < b.index ? -1 : 1);
  }
  return v;
});
  for (i = 0; i < length; i++) 
    {
      items[i] = temp[i].value;
      keys[i] = temp[i].key;
    }
  me.fireEvent('sort', me, items, keys);
}, reorder: function(mapping) {
  var me = this, items = me.items, index = 0, length = items.length, order = [], remaining = [], oldIndex;
  me.suspendEvents();
  for (oldIndex in mapping) 
    {
      order[mapping[oldIndex]] = items[oldIndex];
    }
  for (index = 0; index < length; index++) 
    {
      if (mapping[index] == undefined) 
      {
        remaining.push(items[index]);
      }
    }
  for (index = 0; index < length; index++) 
    {
      if (order[index] == undefined) 
      {
        order[index] = remaining.shift();
      }
    }
  me.clear();
  me.addAll(order);
  me.resumeEvents();
  me.fireEvent('sort', me);
}, sortByKey: function(dir, fn) {
  this._sort('key', dir, fn || function(a, b) {
  var v1 = String(a).toUpperCase(), v2 = String(b).toUpperCase();
  return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
});
}});

Ext.define('Ext.ItemCollection', {extend: 'Ext.util.MixedCollection', getKey: function(item) {
  return item.getItemId();
}, has: function(item) {
  return this.map.hasOwnProperty(item.getId());
}});

Ext.define('Ext.fx.easing.Momentum', {extend: 'Ext.fx.easing.Abstract', config: {acceleration: 30, friction: 0, startVelocity: 0}, alpha: 0, updateFriction: function(friction) {
  var theta = Math.log(1 - (friction / 10));
  this.theta = theta;
  this.alpha = theta / this.getAcceleration();
}, updateStartVelocity: function(velocity) {
  this.velocity = velocity * this.getAcceleration();
}, updateAcceleration: function(acceleration) {
  this.velocity = this.getStartVelocity() * acceleration;
  this.alpha = this.theta / acceleration;
}, getValue: function() {
  return this.getStartValue() - this.velocity * (1 - this.getFrictionFactor()) / this.theta;
}, getFrictionFactor: function() {
  var deltaTime = Ext.Date.now() - this.getStartTime();
  return Math.exp(deltaTime * this.alpha);
}, getVelocity: function() {
  return this.getFrictionFactor() * this.velocity;
}});

Ext.define('Ext.fx.easing.Bounce', {extend: 'Ext.fx.easing.Abstract', config: {springTension: 0.3, acceleration: 30, startVelocity: 0}, getValue: function() {
  var deltaTime = Ext.Date.now() - this.getStartTime(), theta = (deltaTime / this.getAcceleration()), powTime = theta * Math.pow(Math.E, -this.getSpringTension() * theta);
  return this.getStartValue() + (this.getStartVelocity() * powTime);
}});

Ext.define('Ext.fx.easing.BoundMomentum', {extend: 'Ext.fx.easing.Abstract', config: {momentum: null, bounce: null, minMomentumValue: 0, maxMomentumValue: 0, minVelocity: 0.01, startVelocity: 0}, applyMomentum: function(config, currentEasing) {
  return Ext.factory(config, Ext.fx.easing.Momentum, currentEasing);
}, applyBounce: function(config, currentEasing) {
  return Ext.factory(config, Ext.fx.easing.Bounce, currentEasing);
}, updateStartTime: function(startTime) {
  this.getMomentum().setStartTime(startTime);
  this.callParent(arguments);
}, updateStartVelocity: function(startVelocity) {
  this.getMomentum().setStartVelocity(startVelocity);
}, updateStartValue: function(startValue) {
  this.getMomentum().setStartValue(startValue);
}, reset: function() {
  this.lastValue = null;
  this.isBouncingBack = false;
  this.isOutOfBound = false;
  return this.callParent(arguments);
}, getValue: function() {
  var momentum = this.getMomentum(), bounce = this.getBounce(), startVelocity = momentum.getStartVelocity(), direction = startVelocity > 0 ? 1 : -1, minValue = this.getMinMomentumValue(), maxValue = this.getMaxMomentumValue(), boundedValue = (direction == 1) ? maxValue : minValue, lastValue = this.lastValue, value, velocity;
  if (startVelocity === 0) 
  {
    return this.getStartValue();
  }
  if (!this.isOutOfBound) 
  {
    value = momentum.getValue();
    velocity = momentum.getVelocity();
    if (Math.abs(velocity) < this.getMinVelocity()) 
    {
      this.isEnded = true;
    }
    if (value >= minValue && value <= maxValue) 
    {
      return value;
    }
    this.isOutOfBound = true;
    bounce.setStartTime(Ext.Date.now()).setStartVelocity(velocity).setStartValue(boundedValue);
  }
  value = bounce.getValue();
  if (!this.isEnded) 
  {
    if (!this.isBouncingBack) 
    {
      if (lastValue !== null) 
      {
        if ((direction == 1 && value < lastValue) || (direction == -1 && value > lastValue)) 
        {
          this.isBouncingBack = true;
        }
      }
    } else {
      if (Math.round(value) == boundedValue) 
      {
        this.isEnded = true;
      }
    }
  }
  this.lastValue = value;
  return value;
}});

Ext.define('Ext.fx.easing.EaseOut', {extend: 'Ext.fx.easing.Linear', alias: 'easing.ease-out', config: {exponent: 4, duration: 1500}, getValue: function() {
  var deltaTime = Ext.Date.now() - this.getStartTime(), duration = this.getDuration(), startValue = this.getStartValue(), endValue = this.getEndValue(), distance = this.distance, theta = deltaTime / duration, thetaC = 1 - theta, thetaEnd = 1 - Math.pow(thetaC, this.getExponent()), currentValue = startValue + (thetaEnd * distance);
  if (deltaTime >= duration) 
  {
    this.isEnded = true;
    return endValue;
  }
  return currentValue;
}});

Ext.define('Ext.scroll.Scroller', {extend: 'Ext.Evented', config: {element: null, direction: 'auto', fps: 'auto', disabled: null, directionLock: false, momentumEasing: {momentum: {acceleration: 30, friction: 0.5}, bounce: {acceleration: 30, springTension: 0.3}, minVelocity: 1}, bounceEasing: {duration: 400}, outOfBoundRestrictFactor: 0.5, startMomentumResetTime: 300, maxAbsoluteVelocity: 6, containerSize: 'auto', size: 'auto', autoRefresh: true, initialOffset: {x: 0, y: 0}, slotSnapSize: {x: 0, y: 0}, slotSnapOffset: {x: 0, y: 0}, slotSnapEasing: {duration: 150}, translatable: {translationMethod: 'auto', useWrapper: false}}, cls: Ext.baseCSSPrefix + 'scroll-scroller', containerCls: Ext.baseCSSPrefix + 'scroll-container', dragStartTime: 0, dragEndTime: 0, isDragging: false, isAnimating: false, constructor: function(config) {
  var element = config && config.element;
  this.listeners = {scope: this, touchstart: 'onTouchStart', touchend: 'onTouchEnd', dragstart: 'onDragStart', drag: 'onDrag', dragend: 'onDragEnd'};
  this.minPosition = {x: 0, y: 0};
  this.startPosition = {x: 0, y: 0};
  this.position = {x: 0, y: 0};
  this.velocity = {x: 0, y: 0};
  this.isAxisEnabledFlags = {x: false, y: false};
  this.flickStartPosition = {x: 0, y: 0};
  this.flickStartTime = {x: 0, y: 0};
  this.lastDragPosition = {x: 0, y: 0};
  this.dragDirection = {x: 0, y: 0};
  this.initialConfig = config;
  if (element) 
  {
    this.setElement(element);
  }
  return this;
}, applyElement: function(element) {
  if (!element) 
  {
    return;
  }
  return Ext.get(element);
}, updateElement: function(element) {
  this.initialize();
  if (!this.FixedHBoxStretching) 
  {
    element.addCls(this.cls);
  }
  if (!this.getDisabled()) 
  {
    this.attachListeneners();
  }
  this.onConfigUpdate(['containerSize', 'size'], 'refreshMaxPosition');
  this.on('maxpositionchange', 'snapToBoundary');
  this.on('minpositionchange', 'snapToBoundary');
  return this;
}, applyTranslatable: function(config, translatable) {
  return Ext.factory(config, Ext.util.Translatable, translatable);
}, updateTranslatable: function(translatable) {
  translatable.setConfig({element: this.getElement(), listeners: {animationframe: 'onAnimationFrame', animationend: 'onAnimationEnd', scope: this}});
}, updateFps: function(fps) {
  if (fps !== 'auto') 
  {
    this.getTranslatable().setFps(fps);
  }
}, attachListeneners: function() {
  this.getContainer().on(this.listeners);
}, detachListeners: function() {
  this.getContainer().un(this.listeners);
}, updateDisabled: function(disabled) {
  if (disabled) 
  {
    this.detachListeners();
  } else {
    this.attachListeneners();
  }
}, updateInitialOffset: function(initialOffset) {
  if (typeof initialOffset == 'number') 
  {
    initialOffset = {x: initialOffset, y: initialOffset};
  }
  var position = this.position, x, y;
  position.x = x = initialOffset.x;
  position.y = y = initialOffset.y;
  this.getTranslatable().translate(-x, -y);
}, applyDirection: function(direction) {
  var minPosition = this.getMinPosition(), maxPosition = this.getMaxPosition(), isHorizontal, isVertical;
  this.givenDirection = direction;
  if (direction === 'auto') 
  {
    isHorizontal = maxPosition.x > minPosition.x;
    isVertical = maxPosition.y > minPosition.y;
    if (isHorizontal && isVertical) 
    {
      direction = 'both';
    } else if (isHorizontal) 
    {
      direction = 'horizontal';
    } else {
      direction = 'vertical';
    }
  }
  return direction;
}, updateDirection: function(direction, oldDirection) {
  var isAxisEnabledFlags = this.isAxisEnabledFlags, verticalCls = this.cls + '-vertical', horizontalCls = this.cls + '-horizontal', element = this.getElement();
  if (oldDirection === 'both' || oldDirection === 'horizontal') 
  {
    element.removeCls(horizontalCls);
  }
  if (oldDirection === 'both' || oldDirection === 'vertical') 
  {
    element.removeCls(verticalCls);
  }
  isAxisEnabledFlags.x = isAxisEnabledFlags.y = false;
  if (direction === 'both' || direction === 'horizontal') 
  {
    isAxisEnabledFlags.x = true;
    element.addCls(horizontalCls);
  }
  if (direction === 'both' || direction === 'vertical') 
  {
    isAxisEnabledFlags.y = true;
    element.addCls(verticalCls);
  }
}, isAxisEnabled: function(axis) {
  this.getDirection();
  return this.isAxisEnabledFlags[axis];
}, applyMomentumEasing: function(easing) {
  var defaultClass = Ext.fx.easing.BoundMomentum;
  return {x: Ext.factory(easing, defaultClass), y: Ext.factory(easing, defaultClass)};
}, applyBounceEasing: function(easing) {
  var defaultClass = Ext.fx.easing.EaseOut;
  return {x: Ext.factory(easing, defaultClass), y: Ext.factory(easing, defaultClass)};
}, updateBounceEasing: function(easing) {
  this.getTranslatable().setEasingX(easing.x).setEasingY(easing.y);
}, applySlotSnapEasing: function(easing) {
  var defaultClass = Ext.fx.easing.EaseOut;
  return {x: Ext.factory(easing, defaultClass), y: Ext.factory(easing, defaultClass)};
}, getMinPosition: function() {
  var minPosition = this.minPosition;
  if (!minPosition) 
  {
    this.minPosition = minPosition = {x: 0, y: 0};
    this.fireEvent('minpositionchange', this, minPosition);
  }
  return minPosition;
}, getMaxPosition: function() {
  var maxPosition = this.maxPosition, size, containerSize;
  if (!maxPosition) 
  {
    size = this.getSize();
    containerSize = this.getContainerSize();
    this.maxPosition = maxPosition = {x: Math.max(0, size.x - containerSize.x), y: Math.max(0, size.y - containerSize.y)};
    this.fireEvent('maxpositionchange', this, maxPosition);
  }
  return maxPosition;
}, refreshMaxPosition: function() {
  this.maxPosition = null;
  this.getMaxPosition();
}, applyContainerSize: function(size) {
  var containerDom = this.getContainer().dom, x, y;
  if (!containerDom) 
  {
    return;
  }
  this.givenContainerSize = size;
  if (size === 'auto') 
  {
    x = containerDom.offsetWidth;
    y = containerDom.offsetHeight;
  } else {
    x = size.x;
    y = size.y;
  }
  return {x: x, y: y};
}, applySize: function(size) {
  var dom = this.getElement().dom, x, y;
  if (!dom) 
  {
    return;
  }
  this.givenSize = size;
  if (size === 'auto') 
  {
    x = dom.offsetWidth;
    y = dom.offsetHeight;
  } else if (typeof size == 'number') 
  {
    x = size;
    y = size;
  } else {
    x = size.x;
    y = size.y;
  }
  return {x: x, y: y};
}, updateAutoRefresh: function(autoRefresh) {
  this.getElement().toggleListener(autoRefresh, 'resize', 'onElementResize', this);
  this.getContainer().toggleListener(autoRefresh, 'resize', 'onContainerResize', this);
}, applySlotSnapSize: function(snapSize) {
  if (typeof snapSize == 'number') 
  {
    return {x: snapSize, y: snapSize};
  }
  return snapSize;
}, applySlotSnapOffset: function(snapOffset) {
  if (typeof snapOffset == 'number') 
  {
    return {x: snapOffset, y: snapOffset};
  }
  return snapOffset;
}, getContainer: function() {
  var container = this.container, element;
  if (!container) 
  {
    element = this.getElement().getParent();
    this.container = container = this.FixedHBoxStretching ? element.getParent() : element;
    container.addCls(this.containerCls);
  }
  return container;
}, refresh: function() {
  this.stopAnimation();
  this.getTranslatable().refresh();
  this.setSize(this.givenSize);
  this.setContainerSize(this.givenContainerSize);
  this.setDirection(this.givenDirection);
  this.fireEvent('refresh', this);
  return this;
}, onElementResize: function(element, info) {
  this.setSize({x: info.width, y: info.height});
  this.refresh();
}, onContainerResize: function(container, info) {
  this.setContainerSize({x: info.width, y: info.height});
  this.refresh();
}, scrollTo: function(x, y, animation) {
  if (this.isDestroyed) 
  {
    return this;
  }
  var translatable = this.getTranslatable(), position = this.position, positionChanged = false, translationX, translationY;
  if (this.isAxisEnabled('x')) 
  {
    if (isNaN(x) || typeof x != 'number') 
    {
      x = position.x;
    } else {
      if (position.x !== x) 
      {
        position.x = x;
        positionChanged = true;
      }
    }
    translationX = -x;
  }
  if (this.isAxisEnabled('y')) 
  {
    if (isNaN(y) || typeof y != 'number') 
    {
      y = position.y;
    } else {
      if (position.y !== y) 
      {
        position.y = y;
        positionChanged = true;
      }
    }
    translationY = -y;
  }
  if (positionChanged) 
  {
    if (animation !== undefined && animation !== false) 
    {
      translatable.translateAnimated(translationX, translationY, animation);
    } else {
      this.fireEvent('scroll', this, position.x, position.y);
      translatable.translate(translationX, translationY);
    }
  }
  return this;
}, scrollToTop: function(animation) {
  var initialOffset = this.getInitialOffset();
  return this.scrollTo(initialOffset.x, initialOffset.y, animation);
}, scrollToEnd: function(animation) {
  var size = this.getSize(), cntSize = this.getContainerSize();
  return this.scrollTo(size.x - cntSize.x, size.y - cntSize.y, animation);
}, scrollBy: function(x, y, animation) {
  var position = this.position;
  x = (typeof x == 'number') ? x + position.x : null;
  y = (typeof y == 'number') ? y + position.y : null;
  return this.scrollTo(x, y, animation);
}, onTouchStart: function() {
  this.isTouching = true;
  this.stopAnimation();
}, onTouchEnd: function() {
  var position = this.position;
  this.isTouching = false;
  if (!this.isDragging && this.snapToSlot()) 
  {
    this.fireEvent('scrollstart', this, position.x, position.y);
  }
}, onDragStart: function(e) {
  var direction = this.getDirection(), absDeltaX = e.absDeltaX, absDeltaY = e.absDeltaY, directionLock = this.getDirectionLock(), startPosition = this.startPosition, flickStartPosition = this.flickStartPosition, flickStartTime = this.flickStartTime, lastDragPosition = this.lastDragPosition, currentPosition = this.position, dragDirection = this.dragDirection, x = currentPosition.x, y = currentPosition.y, now = Ext.Date.now();
  this.isDragging = true;
  if (directionLock && direction !== 'both') 
  {
    if ((direction === 'horizontal' && absDeltaX > absDeltaY) || (direction === 'vertical' && absDeltaY > absDeltaX)) 
    {
      e.stopPropagation();
    } else {
      this.isDragging = false;
      return;
    }
  }
  lastDragPosition.x = x;
  lastDragPosition.y = y;
  flickStartPosition.x = x;
  flickStartPosition.y = y;
  startPosition.x = x;
  startPosition.y = y;
  flickStartTime.x = now;
  flickStartTime.y = now;
  dragDirection.x = 0;
  dragDirection.y = 0;
  this.dragStartTime = now;
  this.isDragging = true;
  this.fireEvent('scrollstart', this, x, y);
}, onAxisDrag: function(axis, delta) {
  if (!this.isAxisEnabled(axis)) 
  {
    return;
  }
  var flickStartPosition = this.flickStartPosition, flickStartTime = this.flickStartTime, lastDragPosition = this.lastDragPosition, dragDirection = this.dragDirection, old = this.position[axis], min = this.getMinPosition()[axis], max = this.getMaxPosition()[axis], start = this.startPosition[axis], last = lastDragPosition[axis], current = start - delta, lastDirection = dragDirection[axis], restrictFactor = this.getOutOfBoundRestrictFactor(), startMomentumResetTime = this.getStartMomentumResetTime(), now = Ext.Date.now(), distance;
  if (current < min) 
  {
    current *= restrictFactor;
  } else if (current > max) 
  {
    distance = current - max;
    current = max + distance * restrictFactor;
  }
  if (current > last) 
  {
    dragDirection[axis] = 1;
  } else if (current < last) 
  {
    dragDirection[axis] = -1;
  }
  if ((lastDirection !== 0 && (dragDirection[axis] !== lastDirection)) || (now - flickStartTime[axis]) > startMomentumResetTime) 
  {
    flickStartPosition[axis] = old;
    flickStartTime[axis] = now;
  }
  lastDragPosition[axis] = current;
}, onDrag: function(e) {
  if (!this.isDragging) 
  {
    return;
  }
  var lastDragPosition = this.lastDragPosition;
  this.onAxisDrag('x', e.deltaX);
  this.onAxisDrag('y', e.deltaY);
  this.scrollTo(lastDragPosition.x, lastDragPosition.y);
}, onDragEnd: function(e) {
  var easingX, easingY;
  if (!this.isDragging) 
  {
    return;
  }
  this.dragEndTime = Ext.Date.now();
  this.onDrag(e);
  this.isDragging = false;
  easingX = this.getAnimationEasing('x', e);
  easingY = this.getAnimationEasing('y', e);
  if (easingX || easingY) 
  {
    this.getTranslatable().animate(easingX, easingY);
  } else {
    this.onScrollEnd();
  }
}, getAnimationEasing: function(axis, e) {
  if (!this.isAxisEnabled(axis)) 
  {
    return null;
  }
  var currentPosition = this.position[axis], minPosition = this.getMinPosition()[axis], maxPosition = this.getMaxPosition()[axis], maxAbsVelocity = this.getMaxAbsoluteVelocity(), boundValue = null, dragEndTime = this.dragEndTime, velocity = e.flick.velocity[axis], easing;
  if (currentPosition < minPosition) 
  {
    boundValue = minPosition;
  } else if (currentPosition > maxPosition) 
  {
    boundValue = maxPosition;
  }
  if (boundValue !== null) 
  {
    easing = this.getBounceEasing()[axis];
    easing.setConfig({startTime: dragEndTime, startValue: -currentPosition, endValue: -boundValue});
    return easing;
  }
  if (velocity === 0) 
  {
    return null;
  }
  if (velocity < -maxAbsVelocity) 
  {
    velocity = -maxAbsVelocity;
  } else if (velocity > maxAbsVelocity) 
  {
    velocity = maxAbsVelocity;
  }
  if (Ext.browser.is.IE) 
  {
    velocity *= 2;
  }
  easing = this.getMomentumEasing()[axis];
  easing.setConfig({startTime: dragEndTime, startValue: -currentPosition, startVelocity: velocity * 1.5, minMomentumValue: -maxPosition, maxMomentumValue: 0});
  return easing;
}, onAnimationFrame: function(translatable, x, y) {
  var position = this.position;
  position.x = -x;
  position.y = -y;
  this.fireEvent('scroll', this, position.x, position.y);
}, onAnimationEnd: function() {
  this.snapToBoundary();
  this.onScrollEnd();
}, stopAnimation: function() {
  this.getTranslatable().stopAnimation();
}, onScrollEnd: function() {
  var position = this.position;
  if (this.isTouching || !this.snapToSlot()) 
  {
    this.fireEvent('scrollend', this, position.x, position.y);
  }
}, snapToSlot: function() {
  var snapX = this.getSnapPosition('x'), snapY = this.getSnapPosition('y'), easing = this.getSlotSnapEasing();
  if (snapX !== null || snapY !== null) 
  {
    this.scrollTo(snapX, snapY, {easingX: easing.x, easingY: easing.y});
    return true;
  }
  return false;
}, getSnapPosition: function(axis) {
  var snapSize = this.getSlotSnapSize()[axis], snapPosition = null, position, snapOffset, maxPosition, mod;
  if (snapSize !== 0 && this.isAxisEnabled(axis)) 
  {
    position = this.position[axis];
    snapOffset = this.getSlotSnapOffset()[axis];
    maxPosition = this.getMaxPosition()[axis];
    mod = Math.floor((position - snapOffset) % snapSize);
    if (mod !== 0) 
    {
      if (position !== maxPosition) 
      {
        if (Math.abs(mod) > snapSize / 2) 
        {
          snapPosition = Math.min(maxPosition, position + ((mod > 0) ? snapSize - mod : mod - snapSize));
        } else {
          snapPosition = position - mod;
        }
      } else {
        snapPosition = position - mod;
      }
    }
  }
  return snapPosition;
}, snapToBoundary: function() {
  var position = this.position, minPosition = this.getMinPosition(), maxPosition = this.getMaxPosition(), minX = minPosition.x, minY = minPosition.y, maxX = maxPosition.x, maxY = maxPosition.y, x = Math.round(position.x), y = Math.round(position.y);
  if (x < minX) 
  {
    x = minX;
  } else if (x > maxX) 
  {
    x = maxX;
  }
  if (y < minY) 
  {
    y = minY;
  } else if (y > maxY) 
  {
    y = maxY;
  }
  this.scrollTo(x, y);
}, destroy: function() {
  var element = this.getElement(), sizeMonitors = this.sizeMonitors, container;
  if (sizeMonitors) 
  {
    sizeMonitors.element.destroy();
    sizeMonitors.container.destroy();
  }
  if (element && !element.isDestroyed) 
  {
    element.removeCls(this.cls);
    container = this.getContainer();
    if (container && !container.isDestroyed) 
    {
      container.removeCls(this.containerCls);
    }
  }
  Ext.destroy(this.getTranslatable());
  this.callParent(arguments);
}}, function() {
});

(function() {
  var lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'], ln = vendors.length, i, vendor;
  for (i = 0; i < ln && !window.requestAnimationFrame; ++i) 
    {
      vendor = vendors[i];
      if (window[vendor + 'RequestAnimationFrame']) 
      {
        window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
      }
    }
  if (!window.Ext) 
  {
    window.Ext = {};
  }
  Ext.performance = {};
  if (window.performance && window.performance.now) 
  {
    Ext.performance.now = function() {
  return window.performance.now();
};
  } else {
    Ext.performance.now = function() {
  return Date.now();
};
  }
  if (!window.requestAnimationFrame) 
  {
    window.requestAnimationFrame = function(callback) {
  var currTime = Ext.performance.now(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() {
  callback(currTime + timeToCall);
}, timeToCall);
  lastTime = currTime + timeToCall;
  return id;
};
  } else {
    Ext.trueRequestAnimationFrames = true;
  }
  if (!window.cancelAnimationFrame) 
  {
    window.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};
  }
}());
(function(global) {
  Ext.define('Ext.AnimationQueue', {singleton: true, constructor: function() {
  var bind = Ext.Function.bind;
  this.queue = [];
  this.taskQueue = [];
  this.runningQueue = [];
  this.idleQueue = [];
  this.isRunning = false;
  this.isIdle = true;
  this.run = bind(this.run, this);
  this.whenIdle = bind(this.whenIdle, this);
  this.processIdleQueueItem = bind(this.processIdleQueueItem, this);
  this.processTaskQueueItem = bind(this.processTaskQueueItem, this);
  if (Ext.os.is.iOS) 
  {
    setInterval(this.watch, 500);
  }
}, start: function(fn, scope, args) {
  this.queue.push(arguments);
  if (!this.isRunning) 
  {
    if (this.hasOwnProperty('idleTimer')) 
    {
      clearTimeout(this.idleTimer);
      delete this.idleTimer;
    }
    if (this.hasOwnProperty('idleQueueTimer')) 
    {
      clearTimeout(this.idleQueueTimer);
      delete this.idleQueueTimer;
    }
    this.isIdle = false;
    this.isRunning = true;
    this.doStart();
  }
}, watch: function() {
  if (this.isRunning && Date.now() - this.lastRunTime >= 500) 
  {
    this.run();
  }
}, run: function() {
  if (!this.isRunning) 
  {
    return;
  }
  var queue = this.runningQueue, i, ln;
  this.lastRunTime = Date.now();
  this.frameStartTime = Ext.performance.now();
  queue.push.apply(queue, this.queue);
  for (i = 0 , ln = queue.length; i < ln; i++) 
    {
      this.invoke(queue[i]);
    }
  queue.length = 0;
  this.doIterate();
}, doStart: function() {
  this.animationFrameId = requestAnimationFrame(this.run);
  this.lastRunTime = Date.now();
}, doIterate: function() {
  this.animationFrameId = requestAnimationFrame(this.run);
}, doStop: function() {
  cancelAnimationFrame(this.animationFrameId);
}, stop: function(fn, scope, args) {
  if (!this.isRunning) 
  {
    return;
  }
  var queue = this.queue, ln = queue.length, i, item;
  for (i = 0; i < ln; i++) 
    {
      item = queue[i];
      if (item[0] === fn && item[1] === scope && item[2] === args) 
      {
        queue.splice(i, 1);
        i--;
        ln--;
      }
    }
  if (ln === 0) 
  {
    this.doStop();
    this.isRunning = false;
    this.idleTimer = setTimeout(this.whenIdle, 100);
  }
}, onIdle: function(fn, scope, args) {
  var listeners = this.idleQueue, i, ln, listener;
  for (i = 0 , ln = listeners.length; i < ln; i++) 
    {
      listener = listeners[i];
      if (fn === listener[0] && scope === listener[1] && args === listener[2]) 
      {
        return;
      }
    }
  listeners.push(arguments);
  if (this.isIdle) 
  {
    this.processIdleQueue();
  }
}, unIdle: function(fn, scope, args) {
  var listeners = this.idleQueue, i, ln, listener;
  for (i = 0 , ln = listeners.length; i < ln; i++) 
    {
      listener = listeners[i];
      if (fn === listener[0] && scope === listener[1] && args === listener[2]) 
      {
        listeners.splice(i, 1);
        return true;
      }
    }
  return false;
}, queueTask: function(fn, scope, args) {
  this.taskQueue.push(arguments);
  this.processTaskQueue();
}, dequeueTask: function(fn, scope, args) {
  var listeners = this.taskQueue, i, ln, listener;
  for (i = 0 , ln = listeners.length; i < ln; i++) 
    {
      listener = listeners[i];
      if (fn === listener[0] && scope === listener[1] && args === listener[2]) 
      {
        listeners.splice(i, 1);
        i--;
        ln--;
      }
    }
}, invoke: function(listener) {
  var fn = listener[0], scope = listener[1], args = listener[2];
  fn = (typeof fn == 'string' ? scope[fn] : fn);
  if (Ext.isArray(args)) 
  {
    fn.apply(scope, args);
  } else {
    fn.call(scope, args);
  }
}, whenIdle: function() {
  this.isIdle = true;
  this.processIdleQueue();
}, processIdleQueue: function() {
  if (!this.hasOwnProperty('idleQueueTimer')) 
  {
    this.idleQueueTimer = setTimeout(this.processIdleQueueItem, 1);
  }
}, processIdleQueueItem: function() {
  delete this.idleQueueTimer;
  if (!this.isIdle) 
  {
    return;
  }
  var listeners = this.idleQueue, listener;
  if (listeners.length > 0) 
  {
    listener = listeners.shift();
    this.invoke(listener);
    this.processIdleQueue();
  }
}, processTaskQueue: function() {
  if (!this.hasOwnProperty('taskQueueTimer')) 
  {
    this.taskQueueTimer = setTimeout(this.processTaskQueueItem, 15);
  }
}, processTaskQueueItem: function() {
  delete this.taskQueueTimer;
  var listeners = this.taskQueue, listener;
  if (listeners.length > 0) 
  {
    listener = listeners.shift();
    this.invoke(listener);
    this.processTaskQueue();
  }
}, showFps: function() {
  if (!Ext.trueRequestAnimationFrames) 
  {
    alert("This browser does not support requestAnimationFrame. The FPS listed will not be accurate");
  }
  Ext.onReady(function() {
  Ext.Viewport.add([{xtype: 'component', bottom: 50, left: 0, width: 50, height: 20, html: 'Average', style: 'background-color: black; color: white; text-align: center; line-height: 20px; font-size: 8px;'}, {id: '__averageFps', xtype: 'component', bottom: 0, left: 0, width: 50, height: 50, html: '0', style: 'background-color: red; color: white; text-align: center; line-height: 50px;'}, {xtype: 'component', bottom: 50, left: 50, width: 50, height: 20, html: 'Min (Last 1k)', style: 'background-color: black; color: white; text-align: center; line-height: 20px; font-size: 8px;'}, {id: '__minFps', xtype: 'component', bottom: 0, left: 50, width: 50, height: 50, html: '0', style: 'background-color: orange; color: white; text-align: center; line-height: 50px;'}, {xtype: 'component', bottom: 50, left: 100, width: 50, height: 20, html: 'Max (Last 1k)', style: 'background-color: black; color: white; text-align: center; line-height: 20px; font-size: 8px;'}, {id: '__maxFps', xtype: 'component', bottom: 0, left: 100, width: 50, height: 50, html: '0', style: 'background-color: yellow; color: black; text-align: center; line-height: 50px;'}, {xtype: 'component', bottom: 50, left: 150, width: 50, height: 20, html: 'Current', style: 'background-color: black; color: white; text-align: center; line-height: 20px; font-size: 8px;'}, {id: '__currentFps', xtype: 'component', bottom: 0, left: 150, width: 50, height: 50, html: '0', style: 'background-color: green; color: white; text-align: center; line-height: 50px;'}]);
  Ext.AnimationQueue.resetFps();
});
}, resetFps: function() {
  var currentFps = Ext.getCmp('__currentFps'), averageFps = Ext.getCmp('__averageFps'), minFps = Ext.getCmp('__minFps'), maxFps = Ext.getCmp('__maxFps'), min = 1000, max = 0, count = 0, sum = 0;
  Ext.AnimationQueue.onFpsChanged = function(fps) {
  count++;
  if (!(count % 10)) 
  {
    min = 1000;
    max = 0;
  }
  sum += fps;
  min = Math.min(min, fps);
  max = Math.max(max, fps);
  currentFps.setHtml(Math.round(fps));
  averageFps.setHtml(Math.round(sum / count));
  minFps.setHtml(Math.round(min));
  maxFps.setHtml(Math.round(max));
};
}}, function() {
});
})(this);

Ext.define('Ext.TaskQueue', {singleton: true, pending: false, mode: true, constructor: function() {
  this.readQueue = [];
  this.writeQueue = [];
  this.run = Ext.Function.bind(this.run, this);
  this.watch = Ext.Function.bind(this.watch, this);
  if (Ext.os.is.iOS) 
  {
    setInterval(this.watch, 500);
  }
}, requestRead: function(fn, scope, args) {
  this.request(true);
  this.readQueue.push(arguments);
}, requestWrite: function(fn, scope, args) {
  this.request(false);
  this.writeQueue.push(arguments);
}, request: function(mode) {
  if (!this.pending) 
  {
    this.pendingTime = Date.now();
    this.pending = true;
    this.mode = mode;
    if (mode) 
    {
      setTimeout(this.run, 1);
    } else {
      requestAnimationFrame(this.run);
    }
  }
}, watch: function() {
  if (this.pending && Date.now() - this.pendingTime >= 500) 
  {
    this.run();
  }
}, run: function() {
  this.pending = false;
  var readQueue = this.readQueue, writeQueue = this.writeQueue, request = null, queue;
  if (this.mode) 
  {
    queue = readQueue;
    if (writeQueue.length > 0) 
    {
      request = false;
    }
  } else {
    queue = writeQueue;
    if (readQueue.length > 0) 
    {
      request = true;
    }
  }
  var tasks = queue.slice(), i, ln, task, fn, scope;
  queue.length = 0;
  for (i = 0 , ln = tasks.length; i < ln; i++) 
    {
      task = tasks[i];
      fn = task[0];
      scope = task[1];
      if (typeof fn == 'string') 
      {
        fn = scope[fn];
      }
      if (task.length > 2) 
      {
        fn.apply(scope, task[2]);
      } else {
        fn.call(scope);
      }
    }
  tasks.length = 0;
  if (request !== null) 
  {
    this.request(request);
  }
}});

Ext.define('Ext.scroll.indicator.Abstract', {extend: 'Ext.Component', config: {baseCls: 'x-scroll-indicator', axis: 'x', value: null, length: null, minLength: 6, hidden: true, ui: 'dark', autoHide: true}, cachedConfig: {ratio: 1, barCls: 'x-scroll-bar', active: true}, barElement: null, barLength: 0, gapLength: 0, getElementConfig: function() {
  return {reference: 'barElement', children: [this.callParent()]};
}, applyRatio: function(ratio) {
  if (isNaN(ratio) || ratio > 1) 
  {
    ratio = 1;
  }
  return ratio;
}, refresh: function() {
  var bar = this.barElement, barDom = bar.dom, ratio = this.getRatio(), axis = this.getAxis(), barLength = (axis === 'x') ? barDom.offsetWidth : barDom.offsetHeight, length = barLength * ratio;
  this.barLength = barLength;
  this.gapLength = barLength - length;
  this.setLength(length);
  this.updateValue(this.getValue());
}, updateBarCls: function(barCls) {
  this.barElement.addCls(barCls);
}, updateAxis: function(axis) {
  this.element.addCls(this.getBaseCls(), null, axis);
  this.barElement.addCls(this.getBarCls(), null, axis);
}, updateValue: function(value) {
  var barLength = this.barLength, gapLength = this.gapLength, length = this.getLength(), newLength, offset, extra;
  if (value <= 0) 
  {
    offset = 0;
    this.updateLength(this.applyLength(length + value * barLength));
  } else if (value >= 1) 
  {
    extra = Math.round((value - 1) * barLength);
    newLength = this.applyLength(length - extra);
    extra = length - newLength;
    this.updateLength(newLength);
    offset = gapLength + extra;
  } else {
    offset = gapLength * value;
  }
  this.setOffset(offset);
}, updateActive: function(active) {
  this.barElement[active ? 'addCls' : 'removeCls']('active');
}, doSetHidden: function(hidden) {
  var me = this;
  if (hidden) 
  {
    me.getAutoHide() && me.setOffset(-10000);
  } else {
    delete me.lastLength;
    delete me.lastOffset;
    me.updateValue(me.getValue());
  }
}, applyLength: function(length) {
  return Math.max(this.getMinLength(), length);
}, updateLength: function(length) {
  length = Math.round(length);
  if (this.lastLength === length) 
  {
    return;
  }
  this.lastLength = length;
  Ext.TaskQueue.requestWrite('doUpdateLength', this, [length]);
}, doUpdateLength: function(length) {
  if (!this.isDestroyed) 
  {
    var axis = this.getAxis(), element = this.element;
    if (axis === 'x') 
    {
      element.setWidth(length);
    } else {
      element.setHeight(length);
    }
  }
}, setOffset: function(offset) {
  offset = Math.round(offset);
  if (this.lastOffset === offset || this.lastOffset === -10000) 
  {
    return;
  }
  this.lastOffset = offset;
  Ext.TaskQueue.requestWrite('doSetOffset', this, [offset]);
}, doSetOffset: function(offset) {
  if (!this.isDestroyed) 
  {
    var axis = this.getAxis(), element = this.element;
    if (axis === 'x') 
    {
      element.translate(offset, 0);
    } else {
      element.translate(0, offset);
    }
  }
}});

Ext.define('Ext.scroll.indicator.CssTransform', {extend: 'Ext.scroll.indicator.Abstract', config: {cls: 'csstransform'}});

Ext.define('Ext.scroll.indicator.ScrollPosition', {extend: 'Ext.scroll.indicator.Abstract', config: {cls: 'scrollposition'}, getElementConfig: function() {
  var config = this.callParent(arguments);
  config.children.unshift({className: 'x-scroll-bar-stretcher'});
  return config;
}, updateValue: function(value) {
  if (this.gapLength === 0) 
  {
    if (value >= 1) 
    {
      value--;
    }
    this.setOffset(this.barLength * value);
  } else {
    this.setOffset(this.gapLength * value);
  }
}, doUpdateLength: function() {
  if (!this.isDestroyed) 
  {
    var scrollOffset = this.barLength, element = this.element;
    this.callParent(arguments);
    if (this.getAxis() === 'x') 
    {
      element.setLeft(scrollOffset);
    } else {
      element.setTop(scrollOffset);
    }
  }
}, doSetOffset: function(offset) {
  if (!this.isDestroyed) 
  {
    var barLength = this.barLength, minLength = this.getMinLength(), barDom = this.barElement.dom;
    if (offset !== -10000) 
    {
      offset = Math.min(barLength - minLength, Math.max(offset, minLength - this.getLength()));
      offset = barLength - offset;
    }
    if (this.getAxis() === 'x') 
    {
      barDom.scrollLeft = offset;
    } else {
      barDom.scrollTop = offset;
    }
  }
}});

Ext.define('Ext.scroll.indicator.Rounded', {extend: 'Ext.scroll.indicator.Abstract', config: {cls: 'rounded'}, constructor: function() {
  this.callParent(arguments);
  this.transformPropertyName = Ext.browser.getVendorProperyName('transform');
}, getElementConfig: function() {
  var config = this.callParent();
  config.children[0].children = [{reference: 'startElement'}, {reference: 'middleElement'}, {reference: 'endElement'}];
  return config;
}, refresh: function() {
  var axis = this.getAxis(), startElementDom = this.startElement.dom, endElementDom = this.endElement.dom, middleElement = this.middleElement, startElementLength, endElementLength;
  if (axis === 'x') 
  {
    startElementLength = startElementDom.offsetWidth;
    endElementLength = endElementDom.offsetWidth;
    middleElement.setLeft(startElementLength);
  } else {
    startElementLength = startElementDom.offsetHeight;
    endElementLength = endElementDom.offsetHeight;
    middleElement.setTop(startElementLength);
  }
  this.startElementLength = startElementLength;
  this.endElementLength = endElementLength;
  this.callParent();
}, doUpdateLength: function(length) {
  if (!this.isDestroyed) 
  {
    var axis = this.getAxis(), endElement = this.endElement, middleElementStyle = this.middleElement.dom.style, endElementLength = this.endElementLength, endElementOffset = length - endElementLength, middleElementLength = endElementOffset - this.startElementLength, transformPropertyName = this.transformPropertyName;
    if (axis === 'x') 
    {
      endElement.translate(endElementOffset, 0);
      middleElementStyle[transformPropertyName] = 'translate3d(0, 0, 0) scaleX(' + middleElementLength + ')';
    } else {
      endElement.translate(0, endElementOffset);
      middleElementStyle[transformPropertyName] = 'translate3d(0, 0, 0) scaleY(' + middleElementLength + ')';
    }
  }
}});

Ext.define('Ext.scroll.Indicator', {alternateClassName: 'Ext.util.Indicator', constructor: function(config) {
  var namespace = Ext.scroll.indicator;
  switch (Ext.browser.getPreferredTranslationMethod(config)) {
    case 'scrollposition':
      return new namespace.ScrollPosition(config);
    case 'csstransform':
      if (Ext.browser.is.AndroidStock4) 
      {
        return new namespace.CssTransform(config);
      } else {
        return new namespace.Rounded(config);
      }
  }
}});

Ext.define('Ext.scroll.View', {extend: 'Ext.Evented', alternateClassName: 'Ext.util.ScrollView', config: {indicatorsUi: 'dark', element: null, scroller: {}, indicators: {x: {axis: 'x'}, y: {axis: 'y'}}, indicatorsHidingDelay: 100, cls: Ext.baseCSSPrefix + 'scroll-view'}, processConfig: function(config) {
  if (!config) 
  {
    return null;
  }
  if (typeof config == 'string') 
  {
    config = {direction: config};
  }
  config = Ext.merge({}, config);
  var scrollerConfig = config.scroller, name;
  if (!scrollerConfig) 
  {
    config.scroller = scrollerConfig = {};
  }
  for (name in config) 
    {
      if (config.hasOwnProperty(name)) 
      {
        if (!this.hasConfig(name)) 
        {
          scrollerConfig[name] = config[name];
          delete config[name];
        }
      }
    }
  return config;
}, constructor: function(config) {
  config = this.processConfig(config);
  this.useIndicators = {x: true, y: true};
  this.doHideIndicators = Ext.Function.bind(this.doHideIndicators, this);
  this.initConfig(config);
}, setConfig: function(config) {
  return this.callParent([this.processConfig(config)]);
}, updateIndicatorsUi: function(newUi) {
  var indicators = this.getIndicators();
  indicators.x.setUi(newUi);
  indicators.y.setUi(newUi);
}, applyScroller: function(config, currentScroller) {
  return Ext.factory(config, Ext.scroll.Scroller, currentScroller);
}, applyIndicators: function(config, indicators) {
  var defaultClass = Ext.scroll.Indicator, useIndicators = this.useIndicators;
  if (!config) 
  {
    config = {};
  }
  if (!config.x) 
  {
    useIndicators.x = false;
    config.x = {};
  }
  if (!config.y) 
  {
    useIndicators.y = false;
    config.y = {};
  }
  return {x: Ext.factory(config.x, defaultClass, indicators && indicators.x), y: Ext.factory(config.y, defaultClass, indicators && indicators.y)};
}, updateIndicators: function(indicators) {
  this.indicatorsGrid = Ext.Element.create({className: 'x-scroll-bar-grid-wrapper', children: [{className: 'x-scroll-bar-grid', children: [{children: [{}, {children: [indicators.y.barElement]}]}, {children: [{children: [indicators.x.barElement]}, {}]}]}]});
}, updateScroller: function(scroller) {
  scroller.on({scope: this, scrollstart: 'onScrollStart', scroll: 'onScroll', scrollend: 'onScrollEnd', refresh: 'refreshIndicators'});
}, isAxisEnabled: function(axis) {
  return this.getScroller().isAxisEnabled(axis) && this.useIndicators[axis];
}, applyElement: function(element) {
  if (element) 
  {
    return Ext.get(element);
  }
}, updateElement: function(element) {
  var scroller = this.getScroller(), scrollerElement;
  scrollerElement = element.getFirstChild().getFirstChild();
  if (this.FixedHBoxStretching) 
  {
    scrollerElement = scrollerElement.getFirstChild();
  }
  element.addCls(this.getCls());
  element.insertFirst(this.indicatorsGrid);
  scroller.setElement(scrollerElement);
  this.refreshIndicators();
  return this;
}, showIndicators: function() {
  var indicators = this.getIndicators();
  if (this.hasOwnProperty('indicatorsHidingTimer')) 
  {
    clearTimeout(this.indicatorsHidingTimer);
    delete this.indicatorsHidingTimer;
  }
  if (this.isAxisEnabled('x')) 
  {
    indicators.x.show();
  }
  if (this.isAxisEnabled('y')) 
  {
    indicators.y.show();
  }
}, hideIndicators: function() {
  var delay = this.getIndicatorsHidingDelay();
  if (delay > 0) 
  {
    this.indicatorsHidingTimer = setTimeout(this.doHideIndicators, delay);
  } else {
    this.doHideIndicators();
  }
}, doHideIndicators: function() {
  var indicators = this.getIndicators();
  if (this.isAxisEnabled('x')) 
  {
    indicators.x.hide();
  }
  if (this.isAxisEnabled('y')) 
  {
    indicators.y.hide();
  }
}, onScrollStart: function() {
  this.onScroll.apply(this, arguments);
  this.showIndicators();
}, onScrollEnd: function() {
  this.hideIndicators();
}, onScroll: function(scroller, x, y) {
  this.setIndicatorValue('x', x);
  this.setIndicatorValue('y', y);
}, setIndicatorValue: function(axis, scrollerPosition) {
  if (!this.isAxisEnabled(axis)) 
  {
    return this;
  }
  var scroller = this.getScroller(), scrollerMaxPosition = scroller.getMaxPosition()[axis], scrollerContainerSize = scroller.getContainerSize()[axis], value;
  if (scrollerMaxPosition === 0) 
  {
    value = scrollerPosition / scrollerContainerSize;
    if (scrollerPosition >= 0) 
    {
      value += 1;
    }
  } else {
    if (scrollerPosition > scrollerMaxPosition) 
    {
      value = 1 + ((scrollerPosition - scrollerMaxPosition) / scrollerContainerSize);
    } else if (scrollerPosition < 0) 
    {
      value = scrollerPosition / scrollerContainerSize;
    } else {
      value = scrollerPosition / scrollerMaxPosition;
    }
  }
  this.getIndicators()[axis].setValue(value);
}, refreshIndicator: function(axis) {
  if (!this.isAxisEnabled(axis)) 
  {
    return this;
  }
  var scroller = this.getScroller(), indicator = this.getIndicators()[axis], scrollerContainerSize = scroller.getContainerSize()[axis], scrollerSize = scroller.getSize()[axis], ratio = scrollerContainerSize / scrollerSize;
  indicator.setRatio(ratio);
  indicator.refresh();
}, refresh: function() {
  return this.getScroller().refresh();
}, refreshIndicators: function() {
  var indicators = this.getIndicators();
  indicators.x.setActive(this.isAxisEnabled('x'));
  indicators.y.setActive(this.isAxisEnabled('y'));
  this.refreshIndicator('x');
  this.refreshIndicator('y');
}, destroy: function() {
  var element = this.getElement(), indicators = this.getIndicators();
  Ext.destroy(this.getScroller(), this.indicatorsGrid);
  if (this.hasOwnProperty('indicatorsHidingTimer')) 
  {
    clearTimeout(this.indicatorsHidingTimer);
    delete this.indicatorsHidingTimer;
  }
  if (element && !element.isDestroyed) 
  {
    element.removeCls(this.getCls());
  }
  indicators.x.destroy();
  indicators.y.destroy();
  delete this.indicatorsGrid;
  this.callParent(arguments);
}});

Ext.define('Ext.behavior.Scrollable', {extend: 'Ext.behavior.Behavior', constructor: function() {
  this.listeners = {painted: 'onComponentPainted', scope: this};
  this.callParent(arguments);
}, onComponentPainted: function() {
  this.scrollView.refresh();
}, setConfig: function(config) {
  var scrollView = this.scrollView, component = this.component, scrollerElement, extraWrap, scroller, direction;
  if (config) 
  {
    if (!scrollView) 
    {
      this.scrollView = scrollView = new Ext.scroll.View(config);
      scrollView.on('destroy', 'onScrollViewDestroy', this);
      component.setUseBodyElement(true);
      this.scrollerElement = scrollerElement = component.innerElement;
      if (!Ext.feature.has.ProperHBoxStretching) 
      {
        scroller = scrollView.getScroller();
        direction = (Ext.isObject(config) ? config.direction : config) || 'auto';
        if (direction !== 'vertical') 
        {
          extraWrap = scrollerElement.wrap();
          extraWrap.addCls(Ext.baseCSSPrefix + 'translatable-hboxfix');
          if (direction == 'horizontal') 
          {
            extraWrap.setStyle({height: '100%'});
          }
          this.scrollContainer = extraWrap.wrap();
          scrollView.FixedHBoxStretching = scroller.FixedHBoxStretching = true;
        } else {
          this.scrollContainer = scrollerElement.wrap();
        }
      } else {
        this.scrollContainer = scrollerElement.wrap();
      }
      scrollView.setElement(component.bodyElement);
      if (component.isPainted()) 
      {
        this.onComponentPainted();
      }
      component.on(this.listeners);
    } else if (Ext.isString(config) || Ext.isObject(config)) 
    {
      scrollView.setConfig(config);
    }
  } else if (scrollView) 
  {
    scrollView.destroy();
  }
  return this;
}, getScrollView: function() {
  return this.scrollView;
}, onScrollViewDestroy: function() {
  var component = this.component, scrollerElement = this.scrollerElement;
  if (!scrollerElement.isDestroyed) 
  {
    this.scrollerElement.unwrap();
  }
  this.scrollContainer.destroy();
  if (!component.isDestroyed) 
  {
    component.un(this.listeners);
  }
  delete this.scrollerElement;
  delete this.scrollView;
  delete this.scrollContainer;
}, onComponentDestroy: function() {
  var scrollView = this.scrollView;
  if (scrollView) 
  {
    scrollView.destroy();
  }
}});

Ext.define('Ext.util.InputBlocker', {singleton: true, blockInputs: function() {
  if (Ext.browser.is.ie) 
  {
    Ext.select('.x-field-text .x-field-input:not(.x-item-disabled) .x-input-el, .x-field-textarea .x-field-input:not(.x-item-disabled) .x-input-el, .x-field-search .x-field-input:not(.x-item-disabled) .x-input-el').each(function(item) {
  if (item.dom.offsetWidth > 0) 
  {
    item.dom.setAttribute('disabled', true);
    item.dom.setAttribute('overlayfix', true);
  }
});
  }
}, unblockInputs: function() {
  if (Ext.browser.is.ie) 
  {
    Ext.select('[overlayfix]').each(function(item) {
  item.dom.removeAttribute('disabled');
  item.dom.removeAttribute('overlayfix');
});
  }
}});

Ext.define('Ext.Mask', {extend: 'Ext.Component', xtype: 'mask', config: {baseCls: Ext.baseCSSPrefix + 'mask', transparent: false, top: 0, left: 0, right: 0, bottom: 0}, initialize: function() {
  this.callSuper();
  this.element.on('*', 'onEvent', this);
  this.on({hide: 'onHide'});
}, onHide: function() {
  Ext.util.InputBlocker.unblockInputs();
  if (Ext.browser.is.AndroidStock4 && Ext.os.version.getMinor() === 0) 
  {
    var firstChild = this.element.getFirstChild();
    if (firstChild) 
    {
      firstChild.redraw();
    }
  }
}, onEvent: function(e) {
  var controller = arguments[arguments.length - 1];
  if (controller.info.eventName === 'tap') 
  {
    this.fireEvent('tap', this, e);
    return false;
  }
  if (e && e.stopEvent) 
  {
    e.stopEvent();
  }
  return false;
}, updateTransparent: function(newTransparent) {
  this[newTransparent ? 'addCls' : 'removeCls'](this.getBaseCls() + '-transparent');
}});

Ext.define('Ext.Container', {extend: 'Ext.Component', alternateClassName: 'Ext.lib.Container', xtype: 'container', eventedConfig: {activeItem: 0, scrollable: null}, config: {layout: null, control: {}, defaults: null, items: null, autoDestroy: true, defaultType: null, useBodyElement: null, masked: null, modal: null, hideOnMaskTap: null}, isContainer: true, constructor: function(config) {
  var me = this;
  me._items = me.items = new Ext.ItemCollection();
  me.innerItems = [];
  me.onItemAdd = me.onFirstItemAdd;
  me.callParent(arguments);
}, getElementConfig: function() {
  return {reference: 'element', classList: ['x-container', 'x-unsized'], children: [{reference: 'innerElement', className: 'x-inner'}]};
}, applyMasked: function(masked) {
  var isVisible = true, currentMask;
  if (masked === false) 
  {
    masked = true;
    isVisible = false;
  }
  currentMask = Ext.factory(masked, Ext.Mask, this.getMasked());
  if (currentMask) 
  {
    this.add(currentMask);
    currentMask.setHidden(!isVisible);
  }
  return currentMask;
}, mask: function(mask) {
  this.setMasked(mask || true);
}, unmask: function() {
  this.setMasked(false);
}, setParent: function(container) {
  this.callSuper(arguments);
  if (container) 
  {
    var modal = this.getModal();
    if (modal) 
    {
      container.insertBefore(modal, this);
      modal.setZIndex(this.getZIndex() - 1);
    }
  }
}, applyModal: function(modal, currentModal) {
  var isVisible = true;
  if (modal === false) 
  {
    modal = true;
    isVisible = false;
  }
  currentModal = Ext.factory(modal, Ext.Mask, currentModal);
  if (currentModal) 
  {
    currentModal.setVisibility(isVisible);
  }
  return currentModal;
}, updateModal: function(modal) {
  var container = this.getParent();
  if (container) 
  {
    if (modal) 
    {
      container.insertBefore(modal, this);
      modal.setZIndex(this.getZIndex() - 1);
    } else {
      container.remove(modal);
    }
  }
}, updateHideOnMaskTap: function(hide) {
  var mask = this.getModal();
  if (mask) 
  {
    mask[hide ? 'on' : 'un'].call(mask, 'tap', 'hide', this);
  }
}, updateZIndex: function(zIndex) {
  var modal = this.getModal();
  this.callParent(arguments);
  if (modal) 
  {
    modal.setZIndex(zIndex - 1);
  }
}, updateBaseCls: function(newBaseCls, oldBaseCls) {
  var me = this, ui = me.getUi();
  if (oldBaseCls) 
  {
    this.element.removeCls(oldBaseCls);
    this.innerElement.removeCls(newBaseCls, null, 'inner');
    if (ui) 
    {
      this.element.removeCls(this.currentUi);
    }
  }
  if (newBaseCls) 
  {
    this.element.addCls(newBaseCls);
    this.innerElement.addCls(newBaseCls, null, 'inner');
    if (ui) 
    {
      this.element.addCls(newBaseCls, null, ui);
      this.currentUi = newBaseCls + '-' + ui;
    }
  }
}, updateUseBodyElement: function(useBodyElement) {
  if (useBodyElement) 
  {
    this.link('bodyElement', this.innerElement.wrap({cls: 'x-body'}));
  }
}, applyItems: function(items, collection) {
  if (items) 
  {
    var me = this;
    me.getDefaultType();
    me.getDefaults();
    if (me.initialized && collection.length > 0) 
    {
      me.removeAll();
    }
    me.add(items);
    if (me.initialized) 
    {
      var activeItem = me.initialConfig.activeItem || me.config.activeItem || 0;
      me.setActiveItem(activeItem);
    }
  }
}, applyControl: function(selectors) {
  var selector, key, listener, listeners;
  for (selector in selectors) 
    {
      listeners = selectors[selector];
      for (key in listeners) 
        {
          listener = listeners[key];
          if (Ext.isObject(listener)) 
          {
            listener.delegate = selector;
          }
        }
      listeners.delegate = selector;
      this.addListener(listeners);
    }
  return selectors;
}, onFirstItemAdd: function() {
  delete this.onItemAdd;
  if (this.innerHtmlElement && !this.getHtml()) 
  {
    this.innerHtmlElement.destroy();
    delete this.innerHtmlElement;
  }
  this.on('innerstatechange', 'onItemInnerStateChange', this, {delegate: '> component'});
  return this.onItemAdd.apply(this, arguments);
}, getLayout: function() {
  var layout = this.layout;
  if (!layout) 
  {
    layout = this.link('_layout', this.link('layout', Ext.factory(this._layout || 'default', Ext.layout.Default, null, 'layout')));
    layout.setContainer(this);
  }
  return layout;
}, updateDefaultType: function(defaultType) {
  this.defaultItemClass = Ext.ClassManager.getByAlias('widget.' + defaultType);
}, applyDefaults: function(defaults) {
  if (defaults) 
  {
    this.factoryItem = this.factoryItemWithDefaults;
    return defaults;
  }
}, factoryItem: function(item) {
  return Ext.factory(item, this.defaultItemClass);
}, factoryItemWithDefaults: function(item) {
  var me = this, defaults = me.getDefaults(), instance;
  if (!defaults) 
  {
    return Ext.factory(item, me.defaultItemClass);
  }
  if (item.isComponent) 
  {
    instance = item;
    if (defaults && item.isInnerItem() && !me.has(instance)) 
    {
      instance.setConfig(defaults, true);
    }
  } else {
    if (defaults && !item.ignoreDefaults) 
    {
      if (!(item.hasOwnProperty('left') && item.hasOwnProperty('right') && item.hasOwnProperty('top') && item.hasOwnProperty('bottom') && item.hasOwnProperty('docked') && item.hasOwnProperty('centered'))) 
      {
        item = Ext.mergeIf({}, item, defaults);
      }
    }
    instance = Ext.factory(item, me.defaultItemClass);
  }
  return instance;
}, add: function(newItems) {
  var me = this, i, ln, item, newActiveItem;
  if (Ext.isArray(newItems)) 
  {
    for (i = 0 , ln = newItems.length; i < ln; i++) 
      {
        item = me.factoryItem(newItems[i]);
        this.doAdd(item);
        if (!newActiveItem && !this.getActiveItem() && this.innerItems.length > 0 && item.isInnerItem()) 
        {
          newActiveItem = item;
        }
      }
  } else {
    item = me.factoryItem(newItems);
    this.doAdd(item);
    if (!newActiveItem && !this.getActiveItem() && this.innerItems.length > 0 && item.isInnerItem()) 
    {
      newActiveItem = item;
    }
  }
  if (newActiveItem) 
  {
    this.setActiveItem(newActiveItem);
  }
  return item;
}, doAdd: function(item) {
  var me = this, items = me.getItems(), index;
  if (!items.has(item)) 
  {
    index = items.length;
    items.add(item);
    if (item.isInnerItem()) 
    {
      me.insertInner(item);
    }
    item.setParent(me);
    me.onItemAdd(item, index);
  }
}, remove: function(item, destroy) {
  var me = this, index = me.indexOf(item), innerItems = me.getInnerItems();
  if (destroy === undefined) 
  {
    destroy = me.getAutoDestroy();
  }
  if (index !== -1) 
  {
    if (!me.removingAll && innerItems.length > 1 && item === me.getActiveItem()) 
    {
      me.on({activeitemchange: 'doRemove', scope: me, single: true, order: 'after', args: [item, index, destroy]});
      me.doResetActiveItem(innerItems.indexOf(item));
    } else {
      me.doRemove(item, index, destroy);
      if (innerItems.length === 0) 
      {
        me.setActiveItem(null);
      }
    }
  }
  return me;
}, doResetActiveItem: function(innerIndex) {
  if (innerIndex === 0) 
  {
    this.setActiveItem(1);
  } else {
    this.setActiveItem(0);
  }
}, doRemove: function(item, index, destroy) {
  var me = this;
  me.items.remove(item);
  if (item.isInnerItem()) 
  {
    me.removeInner(item);
  }
  me.onItemRemove(item, index, destroy);
  item.setParent(null);
  if (destroy) 
  {
    item.destroy();
  }
}, removeAll: function(destroy, everything) {
  var items = this.items, ln = items.length, i = 0, item;
  if (typeof destroy != 'boolean') 
  {
    destroy = this.getAutoDestroy();
  }
  everything = Boolean(everything);
  this.removingAll = true;
  for (; i < ln; i++) 
    {
      item = items.getAt(i);
      if (item && (everything || item.isInnerItem())) 
      {
        this.doRemove(item, i, destroy);
        i--;
        ln--;
      }
    }
  this.setActiveItem(null);
  this.removingAll = false;
  return this;
}, getAt: function(index) {
  return this.items.getAt(index);
}, getInnerAt: function(index) {
  return this.innerItems[index];
}, removeAt: function(index) {
  var item = this.getAt(index);
  if (item) 
  {
    this.remove(item);
  }
  return this;
}, removeInnerAt: function(index) {
  var item = this.getInnerItems()[index];
  if (item) 
  {
    this.remove(item);
  }
  return this;
}, has: function(item) {
  return this.getItems().indexOf(item) != -1;
}, hasInnerItem: function(item) {
  return this.innerItems.indexOf(item) != -1;
}, indexOf: function(item) {
  return this.getItems().indexOf(item);
}, innerIndexOf: function(item) {
  return this.innerItems.indexOf(item);
}, insertInner: function(item, index) {
  var items = this.getItems().items, innerItems = this.innerItems, currentInnerIndex = innerItems.indexOf(item), newInnerIndex = -1, nextSibling;
  if (currentInnerIndex !== -1) 
  {
    innerItems.splice(currentInnerIndex, 1);
  }
  if (typeof index == 'number') 
  {
    do {
      nextSibling = items[++index];
    } while (nextSibling && !nextSibling.isInnerItem());
    if (nextSibling) 
    {
      newInnerIndex = innerItems.indexOf(nextSibling);
      innerItems.splice(newInnerIndex, 0, item);
    }
  }
  if (newInnerIndex === -1) 
  {
    innerItems.push(item);
    newInnerIndex = innerItems.length - 1;
  }
  if (currentInnerIndex !== -1) 
  {
    this.onInnerItemMove(item, newInnerIndex, currentInnerIndex);
  }
  return this;
}, onInnerItemMove: Ext.emptyFn, removeInner: function(item) {
  Ext.Array.remove(this.innerItems, item);
  return this;
}, insert: function(index, item) {
  var me = this, i;
  if (Ext.isArray(item)) 
  {
    for (i = item.length - 1; i >= 0; i--) 
      {
        me.insert(index, item[i]);
      }
    return me;
  }
  item = this.factoryItem(item);
  this.doInsert(index, item);
  return item;
}, doInsert: function(index, item) {
  var me = this, items = me.items, itemsLength = items.length, currentIndex, isInnerItem;
  isInnerItem = item.isInnerItem();
  if (index > itemsLength) 
  {
    index = itemsLength;
  }
  if (items[index - 1] === item) 
  {
    return me;
  }
  currentIndex = me.indexOf(item);
  if (currentIndex !== -1) 
  {
    if (currentIndex < index) 
    {
      index -= 1;
    }
    items.removeAt(currentIndex);
  }
  items.insert(index, item);
  if (currentIndex === -1) 
  {
    item.setParent(me);
  }
  if (isInnerItem) 
  {
    me.insertInner(item, index);
  }
  if (currentIndex !== -1) 
  {
    me.onItemMove(item, index, currentIndex);
  } else {
    me.onItemAdd(item, index);
  }
}, insertFirst: function(item) {
  return this.insert(0, item);
}, insertLast: function(item) {
  return this.insert(this.getItems().length, item);
}, insertBefore: function(item, relativeToItem) {
  var index = this.indexOf(relativeToItem);
  if (index !== -1) 
  {
    this.insert(index, item);
  }
  return this;
}, insertAfter: function(item, relativeToItem) {
  var index = this.indexOf(relativeToItem);
  if (index !== -1) 
  {
    this.insert(index + 1, item);
  }
  return this;
}, onItemAdd: function(item, index) {
  this.doItemLayoutAdd(item, index);
  if (this.initialized) 
  {
    this.fireEvent('add', this, item, index);
  }
}, doItemLayoutAdd: function(item, index) {
  var layout = this.getLayout();
  if (this.isRendered() && item.setRendered(true)) 
  {
    item.fireAction('renderedchange', [this, item, true], 'onItemAdd', layout, {args: [item, index]});
  } else {
    layout.onItemAdd(item, index);
  }
}, onItemRemove: function(item, index, destroying) {
  this.doItemLayoutRemove(item, index, destroying);
  this.fireEvent('remove', this, item, index);
}, doItemLayoutRemove: function(item, index, destroying) {
  var layout = this.getLayout();
  if (this.isRendered() && item.setRendered(false)) 
  {
    item.fireAction('renderedchange', [this, item, false], 'onItemRemove', layout, {args: [item, index, destroying]});
  } else {
    layout.onItemRemove(item, index, destroying);
  }
}, onItemMove: function(item, toIndex, fromIndex) {
  if (item.isDocked()) 
  {
    item.setDocked(null);
  }
  this.doItemLayoutMove(item, toIndex, fromIndex);
  this.fireEvent('move', this, item, toIndex, fromIndex);
}, doItemLayoutMove: function(item, toIndex, fromIndex) {
  this.getLayout().onItemMove(item, toIndex, fromIndex);
}, onItemInnerStateChange: function(item, isInner) {
  var layout = this.getLayout();
  if (isInner) 
  {
    this.insertInner(item, this.items.indexOf(item));
  } else {
    this.removeInner(item);
  }
  layout.onItemInnerStateChange.apply(layout, arguments);
}, getInnerItems: function() {
  return this.innerItems;
}, getDockedItems: function() {
  var items = this.getItems().items, dockedItems = [], ln = items.length, item, i;
  for (i = 0; i < ln; i++) 
    {
      item = items[i];
      if (item.isDocked()) 
      {
        dockedItems.push(item);
      }
    }
  return dockedItems;
}, applyActiveItem: function(activeItem, currentActiveItem) {
  var innerItems = this.getInnerItems();
  this.getItems();
  if (!activeItem && innerItems.length === 0) 
  {
    return 0;
  } else if (typeof activeItem == 'number') 
  {
    activeItem = Math.max(0, Math.min(activeItem, innerItems.length - 1));
    activeItem = innerItems[activeItem];
    if (activeItem) 
    {
      return activeItem;
    } else if (currentActiveItem) 
    {
      return null;
    }
  } else if (activeItem) 
  {
    var item;
    if (typeof activeItem == 'string') 
    {
      item = this.child(activeItem);
      activeItem = {xtype: activeItem};
    }
    if (!item || !item.isComponent) 
    {
      item = this.factoryItem(activeItem);
    }
    this.pendingActiveItem = item;
    if (!this.has(item)) 
    {
      this.add(item);
    }
    return item;
  }
}, animateActiveItem: function(activeItem, animation) {
  var layout = this.getLayout(), defaultAnimation;
  if (this.activeItemAnimation) 
  {
    this.activeItemAnimation.destroy();
  }
  this.activeItemAnimation = animation = new Ext.fx.layout.Card(animation);
  if (animation && layout.isCard) 
  {
    animation.setLayout(layout);
    defaultAnimation = layout.getAnimation();
    if (defaultAnimation) 
    {
      defaultAnimation.disable();
    }
    animation.on('animationend', function() {
  if (defaultAnimation) 
  {
    defaultAnimation.enable();
  }
  animation.destroy();
}, this);
  }
  return this.setActiveItem(activeItem);
}, doSetActiveItem: function(newActiveItem, oldActiveItem) {
  delete this.pendingActiveItem;
  if (oldActiveItem) 
  {
    oldActiveItem.fireEvent('deactivate', oldActiveItem, this, newActiveItem);
  }
  if (newActiveItem) 
  {
    newActiveItem.fireEvent('activate', newActiveItem, this, oldActiveItem);
  }
}, show: function() {
  this.callParent(arguments);
  var modal = this.getModal();
  if (modal) 
  {
    modal.setHidden(false);
  }
  return this;
}, hide: function() {
  this.callParent(arguments);
  var modal = this.getModal();
  if (modal) 
  {
    modal.setHidden(true);
  }
  return this;
}, doSetHidden: function(hidden) {
  var modal = this.getModal();
  if (modal && (modal.getHidden() !== hidden)) 
  {
    modal.setHidden(hidden);
  }
  this.callSuper(arguments);
}, setRendered: function(rendered) {
  if (this.callParent(arguments)) 
  {
    var items = this.items.items, i, ln;
    for (i = 0 , ln = items.length; i < ln; i++) 
      {
        items[i].setRendered(rendered);
      }
    return true;
  }
  return false;
}, getScrollableBehavior: function() {
  var behavior = this.scrollableBehavior;
  if (!behavior) 
  {
    behavior = this.scrollableBehavior = new Ext.behavior.Scrollable(this);
  }
  return behavior;
}, applyScrollable: function(config) {
  if (typeof config === 'boolean') 
  {
    this.getScrollableBehavior().setConfig({disabled: !config});
  } else if (config && !config.isObservable) 
  {
    this.getScrollableBehavior().setConfig(config);
  }
  return config;
}, doSetScrollable: function() {
}, getScrollable: function() {
  return this.getScrollableBehavior().getScrollView();
}, getRefItems: function(deep) {
  var items = this.getItems().items.slice(), ln = items.length, i, item;
  if (deep) 
  {
    for (i = 0; i < ln; i++) 
      {
        item = items[i];
        if (item.getRefItems) 
        {
          items = items.concat(item.getRefItems(true));
        }
      }
  }
  return items;
}, getComponent: function(component) {
  if (Ext.isObject(component)) 
  {
    component = component.getItemId();
  }
  return this.getItems().get(component);
}, getDockedComponent: function(component) {
  if (Ext.isObject(component)) 
  {
    component = component.getItemId();
  }
  var dockedItems = this.getDockedItems(), ln = dockedItems.length, item, i;
  if (Ext.isNumber(component)) 
  {
    return dockedItems[component];
  }
  for (i = 0; i < ln; i++) 
    {
      item = dockedItems[i];
      if (item.id == component) 
      {
        return item;
      }
    }
  return false;
}, query: function(selector) {
  return Ext.ComponentQuery.query(selector, this);
}, child: function(selector) {
  return this.query('> ' + selector)[0] || null;
}, down: function(selector) {
  return this.query(selector)[0] || null;
}, destroy: function() {
  var me = this, modal = me.getModal();
  if (modal) 
  {
    modal.destroy();
  }
  me.removeAll(true, true);
  me.unlink('_scrollable');
  Ext.destroy(me.items);
  me.callSuper();
}}, function() {
  this.addMember('defaultItemClass', this);
});

Ext.define('Ext.util.Point', {radianToDegreeConstant: 180 / Math.PI, statics: {fromEvent: function(e) {
  var changedTouches = e.changedTouches, touch = (changedTouches && changedTouches.length > 0) ? changedTouches[0] : e;
  return this.fromTouch(touch);
}, fromTouch: function(touch) {
  return new this(touch.pageX, touch.pageY);
}, from: function(object) {
  if (!object) 
  {
    return new this(0, 0);
  }
  if (!(object instanceof this)) 
  {
    return new this(object.x, object.y);
  }
  return object;
}}, constructor: function(x, y) {
  if (typeof x == 'undefined') 
  {
    x = 0;
  }
  if (typeof y == 'undefined') 
  {
    y = 0;
  }
  this.x = x;
  this.y = y;
  return this;
}, clone: function() {
  return new this.self(this.x, this.y);
}, copy: function() {
  return this.clone.apply(this, arguments);
}, copyFrom: function(point) {
  this.x = point.x;
  this.y = point.y;
  return this;
}, toString: function() {
  return "Point[" + this.x + "," + this.y + "]";
}, equals: function(point) {
  return (this.x === point.x && this.y === point.y);
}, isCloseTo: function(point, threshold) {
  if (typeof threshold == 'number') 
  {
    threshold = {x: threshold};
    threshold.y = threshold.x;
  }
  var x = point.x, y = point.y, thresholdX = threshold.x, thresholdY = threshold.y;
  return (this.x <= x + thresholdX && this.x >= x - thresholdX && this.y <= y + thresholdY && this.y >= y - thresholdY);
}, isWithin: function() {
  return this.isCloseTo.apply(this, arguments);
}, translate: function(x, y) {
  this.x += x;
  this.y += y;
  return this;
}, roundedEquals: function(point) {
  if (typeof point != 'object') 
  {
    point = {x: 0, y: 0};
  }
  return (Math.round(this.x) === Math.round(point.x) && Math.round(this.y) === Math.round(point.y));
}, getDistanceTo: function(point) {
  if (typeof point != 'object') 
  {
    point = {x: 0, y: 0};
  }
  var deltaX = this.x - point.x, deltaY = this.y - point.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}, getAngleTo: function(point) {
  if (typeof point != 'object') 
  {
    point = {x: 0, y: 0};
  }
  var deltaX = this.x - point.x, deltaY = this.y - point.y;
  return Math.atan2(deltaY, deltaX) * this.radianToDegreeConstant;
}});

Ext.define('Ext.util.LineSegment', {constructor: function(point1, point2) {
  var Point = Ext.util.Point;
  this.point1 = Point.from(point1);
  this.point2 = Point.from(point2);
}, intersects: function(lineSegment) {
  var point1 = this.point1, point2 = this.point2, point3 = lineSegment.point1, point4 = lineSegment.point2, x1 = point1.x, x2 = point2.x, x3 = point3.x, x4 = point4.x, y1 = point1.y, y2 = point2.y, y3 = point3.y, y4 = point4.y, d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4), xi, yi;
  if (d == 0) 
  {
    return null;
  }
  xi = ((x3 - x4) * (x1 * y2 - y1 * x2) - (x1 - x2) * (x3 * y4 - y3 * x4)) / d;
  yi = ((y3 - y4) * (x1 * y2 - y1 * x2) - (y1 - y2) * (x3 * y4 - y3 * x4)) / d;
  if (xi < Math.min(x1, x2) || xi > Math.max(x1, x2) || xi < Math.min(x3, x4) || xi > Math.max(x3, x4) || yi < Math.min(y1, y2) || yi > Math.max(y1, y2) || yi < Math.min(y3, y4) || yi > Math.max(y3, y4)) 
  {
    return null;
  }
  return new Ext.util.Point(xi, yi);
}, getLength: function() {
  return Math.abs(this.point1.getDistanceTo(this.point2));
}, getAngleToX: function() {
  var point1 = this.point1, point2 = this.point2, deltaY = point2.y - point1.y, deltaX = point2.x - point1.x;
  return Math.atan2(deltaY, deltaX);
}, getInBetweenPoint: function(distance) {
  var point1 = this.point1, angle = this.getAngleToX(), x = point1.x + Math.cos(angle) * distance, y = point1.y + Math.sin(angle) * distance;
  return new Ext.util.Point(x, y);
}, toString: function() {
  return this.point1.toString() + " " + this.point2.toString();
}});

Ext.define('Ext.Panel', {extend: 'Ext.Container', alternateClassName: 'Ext.lib.Panel', xtype: 'panel', isPanel: true, config: {baseCls: Ext.baseCSSPrefix + 'panel', bodyPadding: null, bodyMargin: null, bodyBorder: null}, getElementConfig: function() {
  return {reference: 'element', classList: ['x-container', 'x-unsized'], children: [{reference: 'innerElement', className: 'x-inner'}, {reference: 'tipElement', className: 'x-anchor', hidden: true}]};
}, applyBodyPadding: function(bodyPadding) {
  if (bodyPadding === true) 
  {
    bodyPadding = 5;
  }
  if (bodyPadding) 
  {
    bodyPadding = Ext.dom.Element.unitizeBox(bodyPadding);
  }
  return bodyPadding;
}, updateBodyPadding: function(newBodyPadding) {
  this.element.setStyle('padding', newBodyPadding);
}, applyBodyMargin: function(bodyMargin) {
  if (bodyMargin === true) 
  {
    bodyMargin = 5;
  }
  if (bodyMargin) 
  {
    bodyMargin = Ext.dom.Element.unitizeBox(bodyMargin);
  }
  return bodyMargin;
}, updateBodyMargin: function(newBodyMargin) {
  this.element.setStyle('margin', newBodyMargin);
}, applyBodyBorder: function(bodyBorder) {
  if (bodyBorder === true) 
  {
    bodyBorder = 1;
  }
  if (bodyBorder) 
  {
    bodyBorder = Ext.dom.Element.unitizeBox(bodyBorder);
  }
  return bodyBorder;
}, updateBodyBorder: function(newBodyBorder) {
  this.element.setStyle('border-width', newBodyBorder);
}, alignTo: function(component, alignment) {
  var alignmentInfo = this.getAlignmentInfo(component, alignment);
  if (alignmentInfo.isAligned) 
  return;
  var tipElement = this.tipElement;
  tipElement.hide();
  if (this.currentTipPosition) 
  {
    tipElement.removeCls('x-anchor-' + this.currentTipPosition);
  }
  this.callParent(arguments);
  var LineSegment = Ext.util.LineSegment, alignToElement = component.isComponent ? component.renderElement : component, element = this.renderElement, alignToBox = alignToElement.getPageBox(), box = element.getPageBox(), left = box.left, top = box.top, right = box.right, bottom = box.bottom, centerX = left + (box.width / 2), centerY = top + (box.height / 2), leftTopPoint = {x: left, y: top}, rightTopPoint = {x: right, y: top}, leftBottomPoint = {x: left, y: bottom}, rightBottomPoint = {x: right, y: bottom}, boxCenterPoint = {x: centerX, y: centerY}, alignToCenterX = alignToBox.left + (alignToBox.width / 2), alignToCenterY = alignToBox.top + (alignToBox.height / 2), alignToBoxCenterPoint = {x: alignToCenterX, y: alignToCenterY}, centerLineSegment = new LineSegment(boxCenterPoint, alignToBoxCenterPoint), offsetLeft = 0, offsetTop = 0, tipSize, tipWidth, tipHeight, tipPosition, tipX, tipY;
  tipElement.setVisibility(false);
  tipElement.show();
  tipSize = tipElement.getSize();
  tipWidth = tipSize.width;
  tipHeight = tipSize.height;
  if (centerLineSegment.intersects(new LineSegment(leftTopPoint, rightTopPoint))) 
  {
    tipX = Math.min(Math.max(alignToCenterX, left + tipWidth), right - (tipWidth));
    tipY = top;
    offsetTop = tipHeight + 10;
    tipPosition = 'top';
  } else if (centerLineSegment.intersects(new LineSegment(leftTopPoint, leftBottomPoint))) 
  {
    tipX = left;
    tipY = Math.min(Math.max(alignToCenterY + (tipWidth / 2), tipWidth * 1.6), bottom - (tipWidth / 2.2));
    offsetLeft = tipHeight + 10;
    tipPosition = 'left';
  } else if (centerLineSegment.intersects(new LineSegment(leftBottomPoint, rightBottomPoint))) 
  {
    tipX = Math.min(Math.max(alignToCenterX, left + tipWidth), right - tipWidth);
    tipY = bottom;
    offsetTop = -tipHeight - 10;
    tipPosition = 'bottom';
  } else if (centerLineSegment.intersects(new LineSegment(rightTopPoint, rightBottomPoint))) 
  {
    tipX = right;
    tipY = Math.max(Math.min(alignToCenterY - tipHeight, bottom - tipWidth * 1.3), tipWidth / 2);
    offsetLeft = -tipHeight - 10;
    tipPosition = 'right';
  }
  if (tipX || tipY) 
  {
    this.currentTipPosition = tipPosition;
    tipElement.addCls('x-anchor-' + tipPosition);
    tipElement.setLeft(tipX - left);
    tipElement.setTop(tipY - top);
    tipElement.setVisibility(true);
    this.setLeft(this.getLeft() + offsetLeft);
    this.setTop(this.getTop() + offsetTop);
  }
}});

Ext.define('Ext.Button', {extend: 'Ext.Component', xtype: 'button', cachedConfig: {pressedCls: Ext.baseCSSPrefix + 'button-pressing', badgeCls: Ext.baseCSSPrefix + 'badge', hasBadgeCls: Ext.baseCSSPrefix + 'hasbadge', labelCls: Ext.baseCSSPrefix + 'button-label', iconCls: null}, config: {badgeText: null, text: null, icon: false, iconAlign: 'left', pressedDelay: 0, handler: null, scope: null, autoEvent: null, ui: 'normal', baseCls: Ext.baseCSSPrefix + 'button'}, template: [{tag: 'span', reference: 'badgeElement', hidden: true}, {tag: 'span', className: Ext.baseCSSPrefix + 'button-icon', reference: 'iconElement'}, {tag: 'span', reference: 'textElement', hidden: true}], initialize: function() {
  this.callParent();
  this.element.on({scope: this, tap: 'onTap', touchstart: 'onPress', touchend: 'onRelease'});
}, updateBadgeText: function(badgeText) {
  var element = this.element, badgeElement = this.badgeElement;
  if (badgeText) 
  {
    badgeElement.show();
    badgeElement.setText(badgeText);
  } else {
    badgeElement.hide();
  }
  element[(badgeText) ? 'addCls' : 'removeCls'](this.getHasBadgeCls());
}, updateText: function(text) {
  var textElement = this.textElement;
  if (textElement) 
  {
    if (text) 
    {
      textElement.show();
      textElement.setHtml(text);
    } else {
      textElement.hide();
    }
    this.refreshIconAlign();
  }
}, updateHtml: function(html) {
  var textElement = this.textElement;
  if (html) 
  {
    textElement.show();
    textElement.setHtml(html);
  } else {
    textElement.hide();
  }
}, updateBadgeCls: function(badgeCls, oldBadgeCls) {
  this.badgeElement.replaceCls(oldBadgeCls, badgeCls);
}, updateHasBadgeCls: function(hasBadgeCls, oldHasBadgeCls) {
  var element = this.element;
  if (element.hasCls(oldHasBadgeCls)) 
  {
    element.replaceCls(oldHasBadgeCls, hasBadgeCls);
  }
}, updateLabelCls: function(labelCls, oldLabelCls) {
  this.textElement.replaceCls(oldLabelCls, labelCls);
}, updatePressedCls: function(pressedCls, oldPressedCls) {
  var element = this.element;
  if (element.hasCls(oldPressedCls)) 
  {
    element.replaceCls(oldPressedCls, pressedCls);
  }
}, updateIcon: function(icon) {
  var me = this, element = me.iconElement;
  if (icon) 
  {
    me.showIconElement();
    element.setStyle('background-image', 'url(' + icon + ')');
    me.refreshIconAlign();
  } else {
    element.setStyle('background-image', '');
    me.hideIconElement();
  }
}, updateIconCls: function(iconCls, oldIconCls) {
  var me = this, element = me.iconElement;
  if (iconCls) 
  {
    me.showIconElement();
    element.replaceCls(oldIconCls, iconCls);
    me.refreshIconAlign();
  } else {
    element.removeCls(oldIconCls);
    me.hideIconElement();
  }
}, updateIconAlign: function(alignment, oldAlignment) {
  var element = this.element, baseCls = Ext.baseCSSPrefix + 'iconalign-';
  if (!this.getText()) 
  {
    alignment = "center";
  }
  element.removeCls(baseCls + "center");
  element.removeCls(baseCls + oldAlignment);
  if (this.getIcon() || this.getIconCls()) 
  {
    element.addCls(baseCls + alignment);
  }
}, refreshIconAlign: function() {
  this.updateIconAlign(this.getIconAlign());
}, applyAutoEvent: function(autoEvent) {
  var me = this;
  if (typeof autoEvent == 'string') 
  {
    autoEvent = {name: autoEvent, scope: me.scope || me};
  }
  return autoEvent;
}, updateAutoEvent: function(autoEvent) {
  var name = autoEvent.name, scope = autoEvent.scope;
  this.setHandler(function() {
  scope.fireEvent(name, scope, this);
});
  this.setScope(scope);
}, hideIconElement: function() {
  this.iconElement.removeCls(Ext.baseCSSPrefix + 'shown');
  this.iconElement.addCls(Ext.baseCSSPrefix + 'hidden');
}, showIconElement: function() {
  this.iconElement.removeCls(Ext.baseCSSPrefix + 'hidden');
  this.iconElement.addCls(Ext.baseCSSPrefix + 'shown');
}, applyUi: function(config) {
  if (config && Ext.isString(config)) 
  {
    var array = config.split('-');
    if (array && (array[1] == "back" || array[1] == "forward")) 
    {
      return array;
    }
  }
  return config;
}, getUi: function() {
  var ui = this._ui;
  if (Ext.isArray(ui)) 
  {
    return ui.join('-');
  }
  return ui;
}, applyPressedDelay: function(delay) {
  if (Ext.isNumber(delay)) 
  {
    return delay;
  }
  return (delay) ? 100 : 0;
}, onPress: function() {
  var me = this, element = me.element, pressedDelay = me.getPressedDelay(), pressedCls = me.getPressedCls();
  if (!me.getDisabled()) 
  {
    if (pressedDelay > 0) 
    {
      me.pressedTimeout = setTimeout(function() {
  delete me.pressedTimeout;
  if (element) 
  {
    element.addCls(pressedCls);
  }
}, pressedDelay);
    } else {
      element.addCls(pressedCls);
    }
  }
}, onRelease: function(e) {
  this.fireAction('release', [this, e], 'doRelease');
}, doRelease: function(me, e) {
  if (!me.getDisabled()) 
  {
    if (me.hasOwnProperty('pressedTimeout')) 
    {
      clearTimeout(me.pressedTimeout);
      delete me.pressedTimeout;
    } else {
      me.element.removeCls(me.getPressedCls());
    }
  }
}, onTap: function(e) {
  if (this.getDisabled()) 
  {
    return false;
  }
  this.fireAction('tap', [this, e], 'doTap');
}, doTap: function(me, e) {
  var handler = me.getHandler(), scope = me.getScope() || me;
  if (!handler) 
  {
    return;
  }
  if (typeof handler == 'string') 
  {
    handler = scope[handler];
  }
  if (e && e.preventDefault) 
  {
    e.preventDefault();
  }
  handler.apply(scope, arguments);
}}, function() {
});

Ext.define('Ext.Sheet', {extend: 'Ext.Panel', xtype: 'sheet', config: {baseCls: Ext.baseCSSPrefix + 'sheet', modal: true, centered: true, stretchX: null, stretchY: null, enter: 'bottom', exit: 'bottom', showAnimation: !Ext.browser.is.AndroidStock2 ? {type: 'slideIn', duration: 250, easing: 'ease-out'} : null, hideAnimation: !Ext.browser.is.AndroidStock2 ? {type: 'slideOut', duration: 250, easing: 'ease-in'} : null}, isInputRegex: /^(input|textarea|select|a)$/i, beforeInitialize: function() {
  var me = this;
  Ext.os.is.iOS && this.element.dom.addEventListener('touchstart', function(e) {
  if (!me.isInputRegex.test(e.target.tagName)) 
  {
    e.preventDefault();
  }
}, true);
}, platformConfig: [{theme: ['Windows'], enter: 'top', exit: 'top'}], applyHideAnimation: function(config) {
  var exit = this.getExit(), direction = exit;
  if (exit === null) 
  {
    return null;
  }
  if (config === true) 
  {
    config = {type: 'slideOut'};
  }
  if (Ext.isString(config)) 
  {
    config = {type: config};
  }
  var anim = Ext.factory(config, Ext.fx.Animation);
  if (anim) 
  {
    if (exit == 'bottom') 
    {
      direction = 'down';
    }
    if (exit == 'top') 
    {
      direction = 'up';
    }
    anim.setDirection(direction);
  }
  return anim;
}, applyShowAnimation: function(config) {
  var enter = this.getEnter(), direction = enter;
  if (enter === null) 
  {
    return null;
  }
  if (config === true) 
  {
    config = {type: 'slideIn'};
  }
  if (Ext.isString(config)) 
  {
    config = {type: config};
  }
  var anim = Ext.factory(config, Ext.fx.Animation);
  if (anim) 
  {
    if (enter == 'bottom') 
    {
      direction = 'down';
    }
    if (enter == 'top') 
    {
      direction = 'up';
    }
    anim.setBefore({display: null});
    anim.setReverse(true);
    anim.setDirection(direction);
  }
  return anim;
}, updateStretchX: function(newStretchX) {
  this.getLeft();
  this.getRight();
  if (newStretchX) 
  {
    this.setLeft(0);
    this.setRight(0);
  }
}, updateStretchY: function(newStretchY) {
  this.getTop();
  this.getBottom();
  if (newStretchY) 
  {
    this.setTop(0);
    this.setBottom(0);
  }
}});

Ext.define('Ext.data.Connection', {mixins: {observable: 'Ext.mixin.Observable'}, statics: {requestId: 0}, config: {url: null, async: true, method: null, username: '', password: '', disableCaching: true, disableCachingParam: '_dc', timeout: 30000, extraParams: null, defaultHeaders: null, useDefaultHeader: true, defaultPostHeader: 'application/x-www-form-urlencoded; charset=UTF-8', useDefaultXhrHeader: true, defaultXhrHeader: 'XMLHttpRequest', autoAbort: false}, textAreaRe: /textarea/i, multiPartRe: /multipart\/form-data/i, lineBreakRe: /\r\n/g, constructor: function(config) {
  this.initConfig(config);
  this.requests = {};
}, request: function(options) {
  options = options || {};
  var me = this, scope = options.scope || window, username = options.username || me.getUsername(), password = options.password || me.getPassword() || '', useXhr2 = options.xhr2 === true && Ext.feature.has.XHR2, async, requestOptions, request, headers, xhr;
  if (!Ext.isEmpty(username) && !Ext.isEmpty(password, true) && Ext.isEmpty(options.withCredentials)) 
  {
    options.withCredentials = true;
  }
  if (me.fireEvent('beforerequest', me, options) !== false) 
  {
    requestOptions = me.setOptions(options, scope);
    if (this.isFormUpload(options) === true) 
    {
      this.upload(options.form, requestOptions.url, requestOptions.data, options);
      return null;
    }
    if (options.autoAbort === true || me.getAutoAbort()) 
    {
      me.abort();
    }
    xhr = this.getXhrInstance();
    async = options.async !== false ? (options.async || me.getAsync()) : false;
    if (username) 
    {
      xhr.open(requestOptions.method, requestOptions.url, async, username, password);
    } else {
      xhr.open(requestOptions.method, requestOptions.url, async);
    }
    headers = me.setupHeaders(xhr, options, requestOptions.data, requestOptions.params);
    request = {id: ++Ext.data.Connection.requestId, xhr: xhr, headers: headers, options: options, async: async, timeout: setTimeout(function() {
  request.timedout = true;
  me.abort(request);
}, options.timeout || me.getTimeout())};
    me.requests[request.id] = request;
    if (async) 
    {
      xhr[useXhr2 ? 'onload' : 'onreadystatechange'] = Ext.Function.bind(me.onStateChange, me, [request]);
    }
    if (useXhr2) 
    {
      xhr.onerror = Ext.Function.bind(me.onStateChange, me, [request]);
    }
    if (options.progress) 
    {
      xhr.onprogress = function(e) {
  if (options.progress.isProgressable) 
  {
    if (e.total === 0 && options.progress.getDynamic()) 
    {
      Ext.Logger.warn("Server is not configured to properly return Content-Length. Dynamic progress will be disabled");
      options.progress.setState.call(options.progress, "download");
      options.progress.setDynamic(false);
      xhr.onprogress = null;
      return;
    }
    Ext.callback(options.progress.updateProgress, options.progress, [(e.loaded / e.total), "download"]);
    if (e.total > 0 && !options.progress.getDynamic() && options.progress.getInitialConfig().dynamic) 
    {
      options.progress.setDynamic(true);
    }
  } else if (Ext.isFunction(options.progress)) 
  {
    Ext.callback(options.progress, options.progressScope || request, [e, "download"]);
  }
};
      if (Ext.feature.has.XHRUploadProgress) 
      {
        xhr.upload.onprogress = function(e) {
  me.fireEvent('requestuploadprogress', me, request, e);
  if (options.progress.isProgressable) 
  {
    Ext.callback(options.progress.updateProgress, options.progress, [(e.loaded / e.total), "upload"]);
  } else if (Ext.isFunction(options.progress)) 
  {
    Ext.callback(options.progress, options.progressScope || request, [e, "upload"]);
  }
};
      }
      if (options.progress.isProgressable) 
      {
        if (!Ext.feature.has.XHRUploadProgress) 
        options.progress.setDynamic(false);
        Ext.callback(options.progress.startProgress, options.progress);
      }
    }
    xhr.send(requestOptions.data);
    if (!async) 
    {
      return this.onComplete(request);
    }
    return request;
  } else {
    Ext.callback(options.callback, options.scope, [options, undefined, undefined]);
    return null;
  }
}, upload: function(form, url, params, options) {
  form = Ext.getDom(form);
  options = options || {};
  var id = Ext.id(), me = this, frame = document.createElement('iframe'), hiddens = [], encoding = 'multipart/form-data', buf = {target: form.target, method: form.method, encoding: form.encoding, enctype: form.enctype, action: form.action}, addField = function(name, value) {
  hiddenItem = document.createElement('input');
  Ext.fly(hiddenItem).set({type: 'hidden', value: value, name: name});
  form.appendChild(hiddenItem);
  hiddens.push(hiddenItem);
}, hiddenItem;
  Ext.fly(frame).set({id: id, name: id, cls: Ext.baseCSSPrefix + 'hide-display', src: Ext.SSL_SECURE_URL});
  document.body.appendChild(frame);
  if (document.frames) 
  {
    document.frames[id].name = id;
  }
  Ext.fly(form).set({target: id, method: 'POST', enctype: encoding, encoding: encoding, action: url || buf.action});
  if (params) 
  {
    Ext.iterate(Ext.Object.fromQueryString(params), function(name, value) {
  if (Ext.isArray(value)) 
  {
    Ext.each(value, function(v) {
  addField(name, v);
});
  } else {
    addField(name, value);
  }
});
  }
  frame.addEventListener('load', function() {
  Ext.callback(me.onUploadComplete, me, [frame, options, id]);
  frame.removeEventListener('load', arguments.callee);
});
  form.submit();
  Ext.fly(form).set(buf);
  Ext.each(hiddens, function(h) {
  Ext.removeNode(h);
});
}, onUploadComplete: function(frame, options, id) {
  var response = {responseText: '', responseXML: null, request: {options: options}}, doc, body, firstChild;
  try {
    doc = (frame.contentWindow && frame.contentWindow.document) || frame.contentDocument || window.frames[id].document;
    if (doc) 
    {
      if (doc.hasOwnProperty('body') && doc.body) 
      {
        body = doc.body;
      }
      if (body) 
      {
        firstChild = body.firstChild || {};
        if (this.textAreaRe.test(firstChild.tagName)) 
        {
          response.responseText = firstChild.value;
        } else {
          response.responseText = firstChild.innerHTML;
        }
        response.responseXML = body.XMLDocument;
      }
    }
  }  catch (e) {
  response.success = false;
  response.message = 'Cross-Domain access is not permitted between frames. XHR2 is recommended for this type of request.';
  response.error = e;
}
  this.onAfterUploadComplete(response, frame, options);
}, onAfterUploadComplete: function(response, frame, options) {
  var me = this;
  me.fireEvent('requestcomplete', me, response, options);
  Ext.callback(options.callback, options.scope, [options, true, response]);
  setTimeout(function() {
  Ext.removeNode(frame);
}, 100);
}, isFormUpload: function(options) {
  var form = this.getForm(options);
  if (form) 
  {
    return (options.isUpload || (this.multiPartRe).test(form.getAttribute('enctype')));
  }
  return false;
}, getForm: function(options) {
  return Ext.getDom(options.form) || null;
}, setOptions: function(options, scope) {
  var me = this, params = options.params || {}, extraParams = me.getExtraParams(), urlParams = options.urlParams, url = options.url || me.getUrl(), jsonData = options.jsonData, method, disableCache, data;
  if (Ext.isFunction(params)) 
  {
    params = params.call(scope, options);
  }
  if (Ext.isFunction(url)) 
  {
    url = url.call(scope, options);
  }
  url = this.setupUrl(options, url);
  data = options.data || options.rawData || options.binaryData || options.xmlData || jsonData || null;
  if (jsonData && !Ext.isPrimitive(jsonData)) 
  {
    data = Ext.encode(data);
  }
  if (options.binaryData) 
  {
    if (data instanceof Array) 
    {
      data = (new Uint8Array(options.binaryData));
    }
    if (data instanceof Uint8Array) 
    {
      data = data.buffer;
    }
  }
  if (Ext.isObject(params)) 
  {
    params = Ext.Object.toQueryString(params);
  }
  if (Ext.isObject(extraParams)) 
  {
    extraParams = Ext.Object.toQueryString(extraParams);
  }
  params = params + ((extraParams) ? ((params) ? '&' : '') + extraParams : '');
  urlParams = Ext.isObject(urlParams) ? Ext.Object.toQueryString(urlParams) : urlParams;
  params = this.setupParams(options, params);
  method = (options.method || me.getMethod() || ((params || data) ? 'POST' : 'GET')).toUpperCase();
  this.setupMethod(options, method);
  disableCache = options.disableCaching !== false ? (options.disableCaching || me.getDisableCaching()) : false;
  if (disableCache) 
  {
    url = Ext.urlAppend(url, (options.disableCachingParam || me.getDisableCachingParam()) + '=' + (new Date().getTime()));
  }
  if ((method == 'GET' || data) && params) 
  {
    url = Ext.urlAppend(url, params);
    params = null;
  }
  if (urlParams) 
  {
    url = Ext.urlAppend(url, urlParams);
  }
  return {url: url, method: method, data: data || params || null};
}, setupUrl: function(options, url) {
  var form = this.getForm(options);
  if (form) 
  {
    url = url || form.action;
  }
  return url;
}, setupParams: function(options, params) {
  var form = this.getForm(options), serializedForm;
  if (form && !this.isFormUpload(options)) 
  {
    serializedForm = Ext.Element.serializeForm(form);
    params = params ? (params + '&' + serializedForm) : serializedForm;
  }
  return params;
}, setupMethod: function(options, method) {
  if (this.isFormUpload(options)) 
  {
    return 'POST';
  }
  return method;
}, setupHeaders: function(xhr, options, data, params) {
  var me = this, headers = Ext.apply({}, options.headers || {}, me.getDefaultHeaders() || {}), contentType = me.getDefaultPostHeader(), jsonData = options.jsonData, xmlData = options.xmlData, key, header;
  if (!headers['Content-Type'] && (data || params)) 
  {
    if (data) 
    {
      if (options.rawData) 
      {
        contentType = 'text/plain';
      } else {
        if (xmlData && Ext.isDefined(xmlData)) 
        {
          contentType = 'text/xml';
        } else if (jsonData && Ext.isDefined(jsonData)) 
        {
          contentType = 'application/json';
        }
      }
    }
    if (!(Ext.feature.has.XHR2 && data instanceof FormData)) 
    {
      headers['Content-Type'] = contentType;
    }
  }
  if (((me.getUseDefaultXhrHeader() && options.useDefaultXhrHeader !== false) || options.useDefaultXhrHeader) && !headers['X-Requested-With']) 
  {
    headers['X-Requested-With'] = me.getDefaultXhrHeader();
  }
  if (!Ext.isEmpty(options.username) && !Ext.isEmpty(options.password)) 
  {
    headers['Authorization'] = "Basic " + btoa(options.username + ":" + options.password);
  }
  try {
    for (key in headers) 
      {
        if (headers.hasOwnProperty(key)) 
        {
          header = headers[key];
          xhr.setRequestHeader(key, header);
        }
      }
  }  catch (e) {
  me.fireEvent('exception', key, header);
}
  if (options.responseType) 
  {
    try {
      xhr.responseType = options.responseType === "blob" && Ext.browser.is.Safari ? "arraybuffer" : options.responseType;
    }    catch (e) {
}
  }
  if (options.withCredentials) 
  {
    xhr.withCredentials = options.withCredentials;
  }
  return headers;
}, getXhrInstance: (function() {
  var options = [function() {
  return new XMLHttpRequest();
}, function() {
  return new ActiveXObject('MSXML2.XMLHTTP.3.0');
}, function() {
  return new ActiveXObject('MSXML2.XMLHTTP');
}, function() {
  return new ActiveXObject('Microsoft.XMLHTTP');
}], i = 0, len = options.length, xhr;
  for (; i < len; ++i) 
    {
      try {
        xhr = options[i];
        xhr();
        break;
      }      catch (e) {
}
    }
  return xhr;
})(), isLoading: function(request) {
  if (!(request && request.xhr)) 
  {
    return false;
  }
  var state = request.xhr.readyState;
  return !(state === 0 || state == 4);
}, abort: function(request) {
  var me = this, requests = me.requests, id;
  if (request && me.isLoading(request)) 
  {
    request.xhr.onreadystatechange = null;
    request.xhr.abort();
    me.clearTimeout(request);
    if (!request.timedout) 
    {
      request.aborted = true;
    }
    me.onComplete(request);
    me.cleanup(request);
  } else if (!request) 
  {
    for (id in requests) 
      {
        if (requests.hasOwnProperty(id)) 
        {
          me.abort(requests[id]);
        }
      }
  }
}, abortAll: function() {
  this.abort();
}, onStateChange: function(request) {
  if (request.xhr.readyState == 4) 
  {
    this.clearTimeout(request);
    this.onComplete(request);
    this.cleanup(request);
  }
}, clearTimeout: function(request) {
  clearTimeout(request.timeout);
  delete request.timeout;
}, cleanup: function(request) {
  request.xhr = null;
  delete request.xhr;
}, onComplete: function(request) {
  var me = this, options = request.options, result, success, response;
  try {
    result = me.parseStatus(request.xhr.status, request.xhr);
    if (request.timedout) 
    {
      result.success = false;
    }
  }  catch (e) {
  result = {success: false, isException: false};
}
  success = result.success;
  if (success) 
  {
    response = me.createResponse(request);
    me.fireEvent('requestcomplete', me, response, options);
    Ext.callback(options.success, options.scope, [response, options]);
  } else {
    if (result.isException || request.aborted || request.timedout) 
    {
      response = me.createException(request);
    } else {
      response = me.createResponse(request);
    }
    me.fireEvent('requestexception', me, response, options);
    Ext.callback(options.failure, options.scope, [response, options]);
  }
  Ext.callback(options.callback, options.scope, [options, success, response]);
  if (options.progress && options.progress.isProgressable) 
  {
    Ext.callback(options.progress.endProgress, options.progress, [result]);
  }
  delete me.requests[request.id];
  return response;
}, parseStatus: function(status, xhr) {
  status = status == 1223 ? 204 : status;
  var success = (status >= 200 && status < 300) || status == 304 || (status == 0 && xhr.responseText && xhr.responseText.length > 0), isException = false;
  if (!success) 
  {
    switch (status) {
      case 12002:
      case 12029:
      case 12030:
      case 12031:
      case 12152:
      case 13030:
        isException = true;
        break;
    }
  }
  return {success: success, isException: isException};
}, createResponse: function(request) {
  var xhr = request.xhr, headers = {}, lines, count, line, index, key, response, binaryResponse = xhr.responseType === "blob" || xhr.responseType === "arraybuffer", textResponse = xhr.responseType === "text", documentResponse = xhr.responseType === "document";
  if (request.timedout || request.aborted) 
  {
    request.success = false;
    lines = [];
  } else {
    lines = xhr.getAllResponseHeaders().replace(this.lineBreakRe, '\n').split('\n');
  }
  count = lines.length;
  while (count--) 
    {
      line = lines[count];
      index = line.indexOf(':');
      if (index >= 0) 
      {
        key = line.substr(0, index).toLowerCase();
        if (line.charAt(index + 1) == ' ') 
        {
          ++index;
        }
        headers[key] = line.substr(index + 1);
      }
    }
  request.xhr = null;
  delete request.xhr;
  response = {request: request, requestId: request.id, status: xhr.status, statusText: xhr.statusText, getResponseHeader: function(header) {
  return headers[header.toLowerCase()];
}, getAllResponseHeaders: function() {
  return headers;
}, responseText: binaryResponse ? null : documentResponse ? null : xhr.responseText, responseXML: binaryResponse ? null : textResponse ? null : xhr.responseXML, responseBytes: binaryResponse ? xhr.response : null};
  if (request.options.responseType === "blob" && xhr.responseType === "arraybuffer") 
  {
    response.responseBytes = new Blob([response.responseBytes], {type: xhr.getResponseHeader("Content-Type")});
  }
  xhr = null;
  return response;
}, createException: function(request) {
  return {request: request, requestId: request.id, status: request.aborted ? -1 : 0, statusText: request.aborted ? 'transaction aborted' : 'communication failure', aborted: request.aborted, timedout: request.timedout};
}});

Ext.define('Ext.Ajax', {extend: 'Ext.data.Connection', singleton: true, autoAbort: false});

Ext.define('Ext.Media', {extend: 'Ext.Component', xtype: 'media', config: {url: '', enableControls: Ext.os.is.Android ? false : true, autoResume: false, autoPause: true, preload: true, loop: false, media: null, volume: 1, muted: false}, constructor: function() {
  this.mediaEvents = {};
  this.callSuper(arguments);
}, initialize: function() {
  var me = this;
  me.callParent();
  me.on({scope: me, activate: me.onActivate, deactivate: me.onDeactivate});
  me.addMediaListener({canplay: 'onCanPlay', play: 'onPlay', pause: 'onPause', ended: 'onEnd', volumechange: 'onVolumeChange', timeupdate: 'onTimeUpdate'});
}, addMediaListener: function(event, fn) {
  var me = this, dom = me.media.dom, bind = Ext.Function.bind;
  Ext.Object.each(event, function(e, fn) {
  fn = bind(me[fn], me);
  me.mediaEvents[e] = fn;
  dom.addEventListener(e, fn);
});
}, onPlay: function() {
  this.fireEvent('play', this);
}, onCanPlay: function() {
  this.fireEvent('canplay', this);
}, onPause: function() {
  this.fireEvent('pause', this, this.getCurrentTime());
}, onEnd: function() {
  this.fireEvent('ended', this, this.getCurrentTime());
}, onVolumeChange: function() {
  this.fireEvent('volumechange', this, this.media.dom.volume);
}, onTimeUpdate: function() {
  this.fireEvent('timeupdate', this, this.getCurrentTime());
}, isPlaying: function() {
  return !Boolean(this.media.dom.paused);
}, onActivate: function() {
  var me = this;
  if (me.getAutoResume() && !me.isPlaying()) 
  {
    me.play();
  }
}, onDeactivate: function() {
  var me = this;
  if (me.getAutoPause() && me.isPlaying()) 
  {
    me.pause();
  }
}, updateUrl: function(newUrl) {
  var dom = this.media.dom;
  dom.src = newUrl;
  if ('load' in dom) 
  {
    dom.load();
  }
  if (this.isPlaying()) 
  {
    this.play();
  }
}, updateEnableControls: function(enableControls) {
  this.media.dom.controls = enableControls ? 'controls' : false;
}, updateLoop: function(loop) {
  this.media.dom.loop = loop ? 'loop' : false;
}, play: function() {
  var dom = this.media.dom;
  if ('play' in dom) 
  {
    dom.play();
    setTimeout(function() {
  dom.play();
}, 10);
  }
}, pause: function() {
  var dom = this.media.dom;
  if ('pause' in dom) 
  {
    dom.pause();
  }
}, toggle: function() {
  if (this.isPlaying()) 
  {
    this.pause();
  } else {
    this.play();
  }
}, stop: function() {
  var me = this;
  me.setCurrentTime(0);
  me.fireEvent('stop', me);
  me.pause();
}, updateVolume: function(volume) {
  this.media.dom.volume = volume;
}, updateMuted: function(muted) {
  this.fireEvent('mutedchange', this, muted);
  this.media.dom.muted = muted;
}, getCurrentTime: function() {
  return this.media.dom.currentTime;
}, setCurrentTime: function(time) {
  this.media.dom.currentTime = time;
  return time;
}, getDuration: function() {
  return this.media.dom.duration;
}, destroy: function() {
  var me = this, dom = me.media.dom, mediaEvents = me.mediaEvents;
  Ext.Object.each(mediaEvents, function(event, fn) {
  dom.removeEventListener(event, fn);
});
  this.callSuper();
}});

Ext.define('Ext.Audio', {extend: 'Ext.Media', xtype: 'audio', config: {cls: Ext.baseCSSPrefix + 'audio'}, onActivate: function() {
  var me = this;
  me.callParent();
  if (Ext.os.is.Phone) 
  {
    me.element.show();
  }
}, onDeactivate: function() {
  var me = this;
  me.callParent();
  if (Ext.os.is.Phone) 
  {
    me.element.hide();
  }
}, template: [{reference: 'media', preload: 'auto', tag: 'audio', cls: Ext.baseCSSPrefix + 'component'}]});

Ext.define('Ext.ComponentQuery', {singleton: true}, function() {
  var cq = this, filterFnPattern = ['var r = [],', 'i = 0,', 'it = items,', 'l = it.length,', 'c;', 'for (; i < l; i++) {', 'c = it[i];', 'if (c.{0}) {', 'r.push(c);', '}', '}', 'return r;'].join(''), filterItems = function(items, operation) {
  return operation.method.apply(this, [items].concat(operation.args));
}, getItems = function(items, mode) {
  var result = [], i = 0, length = items.length, candidate, deep = mode !== '>';
  for (; i < length; i++) 
    {
      candidate = items[i];
      if (candidate.getRefItems) 
      {
        result = result.concat(candidate.getRefItems(deep));
      }
    }
  return result;
}, getAncestors = function(items) {
  var result = [], i = 0, length = items.length, candidate;
  for (; i < length; i++) 
    {
      candidate = items[i];
      while (!!(candidate = (candidate.ownerCt || candidate.floatParent))) 
        {
          result.push(candidate);
        }
    }
  return result;
}, filterByXType = function(items, xtype, shallow) {
  if (xtype === '*') 
  {
    return items.slice();
  } else {
    var result = [], i = 0, length = items.length, candidate;
    for (; i < length; i++) 
      {
        candidate = items[i];
        if (candidate.isXType(xtype, shallow)) 
        {
          result.push(candidate);
        }
      }
    return result;
  }
}, filterByClassName = function(items, className) {
  var EA = Ext.Array, result = [], i = 0, length = items.length, candidate;
  for (; i < length; i++) 
    {
      candidate = items[i];
      if (candidate.el ? candidate.el.hasCls(className) : EA.contains(candidate.initCls(), className)) 
      {
        result.push(candidate);
      }
    }
  return result;
}, filterByAttribute = function(items, property, operator, value) {
  var result = [], i = 0, length = items.length, candidate, getter, getValue;
  for (; i < length; i++) 
    {
      candidate = items[i];
      getter = Ext.Class.getConfigNameMap(property).get;
      if (candidate[getter]) 
      {
        getValue = candidate[getter]();
        if (!value ? !!getValue : (String(getValue) === value)) 
        {
          result.push(candidate);
        }
      } else if (candidate.config && candidate.config[property]) 
      {
        if (!value ? !!candidate.config[property] : (String(candidate.config[property]) === value)) 
        {
          result.push(candidate);
        }
      } else if (!value ? !!candidate[property] : (String(candidate[property]) === value)) 
      {
        result.push(candidate);
      }
    }
  return result;
}, filterById = function(items, id) {
  var result = [], i = 0, length = items.length, candidate;
  for (; i < length; i++) 
    {
      candidate = items[i];
      if (candidate.getId() === id || candidate.getItemId() === id) 
      {
        result.push(candidate);
      }
    }
  return result;
}, filterByPseudo = function(items, name, value) {
  return cq.pseudos[name](items, value);
}, modeRe = /^(\s?([>\^])\s?|\s|$)/, tokenRe = /^(#)?([\w\-]+|\*)(?:\((true|false)\))?/, matchers = [{re: /^\.([\w\-]+)(?:\((true|false)\))?/, method: filterByXType}, {re: /^(?:[\[](?:@)?([\w\-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]])/, method: filterByAttribute}, {re: /^#([\w\-]+)/, method: filterById}, {re: /^\:([\w\-]+)(?:\(((?:\{[^\}]+\})|(?:(?!\{)[^\s>\/]*?(?!\})))\))?/, method: filterByPseudo}, {re: /^(?:\{([^\}]+)\})/, method: filterFnPattern}];
  cq.Query = Ext.extend(Object, {constructor: function(cfg) {
  cfg = cfg || {};
  Ext.apply(this, cfg);
}, execute: function(root) {
  var operations = this.operations, i = 0, length = operations.length, operation, workingItems;
  if (!root) 
  {
    workingItems = Ext.ComponentManager.all.getArray();
  } else if (Ext.isArray(root)) 
  {
    workingItems = root;
  }
  for (; i < length; i++) 
    {
      operation = operations[i];
      if (operation.mode === '^') 
      {
        workingItems = getAncestors(workingItems || [root]);
      } else if (operation.mode) 
      {
        workingItems = getItems(workingItems || [root], operation.mode);
      } else {
        workingItems = filterItems(workingItems || getItems([root]), operation);
      }
      if (i === length - 1) 
      {
        return workingItems;
      }
    }
  return [];
}, is: function(component) {
  var operations = this.operations, components = Ext.isArray(component) ? component : [component], originalLength = components.length, lastOperation = operations[operations.length - 1], ln, i;
  components = filterItems(components, lastOperation);
  if (components.length === originalLength) 
  {
    if (operations.length > 1) 
    {
      for (i = 0 , ln = components.length; i < ln; i++) 
        {
          if (Ext.Array.indexOf(this.execute(), components[i]) === -1) 
          {
            return false;
          }
        }
    }
    return true;
  }
  return false;
}});
  Ext.apply(this, {cache: {}, pseudos: {not: function(components, selector) {
  var CQ = Ext.ComponentQuery, i = 0, length = components.length, results = [], index = -1, component;
  for (; i < length; ++i) 
    {
      component = components[i];
      if (!CQ.is(component, selector)) 
      {
        results[++index] = component;
      }
    }
  return results;
}}, query: function(selector, root) {
  var selectors = selector.split(','), length = selectors.length, i = 0, results = [], noDupResults = [], dupMatcher = {}, query, resultsLn, cmp;
  for (; i < length; i++) 
    {
      selector = Ext.String.trim(selectors[i]);
      query = this.parse(selector);
      results = results.concat(query.execute(root));
    }
  if (length > 1) 
  {
    resultsLn = results.length;
    for (i = 0; i < resultsLn; i++) 
      {
        cmp = results[i];
        if (!dupMatcher[cmp.id]) 
        {
          noDupResults.push(cmp);
          dupMatcher[cmp.id] = true;
        }
      }
    results = noDupResults;
  }
  return results;
}, is: function(component, selector) {
  if (!selector) 
  {
    return true;
  }
  var query = this.cache[selector];
  if (!query) 
  {
    this.cache[selector] = query = this.parse(selector);
  }
  return query.is(component);
}, parse: function(selector) {
  var operations = [], length = matchers.length, lastSelector, tokenMatch, matchedChar, modeMatch, selectorMatch, i, matcher, method;
  while (selector && lastSelector !== selector) 
    {
      lastSelector = selector;
      tokenMatch = selector.match(tokenRe);
      if (tokenMatch) 
      {
        matchedChar = tokenMatch[1];
        if (matchedChar === '#') 
        {
          operations.push({method: filterById, args: [Ext.String.trim(tokenMatch[2])]});
        } else if (matchedChar === '.') 
        {
          operations.push({method: filterByClassName, args: [Ext.String.trim(tokenMatch[2])]});
        } else {
          operations.push({method: filterByXType, args: [Ext.String.trim(tokenMatch[2]), Boolean(tokenMatch[3])]});
        }
        selector = selector.replace(tokenMatch[0], '');
      }
      while (!(modeMatch = selector.match(modeRe))) 
        {
          for (i = 0; selector && i < length; i++) 
            {
              matcher = matchers[i];
              selectorMatch = selector.match(matcher.re);
              method = matcher.method;
              if (selectorMatch) 
              {
                operations.push({method: Ext.isString(matcher.method) ? Ext.functionFactory('items', Ext.String.format.apply(Ext.String, [method].concat(selectorMatch.slice(1)))) : matcher.method, args: selectorMatch.slice(1)});
                selector = selector.replace(selectorMatch[0], '');
                break;
              }
            }
        }
      if (modeMatch[1]) 
      {
        operations.push({mode: modeMatch[2] || modeMatch[1]});
        selector = selector.replace(modeMatch[0], '');
      }
    }
  return new cq.Query({operations: operations});
}});
});

Ext.define('Ext.Decorator', {extend: 'Ext.Component', isDecorator: true, config: {component: {}}, statics: {generateProxySetter: function(name) {
  return function(value) {
  var component = this.getComponent();
  component[name].call(component, value);
  return this;
};
}, generateProxyGetter: function(name) {
  return function() {
  var component = this.getComponent();
  return component[name].call(component);
};
}}, onClassExtended: function(Class, members) {
  if (!members.hasOwnProperty('proxyConfig')) 
  {
    return;
  }
  var ExtClass = Ext.Class, proxyConfig = members.proxyConfig, config = members.config;
  members.config = (config) ? Ext.applyIf(config, proxyConfig) : proxyConfig;
  var name, nameMap, setName, getName;
  for (name in proxyConfig) 
    {
      if (proxyConfig.hasOwnProperty(name)) 
      {
        nameMap = ExtClass.getConfigNameMap(name);
        setName = nameMap.set;
        getName = nameMap.get;
        members[setName] = this.generateProxySetter(setName);
        members[getName] = this.generateProxyGetter(getName);
      }
    }
}, applyComponent: function(config) {
  return Ext.factory(config, Ext.Component);
}, updateComponent: function(newComponent, oldComponent) {
  if (oldComponent) 
  {
    if (this.isRendered() && oldComponent.setRendered(false)) 
    {
      oldComponent.fireAction('renderedchange', [this, oldComponent, false], 'doUnsetComponent', this, {args: [oldComponent]});
    } else {
      this.doUnsetComponent(oldComponent);
    }
  }
  if (newComponent) 
  {
    if (this.isRendered() && newComponent.setRendered(true)) 
    {
      newComponent.fireAction('renderedchange', [this, newComponent, true], 'doSetComponent', this, {args: [newComponent]});
    } else {
      this.doSetComponent(newComponent);
    }
  }
}, doUnsetComponent: function(component) {
  if (component.renderElement.dom) 
  {
    component.setLayoutSizeFlags(0);
    this.innerElement.dom.removeChild(component.renderElement.dom);
  }
}, doSetComponent: function(component) {
  if (component.renderElement.dom) 
  {
    component.setLayoutSizeFlags(this.getSizeFlags());
    this.innerElement.dom.appendChild(component.renderElement.dom);
  }
}, setRendered: function(rendered) {
  var component;
  if (this.callParent(arguments)) 
  {
    component = this.getComponent();
    if (component) 
    {
      component.setRendered(rendered);
    }
    return true;
  }
  return false;
}, setDisabled: function(disabled) {
  this.callParent(arguments);
  this.getComponent().setDisabled(disabled);
}, destroy: function() {
  Ext.destroy(this.getComponent());
  this.callParent();
}});

Ext.define('Ext.Img', {extend: 'Ext.Component', xtype: ['image', 'img'], config: {src: null, baseCls: Ext.baseCSSPrefix + 'img', imageCls: Ext.baseCSSPrefix + 'img-image', backgroundCls: Ext.baseCSSPrefix + 'img-background', mode: 'background'}, beforeInitialize: function() {
  var me = this;
  me.onLoad = Ext.Function.bind(me.onLoad, me);
  me.onError = Ext.Function.bind(me.onError, me);
}, initialize: function() {
  var me = this;
  me.callParent();
  me.relayEvents(me.renderElement, '*');
  me.element.on({tap: 'onTap', scope: me});
}, hide: function() {
  this.callParent(arguments);
  this.hiddenSrc = this.hiddenSrc || this.getSrc();
  this.setSrc(null);
}, show: function() {
  this.callParent(arguments);
  if (this.hiddenSrc) 
  {
    this.setSrc(this.hiddenSrc);
    delete this.hiddenSrc;
  }
}, updateMode: function(mode) {
  var me = this, imageCls = me.getImageCls(), backgroundCls = me.getBackgroundCls();
  if (mode === 'background') 
  {
    if (me.imageElement) 
    {
      me.imageElement.destroy();
      delete me.imageElement;
      me.updateSrc(me.getSrc());
    }
    me.replaceCls(imageCls, backgroundCls);
  } else {
    me.imageElement = me.element.createChild({tag: 'img'});
    me.replaceCls(backgroundCls, imageCls);
  }
}, updateImageCls: function(newCls, oldCls) {
  this.replaceCls(oldCls, newCls);
}, updateBackgroundCls: function(newCls, oldCls) {
  this.replaceCls(oldCls, newCls);
}, onTap: function(e) {
  this.fireEvent('tap', this, e);
}, onAfterRender: function() {
  this.updateSrc(this.getSrc());
}, updateSrc: function(newSrc) {
  var me = this, dom;
  if (me.getMode() === 'background') 
  {
    dom = this.imageObject || new Image();
  } else {
    dom = me.imageElement.dom;
  }
  this.imageObject = dom;
  dom.setAttribute('src', Ext.isString(newSrc) ? newSrc : '');
  dom.addEventListener('load', me.onLoad, false);
  dom.addEventListener('error', me.onError, false);
}, detachListeners: function() {
  var dom = this.imageObject;
  if (dom) 
  {
    dom.removeEventListener('load', this.onLoad, false);
    dom.removeEventListener('error', this.onError, false);
  }
}, onLoad: function(e) {
  this.detachListeners();
  if (this.getMode() === 'background') 
  {
    this.element.dom.style.backgroundImage = 'url("' + this.imageObject.src + '")';
  }
  this.fireEvent('load', this, e);
}, onError: function(e) {
  this.detachListeners();
  if (this.getMode() === 'background') 
  {
    this.element.dom.style.backgroundImage = 'url("' + this.imageObject.src + '")';
  }
  this.fireEvent('error', this, e);
}, doSetWidth: function(width) {
  var sizingElement = (this.getMode() === 'background') ? this.element : this.imageElement;
  sizingElement.setWidth(width);
  this.callParent(arguments);
}, doSetHeight: function(height) {
  var sizingElement = (this.getMode() === 'background') ? this.element : this.imageElement;
  sizingElement.setHeight(height);
  this.callParent(arguments);
}, destroy: function() {
  this.detachListeners();
  Ext.destroy(this.imageObject, this.imageElement);
  delete this.imageObject;
  delete this.imageElement;
  this.callParent();
}});

Ext.define('Ext.LoadMask', {extend: 'Ext.Mask', xtype: 'loadmask', config: {message: 'Loading...', cls: Ext.baseCSSPrefix + 'loading-mask', messageCls: Ext.baseCSSPrefix + 'mask-message', indicator: true}, getTemplate: function() {
  var prefix = Ext.baseCSSPrefix;
  return [{reference: 'innerElement', cls: prefix + 'mask-inner', children: [{reference: 'indicatorElement', cls: prefix + 'loading-spinner-outer', children: [{cls: prefix + 'loading-spinner', children: [{tag: 'span', cls: prefix + 'loading-top'}, {tag: 'span', cls: prefix + 'loading-right'}, {tag: 'span', cls: prefix + 'loading-bottom'}, {tag: 'span', cls: prefix + 'loading-left'}]}]}, {reference: 'messageElement'}]}];
}, updateMessage: function(newMessage) {
  var cls = Ext.baseCSSPrefix + 'has-message';
  if (newMessage) 
  {
    this.addCls(cls);
  } else {
    this.removeCls(cls);
  }
  this.messageElement.setHtml(newMessage);
}, updateMessageCls: function(newMessageCls, oldMessageCls) {
  this.messageElement.replaceCls(oldMessageCls, newMessageCls);
}, updateIndicator: function(newIndicator) {
  this[newIndicator ? 'removeCls' : 'addCls'](Ext.baseCSSPrefix + 'indicator-hidden');
}}, function() {
});

Ext.define('Ext.Menu', {extend: 'Ext.Sheet', xtype: 'menu', config: {baseCls: Ext.baseCSSPrefix + 'menu', left: 0, right: 0, bottom: 0, height: 'auto', width: 'auto', defaultType: 'button', showAnimation: null, hideAnimation: null, centered: false, modal: true, hidden: true, hideOnMaskTap: true, translatable: {translationMethod: null}}, constructor: function() {
  this.config.translatable.translationMethod = Ext.browser.is.AndroidStock2 ? 'cssposition' : 'csstransform';
  this.callParent(arguments);
}, platformConfig: [{theme: ['Windows']}, {theme: ['Blackberry'], ui: 'context', layout: {pack: 'center'}}], updateUi: function(newUi, oldUi) {
  this.callParent(arguments);
  if (newUi != oldUi && Ext.theme.is.Blackberry) 
  {
    if (newUi == 'context') 
    {
      this.innerElement.swapCls('x-vertical', 'x-horizontal');
    } else if (newUi == 'application') 
    {
      this.innerElement.swapCls('x-horizontal', 'x-vertical');
    }
  }
}, updateHideOnMaskTap: function(hide) {
  var mask = this.getModal();
  if (mask) 
  {
    mask[hide ? 'on' : 'un'].call(mask, 'tap', function() {
  Ext.Viewport.hideMenu(this.$side);
}, this);
  }
}, doSetHidden: function() {
  if (this.initialized) 
  {
    this.callParent(arguments);
  }
}});

Ext.define('Ext.Title', {extend: 'Ext.Component', xtype: 'title', config: {baseCls: 'x-title', title: ''}, updateTitle: function(newTitle) {
  this.setHtml(newTitle);
}});

Ext.define('Ext.Spacer', {extend: 'Ext.Component', alias: 'widget.spacer', config: {}, constructor: function(config) {
  config = config || {};
  if (!config.width) 
  {
    config.flex = 1;
  }
  this.callParent([config]);
}});

Ext.define('Ext.Toolbar', {extend: 'Ext.Container', xtype: 'toolbar', isToolbar: true, config: {baseCls: Ext.baseCSSPrefix + 'toolbar', ui: 'dark', title: null, defaultType: 'button', minHeight: null, layout: {type: 'hbox', align: 'center'}}, hasCSSMinHeight: true, constructor: function(config) {
  config = config || {};
  if (config.docked == "left" || config.docked == "right") 
  {
    config.layout = {type: 'vbox', align: 'stretch'};
  }
  this.callParent([config]);
}, applyTitle: function(title) {
  if (typeof title == 'string') 
  {
    title = {title: title, centered: Ext.theme.is.Tizen ? false : true};
  }
  return Ext.factory(title, Ext.Title, this.getTitle());
}, updateTitle: function(newTitle, oldTitle) {
  if (newTitle) 
  {
    this.add(newTitle);
  }
  if (oldTitle) 
  {
    oldTitle.destroy();
  }
}, showTitle: function() {
  var title = this.getTitle();
  if (title) 
  {
    title.show();
  }
}, hideTitle: function() {
  var title = this.getTitle();
  if (title) 
  {
    title.hide();
  }
}}, function() {
});

Ext.define('Ext.field.Input', {extend: 'Ext.Component', xtype: 'input', tag: 'input', cachedConfig: {cls: Ext.baseCSSPrefix + 'form-field', focusCls: Ext.baseCSSPrefix + 'field-focus', maskCls: Ext.baseCSSPrefix + 'field-mask', useMask: 'auto', type: 'text', checked: false}, config: {baseCls: Ext.baseCSSPrefix + 'field-input', name: null, value: null, isFocused: false, tabIndex: null, placeHolder: null, minValue: null, maxValue: null, stepValue: null, maxLength: null, autoComplete: null, autoCapitalize: null, autoCorrect: null, readOnly: null, maxRows: null, pattern: null, startValue: false, fastFocus: true}, getTemplate: function() {
  var items = [{reference: 'input', tag: this.tag}, {reference: 'mask', classList: [this.config.maskCls]}, {reference: 'clearIcon', cls: 'x-clear-icon'}];
  return items;
}, initElement: function() {
  var me = this;
  me.callParent();
  me.input.on({scope: me, keyup: 'onKeyUp', keydown: 'onKeyDown', focus: 'onFocus', blur: 'onBlur', input: 'onInput', paste: 'onPaste', tap: 'onInputTap'});
  if (Ext.browser.is.AndroidStock) 
  {
    me.input.dom.addEventListener("mousedown", function(e) {
  if (document.activeElement != e.target) 
  {
    e.preventDefault();
  }
});
    me.input.dom.addEventListener("touchend", function() {
  me.focus();
});
  }
  me.mask.on({scope: me, tap: 'onMaskTap'});
  if (me.clearIcon) 
  {
    me.clearIcon.on({tap: 'onClearIconTap', touchstart: 'onClearIconPress', touchend: 'onClearIconRelease', scope: me});
  }
  if (Ext.browser.is.ie && Ext.browser.version.major >= 10) 
  {
    me.input.on({scope: me, keypress: 'onKeyPress'});
  }
}, updateFastFocus: function(newValue) {
  if (newValue) 
  {
    if (this.getFastFocus() && Ext.os.is.iOS) 
    {
      this.input.on({scope: this, touchstart: "onTouchStart"});
    }
  } else {
    this.input.un({scope: this, touchstart: "onTouchStart"});
  }
}, useManualMaxLength: function() {
  return Boolean((Ext.os.is.Android && !Ext.browser.is.Chrome));
}, applyUseMask: function(useMask) {
  if (useMask === 'auto') 
  {
    useMask = Ext.os.is.iOS && Ext.os.version.lt('5');
  }
  return Boolean(useMask);
}, updateUseMask: function(newUseMask) {
  this.mask[newUseMask ? 'show' : 'hide']();
}, updatePattern: function(pattern) {
  this.updateFieldAttribute('pattern', pattern);
}, updateFieldAttribute: function(attribute, newValue) {
  var input = this.input;
  if (!Ext.isEmpty(newValue, true)) 
  {
    input.dom.setAttribute(attribute, newValue);
  } else {
    input.dom.removeAttribute(attribute);
  }
}, updateCls: function(newCls, oldCls) {
  this.input.addCls(Ext.baseCSSPrefix + 'input-el');
  this.input.replaceCls(oldCls, newCls);
}, updateType: function(newType, oldType) {
  var prefix = Ext.baseCSSPrefix + 'input-';
  this.input.replaceCls(prefix + oldType, prefix + newType);
  this.updateFieldAttribute('type', newType);
}, updateName: function(newName) {
  this.updateFieldAttribute('name', newName);
}, getValue: function() {
  var input = this.input;
  if (input) 
  {
    this._value = input.dom.value;
  }
  return this._value;
}, applyValue: function(value) {
  return (Ext.isEmpty(value)) ? '' : value;
}, updateValue: function(newValue) {
  var input = this.input;
  if (input) 
  {
    input.dom.value = newValue;
  }
}, setValue: function(newValue) {
  var oldValue = this._value;
  this.updateValue(this.applyValue(newValue));
  newValue = this.getValue();
  if (String(newValue) != String(oldValue) && this.initialized) 
  {
    this.onChange(this, newValue, oldValue);
  }
  return this;
}, updateTabIndex: function(newTabIndex) {
  this.updateFieldAttribute('tabIndex', newTabIndex);
}, testAutoFn: function(value) {
  return [true, 'on'].indexOf(value) !== -1;
}, updateMaxLength: function(newMaxLength) {
  if (!this.useManualMaxLength()) 
  {
    this.updateFieldAttribute('maxlength', newMaxLength);
  }
}, updatePlaceHolder: function(newPlaceHolder) {
  this.updateFieldAttribute('placeholder', newPlaceHolder);
}, applyAutoComplete: function(autoComplete) {
  return this.testAutoFn(autoComplete);
}, updateAutoComplete: function(newAutoComplete) {
  var value = newAutoComplete ? 'on' : 'off';
  this.updateFieldAttribute('autocomplete', value);
}, applyAutoCapitalize: function(autoCapitalize) {
  return this.testAutoFn(autoCapitalize);
}, updateAutoCapitalize: function(newAutoCapitalize) {
  var value = newAutoCapitalize ? 'on' : 'off';
  this.updateFieldAttribute('autocapitalize', value);
}, applyAutoCorrect: function(autoCorrect) {
  return this.testAutoFn(autoCorrect);
}, updateAutoCorrect: function(newAutoCorrect) {
  var value = newAutoCorrect ? 'on' : 'off';
  this.updateFieldAttribute('autocorrect', value);
}, updateMinValue: function(newMinValue) {
  this.updateFieldAttribute('min', newMinValue);
}, updateMaxValue: function(newMaxValue) {
  this.updateFieldAttribute('max', newMaxValue);
}, updateStepValue: function(newStepValue) {
  this.updateFieldAttribute('step', newStepValue);
}, checkedRe: /^(true|1|on)/i, getChecked: function() {
  var el = this.input, checked;
  if (el) 
  {
    checked = el.dom.checked;
    this._checked = checked;
  }
  return checked;
}, applyChecked: function(checked) {
  return !!this.checkedRe.test(String(checked));
}, setChecked: function(newChecked) {
  this.updateChecked(this.applyChecked(newChecked));
  this._checked = newChecked;
}, updateChecked: function(newChecked) {
  this.input.dom.checked = newChecked;
}, updateReadOnly: function(readOnly) {
  this.updateFieldAttribute('readonly', readOnly ? true : null);
}, updateMaxRows: function(newRows) {
  this.updateFieldAttribute('rows', newRows);
}, doSetDisabled: function(disabled) {
  this.callParent(arguments);
  if (Ext.browser.is.Safari && !Ext.os.is.BlackBerry) 
  {
    this.input.dom.tabIndex = (disabled) ? -1 : 0;
  }
  this.input.dom.disabled = (Ext.browser.is.Safari && !Ext.os.is.BlackBerry) ? false : disabled;
  if (!disabled) 
  {
    this.blur();
  }
}, isDirty: function() {
  if (this.getDisabled()) 
  {
    return false;
  }
  return String(this.getValue()) !== String(this.originalValue);
}, reset: function() {
  this.setValue(this.originalValue);
}, onInputTap: function(e) {
  this.fireAction('inputtap', [this, e], 'doInputTap');
}, doInputTap: function(me, e) {
  if (me.getDisabled()) 
  {
    return false;
  }
  if (this.getFastFocus() && Ext.os.is.iOS) 
  {
    me.focus();
  }
}, onMaskTap: function(e) {
  this.fireAction('masktap', [this, e], 'doMaskTap');
}, doMaskTap: function(me, e) {
  if (me.getDisabled()) 
  {
    return false;
  }
  me.focus();
}, showMask: function() {
  if (this.getUseMask()) 
  {
    this.mask.setStyle('display', 'block');
  }
}, hideMask: function() {
  if (this.getUseMask()) 
  {
    this.mask.setStyle('display', 'none');
  }
}, focus: function() {
  var me = this, el = me.input;
  if (el && el.dom.focus) 
  {
    el.dom.focus();
  }
  return me;
}, blur: function() {
  var me = this, el = this.input;
  if (el && el.dom.blur) 
  {
    el.dom.blur();
  }
  return me;
}, select: function() {
  var me = this, el = me.input;
  if (el && el.dom.setSelectionRange) 
  {
    el.dom.setSelectionRange(0, 9999);
  }
  return me;
}, onFocus: function(e) {
  this.fireAction('focus', [e], 'doFocus');
}, doFocus: function(e) {
  var me = this;
  me.hideMask();
  if (!me.getIsFocused()) 
  {
    me.setStartValue(me.getValue());
  }
  me.setIsFocused(true);
}, onTouchStart: function(e) {
  if (document.activeElement != e.target) 
  {
    e.preventDefault();
  }
}, onBlur: function(e) {
  this.fireAction('blur', [e], 'doBlur');
}, doBlur: function(e) {
  var me = this, value = me.getValue(), startValue = me.getStartValue();
  me.showMask();
  me.setIsFocused(false);
  if (String(value) != String(startValue)) 
  {
    me.onChange(me, value, startValue);
  }
}, onClearIconTap: function(e) {
  this.fireEvent('clearicontap', this, e);
  if (Ext.os.is.Android) 
  {
    this.focus();
  }
}, onClearIconPress: function() {
  this.clearIcon.addCls(Ext.baseCSSPrefix + 'pressing');
}, onClearIconRelease: function() {
  this.clearIcon.removeCls(Ext.baseCSSPrefix + 'pressing');
}, onClick: function(e) {
  this.fireEvent('click', e);
}, onChange: function(me, value, startValue) {
  if (this.useManualMaxLength()) 
  {
    this.trimValueToMaxLength();
  }
  this.fireEvent('change', me, value, startValue);
}, onPaste: function(e) {
  if (this.useManualMaxLength()) 
  {
    this.trimValueToMaxLength();
  }
  this.fireEvent('paste', e);
}, onKeyUp: function(e) {
  if (this.useManualMaxLength()) 
  {
    this.trimValueToMaxLength();
  }
  this.fireEvent('keyup', e);
}, onKeyDown: function() {
  this.ignoreInput = true;
}, onInput: function(e) {
  var me = this;
  if (me.ignoreInput) 
  {
    me.ignoreInput = false;
    return;
  }
  setTimeout(function() {
  if (!me.ignoreInput) 
  {
    me.fireEvent('keyup', e);
    me.ignoreInput = false;
  }
}, 10);
}, onKeyPress: function(e) {
  if (e.browserEvent.keyCode == 13) 
  {
    this.fireEvent('keyup', e);
  }
}, onMouseDown: function(e) {
  this.fireEvent('mousedown', e);
}, trimValueToMaxLength: function() {
  var maxLength = this.getMaxLength();
  if (maxLength) 
  {
    var value = this.getValue();
    if (value.length > this.getMaxLength()) 
    {
      this.setValue(value.slice(0, maxLength));
    }
  }
}});

Ext.define('Ext.field.Field', {extend: 'Ext.Decorator', alternateClassName: 'Ext.form.Field', xtype: 'field', isField: true, isFormField: true, config: {baseCls: Ext.baseCSSPrefix + 'field', label: null, labelAlign: 'left', labelWidth: '30%', labelWrap: false, clearIcon: null, required: false, inputType: null, name: null, value: null, tabIndex: null}, platformConfig: [{theme: ['Windows', 'MountainView', 'Blackberry', 'Tizen'], labelAlign: 'top'}], cachedConfig: {labelCls: null, requiredCls: Ext.baseCSSPrefix + 'field-required', inputCls: null}, getElementConfig: function() {
  var prefix = Ext.baseCSSPrefix;
  return {reference: 'element', className: 'x-container', children: [{reference: 'label', cls: prefix + 'form-label', children: [{reference: 'labelspan', tag: 'span'}]}, {reference: 'innerElement', cls: prefix + 'component-outer'}]};
}, updateLabel: function(newLabel, oldLabel) {
  var renderElement = this.renderElement, prefix = Ext.baseCSSPrefix;
  if (newLabel) 
  {
    this.labelspan.setHtml(newLabel);
    renderElement.addCls(prefix + 'field-labeled');
  } else {
    renderElement.removeCls(prefix + 'field-labeled');
  }
}, updateLabelAlign: function(newLabelAlign, oldLabelAlign) {
  var renderElement = this.renderElement, prefix = Ext.baseCSSPrefix;
  if (newLabelAlign) 
  {
    renderElement.addCls(prefix + 'label-align-' + newLabelAlign);
    if (newLabelAlign == "top" || newLabelAlign == "bottom") 
    {
      this.label.setWidth('100%');
    } else {
      this.updateLabelWidth(this.getLabelWidth());
    }
  }
  if (oldLabelAlign) 
  {
    renderElement.removeCls(prefix + 'label-align-' + oldLabelAlign);
  }
}, updateLabelCls: function(newLabelCls, oldLabelCls) {
  if (newLabelCls) 
  {
    this.label.addCls(newLabelCls);
  }
  if (oldLabelCls) 
  {
    this.label.removeCls(oldLabelCls);
  }
}, updateLabelWidth: function(newLabelWidth) {
  var labelAlign = this.getLabelAlign();
  if (newLabelWidth) 
  {
    if (labelAlign == "top" || labelAlign == "bottom") 
    {
      this.label.setWidth('100%');
    } else {
      this.label.setWidth(newLabelWidth);
    }
  }
}, updateLabelWrap: function(newLabelWrap, oldLabelWrap) {
  var cls = Ext.baseCSSPrefix + 'form-label-nowrap';
  if (!newLabelWrap) 
  {
    this.addCls(cls);
  } else {
    this.removeCls(cls);
  }
}, updateRequired: function(newRequired) {
  this.renderElement[newRequired ? 'addCls' : 'removeCls'](this.getRequiredCls());
}, updateRequiredCls: function(newRequiredCls, oldRequiredCls) {
  if (this.getRequired()) 
  {
    this.renderElement.replaceCls(oldRequiredCls, newRequiredCls);
  }
}, initialize: function() {
  var me = this;
  me.callParent();
  me.doInitValue();
}, doInitValue: function() {
  this.originalValue = this.getInitialConfig().value;
}, reset: function() {
  this.setValue(this.originalValue);
  return this;
}, resetOriginalValue: function() {
  this.originalValue = this.getValue();
}, isDirty: function() {
  return false;
}}, function() {
});

Ext.define('Ext.field.Text', {extend: 'Ext.field.Field', xtype: 'textfield', alternateClassName: 'Ext.form.Text', config: {ui: 'text', clearIcon: true, placeHolder: null, maxLength: null, autoComplete: null, autoCapitalize: null, autoCorrect: null, readOnly: null, component: {xtype: 'input', type: 'text', fastFocus: true}, bubbleEvents: ['action']}, initialize: function() {
  var me = this;
  me.callParent();
  me.getComponent().on({scope: this, keyup: 'onKeyUp', change: 'onChange', focus: 'onFocus', blur: 'onBlur', paste: 'onPaste', mousedown: 'onMouseDown', clearicontap: 'onClearIconTap'});
  me.originalValue = me.getValue() || "";
  me.getComponent().originalValue = me.originalValue;
  me.syncEmptyCls();
}, syncEmptyCls: function() {
  var empty = (this._value) ? this._value.length : false, cls = Ext.baseCSSPrefix + 'empty';
  if (empty) 
  {
    this.removeCls(cls);
  } else {
    this.addCls(cls);
  }
}, updateValue: function(newValue) {
  var component = this.getComponent(), valueValid = newValue !== undefined && newValue !== null && newValue !== "";
  if (component) 
  {
    component.setValue(newValue);
  }
  this[valueValid && this.isDirty() ? 'showClearIcon' : 'hideClearIcon']();
  this.syncEmptyCls();
}, getValue: function() {
  var me = this;
  me._value = me.getComponent().getValue();
  me.syncEmptyCls();
  return me._value;
}, updatePlaceHolder: function(newPlaceHolder) {
  this.getComponent().setPlaceHolder(newPlaceHolder);
}, updateMaxLength: function(newMaxLength) {
  this.getComponent().setMaxLength(newMaxLength);
}, updateAutoComplete: function(newAutoComplete) {
  this.getComponent().setAutoComplete(newAutoComplete);
}, updateAutoCapitalize: function(newAutoCapitalize) {
  this.getComponent().setAutoCapitalize(newAutoCapitalize);
}, updateAutoCorrect: function(newAutoCorrect) {
  this.getComponent().setAutoCorrect(newAutoCorrect);
}, updateReadOnly: function(newReadOnly) {
  if (newReadOnly) 
  {
    this.hideClearIcon();
  } else {
    this.showClearIcon();
  }
  this.getComponent().setReadOnly(newReadOnly);
}, updateInputType: function(newInputType) {
  var component = this.getComponent();
  if (component) 
  {
    component.setType(newInputType);
  }
}, updateName: function(newName) {
  var component = this.getComponent();
  if (component) 
  {
    component.setName(newName);
  }
}, updateTabIndex: function(newTabIndex) {
  var component = this.getComponent();
  if (component) 
  {
    component.setTabIndex(newTabIndex);
  }
}, updateInputCls: function(newInputCls, oldInputCls) {
  var component = this.getComponent();
  if (component) 
  {
    component.replaceCls(oldInputCls, newInputCls);
  }
}, doSetDisabled: function(disabled) {
  var me = this;
  me.callParent(arguments);
  var component = me.getComponent();
  if (component) 
  {
    component.setDisabled(disabled);
  }
  if (disabled) 
  {
    me.hideClearIcon();
  } else {
    me.showClearIcon();
  }
}, showClearIcon: function() {
  var me = this, value = me.getValue(), valueValid = value !== undefined && value !== null && value !== "";
  if (me.getClearIcon() && !me.getDisabled() && !me.getReadOnly() && valueValid) 
  {
    me.element.addCls(Ext.baseCSSPrefix + 'field-clearable');
  }
  return me;
}, hideClearIcon: function() {
  if (this.getClearIcon()) 
  {
    this.element.removeCls(Ext.baseCSSPrefix + 'field-clearable');
  }
}, onKeyUp: function(e) {
  this.fireAction('keyup', [this, e], 'doKeyUp');
}, doKeyUp: function(me, e) {
  var value = me.getValue(), valueValid = value !== undefined && value !== null && value !== "";
  this[valueValid ? 'showClearIcon' : 'hideClearIcon']();
  if (e.browserEvent.keyCode === 13) 
  {
    me.fireAction('action', [me, e], 'doAction');
  }
}, doAction: function() {
  this.blur();
}, onClearIconTap: function(e) {
  this.fireAction('clearicontap', [this, e], 'doClearIconTap');
}, doClearIconTap: function(me, e) {
  me.setValue('');
  me.getValue();
}, onChange: function(me, value, startValue) {
  me.fireEvent('change', this, value, startValue);
}, onFocus: function(e) {
  this.addCls(Ext.baseCSSPrefix + 'field-focused');
  this.isFocused = true;
  this.fireEvent('focus', this, e);
}, onBlur: function(e) {
  var me = this;
  this.removeCls(Ext.baseCSSPrefix + 'field-focused');
  this.isFocused = false;
  me.fireEvent('blur', me, e);
  setTimeout(function() {
  me.isFocused = false;
}, 50);
}, onPaste: function(e) {
  this.fireEvent('paste', this, e);
}, onMouseDown: function(e) {
  this.fireEvent('mousedown', this, e);
}, focus: function() {
  this.getComponent().focus();
  return this;
}, blur: function() {
  this.getComponent().blur();
  return this;
}, select: function() {
  this.getComponent().select();
  return this;
}, resetOriginalValue: function() {
  this.callParent();
  var component = this.getComponent();
  if (component && component.hasOwnProperty("originalValue")) 
  {
    this.getComponent().originalValue = this.originalValue;
  }
  this.reset();
}, reset: function() {
  this.getComponent().reset();
  this.getValue();
  this[this.isDirty() ? 'showClearIcon' : 'hideClearIcon']();
}, isDirty: function() {
  var component = this.getComponent();
  if (component) 
  {
    return component.isDirty();
  }
  return false;
}});

Ext.define('Ext.field.TextAreaInput', {extend: 'Ext.field.Input', xtype: 'textareainput', tag: 'textarea'});

Ext.define('Ext.field.TextArea', {extend: 'Ext.field.Text', xtype: 'textareafield', alternateClassName: 'Ext.form.TextArea', config: {ui: 'textarea', autoCapitalize: false, component: {xtype: 'textareainput'}, maxRows: null}, updateMaxRows: function(newRows) {
  this.getComponent().setMaxRows(newRows);
}, doSetHeight: function(newHeight) {
  this.callParent(arguments);
  var component = this.getComponent();
  component.input.setHeight(newHeight);
}, doSetWidth: function(newWidth) {
  this.callParent(arguments);
  var component = this.getComponent();
  component.input.setWidth(newWidth);
}, doKeyUp: function(me) {
  var value = me.getValue();
  me[value ? 'showClearIcon' : 'hideClearIcon']();
}});

Ext.define('Ext.MessageBox', {extend: 'Ext.Sheet', config: {ui: 'dark', baseCls: Ext.baseCSSPrefix + 'msgbox', iconCls: null, showAnimation: {type: 'popIn', duration: 250, easing: 'ease-out'}, hideAnimation: {type: 'popOut', duration: 250, easing: 'ease-out'}, zIndex: 999, defaultTextHeight: 75, title: null, buttons: null, message: null, prompt: null, modal: true, layout: {type: 'vbox', pack: 'center'}}, platformConfig: [{theme: ['Windows'], ui: 'light', showAnimation: {type: 'fadeIn'}, hideAnimation: {type: 'fadeOut'}}, {theme: ['Blackberry'], ui: 'plain'}, {theme: ['MoutainView']}], statics: {OK: {text: 'OK', itemId: 'ok', ui: 'action'}, YES: {text: 'Yes', itemId: 'yes', ui: 'action'}, NO: {text: 'No', itemId: 'no'}, CANCEL: {text: 'Cancel', itemId: 'cancel'}, INFO: Ext.baseCSSPrefix + 'msgbox-info', WARNING: Ext.baseCSSPrefix + 'msgbox-warning', QUESTION: Ext.baseCSSPrefix + 'msgbox-question', ERROR: Ext.baseCSSPrefix + 'msgbox-error', OKCANCEL: [{text: 'Cancel', itemId: 'cancel'}, {text: 'OK', itemId: 'ok', ui: 'action'}], YESNOCANCEL: [{text: 'Cancel', itemId: 'cancel'}, {text: 'No', itemId: 'no'}, {text: 'Yes', itemId: 'yes', ui: 'action'}], YESNO: [{text: 'No', itemId: 'no'}, {text: 'Yes', itemId: 'yes', ui: 'action'}]}, constructor: function(config) {
  config = config || {};
  if (config.hasOwnProperty('promptConfig')) 
  {
    Ext.applyIf(config, {prompt: config.promptConfig});
    delete config.promptConfig;
  }
  if (config.hasOwnProperty('multiline') || config.hasOwnProperty('multiLine')) 
  {
    config.prompt = config.prompt || {};
    Ext.applyIf(config.prompt, {multiLine: config.multiline || config.multiLine});
    delete config.multiline;
    delete config.multiLine;
  }
  this.defaultAllowedConfig = {};
  var allowedConfigs = ['ui', 'showAnimation', 'hideAnimation', 'title', 'message', 'prompt', 'iconCls', 'buttons', 'defaultTextHeight'], ln = allowedConfigs.length, i, allowedConfig;
  for (i = 0; i < ln; i++) 
    {
      allowedConfig = allowedConfigs[i];
      this.defaultAllowedConfig[allowedConfig] = this.defaultConfig[allowedConfig];
    }
  this.callParent([config]);
}, applyTitle: function(config) {
  if (typeof config == "string") 
  {
    config = {title: config};
  }
  var minHeight = '1.3em';
  if (Ext.theme.is.Cupertino) 
  {
    minHeight = '1.5em';
  } else if (Ext.filterPlatform('blackberry') || Ext.filterPlatform('ie10')) 
  {
    minHeight = '2.6em';
  }
  Ext.applyIf(config, {docked: 'top', minHeight: minHeight, ui: Ext.filterPlatform('blackberry') ? 'light' : 'dark', cls: this.getBaseCls() + '-title'});
  if (Ext.theme.is.Tizen) 
  {
    Ext.applyIf(config, {centered: false});
  }
  return Ext.factory(config, Ext.Toolbar, this.getTitle());
}, updateTitle: function(newTitle) {
  if (newTitle) 
  {
    this.add(newTitle);
  }
}, updateButtons: function(newButtons) {
  var me = this;
  newButtons = (!newButtons || newButtons.length === 0) ? false : newButtons;
  if (newButtons) 
  {
    if (me.buttonsToolbar) 
    {
      me.buttonsToolbar.show();
      me.buttonsToolbar.removeAll();
      me.buttonsToolbar.setItems(newButtons);
    } else {
      var layout = {type: 'hbox', pack: 'center'};
      var isFlexed = Ext.theme.is.CupertinoClassic || Ext.theme.is.MountainView || Ext.theme.is.Blackberry;
      me.buttonsToolbar = Ext.create('Ext.Toolbar', {docked: 'bottom', defaultType: 'button', defaults: {flex: (isFlexed) ? 1 : undefined, ui: (Ext.theme.is.Blackberry) ? 'action' : undefined}, layout: layout, ui: me.getUi(), cls: me.getBaseCls() + '-buttons', items: newButtons});
      me.add(me.buttonsToolbar);
    }
  } else if (me.buttonsToolbar) 
  {
    me.buttonsToolbar.hide();
  }
}, applyMessage: function(config) {
  config = {html: config, cls: this.getBaseCls() + '-text'};
  return Ext.factory(config, Ext.Component, this._message);
}, updateMessage: function(newMessage) {
  if (newMessage) 
  {
    this.add(newMessage);
  }
}, getMessage: function() {
  if (this._message) 
  {
    return this._message.getHtml();
  }
  return null;
}, applyIconCls: function(config) {
  config = {xtype: 'component', docked: 'left', width: 40, height: 40, baseCls: Ext.baseCSSPrefix + 'icon', hidden: (config) ? false : true, cls: config};
  return Ext.factory(config, Ext.Component, this._iconCls);
}, updateIconCls: function(newIconCls, oldIconCls) {
  this.getTitle();
  this.getButtons();
  if (newIconCls) 
  {
    this.add(newIconCls);
  } else {
    this.remove(oldIconCls);
  }
}, getIconCls: function() {
  var icon = this._iconCls, iconCls;
  if (icon) 
  {
    iconCls = icon.getCls();
    return (iconCls) ? iconCls[0] : null;
  }
  return null;
}, applyPrompt: function(prompt) {
  if (prompt) 
  {
    var config = {label: false};
    if (Ext.isObject(prompt)) 
    {
      Ext.apply(config, prompt);
    }
    if (config.multiLine) 
    {
      config.height = Ext.isNumber(config.multiLine) ? parseFloat(config.multiLine) : this.getDefaultTextHeight();
      return Ext.factory(config, Ext.field.TextArea, this.getPrompt());
    } else {
      return Ext.factory(config, Ext.field.Text, this.getPrompt());
    }
  }
  return prompt;
}, updatePrompt: function(newPrompt, oldPrompt) {
  if (newPrompt) 
  {
    this.add(newPrompt);
  }
  if (oldPrompt) 
  {
    this.remove(oldPrompt);
  }
}, onClick: function(button) {
  if (button) 
  {
    var config = button.config.userConfig || {}, initialConfig = button.getInitialConfig(), prompt = this.getPrompt();
    if (typeof config.fn == 'function') 
    {
      button.disable();
      this.on({hiddenchange: function() {
  config.fn.call(config.scope || null, initialConfig.itemId || initialConfig.text, prompt ? prompt.getValue() : null, config);
  button.enable();
}, single: true, scope: this});
    }
    if (config.input) 
    {
      config.input.dom.blur();
    }
  }
  this.hide();
}, show: function(initialConfig) {
  Ext.util.InputBlocker.blockInputs();
  if (!this.getParent() && Ext.Viewport) 
  {
    Ext.Viewport.add(this);
  }
  if (!initialConfig) 
  {
    return this.callParent();
  }
  var config = Ext.Object.merge({}, {value: ''}, initialConfig);
  var buttons = initialConfig.buttons || Ext.MessageBox.OK || [], buttonBarItems = [], userConfig = initialConfig;
  Ext.each(buttons, function(buttonConfig) {
  if (!buttonConfig) 
  {
    return;
  }
  buttonBarItems.push(Ext.apply({userConfig: userConfig, scope: this, handler: 'onClick'}, buttonConfig));
}, this);
  config.buttons = buttonBarItems;
  if (config.promptConfig) 
  {
  }
  config.prompt = (config.promptConfig || config.prompt) || null;
  if (config.multiLine) 
  {
    config.prompt = config.prompt || {};
    config.prompt.multiLine = config.multiLine;
    delete config.multiLine;
  }
  config = Ext.merge({}, this.defaultAllowedConfig, config);
  this.setConfig(config);
  var prompt = this.getPrompt();
  if (prompt) 
  {
    prompt.setValue(initialConfig.value || '');
  }
  this.callParent();
  return this;
}, alert: function(title, message, fn, scope) {
  return this.show({title: title || null, message: message || null, buttons: Ext.MessageBox.OK, promptConfig: false, fn: function() {
  if (fn) 
  {
    fn.apply(scope, arguments);
  }
}, scope: scope});
}, confirm: function(title, message, fn, scope) {
  return this.show({title: title || null, message: message || null, buttons: Ext.MessageBox.YESNO, promptConfig: false, scope: scope, fn: function() {
  if (fn) 
  {
    fn.apply(scope, arguments);
  }
}});
}, prompt: function(title, message, fn, scope, multiLine, value, prompt) {
  return this.show({title: title || null, message: message || null, buttons: Ext.MessageBox.OKCANCEL, scope: scope, prompt: prompt || true, multiLine: multiLine, value: value, fn: function() {
  if (fn) 
  {
    fn.apply(scope, arguments);
  }
}});
}}, function(MessageBox) {
  Ext.onSetup(function() {
  Ext.Msg = new MessageBox();
});
});

Ext.define('Ext.Video', {extend: 'Ext.Media', xtype: 'video', config: {posterUrl: null, baseCls: Ext.baseCSSPrefix + 'video'}, template: [{reference: 'ghost', classList: [Ext.baseCSSPrefix + 'video-ghost']}, {tag: 'video', reference: 'media', classList: [Ext.baseCSSPrefix + 'media']}], initialize: function() {
  var me = this;
  me.callParent();
  me.media.hide();
  me.onBefore({erased: 'onErased', scope: me});
  me.ghost.on({tap: 'onGhostTap', scope: me});
  me.media.on({pause: 'onPause', scope: me});
  if (Ext.os.is.Android4 || Ext.os.is.iPad) 
  {
    this.isInlineVideo = true;
  }
}, applyUrl: function(url) {
  return [].concat(url);
}, updateUrl: function(newUrl) {
  var me = this, media = me.media, newLn = newUrl.length, existingSources = media.query('source'), oldLn = existingSources.length, i;
  for (i = 0; i < oldLn; i++) 
    {
      Ext.fly(existingSources[i]).destroy();
    }
  for (i = 0; i < newLn; i++) 
    {
      media.appendChild(Ext.Element.create({tag: 'source', src: newUrl[i]}));
    }
  if (me.isPlaying()) 
  {
    me.play();
  }
}, onErased: function() {
  this.pause();
  this.media.setTop(-2000);
  this.ghost.show();
}, onGhostTap: function() {
  var me = this, media = this.media, ghost = this.ghost;
  media.show();
  if (Ext.browser.is.AndroidStock2) 
  {
    setTimeout(function() {
  me.play();
  setTimeout(function() {
  media.hide();
}, 10);
}, 10);
  } else {
    ghost.hide();
    me.play();
  }
}, onPause: function() {
  this.callParent(arguments);
  if (!this.isInlineVideo) 
  {
    this.media.setTop(-2000);
    this.ghost.show();
  }
}, onPlay: function() {
  this.callParent(arguments);
  this.media.setTop(0);
}, updatePosterUrl: function(newUrl) {
  var ghost = this.ghost;
  if (ghost) 
  {
    ghost.setStyle('background-image', 'url(' + newUrl + ')');
  }
}});

Ext.define('Ext.app.Action', {config: {scope: null, application: null, controller: null, action: null, args: [], url: undefined, data: {}, title: null, beforeFilters: [], currentFilterIndex: -1}, constructor: function(config) {
  this.initConfig(config);
  this.getUrl();
}, applyBeforeFilters: function(filters) {
  return filters || [];
}, execute: function() {
  this.resume();
}, resume: function() {
  var index = this.getCurrentFilterIndex() + 1, filters = this.getBeforeFilters(), controller = this.getController(), nextFilter = filters[index];
  if (nextFilter) 
  {
    this.setCurrentFilterIndex(index);
    nextFilter.call(controller, this);
  } else {
    controller[this.getAction()].apply(controller, this.getArgs());
  }
}, applyUrl: function(url) {
  if (url === null || url === undefined) 
  {
    url = this.urlEncode();
  }
  return url;
}, applyController: function(controller) {
  var app = this.getApplication(), profile = app.getCurrentProfile();
  if (Ext.isString(controller)) 
  {
    controller = app.getController(controller, profile ? profile.getNamespace() : null);
  }
  return controller;
}, urlEncode: function() {
  var controller = this.getController(), splits;
  if (controller instanceof Ext.app.Controller) 
  {
    splits = controller.$className.split('.');
    controller = splits[splits.length - 1];
  }
  return controller + "/" + this.getAction();
}});

Ext.define('Ext.app.Controller', {mixins: {observable: "Ext.mixin.Observable"}, config: {refs: {}, routes: {}, control: {}, before: {}, application: {}, stores: [], models: [], views: []}, constructor: function(config) {
  this.initConfig(config);
  this.mixins.observable.constructor.call(this, config);
}, init: Ext.emptyFn, launch: Ext.emptyFn, redirectTo: function(place) {
  return this.getApplication().redirectTo(place);
}, execute: function(action, skipFilters) {
  action.setBeforeFilters(this.getBefore()[action.getAction()]);
  action.execute();
}, applyBefore: function(before) {
  var filters, name, length, i;
  for (name in before) 
    {
      filters = Ext.Array.from(before[name]);
      length = filters.length;
      for (i = 0; i < length; i++) 
        {
          filters[i] = this[filters[i]];
        }
      before[name] = filters;
    }
  return before;
}, applyControl: function(config) {
  this.control(config, this);
  return config;
}, applyRefs: function(refs) {
  this.ref(refs);
  return refs;
}, applyRoutes: function(routes) {
  var app = this instanceof Ext.app.Application ? this : this.getApplication(), router = app.getRouter(), route, url, config;
  for (url in routes) 
    {
      route = routes[url];
      config = {controller: this.$className};
      if (Ext.isString(route)) 
      {
        config.action = route;
      } else {
        Ext.apply(config, route);
      }
      router.connect(url, config);
    }
  return routes;
}, applyStores: function(stores) {
  return this.getFullyQualified(stores, 'store');
}, applyModels: function(models) {
  return this.getFullyQualified(models, 'model');
}, applyViews: function(views) {
  return this.getFullyQualified(views, 'view');
}, getFullyQualified: function(items, namespace) {
  var length = items.length, appName = this.getApplication().getName(), name, i;
  for (i = 0; i < length; i++) 
    {
      name = items[i];
      if (Ext.isString(name) && (Ext.Loader.getPrefix(name) === "" || name === appName)) 
      {
        items[i] = appName + '.' + namespace + '.' + name;
      }
    }
  return items;
}, control: function(selectors) {
  this.getApplication().control(selectors, this);
}, ref: function(refs) {
  var me = this, refName, getterName, selector, info;
  for (refName in refs) 
    {
      selector = refs[refName];
      getterName = "get" + Ext.String.capitalize(refName);
      if (!this[getterName]) 
      {
        if (Ext.isString(refs[refName])) 
        {
          info = {ref: refName, selector: selector};
        } else {
          info = refs[refName];
        }
        this[getterName] = function(refName, info) {
  var args = [refName, info];
  return function() {
  return me.getRef.apply(me, args.concat.apply(args, arguments));
};
}(refName, info);
      }
      this.references = this.references || [];
      this.references.push(refName.toLowerCase());
    }
}, getRef: function(ref, info, config) {
  this.refCache = this.refCache || {};
  info = info || {};
  config = config || {};
  Ext.apply(info, config);
  if (info.forceCreate) 
  {
    return Ext.ComponentManager.create(info, 'component');
  }
  var me = this, cached = me.refCache[ref];
  if (!cached) 
  {
    me.refCache[ref] = cached = Ext.ComponentQuery.query(info.selector)[0];
    if (!cached && info.autoCreate) 
    {
      me.refCache[ref] = cached = Ext.ComponentManager.create(info, 'component');
    }
    if (cached) 
    {
      cached.on('destroy', function() {
  me.refCache[ref] = null;
});
    }
  }
  return cached;
}, hasRef: function(ref) {
  return this.references && this.references.indexOf(ref.toLowerCase()) !== -1;
}}, function() {
});

Ext.define('Ext.app.History', {mixins: ['Ext.mixin.Observable'], config: {actions: [], updateUrl: true, token: ''}, constructor: function(config) {
  if (Ext.feature.has.History) 
  {
    window.addEventListener('hashchange', Ext.bind(this.detectStateChange, this));
  } else {
    setInterval(Ext.bind(this.detectStateChange, this), 100);
  }
  this.initConfig(config);
  if (config && Ext.isEmpty(config.token)) 
  {
    this.setToken(window.location.hash.substr(1));
  }
}, add: function(action, silent) {
  action = Ext.factory(action, Ext.app.Action);
  this.getActions().push(action);
  var url = action.getUrl();
  if (this.getUpdateUrl()) 
  {
    this.setToken(url);
    window.location.hash = url;
  }
  if (silent !== true) 
  {
    this.fireEvent('change', url);
  }
  this.setToken(url);
}, back: function() {
  var actions = this.getActions(), previousAction = actions[actions.length - 2];
  if (previousAction) 
  {
    actions.pop();
    previousAction.getController().getApplication().redirectTo(previousAction.getUrl());
  } else {
    actions[actions.length - 1].getController().getApplication().redirectTo('');
  }
}, applyToken: function(token) {
  return token[0] == '#' ? token.substr(1) : token;
}, detectStateChange: function() {
  var newToken = this.applyToken(window.location.hash), oldToken = this.getToken();
  if (newToken != oldToken) 
  {
    this.onStateChange();
    this.setToken(newToken);
  }
}, onStateChange: function() {
  this.fireEvent('change', window.location.hash.substr(1));
}});

Ext.define('Ext.app.Profile', {mixins: {observable: "Ext.mixin.Observable"}, config: {namespace: 'auto', name: 'auto', controllers: [], models: [], views: [], stores: [], application: null}, constructor: function(config) {
  this.initConfig(config);
  this.mixins.observable.constructor.apply(this, arguments);
}, isActive: function() {
  return false;
}, launch: Ext.emptyFn, applyNamespace: function(name) {
  if (name == 'auto') 
  {
    name = this.getName();
  }
  return name.toLowerCase();
}, applyName: function(name) {
  if (name == 'auto') 
  {
    var pieces = this.$className.split('.');
    name = pieces[pieces.length - 1];
  }
  return name;
}, getDependencies: function() {
  var allClasses = [], format = Ext.String.format, appName = this.getApplication().getName(), namespace = this.getNamespace(), map = {model: this.getModels(), view: this.getViews(), controller: this.getControllers(), store: this.getStores()}, classType, classNames, fullyQualified;
  for (classType in map) 
    {
      classNames = [];
      Ext.each(map[classType], function(className) {
  if (Ext.isString(className)) 
  {
    if (Ext.isString(className) && (Ext.Loader.getPrefix(className) === "" || className === appName)) 
    {
      className = appName + '.' + classType + '.' + namespace + '.' + className;
    }
    classNames.push(className);
    allClasses.push(className);
  }
}, this);
      map[classType] = classNames;
    }
  map.all = allClasses;
  return map;
}});

Ext.define('Ext.app.Route', {config: {conditions: {}, url: null, controller: null, action: null, initialized: false}, constructor: function(config) {
  this.initConfig(config);
}, recognize: function(url) {
  if (!this.getInitialized()) 
  {
    this.initialize();
  }
  if (this.recognizes(url)) 
  {
    var matches = this.matchesFor(url), args = url.match(this.matcherRegex);
    args.shift();
    return Ext.applyIf(matches, {controller: this.getController(), action: this.getAction(), url: url, args: args, historyUrl: url});
  }
}, initialize: function() {
  this.paramMatchingRegex = new RegExp(/:([0-9A-Za-z\_]*)/g);
  this.paramsInMatchString = this.getUrl().match(this.paramMatchingRegex) || [];
  this.matcherRegex = this.createMatcherRegex(this.getUrl());
  this.setInitialized(true);
}, recognizes: function(url) {
  return this.matcherRegex.test(url);
}, matchesFor: function(url) {
  var params = {}, keys = this.paramsInMatchString, values = url.match(this.matcherRegex), length = keys.length, i;
  values.shift();
  for (i = 0; i < length; i++) 
    {
      params[keys[i].replace(":", "")] = values[i];
    }
  return params;
}, argsFor: function(url) {
  var args = [], keys = this.paramsInMatchString, values = url.match(this.matcherRegex), length = keys.length, i;
  values.shift();
  for (i = 0; i < length; i++) 
    {
      args.push(keys[i].replace(':', ""));
      params[keys[i].replace(":", "")] = values[i];
    }
  return params;
}, urlFor: function(config) {
  var url = this.getUrl();
  for (var key in config) 
    {
      url = url.replace(":" + key, config[key]);
    }
  return url;
}, createMatcherRegex: function(url) {
  var paramsInMatchString = this.paramsInMatchString, length = paramsInMatchString.length, i, cond, matcher;
  for (i = 0; i < length; i++) 
    {
      cond = this.getConditions()[paramsInMatchString[i]];
      matcher = Ext.util.Format.format("({0})", cond || "[%a-zA-Z0-9\\-\\_\\s,]+");
      url = url.replace(new RegExp(paramsInMatchString[i]), matcher);
    }
  return new RegExp("^" + url + "$");
}});

Ext.define('Ext.app.Router', {config: {routes: [], defaults: {action: 'index'}}, constructor: function(config) {
  this.initConfig(config);
}, connect: function(url, params) {
  params = Ext.apply({url: url}, params || {}, this.getDefaults());
  var route = Ext.create('Ext.app.Route', params);
  this.getRoutes().push(route);
  return route;
}, recognize: function(url) {
  var routes = this.getRoutes(), length = routes.length, i, result;
  for (i = 0; i < length; i++) 
    {
      result = routes[i].recognize(url);
      if (result !== undefined) 
      {
        return result;
      }
    }
  return undefined;
}, draw: function(fn) {
  fn.call(this, this);
}, clear: function() {
  this.setRoutes([]);
}}, function() {
});

Ext.define('Ext.app.Application', {extend: 'Ext.app.Controller', config: {profiles: [], controllers: [], history: {}, name: null, appFolder: 'app', router: {}, controllerInstances: [], profileInstances: [], currentProfile: null, launch: Ext.emptyFn, enableLoader: true, requires: [], themeVariationPrefix: Ext.baseCSSPrefix + 'theme-variation-', themeVariationTransitionCls: null, themeVariation: null}, constructor: function(config) {
  config = config || {};
  Ext.applyIf(config, {application: this});
  this.initConfig(config);
  for (var key in config) 
    {
      this[key] = config[key];
    }
  Ext.require(this.getRequires(), function() {
  if (this.getEnableLoader() !== false) 
  {
    Ext.require(this.getProfiles(), this.onProfilesLoaded, this);
  }
}, this);
}, dispatch: function(action, addToHistory) {
  action = action || {};
  Ext.applyIf(action, {application: this});
  action = Ext.factory(action, Ext.app.Action);
  if (action) 
  {
    var profile = this.getCurrentProfile(), profileNS = profile ? profile.getNamespace() : undefined, controller = this.getController(action.getController(), profileNS);
    if (controller) 
    {
      if (addToHistory !== false) 
      {
        this.getHistory().add(action, true);
      }
      controller.execute(action);
    }
  }
}, redirectTo: function(url) {
  if (Ext.data && Ext.data.Model && url instanceof Ext.data.Model) 
  {
    var record = url;
    url = record.toUrl();
  }
  var decoded = this.getRouter().recognize(url);
  if (decoded) 
  {
    decoded.url = url;
    if (record) 
    {
      decoded.data = {};
      decoded.data.record = record;
    }
    return this.dispatch(decoded);
  }
}, control: function(selectors, controller) {
  controller = controller || this;
  var dispatcher = this.getEventDispatcher(), refs = (controller) ? controller.getRefs() : {}, selector, eventName, listener, listeners, ref;
  for (selector in selectors) 
    {
      if (selectors.hasOwnProperty(selector)) 
      {
        listeners = selectors[selector];
        ref = refs[selector];
        if (ref) 
        {
          selector = ref.selector || ref;
        }
        for (eventName in listeners) 
          {
            listener = listeners[eventName];
            if (Ext.isString(listener)) 
            {
              listener = controller[listener];
            }
            dispatcher.addListener('component', selector, eventName, listener, controller);
          }
      }
    }
}, getController: function(name, profileName) {
  var instances = this.getControllerInstances(), appName = this.getName(), format = Ext.String.format, topLevelName;
  if (name instanceof Ext.app.Controller) 
  {
    return name;
  }
  if (instances[name]) 
  {
    return instances[name];
  } else {
    topLevelName = format("{0}.controller.{1}", appName, name);
    profileName = format("{0}.controller.{1}.{2}", appName, profileName, name);
    return instances[profileName] || instances[topLevelName];
  }
}, onProfilesLoaded: function() {
  var profiles = this.getProfiles(), length = profiles.length, instances = [], requires = this.gatherDependencies(), current, i, profileDeps;
  for (i = 0; i < length; i++) 
    {
      instances[i] = Ext.create(profiles[i], {application: this});
      profileDeps = instances[i].getDependencies();
      requires = requires.concat(profileDeps.all);
      if (instances[i].isActive() && !current) 
      {
        current = instances[i];
        this.setCurrentProfile(current);
        this.setControllers(this.getControllers().concat(profileDeps.controller));
        this.setModels(this.getModels().concat(profileDeps.model));
        this.setViews(this.getViews().concat(profileDeps.view));
        this.setStores(this.getStores().concat(profileDeps.store));
      }
    }
  this.setProfileInstances(instances);
  Ext.require(requires, this.loadControllerDependencies, this);
}, loadControllerDependencies: function() {
  this.instantiateControllers();
  var controllers = this.getControllerInstances(), classes = [], stores = [], i, controller, controllerStores, name;
  for (name in controllers) 
    {
      controller = controllers[name];
      controllerStores = controller.getStores();
      stores = stores.concat(controllerStores);
      classes = classes.concat(controller.getModels().concat(controller.getViews()).concat(controllerStores));
    }
  this.setStores(this.getStores().concat(stores));
  Ext.require(classes, this.onDependenciesLoaded, this);
}, onDependenciesLoaded: function() {
  var me = this, profile = this.getCurrentProfile(), launcher = this.getLaunch(), controllers, name;
  this.instantiateStores();
  controllers = this.getControllerInstances();
  for (name in controllers) 
    {
      controllers[name].init(this);
    }
  if (profile) 
  {
    profile.launch();
  }
  launcher.call(me);
  for (name in controllers) 
    {
      controllers[name].launch(this);
    }
  me.redirectTo(window.location.hash.substr(1));
}, gatherDependencies: function() {
  var classes = this.getModels().concat(this.getViews()).concat(this.getControllers());
  Ext.each(this.getStores(), function(storeName) {
  if (Ext.isString(storeName)) 
  {
    classes.push(storeName);
  }
}, this);
  return classes;
}, instantiateStores: function() {
  var stores = this.getStores(), length = stores.length, store, storeClass, storeName, splits, i;
  for (i = 0; i < length; i++) 
    {
      store = stores[i];
      if (Ext.data && Ext.data.Store && !(store instanceof Ext.data.Store)) 
      {
        if (Ext.isString(store)) 
        {
          storeName = store;
          storeClass = Ext.ClassManager.classes[store];
          store = {xclass: store};
          if (storeClass.prototype.defaultConfig.storeId === undefined) 
          {
            splits = storeName.split('.');
            store.id = splits[splits.length - 1];
          }
        }
        stores[i] = Ext.factory(store, Ext.data.Store);
      }
    }
  this.setStores(stores);
}, instantiateControllers: function() {
  var controllerNames = this.getControllers(), instances = {}, length = controllerNames.length, name, i;
  for (i = 0; i < length; i++) 
    {
      name = controllerNames[i];
      instances[name] = Ext.create(name, {application: this});
    }
  return this.setControllerInstances(instances);
}, applyControllers: function(controllers) {
  return this.getFullyQualified(controllers, 'controller');
}, applyProfiles: function(profiles) {
  return this.getFullyQualified(profiles, 'profile');
}, applyName: function(name) {
  var oldName;
  if (name && name.match(/ /g)) 
  {
    oldName = name;
    name = name.replace(/ /g, "");
  }
  return name;
}, updateName: function(newName) {
  Ext.ClassManager.setNamespace(newName + '.app', this);
  if (!Ext.Loader.config.paths[newName]) 
  {
    Ext.Loader.setPath(newName, this.getAppFolder());
  }
}, applyRouter: function(config) {
  return Ext.factory(config, Ext.app.Router, this.getRouter());
}, applyHistory: function(config) {
  var history = Ext.factory(config, Ext.app.History, this.getHistory());
  history.on('change', this.onHistoryChange, this);
  return history;
}, onHistoryChange: function(url) {
  this.dispatch(this.getRouter().recognize(url), false);
}, updateThemeVariation: function(newVariation, oldVariation) {
  var html = Ext.getBody().getParent(), themeVariationPrefix = this.getThemeVariationPrefix() || "", transitionCls = this.getThemeVariationTransitionCls();
  if (Ext.isFunction(newVariation)) 
  {
    newVariation = newVariation.call(this);
  }
  if (!Ext.isString(newVariation)) 
  {
    Ext.Error.raise("Theme variation must be a String.'");
  }
  if (transitionCls) 
  {
    var css = "", duration = 0, rules = document.styleSheets[0].cssRules, i, rule, times, time;
    html.addCls(transitionCls);
    for (i in rules) 
      {
        rule = rules[i];
        if (rule.selectorText && rule.selectorText.indexOf("." + transitionCls) >= 1) 
        {
          css += rule.cssText;
        }
      }
    times = css.match(/[0-9]+s/g);
    for (i in times) 
      {
        time = parseInt(times[i]);
        if (time > duration) 
        {
          duration = time;
        }
      }
    if (this.$themeVariationChangeTimeout) 
    {
      clearTimeout(this.$themeVariationChangeTimeout);
      this.$themeVariationChangeTimeout = null;
    }
    this.$themeVariationChangeTimeout = Ext.defer(function() {
  html.removeCls(transitionCls);
}, time * 1000);
  }
  html.removeCls(themeVariationPrefix + oldVariation);
  html.addCls(themeVariationPrefix + newVariation);
}}, function() {
});

Ext.define('Ext.mixin.Sortable', {extend: 'Ext.mixin.Mixin', mixinConfig: {id: 'sortable'}, config: {sorters: null, defaultSortDirection: "ASC", sortRoot: null}, dirtySortFn: false, sortFn: null, sorted: false, applySorters: function(sorters, collection) {
  if (!collection) 
  {
    collection = this.createSortersCollection();
  }
  collection.clear();
  this.sorted = false;
  if (sorters) 
  {
    this.addSorters(sorters);
  }
  return collection;
}, createSortersCollection: function() {
  this._sorters = Ext.create('Ext.util.Collection', function(sorter) {
  return sorter.getId();
});
  return this._sorters;
}, addSorter: function(sorter, defaultDirection) {
  this.addSorters([sorter], defaultDirection);
}, addSorters: function(sorters, defaultDirection) {
  var currentSorters = this.getSorters();
  return this.insertSorters(currentSorters ? currentSorters.length : 0, sorters, defaultDirection);
}, insertSorter: function(index, sorter, defaultDirection) {
  return this.insertSorters(index, [sorter], defaultDirection);
}, insertSorters: function(index, sorters, defaultDirection) {
  if (!Ext.isArray(sorters)) 
  {
    sorters = [sorters];
  }
  var ln = sorters.length, direction = defaultDirection || this.getDefaultSortDirection(), sortRoot = this.getSortRoot(), currentSorters = this.getSorters(), newSorters = [], sorterConfig, i, sorter, currentSorter;
  if (!currentSorters) 
  {
    currentSorters = this.createSortersCollection();
  }
  for (i = 0; i < ln; i++) 
    {
      sorter = sorters[i];
      sorterConfig = {direction: direction, root: sortRoot};
      if (typeof sorter === 'string') 
      {
        currentSorter = currentSorters.get(sorter);
        if (!currentSorter) 
        {
          sorterConfig.property = sorter;
        } else {
          if (defaultDirection) 
          {
            currentSorter.setDirection(defaultDirection);
          } else {
            currentSorter.toggle();
          }
          continue;
        }
      } else if (Ext.isFunction(sorter)) 
      {
        sorterConfig.sorterFn = sorter;
      } else if (Ext.isObject(sorter)) 
      {
        if (!sorter.isSorter) 
        {
          if (sorter.fn) 
          {
            sorter.sorterFn = sorter.fn;
            delete sorter.fn;
          }
          sorterConfig = Ext.apply(sorterConfig, sorter);
        } else {
          newSorters.push(sorter);
          if (!sorter.getRoot()) 
          {
            sorter.setRoot(sortRoot);
          }
          continue;
        }
      }
      sorter = Ext.create('Ext.util.Sorter', sorterConfig);
      newSorters.push(sorter);
    }
  for (i = 0 , ln = newSorters.length; i < ln; i++) 
    {
      currentSorters.insert(index + i, newSorters[i]);
    }
  this.dirtySortFn = true;
  if (currentSorters.length) 
  {
    this.sorted = true;
  }
  return currentSorters;
}, removeSorter: function(sorter) {
  return this.removeSorters([sorter]);
}, removeSorters: function(sorters) {
  if (!Ext.isArray(sorters)) 
  {
    sorters = [sorters];
  }
  var ln = sorters.length, currentSorters = this.getSorters(), i, sorter;
  for (i = 0; i < ln; i++) 
    {
      sorter = sorters[i];
      if (typeof sorter === 'string') 
      {
        currentSorters.removeAtKey(sorter);
      } else if (typeof sorter === 'function') 
      {
        currentSorters.each(function(item) {
  if (item.getSorterFn() === sorter) 
  {
    currentSorters.remove(item);
  }
});
      } else if (sorter.isSorter) 
      {
        currentSorters.remove(sorter);
      }
    }
  if (!currentSorters.length) 
  {
    this.sorted = false;
  }
}, updateSortFn: function() {
  var sorters = this.getSorters().items;
  this.sortFn = function(r1, r2) {
  var ln = sorters.length, result, i;
  for (i = 0; i < ln; i++) 
    {
      result = sorters[i].sort.call(this, r1, r2);
      if (result !== 0) 
      {
        break;
      }
    }
  return result;
};
  this.dirtySortFn = false;
  return this.sortFn;
}, getSortFn: function() {
  if (this.dirtySortFn) 
  {
    return this.updateSortFn();
  }
  return this.sortFn;
}, sort: function(data) {
  Ext.Array.sort(data, this.getSortFn());
  return data;
}, findInsertionIndex: function(items, item, sortFn) {
  var start = 0, end = items.length - 1, sorterFn = sortFn || this.getSortFn(), middle, comparison;
  while (start <= end) 
    {
      middle = (start + end) >> 1;
      comparison = sorterFn(item, items[middle]);
      if (comparison >= 0) 
      {
        start = middle + 1;
      } else if (comparison < 0) 
      {
        end = middle - 1;
      }
    }
  return start;
}});

Ext.define('Ext.mixin.Filterable', {extend: 'Ext.mixin.Mixin', mixinConfig: {id: 'filterable'}, config: {filters: null, filterRoot: null}, dirtyFilterFn: false, filterFn: null, filtered: false, applyFilters: function(filters, collection) {
  if (!collection) 
  {
    collection = this.createFiltersCollection();
  }
  collection.clear();
  this.filtered = false;
  this.dirtyFilterFn = true;
  if (filters) 
  {
    this.addFilters(filters);
  }
  return collection;
}, createFiltersCollection: function() {
  this._filters = Ext.create('Ext.util.Collection', function(filter) {
  return filter.getId();
});
  return this._filters;
}, addFilter: function(filter) {
  this.addFilters([filter]);
}, addFilters: function(filters) {
  var currentFilters = this.getFilters();
  return this.insertFilters(currentFilters ? currentFilters.length : 0, filters);
}, insertFilter: function(index, filter) {
  return this.insertFilters(index, [filter]);
}, insertFilters: function(index, filters) {
  if (!Ext.isArray(filters)) 
  {
    filters = [filters];
  }
  var ln = filters.length, filterRoot = this.getFilterRoot(), currentFilters = this.getFilters(), newFilters = [], filterConfig, i, filter;
  if (!currentFilters) 
  {
    currentFilters = this.createFiltersCollection();
  }
  for (i = 0; i < ln; i++) 
    {
      filter = filters[i];
      filterConfig = {root: filterRoot};
      if (Ext.isFunction(filter)) 
      {
        filterConfig.filterFn = filter;
      } else if (Ext.isObject(filter)) 
      {
        if (!filter.isFilter) 
        {
          if (filter.fn) 
          {
            filter.filterFn = filter.fn;
            delete filter.fn;
          }
          filterConfig = Ext.apply(filterConfig, filter);
        } else {
          newFilters.push(filter);
          if (!filter.getRoot()) 
          {
            filter.setRoot(filterRoot);
          }
          continue;
        }
      }
      filter = Ext.create('Ext.util.Filter', filterConfig);
      newFilters.push(filter);
    }
  for (i = 0 , ln = newFilters.length; i < ln; i++) 
    {
      currentFilters.insert(index + i, newFilters[i]);
    }
  this.dirtyFilterFn = true;
  if (currentFilters.length) 
  {
    this.filtered = true;
  }
  return currentFilters;
}, removeFilters: function(filters) {
  if (!Ext.isArray(filters)) 
  {
    filters = [filters];
  }
  var ln = filters.length, currentFilters = this.getFilters(), i, filter;
  for (i = 0; i < ln; i++) 
    {
      filter = filters[i];
      if (typeof filter === 'string') 
      {
        currentFilters.each(function(item) {
  if (item.getProperty() === filter) 
  {
    currentFilters.remove(item);
  }
});
      } else if (typeof filter === 'function') 
      {
        currentFilters.each(function(item) {
  if (item.getFilterFn() === filter) 
  {
    currentFilters.remove(item);
  }
});
      } else {
        if (filter.isFilter) 
        {
          currentFilters.remove(filter);
        } else if (filter.property !== undefined && filter.value !== undefined) 
        {
          currentFilters.each(function(item) {
  if (item.getProperty() === filter.property && item.getValue() === filter.value) 
  {
    currentFilters.remove(item);
  }
});
        }
      }
    }
  if (!currentFilters.length) 
  {
    this.filtered = false;
  }
}, updateFilterFn: function() {
  var filters = this.getFilters().items;
  this.filterFn = function(item) {
  var isMatch = true, length = filters.length, i;
  for (i = 0; i < length; i++) 
    {
      var filter = filters[i], fn = filter.getFilterFn(), scope = filter.getScope() || this;
      isMatch = isMatch && fn.call(scope, item);
    }
  return isMatch;
};
  this.dirtyFilterFn = false;
  return this.filterFn;
}, filter: function(data) {
  return this.getFilters().length ? Ext.Array.filter(data, this.getFilterFn()) : data;
}, isFiltered: function(item) {
  return this.getFilters().length ? !this.getFilterFn()(item) : false;
}, getFilterFn: function() {
  if (this.dirtyFilterFn) 
  {
    return this.updateFilterFn();
  }
  return this.filterFn;
}});

Ext.define('Ext.util.Collection', {config: {autoFilter: true, autoSort: true}, mixins: {sortable: 'Ext.mixin.Sortable', filterable: 'Ext.mixin.Filterable'}, constructor: function(keyFn, config) {
  var me = this;
  me.all = [];
  me.items = [];
  me.keys = [];
  me.indices = {};
  me.map = {};
  me.length = 0;
  if (keyFn) 
  {
    me.getKey = keyFn;
  }
  this.initConfig(config);
}, updateAutoSort: function(autoSort, oldAutoSort) {
  if (oldAutoSort === false && autoSort && this.items.length) 
  {
    this.sort();
  }
}, updateAutoFilter: function(autoFilter, oldAutoFilter) {
  if (oldAutoFilter === false && autoFilter && this.all.length) 
  {
    this.filter();
  }
}, insertSorters: function() {
  this.mixins.sortable.insertSorters.apply(this, arguments);
  if (this.getAutoSort() && this.items.length) 
  {
    this.sort();
  }
  return this;
}, removeSorters: function(sorters) {
  this.mixins.sortable.removeSorters.call(this, sorters);
  if (this.sorted && this.getAutoSort() && this.items.length) 
  {
    this.sort();
  }
  return this;
}, applyFilters: function(filters) {
  var collection = this.mixins.filterable.applyFilters.call(this, filters);
  if (!filters && this.all.length && this.getAutoFilter()) 
  {
    this.filter();
  }
  return collection;
}, addFilters: function(filters) {
  this.mixins.filterable.addFilters.call(this, filters);
  if (this.items.length && this.getAutoFilter()) 
  {
    this.filter();
  }
  return this;
}, removeFilters: function(filters) {
  this.mixins.filterable.removeFilters.call(this, filters);
  if (this.filtered && this.all.length && this.getAutoFilter()) 
  {
    this.filter();
  }
  return this;
}, filter: function(property, value, anyMatch, caseSensitive) {
  if (property) 
  {
    if (Ext.isString(property)) 
    {
      this.addFilters({property: property, value: value, anyMatch: anyMatch, caseSensitive: caseSensitive});
      return this.items;
    } else {
      this.addFilters(property);
      return this.items;
    }
  }
  this.items = this.mixins.filterable.filter.call(this, this.all.slice());
  this.updateAfterFilter();
  if (this.sorted && this.getAutoSort()) 
  {
    this.sort();
  }
}, updateAfterFilter: function() {
  var items = this.items, keys = this.keys, indices = this.indices = {}, ln = items.length, i, item, key;
  keys.length = 0;
  for (i = 0; i < ln; i++) 
    {
      item = items[i];
      key = this.getKey(item);
      indices[key] = i;
      keys[i] = key;
    }
  this.length = items.length;
  this.dirtyIndices = false;
}, sort: function(sorters, defaultDirection) {
  var items = this.items, keys = this.keys, indices = this.indices, ln = items.length, i, item, key;
  if (sorters) 
  {
    this.addSorters(sorters, defaultDirection);
    return this.items;
  }
  for (i = 0; i < ln; i++) 
    {
      items[i]._current_key = keys[i];
    }
  this.handleSort(items);
  for (i = 0; i < ln; i++) 
    {
      item = items[i];
      key = item._current_key;
      keys[i] = key;
      indices[key] = i;
      delete item._current_key;
    }
  this.dirtyIndices = true;
}, handleSort: function(items) {
  this.mixins.sortable.sort.call(this, items);
}, add: function(key, item) {
  var me = this, filtered = this.filtered, sorted = this.sorted, all = this.all, items = this.items, keys = this.keys, indices = this.indices, filterable = this.mixins.filterable, currentLength = items.length, index = currentLength;
  if (arguments.length == 1) 
  {
    item = key;
    key = me.getKey(item);
  }
  if (typeof key != 'undefined' && key !== null) 
  {
    if (typeof me.map[key] != 'undefined') 
    {
      return me.replace(key, item);
    }
    me.map[key] = item;
  }
  all.push(item);
  if (filtered && this.getAutoFilter() && filterable.isFiltered.call(me, item)) 
  {
    return null;
  }
  me.length++;
  if (sorted && this.getAutoSort()) 
  {
    index = this.findInsertionIndex(items, item);
  }
  if (index !== currentLength) 
  {
    this.dirtyIndices = true;
    Ext.Array.splice(keys, index, 0, key);
    Ext.Array.splice(items, index, 0, item);
  } else {
    indices[key] = currentLength;
    keys.push(key);
    items.push(item);
  }
  return item;
}, getKey: function(item) {
  return item.id;
}, replace: function(oldKey, item) {
  var me = this, sorted = me.sorted, filtered = me.filtered, filterable = me.mixins.filterable, items = me.items, keys = me.keys, all = me.all, map = me.map, returnItem = null, oldItemsLn = items.length, oldItem, index, newKey;
  if (arguments.length == 1) 
  {
    item = oldKey;
    oldKey = newKey = me.getKey(item);
  } else {
    newKey = me.getKey(item);
  }
  oldItem = map[oldKey];
  if (typeof oldKey == 'undefined' || oldKey === null || typeof oldItem == 'undefined') 
  {
    return me.add(newKey, item);
  }
  me.map[newKey] = item;
  if (newKey !== oldKey) 
  {
    delete me.map[oldKey];
  }
  if (sorted && me.getAutoSort()) 
  {
    Ext.Array.remove(items, oldItem);
    Ext.Array.remove(keys, oldKey);
    Ext.Array.remove(all, oldItem);
    all.push(item);
    me.dirtyIndices = true;
    if (filtered && me.getAutoFilter()) 
    {
      if (filterable.isFiltered.call(me, item)) 
      {
        if (oldItemsLn !== items.length) 
        {
          me.length--;
        }
        return null;
      } else if (oldItemsLn === items.length) 
      {
        me.length++;
        returnItem = item;
      }
    }
    index = this.findInsertionIndex(items, item);
    Ext.Array.splice(keys, index, 0, newKey);
    Ext.Array.splice(items, index, 0, item);
  } else {
    if (filtered) 
    {
      if (me.getAutoFilter() && filterable.isFiltered.call(me, item)) 
      {
        if (me.indexOf(oldItem) !== -1) 
        {
          Ext.Array.remove(items, oldItem);
          Ext.Array.remove(keys, oldKey);
          me.length--;
          me.dirtyIndices = true;
        }
        return null;
      } else if (me.indexOf(oldItem) === -1) 
      {
        items.push(item);
        keys.push(newKey);
        me.indices[newKey] = me.length;
        me.length++;
        return item;
      }
    }
    index = me.indexOf(oldItem);
    keys[index] = newKey;
    items[index] = item;
    if (newKey !== oldKey) 
    {
      this.dirtyIndices = true;
    }
  }
  return returnItem;
}, addAll: function(addItems) {
  var me = this, filtered = me.filtered, sorted = me.sorted, all = me.all, items = me.items, keys = me.keys, map = me.map, autoFilter = me.getAutoFilter(), autoSort = me.getAutoSort(), newKeys = [], newItems = [], filterable = me.mixins.filterable, addedItems = [], ln, key, i, item;
  if (Ext.isObject(addItems)) 
  {
    for (key in addItems) 
      {
        if (addItems.hasOwnProperty(key)) 
        {
          newItems.push(items[key]);
          newKeys.push(key);
        }
      }
  } else {
    newItems = addItems;
    ln = addItems.length;
    for (i = 0; i < ln; i++) 
      {
        newKeys.push(me.getKey(addItems[i]));
      }
  }
  for (i = 0; i < ln; i++) 
    {
      key = newKeys[i];
      item = newItems[i];
      if (typeof key != 'undefined' && key !== null) 
      {
        if (typeof map[key] != 'undefined') 
        {
          me.replace(key, item);
          continue;
        }
        map[key] = item;
      }
      all.push(item);
      if (filtered && autoFilter && filterable.isFiltered.call(me, item)) 
      {
        continue;
      }
      me.length++;
      keys.push(key);
      items.push(item);
      addedItems.push(item);
    }
  if (addedItems.length) 
  {
    me.dirtyIndices = true;
    if (sorted && autoSort) 
    {
      me.sort();
    }
    return addedItems;
  }
  return null;
}, each: function(fn, scope) {
  var items = this.items.slice(), i = 0, len = items.length, item;
  for (; i < len; i++) 
    {
      item = items[i];
      if (fn.call(scope || item, item, i, len) === false) 
      {
        break;
      }
    }
}, eachKey: function(fn, scope) {
  var keys = this.keys, items = this.items, ln = keys.length, i;
  for (i = 0; i < ln; i++) 
    {
      fn.call(scope || window, keys[i], items[i], i, ln);
    }
}, findBy: function(fn, scope) {
  var keys = this.keys, items = this.items, i = 0, len = items.length;
  for (; i < len; i++) 
    {
      if (fn.call(scope || window, items[i], keys[i])) 
      {
        return items[i];
      }
    }
  return null;
}, filterBy: function(fn, scope) {
  var me = this, newCollection = new this.self(), keys = me.keys, items = me.all, length = items.length, i;
  newCollection.getKey = me.getKey;
  for (i = 0; i < length; i++) 
    {
      if (fn.call(scope || me, items[i], me.getKey(items[i]))) 
      {
        newCollection.add(keys[i], items[i]);
      }
    }
  return newCollection;
}, insert: function(index, key, item) {
  var me = this, sorted = this.sorted, map = this.map, filtered = this.filtered;
  if (arguments.length == 2) 
  {
    item = key;
    key = me.getKey(item);
  }
  if (index >= me.length || (sorted && me.getAutoSort())) 
  {
    return me.add(key, item);
  }
  if (typeof key != 'undefined' && key !== null) 
  {
    if (typeof map[key] != 'undefined') 
    {
      me.replace(key, item);
      return false;
    }
    map[key] = item;
  }
  this.all.push(item);
  if (filtered && this.getAutoFilter() && this.mixins.filterable.isFiltered.call(me, item)) 
  {
    return null;
  }
  me.length++;
  Ext.Array.splice(me.items, index, 0, item);
  Ext.Array.splice(me.keys, index, 0, key);
  me.dirtyIndices = true;
  return item;
}, insertAll: function(index, insertItems) {
  if (index >= this.items.length || (this.sorted && this.getAutoSort())) 
  {
    return this.addAll(insertItems);
  }
  var me = this, filtered = this.filtered, sorted = this.sorted, all = this.all, items = this.items, keys = this.keys, map = this.map, autoFilter = this.getAutoFilter(), autoSort = this.getAutoSort(), newKeys = [], newItems = [], addedItems = [], filterable = this.mixins.filterable, insertedUnfilteredItem = false, ln, key, i, item;
  if (sorted && this.getAutoSort()) 
  {
  }
  if (Ext.isObject(insertItems)) 
  {
    for (key in insertItems) 
      {
        if (insertItems.hasOwnProperty(key)) 
        {
          newItems.push(items[key]);
          newKeys.push(key);
        }
      }
  } else {
    newItems = insertItems;
    ln = insertItems.length;
    for (i = 0; i < ln; i++) 
      {
        newKeys.push(me.getKey(insertItems[i]));
      }
  }
  for (i = 0; i < ln; i++) 
    {
      key = newKeys[i];
      item = newItems[i];
      if (typeof key != 'undefined' && key !== null) 
      {
        if (typeof map[key] != 'undefined') 
        {
          me.replace(key, item);
          continue;
        }
        map[key] = item;
      }
      all.push(item);
      if (filtered && autoFilter && filterable.isFiltered.call(me, item)) 
      {
        continue;
      }
      me.length++;
      Ext.Array.splice(items, index + i, 0, item);
      Ext.Array.splice(keys, index + i, 0, key);
      insertedUnfilteredItem = true;
      addedItems.push(item);
    }
  if (insertedUnfilteredItem) 
  {
    this.dirtyIndices = true;
    if (sorted && autoSort) 
    {
      this.sort();
    }
    return addedItems;
  }
  return null;
}, remove: function(item) {
  var index = this.items.indexOf(item);
  if (index === -1) 
  {
    Ext.Array.remove(this.all, item);
    if (typeof this.getKey == 'function') 
    {
      var key = this.getKey(item);
      if (key !== undefined) 
      {
        delete this.map[key];
      }
    }
    return item;
  }
  return this.removeAt(this.items.indexOf(item));
}, removeAll: function(items) {
  if (items) 
  {
    var ln = items.length, i;
    for (i = 0; i < ln; i++) 
      {
        this.remove(items[i]);
      }
  }
  return this;
}, removeAt: function(index) {
  var me = this, items = me.items, keys = me.keys, all = me.all, item, key;
  if (index < me.length && index >= 0) 
  {
    item = items[index];
    key = keys[index];
    if (typeof key != 'undefined') 
    {
      delete me.map[key];
    }
    Ext.Array.erase(items, index, 1);
    Ext.Array.erase(keys, index, 1);
    Ext.Array.remove(all, item);
    delete me.indices[key];
    me.length--;
    this.dirtyIndices = true;
    return item;
  }
  return false;
}, removeAtKey: function(key) {
  return this.removeAt(this.indexOfKey(key));
}, getCount: function() {
  return this.length;
}, indexOf: function(item) {
  if (this.dirtyIndices) 
  {
    this.updateIndices();
  }
  var index = item ? this.indices[this.getKey(item)] : -1;
  return (index === undefined) ? -1 : index;
}, indexOfKey: function(key) {
  if (this.dirtyIndices) 
  {
    this.updateIndices();
  }
  var index = this.indices[key];
  return (index === undefined) ? -1 : index;
}, updateIndices: function() {
  var items = this.items, ln = items.length, indices = this.indices = {}, i, item, key;
  for (i = 0; i < ln; i++) 
    {
      item = items[i];
      key = this.getKey(item);
      indices[key] = i;
    }
  this.dirtyIndices = false;
}, get: function(key) {
  var me = this, fromMap = me.map[key], item;
  if (fromMap !== undefined) 
  {
    item = fromMap;
  } else if (typeof key == 'number') 
  {
    item = me.items[key];
  }
  return typeof item != 'function' || me.getAllowFunctions() ? item : null;
}, getAt: function(index) {
  return this.items[index];
}, getByKey: function(key) {
  return this.map[key];
}, contains: function(item) {
  var key = this.getKey(item);
  if (key) 
  {
    return this.containsKey(key);
  } else {
    return Ext.Array.contains(this.items, item);
  }
}, containsKey: function(key) {
  return typeof this.map[key] != 'undefined';
}, clear: function() {
  var me = this;
  me.length = 0;
  me.items.length = 0;
  me.keys.length = 0;
  me.all.length = 0;
  me.dirtyIndices = true;
  me.indices = {};
  me.map = {};
}, first: function() {
  return this.items[0];
}, last: function() {
  return this.items[this.length - 1];
}, getRange: function(start, end) {
  var me = this, items = me.items, range = [], i;
  if (items.length < 1) 
  {
    return range;
  }
  start = start || 0;
  end = Math.min(typeof end == 'undefined' ? me.length - 1 : end, me.length - 1);
  if (start <= end) 
  {
    for (i = start; i <= end; i++) 
      {
        range[range.length] = items[i];
      }
  } else {
    for (i = start; i >= end; i--) 
      {
        range[range.length] = items[i];
      }
  }
  return range;
}, findIndexBy: function(fn, scope, start) {
  var me = this, keys = me.keys, items = me.items, i = start || 0, ln = items.length;
  for (; i < ln; i++) 
    {
      if (fn.call(scope || me, items[i], keys[i])) 
      {
        return i;
      }
    }
  return -1;
}, clone: function() {
  var me = this, copy = new this.self(), keys = me.keys, items = me.items, i = 0, ln = items.length;
  for (; i < ln; i++) 
    {
      copy.add(keys[i], items[i]);
    }
  copy.getKey = me.getKey;
  return copy;
}, destroy: function() {
  this.callSuper();
  this.clear();
}});

Ext.define('Ext.data.Operation', {config: {synchronous: true, action: null, filters: null, sorters: null, grouper: null, start: null, limit: null, batch: null, callback: null, scope: null, resultSet: null, records: null, request: null, response: null, withCredentials: null, params: null, url: null, page: null, node: null, model: undefined, addRecords: false}, started: false, running: false, complete: false, success: undefined, exception: false, error: undefined, constructor: function(config) {
  this.initConfig(config);
}, applyModel: function(model) {
  if (typeof model == 'string') 
  {
    model = Ext.data.ModelManager.getModel(model);
    if (!model) 
    {
      Ext.Logger.error('Model with name ' + arguments[0] + ' doesnt exist.');
    }
  }
  if (model && !model.prototype.isModel && Ext.isObject(model)) 
  {
    model = Ext.data.ModelManager.registerType(model.storeId || model.id || Ext.id(), model);
  }
  return model;
}, getRecords: function() {
  var resultSet = this.getResultSet();
  return this._records || (resultSet ? resultSet.getRecords() : []);
}, setStarted: function() {
  this.started = true;
  this.running = true;
}, setCompleted: function() {
  this.complete = true;
  this.running = false;
}, setSuccessful: function() {
  this.success = true;
}, setException: function(error) {
  this.exception = true;
  this.success = false;
  this.running = false;
  this.error = error;
}, hasException: function() {
  return this.exception === true;
}, getError: function() {
  return this.error;
}, isStarted: function() {
  return this.started === true;
}, isRunning: function() {
  return this.running === true;
}, isComplete: function() {
  return this.complete === true;
}, wasSuccessful: function() {
  return this.isComplete() && this.success === true;
}, allowWrite: function() {
  return this.getAction() != 'read';
}, process: function(action, resultSet, request, response) {
  if (resultSet.getSuccess() !== false) 
  {
    this.setResponse(response);
    this.setResultSet(resultSet);
    this.setCompleted();
    this.setSuccessful();
  } else {
    this.setResponse(response);
    this.setResultSet(resultSet);
    return false;
  }
  return this['process' + Ext.String.capitalize(action)].call(this, resultSet, request, response);
}, processRead: function(resultSet) {
  var records = resultSet.getRecords(), processedRecords = [], Model = this.getModel(), ln = records.length, i, record;
  for (i = 0; i < ln; i++) 
    {
      record = records[i];
      processedRecords.push(new Model(record.data, record.id, record.node));
    }
  this.setRecords(processedRecords);
  resultSet.setRecords(processedRecords);
  return true;
}, processCreate: function(resultSet) {
  var updatedRecords = resultSet.getRecords(), currentRecords = this.getRecords(), ln = updatedRecords.length, i, currentRecord, updatedRecord;
  for (i = 0; i < ln; i++) 
    {
      updatedRecord = updatedRecords[i];
      if (updatedRecord.clientId === null && currentRecords.length == 1 && updatedRecords.length == 1) 
      {
        currentRecord = currentRecords[i];
      } else {
        currentRecord = this.findCurrentRecord(updatedRecord.clientId);
      }
      if (currentRecord) 
      {
        this.updateRecord(currentRecord, updatedRecord);
      }
    }
  return true;
}, processUpdate: function(resultSet) {
  var updatedRecords = resultSet.getRecords(), currentRecords = this.getRecords(), ln = updatedRecords.length, i, currentRecord, updatedRecord;
  for (i = 0; i < ln; i++) 
    {
      updatedRecord = updatedRecords[i];
      currentRecord = currentRecords[i];
      if (currentRecord) 
      {
        this.updateRecord(currentRecord, updatedRecord);
      }
    }
  return true;
}, processDestroy: function(resultSet) {
  var updatedRecords = resultSet.getRecords(), ln = updatedRecords.length, i, currentRecord, updatedRecord;
  for (i = 0; i < ln; i++) 
    {
      updatedRecord = updatedRecords[i];
      currentRecord = this.findCurrentRecord(updatedRecord.id);
      if (currentRecord) 
      {
        currentRecord.setIsErased(true);
        currentRecord.notifyStores('afterErase', currentRecord);
      }
    }
}, findCurrentRecord: function(clientId) {
  var currentRecords = this.getRecords(), ln = currentRecords.length, i, currentRecord;
  for (i = 0; i < ln; i++) 
    {
      currentRecord = currentRecords[i];
      if (currentRecord.getId() === clientId) 
      {
        return currentRecord;
      }
    }
}, updateRecord: function(currentRecord, updatedRecord) {
  var recordData = updatedRecord.data, recordId = updatedRecord.id;
  currentRecord.beginEdit();
  currentRecord.set(recordData);
  if (recordId !== null) 
  {
    currentRecord.setId(recordId);
  }
  currentRecord.endEdit(true);
  currentRecord.commit();
}});

Ext.define('Ext.data.ResultSet', {config: {loaded: true, count: null, total: null, success: false, records: null, message: null}, constructor: function(config) {
  this.initConfig(config);
}, applyCount: function(count) {
  if (!count && count !== 0) 
  {
    return this.getRecords().length;
  }
  return count;
}, updateRecords: function(records) {
  this.setCount(records.length);
}});

Ext.define('Ext.data.reader.Reader', {alternateClassName: ['Ext.data.Reader', 'Ext.data.DataReader'], mixins: ['Ext.mixin.Observable'], isReader: true, config: {idProperty: undefined, clientIdProperty: 'clientId', totalProperty: 'total', successProperty: 'success', messageProperty: null, rootProperty: '', implicitIncludes: true, model: undefined}, constructor: function(config) {
  this.initConfig(config);
}, fieldCount: 0, applyModel: function(model) {
  if (typeof model == 'string') 
  {
    model = Ext.data.ModelManager.getModel(model);
    if (!model) 
    {
      Ext.Logger.error('Model with name ' + arguments[0] + ' doesnt exist.');
    }
  }
  if (model && !model.prototype.isModel && Ext.isObject(model)) 
  {
    model = Ext.data.ModelManager.registerType(model.storeId || model.id || Ext.id(), model);
  }
  return model;
}, applyIdProperty: function(idProperty) {
  if (!idProperty && this.getModel()) 
  {
    idProperty = this.getModel().getIdProperty();
  }
  return idProperty;
}, updateModel: function(model) {
  if (model) 
  {
    if (!this.getIdProperty()) 
    {
      this.setIdProperty(model.getIdProperty());
    }
    this.buildExtractors();
  }
}, createAccessor: Ext.emptyFn, createFieldAccessExpression: function() {
  return 'undefined';
}, buildExtractors: function() {
  if (!this.getModel()) 
  {
    return;
  }
  var me = this, totalProp = me.getTotalProperty(), successProp = me.getSuccessProperty(), messageProp = me.getMessageProperty();
  if (totalProp) 
  {
    me.getTotal = me.createAccessor(totalProp);
  }
  if (successProp) 
  {
    me.getSuccess = me.createAccessor(successProp);
  }
  if (messageProp) 
  {
    me.getMessage = me.createAccessor(messageProp);
  }
  me.extractRecordData = me.buildRecordDataExtractor();
}, buildRecordDataExtractor: function() {
  var me = this, model = me.getModel(), fields = model.getFields(), ln = fields.length, fieldVarName = [], clientIdProp = me.getModel().getClientIdProperty(), prefix = '__field', code = ['var me = this,\n', '    fields = me.getModel().getFields(),\n', '    idProperty = me.getIdProperty(),\n', '    idPropertyIsFn = (typeof idProperty == "function"),', '    value,\n', '    internalId'], i, field, varName, fieldName;
  fields = fields.items;
  for (i = 0; i < ln; i++) 
    {
      field = fields[i];
      fieldName = field.getName();
      if (fieldName === model.getIdProperty()) 
      {
        fieldVarName[i] = 'idField';
      } else {
        fieldVarName[i] = prefix + i;
      }
      code.push(',\n    ', fieldVarName[i], ' = fields.get("', field.getName(), '")');
    }
  code.push(';\n\n    return function(source) {\n        var dest = {};\n');
  code.push('        if (idPropertyIsFn) {\n');
  code.push('            idField.setMapping(idProperty);\n');
  code.push('        }\n');
  for (i = 0; i < ln; i++) 
    {
      field = fields[i];
      varName = fieldVarName[i];
      fieldName = field.getName();
      if (fieldName === model.getIdProperty() && field.getMapping() === null && model.getIdProperty() !== this.getIdProperty()) 
      {
        field.setMapping(this.getIdProperty());
      }
      code.push('        try {\n');
      code.push('            value = ', me.createFieldAccessExpression(field, varName, 'source'), ';\n');
      code.push('            if (value !== undefined) {\n');
      code.push('                dest["' + field.getName() + '"] = value;\n');
      code.push('            }\n');
      code.push('        } catch(e){}\n');
    }
  if (clientIdProp) 
  {
    code.push('        internalId = ' + me.createFieldAccessExpression(Ext.create('Ext.data.Field', {name: clientIdProp}), null, 'source') + ';\n');
    code.push('        if (internalId !== undefined) {\n');
    code.push('            dest["_clientId"] = internalId;\n        }\n');
  }
  code.push('        return dest;\n');
  code.push('    };');
  return Ext.functionFactory(code.join('')).call(me);
}, getFields: function() {
  return this.getModel().getFields().items;
}, getData: function(data) {
  return data;
}, getResponseData: function(response) {
  return response;
}, getRoot: function(data) {
  return data;
}, read: function(response) {
  var data = response, Model = this.getModel(), resultSet, records, i, ln, record;
  if (response) 
  {
    data = this.getResponseData(response);
  }
  if (data) 
  {
    resultSet = this.readRecords(data);
    records = resultSet.getRecords();
    for (i = 0 , ln = records.length; i < ln; i++) 
      {
        record = records[i];
        records[i] = new Model(record.data, record.id, record.node);
      }
    return resultSet;
  } else {
    return this.nullResultSet;
  }
}, process: function(response) {
  var data = response;
  if (response) 
  {
    data = this.getResponseData(response);
  }
  if (data) 
  {
    return this.readRecords(data);
  } else {
    return this.nullResultSet;
  }
}, readRecords: function(data) {
  var me = this;
  me.rawData = data;
  data = me.getData(data);
  if (data.metaData) 
  {
    me.onMetaChange(data.metaData);
  }
  var isArray = Ext.isArray(data), root = isArray ? data : me.getRoot(data), success = true, recordCount = 0, total, value, records, message;
  if (isArray && Ext.isEmpty(data.length)) 
  {
    return me.nullResultSet;
  }
  if (me.getTotal) 
  {
    value = parseInt(me.getTotal(data), 10);
    if (!isNaN(value)) 
    {
      total = value;
    }
  }
  if (me.getSuccess) 
  {
    value = me.getSuccess(data);
    if (value === false || value === 'false') 
    {
      success = false;
    }
  }
  if (me.getMessage) 
  {
    message = me.getMessage(data);
  }
  if (root) 
  {
    records = me.extractData(root);
    recordCount = records.length;
  } else {
    recordCount = 0;
    records = [];
  }
  return new Ext.data.ResultSet({total: total, count: recordCount, records: records, success: success, message: message});
}, extractData: function(root) {
  var me = this, records = [], length = root.length, model = me.getModel(), idProperty = model.getIdProperty(), fieldsCollection = model.getFields(), node, i, data, id, clientId;
  if (fieldsCollection.isDirty) 
  {
    me.buildExtractors(true);
    delete fieldsCollection.isDirty;
  }
  if (!root.length && Ext.isObject(root)) 
  {
    root = [root];
    length = 1;
  }
  for (i = 0; i < length; i++) 
    {
      clientId = null;
      id = null;
      node = root[i];
      if (node.isModel) 
      {
        data = node.data;
      } else {
        data = me.extractRecordData(node);
      }
      if (data._clientId !== undefined) 
      {
        clientId = data._clientId;
        delete data._clientId;
      }
      if (data[idProperty] !== undefined) 
      {
        id = data[idProperty];
      }
      if (me.getImplicitIncludes()) 
      {
        me.readAssociated(data, node);
      }
      records.push({clientId: clientId, id: id, data: data, node: node});
    }
  return records;
}, readAssociated: function(record, data) {
  var associations = this.getModel().associations.items, length = associations.length, i = 0, association, associationData, associationKey;
  for (; i < length; i++) 
    {
      association = associations[i];
      associationKey = association.getAssociationKey();
      associationData = this.getAssociatedDataRoot(data, associationKey);
      if (associationData) 
      {
        record[associationKey] = associationData;
      }
    }
}, getAssociatedDataRoot: function(data, associationName) {
  var re = /[\[\.]/, i = String(associationName).search(re);
  if (i >= 0) 
  {
    return Ext.functionFactory('obj', 'return obj' + (i > 0 ? '.' : '') + associationName)(data);
  }
  return data[associationName];
}, onMetaChange: function(meta) {
  var fields = meta.fields, me = this, newModel, config, idProperty;
  me.metaData = meta;
  if (meta.rootProperty !== undefined) 
  {
    me.setRootProperty(meta.rootProperty);
  } else if (meta.root !== undefined) 
  {
    me.setRootProperty(meta.root);
  }
  if (meta.idProperty !== undefined) 
  {
    me.setIdProperty(meta.idProperty);
  }
  if (meta.totalProperty !== undefined) 
  {
    me.setTotalProperty(meta.totalProperty);
  }
  if (meta.successProperty !== undefined) 
  {
    me.setSuccessProperty(meta.successProperty);
  }
  if (meta.messageProperty !== undefined) 
  {
    me.setMessageProperty(meta.messageProperty);
  }
  if (fields) 
  {
    if (me.getModel()) 
    {
      me.getModel().setFields(fields);
      me.buildExtractors();
    } else {
      idProperty = me.getIdProperty();
      config = {fields: fields};
      if (idProperty) 
      {
        config.idProperty = idProperty;
      }
      newModel = Ext.define("Ext.data.reader.MetaModel" + Ext.id(), {extend: 'Ext.data.Model', config: config});
      me.setModel(newModel);
    }
  } else {
    me.buildExtractors();
  }
}}, function() {
  Ext.apply(this.prototype, {nullResultSet: new Ext.data.ResultSet({total: 0, count: 0, records: [], success: false})});
});

Ext.define('Ext.data.reader.Json', {extend: 'Ext.data.reader.Reader', alternateClassName: 'Ext.data.JsonReader', alias: 'reader.json', config: {record: null, useSimpleAccessors: false}, objectRe: /[\[\.]/, getResponseData: function(response) {
  var responseText = response;
  if (response && response.responseText) 
  {
    responseText = response.responseText;
  }
  if (typeof responseText !== 'string') 
  {
    return responseText;
  }
  var data;
  try {
    data = Ext.decode(responseText);
  }  catch (ex) {
  this.fireEvent('exception', this, response, 'Unable to parse the JSON returned by the server: ' + ex.toString());
  Ext.Logger.warn('Unable to parse the JSON returned by the server: ' + ex.toString());
}
  return data;
}, buildExtractors: function() {
  var me = this, root = me.getRootProperty();
  me.callParent(arguments);
  if (root) 
  {
    me.rootAccessor = me.createAccessor(root);
  } else {
    delete me.rootAccessor;
  }
}, getRoot: function(data) {
  var fieldsCollection = this.getModel().getFields();
  if (fieldsCollection.isDirty) 
  {
    this.buildExtractors(true);
    delete fieldsCollection.isDirty;
  }
  if (this.rootAccessor) 
  {
    return this.rootAccessor.call(this, data);
  } else {
    return data;
  }
}, extractData: function(root) {
  var recordName = this.getRecord(), data = [], length, i;
  if (recordName) 
  {
    length = root.length;
    if (!length && Ext.isObject(root)) 
    {
      length = 1;
      root = [root];
    }
    for (i = 0; i < length; i++) 
      {
        data[i] = root[i][recordName];
      }
  } else {
    data = root;
  }
  return this.callParent([data]);
}, createAccessor: function() {
  var re = /[\[\.]/;
  return function(expr) {
  if (Ext.isEmpty(expr)) 
  {
    return Ext.emptyFn;
  }
  if (Ext.isFunction(expr)) 
  {
    return expr;
  }
  if (this.getUseSimpleAccessors() !== true) 
  {
    var i = String(expr).search(re);
    if (i >= 0) 
    {
      return Ext.functionFactory('obj', 'var value; try {value = obj' + (i > 0 ? '.' : '') + expr + '} catch(e) {}; return value;');
    }
  }
  return function(obj) {
  return obj[expr];
};
};
}(), createFieldAccessExpression: function(field, fieldVarName, dataName) {
  var me = this, re = me.objectRe, hasMap = (field.getMapping() !== null), map = hasMap ? field.getMapping() : field.getName(), result, operatorSearch;
  if (typeof map === 'function') 
  {
    result = fieldVarName + '.getMapping()(' + dataName + ', this)';
  } else if (me.getUseSimpleAccessors() === true || ((operatorSearch = String(map).search(re)) < 0)) 
  {
    if (!hasMap || isNaN(map)) 
    {
      map = '"' + map + '"';
    }
    result = dataName + "[" + map + "]";
  } else {
    result = dataName + (operatorSearch > 0 ? '.' : '') + map;
  }
  return result;
}});

Ext.define('Ext.data.writer.Writer', {alias: 'writer.base', alternateClassName: ['Ext.data.DataWriter', 'Ext.data.Writer'], config: {writeAllFields: true, nameProperty: 'name'}, constructor: function(config) {
  this.initConfig(config);
}, write: function(request) {
  var operation = request.getOperation(), records = operation.getRecords() || [], len = records.length, i = 0, data = [];
  for (; i < len; i++) 
    {
      data.push(this.getRecordData(records[i]));
    }
  return this.writeRecords(request, data);
}, writeDate: function(field, date) {
  if (!date) 
  {
    return null;
  }
  var dateFormat = field.getDateFormat() || 'timestamp';
  switch (dateFormat) {
    case 'timestamp':
      return date.getTime() / 1000;
    case 'time':
      return date.getTime();
    default:
      return Ext.Date.format(date, dateFormat);
  }
}, getRecordData: function(record) {
  var isPhantom = record.phantom === true, writeAll = this.getWriteAllFields() || isPhantom, nameProperty = this.getNameProperty(), fields = record.getFields(), data = {}, changes, name, field, key, value;
  if (writeAll) 
  {
    fields.each(function(field) {
  if (field.getPersist()) 
  {
    name = field.config[nameProperty] || field.getName();
    value = record.get(field.getName());
    if (field.getType().type == 'date') 
    {
      value = this.writeDate(field, value);
    }
    data[name] = value;
  }
}, this);
  } else {
    changes = record.getChanges();
    for (key in changes) 
      {
        if (changes.hasOwnProperty(key)) 
        {
          field = fields.get(key);
          if (field.getPersist()) 
          {
            name = field.config[nameProperty] || field.getName();
            value = changes[key];
            if (field.getType().type == 'date') 
            {
              value = this.writeDate(field, value);
            }
            data[name] = value;
          }
        }
      }
    if (!isPhantom) 
    {
      data[record.getIdProperty()] = record.getId();
    }
  }
  return data;
}});

Ext.define('Ext.data.writer.Json', {extend: 'Ext.data.writer.Writer', alternateClassName: 'Ext.data.JsonWriter', alias: 'writer.json', config: {rootProperty: undefined, encode: false, allowSingle: true, encodeRequest: false}, applyRootProperty: function(root) {
  if (!root && (this.getEncode() || this.getEncodeRequest())) 
  {
    root = 'data';
  }
  return root;
}, writeRecords: function(request, data) {
  var root = this.getRootProperty(), params = request.getParams(), allowSingle = this.getAllowSingle(), jsonData;
  if (this.getAllowSingle() && data && data.length == 1) 
  {
    data = data[0];
  }
  if (this.getEncodeRequest()) 
  {
    jsonData = request.getJsonData() || {};
    if (data && (data.length || (allowSingle && Ext.isObject(data)))) 
    {
      jsonData[root] = data;
    }
    request.setJsonData(Ext.apply(jsonData, params || {}));
    request.setParams(null);
    request.setMethod('POST');
    return request;
  }
  if (!data || !(data.length || (allowSingle && Ext.isObject(data)))) 
  {
    return request;
  }
  if (this.getEncode()) 
  {
    if (root) 
    {
      params[root] = Ext.encode(data);
    } else {
    }
  } else {
    jsonData = request.getJsonData() || {};
    if (root) 
    {
      jsonData[root] = data;
    } else {
      jsonData = data;
    }
    request.setJsonData(jsonData);
  }
  return request;
}});

Ext.define('Ext.data.Batch', {mixins: {observable: 'Ext.mixin.Observable'}, config: {autoStart: false, pauseOnException: true, proxy: null}, current: -1, total: 0, isRunning: false, isComplete: false, hasException: false, constructor: function(config) {
  var me = this;
  me.initConfig(config);
  me.operations = [];
}, add: function(operation) {
  this.total++;
  operation.setBatch(this);
  this.operations.push(operation);
}, start: function() {
  this.hasException = false;
  this.isRunning = true;
  this.runNextOperation();
}, runNextOperation: function() {
  this.runOperation(this.current + 1);
}, pause: function() {
  this.isRunning = false;
}, runOperation: function(index) {
  var me = this, operations = me.operations, operation = operations[index], onProxyReturn;
  if (operation === undefined) 
  {
    me.isRunning = false;
    me.isComplete = true;
    me.fireEvent('complete', me, operations[operations.length - 1]);
  } else {
    me.current = index;
    onProxyReturn = function(operation) {
  var hasException = operation.hasException();
  if (hasException) 
  {
    me.hasException = true;
    me.fireEvent('exception', me, operation);
  } else {
    me.fireEvent('operationcomplete', me, operation);
  }
  if (hasException && me.getPauseOnException()) 
  {
    me.pause();
  } else {
    operation.setCompleted();
    me.runNextOperation();
  }
};
    operation.setStarted();
    me.getProxy()[operation.getAction()](operation, onProxyReturn, me);
  }
}});

Ext.define('Ext.data.proxy.Proxy', {extend: 'Ext.Evented', alias: 'proxy.proxy', alternateClassName: ['Ext.data.DataProxy', 'Ext.data.Proxy'], config: {batchOrder: 'create,update,destroy', batchActions: true, model: null, reader: {type: 'json'}, writer: {type: 'json'}}, isProxy: true, applyModel: function(model) {
  if (typeof model == 'string') 
  {
    model = Ext.data.ModelManager.getModel(model);
    if (!model) 
    {
      Ext.Logger.error('Model with name ' + arguments[0] + ' doesnt exist.');
    }
  }
  if (model && !model.prototype.isModel && Ext.isObject(model)) 
  {
    model = Ext.data.ModelManager.registerType(model.storeId || model.id || Ext.id(), model);
  }
  return model;
}, updateModel: function(model) {
  if (model) 
  {
    var reader = this.getReader();
    if (reader && !reader.getModel()) 
    {
      reader.setModel(model);
    }
  }
}, applyReader: function(reader, currentReader) {
  return Ext.factory(reader, Ext.data.Reader, currentReader, 'reader');
}, updateReader: function(reader) {
  if (reader) 
  {
    var model = this.getModel();
    if (!model) 
    {
      model = reader.getModel();
      if (model) 
      {
        this.setModel(model);
      }
    } else {
      reader.setModel(model);
    }
    if (reader.onMetaChange) 
    {
      reader.onMetaChange = Ext.Function.createSequence(reader.onMetaChange, this.onMetaChange, this);
    }
  }
}, onMetaChange: function(data) {
  var model = this.getReader().getModel();
  if (!this.getModel() && model) 
  {
    this.setModel(model);
  }
  this.fireEvent('metachange', this, data);
}, applyWriter: function(writer, currentWriter) {
  return Ext.factory(writer, Ext.data.Writer, currentWriter, 'writer');
}, create: Ext.emptyFn, read: Ext.emptyFn, update: Ext.emptyFn, destroy: Ext.emptyFn, onDestroy: function() {
  Ext.destroy(this.getReader(), this.getWriter());
  Ext.Evented.prototype.destroy.apply(this, arguments);
}, batch: function(options, listeners) {
  var me = this, useBatch = me.getBatchActions(), model = me.getModel(), batch, records;
  if (options.operations === undefined) 
  {
    options = {operations: options, listeners: listeners};
  }
  if (options.batch && options.batch.isBatch) 
  {
    batch = options.batch;
  } else {
    batch = new Ext.data.Batch(options.batch || {});
  }
  batch.setProxy(me);
  batch.on('complete', Ext.bind(me.onBatchComplete, me, [options], 0));
  if (options.listeners) 
  {
    batch.on(options.listeners);
  }
  Ext.each(me.getBatchOrder().split(','), function(action) {
  records = options.operations[action];
  if (records) 
  {
    if (useBatch) 
    {
      batch.add(new Ext.data.Operation({action: action, records: records, model: model}));
    } else {
      Ext.each(records, function(record) {
  batch.add(new Ext.data.Operation({action: action, records: [record], model: model}));
});
    }
  }
}, me);
  batch.start();
  return batch;
}, onBatchComplete: function(batchOptions, batch) {
  var scope = batchOptions.scope || this;
  if (batch.hasException) 
  {
    if (Ext.isFunction(batchOptions.failure)) 
    {
      Ext.callback(batchOptions.failure, scope, [batch, batchOptions]);
    }
  } else if (Ext.isFunction(batchOptions.success)) 
  {
    Ext.callback(batchOptions.success, scope, [batch, batchOptions]);
  }
  if (Ext.isFunction(batchOptions.callback)) 
  {
    Ext.callback(batchOptions.callback, scope, [batch, batchOptions]);
  }
  Ext.destroy(batch);
}}, function() {
});

Ext.define('Ext.data.proxy.Client', {extend: 'Ext.data.proxy.Proxy', alternateClassName: 'Ext.proxy.ClientProxy', clear: function() {
}});

Ext.define('Ext.data.proxy.Memory', {extend: 'Ext.data.proxy.Client', alias: 'proxy.memory', alternateClassName: 'Ext.data.MemoryProxy', isMemoryProxy: true, config: {data: []}, finishOperation: function(operation, callback, scope) {
  if (operation) 
  {
    var i = 0, recs = operation.getRecords(), len = recs.length;
    for (i; i < len; i++) 
      {
        recs[i].commit();
      }
    operation.setCompleted();
    operation.setSuccessful();
    Ext.callback(callback, scope || this, [operation]);
  }
}, create: function() {
  this.finishOperation.apply(this, arguments);
}, update: function() {
  this.finishOperation.apply(this, arguments);
}, destroy: function() {
  this.finishOperation.apply(this, arguments);
}, read: function(operation, callback, scope) {
  var me = this, reader = me.getReader();
  if (operation.process('read', reader.process(me.getData())) === false) 
  {
    this.fireEvent('exception', this, null, operation);
  }
  Ext.callback(callback, scope || me, [operation]);
}, clear: Ext.emptyFn});

Ext.define('Ext.data.SortTypes', {singleton: true, stripTagsRE: /<\/?[^>]+>/gi, none: function(value) {
  return value;
}, asText: function(value) {
  return String(value).replace(this.stripTagsRE, "");
}, asUCText: function(value) {
  return String(value).toUpperCase().replace(this.stripTagsRE, "");
}, asUCString: function(value) {
  return String(value).toUpperCase();
}, asDate: function(value) {
  if (!value) 
  {
    return 0;
  }
  if (Ext.isDate(value)) 
  {
    return value.getTime();
  }
  return Date.parse(String(value));
}, asFloat: function(value) {
  value = parseFloat(String(value).replace(/,/g, ""));
  return isNaN(value) ? 0 : value;
}, asInt: function(value) {
  value = parseInt(String(value).replace(/,/g, ""), 10);
  return isNaN(value) ? 0 : value;
}});

Ext.define('Ext.data.Types', {singleton: true, stripRe: /[\$,%]/g, dashesRe: /-/g, iso8601TestRe: /\d\dT\d\d/, iso8601SplitRe: /[- :T\.Z\+]/}, function() {
  var Types = this, sortTypes = Ext.data.SortTypes;
  Ext.apply(Types, {AUTO: {convert: function(value) {
  return value;
}, sortType: sortTypes.none, type: 'auto'}, STRING: {convert: function(value) {
  return (value === undefined || value === null) ? (this.getAllowNull() ? null : '') : String(value);
}, sortType: sortTypes.asUCString, type: 'string'}, INT: {convert: function(value) {
  return (value !== undefined && value !== null && value !== '') ? ((typeof value === 'number') ? parseInt(value, 10) : parseInt(String(value).replace(Types.stripRe, ''), 10)) : (this.getAllowNull() ? null : 0);
}, sortType: sortTypes.none, type: 'int'}, FLOAT: {convert: function(value) {
  return (value !== undefined && value !== null && value !== '') ? ((typeof value === 'number') ? value : parseFloat(String(value).replace(Types.stripRe, ''), 10)) : (this.getAllowNull() ? null : 0);
}, sortType: sortTypes.none, type: 'float'}, BOOL: {convert: function(value) {
  if ((value === undefined || value === null || value === '') && this.getAllowNull()) 
  {
    return null;
  }
  return value !== 'false' && value !== '0' && !!value;
}, sortType: sortTypes.none, type: 'bool'}, DATE: {convert: function(value) {
  var dateFormat = this.getDateFormat(), parsed;
  if (!value) 
  {
    return null;
  }
  if (Ext.isDate(value)) 
  {
    return value;
  }
  if (dateFormat) 
  {
    if (dateFormat == 'timestamp') 
    {
      return new Date(value * 1000);
    }
    if (dateFormat == 'time') 
    {
      return new Date(parseInt(value, 10));
    }
    return Ext.Date.parse(value, dateFormat);
  }
  parsed = new Date(Date.parse(value));
  if (isNaN(parsed)) 
  {
    if (Types.iso8601TestRe.test(value)) 
    {
      parsed = value.split(Types.iso8601SplitRe);
      parsed = new Date(parsed[0], parsed[1] - 1, parsed[2], parsed[3], parsed[4], parsed[5]);
    }
    if (isNaN(parsed)) 
    {
      parsed = new Date(Date.parse(value.replace(Types.dashesRe, "/")));
    }
  }
  return isNaN(parsed) ? null : parsed;
}, sortType: sortTypes.asDate, type: 'date'}});
  Ext.apply(Types, {BOOLEAN: this.BOOL, INTEGER: this.INT, NUMBER: this.FLOAT});
});

Ext.define('Ext.data.Field', {alias: 'data.field', isField: true, config: {name: null, type: 'auto', convert: undefined, dateFormat: null, allowNull: true, defaultValue: undefined, mapping: null, sortType: undefined, sortDir: "ASC", allowBlank: true, persist: true, encode: null, decode: null, bubbleEvents: 'action'}, constructor: function(config) {
  if (Ext.isString(config)) 
  {
    config = {name: config};
  }
  this.initConfig(config);
}, applyType: function(type) {
  var types = Ext.data.Types, autoType = types.AUTO;
  if (type) 
  {
    if (Ext.isString(type)) 
    {
      return types[type.toUpperCase()] || autoType;
    } else {
      return type;
    }
  }
  return autoType;
}, updateType: function(newType, oldType) {
  var convert = this.getConvert();
  if (oldType && convert === oldType.convert) 
  {
    this.setConvert(newType.convert);
  }
}, applySortType: function(sortType) {
  var sortTypes = Ext.data.SortTypes, type = this.getType(), defaultSortType = type.sortType;
  if (sortType) 
  {
    if (Ext.isString(sortType)) 
    {
      return sortTypes[sortType] || defaultSortType;
    } else {
      return sortType;
    }
  }
  return defaultSortType;
}, applyConvert: function(convert) {
  var defaultConvert = this.getType().convert;
  if (convert && convert !== defaultConvert) 
  {
    this._hasCustomConvert = true;
    return convert;
  } else {
    this._hasCustomConvert = false;
    return defaultConvert;
  }
}, hasCustomConvert: function() {
  return this._hasCustomConvert;
}});

Ext.define('Ext.data.identifier.Simple', {alias: 'data.identifier.simple', statics: {AUTO_ID: 1}, config: {prefix: 'ext-record-'}, constructor: function(config) {
  this.initConfig(config);
}, generate: function(record) {
  return this._prefix + this.self.AUTO_ID++;
}});

Ext.define('Ext.data.ModelManager', {extend: 'Ext.AbstractManager', alternateClassName: ['Ext.ModelMgr', 'Ext.ModelManager'], singleton: true, modelNamespace: null, registerType: function(name, config) {
  var proto = config.prototype, model;
  if (proto && proto.isModel) 
  {
    model = config;
  } else {
    config = {extend: config.extend || 'Ext.data.Model', config: config};
    model = Ext.define(name, config);
  }
  this.types[name] = model;
  return model;
}, onModelDefined: Ext.emptyFn, getModel: function(id) {
  var model = id;
  if (typeof model == 'string') 
  {
    model = this.types[model];
    if (!model && this.modelNamespace) 
    {
      model = this.types[this.modelNamespace + '.' + model];
    }
  }
  return model;
}, create: function(config, name, id) {
  var con = typeof name == 'function' ? name : this.types[name || config.name];
  return new con(config, id);
}}, function() {
  Ext.regModel = function() {
  return this.ModelManager.registerType.apply(this.ModelManager, arguments);
};
});

Ext.define('Ext.data.Request', {config: {action: null, params: null, method: 'GET', url: null, operation: null, proxy: null, disableCaching: false, headers: {}, callbackKey: null, jsonP: null, jsonData: null, xmlData: null, withCredentials: null, username: null, password: null, callback: null, scope: null, timeout: 30000, records: null, directFn: null, args: null, useDefaultXhrHeader: null}, constructor: function(config) {
  this.initConfig(config);
}});

Ext.define('Ext.data.proxy.Server', {extend: 'Ext.data.proxy.Proxy', alias: 'proxy.server', alternateClassName: 'Ext.data.ServerProxy', config: {url: null, pageParam: 'page', startParam: 'start', limitParam: 'limit', groupParam: 'group', sortParam: 'sort', filterParam: 'filter', directionParam: 'dir', enablePagingParams: true, simpleSortMode: false, noCache: true, cacheString: "_dc", timeout: 30000, api: {create: undefined, read: undefined, update: undefined, destroy: undefined}, extraParams: {}}, constructor: function(config) {
  config = config || {};
  if (config.nocache !== undefined) 
  {
    config.noCache = config.nocache;
  }
  this.callParent([config]);
}, create: function() {
  return this.doRequest.apply(this, arguments);
}, read: function() {
  return this.doRequest.apply(this, arguments);
}, update: function() {
  return this.doRequest.apply(this, arguments);
}, destroy: function() {
  return this.doRequest.apply(this, arguments);
}, setExtraParam: function(name, value) {
  this.getExtraParams()[name] = value;
}, buildRequest: function(operation) {
  var me = this, params = Ext.applyIf(operation.getParams() || {}, me.getExtraParams() || {}), request;
  params = Ext.applyIf(params, me.getParams(operation));
  request = Ext.create('Ext.data.Request', {params: params, action: operation.getAction(), records: operation.getRecords(), url: operation.getUrl(), operation: operation, proxy: me});
  request.setUrl(me.buildUrl(request));
  operation.setRequest(request);
  return request;
}, processResponse: function(success, operation, request, response, callback, scope) {
  var me = this, action = operation.getAction(), reader, resultSet;
  if (success === true) 
  {
    reader = me.getReader();
    try {
      resultSet = reader.process(me.getResponseResult(response));
    }    catch (e) {
  operation.setException(e.message);
  me.fireEvent('exception', me, response, operation);
  return;
}
    if (!operation.getModel()) 
    {
      operation.setModel(this.getModel());
    }
    if (operation.process(action, resultSet, request, response) === false) 
    {
      me.setException(operation, response);
      me.fireEvent('exception', me, response, operation);
    }
  } else {
    me.setException(operation, response);
    me.fireEvent('exception', this, response, operation);
  }
  if (typeof callback == 'function') 
  {
    callback.call(scope || me, operation);
  }
  me.afterRequest(request, success);
}, getResponseResult: function(response) {
  return response;
}, setException: function(operation, response) {
  if (Ext.isObject(response)) 
  {
    operation.setException({status: response.status, statusText: response.statusText});
  }
}, applyEncoding: function(value) {
  return Ext.encode(value);
}, encodeSorters: function(sorters) {
  var min = [], length = sorters.length, i = 0;
  for (; i < length; i++) 
    {
      min[i] = {property: sorters[i].getProperty(), direction: sorters[i].getDirection()};
    }
  return this.applyEncoding(min);
}, encodeFilters: function(filters) {
  var min = [], length = filters.length, i = 0;
  for (; i < length; i++) 
    {
      min[i] = {property: filters[i].getProperty(), value: filters[i].getValue()};
    }
  return this.applyEncoding(min);
}, getParams: function(operation) {
  var me = this, params = {}, grouper = operation.getGrouper(), sorters = operation.getSorters(), filters = operation.getFilters(), page = operation.getPage(), start = operation.getStart(), limit = operation.getLimit(), simpleSortMode = me.getSimpleSortMode(), pageParam = me.getPageParam(), startParam = me.getStartParam(), limitParam = me.getLimitParam(), groupParam = me.getGroupParam(), sortParam = me.getSortParam(), filterParam = me.getFilterParam(), directionParam = me.getDirectionParam();
  if (me.getEnablePagingParams()) 
  {
    if (pageParam && page !== null) 
    {
      params[pageParam] = page;
    }
    if (startParam && start !== null) 
    {
      params[startParam] = start;
    }
    if (limitParam && limit !== null) 
    {
      params[limitParam] = limit;
    }
  }
  if (groupParam && grouper) 
  {
    params[groupParam] = me.encodeSorters([grouper]);
  }
  if (sortParam && sorters && sorters.length > 0) 
  {
    if (simpleSortMode) 
    {
      params[sortParam] = sorters[0].getProperty();
      params[directionParam] = sorters[0].getDirection();
    } else {
      params[sortParam] = me.encodeSorters(sorters);
    }
  }
  if (filterParam && filters && filters.length > 0) 
  {
    params[filterParam] = me.encodeFilters(filters);
  }
  return params;
}, buildUrl: function(request) {
  var me = this, url = me.getUrl(request);
  if (me.getNoCache()) 
  {
    url = Ext.urlAppend(url, Ext.String.format("{0}={1}", me.getCacheString(), Ext.Date.now()));
  }
  return url;
}, getUrl: function(request) {
  return request ? request.getUrl() || this.getApi()[request.getAction()] || this._url : this._url;
}, doRequest: function() {
}, afterRequest: Ext.emptyFn});

Ext.define('Ext.data.proxy.Ajax', {extend: 'Ext.data.proxy.Server', alias: 'proxy.ajax', alternateClassName: ['Ext.data.HttpProxy', 'Ext.data.AjaxProxy'], config: {withCredentials: false, useDefaultXhrHeader: true, username: null, password: null, actionMethods: {create: 'POST', read: 'GET', update: 'POST', destroy: 'POST'}, headers: {}}, doRequest: function(operation, callback, scope) {
  var me = this, writer = me.getWriter(), request = me.buildRequest(operation);
  request.setConfig({headers: me.getHeaders(), timeout: me.getTimeout(), method: me.getMethod(request), callback: me.createRequestCallback(request, operation, callback, scope), scope: me, proxy: me, useDefaultXhrHeader: me.getUseDefaultXhrHeader()});
  if (operation.getWithCredentials() || me.getWithCredentials()) 
  {
    request.setWithCredentials(true);
    request.setUsername(me.getUsername());
    request.setPassword(me.getPassword());
  }
  request = writer.write(request);
  Ext.Ajax.request(request.getCurrentConfig());
  return request;
}, getMethod: function(request) {
  return this.getActionMethods()[request.getAction()];
}, createRequestCallback: function(request, operation, callback, scope) {
  var me = this;
  return function(options, success, response) {
  me.processResponse(success, operation, request, response, callback, scope);
};
}});

Ext.define('Ext.data.association.Association', {alternateClassName: 'Ext.data.Association', config: {ownerModel: null, ownerName: undefined, associatedModel: null, associatedName: undefined, associationKey: undefined, primaryKey: 'id', reader: null, type: null, name: undefined}, statics: {create: function(association) {
  if (!association.isAssociation) 
  {
    if (Ext.isString(association)) 
    {
      association = {type: association};
    }
    association.type = association.type.toLowerCase();
    return Ext.factory(association, Ext.data.association.Association, null, 'association');
  }
  return association;
}}, constructor: function(config) {
  this.initConfig(config);
}, applyName: function(name) {
  if (!name) 
  {
    name = this.getAssociatedName();
  }
  return name;
}, applyOwnerModel: function(ownerName) {
  var ownerModel = Ext.data.ModelManager.getModel(ownerName);
  if (ownerModel === undefined) 
  {
    Ext.Logger.error('The configured ownerModel was not valid (you tried ' + ownerName + ')');
  }
  return ownerModel;
}, applyOwnerName: function(ownerName) {
  if (!ownerName) 
  {
    ownerName = this.getOwnerModel().modelName;
  }
  ownerName = ownerName.slice(ownerName.lastIndexOf('.') + 1);
  return ownerName;
}, updateOwnerModel: function(ownerModel, oldOwnerModel) {
  if (oldOwnerModel) 
  {
    this.setOwnerName(ownerModel.modelName);
  }
}, applyAssociatedModel: function(associatedName) {
  var associatedModel = Ext.data.ModelManager.types[associatedName];
  if (associatedModel === undefined) 
  {
    Ext.Logger.error('The configured associatedModel was not valid (you tried ' + associatedName + ')');
  }
  return associatedModel;
}, applyAssociatedName: function(associatedName) {
  if (!associatedName) 
  {
    associatedName = this.getAssociatedModel().modelName;
  }
  associatedName = associatedName.slice(associatedName.lastIndexOf('.') + 1);
  return associatedName;
}, updateAssociatedModel: function(associatedModel, oldAssociatedModel) {
  if (oldAssociatedModel) 
  {
    this.setAssociatedName(associatedModel.modelName);
  }
}, applyReader: function(reader) {
  if (reader) 
  {
    if (Ext.isString(reader)) 
    {
      reader = {type: reader};
    }
    if (!reader.isReader) 
    {
      Ext.applyIf(reader, {type: 'json'});
    }
  }
  return Ext.factory(reader, Ext.data.Reader, this.getReader(), 'reader');
}, updateReader: function(reader) {
  reader.setModel(this.getAssociatedModel());
}});

Ext.define('Ext.util.Inflector', {singleton: true, plurals: [[(/(quiz)$/i), "$1zes"], [(/^(ox)$/i), "$1en"], [(/([m|l])ouse$/i), "$1ice"], [(/(matr|vert|ind)ix|ex$/i), "$1ices"], [(/(x|ch|ss|sh)$/i), "$1es"], [(/([^aeiouy]|qu)y$/i), "$1ies"], [(/(hive)$/i), "$1s"], [(/(?:([^f])fe|([lr])f)$/i), "$1$2ves"], [(/sis$/i), "ses"], [(/([ti])um$/i), "$1a"], [(/(buffal|tomat|potat)o$/i), "$1oes"], [(/(bu)s$/i), "$1ses"], [(/(alias|status|sex)$/i), "$1es"], [(/(octop|vir)us$/i), "$1i"], [(/(ax|test)is$/i), "$1es"], [(/^person$/), "people"], [(/^man$/), "men"], [(/^(child)$/), "$1ren"], [(/s$/i), "s"], [(/$/), "s"]], singulars: [[(/(quiz)zes$/i), "$1"], [(/(matr)ices$/i), "$1ix"], [(/(vert|ind)ices$/i), "$1ex"], [(/^(ox)en/i), "$1"], [(/(alias|status)es$/i), "$1"], [(/(octop|vir)i$/i), "$1us"], [(/(cris|ax|test)es$/i), "$1is"], [(/(shoe)s$/i), "$1"], [(/(o)es$/i), "$1"], [(/(bus)es$/i), "$1"], [(/([m|l])ice$/i), "$1ouse"], [(/(x|ch|ss|sh)es$/i), "$1"], [(/(m)ovies$/i), "$1ovie"], [(/(s)eries$/i), "$1eries"], [(/([^aeiouy]|qu)ies$/i), "$1y"], [(/([lr])ves$/i), "$1f"], [(/(tive)s$/i), "$1"], [(/(hive)s$/i), "$1"], [(/([^f])ves$/i), "$1fe"], [(/(^analy)ses$/i), "$1sis"], [(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i), "$1$2sis"], [(/([ti])a$/i), "$1um"], [(/(n)ews$/i), "$1ews"], [(/people$/i), "person"], [(/s$/i), ""]], uncountable: ["sheep", "fish", "series", "species", "money", "rice", "information", "equipment", "grass", "mud", "offspring", "deer", "means"], singular: function(matcher, replacer) {
  this.singulars.unshift([matcher, replacer]);
}, plural: function(matcher, replacer) {
  this.plurals.unshift([matcher, replacer]);
}, clearSingulars: function() {
  this.singulars = [];
}, clearPlurals: function() {
  this.plurals = [];
}, isTransnumeral: function(word) {
  return Ext.Array.indexOf(this.uncountable, word) != -1;
}, pluralize: function(word) {
  if (this.isTransnumeral(word)) 
  {
    return word;
  }
  var plurals = this.plurals, length = plurals.length, tuple, regex, i;
  for (i = 0; i < length; i++) 
    {
      tuple = plurals[i];
      regex = tuple[0];
      if (regex == word || (regex.test && regex.test(word))) 
      {
        return word.replace(regex, tuple[1]);
      }
    }
  return word;
}, singularize: function(word) {
  if (this.isTransnumeral(word)) 
  {
    return word;
  }
  var singulars = this.singulars, length = singulars.length, tuple, regex, i;
  for (i = 0; i < length; i++) 
    {
      tuple = singulars[i];
      regex = tuple[0];
      if (regex == word || (regex.test && regex.test(word))) 
      {
        return word.replace(regex, tuple[1]);
      }
    }
  return word;
}, classify: function(word) {
  return Ext.String.capitalize(this.singularize(word));
}, ordinalize: function(number) {
  var parsed = parseInt(number, 10), mod10 = parsed % 10, mod100 = parsed % 100;
  if (11 <= mod100 && mod100 <= 13) 
  {
    return number + "th";
  } else {
    switch (mod10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
      default:
        return number + "th";
    }
  }
}}, function() {
  var irregulars = {alumnus: 'alumni', cactus: 'cacti', focus: 'foci', nucleus: 'nuclei', radius: 'radii', stimulus: 'stimuli', ellipsis: 'ellipses', paralysis: 'paralyses', oasis: 'oases', appendix: 'appendices', index: 'indexes', beau: 'beaux', bureau: 'bureaux', tableau: 'tableaux', woman: 'women', child: 'children', man: 'men', corpus: 'corpora', criterion: 'criteria', curriculum: 'curricula', genus: 'genera', memorandum: 'memoranda', phenomenon: 'phenomena', foot: 'feet', goose: 'geese', tooth: 'teeth', antenna: 'antennae', formula: 'formulae', nebula: 'nebulae', vertebra: 'vertebrae', vita: 'vitae'}, singular;
  for (singular in irregulars) 
    {
      this.plural(singular, irregulars[singular]);
      this.singular(irregulars[singular], singular);
    }
});

Ext.define('Ext.data.association.HasMany', {extend: 'Ext.data.association.Association', alternateClassName: 'Ext.data.HasManyAssociation', alias: 'association.hasmany', config: {foreignKey: undefined, store: undefined, storeName: undefined, filterProperty: null, autoLoad: false, autoSync: false}, constructor: function(config) {
  config = config || {};
  if (config.storeConfig) 
  {
    config.store = config.storeConfig;
    delete config.storeConfig;
  }
  this.callParent([config]);
}, applyName: function(name) {
  if (!name) 
  {
    name = Ext.util.Inflector.pluralize(this.getAssociatedName().toLowerCase());
  }
  return name;
}, applyStoreName: function(name) {
  if (!name) 
  {
    name = this.getName() + 'Store';
  }
  return name;
}, applyForeignKey: function(foreignKey) {
  if (!foreignKey) 
  {
    var inverse = this.getInverseAssociation();
    if (inverse) 
    {
      foreignKey = inverse.getForeignKey();
    } else {
      foreignKey = this.getOwnerName().toLowerCase() + '_id';
    }
  }
  return foreignKey;
}, applyAssociationKey: function(associationKey) {
  if (!associationKey) 
  {
    var associatedName = this.getAssociatedName();
    associationKey = Ext.util.Inflector.pluralize(associatedName[0].toLowerCase() + associatedName.slice(1));
  }
  return associationKey;
}, updateForeignKey: function(foreignKey, oldForeignKey) {
  var fields = this.getAssociatedModel().getFields(), field = fields.get(foreignKey);
  if (!field) 
  {
    field = new Ext.data.Field({name: foreignKey});
    fields.add(field);
    fields.isDirty = true;
  }
  if (oldForeignKey) 
  {
    field = fields.get(oldForeignKey);
    if (field) 
    {
      fields.remove(field);
      fields.isDirty = true;
    }
  }
}, applyStore: function(storeConfig) {
  var me = this, associatedModel = me.getAssociatedModel(), storeName = me.getStoreName(), foreignKey = me.getForeignKey(), primaryKey = me.getPrimaryKey(), filterProperty = me.getFilterProperty(), autoLoad = me.getAutoLoad(), autoSync = me.getAutoSync();
  return function() {
  var record = this, config, filter, store, modelDefaults = {}, listeners = {addrecords: me.onAddRecords, removerecords: me.onRemoveRecords, scope: me};
  if (record[storeName] === undefined) 
  {
    if (filterProperty) 
    {
      filter = {property: filterProperty, value: record.get(filterProperty), exactMatch: true};
    } else {
      filter = {property: foreignKey, value: record.get(primaryKey), exactMatch: true};
    }
    modelDefaults[foreignKey] = record.get(primaryKey);
    config = Ext.apply({}, storeConfig, {model: associatedModel, filters: [filter], remoteFilter: true, autoSync: autoSync, modelDefaults: modelDefaults});
    store = record[storeName] = Ext.create('Ext.data.Store', config);
    store.boundTo = record;
    store.onAfter(listeners);
    if (autoLoad) 
    {
      record[storeName].load();
    }
  }
  return record[storeName];
};
}, onAddRecords: function(store, records) {
  var ln = records.length, id = store.boundTo.getId(), i, record;
  for (i = 0; i < ln; i++) 
    {
      record = records[i];
      record.set(this.getForeignKey(), id);
    }
  this.updateInverseInstances(store.boundTo);
}, onRemoveRecords: function(store, records) {
  var ln = records.length, i, record;
  for (i = 0; i < ln; i++) 
    {
      record = records[i];
      record.set(this.getForeignKey(), null);
    }
}, updateStore: function(store) {
  this.getOwnerModel().prototype[this.getName()] = store;
}, read: function(record, reader, associationData) {
  var store = record[this.getName()](), records = reader.read(associationData).getRecords();
  store.add(records);
}, updateInverseInstances: function(record) {
  var store = record[this.getName()](), inverse = this.getInverseAssociation();
  if (inverse) 
  {
    store.each(function(associatedRecord) {
  associatedRecord[inverse.getInstanceName()] = record;
});
  }
}, getInverseAssociation: function() {
  var ownerName = this.getOwnerModel().modelName;
  return this.getAssociatedModel().associations.findBy(function(assoc) {
  return assoc.getType().toLowerCase() === 'belongsto' && assoc.getAssociatedModel().modelName === ownerName;
});
}});

Ext.define('Ext.data.association.BelongsTo', {extend: 'Ext.data.association.Association', alternateClassName: 'Ext.data.BelongsToAssociation', alias: 'association.belongsto', config: {foreignKey: undefined, getterName: undefined, setterName: undefined, instanceName: undefined}, applyForeignKey: function(foreignKey) {
  if (!foreignKey) 
  {
    foreignKey = this.getAssociatedName().toLowerCase() + '_id';
  }
  return foreignKey;
}, updateForeignKey: function(foreignKey, oldForeignKey) {
  var fields = this.getOwnerModel().getFields(), field = fields.get(foreignKey);
  if (!field) 
  {
    field = new Ext.data.Field({name: foreignKey});
    fields.add(field);
    fields.isDirty = true;
  }
  if (oldForeignKey) 
  {
    field = fields.get(oldForeignKey);
    if (field) 
    {
      fields.isDirty = true;
      fields.remove(field);
    }
  }
}, applyInstanceName: function(instanceName) {
  if (!instanceName) 
  {
    instanceName = this.getAssociatedName() + 'BelongsToInstance';
  }
  return instanceName;
}, applyAssociationKey: function(associationKey) {
  if (!associationKey) 
  {
    var associatedName = this.getAssociatedName();
    associationKey = associatedName[0].toLowerCase() + associatedName.slice(1);
  }
  return associationKey;
}, applyGetterName: function(getterName) {
  if (!getterName) 
  {
    var associatedName = this.getAssociatedName();
    getterName = 'get' + associatedName[0].toUpperCase() + associatedName.slice(1);
  }
  return getterName;
}, applySetterName: function(setterName) {
  if (!setterName) 
  {
    var associatedName = this.getAssociatedName();
    setterName = 'set' + associatedName[0].toUpperCase() + associatedName.slice(1);
  }
  return setterName;
}, updateGetterName: function(getterName, oldGetterName) {
  var ownerProto = this.getOwnerModel().prototype;
  if (oldGetterName) 
  {
    delete ownerProto[oldGetterName];
  }
  if (getterName) 
  {
    ownerProto[getterName] = this.createGetter();
  }
}, updateSetterName: function(setterName, oldSetterName) {
  var ownerProto = this.getOwnerModel().prototype;
  if (oldSetterName) 
  {
    delete ownerProto[oldSetterName];
  }
  if (setterName) 
  {
    ownerProto[setterName] = this.createSetter();
  }
}, createSetter: function() {
  var me = this, foreignKey = me.getForeignKey(), associatedModel = me.getAssociatedModel(), currentOwner, newOwner, store;
  return function(value, options, scope) {
  var inverse = me.getInverseAssociation(), record = this;
  if (value && value.isModel) 
  {
    value = value.getId();
  }
  if (Ext.isFunction(options)) 
  {
    options = {callback: options, scope: scope || record};
  }
  delete record[me.getInstanceName()];
  currentOwner = Ext.data.Model.cache[Ext.data.Model.generateCacheId(associatedModel.modelName, this.get(foreignKey))];
  newOwner = Ext.data.Model.cache[Ext.data.Model.generateCacheId(associatedModel.modelName, value)];
  record.set(foreignKey, value);
  if (inverse) 
  {
    if (newOwner) 
    {
      if (inverse.getType().toLowerCase() === 'hasmany') 
      {
        store = newOwner[inverse.getName()]();
        store.add(record);
      } else {
        newOwner[inverse.getInstanceName()] = record;
      }
    }
    if (currentOwner) 
    {
      if (inverse.getType().toLowerCase() === 'hasmany') 
      {
        store = currentOwner[inverse.getName()]();
        store.remove(record);
      } else {
        delete value[inverse.getInstanceName()];
      }
    }
  }
  if (newOwner) 
  {
    record[me.getInstanceName()] = newOwner;
  }
  if (Ext.isObject(options)) 
  {
    return record.save(options);
  }
  return record;
};
}, createGetter: function() {
  var me = this, associatedModel = me.getAssociatedModel(), foreignKey = me.getForeignKey(), instanceName = me.getInstanceName();
  return function(options, scope) {
  options = options || {};
  var model = this, foreignKeyId = model.get(foreignKey), success, instance, args;
  instance = model[instanceName];
  if (!instance) 
  {
    instance = Ext.data.Model.cache[Ext.data.Model.generateCacheId(associatedModel.modelName, foreignKeyId)];
    if (instance) 
    {
      model[instanceName] = instance;
    }
  }
  if (options.reload === true || instance === undefined) 
  {
    if (typeof options == 'function') 
    {
      options = {callback: options, scope: scope || model};
    }
    success = options.success;
    options.success = function(rec) {
  model[instanceName] = rec;
  if (success) 
  {
    success.apply(this, arguments);
  }
};
    associatedModel.load(foreignKeyId, options);
  } else {
    args = [instance];
    scope = scope || model;
    Ext.callback(options, scope, args);
    Ext.callback(options.success, scope, args);
    Ext.callback(options.failure, scope, args);
    Ext.callback(options.callback, scope, args);
    return instance;
  }
};
}, read: function(record, reader, associationData) {
  record[this.getInstanceName()] = reader.read([associationData]).getRecords()[0];
}, getInverseAssociation: function() {
  var ownerName = this.getOwnerModel().modelName, foreignKey = this.getForeignKey();
  return this.getAssociatedModel().associations.findBy(function(assoc) {
  var type = assoc.getType().toLowerCase();
  return (type === 'hasmany' || type === 'hasone') && assoc.getAssociatedModel().modelName === ownerName && assoc.getForeignKey() === foreignKey;
});
}});

Ext.define('Ext.data.association.HasOne', {extend: 'Ext.data.association.Association', alternateClassName: 'Ext.data.HasOneAssociation', alias: 'association.hasone', config: {foreignKey: undefined, getterName: undefined, setterName: undefined, instanceName: undefined}, applyForeignKey: function(foreignKey) {
  if (!foreignKey) 
  {
    var inverse = this.getInverseAssociation();
    if (inverse) 
    {
      foreignKey = inverse.getForeignKey();
    } else {
      foreignKey = this.getAssociatedName().toLowerCase() + '_id';
    }
  }
  return foreignKey;
}, updateForeignKey: function(foreignKey, oldForeignKey) {
  var fields = this.getOwnerModel().getFields(), field = fields.get(foreignKey);
  if (!field) 
  {
    field = new Ext.data.Field({name: foreignKey});
    fields.add(field);
    fields.isDirty = true;
  }
  if (oldForeignKey) 
  {
    field = fields.get(oldForeignKey);
    if (field) 
    {
      fields.remove(field);
      fields.isDirty = true;
    }
  }
}, applyInstanceName: function(instanceName) {
  if (!instanceName) 
  {
    instanceName = this.getAssociatedName() + 'HasOneInstance';
  }
  return instanceName;
}, applyAssociationKey: function(associationKey) {
  if (!associationKey) 
  {
    var associatedName = this.getAssociatedName();
    associationKey = associatedName[0].toLowerCase() + associatedName.slice(1);
  }
  return associationKey;
}, applyGetterName: function(getterName) {
  if (!getterName) 
  {
    var associatedName = this.getAssociatedName();
    getterName = 'get' + associatedName[0].toUpperCase() + associatedName.slice(1);
  }
  return getterName;
}, applySetterName: function(setterName) {
  if (!setterName) 
  {
    var associatedName = this.getAssociatedName();
    setterName = 'set' + associatedName[0].toUpperCase() + associatedName.slice(1);
  }
  return setterName;
}, updateGetterName: function(getterName, oldGetterName) {
  var ownerProto = this.getOwnerModel().prototype;
  if (oldGetterName) 
  {
    delete ownerProto[oldGetterName];
  }
  if (getterName) 
  {
    ownerProto[getterName] = this.createGetter();
  }
}, updateSetterName: function(setterName, oldSetterName) {
  var ownerProto = this.getOwnerModel().prototype;
  if (oldSetterName) 
  {
    delete ownerProto[oldSetterName];
  }
  if (setterName) 
  {
    ownerProto[setterName] = this.createSetter();
  }
}, createSetter: function() {
  var me = this, foreignKey = me.getForeignKey(), instanceName = me.getInstanceName(), associatedModel = me.getAssociatedModel();
  return function(value, options, scope) {
  var Model = Ext.data.Model, record;
  if (value && value.isModel) 
  {
    value = value.getId();
  }
  this.set(foreignKey, value);
  if (value || value === 0) 
  {
    record = Model.cache[Model.generateCacheId(associatedModel.modelName, value)];
    if (record) 
    {
      this[instanceName] = record;
    }
  } else {
    delete this[instanceName];
  }
  if (Ext.isFunction(options)) 
  {
    options = {callback: options, scope: scope || this};
  }
  if (Ext.isObject(options)) 
  {
    return this.save(options);
  }
  return this;
};
}, createGetter: function() {
  var me = this, associatedModel = me.getAssociatedModel(), foreignKey = me.getForeignKey(), instanceName = me.getInstanceName();
  return function(options, scope) {
  options = options || {};
  var model = this, foreignKeyId = model.get(foreignKey), success, instance, args;
  if (options.reload === true || model[instanceName] === undefined) 
  {
    if (typeof options == 'function') 
    {
      options = {callback: options, scope: scope || model};
    }
    success = options.success;
    options.success = function(rec) {
  model[instanceName] = rec;
  if (success) 
  {
    success.apply(this, arguments);
  }
};
    associatedModel.load(foreignKeyId, options);
  } else {
    instance = model[instanceName];
    args = [instance];
    scope = scope || model;
    Ext.callback(options, scope, args);
    Ext.callback(options.success, scope, args);
    Ext.callback(options.failure, scope, args);
    Ext.callback(options.callback, scope, args);
    return instance;
  }
};
}, read: function(record, reader, associationData) {
  var inverse = this.getInverseAssociation(), newRecord = reader.read([associationData]).getRecords()[0];
  record[this.getSetterName()].call(record, newRecord);
  if (inverse) 
  {
    newRecord[inverse.getInstanceName()] = record;
  }
}, getInverseAssociation: function() {
  var ownerName = this.getOwnerModel().modelName;
  return this.getAssociatedModel().associations.findBy(function(assoc) {
  return assoc.getType().toLowerCase() === 'belongsto' && assoc.getAssociatedModel().modelName === ownerName;
});
}});

Ext.define('Ext.data.Error', {config: {field: null, message: ''}, constructor: function(config) {
  this.initConfig(config);
}});

Ext.define('Ext.data.Errors', {extend: 'Ext.util.Collection', isValid: function() {
  return this.length === 0;
}, getByField: function(fieldName) {
  var errors = [], error, i;
  for (i = 0; i < this.length; i++) 
    {
      error = this.items[i];
      if (error.getField() == fieldName) 
      {
        errors.push(error);
      }
    }
  return errors;
}, add: function() {
  var obj = arguments.length == 1 ? arguments[0] : arguments[1];
  if (!(obj instanceof Ext.data.Error)) 
  {
    obj = Ext.create('Ext.data.Error', {field: obj.field || obj.name, message: obj.error || obj.message});
  }
  return this.callParent([obj]);
}});

Ext.define('Ext.data.Model', {alternateClassName: 'Ext.data.Record', mixins: {observable: 'Ext.mixin.Observable'}, isModel: true, config: {idProperty: 'id', data: null, fields: undefined, validations: null, associations: null, hasMany: null, hasOne: null, belongsTo: null, proxy: null, identifier: {type: 'simple'}, clientIdProperty: 'clientId', isErased: false, useCache: true}, staticConfigs: ['idProperty', 'fields', 'validations', 'associations', 'hasMany', 'hasOne', 'belongsTo', 'clientIdProperty', 'identifier', 'useCache', 'proxy'], statics: {EDIT: 'edit', REJECT: 'reject', COMMIT: 'commit', cache: {}, generateProxyMethod: function(name) {
  return function() {
  var prototype = this.prototype;
  return prototype[name].apply(prototype, arguments);
};
}, generateCacheId: function(record, id) {
  var modelName;
  if (record && record.isModel) 
  {
    modelName = record.modelName;
    if (id === undefined) 
    {
      id = record.getId();
    }
  } else {
    modelName = record;
  }
  return modelName.replace(/\./g, '-').toLowerCase() + '-' + id;
}}, inheritableStatics: {load: function(id, config, scope) {
  var proxy = this.getProxy(), idProperty = this.getIdProperty(), record = null, params = {}, callback, operation;
  scope = scope || (config && config.scope) || this;
  if (Ext.isFunction(config)) 
  {
    config = {callback: config, scope: scope};
  }
  params[idProperty] = id;
  config = Ext.apply({}, config);
  config = Ext.applyIf(config, {action: 'read', params: params, model: this});
  operation = Ext.create('Ext.data.Operation', config);
  if (!proxy) 
  {
    Ext.Logger.error('You are trying to load a model that doesn\'t have a Proxy specified');
  }
  callback = function(operation) {
  if (operation.wasSuccessful()) 
  {
    record = operation.getRecords()[0] || null;
    Ext.callback(config.success, scope, [record, operation]);
  } else {
    Ext.callback(config.failure, scope, [record, operation]);
  }
  Ext.callback(config.callback, scope, [record, operation]);
};
  proxy.read(operation, callback, this);
}}, editing: false, dirty: false, phantom: false, constructor: function(data, id, raw, convertedData) {
  var me = this, cached = null, useCache = me.getUseCache(), idProperty = me.getIdProperty();
  data = data || convertedData || {};
  if (id || id === 0) 
  {
    data[idProperty] = me.internalId = id;
  }
  id = data[idProperty];
  if (useCache && (id || id === 0)) 
  {
    cached = Ext.data.Model.cache[Ext.data.Model.generateCacheId(this, id)];
    if (cached) 
    {
      cached.raw = raw || cached.raw;
      return cached.mergeData(convertedData || data || {});
    }
  }
  me.modified = {};
  me.raw = raw || data || {};
  me.stores = [];
  if (convertedData) 
  {
    me.setConvertedData(data);
  } else {
    me.setData(data);
  }
  me.id = me.getIdentifier().generate(me);
  id = me.data[idProperty];
  if (!id && id !== 0) 
  {
    me.data[idProperty] = me.internalId = me.id;
    me.phantom = true;
    if (this.associations.length) 
    {
      this.handleInlineAssociationData(data);
    }
  } else {
    this.internalId = id;
  }
  if (useCache) 
  {
    Ext.data.Model.cache[Ext.data.Model.generateCacheId(me)] = me;
  }
  if (this.init && typeof this.init == 'function') 
  {
    this.init();
  }
}, mergeData: function(rawData) {
  var me = this, fields = me.getFields().items, ln = fields.length, modified = me.modified, modifiedFieldNames = [], data = me.data, i, field, fieldName, value, id;
  for (i = 0; i < ln; i++) 
    {
      field = fields[i];
      fieldName = field._name;
      value = rawData[fieldName];
      if (value !== undefined && !modified.hasOwnProperty(fieldName)) 
      {
        if (field._convert) 
        {
          value = field._convert(value, me);
        }
        if (data[fieldName] !== value) 
        {
          if (modifiedFieldNames.length === 0 && !me.editing) 
          {
            this.beginEdit();
          }
          modifiedFieldNames.push(fieldName);
        }
        data[fieldName] = value;
      } else if (Ext.isFunction(field._convert)) 
      {
        value = field._convert(value, me);
        data[fieldName] = value;
      }
    }
  if (me.associations.length) 
  {
    me.handleInlineAssociationData(rawData);
  }
  if (modifiedFieldNames.length > 0 && me.editing) 
  {
    this.endEdit(false, modifiedFieldNames);
  }
  return this;
}, setData: function(rawData) {
  var me = this, fields = me.fields.items, ln = fields.length, isArray = Ext.isArray(rawData), data = me._data = me.data = {}, i, field, name, value, convert, id;
  if (!rawData) 
  {
    return me;
  }
  for (i = 0; i < ln; i++) 
    {
      field = fields[i];
      name = field._name;
      convert = field._convert;
      if (isArray) 
      {
        value = rawData[i];
      } else {
        value = rawData[name];
        if (typeof value == 'undefined') 
        {
          value = field._defaultValue;
        }
      }
      if (convert) 
      {
        value = field._convert(value, me);
      }
      data[name] = value;
    }
  id = me.getId();
  if (me.associations.length && (id || id === 0)) 
  {
    me.handleInlineAssociationData(rawData);
  }
  return me;
}, handleInlineAssociationData: function(data) {
  var associations = this.associations.items, ln = associations.length, i, association, associationData, reader, proxy, associationKey;
  data = Ext.apply({}, data, this.raw);
  for (i = 0; i < ln; i++) 
    {
      association = associations[i];
      associationKey = association.getAssociationKey();
      associationData = data[associationKey];
      if (associationData) 
      {
        reader = association.getReader();
        if (!reader) 
        {
          proxy = association.getAssociatedModel().getProxy();
          if (proxy) 
          {
            reader = proxy.getReader();
          } else {
            reader = new Ext.data.JsonReader({model: association.getAssociatedModel()});
          }
        }
        association.read(this, reader, associationData);
      }
    }
}, setId: function(id) {
  var currentId = this.getId();
  this.set(this.getIdProperty(), id);
  this.internalId = id;
  if (this.getUseCache()) 
  {
    delete Ext.data.Model.cache[Ext.data.Model.generateCacheId(this, currentId)];
    Ext.data.Model.cache[Ext.data.Model.generateCacheId(this)] = this;
  }
}, getId: function() {
  return this.get(this.getIdProperty());
}, setConvertedData: function(data) {
  this._data = this.data = data;
  return this;
}, get: function(fieldName) {
  return this.data[fieldName];
}, set: function(fieldName, value) {
  var me = this, fieldMap = me.fields.map, modified = me.modified, notEditing = !me.editing, modifiedCount = 0, modifiedFieldNames = [], field, key, i, currentValue, ln, convert;
  if (arguments.length == 1) 
  {
    for (key in fieldName) 
      {
        if (fieldName.hasOwnProperty(key)) 
        {
          field = fieldMap[key];
          if (field && field.hasCustomConvert()) 
          {
            modifiedFieldNames.push(key);
            continue;
          }
          if (!modifiedCount && notEditing) 
          {
            me.beginEdit();
          }
          ++modifiedCount;
          me.set(key, fieldName[key]);
        }
      }
    ln = modifiedFieldNames.length;
    if (ln) 
    {
      if (!modifiedCount && notEditing) 
      {
        me.beginEdit();
      }
      modifiedCount += ln;
      for (i = 0; i < ln; i++) 
        {
          field = modifiedFieldNames[i];
          me.set(field, fieldName[field]);
        }
    }
    if (notEditing && modifiedCount) 
    {
      me.endEdit(false, modifiedFieldNames);
    }
  } else if (modified) 
  {
    field = fieldMap[fieldName];
    convert = field && field.getConvert();
    if (convert) 
    {
      value = convert.call(field, value, me);
    }
    currentValue = me.data[fieldName];
    me.data[fieldName] = value;
    if (field && !me.isEqual(currentValue, value)) 
    {
      if (modified.hasOwnProperty(fieldName)) 
      {
        if (me.isEqual(modified[fieldName], value)) 
        {
          delete modified[fieldName];
          me.dirty = false;
          for (key in modified) 
            {
              if (modified.hasOwnProperty(key)) 
              {
                me.dirty = true;
                break;
              }
            }
        }
      } else {
        me.dirty = true;
        modified[fieldName] = currentValue;
      }
    }
    if (notEditing) 
    {
      me.afterEdit([fieldName], modified);
    }
  }
}, isEqual: function(a, b) {
  if (Ext.isDate(a) && Ext.isDate(b)) 
  {
    return a.getTime() === b.getTime();
  }
  return a === b;
}, beginEdit: function() {
  var me = this;
  if (!me.editing) 
  {
    me.editing = true;
    me.dirtySave = me.dirty;
    me.dataSave = Ext.apply({}, me.data);
    me.modifiedSave = Ext.apply({}, me.modified);
  }
}, cancelEdit: function() {
  var me = this;
  if (me.editing) 
  {
    me.editing = false;
    me.modified = me.modifiedSave;
    me.data = me.dataSave;
    me.dirty = me.dirtySave;
    delete me.modifiedSave;
    delete me.dataSave;
    delete me.dirtySave;
  }
}, endEdit: function(silent, modifiedFieldNames) {
  var me = this;
  if (me.editing) 
  {
    me.editing = false;
    if (silent !== true && (me.changedWhileEditing())) 
    {
      me.afterEdit(modifiedFieldNames || Ext.Object.getKeys(this.modified), this.modified);
    }
    delete me.modifiedSave;
    delete me.dataSave;
    delete me.dirtySave;
  }
}, changedWhileEditing: function() {
  var me = this, saved = me.dataSave, data = me.data, key;
  for (key in data) 
    {
      if (data.hasOwnProperty(key)) 
      {
        if (!me.isEqual(data[key], saved[key])) 
        {
          return true;
        }
      }
    }
  return false;
}, getChanges: function() {
  var modified = this.modified, changes = {}, field;
  for (field in modified) 
    {
      if (modified.hasOwnProperty(field)) 
      {
        changes[field] = this.get(field);
      }
    }
  return changes;
}, isModified: function(fieldName) {
  return this.modified.hasOwnProperty(fieldName);
}, save: function(options, scope) {
  var me = this, action = me.phantom ? 'create' : 'update', proxy = me.getProxy(), operation, callback;
  if (!proxy) 
  {
    Ext.Logger.error('You are trying to save a model instance that doesn\'t have a Proxy specified');
  }
  options = options || {};
  scope = scope || me;
  if (Ext.isFunction(options)) 
  {
    options = {callback: options, scope: scope};
  }
  Ext.applyIf(options, {records: [me], action: action, model: me.self});
  operation = Ext.create('Ext.data.Operation', options);
  callback = function(operation) {
  if (operation.wasSuccessful()) 
  {
    Ext.callback(options.success, scope, [me, operation]);
  } else {
    Ext.callback(options.failure, scope, [me, operation]);
  }
  Ext.callback(options.callback, scope, [me, operation]);
};
  proxy[action](operation, callback, me);
  return me;
}, erase: function(options, scope) {
  var me = this, proxy = this.getProxy(), operation, callback;
  if (!proxy) 
  {
    Ext.Logger.error('You are trying to erase a model instance that doesn\'t have a Proxy specified');
  }
  options = options || {};
  scope = scope || me;
  if (Ext.isFunction(options)) 
  {
    options = {callback: options, scope: scope};
  }
  Ext.applyIf(options, {records: [me], action: 'destroy', model: this.self});
  operation = Ext.create('Ext.data.Operation', options);
  callback = function(operation) {
  if (operation.wasSuccessful()) 
  {
    Ext.callback(options.success, scope, [me, operation]);
  } else {
    Ext.callback(options.failure, scope, [me, operation]);
  }
  Ext.callback(options.callback, scope, [me, operation]);
};
  proxy.destroy(operation, callback, me);
  return me;
}, reject: function(silent) {
  var me = this, modified = me.modified, field;
  for (field in modified) 
    {
      if (modified.hasOwnProperty(field)) 
      {
        if (typeof modified[field] != "function") 
        {
          me.data[field] = modified[field];
        }
      }
    }
  me.dirty = false;
  me.editing = false;
  me.modified = {};
  if (silent !== true) 
  {
    me.afterReject();
  }
}, commit: function(silent) {
  var me = this, modified = this.modified;
  me.phantom = me.dirty = me.editing = false;
  me.modified = {};
  if (silent !== true) 
  {
    me.afterCommit(modified);
  }
}, afterEdit: function(modifiedFieldNames, modified) {
  this.notifyStores('afterEdit', modifiedFieldNames, modified);
}, afterReject: function() {
  this.notifyStores("afterReject");
}, afterCommit: function(modified) {
  this.notifyStores('afterCommit', Ext.Object.getKeys(modified || {}), modified);
}, notifyStores: function(fn) {
  var args = Ext.Array.clone(arguments), stores = this.stores;
  if (Ext.isArray(stores)) 
  {
    var ln = stores.length, i, store;
    args[0] = this;
    for (i = 0; i < ln; ++i) 
      {
        store = stores[i];
        if (store !== undefined && typeof store[fn] == "function") 
        {
          store[fn].apply(store, args);
        }
      }
  }
}, copy: function(newId) {
  var me = this, idProperty = me.getIdProperty(), raw = Ext.apply({}, me.raw), data = Ext.apply({}, me.data);
  delete raw[idProperty];
  delete data[idProperty];
  return new me.self(null, newId, raw, data);
}, getData: function(includeAssociated) {
  var data = this.data;
  if (includeAssociated === true) 
  {
    Ext.apply(data, this.getAssociatedData());
  }
  return data;
}, getAssociatedData: function() {
  return this.prepareAssociatedData(this, [], null);
}, prepareAssociatedData: function(record, ids, associationType) {
  var associations = record.associations.items, associationCount = associations.length, associationData = {}, recursiveAssociationQueue = [], associatedStore, associationName, associatedRecords, associatedRecord, associatedRecordCount, association, id, i, j, type, allow, recursiveAssociationItem;
  for (i = 0; i < associationCount; i++) 
    {
      association = associations[i];
      associationName = association.getName();
      type = association.getType();
      allow = true;
      if (associationType) 
      {
        allow = type == associationType;
      }
      if (allow && type.toLowerCase() == 'hasmany') 
      {
        associatedStore = record[association.getStoreName()];
        associationData[associationName] = [];
        if (associatedStore && associatedStore.getCount() > 0) 
        {
          associatedRecords = associatedStore.data.items;
          associatedRecordCount = associatedRecords.length;
          recursiveAssociationQueue.length = 0;
          for (j = 0; j < associatedRecordCount; j++) 
            {
              associatedRecord = associatedRecords[j];
              id = associatedRecord.id;
              if (Ext.Array.indexOf(ids, id) == -1) 
              {
                ids.push(id);
                associationData[associationName][j] = associatedRecord.getData();
                recursiveAssociationQueue.push({associationName: associationName, j: j, associatedRecord: associatedRecord, ids: ids, associationType: associationType});
              }
            }
          while (recursiveAssociationQueue.length > 0) 
            {
              recursiveAssociationItem = recursiveAssociationQueue.shift();
              Ext.apply(associationData[recursiveAssociationItem.associationName][recursiveAssociationItem.j], this.prepareAssociatedData(recursiveAssociationItem.associatedRecord, recursiveAssociationItem.ids, recursiveAssociationItem.associationType));
            }
        }
      } else if (allow && (type.toLowerCase() == 'belongsto' || type.toLowerCase() == 'hasone')) 
      {
        associatedRecord = record[association.getInstanceName()];
        if (associatedRecord !== undefined) 
        {
          id = associatedRecord.id;
          if (Ext.Array.indexOf(ids, id) === -1) 
          {
            ids.push(id);
            associationData[associationName] = associatedRecord.getData();
            Ext.apply(associationData[associationName], this.prepareAssociatedData(associatedRecord, ids, associationType));
          }
        }
      }
    }
  return associationData;
}, join: function(store) {
  Ext.Array.include(this.stores, store);
}, unjoin: function(store) {
  Ext.Array.remove(this.stores, store);
}, setDirty: function() {
  var me = this, name;
  me.dirty = true;
  me.fields.each(function(field) {
  if (field.getPersist()) 
  {
    name = field.getName();
    me.modified[name] = me.get(name);
  }
});
}, validate: function() {
  var errors = Ext.create('Ext.data.Errors'), validations = this.getValidations().items, validators = Ext.data.Validations, length, validation, field, valid, type, i;
  if (validations) 
  {
    length = validations.length;
    for (i = 0; i < length; i++) 
      {
        validation = validations[i];
        field = validation.field || validation.name;
        type = validation.type;
        valid = validators[type](validation, this.get(field));
        if (!valid) 
        {
          errors.add(Ext.create('Ext.data.Error', {field: field, message: validation.message || validators.getMessage(type)}));
        }
      }
  }
  return errors;
}, isValid: function() {
  return this.validate().isValid();
}, toUrl: function() {
  var pieces = this.$className.split('.'), name = pieces[pieces.length - 1].toLowerCase();
  return name + '/' + this.getId();
}, destroy: function() {
  var me = this;
  me.notifyStores('afterErase', me);
  if (me.getUseCache()) 
  {
    delete Ext.data.Model.cache[Ext.data.Model.generateCacheId(me)];
  }
  me.raw = me.stores = me.modified = null;
  me.callParent(arguments);
}, applyProxy: function(proxy, currentProxy) {
  return Ext.factory(proxy, Ext.data.Proxy, currentProxy, 'proxy');
}, updateProxy: function(proxy) {
  if (proxy) 
  {
    proxy.setModel(this.self);
  }
}, applyAssociations: function(associations) {
  if (associations) 
  {
    this.addAssociations(associations, 'hasMany');
  }
}, applyBelongsTo: function(belongsTo) {
  if (belongsTo) 
  {
    this.addAssociations(belongsTo, 'belongsTo');
  }
}, applyHasMany: function(hasMany) {
  if (hasMany) 
  {
    this.addAssociations(hasMany, 'hasMany');
  }
}, applyHasOne: function(hasOne) {
  if (hasOne) 
  {
    this.addAssociations(hasOne, 'hasOne');
  }
}, addAssociations: function(associations, defaultType) {
  var ln, i, association, name = this.self.modelName, associationsCollection = this.self.associations, onCreatedFn;
  associations = Ext.Array.from(associations);
  for (i = 0 , ln = associations.length; i < ln; i++) 
    {
      association = associations[i];
      if (!Ext.isObject(association)) 
      {
        association = {model: association};
      }
      Ext.applyIf(association, {type: defaultType, ownerModel: name, associatedModel: association.model});
      delete association.model;
      onCreatedFn = Ext.Function.bind(function(associationName) {
  associationsCollection.add(Ext.data.association.Association.create(this));
}, association);
      Ext.ClassManager.onCreated(onCreatedFn, this, (typeof association.associatedModel === 'string') ? association.associatedModel : Ext.getClassName(association.associatedModel));
    }
}, applyValidations: function(validations) {
  if (validations) 
  {
    if (!Ext.isArray(validations)) 
    {
      validations = [validations];
    }
    this.addValidations(validations);
  }
}, addValidations: function(validations) {
  this.self.validations.addAll(validations);
}, applyFields: function(fields) {
  var superFields = this.superclass.fields;
  if (superFields) 
  {
    fields = superFields.items.concat(fields || []);
  }
  return fields || [];
}, updateFields: function(fields) {
  var ln = fields.length, me = this, prototype = me.self.prototype, idProperty = this.getIdProperty(), idField, fieldsCollection, field, i;
  fieldsCollection = me._fields = me.fields = new Ext.util.Collection(prototype.getFieldName);
  for (i = 0; i < ln; i++) 
    {
      field = fields[i];
      if (!field.isField) 
      {
        field = new Ext.data.Field(fields[i]);
      }
      fieldsCollection.add(field);
    }
  idField = fieldsCollection.get(idProperty);
  if (!idField) 
  {
    fieldsCollection.add(new Ext.data.Field(idProperty));
  } else {
    idField.setType('auto');
  }
  fieldsCollection.addSorter(prototype.sortConvertFields);
}, applyIdentifier: function(identifier) {
  if (typeof identifier === 'string') 
  {
    identifier = {type: identifier};
  }
  return Ext.factory(identifier, Ext.data.identifier.Simple, this.getIdentifier(), 'data.identifier');
}, getFieldName: function(field) {
  return field.getName();
}, sortConvertFields: function(field1, field2) {
  var f1SpecialConvert = field1.hasCustomConvert(), f2SpecialConvert = field2.hasCustomConvert();
  if (f1SpecialConvert && !f2SpecialConvert) 
  {
    return 1;
  }
  if (!f1SpecialConvert && f2SpecialConvert) 
  {
    return -1;
  }
  return 0;
}, onClassExtended: function(cls, data, hooks) {
  var onBeforeClassCreated = hooks.onBeforeCreated, Model = this, prototype = Model.prototype, configNameCache = Ext.Class.configNameCache, staticConfigs = prototype.staticConfigs.concat(data.staticConfigs || []), defaultConfig = prototype.config, config = data.config || {}, key;
  data.config = config;
  hooks.onBeforeCreated = function(cls, data) {
  var dependencies = [], prototype = cls.prototype, statics = {}, config = prototype.config, staticConfigsLn = staticConfigs.length, copyMethods = ['set', 'get'], copyMethodsLn = copyMethods.length, associations = config.associations || [], name = Ext.getClassName(cls), key, methodName, i, j, ln;
  for (i = 0; i < staticConfigsLn; i++) 
    {
      key = staticConfigs[i];
      for (j = 0; j < copyMethodsLn; j++) 
        {
          methodName = configNameCache[key][copyMethods[j]];
          if (methodName in prototype) 
          {
            statics[methodName] = Model.generateProxyMethod(methodName);
          }
        }
    }
  cls.addStatics(statics);
  cls.modelName = name;
  prototype.modelName = name;
  if (config.belongsTo) 
  {
    dependencies.push('association.belongsto');
  }
  if (config.hasMany) 
  {
    dependencies.push('association.hasmany');
  }
  if (config.hasOne) 
  {
    dependencies.push('association.hasone');
  }
  for (i = 0 , ln = associations.length; i < ln; ++i) 
    {
      dependencies.push('association.' + associations[i].type.toLowerCase());
    }
  if (config.identifier) 
  {
    if (typeof config.identifier === 'string') 
    {
      dependencies.push('data.identifier.' + config.identifier);
    } else if (typeof config.identifier.type === 'string') 
    {
      dependencies.push('data.identifier.' + config.identifier.type);
    }
  }
  if (config.proxy) 
  {
    if (typeof config.proxy === 'string') 
    {
      dependencies.push('proxy.' + config.proxy);
    } else if (typeof config.proxy.type === 'string') 
    {
      dependencies.push('proxy.' + config.proxy.type);
    }
  }
  if (config.validations) 
  {
    dependencies.push('Ext.data.Validations');
  }
  Ext.require(dependencies, function() {
  Ext.Function.interceptBefore(hooks, 'onCreated', function() {
  Ext.data.ModelManager.registerType(name, cls);
  var superCls = cls.prototype.superclass;
  cls.prototype.associations = cls.associations = cls.prototype._associations = (superCls && superCls.associations) ? superCls.associations.clone() : new Ext.util.Collection(function(association) {
  return association.getName();
});
  cls.prototype.validations = cls.validations = cls.prototype._validations = (superCls && superCls.validations) ? superCls.validations.clone() : new Ext.util.Collection(function(validation) {
  return validation.field ? (validation.field + '-' + validation.type) : (validation.name + '-' + validation.type);
});
  cls.prototype = Ext.Object.chain(cls.prototype);
  cls.prototype.initConfig.call(cls.prototype, config);
  delete cls.prototype.initConfig;
});
  onBeforeClassCreated.call(Model, cls, data, hooks);
});
};
}});

Ext.define('Ext.data.StoreManager', {extend: 'Ext.util.Collection', alternateClassName: ['Ext.StoreMgr', 'Ext.data.StoreMgr', 'Ext.StoreManager'], singleton: true, register: function() {
  for (var i = 0, s; (s = arguments[i]); i++) 
    {
      this.add(s);
    }
}, unregister: function() {
  for (var i = 0, s; (s = arguments[i]); i++) 
    {
      this.remove(this.lookup(s));
    }
}, lookup: function(store) {
  if (Ext.isArray(store)) 
  {
    var fields = ['field1'], expand = !Ext.isArray(store[0]), data = store, i, len;
    if (expand) 
    {
      data = [];
      for (i = 0 , len = store.length; i < len; ++i) 
        {
          data.push([store[i]]);
        }
    } else {
      for (i = 2 , len = store[0].length; i <= len; ++i) 
        {
          fields.push('field' + i);
        }
    }
    return Ext.create('Ext.data.ArrayStore', {data: data, fields: fields, autoDestroy: true, autoCreated: true, expanded: expand});
  }
  if (Ext.isString(store)) 
  {
    return this.get(store);
  } else {
    if (store instanceof Ext.data.Store) 
    {
      return store;
    } else {
      return Ext.factory(store, Ext.data.Store, null, 'store');
    }
  }
}, getKey: function(o) {
  return o.getStoreId();
}}, function() {
  Ext.regStore = function(name, config) {
  var store;
  if (Ext.isObject(name)) 
  {
    config = name;
  } else {
    if (config instanceof Ext.data.Store) 
    {
      config.setStoreId(name);
    } else {
      config.storeId = name;
    }
  }
  if (config instanceof Ext.data.Store) 
  {
    store = config;
  } else {
    store = Ext.create('Ext.data.Store', config);
  }
  return Ext.data.StoreManager.register(store);
};
  Ext.getStore = function(name) {
  return Ext.data.StoreManager.lookup(name);
};
});

Ext.define('Ext.util.Grouper', {extend: 'Ext.util.Sorter', isGrouper: true, config: {groupFn: null, sortProperty: null, sorterFn: function(item1, item2) {
  var property = this.getSortProperty(), groupFn, group1, group2, modifier;
  groupFn = this.getGroupFn();
  group1 = groupFn.call(this, item1);
  group2 = groupFn.call(this, item2);
  if (property) 
  {
    if (group1 !== group2) 
    {
      return this.defaultSortFn.call(this, item1, item2);
    } else {
      return 0;
    }
  }
  return (group1 > group2) ? 1 : ((group1 < group2) ? -1 : 0);
}}, defaultSortFn: function(item1, item2) {
  var me = this, transform = me._transform, root = me._root, value1, value2, property = me._sortProperty;
  if (root !== null) 
  {
    item1 = item1[root];
    item2 = item2[root];
  }
  value1 = item1[property];
  value2 = item2[property];
  if (transform) 
  {
    value1 = transform(value1);
    value2 = transform(value2);
  }
  return value1 > value2 ? 1 : (value1 < value2 ? -1 : 0);
}, updateProperty: function(property) {
  this.setGroupFn(this.standardGroupFn);
}, standardGroupFn: function(item) {
  var root = this.getRoot(), property = this.getProperty(), data = item;
  if (root) 
  {
    data = item[root];
  }
  return data[property];
}, getGroupString: function(item) {
  var group = this.getGroupFn().call(this, item);
  return (group !== null && typeof group != 'undefined') ? group.toString() : '';
}});

Ext.define('Ext.data.Store', {alias: 'store.store', extend: 'Ext.Evented', statics: {create: function(store) {
  if (!store.isStore) 
  {
    if (!store.type) 
    {
      store.type = 'store';
    }
    store = Ext.createByAlias('store.' + store.type, store);
  }
  return store;
}}, isStore: true, config: {storeId: undefined, data: null, autoLoad: null, autoSync: false, model: undefined, proxy: undefined, fields: null, remoteSort: false, remoteFilter: false, remoteGroup: false, filters: null, sorters: null, grouper: null, groupField: null, groupDir: null, getGroupString: null, pageSize: 25, totalCount: null, clearOnPageLoad: true, params: {}, modelDefaults: {}, autoDestroy: false, syncRemovedRecords: true, destroyRemovedRecords: true, buffered: false, plugins: null}, currentPage: 1, constructor: function(config) {
  config = config || {};
  this.data = this._data = this.createDataCollection();
  this.data.setSortRoot('data');
  this.data.setFilterRoot('data');
  this.removed = [];
  if (config.id && !config.storeId) 
  {
    config.storeId = config.id;
    delete config.id;
  }
  this.initConfig(config);
  this.callParent(arguments);
}, applyPlugins: function(config) {
  var ln, i, configObj;
  if (!config) 
  {
    return config;
  }
  config = [].concat(config);
  for (i = 0 , ln = config.length; i < ln; i++) 
    {
      configObj = config[i];
      config[i] = Ext.factory(configObj, 'Ext.plugin.Plugin', null, 'plugin');
    }
  return config;
}, updatePlugins: function(newPlugins, oldPlugins) {
  var ln, i;
  if (newPlugins) 
  {
    for (i = 0 , ln = newPlugins.length; i < ln; i++) 
      {
        newPlugins[i].init(this);
      }
  }
  if (oldPlugins) 
  {
    for (i = 0 , ln = oldPlugins.length; i < ln; i++) 
      {
        Ext.destroy(oldPlugins[i]);
      }
  }
}, createDataCollection: function() {
  return new Ext.util.Collection(function(record) {
  return record.getId();
});
}, applyStoreId: function(storeId) {
  if (storeId === undefined || storeId === null) 
  {
    storeId = this.getUniqueId();
  }
  return storeId;
}, updateStoreId: function(storeId, oldStoreId) {
  if (oldStoreId) 
  {
    Ext.data.StoreManager.unregister(this);
  }
  if (storeId) 
  {
    Ext.data.StoreManager.register(this);
  }
}, applyModel: function(model) {
  if (typeof model == 'string') 
  {
    var registeredModel = Ext.data.ModelManager.getModel(model);
    if (!registeredModel) 
    {
      Ext.Logger.error('Model with name "' + model + '" does not exist.');
    }
    model = registeredModel;
  }
  if (model && !model.prototype.isModel && Ext.isObject(model)) 
  {
    model = Ext.data.ModelManager.registerType(model.storeId || model.id || Ext.id(), model);
  }
  if (!model) 
  {
    var fields = this.getFields(), data = this.config.data;
    if (!fields && data && data.length) 
    {
      fields = Ext.Object.getKeys(data[0]);
    }
    if (fields) 
    {
      model = Ext.define('Ext.data.Store.ImplicitModel-' + (this.getStoreId() || Ext.id()), {extend: 'Ext.data.Model', config: {fields: fields, useCache: false, proxy: this.getProxy()}});
      this.implicitModel = true;
    }
  }
  if (!model && this.getProxy()) 
  {
    model = this.getProxy().getModel();
  }
  return model;
}, updateModel: function(model) {
  var proxy = this.getProxy();
  if (proxy && !proxy.getModel()) 
  {
    proxy.setModel(model);
  }
}, applyProxy: function(proxy, currentProxy) {
  proxy = Ext.factory(proxy, Ext.data.Proxy, currentProxy, 'proxy');
  if (!proxy && this.getModel()) 
  {
    proxy = this.getModel().getProxy();
  }
  if (!proxy) 
  {
    proxy = new Ext.data.proxy.Memory({model: this.getModel()});
  }
  if (proxy.isMemoryProxy) 
  {
    this.setSyncRemovedRecords(false);
  }
  return proxy;
}, updateProxy: function(proxy, oldProxy) {
  if (proxy) 
  {
    if (!proxy.getModel()) 
    {
      proxy.setModel(this.getModel());
    }
    proxy.on('metachange', 'onMetaChange', this);
  }
  if (oldProxy) 
  {
    proxy.un('metachange', 'onMetaChange', this);
  }
}, applyData: function(data) {
  var me = this, proxy;
  if (data) 
  {
    proxy = me.getProxy();
    if (proxy instanceof Ext.data.proxy.Memory) 
    {
      proxy.setData(data);
      me.load();
      return;
    } else {
      me.removeAll(true);
      me.fireEvent('clear', me);
      me.suspendEvents();
      me.add(data);
      me.resumeEvents();
      me.dataLoaded = true;
    }
  } else {
    me.removeAll(true);
    me.fireEvent('clear', me);
  }
  me.fireEvent('refresh', me, me.data);
}, clearData: function() {
  this.setData(null);
}, addData: function(data) {
  var reader = this.getProxy().getReader(), resultSet = reader.read(data), records = resultSet.getRecords();
  this.add(records);
}, updateAutoLoad: function(autoLoad) {
  var proxy = this.getProxy();
  if (autoLoad && (proxy && !proxy.isMemoryProxy)) 
  {
    this.load(Ext.isObject(autoLoad) ? autoLoad : null);
  }
}, isAutoLoading: function() {
  var proxy = this.getProxy();
  return (this.getAutoLoad() || (proxy && proxy.isMemoryProxy) || this.dataLoaded);
}, updateGroupField: function(groupField) {
  var grouper = this.getGrouper();
  if (groupField) 
  {
    if (!grouper) 
    {
      this.setGrouper({property: groupField, direction: this.getGroupDir() || 'ASC'});
    } else {
      grouper.setProperty(groupField);
    }
  } else if (grouper) 
  {
    this.setGrouper(null);
  }
}, updateGroupDir: function(groupDir) {
  var grouper = this.getGrouper();
  if (grouper) 
  {
    grouper.setDirection(groupDir);
  }
}, applyGetGroupString: function(getGroupStringFn) {
  var grouper = this.getGrouper();
  if (getGroupStringFn) 
  {
    if (grouper) 
    {
      grouper.setGroupFn(getGroupStringFn);
    } else {
      this.setGrouper({groupFn: getGroupStringFn});
    }
  } else if (grouper) 
  {
    this.setGrouper(null);
  }
}, applyGrouper: function(grouper) {
  if (typeof grouper == 'string') 
  {
    grouper = {property: grouper};
  } else if (typeof grouper == 'function') 
  {
    grouper = {groupFn: grouper};
  }
  grouper = Ext.factory(grouper, Ext.util.Grouper);
  return grouper;
}, updateGrouper: function(grouper, oldGrouper) {
  var data = this.data;
  if (oldGrouper) 
  {
    data.removeSorter(oldGrouper);
    if (!grouper) 
    {
      data.getSorters().removeSorter('isGrouper');
    }
  }
  if (grouper) 
  {
    data.insertSorter(0, grouper);
    if (!oldGrouper) 
    {
      data.getSorters().addSorter({direction: 'DESC', property: 'isGrouper', transform: function(value) {
  return (value === true) ? 1 : -1;
}});
    }
  }
  if (oldGrouper) 
  {
    this.fireEvent('refresh', this, data);
  }
}, isGrouped: function() {
  return !!this.getGrouper();
}, updateSorters: function(sorters) {
  var grouper = this.getGrouper(), data = this.data, autoSort = data.getAutoSort();
  data.setAutoSort(false);
  data.setSorters(sorters);
  if (grouper) 
  {
    data.insertSorter(0, grouper);
  }
  this.updateSortTypes();
  data.setAutoSort(autoSort);
}, updateSortTypes: function() {
  var model = this.getModel(), fields = model && model.getFields(), data = this.data;
  if (fields) 
  {
    data.getSorters().each(function(sorter) {
  var property = sorter.getProperty(), field;
  if (!sorter.isGrouper && property && !sorter.getTransform()) 
  {
    field = fields.get(property);
    if (field) 
    {
      sorter.setTransform(field.getSortType());
    }
  }
});
  }
}, updateFilters: function(filters) {
  this.data.setFilters(filters);
}, add: function(records) {
  if (!Ext.isArray(records)) 
  {
    records = Array.prototype.slice.call(arguments);
  }
  return this.insert(this.data.length, records);
}, insert: function(index, records) {
  if (!Ext.isArray(records)) 
  {
    records = Array.prototype.slice.call(arguments, 1);
  }
  var me = this, sync = false, data = this.data, ln = records.length, Model = this.getModel(), modelDefaults = me.getModelDefaults(), added = false, i, record;
  records = records.slice();
  for (i = 0; i < ln; i++) 
    {
      record = records[i];
      if (!record.isModel) 
      {
        record = new Model(record);
      } else if (this.removed.indexOf(record) != -1) 
      {
        Ext.Array.remove(this.removed, record);
      }
      record.set(modelDefaults);
      record.join(me);
      records[i] = record;
      sync = sync || (record.phantom === true);
    }
  if (records.length === 1) 
  {
    added = data.insert(index, records[0]);
    if (added) 
    {
      added = [added];
    }
  } else {
    added = data.insertAll(index, records);
  }
  if (added) 
  {
    me.fireEvent('addrecords', me, added);
  }
  if (me.getAutoSync() && sync) 
  {
    me.sync();
  }
  return records;
}, remove: function(records) {
  if (records.isModel) 
  {
    records = [records];
  }
  var me = this, sync = false, i = 0, autoSync = this.getAutoSync(), syncRemovedRecords = me.getSyncRemovedRecords(), destroyRemovedRecords = this.getDestroyRemovedRecords(), ln = records.length, indices = [], removed = [], isPhantom, items = me.data.items, record, index;
  for (; i < ln; i++) 
    {
      record = records[i];
      if (me.data.contains(record)) 
      {
        isPhantom = (record.phantom === true);
        index = items.indexOf(record);
        if (index !== -1) 
        {
          removed.push(record);
          indices.push(index);
        }
        record.unjoin(me);
        me.data.remove(record);
        if (destroyRemovedRecords && !syncRemovedRecords && !record.stores.length) 
        {
          record.destroy();
        } else if (!isPhantom && syncRemovedRecords) 
        {
          me.removed.push(record);
        }
        sync = sync || !isPhantom;
      }
    }
  me.fireEvent('removerecords', me, removed, indices);
  if (autoSync && sync) 
  {
    me.sync();
  }
}, removeAt: function(index) {
  var record = this.getAt(index);
  if (record) 
  {
    this.remove(record);
  }
}, removeAll: function(silent) {
  if (silent !== true && this.eventFiringSuspended !== true) 
  {
    this.fireAction('clear', [this], 'doRemoveAll');
  } else {
    this.doRemoveAll.call(this, true);
  }
}, doRemoveAll: function(silent) {
  var me = this, destroyRemovedRecords = this.getDestroyRemovedRecords(), syncRemovedRecords = this.getSyncRemovedRecords(), records = me.data.all.slice(), ln = records.length, i, record;
  for (i = 0; i < ln; i++) 
    {
      record = records[i];
      record.unjoin(me);
      if (destroyRemovedRecords && !syncRemovedRecords && !record.stores.length) 
      {
        record.destroy();
      } else if (record.phantom !== true && syncRemovedRecords) 
      {
        me.removed.push(record);
      }
    }
  me.data.clear();
  if (silent !== true) 
  {
    me.fireEvent('refresh', me, me.data);
  }
  if (me.getAutoSync()) 
  {
    this.sync();
  }
}, each: function(fn, scope) {
  this.data.each(fn, scope);
}, getCount: function() {
  return this.data.items.length || 0;
}, getAllCount: function() {
  return this.data.all.length || 0;
}, getAt: function(index) {
  return this.data.getAt(index);
}, getRange: function(start, end) {
  return this.data.getRange(start, end);
}, getById: function(id) {
  return this.data.findBy(function(record) {
  return record.getId() == id;
});
}, indexOf: function(record) {
  return this.data.indexOf(record);
}, indexOfId: function(id) {
  return this.data.indexOfKey(id);
}, afterEdit: function(record, modifiedFieldNames, modified) {
  var me = this, data = me.data, currentId = modified[record.getIdProperty()] || record.getId(), currentIndex = data.keys.indexOf(currentId), newIndex;
  if (currentIndex === -1 && data.map[currentId] === undefined) 
  {
    return;
  }
  if (me.getAutoSync()) 
  {
    me.sync();
  }
  if (currentId !== record.getId()) 
  {
    data.replace(currentId, record);
  } else {
    data.replace(record);
  }
  newIndex = data.indexOf(record);
  if (currentIndex === -1 && newIndex !== -1) 
  {
    me.fireEvent('addrecords', me, [record]);
  } else if (currentIndex !== -1 && newIndex === -1) 
  {
    me.fireEvent('removerecords', me, [record], [currentIndex]);
  } else if (newIndex !== -1) 
  {
    me.fireEvent('updaterecord', me, record, newIndex, currentIndex, modifiedFieldNames, modified);
  }
}, afterReject: function(record) {
  var index = this.data.indexOf(record);
  this.fireEvent('updaterecord', this, record, index, index, [], {});
}, afterCommit: function(record, modifiedFieldNames, modified) {
  var me = this, data = me.data, currentId = modified[record.getIdProperty()] || record.getId(), currentIndex = data.keys.indexOf(currentId), newIndex;
  if (currentIndex === -1 && data.map[currentId] === undefined) 
  {
    return;
  }
  if (currentId !== record.getId()) 
  {
    data.replace(currentId, record);
  } else {
    data.replace(record);
  }
  newIndex = data.indexOf(record);
  if (currentIndex === -1 && newIndex !== -1) 
  {
    me.fireEvent('addrecords', me, [record]);
  } else if (currentIndex !== -1 && newIndex === -1) 
  {
    me.fireEvent('removerecords', me, [record], [currentIndex]);
  } else if (newIndex !== -1) 
  {
    me.fireEvent('updaterecord', me, record, newIndex, currentIndex, modifiedFieldNames, modified);
  }
}, afterErase: function(record) {
  var me = this, data = me.data, index = data.indexOf(record);
  if (index !== -1) 
  {
    data.remove(record);
    me.fireEvent('removerecords', me, [record], [index]);
  }
}, applyRemoteFilter: function(value) {
  var proxy = this.getProxy();
  return value || (proxy && proxy.isSQLProxy === true);
}, applyRemoteSort: function(value) {
  var proxy = this.getProxy();
  return value || (proxy && proxy.isSQLProxy === true);
}, applyRemoteGroup: function(value) {
  var proxy = this.getProxy();
  return value || (proxy && proxy.isSQLProxy === true);
}, updateRemoteFilter: function(remoteFilter) {
  this.data.setAutoFilter(!remoteFilter);
}, updateRemoteSort: function(remoteSort) {
  this.data.setAutoSort(!remoteSort);
}, sort: function(sorters, defaultDirection, where) {
  var data = this.data, grouper = this.getGrouper(), autoSort = data.getAutoSort();
  if (sorters) 
  {
    data.setAutoSort(false);
    if (typeof where === 'string') 
    {
      if (where == 'prepend') 
      {
        data.insertSorters(grouper ? 1 : 0, sorters, defaultDirection);
      } else {
        data.addSorters(sorters, defaultDirection);
      }
    } else {
      data.setSorters(null);
      if (grouper) 
      {
        data.addSorters(grouper);
      }
      data.addSorters(sorters, defaultDirection);
    }
    this.updateSortTypes();
    data.setAutoSort(autoSort);
  }
  if (!this.getRemoteSort()) 
  {
    if (!sorters) 
    {
      this.data.sort();
    }
    this.fireEvent('sort', this, this.data, this.data.getSorters());
    if (data.length) 
    {
      this.fireEvent('refresh', this, this.data);
    }
  }
}, filter: function(property, value, anyMatch, caseSensitive) {
  var data = this.data, filter = null;
  if (property) 
  {
    if (Ext.isFunction(property)) 
    {
      filter = {filterFn: property};
    } else if (Ext.isArray(property) || property.isFilter) 
    {
      filter = property;
    } else {
      filter = {property: property, value: value, anyMatch: anyMatch, caseSensitive: caseSensitive, id: property};
    }
  }
  if (this.getRemoteFilter()) 
  {
    data.addFilters(filter);
  } else {
    data.filter(filter);
    this.fireEvent('filter', this, data, data.getFilters());
    this.fireEvent('refresh', this, data);
  }
}, filterBy: function(fn, scope) {
  var me = this, data = me.data, ln = data.length;
  data.filter({filterFn: function(record) {
  return fn.call(scope || me, record, record.getId());
}});
  this.fireEvent('filter', this, data, data.getFilters());
  if (data.length !== ln) 
  {
    this.fireEvent('refresh', this, data);
  }
}, queryBy: function(fn, scope) {
  return this.data.filterBy(fn, scope || this);
}, clearFilter: function(suppressEvent) {
  var ln = this.data.length;
  if (suppressEvent) 
  {
    this.suspendEvents();
  }
  this.data.setFilters(null);
  if (suppressEvent) 
  {
    this.resumeEvents(true);
  } else if (ln !== this.data.length) 
  {
    this.fireEvent('refresh', this, this.data);
  }
}, isFiltered: function() {
  return this.data.filtered;
}, isSorted: function() {
  return this.data.sorted;
}, getSorters: function() {
  var sorters = this.data.getSorters();
  return (sorters) ? sorters.items : [];
}, getFilters: function() {
  var filters = this.data.getFilters();
  return (filters) ? filters.items : [];
}, getGroups: function(requestGroupString) {
  var records = this.data.items, length = records.length, grouper = this.getGrouper(), groups = [], pointers = {}, record, groupStr, group, i;
  for (i = 0; i < length; i++) 
    {
      record = records[i];
      groupStr = grouper.getGroupString(record);
      group = pointers[groupStr];
      if (group === undefined) 
      {
        group = {name: groupStr, children: []};
        groups.push(group);
        pointers[groupStr] = group;
      }
      group.children.push(record);
    }
  return requestGroupString ? pointers[requestGroupString] : groups;
}, getGroupString: function(record) {
  var grouper = this.getGrouper();
  if (grouper) 
  {
    return grouper.getGroupString(record);
  }
  return null;
}, find: function(fieldName, value, startIndex, anyMatch, caseSensitive, exactMatch) {
  var filter = Ext.create('Ext.util.Filter', {property: fieldName, value: value, anyMatch: anyMatch, caseSensitive: caseSensitive, exactMatch: exactMatch, root: 'data'});
  return this.data.findIndexBy(filter.getFilterFn(), null, startIndex);
}, findRecord: function() {
  var me = this, index = me.find.apply(me, arguments);
  return index !== -1 ? me.getAt(index) : null;
}, findExact: function(fieldName, value, startIndex) {
  return this.data.findIndexBy(function(record) {
  return record.get(fieldName) === value;
}, this, startIndex);
}, findBy: function(fn, scope, startIndex) {
  return this.data.findIndexBy(fn, scope, startIndex);
}, load: function(options, scope) {
  var me = this, operation, currentPage = me.currentPage, pageSize = me.getPageSize();
  options = options || {};
  if (Ext.isFunction(options)) 
  {
    options = {callback: options, scope: scope || this};
  }
  if (me.getRemoteSort()) 
  {
    options.sorters = options.sorters || this.getSorters();
  }
  if (me.getRemoteFilter()) 
  {
    options.filters = options.filters || this.getFilters();
  }
  if (me.getRemoteGroup()) 
  {
    options.grouper = options.grouper || this.getGrouper();
  }
  Ext.applyIf(options, {page: currentPage, start: (currentPage - 1) * pageSize, limit: pageSize, addRecords: false, action: 'read', params: this.getParams(), model: this.getModel()});
  operation = Ext.create('Ext.data.Operation', options);
  if (me.fireEvent('beforeload', me, operation) !== false) 
  {
    me.loading = true;
    me.getProxy().read(operation, me.onProxyLoad, me);
  }
  return me;
}, isLoading: function() {
  return Boolean(this.loading);
}, isLoaded: function() {
  return Boolean(this.loaded);
}, sync: function(options) {
  var me = this, operations = {}, toCreate = me.getNewRecords(), toUpdate = me.getUpdatedRecords(), toDestroy = me.getRemovedRecords(), needsSync = false;
  if (toCreate.length > 0) 
  {
    operations.create = toCreate;
    needsSync = true;
  }
  if (toUpdate.length > 0) 
  {
    operations.update = toUpdate;
    needsSync = true;
  }
  if (toDestroy.length > 0) 
  {
    operations.destroy = toDestroy;
    needsSync = true;
  }
  if (needsSync && me.fireEvent('beforesync', this, operations) !== false) 
  {
    me.getProxy().batch(Ext.merge({operations: operations, listeners: me.getBatchListeners()}, options || {}));
  }
  return {added: toCreate, updated: toUpdate, removed: toDestroy};
}, first: function() {
  return this.data.first();
}, last: function() {
  return this.data.last();
}, sum: function(field) {
  var total = 0, i = 0, records = this.data.items, len = records.length;
  for (; i < len; ++i) 
    {
      total += records[i].get(field);
    }
  return total;
}, min: function(field) {
  var i = 1, records = this.data.items, len = records.length, value, min;
  if (len > 0) 
  {
    min = records[0].get(field);
  }
  for (; i < len; ++i) 
    {
      value = records[i].get(field);
      if (value < min) 
      {
        min = value;
      }
    }
  return min;
}, max: function(field) {
  var i = 1, records = this.data.items, len = records.length, value, max;
  if (len > 0) 
  {
    max = records[0].get(field);
  }
  for (; i < len; ++i) 
    {
      value = records[i].get(field);
      if (value > max) 
      {
        max = value;
      }
    }
  return max;
}, average: function(field) {
  var i = 0, records = this.data.items, len = records.length, sum = 0;
  if (records.length > 0) 
  {
    for (; i < len; ++i) 
      {
        sum += records[i].get(field);
      }
    return sum / len;
  }
  return 0;
}, getBatchListeners: function() {
  return {scope: this, exception: this.onBatchException, complete: this.onBatchComplete};
}, onBatchComplete: function(batch) {
  var me = this, operations = batch.operations, length = operations.length, i;
  for (i = 0; i < length; i++) 
    {
      me.onProxyWrite(operations[i]);
    }
}, onBatchException: function(batch, operation) {
}, onProxyLoad: function(operation) {
  var me = this, records = operation.getRecords(), resultSet = operation.getResultSet(), successful = operation.wasSuccessful();
  if (resultSet) 
  {
    me.setTotalCount(resultSet.getTotal());
  }
  if (successful) 
  {
    this.fireAction('datarefresh', [this, this.data, operation], 'doDataRefresh');
  }
  me.loaded = true;
  me.loading = false;
  me.fireEvent('load', this, records, successful, operation);
  Ext.callback(operation.getCallback(), operation.getScope() || me, [records, operation, successful]);
}, doDataRefresh: function(store, data, operation) {
  var records = operation.getRecords(), me = this, destroyRemovedRecords = me.getDestroyRemovedRecords(), currentRecords = data.all.slice(), ln = currentRecords.length, ln2 = records.length, ids = {}, i, record;
  if (operation.getAddRecords() !== true) 
  {
    for (i = 0; i < ln2; i++) 
      {
        ids[records[i].id] = true;
      }
    for (i = 0; i < ln; i++) 
      {
        record = currentRecords[i];
        record.unjoin(me);
        if (ids[record.id] !== true && destroyRemovedRecords && !record.stores.length) 
        {
          record.destroy();
        }
      }
    data.clear();
    me.fireEvent('clear', me);
  }
  if (records && records.length) 
  {
    me.suspendEvents();
    me.add(records);
    me.resumeEvents(true);
  }
  me.fireEvent('refresh', me, data);
}, onProxyWrite: function(operation) {
  var me = this, success = operation.wasSuccessful(), records = operation.getRecords();
  switch (operation.getAction()) {
    case 'create':
      me.onCreateRecords(records, operation, success);
      break;
    case 'update':
      me.onUpdateRecords(records, operation, success);
      break;
    case 'destroy':
      me.onDestroyRecords(records, operation, success);
      break;
  }
  if (success) 
  {
    me.fireEvent('write', me, operation);
  }
  Ext.callback(operation.getCallback(), operation.getScope() || me, [records, operation, success]);
}, onCreateRecords: function(records, operation, success) {
}, onUpdateRecords: function(records, operation, success) {
}, onDestroyRecords: function(records, operation, success) {
  this.removed = [];
}, onMetaChange: function(data) {
  var model = this.getProxy().getModel();
  if (!this.getModel() && model) 
  {
    this.setModel(model);
  }
  this.fireEvent('metachange', this, data);
}, getNewRecords: function() {
  return this.data.filterBy(function(item) {
  return item.phantom === true && item.isValid();
}).items;
}, getUpdatedRecords: function() {
  return this.data.filterBy(function(item) {
  return item.dirty === true && item.phantom !== true && item.isValid();
}).items;
}, getRemovedRecords: function() {
  return this.removed;
}, loadPage: function(page, options, scope) {
  if (typeof options === 'function') 
  {
    options = {callback: options, scope: scope || this};
  }
  var me = this, pageSize = me.getPageSize(), clearOnPageLoad = me.getClearOnPageLoad();
  options = Ext.apply({}, options);
  me.currentPage = page;
  me.load(Ext.applyIf(options, {page: page, start: (page - 1) * pageSize, limit: pageSize, addRecords: !clearOnPageLoad}));
}, nextPage: function(options) {
  this.loadPage(this.currentPage + 1, options);
}, previousPage: function(options) {
  this.loadPage(this.currentPage - 1, options);
}, destroy: function() {
  this.clearData();
  var proxy = this.getProxy();
  if (proxy) 
  {
    proxy.onDestroy();
  }
  Ext.data.StoreManager.unregister(this);
  Ext.destroy(this.getPlugins());
  if (this.implicitModel && this.getModel()) 
  {
    delete Ext.data.ModelManager.types[this.getModel().getName()];
  }
  Ext.destroy(this.data);
  this.callParent(arguments);
}});

Ext.define('Ext.data.ArrayStore', {extend: 'Ext.data.Store', alias: 'store.array', config: {proxy: {type: 'memory', reader: 'array'}}, loadData: function(data, append) {
  this.callParent([data, append]);
}}, function() {
  Ext.data.SimpleStore = Ext.data.ArrayStore;
});

Ext.define('Ext.data.JsonP', {alternateClassName: 'Ext.util.JSONP', singleton: true, requestCount: 0, requests: {}, timeout: 30000, disableCaching: true, disableCachingParam: '_dc', callbackKey: 'callback', request: function(options) {
  options = Ext.apply({}, options);
  var me = this, disableCaching = Ext.isDefined(options.disableCaching) ? options.disableCaching : me.disableCaching, cacheParam = options.disableCachingParam || me.disableCachingParam, id = ++me.requestCount, callbackName = options.callbackName || 'callback' + id, callbackKey = options.callbackKey || me.callbackKey, timeout = Ext.isDefined(options.timeout) ? options.timeout : me.timeout, params = Ext.apply({}, options.params), url = options.url, name = Ext.isSandboxed ? Ext.getUniqueGlobalNamespace() : 'Ext', request, script;
  params[callbackKey] = name + '.data.JsonP.' + callbackName;
  if (disableCaching) 
  {
    params[cacheParam] = new Date().getTime();
  }
  script = me.createScript(url, params, options);
  me.requests[id] = request = {url: url, params: params, script: script, id: id, scope: options.scope, success: options.success, failure: options.failure, callback: options.callback, callbackKey: callbackKey, callbackName: callbackName};
  if (timeout > 0) 
  {
    request.timeout = setTimeout(Ext.bind(me.handleTimeout, me, [request]), timeout);
  }
  me.setupErrorHandling(request);
  me[callbackName] = Ext.bind(me.handleResponse, me, [request], true);
  me.loadScript(request);
  return request;
}, abort: function(request) {
  var requests = this.requests, key;
  if (request) 
  {
    if (!request.id) 
    {
      request = requests[request];
    }
    this.handleAbort(request);
  } else {
    for (key in requests) 
      {
        if (requests.hasOwnProperty(key)) 
        {
          this.abort(requests[key]);
        }
      }
  }
}, setupErrorHandling: function(request) {
  request.script.onerror = Ext.bind(this.handleError, this, [request]);
}, handleAbort: function(request) {
  request.errorType = 'abort';
  this.handleResponse(null, request);
}, handleError: function(request) {
  request.errorType = 'error';
  this.handleResponse(null, request);
}, cleanupErrorHandling: function(request) {
  request.script.onerror = null;
}, handleTimeout: function(request) {
  request.errorType = 'timeout';
  this.handleResponse(null, request);
}, handleResponse: function(result, request) {
  var success = true;
  if (request.timeout) 
  {
    clearTimeout(request.timeout);
  }
  delete this[request.callbackName];
  delete this.requests[request.id];
  this.cleanupErrorHandling(request);
  Ext.fly(request.script).destroy();
  if (request.errorType) 
  {
    success = false;
    Ext.callback(request.failure, request.scope, [request.errorType, request]);
  } else {
    Ext.callback(request.success, request.scope, [result, request]);
  }
  Ext.callback(request.callback, request.scope, [success, result, request.errorType, request]);
}, createScript: function(url, params, options) {
  var script = document.createElement('script');
  script.setAttribute("src", Ext.urlAppend(url, Ext.Object.toQueryString(params)));
  script.setAttribute("async", true);
  script.setAttribute("type", "text/javascript");
  return script;
}, loadScript: function(request) {
  Ext.getHead().appendChild(request.script);
}});

Ext.define('Ext.data.Validations', {alternateClassName: 'Ext.data.validations', singleton: true, config: {presenceMessage: 'must be present', lengthMessage: 'is the wrong length', formatMessage: 'is the wrong format', inclusionMessage: 'is not included in the list of acceptable values', exclusionMessage: 'is not an acceptable value', emailMessage: 'is not a valid email address'}, constructor: function(config) {
  this.initConfig(config);
}, getMessage: function(type) {
  var getterFn = this['get' + type[0].toUpperCase() + type.slice(1) + 'Message'];
  if (getterFn) 
  {
    return getterFn.call(this);
  }
  return '';
}, emailRe: /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/, presence: function(config, value) {
  if (arguments.length === 1) 
  {
    value = config;
  }
  return !!value || value === 0;
}, length: function(config, value) {
  if (value === undefined || value === null) 
  {
    return false;
  }
  var length = value.length, min = config.min, max = config.max;
  if ((min && length < min) || (max && length > max)) 
  {
    return false;
  } else {
    return true;
  }
}, email: function(config, email) {
  return Ext.data.validations.emailRe.test(email);
}, format: function(config, value) {
  if (value === undefined || value === null) 
  {
    value = '';
  }
  return !!(config.matcher && config.matcher.test(value));
}, inclusion: function(config, value) {
  return config.list && Ext.Array.indexOf(config.list, value) != -1;
}, exclusion: function(config, value) {
  return config.list && Ext.Array.indexOf(config.list, value) == -1;
}});

Ext.define('Ext.data.proxy.JsonP', {extend: 'Ext.data.proxy.Server', alternateClassName: 'Ext.data.ScriptTagProxy', alias: ['proxy.jsonp', 'proxy.scripttag'], config: {defaultWriterType: 'base', callbackKey: 'callback', recordParam: 'records', autoAppendParams: true}, doRequest: function(operation, callback, scope) {
  var me = this, request = me.buildRequest(operation), params = request.getParams();
  request.setConfig({callbackKey: me.getCallbackKey(), timeout: me.getTimeout(), scope: me, callback: me.createRequestCallback(request, operation, callback, scope)});
  if (me.getAutoAppendParams()) 
  {
    request.setParams({});
  }
  request.setJsonP(Ext.data.JsonP.request(request.getCurrentConfig()));
  request.setParams(params);
  operation.setStarted();
  me.lastRequest = request;
  return request;
}, createRequestCallback: function(request, operation, callback, scope) {
  var me = this;
  return function(success, response, errorType) {
  delete me.lastRequest;
  me.processResponse(success, operation, request, response, callback, scope);
};
}, setException: function(operation, response) {
  operation.setException(operation.getRequest().getJsonP().errorType);
}, buildUrl: function(request) {
  var me = this, url = me.callParent(arguments), params = Ext.apply({}, request.getParams()), filters = params.filters, filter, i, value;
  delete params.filters;
  if (me.getAutoAppendParams()) 
  {
    url = Ext.urlAppend(url, Ext.Object.toQueryString(params));
  }
  if (filters && filters.length) 
  {
    for (i = 0; i < filters.length; i++) 
      {
        filter = filters[i];
        value = filter.getValue();
        if (value) 
        {
          url = Ext.urlAppend(url, filter.getProperty() + "=" + value);
        }
      }
  }
  return url;
}, destroy: function() {
  this.abort();
  this.callParent(arguments);
}, abort: function() {
  var lastRequest = this.lastRequest;
  if (lastRequest) 
  {
    Ext.data.JsonP.abort(lastRequest.getJsonP());
  }
}});

Ext.define('Ext.data.reader.Array', {extend: 'Ext.data.reader.Json', alternateClassName: 'Ext.data.ArrayReader', alias: 'reader.array', config: {totalProperty: undefined, successProperty: undefined}, createFieldAccessExpression: function(field, fieldVarName, dataName) {
  var me = this, mapping = field.getMapping(), index = (mapping == null) ? me.getModel().getFields().indexOf(field) : mapping, result;
  if (typeof index === 'function') 
  {
    result = fieldVarName + '.getMapping()(' + dataName + ', this)';
  } else {
    if (isNaN(index)) 
    {
      index = '"' + index + '"';
    }
    result = dataName + "[" + index + "]";
  }
  return result;
}});

Ext.define('Ext.mixin.Selectable', {extend: 'Ext.mixin.Mixin', mixinConfig: {id: 'selectable', hooks: {updateStore: 'updateStore'}}, config: {disableSelection: null, mode: 'SINGLE', allowDeselect: false, lastSelected: null, lastFocused: null, deselectOnContainerClick: true}, modes: {SINGLE: true, SIMPLE: true, MULTI: true}, selectableEventHooks: {addrecords: 'onSelectionStoreAdd', removerecords: 'onSelectionStoreRemove', updaterecord: 'onSelectionStoreUpdate', load: 'refreshSelection', refresh: 'refreshSelection'}, constructor: function() {
  this.selected = new Ext.util.MixedCollection();
  this.callParent(arguments);
}, applyMode: function(mode) {
  mode = mode ? mode.toUpperCase() : 'SINGLE';
  return this.modes[mode] ? mode : 'SINGLE';
}, updateStore: function(newStore, oldStore) {
  var me = this, bindEvents = Ext.apply({}, me.selectableEventHooks, {scope: me});
  if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) 
  {
    if (oldStore.autoDestroy) 
    {
      oldStore.destroy();
    } else {
      oldStore.un(bindEvents);
      if (newStore) 
      {
        newStore.un('clear', 'onSelectionStoreClear', this);
      }
    }
  }
  if (newStore) 
  {
    newStore.on(bindEvents);
    newStore.onBefore('clear', 'onSelectionStoreClear', this);
    me.refreshSelection();
  }
}, selectAll: function(silent) {
  var me = this, selections = me.getStore().getRange();
  me.select(selections, true, silent);
}, deselectAll: function(supress) {
  var me = this, selections = me.getStore().getRange();
  me.deselect(selections, supress);
  me.selected.clear();
  me.setLastSelected(null);
  me.setLastFocused(null);
}, selectWithEvent: function(record) {
  var me = this, isSelected = me.isSelected(record);
  switch (me.getMode()) {
    case 'MULTI':
    case 'SIMPLE':
      if (isSelected) 
      {
        me.deselect(record);
      } else {
        me.select(record, true);
      }
      break;
    case 'SINGLE':
      if (me.getAllowDeselect() && isSelected) 
      {
        me.deselect(record);
      } else {
        me.select(record, false);
      }
      break;
  }
}, selectRange: function(startRecord, endRecord, keepExisting) {
  var me = this, store = me.getStore(), records = [], tmp, i;
  if (me.getDisableSelection()) 
  {
    return;
  }
  if (startRecord > endRecord) 
  {
    tmp = endRecord;
    endRecord = startRecord;
    startRecord = tmp;
  }
  for (i = startRecord; i <= endRecord; i++) 
    {
      records.push(store.getAt(i));
    }
  this.doMultiSelect(records, keepExisting);
}, select: function(records, keepExisting, suppressEvent) {
  var me = this, record;
  if (me.getDisableSelection()) 
  {
    return;
  }
  if (typeof records === "number") 
  {
    records = [me.getStore().getAt(records)];
  }
  if (!records) 
  {
    return;
  }
  if (me.getMode() == "SINGLE" && records) 
  {
    record = records.length ? records[0] : records;
    me.doSingleSelect(record, suppressEvent);
  } else {
    me.doMultiSelect(records, keepExisting, suppressEvent);
  }
}, doSingleSelect: function(record, suppressEvent) {
  var me = this, selected = me.selected;
  if (me.getDisableSelection()) 
  {
    return;
  }
  if (me.isSelected(record)) 
  {
    return;
  }
  if (selected.getCount() > 0) 
  {
    me.deselect(me.getLastSelected(), suppressEvent);
  }
  selected.add(record);
  me.setLastSelected(record);
  me.onItemSelect(record, suppressEvent);
  me.setLastFocused(record);
  if (!suppressEvent) 
  {
    me.fireSelectionChange([record]);
  }
}, doMultiSelect: function(records, keepExisting, suppressEvent) {
  if (records === null || this.getDisableSelection()) 
  {
    return;
  }
  records = !Ext.isArray(records) ? [records] : records;
  var me = this, selected = me.selected, ln = records.length, change = false, i = 0, record;
  if (!keepExisting && selected.getCount() > 0) 
  {
    change = true;
    me.deselect(me.getSelection(), true);
  }
  for (; i < ln; i++) 
    {
      record = records[i];
      if (keepExisting && me.isSelected(record)) 
      {
        continue;
      }
      change = true;
      me.setLastSelected(record);
      selected.add(record);
      if (!suppressEvent) 
      {
        me.setLastFocused(record);
      }
      me.onItemSelect(record, suppressEvent);
    }
  if (change && !suppressEvent) 
  {
    this.fireSelectionChange(records);
  }
}, deselect: function(records, suppressEvent) {
  var me = this;
  if (me.getDisableSelection()) 
  {
    return;
  }
  records = Ext.isArray(records) ? records : [records];
  var selected = me.selected, change = false, i = 0, store = me.getStore(), ln = records.length, record;
  for (; i < ln; i++) 
    {
      record = records[i];
      if (typeof record === 'number') 
      {
        record = store.getAt(record);
      }
      if (selected.remove(record)) 
      {
        if (me.getLastSelected() == record) 
        {
          me.setLastSelected(selected.last());
        }
        change = true;
      }
      if (record) 
      {
        me.onItemDeselect(record, suppressEvent);
      }
    }
  if (change && !suppressEvent) 
  {
    me.fireSelectionChange(records);
  }
}, updateLastFocused: function(newRecord, oldRecord) {
  this.onLastFocusChanged(oldRecord, newRecord);
}, fireSelectionChange: function(records) {
  var me = this;
  me.fireAction('selectionchange', [me, records], 'getSelection');
}, getSelection: function() {
  return this.selected.getRange();
}, isSelected: function(record) {
  record = Ext.isNumber(record) ? this.getStore().getAt(record) : record;
  return this.selected.indexOf(record) !== -1;
}, hasSelection: function() {
  return this.selected.getCount() > 0;
}, refreshSelection: function() {
  var me = this, selections = me.getSelection();
  me.deselectAll(true);
  if (selections.length) 
  {
    me.select(selections, false, true);
  }
}, onSelectionStoreRemove: function(store, records) {
  var me = this, selected = me.selected, ln = records.length, record, i;
  if (me.getDisableSelection()) 
  {
    return;
  }
  for (i = 0; i < ln; i++) 
    {
      record = records[i];
      if (selected.remove(record)) 
      {
        if (me.getLastSelected() == record) 
        {
          me.setLastSelected(null);
        }
        if (me.getLastFocused() == record) 
        {
          me.setLastFocused(null);
        }
        me.fireSelectionChange([record]);
      }
    }
}, onSelectionStoreClear: function(store) {
  var records = store.getData().items;
  this.onSelectionStoreRemove(store, records);
}, getSelectionCount: function() {
  return this.selected.getCount();
}, onSelectionStoreAdd: Ext.emptyFn, onSelectionStoreUpdate: Ext.emptyFn, onItemSelect: Ext.emptyFn, onItemDeselect: Ext.emptyFn, onLastFocusChanged: Ext.emptyFn, onEditorKey: Ext.emptyFn}, function() {
});

Ext.define('Ext.dataview.component.DataItem', {extend: 'Ext.Container', xtype: 'dataitem', config: {baseCls: Ext.baseCSSPrefix + 'data-item', defaultType: 'component', record: null, itemCls: null, dataMap: {}, dataview: null, width: '100%', items: [{xtype: 'component'}]}, updateBaseCls: function(newBaseCls, oldBaseCls) {
  var me = this;
  me.callParent(arguments);
}, updateItemCls: function(newCls, oldCls) {
  if (oldCls) 
  {
    this.removeCls(oldCls);
  }
  if (newCls) 
  {
    this.addCls(newCls);
  }
}, doMapData: function(dataMap, data, item) {
  var componentName, component, setterMap, setterName;
  for (componentName in dataMap) 
    {
      setterMap = dataMap[componentName];
      component = this[componentName]();
      if (component) 
      {
        for (setterName in setterMap) 
          {
            if (data && component[setterName] && data[setterMap[setterName]] !== undefined && data[setterMap[setterName]] !== null) 
            {
              component[setterName](data[setterMap[setterName]]);
            }
          }
      }
    }
  if (item) 
  {
    item.updateData(data);
  }
}, updateRecord: function(newRecord) {
  if (!newRecord) 
  {
    return;
  }
  this._record = newRecord;
  var me = this, dataview = me.dataview || this.getDataview(), data = dataview.prepareData(newRecord.getData(true), dataview.getStore().indexOf(newRecord), newRecord), items = me.getItems(), item = items.first(), dataMap = me.getDataMap();
  if (!item) 
  {
    return;
  }
  if (dataMap) 
  {
    this.doMapData(dataMap, data, item);
  }
  me.fireEvent('updatedata', me, data);
}});

Ext.define('Ext.dataview.component.Container', {extend: 'Ext.Container', constructor: function() {
  this.itemCache = [];
  this.callParent(arguments);
}, doInitialize: function() {
  this.innerElement.on({touchstart: 'onItemTouchStart', touchend: 'onItemTouchEnd', tap: 'onItemTap', taphold: 'onItemTapHold', touchmove: 'onItemTouchMove', singletap: 'onItemSingleTap', doubletap: 'onItemDoubleTap', swipe: 'onItemSwipe', delegate: '> .' + Ext.baseCSSPrefix + 'data-item', scope: this});
}, initialize: function() {
  this.callParent();
  this.doInitialize();
}, onItemTouchStart: function(e) {
  var me = this, target = e.getTarget(), item = Ext.getCmp(target.id);
  item.on({touchmove: 'onItemTouchMove', scope: me, single: true});
  me.fireEvent('itemtouchstart', me, item, me.indexOf(item), e);
}, onItemTouchMove: function(e) {
  var me = this, target = e.getTarget(), item = Ext.getCmp(target.id);
  me.fireEvent('itemtouchmove', me, item, me.indexOf(item), e);
}, onItemTouchEnd: function(e) {
  var me = this, target = e.getTarget(), item = Ext.getCmp(target.id);
  item.un({touchmove: 'onItemTouchMove', scope: me});
  me.fireEvent('itemtouchend', me, item, me.indexOf(item), e);
}, onItemTap: function(e) {
  var me = this, target = e.getTarget(), item = Ext.getCmp(target.id);
  me.fireEvent('itemtap', me, item, me.indexOf(item), e);
}, onItemTapHold: function(e) {
  var me = this, target = e.getTarget(), item = Ext.getCmp(target.id);
  me.fireEvent('itemtaphold', me, item, me.indexOf(item), e);
}, onItemSingleTap: function(e) {
  var me = this, target = e.getTarget(), item = Ext.getCmp(target.id);
  me.fireEvent('itemsingletap', me, item, me.indexOf(item), e);
}, onItemDoubleTap: function(e) {
  var me = this, target = e.getTarget(), item = Ext.getCmp(target.id);
  me.fireEvent('itemdoubletap', me, item, me.indexOf(item), e);
}, onItemSwipe: function(e) {
  var me = this, target = e.getTarget(), item = Ext.getCmp(target.id);
  me.fireEvent('itemswipe', me, item, me.indexOf(item), e);
}, moveItemsToCache: function(from, to) {
  var me = this, dataview = me.dataview, maxItemCache = dataview.getMaxItemCache(), items = me.getViewItems(), itemCache = me.itemCache, cacheLn = itemCache.length, pressedCls = dataview.getPressedCls(), selectedCls = dataview.getSelectedCls(), i = to - from, item;
  for (; i >= 0; i--) 
    {
      item = items[from + i];
      if (cacheLn !== maxItemCache) 
      {
        me.remove(item, false);
        item.removeCls([pressedCls, selectedCls]);
        itemCache.push(item);
        cacheLn++;
      } else {
        item.destroy();
      }
    }
  if (me.getViewItems().length == 0) 
  {
    this.dataview.showEmptyText();
  }
}, moveItemsFromCache: function(records) {
  var me = this, dataview = me.dataview, store = dataview.getStore(), ln = records.length, xtype = dataview.getDefaultType(), itemConfig = dataview.getItemConfig(), itemCache = me.itemCache, cacheLn = itemCache.length, items = [], i, item, record;
  if (ln) 
  {
    dataview.hideEmptyText();
  }
  for (i = 0; i < ln; i++) 
    {
      records[i]._tmpIndex = store.indexOf(records[i]);
    }
  Ext.Array.sort(records, function(record1, record2) {
  return record1._tmpIndex > record2._tmpIndex ? 1 : -1;
});
  for (i = 0; i < ln; i++) 
    {
      record = records[i];
      if (cacheLn) 
      {
        cacheLn--;
        item = itemCache.pop();
        this.updateListItem(record, item);
      } else {
        item = me.getDataItemConfig(xtype, record, itemConfig);
      }
      item = this.insert(record._tmpIndex, item);
      delete record._tmpIndex;
    }
  return items;
}, getViewItems: function() {
  return this.getInnerItems();
}, updateListItem: function(record, item) {
  if (item.updateRecord) 
  {
    if (item.getRecord() === record) 
    {
      item.updateRecord(record);
    } else {
      item.setRecord(record);
    }
  }
}, getDataItemConfig: function(xtype, record, itemConfig) {
  var dataview = this.dataview, dataItemConfig = {xtype: xtype, record: record, itemCls: dataview.getItemCls(), defaults: itemConfig, dataview: dataview};
  return Ext.merge(dataItemConfig, itemConfig);
}, doRemoveItemCls: function(cls) {
  var items = this.getViewItems(), ln = items.length, i = 0;
  for (; i < ln; i++) 
    {
      items[i].removeCls(cls);
    }
}, doAddItemCls: function(cls) {
  var items = this.getViewItems(), ln = items.length, i = 0;
  for (; i < ln; i++) 
    {
      items[i].addCls(cls);
    }
}, updateAtNewIndex: function(oldIndex, newIndex, record) {
  this.moveItemsToCache(oldIndex, oldIndex);
  this.moveItemsFromCache([record]);
}, destroy: function() {
  var me = this, itemCache = me.itemCache, ln = itemCache.length, i = 0;
  for (; i < ln; i++) 
    {
      itemCache[i].destroy();
    }
  this.callParent();
}});

Ext.define('Ext.dataview.element.Container', {extend: 'Ext.Component', doInitialize: function() {
  this.element.on({touchstart: 'onItemTouchStart', touchend: 'onItemTouchEnd', tap: 'onItemTap', taphold: 'onItemTapHold', touchmove: 'onItemTouchMove', singletap: 'onItemSingleTap', doubletap: 'onItemDoubleTap', swipe: 'onItemSwipe', delegate: '> div', scope: this});
}, initialize: function() {
  this.callParent();
  this.doInitialize();
}, updateBaseCls: function(newBaseCls, oldBaseCls) {
  var me = this;
  me.callParent([newBaseCls + '-container', oldBaseCls]);
}, onItemTouchStart: function(e) {
  var me = this, target = e.getTarget(), index = me.getViewItems().indexOf(target);
  Ext.get(target).on({touchmove: 'onItemTouchMove', scope: me, single: true});
  me.fireEvent('itemtouchstart', me, Ext.get(target), index, e);
}, onItemTouchEnd: function(e) {
  var me = this, target = e.getTarget(), index = me.getViewItems().indexOf(target);
  Ext.get(target).un({touchmove: 'onItemTouchMove', scope: me});
  me.fireEvent('itemtouchend', me, Ext.get(target), index, e);
}, onItemTouchMove: function(e) {
  var me = this, target = e.getTarget(), index = me.getViewItems().indexOf(target);
  me.fireEvent('itemtouchmove', me, Ext.get(target), index, e);
}, onItemTap: function(e) {
  var me = this, target = e.getTarget(), index = me.getViewItems().indexOf(target);
  me.fireEvent('itemtap', me, Ext.get(target), index, e);
}, onItemTapHold: function(e) {
  var me = this, target = e.getTarget(), index = me.getViewItems().indexOf(target);
  me.fireEvent('itemtaphold', me, Ext.get(target), index, e);
}, onItemDoubleTap: function(e) {
  var me = this, target = e.getTarget(), index = me.getViewItems().indexOf(target);
  me.fireEvent('itemdoubletap', me, Ext.get(target), index, e);
}, onItemSingleTap: function(e) {
  var me = this, target = e.getTarget(), index = me.getViewItems().indexOf(target);
  me.fireEvent('itemsingletap', me, Ext.get(target), index, e);
}, onItemSwipe: function(e) {
  var me = this, target = e.getTarget(), index = me.getViewItems().indexOf(target);
  me.fireEvent('itemswipe', me, Ext.get(target), index, e);
}, updateListItem: function(record, item) {
  var me = this, dataview = me.dataview, store = dataview.getStore(), index = store.indexOf(record), data = dataview.prepareData(record.getData(true), index, record);
  data.xcount = store.getCount();
  data.xindex = typeof data.xindex === 'number' ? data.xindex : index;
  item.innerHTML = dataview.getItemTpl().apply(data);
}, addListItem: function(index, record) {
  var me = this, dataview = me.dataview, store = dataview.getStore(), data = dataview.prepareData(record.getData(true), index, record), element = me.element, childNodes = element.dom.childNodes, ln = childNodes.length, wrapElement;
  data.xcount = typeof data.xcount === 'number' ? data.xcount : store.getCount();
  data.xindex = typeof data.xindex === 'number' ? data.xindex : index;
  wrapElement = Ext.Element.create(this.getItemElementConfig(index, data));
  if (!ln || index == ln) 
  {
    wrapElement.appendTo(element);
  } else {
    wrapElement.insertBefore(childNodes[index]);
  }
}, getItemElementConfig: function(index, data) {
  var dataview = this.dataview, itemCls = dataview.getItemCls(), cls = dataview.getBaseCls() + '-item';
  if (itemCls) 
  {
    cls += ' ' + itemCls;
  }
  return {cls: cls, html: dataview.getItemTpl().apply(data)};
}, doRemoveItemCls: function(cls) {
  var elements = this.getViewItems(), ln = elements.length, i = 0;
  for (; i < ln; i++) 
    {
      Ext.fly(elements[i]).removeCls(cls);
    }
}, doAddItemCls: function(cls) {
  var elements = this.getViewItems(), ln = elements.length, i = 0;
  for (; i < ln; i++) 
    {
      Ext.fly(elements[i]).addCls(cls);
    }
}, moveItemsToCache: function(from, to) {
  var me = this, items = me.getViewItems(), i = to - from, item;
  for (; i >= 0; i--) 
    {
      item = items[from + i];
      Ext.get(item).destroy();
    }
  if (me.getViewItems().length == 0) 
  {
    this.dataview.showEmptyText();
  }
}, moveItemsFromCache: function(records) {
  var me = this, dataview = me.dataview, store = dataview.getStore(), ln = records.length, i, record;
  if (ln) 
  {
    dataview.hideEmptyText();
  }
  for (i = 0; i < ln; i++) 
    {
      records[i]._tmpIndex = store.indexOf(records[i]);
    }
  Ext.Array.sort(records, function(record1, record2) {
  return record1._tmpIndex > record2._tmpIndex ? 1 : -1;
});
  for (i = 0; i < ln; i++) 
    {
      record = records[i];
      me.addListItem(record._tmpIndex, record);
      delete record._tmpIndex;
    }
}, getViewItems: function() {
  return Array.prototype.slice.call(this.element.dom.childNodes);
}, updateAtNewIndex: function(oldIndex, newIndex, record) {
  this.moveItemsToCache(oldIndex, oldIndex);
  this.moveItemsFromCache([record]);
}, destroy: function() {
  var elements = this.getViewItems(), ln = elements.length, i = 0;
  for (; i < ln; i++) 
    {
      Ext.get(elements[i]).destroy();
    }
  this.callParent();
}});

Ext.define('Ext.dataview.DataView', {extend: 'Ext.Container', alternateClassName: 'Ext.DataView', mixins: ['Ext.mixin.Selectable'], xtype: 'dataview', config: {store: null, data: null, baseCls: Ext.baseCSSPrefix + 'dataview', emptyText: null, deferEmptyText: true, itemTpl: '<div>{text}</div>', pressedCls: 'x-item-pressed', itemCls: null, selectedCls: 'x-item-selected', triggerEvent: 'itemtap', triggerCtEvent: 'tap', deselectOnContainerClick: true, scrollable: true, inline: null, pressedDelay: 100, loadingText: 'Loading...', useComponents: null, itemConfig: {}, maxItemCache: 20, defaultType: 'dataitem', scrollToTopOnRefresh: true}, constructor: function(config) {
  var me = this, layout;
  me.hasLoadedStore = false;
  me.mixins.selectable.constructor.apply(me, arguments);
  me.indexOffset = 0;
  me.callParent(arguments);
}, updateItemCls: function(newCls, oldCls) {
  var container = this.container;
  if (container) 
  {
    if (oldCls) 
    {
      container.doRemoveItemCls(oldCls);
    }
    if (newCls) 
    {
      container.doAddItemCls(newCls);
    }
  }
}, storeEventHooks: {beforeload: 'onBeforeLoad', load: 'onLoad', refresh: 'refresh', addrecords: 'onStoreAdd', removerecords: 'onStoreRemove', updaterecord: 'onStoreUpdate'}, initialize: function() {
  this.callParent();
  var me = this, container, triggerEvent = me.getTriggerEvent();
  me.on(me.getTriggerCtEvent(), me.onContainerTrigger, me);
  container = me.container = this.add(new Ext.dataview[me.getUseComponents() ? 'component' : 'element'].Container({baseCls: this.getBaseCls()}));
  container.dataview = me;
  if (triggerEvent) 
  {
    me.on(triggerEvent, me.onItemTrigger, me);
  }
  container.on({itemtouchstart: 'onItemTouchStart', itemtouchend: 'onItemTouchEnd', itemtap: 'onItemTap', itemtaphold: 'onItemTapHold', itemtouchmove: 'onItemTouchMove', itemsingletap: 'onItemSingleTap', itemdoubletap: 'onItemDoubleTap', itemswipe: 'onItemSwipe', scope: me});
  if (me.getStore()) 
  {
    if (me.isPainted()) 
    {
      me.refresh();
    } else {
      me.on({painted: 'refresh', single: true});
    }
  }
}, applyInline: function(config) {
  if (Ext.isObject(config)) 
  {
    config = Ext.apply({}, config);
  }
  return config;
}, updateInline: function(newInline, oldInline) {
  var baseCls = this.getBaseCls();
  if (oldInline) 
  {
    this.removeCls([baseCls + '-inlineblock', baseCls + '-nowrap']);
  }
  if (newInline) 
  {
    this.addCls(baseCls + '-inlineblock');
    if (Ext.isObject(newInline) && newInline.wrap === false) 
    {
      this.addCls(baseCls + '-nowrap');
    } else {
      this.removeCls(baseCls + '-nowrap');
    }
  }
}, prepareData: function(data, index, record) {
  return data;
}, onContainerTrigger: function(e) {
  var me = this;
  if (e.target != me.element.dom) 
  {
    return;
  }
  if (me.getDeselectOnContainerClick() && me.getStore()) 
  {
    me.deselectAll();
  }
}, onItemTrigger: function(me, index) {
  if (!this.isDestroyed) 
  {
    this.selectWithEvent(this.getStore().getAt(index));
  }
}, doAddPressedCls: function(record) {
  var me = this, item = me.getItemAt(me.getStore().indexOf(record));
  if (Ext.isElement(item)) 
  {
    item = Ext.get(item);
  }
  if (item) 
  {
    if (item.isComponent) 
    {
      item.renderElement.addCls(me.getPressedCls());
    } else {
      item.addCls(me.getPressedCls());
    }
  }
}, onItemTouchStart: function(container, target, index, e) {
  var me = this, store = me.getStore(), record = store && store.getAt(index);
  me.fireAction('itemtouchstart', [me, index, target, record, e], 'doItemTouchStart');
}, doItemTouchStart: function(me, index, target, record) {
  var pressedDelay = me.getPressedDelay();
  if (record) 
  {
    if (pressedDelay > 0) 
    {
      me.pressedTimeout = Ext.defer(me.doAddPressedCls, pressedDelay, me, [record]);
    } else {
      me.doAddPressedCls(record);
    }
  }
}, onItemTouchEnd: function(container, target, index, e) {
  var me = this, store = me.getStore(), record = store && store.getAt(index);
  if (this.hasOwnProperty('pressedTimeout')) 
  {
    clearTimeout(this.pressedTimeout);
    delete this.pressedTimeout;
  }
  if (record && target) 
  {
    if (target.isComponent) 
    {
      target.renderElement.removeCls(me.getPressedCls());
    } else {
      target.removeCls(me.getPressedCls());
    }
  }
  me.fireEvent('itemtouchend', me, index, target, record, e);
}, onItemTouchMove: function(container, target, index, e) {
  var me = this, store = me.getStore(), record = store && store.getAt(index);
  if (me.hasOwnProperty('pressedTimeout')) 
  {
    clearTimeout(me.pressedTimeout);
    delete me.pressedTimeout;
  }
  if (record && target) 
  {
    if (target.isComponent) 
    {
      target.renderElement.removeCls(me.getPressedCls());
    } else {
      target.removeCls(me.getPressedCls());
    }
  }
  me.fireEvent('itemtouchmove', me, index, target, record, e);
}, onItemTap: function(container, target, index, e) {
  var me = this, store = me.getStore(), record = store && store.getAt(index);
  me.fireEvent('itemtap', me, index, target, record, e);
}, onItemTapHold: function(container, target, index, e) {
  var me = this, store = me.getStore(), record = store && store.getAt(index);
  me.fireEvent('itemtaphold', me, index, target, record, e);
}, onItemSingleTap: function(container, target, index, e) {
  var me = this, store = me.getStore(), record = store && store.getAt(index);
  me.fireEvent('itemsingletap', me, index, target, record, e);
}, onItemDoubleTap: function(container, target, index, e) {
  var me = this, store = me.getStore(), record = store && store.getAt(index);
  me.fireEvent('itemdoubletap', me, index, target, record, e);
}, onItemSwipe: function(container, target, index, e) {
  var me = this, store = me.getStore(), record = store && store.getAt(index);
  me.fireEvent('itemswipe', me, index, target, record, e);
}, onItemSelect: function(record, suppressEvent) {
  var me = this;
  if (suppressEvent) 
  {
    me.doItemSelect(me, record);
  } else {
    me.fireAction('select', [me, record], 'doItemSelect');
  }
}, doItemSelect: function(me, record) {
  if (me.container && !me.isDestroyed) 
  {
    var item = me.getItemAt(me.getStore().indexOf(record));
    if (Ext.isElement(item)) 
    {
      item = Ext.get(item);
    }
    if (item) 
    {
      if (item.isComponent) 
      {
        item.renderElement.removeCls(me.getPressedCls());
        item.renderElement.addCls(me.getSelectedCls());
      } else {
        item.removeCls(me.getPressedCls());
        item.addCls(me.getSelectedCls());
      }
    }
  }
}, onItemDeselect: function(record, suppressEvent) {
  var me = this;
  if (me.container && !me.isDestroyed) 
  {
    if (suppressEvent) 
    {
      me.doItemDeselect(me, record);
    } else {
      me.fireAction('deselect', [me, record, suppressEvent], 'doItemDeselect');
    }
  }
}, doItemDeselect: function(me, record) {
  var item = me.getItemAt(me.getStore().indexOf(record));
  if (Ext.isElement(item)) 
  {
    item = Ext.get(item);
  }
  if (item) 
  {
    if (item.isComponent) 
    {
      item.renderElement.removeCls([me.getPressedCls(), me.getSelectedCls()]);
    } else {
      item.removeCls([me.getPressedCls(), me.getSelectedCls()]);
    }
  }
}, updateData: function(data) {
  var store = this.getStore();
  if (!store) 
  {
    this.setStore(Ext.create('Ext.data.Store', {data: data, autoDestroy: true}));
  } else {
    store.add(data);
  }
}, applyStore: function(store) {
  var me = this, bindEvents = Ext.apply({}, me.storeEventHooks, {scope: me}), proxy, reader;
  if (store) 
  {
    store = Ext.data.StoreManager.lookup(store);
    if (store && Ext.isObject(store) && store.isStore) 
    {
      store.on(bindEvents);
      proxy = store.getProxy();
      if (proxy) 
      {
        reader = proxy.getReader();
        if (reader) 
        {
          reader.on('exception', 'handleException', this);
        }
      }
    }
  }
  return store;
}, handleException: function() {
  this.setMasked(false);
}, updateStore: function(newStore, oldStore) {
  var me = this, bindEvents = Ext.apply({}, me.storeEventHooks, {scope: me}), proxy, reader;
  if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) 
  {
    oldStore.un(bindEvents);
    if (!me.isDestroyed) 
    {
      me.onStoreClear();
    }
    if (oldStore.getAutoDestroy()) 
    {
      oldStore.destroy();
    } else {
      proxy = oldStore.getProxy();
      if (proxy) 
      {
        reader = proxy.getReader();
        if (reader) 
        {
          reader.un('exception', 'handleException', this);
        }
      }
    }
  }
  if (newStore) 
  {
    if (newStore.isLoaded()) 
    {
      this.hasLoadedStore = true;
    }
    if (newStore.isLoading()) 
    {
      me.onBeforeLoad();
    }
    if (me.container) 
    {
      me.refresh();
    }
  }
}, onBeforeLoad: function() {
  var loadingText = this.getLoadingText();
  if (loadingText && this.isPainted()) 
  {
    this.setMasked({xtype: 'loadmask', message: loadingText});
  }
  this.hideEmptyText();
}, updateEmptyText: function(newEmptyText, oldEmptyText) {
  var me = this, store;
  if (oldEmptyText && me.emptyTextCmp) 
  {
    me.remove(me.emptyTextCmp, true);
    delete me.emptyTextCmp;
  }
  if (newEmptyText) 
  {
    me.emptyTextCmp = me.add({xtype: 'component', cls: me.getBaseCls() + '-emptytext', html: newEmptyText, hidden: true});
    store = me.getStore();
    if (store && me.hasLoadedStore && !store.getCount()) 
    {
      this.showEmptyText();
    }
  }
}, onLoad: function(store) {
  this.hasLoadedStore = true;
  this.setMasked(false);
  if (!store.getCount()) 
  {
    this.showEmptyText();
  }
}, refresh: function() {
  var me = this, container = me.container;
  if (!me.getStore()) 
  {
    if (!me.hasLoadedStore && !me.getDeferEmptyText()) 
    {
      me.showEmptyText();
    }
    return;
  }
  if (container) 
  {
    me.fireAction('refresh', [me], 'doRefresh');
  }
}, applyItemTpl: function(config) {
  return (Ext.isObject(config) && config.isTemplate) ? config : new Ext.XTemplate(config);
}, onAfterRender: function() {
  var me = this;
  me.callParent(arguments);
  me.updateStore(me.getStore());
}, getItemAt: function(index) {
  return this.getViewItems()[index - this.indexOffset];
}, getItemIndex: function(item) {
  var index = this.getViewItems().indexOf(item);
  return (index === -1) ? index : this.indexOffset + index;
}, getViewItems: function() {
  return this.container.getViewItems();
}, doRefresh: function(me) {
  var container = me.container, store = me.getStore(), records = store.getRange(), items = me.getViewItems(), recordsLn = records.length, itemsLn = items.length, deltaLn = recordsLn - itemsLn, scrollable = me.getScrollable(), i, item;
  if (this.getScrollToTopOnRefresh() && scrollable) 
  {
    scrollable.getScroller().scrollToTop();
  }
  if (recordsLn < 1) 
  {
    me.onStoreClear();
    return;
  } else {
    me.hideEmptyText();
  }
  if (deltaLn < 0) 
  {
    container.moveItemsToCache(itemsLn + deltaLn, itemsLn - 1);
    items = me.getViewItems();
    itemsLn = items.length;
  } else if (deltaLn > 0) 
  {
    container.moveItemsFromCache(store.getRange(itemsLn));
  }
  for (i = 0; i < itemsLn; i++) 
    {
      item = items[i];
      container.updateListItem(records[i], item);
    }
  if (this.hasSelection()) 
  {
    var selection = this.getSelection(), selectionLn = this.getSelectionCount(), record;
    for (i = 0; i < selectionLn; i++) 
      {
        record = selection[i];
        this.doItemSelect(this, record);
      }
  }
}, showEmptyText: function() {
  if (this.getEmptyText() && (this.hasLoadedStore || !this.getDeferEmptyText())) 
  {
    this.emptyTextCmp.show();
  }
}, hideEmptyText: function() {
  if (this.getEmptyText()) 
  {
    this.emptyTextCmp.hide();
  }
}, destroy: function() {
  var store = this.getStore(), proxy = (store && store.getProxy()), reader = (proxy && proxy.getReader());
  if (reader) 
  {
    reader.clearListeners();
  }
  this.callParent(arguments);
  this.setStore(null);
}, onStoreClear: function() {
  var me = this, container = me.container, items = me.getViewItems();
  container.moveItemsToCache(0, items.length - 1);
  this.showEmptyText();
}, onStoreAdd: function(store, records) {
  if (records) 
  {
    this.hideEmptyText();
    this.container.moveItemsFromCache(records);
  }
}, onStoreRemove: function(store, records, indices) {
  var container = this.container, ln = records.length, i;
  for (i = 0; i < ln; i++) 
    {
      container.moveItemsToCache(indices[i], indices[i]);
    }
}, onStoreUpdate: function(store, record, newIndex, oldIndex) {
  var me = this, container = me.container, item;
  oldIndex = (typeof oldIndex === 'undefined') ? newIndex : oldIndex;
  if (oldIndex !== newIndex) 
  {
    container.updateAtNewIndex(oldIndex, newIndex, record);
    if (me.isSelected(record)) 
    {
      me.doItemSelect(me, record);
    }
  } else {
    item = me.getViewItems()[newIndex];
    if (item) 
    {
      container.updateListItem(record, item);
    }
  }
}});

Ext.define('Ext.dataview.IndexBar', {extend: 'Ext.Component', alternateClassName: 'Ext.IndexBar', config: {baseCls: Ext.baseCSSPrefix + 'indexbar', direction: 'vertical', letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], ui: 'alphabet', listPrefix: null}, platformConfig: [{theme: ['Blackberry'], direction: 'vertical', letters: ['*', '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']}], itemCls: Ext.baseCSSPrefix + '', updateDirection: function(newDirection, oldDirection) {
  var baseCls = this.getBaseCls();
  this.element.replaceCls(baseCls + '-' + oldDirection, baseCls + '-' + newDirection);
}, getElementConfig: function() {
  if (Ext.theme.is.Blackberry) 
  {
    return {reference: 'wrapper', classList: ['x-centered', 'x-indexbar-wrapper'], children: [{reference: 'indicator', classList: ['x-indexbar-indicator'], hidden: true, children: [{reference: 'indicatorInner', classList: ['x-indexbar-indicator-inner']}]}, this.callParent()]};
  } else {
    return {reference: 'wrapper', classList: ['x-centered', 'x-indexbar-wrapper'], children: [this.callParent()]};
  }
}, updateLetters: function(letters) {
  this.innerElement.setHtml('');
  if (letters) 
  {
    var ln = letters.length, i;
    for (i = 0; i < ln; i++) 
      {
        this.innerElement.createChild({html: letters[i]});
      }
  }
}, updateListPrefix: function(listPrefix) {
  if (listPrefix && listPrefix.length) 
  {
    this.innerElement.createChild({html: listPrefix}, 0);
  }
}, initialize: function() {
  this.callParent();
  this.innerElement.on({touchstart: this.onTouchStart, touchend: this.onTouchEnd, dragend: this.onDragEnd, drag: this.onDrag, scope: this});
}, onTouchStart: function(e) {
  e.stopPropagation();
  this.innerElement.addCls(this.getBaseCls() + '-pressed');
  this.pageBox = this.innerElement.getPageBox();
  this.onDrag(e);
}, onTouchEnd: function(e) {
  this.onDragEnd();
}, onDragEnd: function() {
  this.innerElement.removeCls(this.getBaseCls() + '-pressed');
  if (this.indicator) 
  {
    this.indicator.hide();
  }
}, onDrag: function(e) {
  var point = Ext.util.Point.fromEvent(e), target, isValidTarget, pageBox = this.pageBox;
  if (!pageBox) 
  {
    pageBox = this.pageBox = this.el.getPageBox();
  }
  if (this.getDirection() === 'vertical') 
  {
    if (point.y > pageBox.bottom || point.y < pageBox.top) 
    {
      return;
    }
    target = Ext.Element.fromPoint(pageBox.left + (pageBox.width / 2), point.y);
    isValidTarget = target.getParent() == this.element;
    if (this.indicator) 
    {
      this.indicator.show();
      var halfIndicatorHeight = this.indicator.getHeight() / 2, y = point.y - this.element.getY();
      y = Math.min(Math.max(y, halfIndicatorHeight), this.element.getHeight() - halfIndicatorHeight);
      if (this.indicatorInner && isValidTarget) 
      {
        this.indicatorInner.setHtml(target.getHtml().toUpperCase());
      }
      this.indicator.setTop(y - (halfIndicatorHeight));
    }
  } else {
    if (point.x > pageBox.right || point.x < pageBox.left) 
    {
      return;
    }
    target = Ext.Element.fromPoint(point.x, pageBox.top + (pageBox.height / 2));
    isValidTarget = target.getParent() == this.element;
  }
  if (target && isValidTarget) 
  {
    this.fireEvent('index', this, target.dom.innerHTML, target);
  }
}, destroy: function() {
  var me = this, elements = Array.prototype.slice.call(me.innerElement.dom.childNodes), ln = elements.length, i = 0;
  for (; i < ln; i++) 
    {
      Ext.removeNode(elements[i]);
    }
  this.callParent();
}}, function() {
});

Ext.define('Ext.dataview.ListItemHeader', {extend: 'Ext.Component', xtype: 'listitemheader', config: {baseCls: Ext.baseCSSPrefix + 'list-header'}});

Ext.define('Ext.dataview.component.ListItem', {extend: 'Ext.dataview.component.DataItem', xtype: 'listitem', config: {baseCls: Ext.baseCSSPrefix + 'list-item', dataMap: null, body: {xtype: 'component', cls: 'x-list-item-body'}, disclosure: {xtype: 'component', cls: 'x-list-disclosure', hidden: true, docked: 'right'}, header: {xtype: 'component', cls: 'x-list-header', html: ' '}, tpl: null, items: null}, applyBody: function(body) {
  if (body && !body.isComponent) 
  {
    body = Ext.factory(body, Ext.Component, this.getBody());
  }
  return body;
}, updateBody: function(body, oldBody) {
  if (body) 
  {
    this.add(body);
  } else if (oldBody) 
  {
    oldBody.destroy();
  }
}, applyHeader: function(header) {
  if (header && !header.isComponent) 
  {
    header = Ext.factory(header, Ext.Component, this.getHeader());
  }
  return header;
}, updateHeader: function(header, oldHeader) {
  if (oldHeader) 
  {
    oldHeader.destroy();
  }
}, applyDisclosure: function(disclosure) {
  if (disclosure && !disclosure.isComponent) 
  {
    disclosure = Ext.factory(disclosure, Ext.Component, this.getDisclosure());
  }
  return disclosure;
}, updateDisclosure: function(disclosure, oldDisclosure) {
  if (disclosure) 
  {
    this.add(disclosure);
  } else if (oldDisclosure) 
  {
    oldDisclosure.destroy();
  }
}, updateTpl: function(tpl) {
  this.getBody().setTpl(tpl);
}, updateRecord: function(record) {
  var me = this, dataview = me.dataview || this.getDataview(), data = record && dataview.prepareData(record.getData(true), dataview.getStore().indexOf(record), record), dataMap = me.getDataMap(), body = this.getBody(), disclosure = this.getDisclosure();
  me._record = record;
  if (dataMap) 
  {
    me.doMapData(dataMap, data, body);
  } else if (body) 
  {
    body.updateData(data || null);
  }
  if (disclosure && record && dataview.getOnItemDisclosure()) 
  {
    var disclosureProperty = dataview.getDisclosureProperty();
    disclosure[(data.hasOwnProperty(disclosureProperty) && data[disclosureProperty] === false) ? 'hide' : 'show']();
  }
  me.fireEvent('updatedata', me, data);
}, destroy: function() {
  Ext.destroy(this.getHeader());
  this.callParent(arguments);
}});

Ext.define('Ext.dataview.component.SimpleListItem', {extend: 'Ext.Component', xtype: 'simplelistitem', config: {baseCls: Ext.baseCSSPrefix + 'list-item', disclosure: {xtype: 'component', cls: 'x-list-disclosure', hidden: true}, header: {xtype: 'component', cls: 'x-list-header', html: ' '}, dataview: null, record: null}, initialize: function() {
  this.element.addCls(this.getBaseCls() + '-tpl');
}, applyHeader: function(header) {
  if (header && !header.isComponent) 
  {
    header = Ext.factory(header, Ext.Component, this.getHeader());
  }
  return header;
}, updateHeader: function(header, oldHeader) {
  if (oldHeader) 
  {
    oldHeader.destroy();
  }
}, applyDisclosure: function(disclosure) {
  if (disclosure && !disclosure.isComponent) 
  {
    disclosure = Ext.factory(disclosure, Ext.Component, this.getDisclosure());
  }
  return disclosure;
}, updateDisclosure: function(disclosure, oldDisclosure) {
  if (disclosure) 
  {
    this.element.appendChild(disclosure.renderElement);
  } else if (oldDisclosure) 
  {
    oldDisclosure.destroy();
  }
}, updateRecord: function(record) {
  var me = this, dataview = me.dataview || this.getDataview(), data = record && dataview.prepareData(record.getData(true), dataview.getStore().indexOf(record), record), disclosure = this.getDisclosure();
  me.updateData(data || null);
  if (disclosure && record && dataview.getOnItemDisclosure()) 
  {
    var disclosureProperty = dataview.getDisclosureProperty();
    disclosure[(data.hasOwnProperty(disclosureProperty) && data[disclosureProperty] === false) ? 'hide' : 'show']();
  }
}, destroy: function() {
  Ext.destroy(this.getHeader(), this.getDisclosure());
  this.callParent(arguments);
}});

Ext.define('Ext.util.PositionMap', {config: {minimumHeight: 50}, constructor: function(config) {
  this.map = [];
  this.adjustments = {};
  this.offset = 0;
  this.initConfig(config);
}, populate: function(count, offset) {
  var map = this.map = this.map || [], minimumHeight = this.getMinimumHeight(), i, previousIndex, ln;
  offset = offset || 0;
  count++;
  map.length = count;
  map[0] = 0;
  for (i = offset + 1 , ln = count - 1; i <= ln; i++) 
    {
      previousIndex = i - 1;
      map[i] = map[previousIndex] + minimumHeight;
    }
  this.adjustments = {indices: [], heights: {}};
  this.offset = 0;
  for (i = 1 , ln = count - 1; i <= ln; i++) 
    {
      previousIndex = i - 1;
      this.offset += map[i] - map[previousIndex] - minimumHeight;
    }
}, setItemHeight: function(index, height) {
  height = Math.max(height, this.getMinimumHeight());
  if (height !== this.getItemHeight(index)) 
  {
    var adjustments = this.adjustments;
    adjustments.indices.push(parseInt(index, 10));
    adjustments.heights[index] = height;
  }
}, update: function() {
  var adjustments = this.adjustments, indices = adjustments.indices, heights = adjustments.heights, map = this.map, ln = indices.length, minimumHeight = this.getMinimumHeight(), difference = 0, i, j, height, index, nextIndex, currentHeight;
  if (!adjustments.indices.length) 
  {
    return false;
  }
  Ext.Array.sort(indices, function(a, b) {
  return a - b;
});
  for (i = 0; i < ln; i++) 
    {
      index = indices[i];
      nextIndex = indices[i + 1] || map.length - 1;
      currentHeight = (map[index + 1] !== undefined) ? (map[index + 1] - map[index] + difference) : minimumHeight;
      height = heights[index];
      difference += height - currentHeight;
      for (j = index + 1; j <= nextIndex; j++) 
        {
          map[j] += difference;
        }
    }
  this.offset += difference;
  this.adjustments = {indices: [], heights: {}};
  return true;
}, getItemHeight: function(index) {
  return this.map[index + 1] - this.map[index];
}, getTotalHeight: function() {
  return ((this.map.length - 1) * this.getMinimumHeight()) + this.offset;
}, findIndex: function(pos) {
  return this.map.length ? this.binarySearch(this.map, pos) : 0;
}, binarySearch: function(sorted, value) {
  var start = 0, end = sorted.length;
  if (value < sorted[0]) 
  {
    return 0;
  }
  if (value > sorted[end - 1]) 
  {
    return end - 1;
  }
  while (start + 1 < end) 
    {
      var mid = (start + end) >> 1, val = sorted[mid];
      if (val == value) 
      {
        return mid;
      } else if (val < value) 
      {
        start = mid;
      } else {
        end = mid;
      }
    }
  return start;
}});

Ext.define('Ext.dataview.List', {alternateClassName: 'Ext.List', extend: 'Ext.dataview.DataView', xtype: 'list', mixins: ['Ext.mixin.Bindable'], config: {layout: 'fit', indexBar: false, icon: null, preventSelectionOnDisclose: true, baseCls: Ext.baseCSSPrefix + 'list', pinHeaders: true, grouped: null, onItemDisclosure: null, disclosureProperty: 'disclosure', ui: 'normal', defaultType: undefined, itemMap: {}, itemHeight: 42, variableHeights: false, refreshHeightOnUpdate: true, infinite: false, useSimpleItems: true, scrollable: null, bufferSize: 20, minimumBufferDistance: 5, useHeaders: true, striped: false}, platformConfig: [{theme: ['Windows'], itemHeight: 44}, {theme: ['Cupertino'], itemHeight: 43}], topRenderedIndex: 0, topVisibleIndex: 0, visibleCount: 0, constructor: function() {
  var me = this, layout;
  me.callParent(arguments);
}, beforeInitialize: function() {
  var me = this, container = me.container, scrollable, scrollViewElement, pinnedHeader;
  Ext.apply(me, {listItems: [], headerItems: [], updatedItems: [], headerMap: [], scrollDockItems: {top: [], bottom: []}});
  this.translationMethod = Ext.browser.is.AndroidStock2 ? 'cssposition' : 'csstransform';
  if (!container) 
  {
    container = me.container = Ext.factory({xtype: 'container', scrollable: {scroller: {autoRefresh: !me.getInfinite(), direction: 'vertical'}}});
  }
  me.add(container);
  scrollable = container.getScrollable();
  scrollViewElement = me.scrollViewElement = scrollable.getElement();
  me.scrollElement = scrollable.getScroller().getElement();
  me.setScrollable(scrollable);
  me.scrollableBehavior = container.getScrollableBehavior();
  pinnedHeader = me.pinnedHeader = Ext.factory({xtype: 'listitemheader', html: '&nbsp;', translatable: {translationMethod: this.translationMethod}, cls: ['x-list-header', 'x-list-header-swap']});
  pinnedHeader.translate(0, -10000);
  pinnedHeader.$position = -10000;
  scrollViewElement.insertFirst(pinnedHeader.renderElement);
  me.bind(scrollable.getScroller().getTranslatable(), 'doTranslate', 'onTranslate');
}, initialize: function() {
  var me = this, container = me.container, scrollViewElement = me.scrollViewElement, indexBar = me.getIndexBar(), triggerEvent = me.getTriggerEvent(), triggerCtEvent = me.getTriggerCtEvent();
  if (indexBar) 
  {
    scrollViewElement.appendChild(indexBar.renderElement);
  }
  if (triggerEvent) 
  {
    me.on(triggerEvent, me.onItemTrigger, me);
  }
  if (triggerCtEvent) 
  {
    me.on(triggerCtEvent, me.onContainerTrigger, me);
  }
  container.element.on({delegate: '.' + me.getBaseCls() + '-disclosure', tap: 'handleItemDisclosure', scope: me});
  container.element.on({resize: 'onContainerResize', scope: me});
  container.innerElement.on({touchstart: 'onItemTouchStart', touchend: 'onItemTouchEnd', tap: 'onItemTap', taphold: 'onItemTapHold', singletap: 'onItemSingleTap', doubletap: 'onItemDoubleTap', swipe: 'onItemSwipe', delegate: '.' + Ext.baseCSSPrefix + 'list-item', scope: me});
  if (me.getStore()) 
  {
    me.refresh();
  }
}, onTranslate: function(x, y) {
  var me = this, pinnedHeader = me.pinnedHeader, store = me.getStore(), storeCount = store && store.getCount(), grouped = me.getGrouped(), infinite = me.getInfinite();
  if (!storeCount) 
  {
    me.showEmptyText();
    me.showEmptyScrollDock();
    pinnedHeader.$position = -10000;
    pinnedHeader.translate(0, -10000);
  } else if (infinite && me.itemsCount) 
  {
    me.handleItemUpdates(y);
    me.handleItemHeights();
    me.handleItemTransforms();
    if (!me.onIdleBound) 
    {
      Ext.AnimationQueue.onIdle(me.onAnimationIdle, me);
      me.onIdleBound = true;
    }
  }
  if (grouped && me.groups && me.groups.length && me.getPinHeaders()) 
  {
    me.handlePinnedHeader(y);
  }
  this.onScrollBinder(x, y);
}, onScrollBinder: function() {
}, handleItemUpdates: function(y) {
  var me = this, listItems = me.listItems, itemsCount = listItems.length, info = me.getListItemInfo(), itemMap = me.getItemMap(), bufferSize = me.getBufferSize(), lastIndex = me.getStore().getCount() - 1, minimumBufferDistance = me.getMinimumBufferDistance(), currentTopVisibleIndex = me.topVisibleIndex, topRenderedIndex = me.topRenderedIndex, updateCount, i, item, topVisibleIndex, bufferDistance, itemIndex;
  me.topVisibleIndex = topVisibleIndex = Math.max(0, itemMap.findIndex(-y) || 0);
  if (currentTopVisibleIndex !== topVisibleIndex) 
  {
    if (currentTopVisibleIndex > topVisibleIndex) 
    {
      bufferDistance = topVisibleIndex - topRenderedIndex;
      if (bufferDistance < minimumBufferDistance) 
      {
        updateCount = Math.min(itemsCount, minimumBufferDistance - bufferDistance);
        if (updateCount == itemsCount) 
        {
          me.topRenderedIndex = topRenderedIndex = Math.max(0, topVisibleIndex - (bufferSize - minimumBufferDistance));
          for (i = 0; i < updateCount; i++) 
            {
              itemIndex = topRenderedIndex + i;
              item = listItems[i];
              me.updateListItem(item, itemIndex, info);
            }
        } else {
          for (i = 0; i < updateCount; i++) 
            {
              itemIndex = topRenderedIndex - i - 1;
              if (itemIndex < 0) 
              {
                break;
              }
              item = listItems.pop();
              listItems.unshift(item);
              me.updateListItem(item, itemIndex, info);
              me.topRenderedIndex--;
            }
        }
      }
    } else {
      bufferDistance = bufferSize - (topVisibleIndex - topRenderedIndex);
      if (bufferDistance < minimumBufferDistance) 
      {
        updateCount = Math.min(itemsCount, minimumBufferDistance - bufferDistance);
        if (updateCount == itemsCount) 
        {
          me.topRenderedIndex = topRenderedIndex = Math.min(lastIndex - itemsCount, topVisibleIndex - minimumBufferDistance);
          for (i = 0; i < updateCount; i++) 
            {
              itemIndex = topRenderedIndex + i;
              item = listItems[i];
              me.updateListItem(item, itemIndex, info);
            }
        } else {
          for (i = 0; i < updateCount; i++) 
            {
              itemIndex = topRenderedIndex + itemsCount + i;
              if (itemIndex > lastIndex) 
              {
                break;
              }
              item = listItems.shift();
              listItems.push(item);
              me.updateListItem(item, itemIndex, info);
              me.topRenderedIndex++;
            }
        }
      }
    }
  }
}, onAnimationIdle: function() {
  var me = this, info = me.getListItemInfo(), bufferSize = me.getBufferSize(), topVisibleIndex = me.topVisibleIndex, topRenderedIndex = me.topRenderedIndex, lastIndex = me.getStore().getCount() - 1, listItems = me.listItems, itemsCount = listItems.length, topBufferDistance, bottomBufferDistance, i, ln, item, itemIndex;
  topBufferDistance = topVisibleIndex - topRenderedIndex;
  bottomBufferDistance = topRenderedIndex + bufferSize - topVisibleIndex;
  if (topBufferDistance < bottomBufferDistance) 
  {
    if (topVisibleIndex > 0) 
    {
      ln = bottomBufferDistance - topBufferDistance;
      for (i = 0; i < ln; i++) 
        {
          itemIndex = topRenderedIndex - i - 1;
          if (itemIndex < 0) 
          {
            break;
          }
          item = listItems.pop();
          listItems.unshift(item);
          me.updateListItem(item, itemIndex, info);
          me.topRenderedIndex--;
        }
    }
  } else {
    ln = topBufferDistance - bottomBufferDistance;
    for (i = 0; i < ln; i++) 
      {
        itemIndex = topRenderedIndex + itemsCount + i;
        if (itemIndex > lastIndex) 
        {
          break;
        }
        item = listItems.shift();
        listItems.push(item);
        me.updateListItem(item, itemIndex, info);
        me.topRenderedIndex++;
      }
  }
  me.handleItemHeights();
  me.handleItemTransforms();
  me.onIdleBound = false;
}, handleItemHeights: function() {
  var me = this, updatedItems = me.updatedItems, ln = updatedItems.length, itemMap = me.getItemMap(), useSimpleItems = me.getUseSimpleItems(), minimumHeight = itemMap.getMinimumHeight(), headerIndices = me.headerIndices, headerMap = me.headerMap, variableHeights = me.getVariableHeights(), itemIndex, i, j, jln, item, height, scrollDockHeight;
  for (i = 0; i < ln; i++) 
    {
      item = updatedItems[i];
      itemIndex = item.$dataIndex;
      if (itemIndex !== null) 
      {
        if (variableHeights) 
        {
          height = useSimpleItems ? item.element.getHeight() : item.element.getFirstChild().getHeight();
          height = Math.max(height, minimumHeight);
        } else {
          height = minimumHeight;
        }
        item.$ownItemHeight = height;
        jln = me.scrollDockItems.top.length;
        if (item.isFirst) 
        {
          me.totalScrollDockTopHeight = 0;
          for (j = 0; j < jln; j++) 
            {
              scrollDockHeight = me.scrollDockItems.top[j].$scrollDockHeight;
              height += scrollDockHeight;
              me.totalScrollDockTopHeight += scrollDockHeight;
            }
        }
        jln = me.scrollDockItems.bottom.length;
        if (item.isLast) 
        {
          for (j = 0; j < jln; j++) 
            {
              scrollDockHeight = me.scrollDockItems.bottom[j].$scrollDockHeight;
              height += scrollDockHeight;
            }
        }
        if (headerIndices && headerIndices[itemIndex]) 
        {
          height += me.headerHeight;
        }
        itemMap.setItemHeight(itemIndex, height);
        item.$height = height;
      }
    }
  itemMap.update();
  height = itemMap.getTotalHeight();
  headerMap.length = 0;
  for (i in headerIndices) 
    {
      if (headerIndices.hasOwnProperty(i)) 
      {
        headerMap.push(itemMap.map[i]);
      }
    }
  me.setScrollerHeight(height);
  me.updatedItems.length = 0;
}, setScrollerHeight: function(height) {
  var me = this, scroller = me.container.getScrollable().getScroller(), translatable = scroller.getTranslatable();
  if (height != scroller.givenSize) 
  {
    scroller.setSize(height);
    scroller.refreshMaxPosition();
    scroller.fireEvent('refresh', scroller);
    if (translatable.isAnimating && translatable.activeEasingY && translatable.activeEasingY.setMinMomentumValue) 
    {
      translatable.activeEasingY.setMinMomentumValue(-scroller.getMaxPosition().y);
    }
  }
}, handleItemTransforms: function() {
  var me = this, listItems = me.listItems, itemsCount = listItems.length, itemMap = me.getItemMap(), scrollDockItems = me.scrollDockItems, grouped = me.getGrouped(), item, transY, i, jln, j;
  for (i = 0; i < itemsCount; i++) 
    {
      item = listItems[i];
      transY = itemMap.map[item.$dataIndex];
      if (!item.$hidden && item.$position !== transY) 
      {
        item.$position = transY;
        jln = scrollDockItems.top.length;
        if (item.isFirst && jln) 
        {
          for (j = 0; j < jln; j++) 
            {
              scrollDockItems.top[j].translate(0, transY);
              transY += scrollDockItems.top[j].$scrollDockHeight;
            }
        }
        if (grouped && me.getUseHeaders() && me.headerIndices && me.headerIndices[item.$dataIndex]) 
        {
          item.getHeader().translate(0, transY);
          transY += me.headerHeight;
        }
        item.translate(0, transY);
        transY += item.$ownItemHeight;
        jln = scrollDockItems.bottom.length;
        if (item.isLast && jln) 
        {
          for (j = 0; j < jln; j++) 
            {
              scrollDockItems.bottom[j].translate(0, transY);
              transY += scrollDockItems.bottom[j].$scrollDockHeight;
            }
        }
      }
    }
}, handlePinnedHeader: function(y) {
  var me = this, pinnedHeader = me.pinnedHeader, itemMap = me.getItemMap(), groups = me.groups, headerMap = me.headerMap, headerHeight = me.headerHeight, store = me.getStore(), totalScrollDockTopHeight = me.totalScrollDockTopHeight, record, closestHeader, pushedHeader, transY, headerString;
  closestHeader = itemMap.binarySearch(headerMap, -y);
  record = groups[closestHeader].children[0];
  if (record) 
  {
    pushedHeader = y + headerMap[closestHeader + 1] - headerHeight;
    if (y >= 0 || (closestHeader === 0 && totalScrollDockTopHeight + y >= 0) || (closestHeader === 0 && -y <= headerMap[closestHeader])) 
    {
      transY = -10000;
    } else if (pushedHeader < 0) 
    {
      transY = pushedHeader;
    } else {
      transY = Math.max(0, y);
    }
    headerString = store.getGroupString(record);
    if (pinnedHeader.$currentHeader != headerString) 
    {
      pinnedHeader.setHtml(headerString);
      pinnedHeader.$currentHeader = headerString;
    }
    if (pinnedHeader.$position != transY) 
    {
      pinnedHeader.translate(0, transY);
      pinnedHeader.$position = transY;
    }
  }
}, createItem: function(config) {
  var me = this, container = me.container, listItems = me.listItems, infinite = me.getInfinite(), scrollElement = me.scrollElement, useHeaders = me.getUseHeaders(), item, header, itemCls;
  item = Ext.factory(config);
  item.dataview = me;
  item.$height = config.minHeight;
  if (!infinite) 
  {
    itemCls = me.getBaseCls() + '-item-relative';
    item.addCls(itemCls);
  }
  if (useHeaders) 
  {
    header = item.getHeader();
    if (!infinite) 
    {
      header.addCls(itemCls);
    } else {
      header.setTranslatable({translationMethod: this.translationMethod});
      header.translate(0, -10000);
      scrollElement.insertFirst(header.renderElement);
    }
  }
  container.doAdd(item);
  listItems.push(item);
  return item;
}, setItemsCount: function(itemsCount) {
  var me = this, listItems = me.listItems, config = me.getListItemConfig(), difference = itemsCount - listItems.length, i;
  for (i = 0; i < difference; i++) 
    {
      me.createItem(config);
    }
  for (i = difference; i < 0; i++) 
    {
      listItems.pop().destroy();
    }
  me.itemsCount = itemsCount;
  me.updateAllListItems();
  if (Ext.browser.is.AndroidStock && me.container.element && itemsCount === 0 && difference !== 0) 
  {
    me.container.element.redraw();
  }
  return me.listItems;
}, updateUi: function(newUi, oldUi) {
  if (newUi && newUi != oldUi && newUi == 'round') 
  {
    this.setPinHeaders(false);
  }
  this.callParent(arguments);
}, updateListItem: function(item, index, info) {
  var me = this, record = info.store.getAt(index), headerIndices = me.headerIndices, footerIndices = me.footerIndices, useHeaders = me.getUseHeaders(), header = useHeaders && item.getHeader(), scrollDockItems = me.scrollDockItems, updatedItems = me.updatedItems, currentItemCls = item.renderElement.classList.slice(), currentHeaderCls = useHeaders && header.renderElement.classList.slice(), infinite = me.getInfinite(), storeCount = info.store.getCount(), itemCls = [], headerCls = [], itemRemoveCls = [info.headerCls, info.footerCls, info.firstCls, info.lastCls, info.selectedCls, info.stripeCls], headerRemoveCls = [info.headerCls, info.footerCls, info.firstCls, info.lastCls], ln, i, scrollDockItem, classCache;
  if (infinite) 
  {
    item.$position = -10000;
  }
  if (!record) 
  {
    item.setRecord(null);
    if (infinite) 
    {
      item.translate(0, -10000);
    } else {
      item.hide();
    }
    if (useHeaders) 
    {
      if (infinite) 
      {
        header.translate(0, -10000);
      } else {
        header.hide();
      }
    }
    item.$hidden = true;
    return;
  } else if (item.$hidden) 
  {
    if (!infinite) 
    {
      item.show();
    }
    item.$hidden = false;
  }
  if (infinite) 
  {
    updatedItems.push(item);
  }
  if (item.isFirst && index !== 0 && scrollDockItems.top.length) 
  {
    for (i = 0 , ln = scrollDockItems.top.length; i < ln; i++) 
      {
        scrollDockItem = scrollDockItems.top[i];
        if (infinite) 
        {
          scrollDockItem.translate(0, -10000);
        }
      }
    item.isFirst = false;
  }
  if (item.isLast && index !== storeCount - 1 && scrollDockItems.bottom.length) 
  {
    for (i = 0 , ln = scrollDockItems.bottom.length; i < ln; i++) 
      {
        scrollDockItem = scrollDockItems.bottom[i];
        if (infinite) 
        {
          scrollDockItem.translate(0, -10000);
        }
      }
    item.isLast = false;
  }
  if (item.$dataIndex !== index) 
  {
    item.$dataIndex = index;
    me.fireEvent('itemindexchange', me, record, index, item);
  }
  if (item.getRecord() === record) 
  {
    item.updateRecord(record);
  } else {
    item.setRecord(record);
  }
  if (me.isSelected(record)) 
  {
    itemCls.push(info.selectedCls);
  }
  if (info.grouped && useHeaders) 
  {
    if (headerIndices[index]) 
    {
      itemCls.push(info.headerCls);
      headerCls.push(info.headerCls);
      header.setHtml(info.store.getGroupString(record));
      if (!infinite) 
      {
        header.renderElement.insertBefore(item.renderElement);
      }
      header.show();
    } else {
      if (infinite) 
      {
        header.translate(0, -10000);
      } else {
        header.hide();
      }
    }
    if (footerIndices[index]) 
    {
      itemCls.push(info.footerCls);
      headerCls.push(info.footerCls);
    }
  }
  if (!info.grouped && useHeaders) 
  {
    header.hide();
  }
  if (index === 0) 
  {
    item.isFirst = true;
    itemCls.push(info.firstCls);
    headerCls.push(info.firstCls);
    if (!info.grouped) 
    {
      itemCls.push(info.headerCls);
      headerCls.push(info.headerCls);
    }
    if (!infinite) 
    {
      for (i = 0 , ln = scrollDockItems.top.length; i < ln; i++) 
        {
          scrollDockItem = scrollDockItems.top[i];
          if (info.grouped) 
          {
            scrollDockItem.renderElement.insertBefore(header.renderElement);
          } else {
            scrollDockItem.renderElement.insertBefore(item.renderElement);
          }
        }
    }
  }
  if (index === storeCount - 1) 
  {
    item.isLast = true;
    itemCls.push(info.lastCls);
    headerCls.push(info.lastCls);
    if (!info.grouped) 
    {
      itemCls.push(info.footerCls);
      headerCls.push(info.footerCls);
    }
    if (!infinite) 
    {
      for (i = 0 , ln = scrollDockItems.bottom.length; i < ln; i++) 
        {
          scrollDockItem = scrollDockItems.bottom[i];
          scrollDockItem.renderElement.insertAfter(item.renderElement);
        }
    }
  }
  if (info.striped && index % 2 == 1) 
  {
    itemCls.push(info.stripeCls);
  }
  if (currentItemCls) 
  {
    for (i = 0; i < itemRemoveCls.length; i++) 
      {
        Ext.Array.remove(currentItemCls, itemRemoveCls[i]);
      }
    itemCls = Ext.Array.merge(itemCls, currentItemCls);
  }
  if (useHeaders && currentHeaderCls) 
  {
    for (i = 0; i < headerRemoveCls.length; i++) 
      {
        Ext.Array.remove(currentHeaderCls, headerRemoveCls[i]);
      }
    headerCls = Ext.Array.merge(headerCls, currentHeaderCls);
  }
  classCache = itemCls.join(' ');
  if (item.classCache !== classCache) 
  {
    item.renderElement.setCls(itemCls);
    item.classCache = classCache;
  }
  if (useHeaders) 
  {
    header.renderElement.setCls(headerCls);
  }
}, updateAllListItems: function() {
  var me = this, store = me.getStore(), items = me.listItems, info = me.getListItemInfo(), topRenderedIndex = me.topRenderedIndex, i, ln;
  if (store) 
  {
    for (i = 0 , ln = items.length; i < ln; i++) 
      {
        me.updateListItem(items[i], topRenderedIndex + i, info);
      }
  }
  if (me.isPainted()) 
  {
    if (me.getInfinite() && store && store.getCount()) 
    {
      me.handleItemHeights();
    }
    me.refreshScroller();
  }
}, doRefresh: function() {
  var me = this, infinite = me.getInfinite(), scroller = me.container.getScrollable().getScroller(), storeCount = me.getStore().getCount();
  if (infinite) 
  {
    me.getItemMap().populate(storeCount, this.topRenderedIndex);
  }
  if (me.getGrouped()) 
  {
    me.refreshHeaderIndices();
  }
  if (storeCount) 
  {
    me.hideScrollDockItems();
    me.hideEmptyText();
    if (!infinite) 
    {
      me.setItemsCount(storeCount);
      if (me.getScrollToTopOnRefresh()) 
      {
        scroller.scrollTo(0, 0);
      }
    } else {
      if (me.getScrollToTopOnRefresh()) 
      {
        me.topRenderedIndex = 0;
        me.topVisibleIndex = 0;
        scroller.position.y = 0;
      }
      me.updateAllListItems();
    }
  } else {
    me.onStoreClear();
  }
}, onContainerResize: function(container, size) {
  var me = this, currentVisibleCount = me.visibleCount;
  if (!me.headerHeight) 
  {
    me.headerHeight = parseInt(me.pinnedHeader.renderElement.getHeight(), 10);
  }
  if (me.getInfinite()) 
  {
    me.visibleCount = Math.ceil(size.height / me.getItemMap().getMinimumHeight());
    if (me.visibleCount != currentVisibleCount) 
    {
      me.setItemsCount(me.visibleCount + me.getBufferSize());
      me.fireEvent('updatevisiblecount', this, me.visibleCount, currentVisibleCount);
    }
  } else if (me.listItems.length && me.getUseHeaders() && me.getGrouped() && me.getPinHeaders()) 
  {
    me.updateHeaderMap();
  }
}, refreshScroller: function() {
  var me = this;
  if (me.isPainted()) 
  {
    if (!me.getInfinite() && me.getGrouped() && me.getPinHeaders()) 
    {
      me.updateHeaderMap();
    }
    me.container.getScrollable().getScroller().refresh();
  }
}, updateHeaderMap: function() {
  var me = this, headerMap = me.headerMap, headerIndices = me.headerIndices, header, i;
  headerMap.length = 0;
  for (i in headerIndices) 
    {
      if (headerIndices.hasOwnProperty(i)) 
      {
        header = me.getItemAt(i).getHeader();
        headerMap.push(header.renderElement.dom.offsetTop);
      }
    }
}, applyVariableHeights: function(value) {
  if (!this.getInfinite()) 
  {
    return true;
  }
  return value;
}, applyDefaultType: function(defaultType) {
  if (!defaultType) 
  {
    defaultType = this.getUseSimpleItems() ? 'simplelistitem' : 'listitem';
  }
  return defaultType;
}, applyItemMap: function(itemMap) {
  return Ext.factory(itemMap, Ext.util.PositionMap, this.getItemMap());
}, updateItemHeight: function(itemHeight) {
  this.getItemMap().setMinimumHeight(itemHeight);
}, applyIndexBar: function(indexBar) {
  return Ext.factory(indexBar, Ext.dataview.IndexBar, this.getIndexBar());
}, updatePinHeaders: function(pinnedHeaders) {
  if (this.isPainted()) 
  {
    this.pinnedHeader.translate(0, pinnedHeaders ? this.pinnedHeader.$position : -10000);
  }
}, updateItemTpl: function(newTpl) {
  var me = this, listItems = me.listItems, ln = listItems.length || 0, i, listItem;
  for (i = 0; i < ln; i++) 
    {
      listItem = listItems[i];
      listItem.setTpl(newTpl);
    }
  me.updateAllListItems();
}, updateItemCls: function(newCls, oldCls) {
  var items = this.listItems, ln = items.length, i, item;
  for (i = 0; i < ln; i++) 
    {
      item = items[i];
      item.removeCls(oldCls);
      item.addCls(newCls);
    }
}, updateIndexBar: function(indexBar, oldIndexBar) {
  var me = this, scrollViewElement = me.scrollViewElement;
  if (oldIndexBar) 
  {
    oldIndexBar.un({index: 'onIndex', scope: me});
    if (!indexBar) 
    {
      me.element.removeCls(me.getBaseCls() + '-indexed');
    }
    if (scrollViewElement) 
    {
      scrollViewElement.removeChild(oldIndexBar.renderElement);
    }
  }
  if (indexBar) 
  {
    indexBar.on({index: 'onIndex', scope: me});
    if (!oldIndexBar) 
    {
      me.element.addCls(me.getBaseCls() + '-indexed');
    }
    if (scrollViewElement) 
    {
      scrollViewElement.appendChild(indexBar.renderElement);
    }
  }
}, updateGrouped: function(grouped) {
  var me = this, baseCls = this.getBaseCls(), pinnedHeader = me.pinnedHeader, cls = baseCls + '-grouped', unCls = baseCls + '-ungrouped';
  if (pinnedHeader) 
  {
    pinnedHeader.translate(0, -10000);
  }
  if (grouped) 
  {
    me.addCls(cls);
    me.removeCls(unCls);
  } else {
    me.addCls(unCls);
    me.removeCls(cls);
  }
  if (me.getInfinite()) 
  {
    me.refreshHeaderIndices();
    me.handleItemHeights();
  }
  me.updateAllListItems();
}, onStoreAdd: function() {
  this.doRefresh();
}, onStoreRemove: function() {
  this.doRefresh();
}, onStoreUpdate: function(store, record, newIndex, oldIndex) {
  var me = this, item;
  oldIndex = (typeof oldIndex === 'undefined') ? newIndex : oldIndex;
  if (me.getInfinite() || (oldIndex !== newIndex)) 
  {
    me.doRefresh();
  } else {
    item = me.listItems[newIndex];
    if (item) 
    {
      me.updateListItem(item, newIndex, me.getListItemInfo());
    }
  }
}, onStoreClear: function() {
  var me = this, scroller = me.container.getScrollable().getScroller(), infinite = me.getInfinite();
  if (me.pinnedHeader) 
  {
    me.pinnedHeader.translate(0, -10000);
  }
  if (!infinite) 
  {
    me.setItemsCount(0);
    scroller.scrollTo(0, 0);
  } else {
    me.topRenderedIndex = 0;
    me.topVisibleIndex = 0;
    scroller.position.y = 0;
    me.updateAllListItems();
  }
}, showEmptyScrollDock: function() {
  var me = this, infinite = me.getInfinite(), scrollDockItems = me.scrollDockItems, offset = 0, i, ln, item;
  for (i = 0 , ln = scrollDockItems.top.length; i < ln; i++) 
    {
      item = scrollDockItems.top[i];
      if (infinite) 
      {
        item.translate(0, offset);
        offset += item.$scrollDockHeight;
      } else {
        this.scrollElement.appendChild(item.renderElement);
      }
    }
  for (i = 0 , ln = scrollDockItems.bottom.length; i < ln; i++) 
    {
      item = scrollDockItems.bottom[i];
      if (infinite) 
      {
        item.translate(0, offset);
        offset += item.$scrollDockHeight;
      } else {
        this.scrollElement.appendChild(item.renderElement);
      }
    }
}, hideScrollDockItems: function() {
  var me = this, infinite = me.getInfinite(), scrollDockItems = me.scrollDockItems, i, ln, item;
  if (!infinite) 
  {
    return;
  }
  for (i = 0 , ln = scrollDockItems.top.length; i < ln; i++) 
    {
      item = scrollDockItems.top[i];
      item.translate(0, -10000);
    }
  for (i = 0 , ln = scrollDockItems.bottom.length; i < ln; i++) 
    {
      item = scrollDockItems.bottom[i];
      item.translate(0, -10000);
    }
}, getItemAt: function(index) {
  var listItems = this.listItems, ln = listItems.length, i, listItem;
  for (i = 0; i < ln; i++) 
    {
      listItem = listItems[i];
      if (listItem.$dataIndex == index) 
      {
        return listItem;
      }
    }
}, getItemIndex: function(item) {
  return item.$dataIndex;
}, getViewItems: function() {
  return this.listItems;
}, getListItemInfo: function() {
  var me = this, baseCls = me.getBaseCls();
  return {store: me.getStore(), grouped: me.getGrouped(), baseCls: baseCls, selectedCls: me.getSelectedCls(), headerCls: baseCls + '-header-wrap', footerCls: baseCls + '-footer-wrap', firstCls: baseCls + '-item-first', lastCls: baseCls + '-item-last', stripeCls: baseCls + '-item-odd', striped: me.getStriped(), itemMap: me.getItemMap(), defaultItemHeight: me.getItemHeight()};
}, getListItemConfig: function() {
  var me = this, minimumHeight = me.getItemMap().getMinimumHeight(), config = {xtype: me.getDefaultType(), itemConfig: me.getItemConfig(), tpl: me.getItemTpl(), minHeight: minimumHeight, cls: me.getItemCls()};
  if (me.getInfinite()) 
  {
    config.translatable = {translationMethod: this.translationMethod};
  }
  if (!me.getVariableHeights()) 
  {
    config.height = minimumHeight;
  }
  return config;
}, refreshHeaderIndices: function() {
  var me = this, store = me.getStore(), storeLn = store && store.getCount(), groups = store.getGroups(), grouped = me.getGrouped(), groupLn = groups.length, headerIndices = me.headerIndices = {}, footerIndices = me.footerIndices = {}, i, previousIndex, firstGroupedRecord, storeIndex;
  if (!grouped) 
  {
    return footerIndices;
  }
  me.groups = groups;
  for (i = 0; i < groupLn; i++) 
    {
      firstGroupedRecord = groups[i].children[0];
      storeIndex = store.indexOf(firstGroupedRecord);
      headerIndices[storeIndex] = true;
      previousIndex = storeIndex - 1;
      if (previousIndex >= 0) 
      {
        footerIndices[previousIndex] = true;
      }
    }
  footerIndices[storeLn - 1] = true;
  return headerIndices;
}, onIndex: function(indexBar, index) {
  var me = this, key = index.toLowerCase(), store = me.getStore(), groups = store.getGroups(), ln = groups.length, group, i, closest, id;
  for (i = 0; i < ln; i++) 
    {
      group = groups[i];
      id = group.name.toLowerCase();
      if (id >= key) 
      {
        closest = group;
        break;
      } else {
        closest = group;
      }
    }
  if (closest) 
  {
    this.scrollToRecord(closest.children[0]);
  }
}, scrollToRecord: function(record, animate, overscroll) {
  var me = this, scroller = me.container.getScrollable().getScroller(), store = me.getStore(), index = store.indexOf(record);
  scroller.stopAnimation();
  var containerSize = scroller.getContainerSize().y, size = scroller.getSize().y, maxOffset = size - containerSize, offset, item;
  if (me.getInfinite()) 
  {
    offset = me.getItemMap().map[index];
  } else {
    item = me.listItems[index];
    if (me.getUseHeaders() && item.getHeader().isPainted()) 
    {
      offset = item.getHeader().renderElement.dom.offsetTop;
    } else {
      offset = item.renderElement.dom.offsetTop;
    }
  }
  if (!overscroll) 
  {
    offset = Math.min(offset, maxOffset);
  }
  scroller.scrollTo(0, offset, !!animate);
}, onItemAdd: function(item) {
  var me = this, config = item.config;
  if (config.scrollDock) 
  {
    if (config.scrollDock == 'bottom') 
    {
      me.scrollDockItems.bottom.push(item);
    } else {
      me.scrollDockItems.top.push(item);
    }
    if (me.getInfinite()) 
    {
      item.on({resize: 'onScrollDockItemResize', scope: this});
      item.addCls(me.getBaseCls() + '-scrolldockitem');
      item.setTranslatable({translationMethod: this.translationMethod});
      item.translate(0, -10000);
      item.$scrollDockHeight = 0;
    }
    me.container.doAdd(item);
  } else {
    me.callParent(arguments);
  }
}, getScrollDockedItems: function() {
  return this.scrollDockItems.bottom.slice().concat(this.scrollDockItems.top.slice());
}, onScrollDockItemResize: function(dockItem, size) {
  var me = this, items = me.listItems, ln = items.length, i, item;
  Ext.getCmp(dockItem.id).$scrollDockHeight = size.height;
  for (i = 0; i < ln; i++) 
    {
      item = items[i];
      if (item.isLast) 
      {
        this.updatedItems.push(item);
        this.refreshScroller();
        break;
      }
    }
}, onItemTouchStart: function(e) {
  this.container.innerElement.on({touchmove: 'onItemTouchMove', delegate: '.' + Ext.baseCSSPrefix + 'list-item', single: true, scope: this});
  this.callParent(this.parseEvent(e));
}, onItemTouchMove: function(e) {
  this.callParent(this.parseEvent(e));
}, onItemTouchEnd: function(e) {
  this.container.innerElement.un({touchmove: 'onItemTouchMove', delegate: '.' + Ext.baseCSSPrefix + 'list-item', scope: this});
  this.callParent(this.parseEvent(e));
}, onItemTap: function(e) {
  this.callParent(this.parseEvent(e));
}, onItemTapHold: function(e) {
  this.callParent(this.parseEvent(e));
}, onItemSingleTap: function(e) {
  this.callParent(this.parseEvent(e));
}, onItemDoubleTap: function(e) {
  this.callParent(this.parseEvent(e));
}, onItemSwipe: function(e) {
  this.callParent(this.parseEvent(e));
}, parseEvent: function(e) {
  var me = this, target = Ext.fly(e.getTarget()).findParent('.' + Ext.baseCSSPrefix + 'list-item', 8), item = Ext.getCmp(target.id);
  return [me, item, item.$dataIndex, e];
}, doItemSelect: function(me, record) {
  this.callParent(arguments);
  var item = me.getItemAt(me.getStore().indexOf(record));
  if (me.container && !me.isDestroyed && item && item.isComponent) 
  {
    item.classCache = item.renderElement.classList.slice();
  }
}, doItemDeselect: function(me, record) {
  this.callParent(arguments);
  var item = me.getItemAt(me.getStore().indexOf(record));
  if (item && item.isComponent) 
  {
    item.classCache = item.renderElement.classList.slice();
  }
}, applyOnItemDisclosure: function(config) {
  if (Ext.isFunction(config)) 
  {
    return {scope: this, handler: config};
  }
  return config;
}, handleItemDisclosure: function(e) {
  var me = this, item = Ext.getCmp(Ext.get(e.getTarget()).up('.x-list-item').id), index = item.$dataIndex, record = me.getStore().getAt(index);
  me.fireAction('disclose', [me, record, item, index, e], 'doDisclose');
}, doDisclose: function(me, record, item, index, e) {
  var onItemDisclosure = me.getOnItemDisclosure();
  if (onItemDisclosure && onItemDisclosure.handler) 
  {
    onItemDisclosure.handler.call(onItemDisclosure.scope || me, record, item, index, e);
  }
}, onItemTrigger: function(me, index, target, record, e) {
  if (!(this.getPreventSelectionOnDisclose() && Ext.fly(e.target).hasCls(this.getBaseCls() + '-disclosure'))) 
  {
    this.callParent(arguments);
  }
}, destroy: function() {
  var me = this, items = me.listItems, ln = items.length, i;
  me.callParent(arguments);
  if (me.onIdleBound) 
  {
    Ext.AnimationQueue.unIdle(me.onAnimationIdle, me);
  }
  for (i = 0; i < ln; i++) 
    {
      items[i].destroy();
    }
  me.listItems = null;
}});

Ext.define('Ext.event.Event', {alternateClassName: 'Ext.EventObject', isStopped: false, set: function(name, value) {
  if (arguments.length === 1 && typeof name != 'string') 
  {
    var info = name;
    for (name in info) 
      {
        if (info.hasOwnProperty(name)) 
        {
          this[name] = info[name];
        }
      }
  } else {
    this[name] = info[name];
  }
}, stopEvent: function() {
  return this.stopPropagation();
}, stopPropagation: function() {
  this.isStopped = true;
  return this;
}});

Ext.define('Ext.event.Dom', {extend: 'Ext.event.Event', constructor: function(event) {
  var target = event.target, touches;
  if (target && target.nodeType !== 1) 
  {
    target = target.parentNode;
  }
  touches = event.changedTouches;
  if (touches) 
  {
    touches = touches[0];
    this.pageX = touches.pageX;
    this.pageY = touches.pageY;
  } else {
    this.pageX = event.pageX;
    this.pageY = event.pageY;
  }
  this.browserEvent = this.event = event;
  this.target = this.delegatedTarget = target;
  this.type = event.type;
  this.timeStamp = this.time = +event.timeStamp;
  return this;
}, stopEvent: function() {
  this.preventDefault();
  return this.callParent();
}, preventDefault: function() {
  this.browserEvent.preventDefault();
}, getPageX: function() {
  return this.pageX || this.browserEvent.pageX;
}, getPageY: function() {
  return this.pageY || this.browserEvent.pageY;
}, getXY: function() {
  if (!this.xy) 
  {
    this.xy = [this.getPageX(), this.getPageY()];
  }
  return this.xy;
}, getTarget: function(selector, maxDepth, returnEl) {
  if (arguments.length === 0) 
  {
    return this.delegatedTarget;
  }
  return selector ? Ext.fly(this.target).findParent(selector, maxDepth, returnEl) : (returnEl ? Ext.get(this.target) : this.target);
}, getTime: function() {
  return this.time;
}, setDelegatedTarget: function(target) {
  this.delegatedTarget = target;
}, makeUnpreventable: function() {
  this.browserEvent.preventDefault = Ext.emptyFn;
}});

Ext.define('Ext.event.Touch', {extend: 'Ext.event.Dom', constructor: function(event, info, map, list) {
  var touches = [], touch, i, ln, identifier;
  if (info) 
  {
    this.set(info);
  }
  this.changedTouches = this.cloneTouches(event.changedTouches, map);
  for (i = 0 , ln = list.length; i < ln; i++) 
    {
      identifier = list[i];
      touches.push(map[identifier]);
    }
  this.touches = touches;
  this.targetTouches = touches.slice();
  touch = this.changedTouches[0];
  this.callSuper([event]);
  this.target = this.delegatedTarget = touch.target;
  this.pageX = touch.pageX;
  this.pageY = touch.pageY;
}, cloneTouches: function(touches, map) {
  var clonedTouches = [], i, ln, touch, identifier;
  for (i = 0 , ln = touches.length; i < ln; i++) 
    {
      touch = touches[i];
      identifier = touch.identifier;
      clonedTouches[i] = map[identifier];
    }
  return clonedTouches;
}});

Ext.define('Ext.event.publisher.Publisher', {targetType: '', idSelectorRegex: /^#([\w\-]+)$/i, constructor: function() {
  var handledEvents = this.handledEvents, handledEventsMap, i, ln, event;
  handledEventsMap = this.handledEventsMap = {};
  for (i = 0 , ln = handledEvents.length; i < ln; i++) 
    {
      event = handledEvents[i];
      handledEventsMap[event] = true;
    }
  this.subscribers = {};
  return this;
}, handles: function(eventName) {
  var map = this.handledEventsMap;
  return !!map[eventName] || !!map['*'] || eventName === '*';
}, getHandledEvents: function() {
  return this.handledEvents;
}, setDispatcher: function(dispatcher) {
  this.dispatcher = dispatcher;
}, subscribe: function() {
  return false;
}, unsubscribe: function() {
  return false;
}, unsubscribeAll: function() {
  delete this.subscribers;
  this.subscribers = {};
  return this;
}, notify: function() {
  return false;
}, getTargetType: function() {
  return this.targetType;
}, dispatch: function(target, eventName, args) {
  this.dispatcher.doDispatchEvent(this.targetType, target, eventName, args);
}});

Ext.define('Ext.event.publisher.ComponentDelegation', {extend: 'Ext.event.publisher.Publisher', targetType: 'component', optimizedSelectorRegex: /^#([\w\-]+)((?:[\s]*)>(?:[\s]*)|(?:\s*))([\w\-]+)$/i, handledEvents: ['*'], getSubscribers: function(eventName, createIfNotExist) {
  var subscribers = this.subscribers, eventSubscribers = subscribers[eventName];
  if (!eventSubscribers && createIfNotExist) 
  {
    eventSubscribers = subscribers[eventName] = {type: {$length: 0}, selector: [], $length: 0};
  }
  return eventSubscribers;
}, subscribe: function(target, eventName) {
  if (this.idSelectorRegex.test(target)) 
  {
    return false;
  }
  var optimizedSelector = target.match(this.optimizedSelectorRegex), subscribers = this.getSubscribers(eventName, true), typeSubscribers = subscribers.type, selectorSubscribers = subscribers.selector, id, isDescendant, type, map, subMap;
  if (optimizedSelector !== null) 
  {
    id = optimizedSelector[1];
    isDescendant = optimizedSelector[2].indexOf('>') === -1;
    type = optimizedSelector[3];
    map = typeSubscribers[type];
    if (!map) 
    {
      typeSubscribers[type] = map = {descendents: {$length: 0}, children: {$length: 0}, $length: 0};
    }
    subMap = isDescendant ? map.descendents : map.children;
    if (subMap.hasOwnProperty(id)) 
    {
      subMap[id]++;
      return true;
    }
    subMap[id] = 1;
    subMap.$length++;
    map.$length++;
    typeSubscribers.$length++;
  } else {
    if (selectorSubscribers.hasOwnProperty(target)) 
    {
      selectorSubscribers[target]++;
      return true;
    }
    selectorSubscribers[target] = 1;
    selectorSubscribers.push(target);
  }
  subscribers.$length++;
  return true;
}, unsubscribe: function(target, eventName, all) {
  var subscribers = this.getSubscribers(eventName);
  if (!subscribers) 
  {
    return false;
  }
  var match = target.match(this.optimizedSelectorRegex), typeSubscribers = subscribers.type, selectorSubscribers = subscribers.selector, id, isDescendant, type, map, subMap;
  all = Boolean(all);
  if (match !== null) 
  {
    id = match[1];
    isDescendant = match[2].indexOf('>') === -1;
    type = match[3];
    map = typeSubscribers[type];
    if (!map) 
    {
      return true;
    }
    subMap = isDescendant ? map.descendents : map.children;
    if (!subMap.hasOwnProperty(id) || (!all && --subMap[id] > 0)) 
    {
      return true;
    }
    delete subMap[id];
    subMap.$length--;
    map.$length--;
    typeSubscribers.$length--;
  } else {
    if (!selectorSubscribers.hasOwnProperty(target) || (!all && --selectorSubscribers[target] > 0)) 
    {
      return true;
    }
    delete selectorSubscribers[target];
    Ext.Array.remove(selectorSubscribers, target);
  }
  if (--subscribers.$length === 0) 
  {
    delete this.subscribers[eventName];
  }
  return true;
}, notify: function(target, eventName) {
  var subscribers = this.getSubscribers(eventName), id, component;
  if (!subscribers || subscribers.$length === 0) 
  {
    return false;
  }
  id = target.substr(1);
  component = Ext.ComponentManager.get(id);
  if (component) 
  {
    this.dispatcher.doAddListener(this.targetType, target, eventName, 'publish', this, {args: [eventName, component]}, 'before');
  }
}, matchesSelector: function(component, selector) {
  return Ext.ComponentQuery.is(component, selector);
}, dispatch: function(target, eventName, args, connectedController) {
  this.dispatcher.doDispatchEvent(this.targetType, target, eventName, args, null, connectedController);
}, publish: function(eventName, component) {
  var subscribers = this.getSubscribers(eventName);
  if (!subscribers) 
  {
    return;
  }
  var eventController = arguments[arguments.length - 1], typeSubscribers = subscribers.type, selectorSubscribers = subscribers.selector, args = Array.prototype.slice.call(arguments, 2, -2), types = component.xtypesChain, descendentsSubscribers, childrenSubscribers, parentId, ancestorIds, ancestorId, parentComponent, selector, i, ln, type, j, subLn;
  for (i = 0 , ln = types.length; i < ln; i++) 
    {
      type = types[i];
      subscribers = typeSubscribers[type];
      if (subscribers && subscribers.$length > 0) 
      {
        descendentsSubscribers = subscribers.descendents;
        if (descendentsSubscribers.$length > 0) 
        {
          if (!ancestorIds) 
          {
            ancestorIds = component.getAncestorIds();
          }
          for (j = 0 , subLn = ancestorIds.length; j < subLn; j++) 
            {
              ancestorId = ancestorIds[j];
              if (descendentsSubscribers.hasOwnProperty(ancestorId)) 
              {
                this.dispatch('#' + ancestorId + ' ' + type, eventName, args, eventController);
              }
            }
        }
        childrenSubscribers = subscribers.children;
        if (childrenSubscribers.$length > 0) 
        {
          if (!parentId) 
          {
            if (ancestorIds) 
            {
              parentId = ancestorIds[0];
            } else {
              parentComponent = component.getParent();
              if (parentComponent) 
              {
                parentId = parentComponent.getId();
              }
            }
          }
          if (parentId) 
          {
            if (childrenSubscribers.hasOwnProperty(parentId)) 
            {
              this.dispatch('#' + parentId + ' > ' + type, eventName, args, eventController);
            }
          }
        }
      }
    }
  ln = selectorSubscribers.length;
  if (ln > 0) 
  {
    for (i = 0; i < ln; i++) 
      {
        selector = selectorSubscribers[i];
        if (this.matchesSelector(component, selector)) 
        {
          this.dispatch(selector, eventName, args, eventController);
        }
      }
  }
}});

Ext.define('Ext.event.publisher.ComponentPaint', {extend: 'Ext.event.publisher.Publisher', targetType: 'component', handledEvents: ['erased'], eventNames: {painted: 'painted', erased: 'erased'}, constructor: function() {
  this.callParent(arguments);
  this.hiddenQueue = {};
  this.renderedQueue = {};
}, getSubscribers: function(eventName, createIfNotExist) {
  var subscribers = this.subscribers;
  if (!subscribers.hasOwnProperty(eventName)) 
  {
    if (!createIfNotExist) 
    {
      return null;
    }
    subscribers[eventName] = {$length: 0};
  }
  return subscribers[eventName];
}, setDispatcher: function(dispatcher) {
  var targetType = this.targetType;
  dispatcher.doAddListener(targetType, '*', 'renderedchange', 'onBeforeComponentRenderedChange', this, null, 'before');
  dispatcher.doAddListener(targetType, '*', 'hiddenchange', 'onBeforeComponentHiddenChange', this, null, 'before');
  dispatcher.doAddListener(targetType, '*', 'renderedchange', 'onComponentRenderedChange', this, null, 'after');
  dispatcher.doAddListener(targetType, '*', 'hiddenchange', 'onComponentHiddenChange', this, null, 'after');
  return this.callParent(arguments);
}, subscribe: function(target, eventName) {
  var match = target.match(this.idSelectorRegex), subscribers, id;
  if (!match) 
  {
    return false;
  }
  id = match[1];
  subscribers = this.getSubscribers(eventName, true);
  if (subscribers.hasOwnProperty(id)) 
  {
    subscribers[id]++;
    return true;
  }
  subscribers[id] = 1;
  subscribers.$length++;
  return true;
}, unsubscribe: function(target, eventName, all) {
  var match = target.match(this.idSelectorRegex), subscribers, id;
  if (!match || !(subscribers = this.getSubscribers(eventName))) 
  {
    return false;
  }
  id = match[1];
  if (!subscribers.hasOwnProperty(id) || (!all && --subscribers[id] > 0)) 
  {
    return true;
  }
  delete subscribers[id];
  if (--subscribers.$length === 0) 
  {
    delete this.subscribers[eventName];
  }
  return true;
}, onBeforeComponentRenderedChange: function(container, component, rendered) {
  var eventNames = this.eventNames, eventName = rendered ? eventNames.painted : eventNames.erased, subscribers = this.getSubscribers(eventName), queue;
  if (subscribers && subscribers.$length > 0) 
  {
    this.renderedQueue[component.getId()] = queue = [];
    this.publish(subscribers, component, eventName, queue);
  }
}, onBeforeComponentHiddenChange: function(component, hidden) {
  var eventNames = this.eventNames, eventName = hidden ? eventNames.erased : eventNames.painted, subscribers = this.getSubscribers(eventName), queue;
  if (subscribers && subscribers.$length > 0) 
  {
    this.hiddenQueue[component.getId()] = queue = [];
    this.publish(subscribers, component, eventName, queue);
  }
}, onComponentRenderedChange: function(container, component) {
  var renderedQueue = this.renderedQueue, id = component.getId(), queue;
  if (!renderedQueue.hasOwnProperty(id)) 
  {
    return;
  }
  queue = renderedQueue[id];
  delete renderedQueue[id];
  if (queue.length > 0) 
  {
    this.dispatchQueue(queue);
  }
}, onComponentHiddenChange: function(component) {
  var hiddenQueue = this.hiddenQueue, id = component.getId(), queue;
  if (!hiddenQueue.hasOwnProperty(id)) 
  {
    return;
  }
  queue = hiddenQueue[id];
  delete hiddenQueue[id];
  if (queue.length > 0) 
  {
    this.dispatchQueue(queue);
  }
}, dispatchQueue: function(dispatchingQueue) {
  var dispatcher = this.dispatcher, targetType = this.targetType, eventNames = this.eventNames, queue = dispatchingQueue.slice(), ln = queue.length, i, item, component, eventName, isPainted;
  dispatchingQueue.length = 0;
  if (ln > 0) 
  {
    for (i = 0; i < ln; i++) 
      {
        item = queue[i];
        component = item.component;
        eventName = item.eventName;
        isPainted = component.isPainted();
        if ((eventName === eventNames.painted && isPainted) || eventName === eventNames.erased && !isPainted) 
        {
          dispatcher.doDispatchEvent(targetType, '#' + item.id, eventName, [component]);
        }
      }
    queue.length = 0;
  }
}, publish: function(subscribers, component, eventName, dispatchingQueue) {
  var id = component.getId(), needsDispatching = false, eventNames, items, i, ln, isPainted;
  if (subscribers[id]) 
  {
    eventNames = this.eventNames;
    isPainted = component.isPainted();
    if ((eventName === eventNames.painted && !isPainted) || eventName === eventNames.erased && isPainted) 
    {
      needsDispatching = true;
    } else {
      return this;
    }
  }
  if (component.isContainer) 
  {
    items = component.getItems().items;
    for (i = 0 , ln = items.length; i < ln; i++) 
      {
        this.publish(subscribers, items[i], eventName, dispatchingQueue);
      }
  } else if (component.isDecorator) 
  {
    this.publish(subscribers, component.getComponent(), eventName, dispatchingQueue);
  }
  if (needsDispatching) 
  {
    dispatchingQueue.push({id: id, eventName: eventName, component: component});
  }
}});

Ext.define('Ext.event.publisher.Dom', {extend: 'Ext.event.publisher.Publisher', targetType: 'element', idOrClassSelectorRegex: /^([#|\.])([\w\-]+)$/, handledEvents: ['focus', 'blur', 'paste', 'input', 'change', 'keyup', 'keydown', 'keypress', 'submit', 'transitionend', 'animationstart', 'animationend'], classNameSplitRegex: /\s+/, SELECTOR_ALL: '*', constructor: function() {
  var eventNames = this.getHandledEvents(), eventNameMap = {}, i, ln, eventName, vendorEventName;
  this.doBubbleEventsMap = {'click': true, 'submit': true, 'mousedown': true, 'mousemove': true, 'mouseup': true, 'mouseover': true, 'mouseout': true, 'transitionend': true};
  this.onEvent = Ext.Function.bind(this.onEvent, this);
  for (i = 0 , ln = eventNames.length; i < ln; i++) 
    {
      eventName = eventNames[i];
      vendorEventName = this.getVendorEventName(eventName);
      eventNameMap[vendorEventName] = eventName;
      this.attachListener(vendorEventName);
    }
  this.eventNameMap = eventNameMap;
  return this.callParent();
}, getSubscribers: function(eventName) {
  var subscribers = this.subscribers, eventSubscribers = subscribers[eventName];
  if (!eventSubscribers) 
  {
    eventSubscribers = subscribers[eventName] = {id: {$length: 0}, className: {$length: 0}, selector: [], all: 0, $length: 0};
  }
  return eventSubscribers;
}, getVendorEventName: function(eventName) {
  if (Ext.browser.is.WebKit) 
  {
    if (eventName === 'transitionend') 
    {
      eventName = Ext.browser.getVendorProperyName('transitionEnd');
    } else if (eventName === 'animationstart') 
    {
      eventName = Ext.browser.getVendorProperyName('animationStart');
    } else if (eventName === 'animationend') 
    {
      eventName = Ext.browser.getVendorProperyName('animationEnd');
    }
  }
  return eventName;
}, bindListeners: function(doc, bind) {
  var handlesEvents = this.getHandledEvents(), handlesEventsLength = handlesEvents.length, i;
  for (i = 0; i < handlesEventsLength; i++) 
    {
      this.bindListener(doc, this.getVendorEventName(handlesEvents[i]), bind);
    }
}, bindListener: function(doc, eventName, bind) {
  if (bind) 
  {
    this.attachListener(eventName, doc);
  } else {
    this.removeListener(eventName, doc);
  }
  return this;
}, attachListener: function(eventName, doc) {
  if (!doc) 
  {
    doc = document;
  }
  var defaultView = doc.defaultView;
  if ((Ext.os.is.iOS && Ext.os.version.getMajor() < 5) || Ext.browser.is.AndroidStock) 
  {
    document.addEventListener(eventName, this.onEvent, !this.doesEventBubble(eventName));
  } else if (defaultView && defaultView.addEventListener) 
  {
    doc.defaultView.addEventListener(eventName, this.onEvent, !this.doesEventBubble(eventName));
  } else {
    doc.addEventListener(eventName, this.onEvent, !this.doesEventBubble(eventName));
  }
  return this;
}, removeListener: function(eventName, doc) {
  if (!doc) 
  {
    doc = document;
  }
  var defaultView = doc.defaultView;
  if ((Ext.os.is.iOS && Ext.os.version.getMajor() < 5) && Ext.browser.is.AndroidStock) 
  {
    document.removeEventListener(eventName, this.onEvent, !this.doesEventBubble(eventName));
  } else if (defaultView && defaultView.addEventListener) 
  {
    doc.defaultView.removeEventListener(eventName, this.onEvent, !this.doesEventBubble(eventName));
  } else {
    doc.removeEventListener(eventName, this.onEvent, !this.doesEventBubble(eventName));
  }
  return this;
}, doesEventBubble: function(eventName) {
  return !!this.doBubbleEventsMap[eventName];
}, subscribe: function(target, eventName) {
  if (!this.handles(eventName)) 
  {
    return false;
  }
  var idOrClassSelectorMatch = target.match(this.idOrClassSelectorRegex), subscribers = this.getSubscribers(eventName), idSubscribers = subscribers.id, classNameSubscribers = subscribers.className, selectorSubscribers = subscribers.selector, type, value;
  if (idOrClassSelectorMatch !== null) 
  {
    type = idOrClassSelectorMatch[1];
    value = idOrClassSelectorMatch[2];
    if (type === '#') 
    {
      if (idSubscribers.hasOwnProperty(value)) 
      {
        idSubscribers[value]++;
        return true;
      }
      idSubscribers[value] = 1;
      idSubscribers.$length++;
    } else {
      if (classNameSubscribers.hasOwnProperty(value)) 
      {
        classNameSubscribers[value]++;
        return true;
      }
      classNameSubscribers[value] = 1;
      classNameSubscribers.$length++;
    }
  } else {
    if (target === this.SELECTOR_ALL) 
    {
      subscribers.all++;
    } else {
      if (selectorSubscribers.hasOwnProperty(target)) 
      {
        selectorSubscribers[target]++;
        return true;
      }
      selectorSubscribers[target] = 1;
      selectorSubscribers.push(target);
    }
  }
  subscribers.$length++;
  return true;
}, unsubscribe: function(target, eventName, all) {
  if (!this.handles(eventName)) 
  {
    return false;
  }
  var idOrClassSelectorMatch = target.match(this.idOrClassSelectorRegex), subscribers = this.getSubscribers(eventName), idSubscribers = subscribers.id, classNameSubscribers = subscribers.className, selectorSubscribers = subscribers.selector, type, value;
  all = Boolean(all);
  if (idOrClassSelectorMatch !== null) 
  {
    type = idOrClassSelectorMatch[1];
    value = idOrClassSelectorMatch[2];
    if (type === '#') 
    {
      if (!idSubscribers.hasOwnProperty(value) || (!all && --idSubscribers[value] > 0)) 
      {
        return true;
      }
      delete idSubscribers[value];
      idSubscribers.$length--;
    } else {
      if (!classNameSubscribers.hasOwnProperty(value) || (!all && --classNameSubscribers[value] > 0)) 
      {
        return true;
      }
      delete classNameSubscribers[value];
      classNameSubscribers.$length--;
    }
  } else {
    if (target === this.SELECTOR_ALL) 
    {
      if (all) 
      {
        subscribers.all = 0;
      } else {
        subscribers.all--;
      }
    } else {
      if (!selectorSubscribers.hasOwnProperty(target) || (!all && --selectorSubscribers[target] > 0)) 
      {
        return true;
      }
      delete selectorSubscribers[target];
      Ext.Array.remove(selectorSubscribers, target);
    }
  }
  subscribers.$length--;
  return true;
}, getElementTarget: function(target) {
  if (target.nodeType !== 1) 
  {
    target = target.parentNode;
    if (!target || target.nodeType !== 1) 
    {
      return null;
    }
  }
  return target;
}, getBubblingTargets: function(target) {
  var targets = [];
  if (!target) 
  {
    return targets;
  }
  do {
    targets[targets.length] = target;
    target = target.parentNode;
  } while (target && target.nodeType === 1);
  return targets;
}, dispatch: function(target, eventName, args) {
  args.push(args[0].target);
  this.callParent(arguments);
}, publish: function(eventName, targets, event) {
  var subscribers = this.getSubscribers(eventName), wildcardSubscribers;
  if (subscribers.$length === 0 || !this.doPublish(subscribers, eventName, targets, event)) 
  {
    wildcardSubscribers = this.getSubscribers('*');
    if (wildcardSubscribers.$length > 0) 
    {
      this.doPublish(wildcardSubscribers, eventName, targets, event);
    }
  }
  return this;
}, doPublish: function(subscribers, eventName, targets, event) {
  var idSubscribers = subscribers.id, classNameSubscribers = subscribers.className, selectorSubscribers = subscribers.selector, hasIdSubscribers = idSubscribers.$length > 0, hasClassNameSubscribers = classNameSubscribers.$length > 0, hasSelectorSubscribers = selectorSubscribers.length > 0, hasAllSubscribers = subscribers.all > 0, isClassNameHandled = {}, args = [event], hasDispatched = false, classNameSplitRegex = this.classNameSplitRegex, i, ln, j, subLn, target, id, className, classNames, selector;
  for (i = 0 , ln = targets.length; i < ln; i++) 
    {
      target = targets[i];
      event.setDelegatedTarget(target);
      if (hasIdSubscribers) 
      {
        id = target.getAttribute("id");
        if (id) 
        {
          if (idSubscribers.hasOwnProperty(id)) 
          {
            hasDispatched = true;
            this.dispatch('#' + id, eventName, args);
          }
        }
      }
      if (hasClassNameSubscribers) 
      {
        className = target.className;
        if (className) 
        {
          classNames = className.split(classNameSplitRegex);
          for (j = 0 , subLn = classNames.length; j < subLn; j++) 
            {
              className = classNames[j];
              if (!isClassNameHandled[className]) 
              {
                isClassNameHandled[className] = true;
                if (classNameSubscribers.hasOwnProperty(className)) 
                {
                  hasDispatched = true;
                  this.dispatch('.' + className, eventName, args);
                }
              }
            }
        }
      }
      if (event.isStopped) 
      {
        return hasDispatched;
      }
    }
  if (hasAllSubscribers && !hasDispatched) 
  {
    event.setDelegatedTarget(event.browserEvent.target);
    hasDispatched = true;
    this.dispatch(this.SELECTOR_ALL, eventName, args);
    if (event.isStopped) 
    {
      return hasDispatched;
    }
  }
  if (hasSelectorSubscribers) 
  {
    for (j = 0 , subLn = targets.length; j < subLn; j++) 
      {
        target = targets[j];
        for (i = 0 , ln = selectorSubscribers.length; i < ln; i++) 
          {
            selector = selectorSubscribers[i];
            if (this.matchesSelector(target, selector)) 
            {
              event.setDelegatedTarget(target);
              hasDispatched = true;
              this.dispatch(selector, eventName, args);
            }
            if (event.isStopped) 
            {
              return hasDispatched;
            }
          }
      }
  }
  return hasDispatched;
}, matchesSelector: function() {
  var test = Element.prototype, matchesSelector = ('webkitMatchesSelector' in test) ? 'webkitMatchesSelector' : (('msMatchesSelector' in test) ? 'msMatchesSelector' : ('mozMatchesSelector' in test ? 'mozMatchesSelector' : null));
  if (matchesSelector) 
  {
    return function(element, selector) {
  return element[matchesSelector](selector);
};
  }
  return function(element, selector) {
  Ext.DomQuery.is(element, selector);
};
}(), onEvent: function(e) {
  var eventName = this.eventNameMap[e.type];
  Ext.frameStartTime = e.timeStamp;
  if (!eventName || this.getSubscribersCount(eventName) === 0) 
  {
    return;
  }
  var target = this.getElementTarget(e.target), targets;
  if (!target) 
  {
    return;
  }
  if (this.doesEventBubble(eventName)) 
  {
    targets = this.getBubblingTargets(target);
  } else {
    targets = [target];
  }
  this.publish(eventName, targets, new Ext.event.Dom(e));
}, getSubscribersCount: function(eventName) {
  if (!this.handles(eventName)) 
  {
    return 0;
  }
  return this.getSubscribers(eventName).$length + this.getSubscribers('*').$length;
}});

Ext.define('Ext.util.paintmonitor.Abstract', {config: {element: null, callback: Ext.emptyFn, scope: null, args: []}, eventName: '', monitorClass: '', constructor: function(config) {
  this.onElementPainted = Ext.Function.bind(this.onElementPainted, this);
  this.initConfig(config);
}, bindListeners: function(bind) {
  this.monitorElement[bind ? 'addEventListener' : 'removeEventListener'](this.eventName, this.onElementPainted, true);
}, applyElement: function(element) {
  if (element) 
  {
    return Ext.get(element);
  }
}, updateElement: function(element) {
  this.monitorElement = Ext.Element.create({classList: ['x-paint-monitor', this.monitorClass]}, true);
  element.appendChild(this.monitorElement);
  element.addCls('x-paint-monitored');
  this.bindListeners(true);
}, onElementPainted: function() {
}, destroy: function() {
  var monitorElement = this.monitorElement, parentNode = monitorElement.parentNode, element = this.getElement();
  this.bindListeners(false);
  delete this.monitorElement;
  if (element && !element.isDestroyed) 
  {
    element.removeCls('x-paint-monitored');
    delete this._element;
  }
  if (parentNode) 
  {
    parentNode.removeChild(monitorElement);
  }
  this.callSuper();
}});

Ext.define('Ext.util.paintmonitor.CssAnimation', {extend: 'Ext.util.paintmonitor.Abstract', eventName: Ext.browser.is.WebKit ? 'webkitAnimationEnd' : 'animationend', monitorClass: 'cssanimation', onElementPainted: function(e) {
  if (e.animationName === 'x-paint-monitor-helper') 
  {
    this.getCallback().apply(this.getScope(), this.getArgs());
  }
}});

Ext.define('Ext.util.paintmonitor.OverflowChange', {extend: 'Ext.util.paintmonitor.Abstract', eventName: Ext.browser.is.Firefox ? 'overflow' : 'overflowchanged', monitorClass: 'overflowchange', onElementPainted: function(e) {
  this.getCallback().apply(this.getScope(), this.getArgs());
}});

Ext.define('Ext.util.PaintMonitor', {constructor: function(config) {
  if (Ext.browser.is.Firefox || (Ext.browser.is.WebKit && Ext.browser.engineVersion.gtEq('536') && !Ext.os.is.Blackberry)) 
  {
    return new Ext.util.paintmonitor.OverflowChange(config);
  } else {
    return new Ext.util.paintmonitor.CssAnimation(config);
  }
}});

Ext.define('Ext.event.publisher.ElementPaint', {extend: 'Ext.event.publisher.Publisher', targetType: 'element', handledEvents: ['painted'], constructor: function() {
  this.monitors = {};
  this.callSuper(arguments);
}, subscribe: function(target) {
  var match = target.match(this.idSelectorRegex), subscribers = this.subscribers, id, element;
  if (!match) 
  {
    return false;
  }
  id = match[1];
  if (subscribers.hasOwnProperty(id)) 
  {
    subscribers[id]++;
    return true;
  }
  subscribers[id] = 1;
  element = Ext.get(id);
  this.monitors[id] = new Ext.util.PaintMonitor({element: element, callback: this.onElementPainted, scope: this, args: [target, element]});
  return true;
}, unsubscribe: function(target, eventName, all) {
  var match = target.match(this.idSelectorRegex), subscribers = this.subscribers, id;
  if (!match) 
  {
    return false;
  }
  id = match[1];
  if (!subscribers.hasOwnProperty(id) || (!all && --subscribers[id] > 0)) 
  {
    return true;
  }
  delete subscribers[id];
  this.monitors[id].destroy();
  delete this.monitors[id];
  return true;
}, onElementPainted: function(target, element) {
  Ext.TaskQueue.requestRead('dispatch', this, [target, 'painted', [element]]);
}});

Ext.define('Ext.mixin.Templatable', {extend: 'Ext.mixin.Mixin', mixinConfig: {id: 'templatable'}, referenceAttributeName: 'reference', referenceSelector: '[reference]', getElementConfig: function() {
  return {reference: 'element'};
}, getElementTemplate: function() {
  var elementTemplate = document.createDocumentFragment();
  elementTemplate.appendChild(Ext.Element.create(this.getElementConfig(), true));
  return elementTemplate;
}, initElement: function() {
  var prototype = this.self.prototype;
  prototype.elementTemplate = this.getElementTemplate();
  prototype.initElement = prototype.doInitElement;
  this.initElement.apply(this, arguments);
}, linkElement: function(reference, node) {
  this.link(reference, node);
}, doInitElement: function() {
  var referenceAttributeName = this.referenceAttributeName, renderElement, referenceNodes, i, ln, referenceNode, reference;
  renderElement = this.elementTemplate.cloneNode(true);
  referenceNodes = renderElement.querySelectorAll(this.referenceSelector);
  for (i = 0 , ln = referenceNodes.length; i < ln; i++) 
    {
      referenceNode = referenceNodes[i];
      reference = referenceNode.getAttribute(referenceAttributeName);
      referenceNode.removeAttribute(referenceAttributeName);
      this.linkElement(reference, referenceNode);
    }
}});

Ext.define('Ext.util.sizemonitor.Abstract', {mixins: ['Ext.mixin.Templatable'], config: {element: null, callback: Ext.emptyFn, scope: null, args: []}, width: 0, height: 0, contentWidth: 0, contentHeight: 0, constructor: function(config) {
  this.refresh = Ext.Function.bind(this.refresh, this);
  this.info = {width: 0, height: 0, contentWidth: 0, contentHeight: 0, flag: 0};
  this.initElement();
  this.initConfig(config);
  this.bindListeners(true);
}, bindListeners: Ext.emptyFn, applyElement: function(element) {
  if (element) 
  {
    return Ext.get(element);
  }
}, updateElement: function(element) {
  element.append(this.detectorsContainer);
  element.addCls('x-size-monitored');
}, applyArgs: function(args) {
  return args.concat([this.info]);
}, refreshMonitors: Ext.emptyFn, forceRefresh: function() {
  Ext.TaskQueue.requestRead('refresh', this);
}, getContentBounds: function() {
  return this.detectorsContainer.getBoundingClientRect();
}, getContentWidth: function() {
  return this.detectorsContainer.offsetWidth;
}, getContentHeight: function() {
  return this.detectorsContainer.offsetHeight;
}, refreshSize: function() {
  var element = this.getElement();
  if (!element || element.isDestroyed) 
  {
    return false;
  }
  var width = element.getWidth(), height = element.getHeight(), contentWidth = this.getContentWidth(), contentHeight = this.getContentHeight(), currentContentWidth = this.contentWidth, currentContentHeight = this.contentHeight, info = this.info, resized = false, flag;
  this.width = width;
  this.height = height;
  this.contentWidth = contentWidth;
  this.contentHeight = contentHeight;
  flag = ((currentContentWidth !== contentWidth ? 1 : 0) + (currentContentHeight !== contentHeight ? 2 : 0));
  if (flag > 0) 
  {
    info.width = width;
    info.height = height;
    info.contentWidth = contentWidth;
    info.contentHeight = contentHeight;
    info.flag = flag;
    resized = true;
    this.getCallback().apply(this.getScope(), this.getArgs());
  }
  return resized;
}, refresh: function(force) {
  if (this.refreshSize() || force) 
  {
    Ext.TaskQueue.requestWrite('refreshMonitors', this);
  }
}, destroy: function() {
  var element = this.getElement();
  this.bindListeners(false);
  if (element && !element.isDestroyed) 
  {
    element.removeCls('x-size-monitored');
  }
  delete this._element;
  this.callSuper();
}});

Ext.define('Ext.util.sizemonitor.Default', {extend: 'Ext.util.sizemonitor.Abstract', updateElement: function(element) {
}, bindListeners: function(bind) {
  var element = this.getElement().dom;
  if (!element) 
  {
    return;
  }
  if (bind) 
  {
    element.onresize = this.refresh;
  } else {
    delete element.onresize;
  }
}, getContentBounds: function() {
  return this.getElement().dom.getBoundingClientRect();
}, getContentWidth: function() {
  return this.getElement().getWidth();
}, getContentHeight: function() {
  return this.getElement().getHeight();
}});

Ext.define('Ext.util.sizemonitor.Scroll', {extend: 'Ext.util.sizemonitor.Abstract', getElementConfig: function() {
  return {reference: 'detectorsContainer', classList: ['x-size-monitors', 'scroll'], children: [{reference: 'expandMonitor', className: 'expand'}, {reference: 'shrinkMonitor', className: 'shrink'}]};
}, constructor: function(config) {
  this.onScroll = Ext.Function.bind(this.onScroll, this);
  this.callSuper(arguments);
}, bindListeners: function(bind) {
  var method = bind ? 'addEventListener' : 'removeEventListener';
  this.expandMonitor[method]('scroll', this.onScroll, true);
  this.shrinkMonitor[method]('scroll', this.onScroll, true);
}, forceRefresh: function() {
  Ext.TaskQueue.requestRead('refresh', this, [true]);
}, onScroll: function() {
  Ext.TaskQueue.requestRead('refresh', this);
}, refreshMonitors: function() {
  var expandMonitor = this.expandMonitor, shrinkMonitor = this.shrinkMonitor, end = 1000000;
  if (expandMonitor && !expandMonitor.isDestroyed) 
  {
    expandMonitor.scrollLeft = end;
    expandMonitor.scrollTop = end;
  }
  if (shrinkMonitor && !shrinkMonitor.isDestroyed) 
  {
    shrinkMonitor.scrollLeft = end;
    shrinkMonitor.scrollTop = end;
  }
}});

Ext.define('Ext.util.sizemonitor.OverflowChange', {extend: 'Ext.util.sizemonitor.Abstract', constructor: function(config) {
  this.onExpand = Ext.Function.bind(this.onExpand, this);
  this.onShrink = Ext.Function.bind(this.onShrink, this);
  this.callSuper(arguments);
}, getElementConfig: function() {
  return {reference: 'detectorsContainer', classList: ['x-size-monitors', 'overflowchanged'], children: [{reference: 'expandMonitor', className: 'expand', children: [{reference: 'expandHelper'}]}, {reference: 'shrinkMonitor', className: 'shrink', children: [{reference: 'shrinkHelper'}]}]};
}, bindListeners: function(bind) {
  var method = bind ? 'addEventListener' : 'removeEventListener';
  this.expandMonitor[method](Ext.browser.is.Firefox ? 'underflow' : 'overflowchanged', this.onExpand, true);
  this.shrinkMonitor[method](Ext.browser.is.Firefox ? 'overflow' : 'overflowchanged', this.onShrink, true);
}, onExpand: function(e) {
  if (Ext.browser.is.Webkit && e.horizontalOverflow && e.verticalOverflow) 
  {
    return;
  }
  Ext.TaskQueue.requestRead('refresh', this);
}, onShrink: function(e) {
  if (Ext.browser.is.Webkit && !e.horizontalOverflow && !e.verticalOverflow) 
  {
    return;
  }
  Ext.TaskQueue.requestRead('refresh', this);
}, refreshMonitors: function() {
  if (this.isDestroyed) 
  {
    return;
  }
  var expandHelper = this.expandHelper, shrinkHelper = this.shrinkHelper, contentBounds = this.getContentBounds(), width = contentBounds.width, height = contentBounds.height, style;
  if (expandHelper && !expandHelper.isDestroyed) 
  {
    style = expandHelper.style;
    style.width = (width + 1) + 'px';
    style.height = (height + 1) + 'px';
  }
  if (shrinkHelper && !shrinkHelper.isDestroyed) 
  {
    style = shrinkHelper.style;
    style.width = width + 'px';
    style.height = height + 'px';
  }
  Ext.TaskQueue.requestRead('refresh', this);
}});

Ext.define('Ext.util.SizeMonitor', {constructor: function(config) {
  var namespace = Ext.util.sizemonitor;
  if (Ext.browser.is.Firefox) 
  {
    return new namespace.OverflowChange(config);
  } else if (Ext.browser.is.WebKit) 
  {
    if (!Ext.browser.is.Silk && Ext.browser.engineVersion.gtEq('535')) 
    {
      return new namespace.OverflowChange(config);
    } else {
      return new namespace.Scroll(config);
    }
  } else if (Ext.browser.is.IE11) 
  {
    return new namespace.Scroll(config);
  } else {
    return new namespace.Default(config);
  }
}});

Ext.define('Ext.event.publisher.ElementSize', {extend: 'Ext.event.publisher.Publisher', targetType: 'element', handledEvents: ['resize'], constructor: function() {
  this.monitors = {};
  this.callSuper(arguments);
}, subscribe: function(target) {
  var match = target.match(this.idSelectorRegex), subscribers = this.subscribers, id, element, sizeMonitor;
  if (!match) 
  {
    return false;
  }
  id = match[1];
  if (subscribers.hasOwnProperty(id)) 
  {
    subscribers[id]++;
    return true;
  }
  subscribers[id] = 1;
  element = Ext.get(id);
  this.monitors[id] = sizeMonitor = new Ext.util.SizeMonitor({element: element, callback: this.onElementResize, scope: this, args: [target, element]});
  this.dispatcher.addListener('element', target, 'painted', 'forceRefresh', sizeMonitor);
  return true;
}, unsubscribe: function(target, eventName, all) {
  var match = target.match(this.idSelectorRegex), subscribers = this.subscribers, monitors = this.monitors, id, sizeMonitor;
  if (!match) 
  {
    return false;
  }
  id = match[1];
  if (!subscribers.hasOwnProperty(id) || (!all && --subscribers[id] > 0)) 
  {
    return true;
  }
  delete subscribers[id];
  sizeMonitor = monitors[id];
  this.dispatcher.removeListener('element', target, 'painted', 'forceRefresh', sizeMonitor);
  sizeMonitor.destroy();
  delete monitors[id];
  return true;
}, onElementResize: function(target, element, info) {
  Ext.TaskQueue.requestRead('dispatch', this, [target, 'resize', [element, info]]);
}});

Ext.define('Ext.event.publisher.TouchGesture', {extend: 'Ext.event.publisher.Dom', isNotPreventable: /^(select|a)$/i, handledEvents: ['touchstart', 'touchmove', 'touchend', 'touchcancel'], mouseToTouchMap: {mousedown: 'touchstart', mousemove: 'touchmove', mouseup: 'touchend'}, lastEventType: null, config: {moveThrottle: 0, recognizers: {}}, constructor: function(config) {
  var me = this;
  this.eventProcessors = {touchstart: this.onTouchStart, touchmove: this.onTouchMove, touchend: this.onTouchEnd, touchcancel: this.onTouchEnd};
  this.eventToRecognizerMap = {};
  this.activeRecognizers = [];
  this.touchesMap = {};
  this.currentIdentifiers = [];
  if (Ext.browser.is.Chrome && Ext.os.is.Android) 
  {
    this.screenPositionRatio = Ext.browser.version.gt('18') ? 1 : 1 / window.devicePixelRatio;
  } else if (Ext.browser.is.AndroidStock4) 
  {
    this.screenPositionRatio = 1;
  } else if (Ext.os.is.BlackBerry) 
  {
    this.screenPositionRatio = 1 / window.devicePixelRatio;
  } else if (Ext.browser.engineName == 'WebKit' && Ext.os.is.Desktop) 
  {
    this.screenPositionRatio = 1;
  } else {
    this.screenPositionRatio = window.innerWidth / window.screen.width;
  }
  this.initConfig(config);
  if (Ext.feature.has.Touch) 
  {
    me.onTargetTouchMove = me.onTargetTouchMove.bind(me);
    me.onTargetTouchEnd = me.onTargetTouchEnd.bind(me);
  }
  return this.callSuper();
}, applyRecognizers: function(recognizers) {
  var i, recognizer;
  for (i in recognizers) 
    {
      if (recognizers.hasOwnProperty(i)) 
      {
        recognizer = recognizers[i];
        if (recognizer) 
        {
          this.registerRecognizer(recognizer);
        }
      }
    }
  return recognizers;
}, handles: function(eventName) {
  return this.callSuper(arguments) || this.eventToRecognizerMap.hasOwnProperty(eventName);
}, doesEventBubble: function() {
  return true;
}, onEvent: function(e) {
  var type = e.type, lastEventType = this.lastEventType, touchList = [e];
  if (this.eventProcessors[type]) 
  {
    this.eventProcessors[type].call(this, e);
    return;
  }
  if ('button' in e && e.button > 0) 
  {
    return;
  } else {
    if (type === 'mousedown' && lastEventType && lastEventType !== 'mouseup') 
    {
      var fixedEvent = document.createEvent("MouseEvent");
      fixedEvent.initMouseEvent('mouseup', e.bubbles, e.cancelable, document.defaultView, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.metaKey, e.button, e.relatedTarget);
      this.onEvent(fixedEvent);
    }
    if (type !== 'mousemove') 
    {
      this.lastEventType = type;
    }
    e.identifier = 1;
    e.touches = (type !== 'mouseup') ? touchList : [];
    e.targetTouches = (type !== 'mouseup') ? touchList : [];
    e.changedTouches = touchList;
    this.eventProcessors[this.mouseToTouchMap[type]].call(this, e);
  }
}, registerRecognizer: function(recognizer) {
  var map = this.eventToRecognizerMap, activeRecognizers = this.activeRecognizers, handledEvents = recognizer.getHandledEvents(), i, ln, eventName;
  recognizer.setOnRecognized(this.onRecognized);
  recognizer.setCallbackScope(this);
  for (i = 0 , ln = handledEvents.length; i < ln; i++) 
    {
      eventName = handledEvents[i];
      map[eventName] = recognizer;
    }
  activeRecognizers.push(recognizer);
  return this;
}, onRecognized: function(eventName, e, touches, info) {
  var targetGroups = [], ln = touches.length, targets, i, touch;
  if (ln === 1) 
  {
    return this.publish(eventName, touches[0].targets, e, info);
  }
  for (i = 0; i < ln; i++) 
    {
      touch = touches[i];
      targetGroups.push(touch.targets);
    }
  targets = this.getCommonTargets(targetGroups);
  this.publish(eventName, targets, e, info);
}, publish: function(eventName, targets, event, info) {
  event.set(info);
  return this.callSuper([eventName, targets, event]);
}, getCommonTargets: function(targetGroups) {
  var firstTargetGroup = targetGroups[0], ln = targetGroups.length;
  if (ln === 1) 
  {
    return firstTargetGroup;
  }
  var commonTargets = [], i = 1, target, targets, j;
  while (true) 
    {
      target = firstTargetGroup[firstTargetGroup.length - i];
      if (!target) 
      {
        return commonTargets;
      }
      for (j = 1; j < ln; j++) 
        {
          targets = targetGroups[j];
          if (targets[targets.length - i] !== target) 
          {
            return commonTargets;
          }
        }
      commonTargets.unshift(target);
      i++;
    }
  return commonTargets;
}, invokeRecognizers: function(methodName, e) {
  var recognizers = this.activeRecognizers, ln = recognizers.length, i, recognizer;
  if (methodName === 'onStart') 
  {
    for (i = 0; i < ln; i++) 
      {
        recognizers[i].isActive = true;
      }
  }
  for (i = 0; i < ln; i++) 
    {
      recognizer = recognizers[i];
      if (recognizer.isActive && recognizer[methodName].call(recognizer, e) === false) 
      {
        recognizer.isActive = false;
      }
    }
}, getActiveRecognizers: function() {
  return this.activeRecognizers;
}, updateTouch: function(touch) {
  var identifier = touch.identifier, currentTouch = this.touchesMap[identifier], target, x, y;
  if (!currentTouch) 
  {
    target = this.getElementTarget(touch.target);
    this.touchesMap[identifier] = currentTouch = {identifier: identifier, target: target, targets: this.getBubblingTargets(target)};
    this.currentIdentifiers.push(identifier);
  }
  x = touch.pageX;
  y = touch.pageY;
  if (x === currentTouch.pageX && y === currentTouch.pageY) 
  {
    return false;
  }
  currentTouch.pageX = x;
  currentTouch.pageY = y;
  currentTouch.timeStamp = touch.timeStamp;
  currentTouch.point = new Ext.util.Point(x, y);
  return currentTouch;
}, updateTouches: function(touches) {
  var i, ln, touch, changedTouches = [];
  for (i = 0 , ln = touches.length; i < ln; i++) 
    {
      touch = this.updateTouch(touches[i]);
      if (touch) 
      {
        changedTouches.push(touch);
      }
    }
  return changedTouches;
}, factoryEvent: function(e) {
  return new Ext.event.Touch(e, null, this.touchesMap, this.currentIdentifiers);
}, onTouchStart: function(e) {
  var changedTouches = e.changedTouches, target = e.target, ln = changedTouches.length, isNotPreventable = this.isNotPreventable, isTouch = (e.type === 'touchstart'), me = this, i, touch, parent;
  this.updateTouches(changedTouches);
  e = this.factoryEvent(e);
  changedTouches = e.changedTouches;
  if (Ext.browser.is.AndroidStock && this.currentIdentifiers.length >= 2) 
  {
    e.preventDefault();
  }
  if (isTouch) 
  {
    target.addEventListener('touchmove', me.onTargetTouchMove);
    target.addEventListener('touchend', me.onTargetTouchEnd);
    target.addEventListener('touchcancel', me.onTargetTouchEnd);
  }
  for (i = 0; i < ln; i++) 
    {
      touch = changedTouches[i];
      this.publish('touchstart', touch.targets, e, {touch: touch});
    }
  if (!this.isStarted) 
  {
    this.isStarted = true;
    this.invokeRecognizers('onStart', e);
  }
  this.invokeRecognizers('onTouchStart', e);
  parent = target.parentNode || {};
}, onTouchMove: function(e) {
  if (!this.isStarted) 
  {
    return;
  }
  if (!this.animationQueued) 
  {
    this.animationQueued = true;
    Ext.AnimationQueue.start('onAnimationFrame', this);
  }
  this.lastMoveEvent = e;
}, onAnimationFrame: function() {
  var event = this.lastMoveEvent;
  if (event) 
  {
    this.lastMoveEvent = null;
    this.doTouchMove(event);
  }
}, doTouchMove: function(e) {
  var changedTouches, i, ln, touch;
  changedTouches = this.updateTouches(e.changedTouches);
  ln = changedTouches.length;
  e = this.factoryEvent(e);
  for (i = 0; i < ln; i++) 
    {
      touch = changedTouches[i];
      this.publish('touchmove', touch.targets, e, {touch: touch});
    }
  if (ln > 0) 
  {
    this.invokeRecognizers('onTouchMove', e);
  }
}, onTouchEnd: function(e) {
  if (!this.isStarted) 
  {
    return;
  }
  if (this.lastMoveEvent) 
  {
    this.onAnimationFrame();
  }
  var touchesMap = this.touchesMap, currentIdentifiers = this.currentIdentifiers, changedTouches = e.changedTouches, ln = changedTouches.length, identifier, i, touch;
  this.updateTouches(changedTouches);
  changedTouches = e.changedTouches;
  for (i = 0; i < ln; i++) 
    {
      Ext.Array.remove(currentIdentifiers, changedTouches[i].identifier);
    }
  e = this.factoryEvent(e);
  for (i = 0; i < ln; i++) 
    {
      identifier = changedTouches[i].identifier;
      touch = touchesMap[identifier];
      delete touchesMap[identifier];
      this.publish('touchend', touch.targets, e, {touch: touch});
    }
  this.invokeRecognizers('onTouchEnd', e);
  if (e.touches.length === 0 && currentIdentifiers.length) 
  {
    currentIdentifiers.length = 0;
    this.touchesMap = {};
  }
  if (currentIdentifiers.length === 0) 
  {
    this.isStarted = false;
    this.invokeRecognizers('onEnd', e);
    if (this.animationQueued) 
    {
      this.animationQueued = false;
      Ext.AnimationQueue.stop('onAnimationFrame', this);
    }
  }
}, onTargetTouchMove: function(e) {
  if (!Ext.getBody().contains(e.target)) 
  {
    this.onTouchMove(e);
  }
}, onTargetTouchEnd: function(e) {
  var me = this, target = e.target, touchCount = 0, touchTarget;
  for (identifier in this.touchesMap) 
    {
      touchTarget = this.touchesMap[identifier].target;
      if (touchTarget === target) 
      {
        touchCount++;
      }
    }
  if (touchCount <= 1) 
  {
    target.removeEventListener('touchmove', me.onTargetTouchMove);
    target.removeEventListener('touchend', me.onTargetTouchEnd);
    target.removeEventListener('touchcancel', me.onTargetTouchEnd);
  }
  if (!Ext.getBody().contains(target)) 
  {
    me.onTouchEnd(e);
  }
}}, function() {
  if (Ext.feature.has.Pointer) 
  {
    this.override({pointerToTouchMap: {MSPointerDown: 'touchstart', MSPointerMove: 'touchmove', MSPointerUp: 'touchend', MSPointerCancel: 'touchcancel', pointerdown: 'touchstart', pointermove: 'touchmove', pointerup: 'touchend', pointercancel: 'touchcancel'}, touchToPointerMap: {touchstart: 'MSPointerDown', touchmove: 'MSPointerMove', touchend: 'MSPointerUp', touchcancel: 'MSPointerCancel'}, attachListener: function(eventName, doc) {
  eventName = this.touchToPointerMap[eventName];
  if (!eventName) 
  {
    return;
  }
  return this.callOverridden([eventName, doc]);
}, onEvent: function(e) {
  var type = e.type;
  if (this.currentIdentifiers.length === 0 && (e.pointerType === e.MSPOINTER_TYPE_TOUCH || e.pointerType === "touch") && (type === "MSPointerMove" || type === "pointermove")) 
  {
    type = "MSPointerDown";
  }
  if ('button' in e && e.button > 0) 
  {
    return;
  }
  type = this.pointerToTouchMap[type];
  e.identifier = e.pointerId;
  e.changedTouches = [e];
  this.eventProcessors[type].call(this, e);
}});
  } else if (!Ext.browser.is.Ripple && (Ext.os.is.ChromeOS || !Ext.feature.has.Touch)) 
  {
    this.override({handledEvents: ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'mousedown', 'mousemove', 'mouseup']});
  }
});

Ext.define('Ext.event.recognizer.Recognizer', {mixins: ['Ext.mixin.Identifiable'], handledEvents: [], config: {onRecognized: Ext.emptyFn, onFailed: Ext.emptyFn, callbackScope: null}, constructor: function(config) {
  this.initConfig(config);
  return this;
}, getHandledEvents: function() {
  return this.handledEvents;
}, onStart: Ext.emptyFn, onEnd: Ext.emptyFn, fail: function() {
  this.getOnFailed().apply(this.getCallbackScope(), arguments);
  return false;
}, fire: function() {
  this.getOnRecognized().apply(this.getCallbackScope(), arguments);
}});

Ext.define('Ext.event.recognizer.Touch', {extend: 'Ext.event.recognizer.Recognizer', onTouchStart: Ext.emptyFn, onTouchMove: Ext.emptyFn, onTouchEnd: Ext.emptyFn});

Ext.define('Ext.event.recognizer.SingleTouch', {extend: 'Ext.event.recognizer.Touch', inheritableStatics: {NOT_SINGLE_TOUCH: 1, TOUCH_MOVED: 2}, onTouchStart: function(e) {
  if (e.touches.length > 1) 
  {
    return this.fail(this.self.NOT_SINGLE_TOUCH);
  }
}});

Ext.define('Ext.event.recognizer.Drag', {extend: 'Ext.event.recognizer.SingleTouch', isStarted: false, startPoint: null, previousPoint: null, lastPoint: null, handledEvents: ['dragstart', 'drag', 'dragend'], config: {minDistance: 8}, constructor: function() {
  this.callSuper(arguments);
  this.info = {touch: null, previous: {x: 0, y: 0}, x: 0, y: 0, delta: {x: 0, y: 0}, absDelta: {x: 0, y: 0}, flick: {velocity: {x: 0, y: 0}}, direction: {x: 0, y: 0}, time: 0, previousTime: {x: 0, y: 0}};
}, onTouchStart: function(e) {
  if (this.callSuper(arguments) === false) 
  {
    if (this.isStarted && this.lastMoveEvent !== null) 
    {
      this.lastMoveEvent.isStopped = false;
      this.onTouchEnd(this.lastMoveEvent);
    }
    return false;
  }
  this.startTime = e.time;
  this.startPoint = e.changedTouches[0].point;
}, tryDragStart: function(e) {
  var startPoint = this.startPoint, touches = e.changedTouches, touch = touches[0], point = touch.point, minDistance = this.getMinDistance(), info = this.info;
  if (Math.abs(point.getDistanceTo(startPoint)) >= minDistance) 
  {
    this.isStarted = true;
    this.previousPoint = this.lastPoint = point;
    this.resetInfo('x', e, touch);
    this.resetInfo('y', e, touch);
    info.time = e.time;
    this.fire('dragstart', e, touches, info);
  }
}, onTouchMove: function(e) {
  if (!this.isStarted) 
  {
    this.tryDragStart(e);
  }
  if (!this.isStarted) 
  {
    return;
  }
  var touches = e.changedTouches, touch = touches[0], point = touch.point;
  if (this.lastPoint) 
  {
    this.previousPoint = this.lastPoint;
  }
  this.lastPoint = point;
  this.lastMoveEvent = e;
  this.updateInfo('x', e, touch, true);
  this.updateInfo('y', e, touch, true);
  this.info.time = e.time;
  this.fire('drag', e, touches, this.info);
}, onAxisDragEnd: function(axis, info) {
  var duration = info.time - info.previousTime[axis];
  if (duration > 0) 
  {
    info.flick.velocity[axis] = (info[axis] - info.previous[axis]) / duration;
  }
}, resetInfo: function(axis, e, touch) {
  var value = this.lastPoint[axis], startValue = this.startPoint[axis], delta = value - startValue, capAxis = axis.toUpperCase(), info = this.info;
  info.touch = touch;
  info.delta[axis] = delta;
  info.absDelta[axis] = Math.abs(delta);
  info.previousTime[axis] = this.startTime;
  info.previous[axis] = startValue;
  info[axis] = value;
  info.direction[axis] = 0;
  info['start' + capAxis] = this.startPoint[axis];
  info['previous' + capAxis] = info.previous[axis];
  info['page' + capAxis] = info[axis];
  info['delta' + capAxis] = info.delta[axis];
  info['absDelta' + capAxis] = info.absDelta[axis];
  info['previousDelta' + capAxis] = 0;
  info.startTime = this.startTime;
}, updateInfo: function(axis, e, touch, updatePrevious) {
  var time = e.time, value = this.lastPoint[axis], previousValue = this.previousPoint[axis], startValue = this.startPoint[axis], delta = value - startValue, info = this.info, direction = info.direction, capAxis = axis.toUpperCase(), previousFlick = info.previous[axis], previousDelta;
  info.touch = touch;
  previousDelta = info.delta[axis];
  info.delta[axis] = delta;
  info.absDelta[axis] = Math.abs(delta);
  if (updatePrevious && value !== previousFlick && value !== info[axis] && time - info.previousTime[axis] >= 50) 
  {
    info.previous[axis] = info[axis];
    info.previousTime[axis] = info.time;
  }
  info[axis] = value;
  if (value > previousValue) 
  {
    direction[axis] = 1;
  } else if (value < previousValue) 
  {
    direction[axis] = -1;
  }
  info['start' + capAxis] = this.startPoint[axis];
  info['previous' + capAxis] = info.previous[axis];
  info['page' + capAxis] = info[axis];
  info['delta' + capAxis] = info.delta[axis];
  info['absDelta' + capAxis] = info.absDelta[axis];
  info['previousDelta' + capAxis] = previousDelta;
  info.startTime = this.startTime;
}, onTouchEnd: function(e) {
  if (!this.isStarted) 
  {
    this.tryDragStart(e);
  }
  if (this.isStarted) 
  {
    var touches = e.changedTouches, touch = touches[0], point = touch.point, info = this.info;
    this.isStarted = false;
    this.lastPoint = point;
    this.updateInfo('x', e, touch);
    this.updateInfo('y', e, touch);
    info.time = e.time;
    this.onAxisDragEnd('x', info);
    this.onAxisDragEnd('y', info);
    this.fire('dragend', e, touches, info);
    this.startPoint = null;
    this.previousPoint = null;
    this.lastPoint = null;
    this.lastMoveEvent = null;
  }
}});

Ext.define('Ext.event.recognizer.Swipe', {extend: 'Ext.event.recognizer.SingleTouch', handledEvents: ['swipestart', 'swipe'], inheritableStatics: {MAX_OFFSET_EXCEEDED: 16, MAX_DURATION_EXCEEDED: 17, DISTANCE_NOT_ENOUGH: 18}, config: {minDistance: 80, maxOffset: 35, maxDuration: 1000}, onTouchStart: function(e) {
  if (this.callParent(arguments) === false) 
  {
    return false;
  }
  var touch = e.changedTouches[0];
  this.startTime = e.time;
  this.isHorizontal = true;
  this.isVertical = true;
  this.startX = touch.pageX;
  this.startY = touch.pageY;
}, onTouchMove: function(e) {
  var touch = e.changedTouches[0], x = touch.pageX, y = touch.pageY, deltaX = x - this.startX, deltaY = y - this.startY, absDeltaX = Math.abs(x - this.startX), absDeltaY = Math.abs(y - this.startY), duration = e.time - this.startTime, minDistance = this.getMinDistance(), time = e.time, direction, distance;
  if (time - this.startTime > this.getMaxDuration()) 
  {
    return this.fail(this.self.MAX_DURATION_EXCEEDED);
  }
  if (this.isHorizontal && absDeltaY > this.getMaxOffset()) 
  {
    this.isHorizontal = false;
  }
  if (this.isVertical && absDeltaX > this.getMaxOffset()) 
  {
    this.isVertical = false;
  }
  if (!this.isVertical || !this.isHorizontal) 
  {
    if (this.isHorizontal && absDeltaX < minDistance) 
    {
      direction = (deltaX < 0) ? 'left' : 'right';
      distance = absDeltaX;
    } else if (this.isVertical && absDeltaY < minDistance) 
    {
      direction = (deltaY < 0) ? 'up' : 'down';
      distance = absDeltaY;
    }
  }
  if (direction && !this.started) 
  {
    this.started = true;
    this.fire('swipestart', e, [touch], {touch: touch, direction: direction, distance: distance, duration: duration});
  }
  if (!this.isHorizontal && !this.isVertical) 
  {
    return this.fail(this.self.MAX_OFFSET_EXCEEDED);
  }
}, onTouchEnd: function(e) {
  if (this.onTouchMove(e) === false) 
  {
    return false;
  }
  var touch = e.changedTouches[0], x = touch.pageX, y = touch.pageY, deltaX = x - this.startX, deltaY = y - this.startY, absDeltaX = Math.abs(deltaX), absDeltaY = Math.abs(deltaY), minDistance = this.getMinDistance(), duration = e.time - this.startTime, direction, distance;
  if (this.isVertical && absDeltaY < minDistance) 
  {
    this.isVertical = false;
  }
  if (this.isHorizontal && absDeltaX < minDistance) 
  {
    this.isHorizontal = false;
  }
  if (this.isHorizontal) 
  {
    direction = (deltaX < 0) ? 'left' : 'right';
    distance = absDeltaX;
  } else if (this.isVertical) 
  {
    direction = (deltaY < 0) ? 'up' : 'down';
    distance = absDeltaY;
  } else {
    return this.fail(this.self.DISTANCE_NOT_ENOUGH);
  }
  this.started = false;
  this.fire('swipe', e, [touch], {touch: touch, direction: direction, distance: distance, duration: duration});
}});

Ext.define('Ext.event.recognizer.EdgeSwipe', {extend: 'Ext.event.recognizer.Swipe', handledEvents: ['edgeswipe', 'edgeswipestart', 'edgeswipeend'], inheritableStatics: {NOT_NEAR_EDGE: 19}, config: {minDistance: 60}, onTouchStart: function(e) {
  if (this.callParent(arguments) === false) 
  {
    return false;
  }
  var touch = e.changedTouches[0];
  this.started = false;
  this.direction = null;
  this.isHorizontal = true;
  this.isVertical = true;
  this.startX = touch.pageX;
  this.startY = touch.pageY;
}, onTouchMove: function(e) {
  var touch = e.changedTouches[0], x = touch.pageX, y = touch.pageY, deltaX = x - this.startX, deltaY = y - this.startY, absDeltaY = Math.abs(y - this.startY), absDeltaX = Math.abs(x - this.startX), minDistance = this.getMinDistance(), maxOffset = this.getMaxOffset(), duration = e.time - this.startTime, elementWidth = Ext.Viewport && Ext.Viewport.element.getWidth(), elementHeight = Ext.Viewport && Ext.Viewport.element.getHeight(), direction, distance;
  if (this.isVertical && absDeltaX > maxOffset) 
  {
    this.isVertical = false;
  }
  if (this.isHorizontal && absDeltaY > maxOffset) 
  {
    this.isHorizontal = false;
  }
  if (this.isVertical && this.isHorizontal) 
  {
    if (absDeltaY > absDeltaX) 
    {
      this.isHorizontal = false;
    } else {
      this.isVertical = false;
    }
  }
  if (this.isHorizontal) 
  {
    direction = (deltaX < 0) ? 'left' : 'right';
    distance = deltaX;
  } else if (this.isVertical) 
  {
    direction = (deltaY < 0) ? 'up' : 'down';
    distance = deltaY;
  }
  this.direction = this.direction || direction;
  if (this.direction == 'up') 
  {
    distance = deltaY * -1;
  } else if (this.direction == 'left') 
  {
    distance = deltaX * -1;
  }
  this.distance = distance;
  if (distance == 0) 
  {
    return this.fail(this.self.DISTANCE_NOT_ENOUGH);
  }
  if (!this.started) 
  {
    if (this.direction == 'right' && this.startX > minDistance) 
    {
      return this.fail(this.self.NOT_NEAR_EDGE);
    } else if (this.direction == 'down' && this.startY > minDistance) 
    {
      return this.fail(this.self.NOT_NEAR_EDGE);
    } else if (this.direction == 'left' && (elementWidth - this.startX) > minDistance) 
    {
      return this.fail(this.self.NOT_NEAR_EDGE);
    } else if (this.direction == 'up' && (elementHeight - this.startY) > minDistance) 
    {
      return this.fail(this.self.NOT_NEAR_EDGE);
    }
    this.started = true;
    this.startTime = e.time;
    this.fire('edgeswipestart', e, [touch], {touch: touch, direction: this.direction, distance: this.distance, duration: duration});
  } else {
    this.fire('edgeswipe', e, [touch], {touch: touch, direction: this.direction, distance: this.distance, duration: duration});
  }
}, onTouchEnd: function(e) {
  if (this.onTouchMove(e) !== false) 
  {
    var touch = e.changedTouches[0], duration = e.time - this.startTime;
    this.fire('edgeswipeend', e, [touch], {touch: touch, direction: this.direction, distance: this.distance, duration: duration});
  }
}});

Ext.define('Ext.event.recognizer.Tap', {extend: 'Ext.event.recognizer.SingleTouch', handledEvents: ['tap', 'tapcancel'], config: {moveDistance: 8}, onTouchStart: function(e) {
  if (this.callSuper(arguments) === false) 
  {
    return false;
  }
  this.startPoint = e.changedTouches[0].point;
}, onTouchMove: function(e) {
  var touch = e.changedTouches[0], point = touch.point;
  if (Math.abs(point.getDistanceTo(this.startPoint)) >= this.getMoveDistance()) 
  {
    this.fire('tapcancel', e, [touch], {touch: touch});
    return this.fail(this.self.TOUCH_MOVED);
  }
}, onTouchEnd: function(e) {
  var touch = e.changedTouches[0];
  this.fire('tap', e, [touch], {touch: touch});
}});

Ext.define('Ext.fx.runner.Css', {extend: 'Ext.Evented', prefixedProperties: {'transform': true, 'transform-origin': true, 'perspective': true, 'transform-style': true, 'transition': true, 'transition-property': true, 'transition-duration': true, 'transition-timing-function': true, 'transition-delay': true, 'animation': true, 'animation-name': true, 'animation-duration': true, 'animation-iteration-count': true, 'animation-direction': true, 'animation-timing-function': true, 'animation-delay': true}, lengthProperties: {'top': true, 'right': true, 'bottom': true, 'left': true, 'width': true, 'height': true, 'max-height': true, 'max-width': true, 'min-height': true, 'min-width': true, 'margin-bottom': true, 'margin-left': true, 'margin-right': true, 'margin-top': true, 'padding-bottom': true, 'padding-left': true, 'padding-right': true, 'padding-top': true, 'border-bottom-width': true, 'border-left-width': true, 'border-right-width': true, 'border-spacing': true, 'border-top-width': true, 'border-width': true, 'outline-width': true, 'letter-spacing': true, 'line-height': true, 'text-indent': true, 'word-spacing': true, 'font-size': true, 'translate': true, 'translateX': true, 'translateY': true, 'translateZ': true, 'translate3d': true}, durationProperties: {'transition-duration': true, 'transition-delay': true, 'animation-duration': true, 'animation-delay': true}, angleProperties: {rotate: true, rotateX: true, rotateY: true, rotateZ: true, skew: true, skewX: true, skewY: true}, lengthUnitRegex: /([a-z%]*)$/, DEFAULT_UNIT_LENGTH: 'px', DEFAULT_UNIT_ANGLE: 'deg', DEFAULT_UNIT_DURATION: 'ms', formattedNameCache: {}, constructor: function() {
  var supports3dTransform = Ext.feature.has.Css3dTransforms;
  if (supports3dTransform) 
  {
    this.transformMethods = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'scaleX', 'scaleY', 'scaleZ'];
  } else {
    this.transformMethods = ['translateX', 'translateY', 'rotate', 'skewX', 'skewY', 'scaleX', 'scaleY'];
  }
  this.vendorPrefix = Ext.browser.getStyleDashPrefix();
  this.ruleStylesCache = {};
  return this;
}, getStyleSheet: function() {
  var styleSheet = this.styleSheet, styleElement, styleSheets;
  if (!styleSheet) 
  {
    styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    (document.head || document.getElementsByTagName('head')[0]).appendChild(styleElement);
    styleSheets = document.styleSheets;
    this.styleSheet = styleSheet = styleSheets[styleSheets.length - 1];
  }
  return styleSheet;
}, applyRules: function(selectors) {
  var styleSheet = this.getStyleSheet(), ruleStylesCache = this.ruleStylesCache, rules = styleSheet.cssRules, selector, properties, ruleStyle, ruleStyleCache, rulesLength, name, value;
  for (selector in selectors) 
    {
      properties = selectors[selector];
      ruleStyle = ruleStylesCache[selector];
      if (ruleStyle === undefined) 
      {
        rulesLength = rules.length;
        styleSheet.insertRule(selector + '{}', rulesLength);
        ruleStyle = ruleStylesCache[selector] = rules.item(rulesLength).style;
      }
      ruleStyleCache = ruleStyle.$cache;
      if (!ruleStyleCache) 
      {
        ruleStyleCache = ruleStyle.$cache = {};
      }
      for (name in properties) 
        {
          value = this.formatValue(properties[name], name);
          name = this.formatName(name);
          if (ruleStyleCache[name] !== value) 
          {
            ruleStyleCache[name] = value;
            if (value === null) 
            {
              ruleStyle.removeProperty(name);
            } else {
              ruleStyle.setProperty(name, value, 'important');
            }
          }
        }
    }
  return this;
}, applyStyles: function(styles) {
  var id, element, elementStyle, properties, name, value;
  for (id in styles) 
    {
      if (styles.hasOwnProperty(id)) 
      {
        element = document.getElementById(id);
        if (!element) 
        {
          return this;
        }
        elementStyle = element.style;
        properties = styles[id];
        for (name in properties) 
          {
            if (properties.hasOwnProperty(name)) 
            {
              value = this.formatValue(properties[name], name);
              name = this.formatName(name);
              if (value === null) 
              {
                elementStyle.removeProperty(name);
              } else {
                elementStyle.setProperty(name, value, 'important');
              }
            }
          }
      }
    }
  return this;
}, formatName: function(name) {
  var cache = this.formattedNameCache, formattedName = cache[name];
  if (!formattedName) 
  {
    if ((Ext.os.is.Tizen || !Ext.feature.has.CssTransformNoPrefix) && this.prefixedProperties[name]) 
    {
      formattedName = this.vendorPrefix + name;
    } else {
      formattedName = name;
    }
    cache[name] = formattedName;
  }
  return formattedName;
}, formatValue: function(value, name) {
  var type = typeof value, lengthUnit = this.DEFAULT_UNIT_LENGTH, transformMethods, method, i, ln, transformValues, values, unit;
  if (value === null) 
  {
    return '';
  }
  if (type == 'string') 
  {
    if (this.lengthProperties[name]) 
    {
      unit = value.match(this.lengthUnitRegex)[1];
      if (unit.length > 0) 
      {
      } else {
        return value + lengthUnit;
      }
    }
    return value;
  } else if (type == 'number') 
  {
    if (value == 0) 
    {
      return '0';
    }
    if (this.lengthProperties[name]) 
    {
      return value + lengthUnit;
    }
    if (this.angleProperties[name]) 
    {
      return value + this.DEFAULT_UNIT_ANGLE;
    }
    if (this.durationProperties[name]) 
    {
      return value + this.DEFAULT_UNIT_DURATION;
    }
  } else if (name === 'transform') 
  {
    transformMethods = this.transformMethods;
    transformValues = [];
    for (i = 0 , ln = transformMethods.length; i < ln; i++) 
      {
        method = transformMethods[i];
        transformValues.push(method + '(' + this.formatValue(value[method], method) + ')');
      }
    return transformValues.join(' ');
  } else if (Ext.isArray(value)) 
  {
    values = [];
    for (i = 0 , ln = value.length; i < ln; i++) 
      {
        values.push(this.formatValue(value[i], name));
      }
    return (values.length > 0) ? values.join(', ') : 'none';
  }
  return value;
}});

Ext.define('Ext.fx.runner.CssTransition', {extend: 'Ext.fx.runner.Css', listenersAttached: false, constructor: function() {
  this.runningAnimationsData = {};
  return this.callParent(arguments);
}, attachListeners: function() {
  this.listenersAttached = true;
  this.getEventDispatcher().addListener('element', '*', 'transitionend', 'onTransitionEnd', this);
}, onTransitionEnd: function(e) {
  var target = e.target, id = target.id;
  if (id && this.runningAnimationsData.hasOwnProperty(id)) 
  {
    this.refreshRunningAnimationsData(Ext.get(target), [e.browserEvent.propertyName]);
  }
}, onAnimationEnd: function(element, data, animation, isInterrupted, isReplaced) {
  var id = element.getId(), runningData = this.runningAnimationsData[id], endRules = {}, endData = {}, runningNameMap, toPropertyNames, i, ln, name;
  animation.un('stop', 'onAnimationStop', this);
  if (runningData) 
  {
    runningNameMap = runningData.nameMap;
  }
  endRules[id] = endData;
  if (data.onBeforeEnd) 
  {
    data.onBeforeEnd.call(data.scope || this, element, isInterrupted);
  }
  animation.fireEvent('animationbeforeend', animation, element, isInterrupted);
  this.fireEvent('animationbeforeend', this, animation, element, isInterrupted);
  if (isReplaced || (!isInterrupted && !data.preserveEndState)) 
  {
    toPropertyNames = data.toPropertyNames;
    for (i = 0 , ln = toPropertyNames.length; i < ln; i++) 
      {
        name = toPropertyNames[i];
        if (runningNameMap && !runningNameMap.hasOwnProperty(name)) 
        {
          endData[name] = null;
        }
      }
  }
  if (data.after) 
  {
    Ext.merge(endData, data.after);
  }
  this.applyStyles(endRules);
  if (data.onEnd) 
  {
    data.onEnd.call(data.scope || this, element, isInterrupted);
  }
  animation.fireEvent('animationend', animation, element, isInterrupted);
  this.fireEvent('animationend', this, animation, element, isInterrupted);
  Ext.AnimationQueue.stop(Ext.emptyFn, animation);
}, onAllAnimationsEnd: function(element) {
  var id = element.getId(), endRules = {};
  delete this.runningAnimationsData[id];
  endRules[id] = {'transition-property': null, 'transition-duration': null, 'transition-timing-function': null, 'transition-delay': null};
  this.applyStyles(endRules);
  this.fireEvent('animationallend', this, element);
}, hasRunningAnimations: function(element) {
  var id = element.getId(), runningAnimationsData = this.runningAnimationsData;
  return runningAnimationsData.hasOwnProperty(id) && runningAnimationsData[id].sessions.length > 0;
}, refreshRunningAnimationsData: function(element, propertyNames, interrupt, replace) {
  var id = element.getId(), runningAnimationsData = this.runningAnimationsData, runningData = runningAnimationsData[id];
  if (!runningData) 
  {
    return;
  }
  var nameMap = runningData.nameMap, nameList = runningData.nameList, sessions = runningData.sessions, ln, j, subLn, name, i, session, map, list, hasCompletedSession = false;
  interrupt = Boolean(interrupt);
  replace = Boolean(replace);
  if (!sessions) 
  {
    return this;
  }
  ln = sessions.length;
  if (ln === 0) 
  {
    return this;
  }
  if (replace) 
  {
    runningData.nameMap = {};
    nameList.length = 0;
    for (i = 0; i < ln; i++) 
      {
        session = sessions[i];
        this.onAnimationEnd(element, session.data, session.animation, interrupt, replace);
      }
    sessions.length = 0;
  } else {
    for (i = 0; i < ln; i++) 
      {
        session = sessions[i];
        map = session.map;
        list = session.list;
        for (j = 0 , subLn = propertyNames.length; j < subLn; j++) 
          {
            name = propertyNames[j];
            if (map[name]) 
            {
              delete map[name];
              Ext.Array.remove(list, name);
              session.length--;
              if (--nameMap[name] == 0) 
              {
                delete nameMap[name];
                Ext.Array.remove(nameList, name);
              }
            }
          }
        if (session.length == 0) 
        {
          sessions.splice(i, 1);
          i--;
          ln--;
          hasCompletedSession = true;
          this.onAnimationEnd(element, session.data, session.animation, interrupt);
        }
      }
  }
  if (!replace && !interrupt && sessions.length == 0 && hasCompletedSession) 
  {
    this.onAllAnimationsEnd(element);
  }
}, getRunningData: function(id) {
  var runningAnimationsData = this.runningAnimationsData;
  if (!runningAnimationsData.hasOwnProperty(id)) 
  {
    runningAnimationsData[id] = {nameMap: {}, nameList: [], sessions: []};
  }
  return runningAnimationsData[id];
}, getTestElement: function() {
  var testElement = this.testElement, iframe, iframeDocument, iframeStyle;
  if (!testElement) 
  {
    iframe = document.createElement('iframe');
    iframeStyle = iframe.style;
    iframeStyle.setProperty('visibility', 'hidden', 'important');
    iframeStyle.setProperty('width', '0px', 'important');
    iframeStyle.setProperty('height', '0px', 'important');
    iframeStyle.setProperty('position', 'absolute', 'important');
    iframeStyle.setProperty('border', '0px', 'important');
    iframeStyle.setProperty('zIndex', '-1000', 'important');
    document.body.appendChild(iframe);
    iframeDocument = iframe.contentDocument;
    iframeDocument.open();
    iframeDocument.writeln('</body>');
    iframeDocument.close();
    this.testElement = testElement = iframeDocument.createElement('div');
    testElement.style.setProperty('position', 'absolute', 'important');
    iframeDocument.body.appendChild(testElement);
    this.testElementComputedStyle = window.getComputedStyle(testElement);
  }
  return testElement;
}, getCssStyleValue: function(name, value) {
  var testElement = this.getTestElement(), computedStyle = this.testElementComputedStyle, style = testElement.style;
  style.setProperty(name, value);
  if (Ext.browser.is.Firefox) 
  {
    testElement.offsetHeight;
  }
  value = computedStyle.getPropertyValue(name);
  style.removeProperty(name);
  return value;
}, run: function(animations) {
  var me = this, isLengthPropertyMap = this.lengthProperties, fromData = {}, toData = {}, data = {}, element, elementId, from, to, before, fromPropertyNames, toPropertyNames, doApplyTo, message, runningData, elementData, i, j, ln, animation, propertiesLength, sessionNameMap, computedStyle, formattedName, name, toFormattedValue, computedValue, fromFormattedValue, isLengthProperty, runningNameMap, runningNameList, runningSessions, runningSession;
  if (!this.listenersAttached) 
  {
    this.attachListeners();
  }
  animations = Ext.Array.from(animations);
  for (i = 0 , ln = animations.length; i < ln; i++) 
    {
      animation = animations[i];
      animation = Ext.factory(animation, Ext.fx.Animation);
      element = animation.getElement();
      Ext.AnimationQueue.start(Ext.emptyFn, animation);
      computedStyle = window.getComputedStyle(element.dom);
      elementId = element.getId();
      data = Ext.merge({}, animation.getData());
      if (animation.onBeforeStart) 
      {
        animation.onBeforeStart.call(animation.scope || this, element);
      }
      animation.fireEvent('animationstart', animation);
      this.fireEvent('animationstart', this, animation);
      data[elementId] = data;
      before = data.before;
      from = data.from;
      to = data.to;
      data.fromPropertyNames = fromPropertyNames = [];
      data.toPropertyNames = toPropertyNames = [];
      for (name in to) 
        {
          if (to.hasOwnProperty(name)) 
          {
            to[name] = toFormattedValue = this.formatValue(to[name], name);
            formattedName = this.formatName(name);
            isLengthProperty = isLengthPropertyMap.hasOwnProperty(name);
            if (!isLengthProperty) 
            {
              toFormattedValue = this.getCssStyleValue(formattedName, toFormattedValue);
            }
            if (from.hasOwnProperty(name)) 
            {
              from[name] = fromFormattedValue = this.formatValue(from[name], name);
              if (!isLengthProperty) 
              {
                fromFormattedValue = this.getCssStyleValue(formattedName, fromFormattedValue);
              }
              if (toFormattedValue !== fromFormattedValue) 
              {
                fromPropertyNames.push(formattedName);
                toPropertyNames.push(formattedName);
              }
            } else {
              computedValue = computedStyle.getPropertyValue(formattedName);
              if (toFormattedValue !== computedValue) 
              {
                toPropertyNames.push(formattedName);
              }
            }
          }
        }
      propertiesLength = toPropertyNames.length;
      if (propertiesLength === 0) 
      {
        this.onAnimationEnd(element, data, animation);
        continue;
      }
      runningData = this.getRunningData(elementId);
      runningSessions = runningData.sessions;
      if (runningSessions.length > 0) 
      {
        this.refreshRunningAnimationsData(element, Ext.Array.merge(fromPropertyNames, toPropertyNames), true, data.replacePrevious);
      }
      runningNameMap = runningData.nameMap;
      runningNameList = runningData.nameList;
      sessionNameMap = {};
      for (j = 0; j < propertiesLength; j++) 
        {
          name = toPropertyNames[j];
          sessionNameMap[name] = true;
          if (!runningNameMap.hasOwnProperty(name)) 
          {
            runningNameMap[name] = 1;
            runningNameList.push(name);
          } else {
            runningNameMap[name]++;
          }
        }
      runningSession = {element: element, map: sessionNameMap, list: toPropertyNames.slice(), length: propertiesLength, data: data, animation: animation};
      runningSessions.push(runningSession);
      animation.on('stop', 'onAnimationStop', this);
      elementData = Ext.apply({}, before);
      Ext.apply(elementData, from);
      if (runningNameList.length > 0) 
      {
        fromPropertyNames = Ext.Array.difference(runningNameList, fromPropertyNames);
        toPropertyNames = Ext.Array.merge(fromPropertyNames, toPropertyNames);
        elementData['transition-property'] = fromPropertyNames;
      }
      fromData[elementId] = elementData;
      toData[elementId] = Ext.apply({}, to);
      toData[elementId]['transition-property'] = toPropertyNames;
      toData[elementId]['transition-duration'] = data.duration;
      toData[elementId]['transition-timing-function'] = data.easing;
      toData[elementId]['transition-delay'] = data.delay;
      animation.startTime = Date.now();
    }
  message = this.$className;
  this.applyStyles(fromData);
  doApplyTo = function(e) {
  if (e.data === message && e.source === window) 
  {
    window.removeEventListener('message', doApplyTo, false);
    me.applyStyles(toData);
  }
};
  if (Ext.browser.is.IE) 
  {
    window.requestAnimationFrame(function() {
  window.addEventListener('message', doApplyTo, false);
  window.postMessage(message, '*');
});
  } else {
    window.addEventListener('message', doApplyTo, false);
    window.postMessage(message, '*');
  }
}, onAnimationStop: function(animation) {
  var runningAnimationsData = this.runningAnimationsData, id, runningData, sessions, i, ln, session;
  for (id in runningAnimationsData) 
    {
      if (runningAnimationsData.hasOwnProperty(id)) 
      {
        runningData = runningAnimationsData[id];
        sessions = runningData.sessions;
        for (i = 0 , ln = sessions.length; i < ln; i++) 
          {
            session = sessions[i];
            if (session.animation === animation) 
            {
              this.refreshRunningAnimationsData(session.element, session.list.slice(), false);
            }
          }
      }
    }
}});

Ext.define('Ext.fx.Runner', {constructor: function() {
  return new Ext.fx.runner.CssTransition();
}});

Ext.define('Ext.tab.Tab', {extend: 'Ext.Button', xtype: 'tab', alternateClassName: 'Ext.Tab', isTab: true, config: {baseCls: Ext.baseCSSPrefix + 'tab', pressedCls: Ext.baseCSSPrefix + 'tab-pressed', activeCls: Ext.baseCSSPrefix + 'tab-active', active: false, title: '&nbsp;'}, updateIconCls: function(newCls, oldCls) {
  this.callParent([newCls, oldCls]);
  if (oldCls) 
  {
    this.removeCls('x-tab-icon');
  }
  if (newCls) 
  {
    this.addCls('x-tab-icon');
  }
}, updateTitle: function(title) {
  this.setText(title);
}, updateActive: function(active, oldActive) {
  var activeCls = this.getActiveCls();
  if (active && !oldActive) 
  {
    this.element.addCls(activeCls);
    this.fireEvent('activate', this);
  } else if (oldActive) 
  {
    this.element.removeCls(activeCls);
    this.fireEvent('deactivate', this);
  }
}}, function() {
  this.override({activate: function() {
  this.setActive(true);
}, deactivate: function() {
  this.setActive(false);
}});
});

Ext.define('Ext.tab.Bar', {extend: 'Ext.Toolbar', alternateClassName: 'Ext.TabBar', xtype: 'tabbar', config: {baseCls: Ext.baseCSSPrefix + 'tabbar', defaultType: 'tab', layout: {type: 'hbox', align: 'middle'}}, eventedConfig: {activeTab: null}, platformConfig: [{theme: ['Blackberry', 'CupertinoClassic', 'MountainView'], defaults: {flex: 1}}], initialize: function() {
  var me = this;
  me.callParent();
  me.on({tap: 'onTabTap', delegate: '> tab', scope: me});
}, onTabTap: function(tab) {
  this.setActiveTab(tab);
}, applyActiveTab: function(newActiveTab, oldActiveTab) {
  if (!newActiveTab && newActiveTab !== 0) 
  {
    return;
  }
  var newTabInstance = this.parseActiveTab(newActiveTab);
  if (!newTabInstance) 
  {
    return;
  }
  return newTabInstance;
}, doSetDocked: function(newDocked) {
  var layout = this.getLayout(), initialConfig = this.getInitialConfig(), pack;
  if (!initialConfig.layout || !initialConfig.layout.pack) 
  {
    pack = (newDocked == 'bottom') ? 'center' : 'left';
    if (layout.isLayout) 
    {
      layout.setPack(pack);
    } else {
      layout.pack = (layout && layout.pack) ? layout.pack : pack;
    }
  }
  this.callParent(arguments);
}, doSetActiveTab: function(newTab, oldTab) {
  if (newTab) 
  {
    newTab.setActive(true);
  }
  if (oldTab && oldTab.parent) 
  {
    oldTab.setActive(false);
  }
}, parseActiveTab: function(tab) {
  if (typeof tab == 'number') 
  {
    return this.getItems().items[tab];
  } else if (typeof tab == 'string') 
  {
    tab = Ext.getCmp(tab);
  }
  return tab;
}});

Ext.define('Ext.tab.Panel', {extend: 'Ext.Container', xtype: 'tabpanel', alternateClassName: 'Ext.TabPanel', config: {ui: 'dark', tabBar: true, tabBarPosition: 'top', layout: {type: 'card', animation: {type: 'slide', direction: 'left'}}, cls: Ext.baseCSSPrefix + 'tabpanel'}, initialize: function() {
  this.callParent();
  this.on({order: 'before', activetabchange: 'doTabChange', delegate: '> tabbar', scope: this});
  this.on({disabledchange: 'onItemDisabledChange', delegate: '> component', scope: this});
}, platformConfig: [{theme: ['Blackberry'], tabBarPosition: 'bottom'}], applyScrollable: function() {
  return false;
}, updateUi: function(newUi, oldUi) {
  this.callParent(arguments);
  if (this.initialized) 
  {
    this.getTabBar().setUi(newUi);
  }
}, doSetActiveItem: function(newActiveItem, oldActiveItem) {
  if (newActiveItem) 
  {
    var items = this.getInnerItems(), oldIndex = items.indexOf(oldActiveItem), newIndex = items.indexOf(newActiveItem), reverse = oldIndex > newIndex, animation = this.getLayout().getAnimation(), tabBar = this.getTabBar(), oldTab = tabBar.parseActiveTab(oldIndex), newTab = tabBar.parseActiveTab(newIndex);
    if (animation && animation.setReverse) 
    {
      animation.setReverse(reverse);
    }
    this.callParent(arguments);
    if (newIndex != -1) 
    {
      this.forcedChange = true;
      tabBar.setActiveTab(newIndex);
      this.forcedChange = false;
      if (oldTab) 
      {
        oldTab.setActive(false);
      }
      if (newTab) 
      {
        newTab.setActive(true);
      }
    }
  }
}, doTabChange: function(tabBar, newTab) {
  var oldActiveItem = this.getActiveItem(), newActiveItem;
  this.setActiveItem(tabBar.indexOf(newTab));
  newActiveItem = this.getActiveItem();
  return this.forcedChange || oldActiveItem !== newActiveItem;
}, applyTabBar: function(config) {
  if (config === true) 
  {
    config = {};
  }
  if (config) 
  {
    Ext.applyIf(config, {ui: this.getUi(), docked: this.getTabBarPosition()});
  }
  return Ext.factory(config, Ext.tab.Bar, this.getTabBar());
}, updateTabBar: function(newTabBar) {
  if (newTabBar) 
  {
    this.add(newTabBar);
    this.setTabBarPosition(newTabBar.getDocked());
  }
}, updateTabBarPosition: function(position) {
  var tabBar = this.getTabBar();
  if (tabBar) 
  {
    tabBar.setDocked(position);
  }
}, onItemAdd: function(card) {
  var me = this;
  if (!card.isInnerItem()) 
  {
    return me.callParent(arguments);
  }
  var tabBar = me.getTabBar(), initialConfig = card.getInitialConfig(), tabConfig = initialConfig.tab || {}, tabTitle = (card.getTitle) ? card.getTitle() : initialConfig.title, tabIconCls = (card.getIconCls) ? card.getIconCls() : initialConfig.iconCls, tabHidden = (card.getHidden) ? card.getHidden() : initialConfig.hidden, tabDisabled = (card.getDisabled) ? card.getDisabled() : initialConfig.disabled, tabBadgeText = (card.getBadgeText) ? card.getBadgeText() : initialConfig.badgeText, innerItems = me.getInnerItems(), index = innerItems.indexOf(card), tabs = tabBar.getItems(), activeTab = tabBar.getActiveTab(), currentTabInstance = (tabs.length >= innerItems.length) && tabs.getAt(index), tabInstance;
  if (tabTitle && !tabConfig.title) 
  {
    tabConfig.title = tabTitle;
  }
  if (tabIconCls && !tabConfig.iconCls) 
  {
    tabConfig.iconCls = tabIconCls;
  }
  if (tabHidden && !tabConfig.hidden) 
  {
    tabConfig.hidden = tabHidden;
  }
  if (tabDisabled && !tabConfig.disabled) 
  {
    tabConfig.disabled = tabDisabled;
  }
  if (tabBadgeText && !tabConfig.badgeText) 
  {
    tabConfig.badgeText = tabBadgeText;
  }
  tabInstance = Ext.factory(tabConfig, Ext.tab.Tab, currentTabInstance);
  if (!currentTabInstance) 
  {
    tabBar.insert(index, tabInstance);
  }
  card.tab = tabInstance;
  me.callParent(arguments);
  if (!activeTab && activeTab !== 0) 
  {
    tabBar.setActiveTab(tabBar.getActiveItem());
  }
}, onItemDisabledChange: function(item, newDisabled) {
  if (item && item.tab) 
  {
    item.tab.setDisabled(newDisabled);
  }
}, onItemRemove: function(item, index) {
  this.getTabBar().remove(item.tab, this.getAutoDestroy());
  this.callParent(arguments);
}}, function() {
});

Ext.define('Ext.viewport.Default', {extend: 'Ext.Container', xtype: 'viewport', PORTRAIT: 'portrait', LANDSCAPE: 'landscape', config: {autoMaximize: false, autoBlurInput: true, preventPanning: true, preventZooming: false, autoRender: true, layout: 'card', width: '100%', height: '100%', useBodyElement: true, menus: {}}, isReady: false, isViewport: true, isMaximizing: false, id: 'ext-viewport', isInputRegex: /^(input|textarea|select|a)$/i, focusedElement: null, fullscreenItemCls: Ext.baseCSSPrefix + 'fullscreen', constructor: function(config) {
  var bind = Ext.Function.bind;
  this.doPreventPanning = bind(this.doPreventPanning, this);
  this.doPreventZooming = bind(this.doPreventZooming, this);
  this.doBlurInput = bind(this.doBlurInput, this);
  this.maximizeOnEvents = ['ready', 'orientationchange'];
  window.devicePixelRatio = window.devicePixelRatio || 1;
  this.callSuper([config]);
  this.orientation = this.determineOrientation();
  this.windowWidth = this.getWindowWidth();
  this.windowHeight = this.getWindowHeight();
  this.windowOuterHeight = this.getWindowOuterHeight();
  if (!this.stretchHeights) 
  {
    this.stretchHeights = {};
  }
  if (!Ext.os.is.Android || Ext.browser.is.ChromeMobile) 
  {
    if (this.supportsOrientation()) 
    {
      this.addWindowListener('orientationchange', bind(this.onOrientationChange, this));
    } else {
      this.addWindowListener('resize', bind(this.onResize, this));
    }
  }
  document.addEventListener('focus', bind(this.onElementFocus, this), true);
  document.addEventListener('blur', bind(this.onElementBlur, this), true);
  Ext.onDocumentReady(this.onDomReady, this);
  this.on('ready', this.onReady, this, {single: true});
  this.getEventDispatcher().addListener('component', '*', 'fullscreen', 'onItemFullscreenChange', this);
  return this;
}, onDomReady: function() {
  this.isReady = true;
  this.updateSize();
  this.fireEvent('ready', this);
}, onReady: function() {
  if (this.getAutoRender()) 
  {
    this.render();
  }
  if (Ext.browser.name == 'ChromeiOS') 
  {
    this.setHeight('-webkit-calc(100% - ' + ((window.outerHeight - window.innerHeight) / 2) + 'px)');
  }
}, onElementFocus: function(e) {
  this.focusedElement = e.target;
}, onElementBlur: function() {
  this.focusedElement = null;
}, render: function() {
  if (!this.rendered) 
  {
    var body = Ext.getBody(), clsPrefix = Ext.baseCSSPrefix, classList = [], osEnv = Ext.os, osName = osEnv.name.toLowerCase(), browserName = Ext.browser.name.toLowerCase(), osMajorVersion = osEnv.version.getMajor(), orientation = this.getOrientation();
    this.renderTo(body);
    classList.push(clsPrefix + osEnv.deviceType.toLowerCase());
    if (osEnv.is.iPad) 
    {
      classList.push(clsPrefix + 'ipad');
    }
    classList.push(clsPrefix + osName);
    classList.push(clsPrefix + browserName);
    if (osMajorVersion) 
    {
      classList.push(clsPrefix + osName + '-' + osMajorVersion);
    }
    if (osEnv.is.BlackBerry) 
    {
      classList.push(clsPrefix + 'bb');
      if (Ext.browser.userAgent.match(/Kbd/gi)) 
      {
        classList.push(clsPrefix + 'bb-keyboard');
      }
    }
    if (Ext.browser.is.WebKit) 
    {
      classList.push(clsPrefix + 'webkit');
    }
    if (Ext.browser.is.Standalone) 
    {
      classList.push(clsPrefix + 'standalone');
    }
    if (Ext.browser.is.AndroidStock) 
    {
      classList.push(clsPrefix + 'android-stock');
    }
    if (Ext.browser.is.GoogleGlass) 
    {
      classList.push(clsPrefix + 'google-glass');
    }
    classList.push(clsPrefix + orientation);
    body.addCls(classList);
  }
}, applyAutoBlurInput: function(autoBlurInput) {
  var touchstart = (Ext.feature.has.Touch) ? 'touchstart' : 'mousedown';
  if (autoBlurInput) 
  {
    this.addWindowListener(touchstart, this.doBlurInput, false);
  } else {
    this.removeWindowListener(touchstart, this.doBlurInput, false);
  }
  return autoBlurInput;
}, applyAutoMaximize: function(autoMaximize) {
  if (Ext.browser.is.WebView) 
  {
    autoMaximize = false;
  }
  if (autoMaximize) 
  {
    this.on('ready', 'doAutoMaximizeOnReady', this, {single: true});
    this.on('orientationchange', 'doAutoMaximizeOnOrientationChange', this);
  } else {
    this.un('ready', 'doAutoMaximizeOnReady', this);
    this.un('orientationchange', 'doAutoMaximizeOnOrientationChange', this);
  }
  return autoMaximize;
}, applyPreventPanning: function(preventPanning) {
  if (preventPanning) 
  {
    this.addWindowListener('touchmove', this.doPreventPanning, false);
  } else {
    this.removeWindowListener('touchmove', this.doPreventPanning, false);
  }
  return preventPanning;
}, applyPreventZooming: function(preventZooming) {
  var touchstart = (Ext.feature.has.Touch) ? 'touchstart' : 'mousedown';
  if (preventZooming) 
  {
    this.addWindowListener(touchstart, this.doPreventZooming, false);
  } else {
    this.removeWindowListener(touchstart, this.doPreventZooming, false);
  }
  return preventZooming;
}, doAutoMaximizeOnReady: function() {
  var controller = arguments[arguments.length - 1];
  controller.pause();
  this.isMaximizing = true;
  this.on('maximize', function() {
  this.isMaximizing = false;
  this.updateSize();
  controller.resume();
  this.fireEvent('ready', this);
}, this, {single: true});
  this.maximize();
}, doAutoMaximizeOnOrientationChange: function() {
  var controller = arguments[arguments.length - 1], firingArguments = controller.firingArguments;
  controller.pause();
  this.isMaximizing = true;
  this.on('maximize', function() {
  this.isMaximizing = false;
  this.updateSize();
  firingArguments[2] = this.windowWidth;
  firingArguments[3] = this.windowHeight;
  controller.resume();
}, this, {single: true});
  this.maximize();
}, doBlurInput: function(e) {
  var target = e.target, focusedElement = this.focusedElement;
  if (focusedElement && focusedElement.nodeName.toUpperCase() != 'BODY' && !this.isInputRegex.test(target.tagName)) 
  {
    delete this.focusedElement;
    focusedElement.blur();
  }
}, doPreventPanning: function(e) {
  e.preventDefault();
}, doPreventZooming: function(e) {
  if ('button' in e && e.button !== 0) 
  {
    return;
  }
  var target = e.target;
  if (target && target.nodeType === 1 && !this.isInputRegex.test(target.tagName)) 
  {
    e.preventDefault();
  }
}, addWindowListener: function(eventName, fn, capturing) {
  window.addEventListener(eventName, fn, Boolean(capturing));
}, removeWindowListener: function(eventName, fn, capturing) {
  window.removeEventListener(eventName, fn, Boolean(capturing));
}, doAddListener: function(eventName, fn, scope, options) {
  if (eventName === 'ready' && this.isReady && !this.isMaximizing) 
  {
    fn.call(scope);
    return this;
  }
  return this.callSuper(arguments);
}, supportsOrientation: function() {
  return Ext.feature.has.Orientation;
}, onResize: function() {
  var oldWidth = this.windowWidth, oldHeight = this.windowHeight, width = this.getWindowWidth(), height = this.getWindowHeight(), currentOrientation = this.getOrientation(), newOrientation = this.determineOrientation();
  if ((oldWidth !== width && oldHeight !== height) && currentOrientation !== newOrientation) 
  {
    this.fireOrientationChangeEvent(newOrientation, currentOrientation);
  }
}, onOrientationChange: function() {
  var currentOrientation = this.getOrientation(), newOrientation = this.determineOrientation();
  if (newOrientation !== currentOrientation) 
  {
    this.fireOrientationChangeEvent(newOrientation, currentOrientation);
  }
}, fireOrientationChangeEvent: function(newOrientation, oldOrientation) {
  var clsPrefix = Ext.baseCSSPrefix;
  Ext.getBody().replaceCls(clsPrefix + oldOrientation, clsPrefix + newOrientation);
  this.orientation = newOrientation;
  this.updateSize();
  this.fireEvent('orientationchange', this, newOrientation, this.windowWidth, this.windowHeight);
}, updateSize: function(width, height) {
  this.windowWidth = width !== undefined ? width : this.getWindowWidth();
  this.windowHeight = height !== undefined ? height : this.getWindowHeight();
  return this;
}, waitUntil: function(condition, onSatisfied, onTimeout, delay, timeoutDuration) {
  if (!delay) 
  {
    delay = 50;
  }
  if (!timeoutDuration) 
  {
    timeoutDuration = 2000;
  }
  var scope = this, elapse = 0;
  setTimeout(function repeat() {
  elapse += delay;
  if (condition.call(scope) === true) 
  {
    if (onSatisfied) 
    {
      onSatisfied.call(scope);
    }
  } else {
    if (elapse >= timeoutDuration) 
    {
      if (onTimeout) 
      {
        onTimeout.call(scope);
      }
    } else {
      setTimeout(repeat, delay);
    }
  }
}, delay);
}, maximize: function() {
  this.fireMaximizeEvent();
}, fireMaximizeEvent: function() {
  this.updateSize();
  this.fireEvent('maximize', this);
}, doSetHeight: function(height) {
  Ext.getBody().setHeight(height);
  this.callParent(arguments);
}, doSetWidth: function(width) {
  Ext.getBody().setWidth(width);
  this.callParent(arguments);
}, scrollToTop: function() {
  window.scrollTo(0, -1);
}, getWindowWidth: function() {
  return window.innerWidth;
}, getWindowHeight: function() {
  return window.innerHeight;
}, getWindowOuterHeight: function() {
  return window.outerHeight;
}, getWindowOrientation: function() {
  return window.orientation;
}, getOrientation: function() {
  return this.orientation;
}, getSize: function() {
  return {width: this.windowWidth, height: this.windowHeight};
}, determineOrientation: function() {
  var portrait = this.PORTRAIT, landscape = this.LANDSCAPE;
  if (!Ext.os.is.Android && this.supportsOrientation()) 
  {
    if (this.getWindowOrientation() % 180 === 0) 
    {
      return portrait;
    }
    return landscape;
  } else {
    if (this.getWindowHeight() >= this.getWindowWidth()) 
    {
      return portrait;
    }
    return landscape;
  }
}, onItemFullscreenChange: function(item) {
  item.addCls(this.fullscreenItemCls);
  this.add(item);
}, setMenu: function(menu, config) {
  var me = this;
  config = config || {};
  if (Ext.os.is.iOS && !this.hasiOSOrientationFix) 
  {
    this.hasiOSOrientationFix = true;
    this.on('orientationchange', function() {
  window.scrollTo(0, 0);
}, this);
  }
  if (!menu) 
  {
    return;
  }
  if (!config.side) 
  {
    return;
  }
  if (['left', 'right', 'top', 'bottom'].indexOf(config.side) == -1) 
  {
    return;
  }
  var menus = me.getMenus();
  if (!menus) 
  {
    menus = {};
  }
  if (!me.addedSwipeListener) 
  {
    me.addedSwipeListener = true;
    me.element.on({tap: me.onTap, swipestart: me.onSwipeStart, edgeswipestart: me.onEdgeSwipeStart, edgeswipe: me.onEdgeSwipe, edgeswipeend: me.onEdgeSwipeEnd, scope: me});
    if (window.blackberry) 
    {
      var toggleMenu = function() {
  var menus = me.getMenus(), menu = menus['top'];
  if (!menu) 
  {
    return;
  }
  if (menu.isHidden()) 
  {
    me.showMenu('top');
  } else {
    me.hideMenu('top');
  }
};
      if (blackberry.app && blackberry.app.event && blackberry.app.event.onSwipeDown) 
      {
        blackberry.app.event.onSwipeDown(toggleMenu);
      } else if (blackberry.event && blackberry.event.addEventListener) 
      {
        blackberry.event.addEventListener("swipedown", toggleMenu);
      }
    }
  }
  menus[config.side] = menu;
  menu.$reveal = Boolean(config.reveal);
  menu.$cover = config.cover !== false && !menu.$reveal;
  menu.$side = config.side;
  me.fixMenuSize(menu, config.side);
  if (config.side == 'left') 
  {
    menu.setLeft(0);
    menu.setRight(null);
    menu.setTop(0);
    menu.setBottom(0);
  } else if (config.side == 'right') 
  {
    menu.setLeft(null);
    menu.setRight(0);
    menu.setTop(0);
    menu.setBottom(0);
  } else if (config.side == 'top') 
  {
    menu.setLeft(0);
    menu.setRight(0);
    menu.setTop(0);
    menu.setBottom(null);
  } else if (config.side == 'bottom') 
  {
    menu.setLeft(0);
    menu.setRight(0);
    menu.setTop(null);
    menu.setBottom(0);
  }
  me.setMenus(menus);
}, removeMenu: function(side) {
  var menus = this.getMenus() || {}, menu = menus[side];
  if (menu) 
  this.hideMenu(side);
  delete menus[side];
  this.setMenus(menus);
}, fixMenuSize: function(menu, side) {
  if (side == 'top' || side == 'bottom') 
  {
    menu.setWidth('100%');
  } else if (side == 'left' || side == 'right') 
  {
    menu.setHeight('100%');
  }
}, showMenu: function(side) {
  var menus = this.getMenus(), menu = menus[side], before, after, viewportBefore, viewportAfter;
  if (!menu || menu.isAnimating) 
  {
    return;
  }
  this.hideOtherMenus(side);
  before = {translateX: 0, translateY: 0};
  after = {translateX: 0, translateY: 0};
  viewportBefore = {translateX: 0, translateY: 0};
  viewportAfter = {translateX: 0, translateY: 0};
  if (menu.$reveal) 
  {
    Ext.getBody().insertFirst(menu.element);
  } else {
    Ext.Viewport.add(menu);
  }
  menu.show();
  menu.addCls('x-' + side);
  var size = (side == 'left' || side == 'right') ? menu.element.getWidth() : menu.element.getHeight();
  if (side == 'left') 
  {
    before.translateX = -size;
    viewportAfter.translateX = size;
  } else if (side == 'right') 
  {
    before.translateX = size;
    viewportAfter.translateX = -size;
  } else if (side == 'top') 
  {
    before.translateY = -size;
    viewportAfter.translateY = size;
  } else if (side == 'bottom') 
  {
    before.translateY = size;
    viewportAfter.translateY = -size;
  }
  if (menu.$reveal) 
  {
    if (Ext.browser.getPreferredTranslationMethod() != 'scrollposition') 
    {
      menu.translate(0, 0);
    }
  } else {
    menu.translate(before.translateX, before.translateY);
  }
  if (menu.$cover) 
  {
    menu.getTranslatable().on('animationend', function() {
  menu.isAnimating = false;
}, this, {single: true});
    menu.translate(after.translateX, after.translateY, {preserveEndState: true, duration: 200});
  } else {
    this.translate(viewportBefore.translateX, viewportBefore.translateY);
    this.getTranslatable().on('animationend', function() {
  menu.isAnimating = false;
}, this, {single: true});
    this.translate(viewportAfter.translateX, viewportAfter.translateY, {preserveEndState: true, duration: 200});
  }
  menu.isAnimating = true;
}, hideMenu: function(side, animate) {
  var menus = this.getMenus(), menu = menus[side], after, viewportAfter, size;
  animate = (animate === false) ? false : true;
  if (!menu || (menu.isHidden() || menu.isAnimating)) 
  {
    return;
  }
  after = {translateX: 0, translateY: 0};
  viewportAfter = {translateX: 0, translateY: 0};
  size = (side == 'left' || side == 'right') ? menu.element.getWidth() : menu.element.getHeight();
  if (side == 'left') 
  {
    after.translateX = -size;
  } else if (side == 'right') 
  {
    after.translateX = size;
  } else if (side == 'top') 
  {
    after.translateY = -size;
  } else if (side == 'bottom') 
  {
    after.translateY = size;
  }
  if (menu.$cover) 
  {
    if (animate) 
    {
      menu.getTranslatable().on('animationend', function() {
  menu.isAnimating = false;
  menu.hide();
}, this, {single: true});
      menu.translate(after.translateX, after.translateY, {preserveEndState: true, duration: 200});
    } else {
      menu.translate(after.translateX, after.translateY);
      menu.hide();
    }
  } else {
    if (animate) 
    {
      this.getTranslatable().on('animationend', function() {
  menu.isAnimating = false;
  menu.hide();
}, this, {single: true});
      this.translate(viewportAfter.translateX, viewportAfter.translateY, {preserveEndState: true, duration: 200});
    } else {
      this.translate(viewportAfter.translateX, viewportAfter.translateY);
      menu.hide();
    }
  }
}, hideAllMenus: function(animation) {
  var menus = this.getMenus();
  for (var side in menus) 
    {
      this.hideMenu(side, animation);
    }
}, hideOtherMenus: function(side, animation) {
  var menus = this.getMenus();
  for (var menu in menus) 
    {
      if (side != menu) 
      {
        this.hideMenu(menu, animation);
      }
    }
}, toggleMenu: function(side) {
  var menus = this.getMenus(), menu;
  if (menus[side]) 
  {
    menu = menus[side];
    if (menu.isHidden()) 
    {
      this.showMenu(side);
    } else {
      this.hideMenu(side);
    }
  }
}, sideForDirection: function(direction) {
  if (direction == 'left') 
  {
    return 'right';
  } else if (direction == 'right') 
  {
    return 'left';
  } else if (direction == 'up') 
  {
    return 'bottom';
  } else if (direction == 'down') 
  {
    return 'top';
  }
}, sideForSwipeDirection: function(direction) {
  if (direction == "up") 
  {
    return "top";
  } else if (direction == "down") 
  {
    return "bottom";
  }
  return direction;
}, onTap: function(e) {
}, onSwipeStart: function(e) {
  var side = this.sideForSwipeDirection(e.direction);
  this.hideMenu(side);
}, onEdgeSwipeStart: function(e) {
  var side = this.sideForDirection(e.direction), menus = this.getMenus(), menu = menus[side], menuSide, checkMenu;
  if (!menu || !menu.isHidden()) 
  {
    return;
  }
  for (menuSide in menus) 
    {
      checkMenu = menus[menuSide];
      if (checkMenu.isHidden() !== false) 
      {
        return;
      }
    }
  this.$swiping = true;
  this.hideAllMenus(false);
  if (menu.$reveal) 
  {
    Ext.getBody().insertFirst(menu.element);
  } else {
    Ext.Viewport.add(menu);
  }
  menu.show();
  var size = (side == 'left' || side == 'right') ? menu.element.getWidth() : menu.element.getHeight(), after, viewportAfter;
  after = {translateX: 0, translateY: 0};
  viewportAfter = {translateX: 0, translateY: 0};
  if (side == 'left') 
  {
    after.translateX = -size;
  } else if (side == 'right') 
  {
    after.translateX = size;
  } else if (side == 'top') 
  {
    after.translateY = -size;
  } else if (side == 'bottom') 
  {
    after.translateY = size;
  }
  var transformStyleName = 'webkitTransform' in document.createElement('div').style ? 'webkitTransform' : 'transform', setTransform = menu.element.dom.style[transformStyleName];
  if (setTransform) 
  {
    menu.element.dom.style[transformStyleName] = '';
  }
  if (menu.$reveal) 
  {
    if (Ext.browser.getPreferredTranslationMethod() != 'scrollposition') 
    {
      menu.translate(0, 0);
    }
  } else {
    menu.translate(after.translateX, after.translateY);
  }
  if (!menu.$cover) 
  {
    if (setTransform) 
    {
      this.innerElement.dom.style[transformStyleName] = '';
    }
    this.translate(viewportAfter.translateX, viewportAfter.translateY);
  }
}, onEdgeSwipe: function(e) {
  var side = this.sideForDirection(e.direction), menu = this.getMenus()[side];
  if (!menu || !this.$swiping) 
  {
    return;
  }
  var size = (side == 'left' || side == 'right') ? menu.element.getWidth() : menu.element.getHeight(), after, viewportAfter, movement = Math.min(e.distance - size, 0), viewportMovement = Math.min(e.distance, size);
  after = {translateX: 0, translateY: 0};
  viewportAfter = {translateX: 0, translateY: 0};
  if (side == 'left') 
  {
    after.translateX = movement;
    viewportAfter.translateX = viewportMovement;
  } else if (side == 'right') 
  {
    after.translateX = -movement;
    viewportAfter.translateX = -viewportMovement;
  } else if (side == 'top') 
  {
    after.translateY = movement;
    viewportAfter.translateY = viewportMovement;
  } else if (side == 'bottom') 
  {
    after.translateY = -movement;
    viewportAfter.translateY = -viewportMovement;
  }
  if (menu.$cover) 
  {
    menu.translate(after.translateX, after.translateY);
  } else {
    this.translate(viewportAfter.translateX, viewportAfter.translateY);
  }
}, onEdgeSwipeEnd: function(e) {
  var side = this.sideForDirection(e.direction), menu = this.getMenus()[side], shouldRevert = false;
  if (!menu) 
  {
    return;
  }
  var size = (side == 'left' || side == 'right') ? menu.element.getWidth() : menu.element.getHeight(), velocity = (e.flick) ? e.flick.velocity : 0;
  if (side == 'right') 
  {
    if (velocity.x > 0) 
    {
      shouldRevert = true;
    }
  } else if (side == 'left') 
  {
    if (velocity.x < 0) 
    {
      shouldRevert = true;
    }
  } else if (side == 'top') 
  {
    if (velocity.y < 0) 
    {
      shouldRevert = true;
    }
  } else if (side == 'bottom') 
  {
    if (velocity.y > 0) 
    {
      shouldRevert = true;
    }
  }
  var movement = (shouldRevert) ? size : 0, viewportMovement = (shouldRevert) ? 0 : -size, after, viewportAfter;
  after = {translateX: 0, translateY: 0};
  viewportAfter = {translateX: 0, translateY: 0};
  if (side == 'left') 
  {
    after.translateX = -movement;
    viewportAfter.translateX = -viewportMovement;
  } else if (side == 'right') 
  {
    after.translateX = movement;
    viewportAfter.translateX = viewportMovement;
  } else if (side == 'top') 
  {
    after.translateY = -movement;
    viewportAfter.translateY = -viewportMovement;
  } else if (side == 'bottom') 
  {
    after.translateY = movement;
    viewportAfter.translateY = viewportMovement;
  }
  if (menu.$cover) 
  {
    menu.getTranslatable().on('animationend', function() {
  if (shouldRevert) 
  {
    menu.hide();
  }
}, this, {single: true});
    menu.translate(after.translateX, after.translateY, {preserveEndState: true, duration: 200});
  } else {
    this.getTranslatable().on('animationend', function() {
  if (shouldRevert) 
  {
    menu.hide();
  }
}, this, {single: true});
    this.translate(viewportAfter.translateX, viewportAfter.translateY, {preserveEndState: true, duration: 200});
  }
  this.$swiping = false;
}});

Ext.define('Ext.viewport.Android', {extend: 'Ext.viewport.Default', config: {translatable: {translationMethod: 'csstransform'}}, constructor: function() {
  this.on('orientationchange', 'hideKeyboardIfNeeded', this, {prepend: true});
  this.callSuper(arguments);
  var me = this;
  Ext.onReady(function() {
  Ext.getBody().on('resize', me.onResize, me);
});
}, getWindowWidth: function() {
  return this.element.getWidth();
}, getWindowHeight: function() {
  return this.element.getHeight();
}, getDummyInput: function() {
  var input = this.dummyInput, focusedElement = this.focusedElement, box = Ext.fly(focusedElement).getPageBox();
  if (!input) 
  {
    this.dummyInput = input = document.createElement('input');
    input.style.position = 'absolute';
    input.style.opacity = '0';
    input.style.pointerEvents = 'none';
    document.body.appendChild(input);
  }
  input.style.left = box.left + 'px';
  input.style.top = box.top + 'px';
  input.style.display = '';
  return input;
}, doBlurInput: function(e) {
  var target = e.target, focusedElement = this.focusedElement, dummy;
  if (focusedElement && !this.isInputRegex.test(target.tagName)) 
  {
    dummy = this.getDummyInput();
    delete this.focusedElement;
    dummy.focus();
    setTimeout(function() {
  dummy.style.display = 'none';
}, 100);
  }
}, hideKeyboardIfNeeded: function() {
  var eventController = arguments[arguments.length - 1], focusedElement = this.focusedElement;
  if (focusedElement) 
  {
    delete this.focusedElement;
    eventController.pause();
    if (Ext.os.version.lt('4')) 
    {
      focusedElement.style.display = 'none';
    } else {
      focusedElement.blur();
    }
    setTimeout(function() {
  focusedElement.style.display = '';
  eventController.resume();
}, 1000);
  }
}, doFireOrientationChangeEvent: function() {
  var eventController = arguments[arguments.length - 1];
  this.orientationChanging = true;
  eventController.pause();
  this.waitUntil(function() {
  return this.getWindowOuterHeight() !== this.windowOuterHeight;
}, function() {
  this.windowOuterHeight = this.getWindowOuterHeight();
  this.updateSize();
  eventController.firingArguments[2] = this.windowWidth;
  eventController.firingArguments[3] = this.windowHeight;
  eventController.resume();
  this.orientationChanging = false;
}, function() {
});
  return this;
}, determineOrientation: function() {
  return (this.getWindowHeight() >= this.getWindowWidth()) ? this.PORTRAIT : this.LANDSCAPE;
}, getActualWindowOuterHeight: function() {
  return Math.round(this.getWindowOuterHeight() / window.devicePixelRatio);
}, maximize: function() {
  var stretchHeights = this.stretchHeights, orientation = this.orientation, height;
  height = stretchHeights[orientation];
  if (!height) 
  {
    stretchHeights[orientation] = height = this.getActualWindowOuterHeight();
  }
  if (!this.addressBarHeight) 
  {
    this.addressBarHeight = height - this.getWindowHeight();
  }
  this.setHeight(height);
  var isHeightMaximized = Ext.Function.bind(this.isHeightMaximized, this, [height]);
  this.scrollToTop();
  this.waitUntil(isHeightMaximized, this.fireMaximizeEvent, this.fireMaximizeEvent);
}, isHeightMaximized: function(height) {
  this.scrollToTop();
  return this.getWindowHeight() === height;
}, supportsOrientation: function() {
  return false;
}, onResize: function() {
  this.waitUntil(function() {
  var oldWidth = this.windowWidth, oldHeight = this.windowHeight, width = this.getWindowWidth(), height = this.getWindowHeight(), currentOrientation = this.getOrientation(), newOrientation = this.determineOrientation();
  return ((oldWidth !== width && oldHeight !== height) && currentOrientation !== newOrientation);
}, function() {
  var currentOrientation = this.getOrientation(), newOrientation = this.determineOrientation();
  this.fireOrientationChangeEvent(newOrientation, currentOrientation);
}, Ext.emptyFn, 250);
}, doPreventZooming: function(e) {
  if ('button' in e && e.button !== 0) 
  {
    return;
  }
  var target = e.target;
  if (target && target.nodeType === 1 && !this.isInputRegex.test(target.tagName) && !this.focusedElement) 
  {
    e.preventDefault();
  }
}}, function() {
  if (!Ext.os.is.Android) 
  {
    return;
  }
  var version = Ext.os.version, userAgent = Ext.browser.userAgent, isBuggy = /(htc|desire|incredible|ADR6300)/i.test(userAgent) && version.lt('2.3');
  if (isBuggy) 
  {
    this.override({constructor: function(config) {
  if (!config) 
  {
    config = {};
  }
  config.autoMaximize = false;
  this.watchDogTick = Ext.Function.bind(this.watchDogTick, this);
  setInterval(this.watchDogTick, 1000);
  return this.callParent([config]);
}, watchDogTick: function() {
  this.watchDogLastTick = Ext.Date.now();
}, doPreventPanning: function() {
  var now = Ext.Date.now(), lastTick = this.watchDogLastTick, deltaTime = now - lastTick;
  if (deltaTime >= 2000) 
  {
    return;
  }
  return this.callParent(arguments);
}, doPreventZooming: function() {
  var now = Ext.Date.now(), lastTick = this.watchDogLastTick, deltaTime = now - lastTick;
  if (deltaTime >= 2000) 
  {
    return;
  }
  return this.callParent(arguments);
}});
  }
  if (version.match('2')) 
  {
    this.override({onReady: function() {
  this.addWindowListener('resize', Ext.Function.bind(this.onWindowResize, this));
  this.callParent(arguments);
}, scrollToTop: function() {
  document.body.scrollTop = 100;
}, onWindowResize: function() {
  var oldWidth = this.windowWidth, oldHeight = this.windowHeight, width = this.getWindowWidth(), height = this.getWindowHeight();
  if (this.getAutoMaximize() && !this.isMaximizing && !this.orientationChanging && window.scrollY === 0 && oldWidth === width && height < oldHeight && ((height >= oldHeight - this.addressBarHeight) || !this.focusedElement)) 
  {
    this.scrollToTop();
  }
}});
  } else if (version.gtEq('3.1')) 
  {
    this.override({isHeightMaximized: function(height) {
  this.scrollToTop();
  return this.getWindowHeight() === height - 1;
}});
  } else if (version.match('3')) 
  {
    this.override({isHeightMaximized: function() {
  this.scrollToTop();
  return true;
}});
  }
  if (version.gtEq('4')) 
  {
    this.override({doBlurInput: Ext.emptyFn});
  }
});

Ext.define('Ext.viewport.Ios', {extend: 'Ext.viewport.Default', isFullscreen: function() {
  return this.isHomeScreen();
}, isHomeScreen: function() {
  return window.navigator.standalone === true;
}, constructor: function() {
  this.callParent(arguments);
  if (this.getAutoMaximize() && !this.isFullscreen()) 
  {
    this.addWindowListener('touchstart', Ext.Function.bind(this.onTouchStart, this));
  }
}, maximize: function() {
  if (this.isFullscreen()) 
  {
    return this.callParent();
  }
  var stretchHeights = this.stretchHeights, orientation = this.orientation, currentHeight = this.getWindowHeight(), height = stretchHeights[orientation];
  if (window.scrollY > 0) 
  {
    this.scrollToTop();
    if (!height) 
    {
      stretchHeights[orientation] = height = this.getWindowHeight();
    }
    this.setHeight(height);
    this.fireMaximizeEvent();
  } else {
    if (!height) 
    {
      height = this.getScreenHeight();
    }
    this.setHeight(height);
    this.waitUntil(function() {
  this.scrollToTop();
  return currentHeight !== this.getWindowHeight();
}, function() {
  if (!stretchHeights[orientation]) 
  {
    height = stretchHeights[orientation] = this.getWindowHeight();
    this.setHeight(height);
  }
  this.fireMaximizeEvent();
}, function() {
  height = stretchHeights[orientation] = this.getWindowHeight();
  this.setHeight(height);
  this.fireMaximizeEvent();
}, 50, 1000);
  }
}, getScreenHeight: function() {
  return window.screen[this.orientation === this.PORTRAIT ? 'height' : 'width'];
}, onElementFocus: function() {
  if (this.getAutoMaximize() && !this.isFullscreen()) 
  {
    clearTimeout(this.scrollToTopTimer);
  }
  this.callParent(arguments);
}, onElementBlur: function() {
  if (this.getAutoMaximize() && !this.isFullscreen()) 
  {
    this.scrollToTopTimer = setTimeout(this.scrollToTop, 500);
  }
  this.callParent(arguments);
}, onTouchStart: function() {
  if (this.focusedElement === null) 
  {
    this.scrollToTop();
  }
}, scrollToTop: function() {
  window.scrollTo(0, 0);
}}, function() {
  if (!Ext.os.is.iOS) 
  {
    return;
  }
  if (Ext.os.version.lt('3.2')) 
  {
    this.override({constructor: function() {
  var stretchHeights = this.stretchHeights = {};
  stretchHeights[this.PORTRAIT] = 416;
  stretchHeights[this.LANDSCAPE] = 268;
  return this.callOverridden(arguments);
}});
  }
  if (Ext.os.version.lt('5')) 
  {
    this.override({fieldMaskClsTest: '-field-mask', doPreventZooming: function(e) {
  var target = e.target;
  if (target && target.nodeType === 1 && !this.isInputRegex.test(target.tagName) && target.className.indexOf(this.fieldMaskClsTest) == -1) 
  {
    e.preventDefault();
  }
}});
  }
  if (Ext.os.is.iPad) 
  {
    this.override({isFullscreen: function() {
  return true;
}});
  }
  if (Ext.os.version.gtEq('7')) 
  {
    if (Ext.os.deviceType === 'Tablet' || !Ext.browser.is.Safari || window.navigator.standalone) 
    {
      this.override({constructor: function() {
  var stretchHeights = {}, stretchWidths = {}, orientation = this.determineOrientation(), screenHeight = window.screen.height, screenWidth = window.screen.width, menuHeight = orientation === this.PORTRAIT ? screenHeight - window.innerHeight : screenWidth - window.innerHeight;
  stretchHeights[this.PORTRAIT] = screenHeight - menuHeight;
  stretchHeights[this.LANDSCAPE] = screenWidth - menuHeight;
  stretchWidths[this.PORTRAIT] = screenWidth;
  stretchWidths[this.LANDSCAPE] = screenHeight;
  this.stretchHeights = stretchHeights;
  this.stretchWidths = stretchWidths;
  this.callOverridden(arguments);
  this.on('ready', this.setViewportSizeToAbsolute, this);
  this.on('orientationchange', this.setViewportSizeToAbsolute, this);
}, getWindowHeight: function() {
  return this.stretchHeights[this.orientation];
}, getWindowWidth: function() {
  return this.stretchWidths[this.orientation];
}, setViewportSizeToAbsolute: function() {
  this.setWidth(this.getWindowWidth());
  this.setHeight(this.getWindowHeight());
}});
    }
    if (Ext.os.deviceType === 'Tablet') 
    {
      this.override({constructor: function() {
  this.callOverridden(arguments);
  window.addEventListener('scroll', function() {
  if (window.scrollX !== 0) 
  {
    window.scrollTo(0, window.scrollY);
  }
}, false);
}, setViewportSizeToAbsolute: function() {
  window.scrollTo(0, 0);
  this.callOverridden(arguments);
}, onElementBlur: function() {
  this.callOverridden(arguments);
  if (window.scrollY !== 0) 
  {
    window.scrollTo(0, 0);
  }
}});
    }
  }
});

Ext.define('Ext.viewport.WindowsPhone', {alternateClassName: 'Ext.viewport.WP', extend: 'Ext.viewport.Default', config: {translatable: {translationMethod: 'csstransform'}}, initialize: function() {
  var preventSelection = function(e) {
  var srcElement = e.srcElement.nodeName.toUpperCase(), selectableElements = ['INPUT', 'TEXTAREA'];
  if (selectableElements.indexOf(srcElement) == -1) 
  {
    return false;
  }
};
  document.body.addEventListener('onselectstart', preventSelection);
  this.callParent(arguments);
}, supportsOrientation: function() {
  return false;
}, onResize: function() {
  this.waitUntil(function() {
  var oldWidth = this.windowWidth, oldHeight = this.windowHeight, width = this.getWindowWidth(), height = this.getWindowHeight(), currentOrientation = this.getOrientation(), newOrientation = this.determineOrientation();
  return ((oldWidth !== width && oldHeight !== height) && currentOrientation !== newOrientation);
}, function() {
  var currentOrientation = this.getOrientation(), newOrientation = this.determineOrientation();
  this.fireOrientationChangeEvent(newOrientation, currentOrientation);
}, Ext.emptyFn, 250);
}});

Ext.define('Ext.viewport.Viewport', {constructor: function(config) {
  var osName = Ext.os.name, viewportName, viewport;
  switch (osName) {
    case 'Android':
      viewportName = (Ext.browser.name == 'ChromeMobile') ? 'Default' : 'Android';
      break;
    case 'iOS':
      viewportName = 'Ios';
      break;
    case 'Windows':
      viewportName = (Ext.browser.name == 'IE') ? 'WindowsPhone' : 'Default';
      break;
    case 'WindowsPhone':
      viewportName = 'WindowsPhone';
      break;
    default:
      viewportName = 'Default';
      break;
  }
  viewport = Ext.create('Ext.viewport.' + viewportName, config);
  return viewport;
}});

Ext.define('ASLKids.model.Gebaar', {extend: 'Ext.data.Model', config: {idProperty: 'Id', useCache: false, fields: [{name: 'Id', type: 'int'}, 'plaatje']}});

Ext.define('ASLKids.store.Gebaar', {extend: 'Ext.data.Store', config: {model: 'ASLKids.model.Gebaar', autoLoad: true, sorters: 'plaatje', storeId: 'gebaarStore', method: 'GET', proxy: {type: 'ajax', url: 'resources/images/Gebaren.json', reader: {type: 'json', rootProperty: 'Gebaartje'}}}});

Ext.define('ASLKids.view.Home', {extend: 'Ext.Container', xtype: 'homepanel', fullscreen: true, config: {iconCls: 'home', cls: 'homescreen', scrollable: false, listeners: [{element: 'element', event: 'tap', fn: function() {
  Ext.Viewport.toggleMenu('left');
}}], items: [{xtype: 'audio', src: 'resources/audio/home-sample.mp3', enableControls: true, autoplay: true}, {html: 'Menu<br />&#x25BC;', cls: 'menu-hint'}]}});

Ext.define('ASLKids.view.Gebarenlijst', {extend: 'Ext.List', xtype: 'gebarenlijst', config: {cls: 'gebarenlijst', title: 'Dieren', scrollable: true, store: 'gebaarStore', itemTpl: '<img src="resources/images/objects/thumbnails/{plaatje}.png" class="objectimages">{plaatje}'}});

Ext.define('ASLKids.view.Video', {extend: 'Ext.Video', xtype: 'video'});

Ext.define('ASLKids.view.GebarenDetail', {extend: 'Ext.Container', xtype: 'gebarendetail', config: {cls: 'gebarendetail', listeners: {initialize: function(c) {
  var me = this;
  me.element.on({swipe: function(e, node, options) {
  if (e.direction == "left") 
  {
    me.fireEvent('swipeleft', me);
  }
}});
}}, layout: {type: 'vbox'}, items: [{xtype: 'image', name: 'listDetailImage', flex: 1, cls: 'listdetailimage'}, {xtype: 'button', itemId: 'nextButton', cls: 'nextButton'}, {xtype: 'button', itemId: 'backButton', cls: 'backButton'}, {xtype: 'button', itemId: 'listDetailButton', cls: 'audioButton', handler: function() {
  var container = this.getParent(), audio = container.down('audio');
  audio.play();
}}, {xtype: 'audio', name: 'listDetailAudio', hidden: true}, {xtype: 'video', flex: 1, name: 'listDetailVideo', itemId: 'videoView', posterUrl: 'resources/images/playbutton.svg', enableControls: false, listeners: {painted: function() {
  this.media.dom.load();
  this.media.dom.setAttribute('webkit-playsinline', 'true');
}, tap: {fn: function() {
  var me = this;
  me.media.dom.addEventListener("playing", function() {
  me.play();
}, true);
  if (me.isPlaying()) 
  {
    me.pause();
  } else {
    me.play();
  }
}, element: 'element'}}}]}});

Ext.define('ASLKids.view.NavList', {extend: 'Ext.Container', xtype: 'navlist', config: {layout: 'card', iconCls: 'search', items: [{xtype: 'gebarenlijst'}, {xtype: 'gebarendetail'}]}});

Ext.define('ASLKids.view.Quiz', {extend: 'Ext.Container', xtype: 'quizpanel', fullscreen: true, config: {iconCls: 'home', cls: 'quizbackground', layout: 'card', items: [{xtype: 'toolbar', docked: 'top', itemId: 'quizTitle', cls: 'quizTitle'}, {itemId: 'questionView', layout: 'vbox', items: [{flex: 1, xtype: 'dataview', scrollable: false, itemTpl: '<div class="quiz-options"><img src="resources/images/objects/thumbnails/{plaatje}.png" width="100%">{plaatje}</div>'}]}, {itemId: 'resultsView', items: [{itemId: 'resultsText'}, {xtype: 'button', cls: 'again', itemId: 'repeatButton', text: 'do it again'}]}]}});

Ext.define('ASLKids.view.Extra', {extend: 'Ext.Container', xtype: 'extrapanel', config: {iconCls: 'info', styleHtmlContent: true, cls: 'infoscreen', scrollable: true, items: [{html: '<p style="margin: 20px auto !important;"><img src="resources/images/home-logo-kleiner.svg" height="200"><h3>Learn American Sign Language (ASL) in a fun way</h3>This app contains over 50 signs (more to come) that are easy to learn for young children. The signs are demonstrated by (relatives of) children who are hard of hearing. The app is kid-proof and was designed to be used without the help of an adult. There are no external links or ads so no internet connection is needed. No complex text, but clear and tappable images.  <br /><br />Why this app? When my son was identified with hearing loss, our whole family was eager to learn sign language. We discovered that our kids benefited from interactive visual material. However, it was hard to find suitable apps on signing specifically designed for kids. So I decided to design one myself. I developed an app that is appealing, instructive and most of all FUN! How do children learn best? By watching other kids! My son loves it. I hope you will too.<br /><br /><strong>Support</strong><br />We are dedicated to creating and expanding a quality app that unlocks your child\u2019s learning potential in a fun way.<br /><br />Tips for improvement? Go to asl-kids.com and let us know.</p>'}]}});

Ext.define('ASLKids.view.Viewport', {extend: 'Ext.TabPanel', xtype: 'main-view', config: {tabBar: {hidden: true}, layout: {animation: {type: 'slide', duration: 100}}, items: [{xtype: 'homepanel'}, {xtype: 'navlist'}, {xtype: 'quizpanel'}, {xtype: 'extrapanel'}, {xtype: 'tabbar', docked: 'bottom', items: [{iconCls: 'menu', handler: function() {
  Ext.Viewport.toggleMenu('left');
}}]}], listeners: {swipe: {element: 'element', fn: function(event, node, options, eOpts) {
  if (event.direction == 'right') 
  {
    Ext.Viewport.showMenu('left');
  } else {
    Ext.Viewport.hideMenu('left');
  }
}}}}, doTabChange: function(tabBar, newTab) {
  var index = tabBar.indexOf(newTab);
  if (index > 0) 
  {
    this.callSuper(arguments);
  }
}});

Ext.define('ASLKids.controller.Main', {extend: 'Ext.app.Controller', fullscreen: false, config: {models: ['Gebaar'], stores: ['Gebaar'], views: ['Home', 'NavList', 'Extra'], refs: {'videoView': 'gebarendetail #videoView', main: 'navlist', listView: 'gebarenlijst', listDetailAudio: 'gebarendetail audio[name="listDetailAudio"]', listDetailButton: '#listDetailButton', listDetailVideo: 'gebarendetail video[name="listDetailVideo"]', listDetailImage: 'gebarendetail image[name="listDetailImage"]', detail: 'gebarendetail'}, control: {'#nav-menu list': {select: 'onNavMenuSelect'}, 'gebarendetail': {swipeleft: 'onNextTap'}, 'gebarendetail #backButton': {tap: 'onBackTap'}, 'gebarendetail #nextButton': {tap: 'onNextTap'}, 'gebarenlijst': {itemtap: 'showDetail'}, 'videoView': {ended: 'onVideoEnded'}}}, onVideoEnded: function(video) {
  video.media.setTop(-2000);
  video.ghost.show();
}, onNavMenuSelect: function(view, record) {
  var itemIndex = record.get('itemIndex');
  Ext.Viewport.child('tabpanel').setActiveItem(parseInt(itemIndex));
  Ext.Viewport.toggleMenu('left');
}, onBackTap: function() {
  this.getMain().setActiveItem(0);
}, onNextTap: function() {
  var me = this, store = Ext.getStore('gebaarStore'), index = store.indexOf(me.currentDetailRecord);
  index++;
  if (index === store.getCount()) 
  {
    index = 0;
  }
  var record = store.getAt(index), detail = me.getDetail(), video = detail.down('video');
  video.media.hide();
  video.pause();
  video.setUrl(null);
  setTimeout(function() {
  me.showDetail(null, null, null, record);
  video.media.dom.load();
  video.media.hide();
  video.ghost.show();
}, 150);
}, showDetail: function(view, index, target, record) {
  var me = this, detail = this.getDetail();
  me.getListDetailImage().setSrc("resources/images/objects/" + record.data.plaatje + ".png");
  me.getListDetailVideo().setUrl("resources/video/" + record.data.plaatje + ".mp4");
  me.getListDetailAudio().setUrl("resources/audio/" + record.data.plaatje + ".m4a");
  me.getListDetailButton().setText(record.data.plaatje);
  me.currentDetailRecord = record;
  me.getMain().setActiveItem(detail);
  setTimeout(function() {
  me.getListView().deselectAll();
}, 150);
}});

Ext.define('ASLKids.controller.Quiz', {extend: 'Ext.app.Controller', fullscreen: false, config: {views: ['Quiz'], refs: {'questionView': 'quizpanel #questionView', 'answersView': 'quizpanel dataview', 'videoView': 'quizpanel #questionVideo', 'resultsView': 'quizpanel #resultsView', 'resultsText': 'quizpanel #resultsText', 'quizTitle': 'quizpanel #quizTitle'}, control: {'quizpanel': {'activate': 'setup'}, 'answersView': {'select': 'onAnswerSelection'}, 'quizpanel #repeatButton': {'tap': 'setup'}, 'videoView': {ended: 'onVideoEnded'}}, showAnswerResultAlert: true, questionCount: 5, currentQuestionIndex: 0, existingQuestionIndexes: [], results: {correct: [], incorrect: []}, finished: false}, setup: function() {
  this.setResults({correct: [], incorrect: []});
  this.setCurrentQuestionIndex(0);
  this.setExistingQuestionIndexes([]);
  this.setFinished(false);
  this.generateQuestions();
  var questionView = this.getQuestionView();
  questionView.getParent().setActiveItem(questionView);
  this.updateQuizTitle();
}, updateQuizTitle: function() {
  var index = this.getCurrentQuestionIndex(), max = this.getQuestionCount(), title = 'Which sign is this?', tmp = '<span class="count">{index} / {max}</span>';
  if (index >= max) 
  {
    this.getQuizTitle().setHtml(title);
  } else {
    tmp = tmp.replace('{index}', index + 1);
    tmp = tmp.replace('{max}', max);
    this.getQuizTitle().setHtml(title + tmp);
  }
}, next: function() {
  if (this.getFinished()) 
  {
    return;
  }
  var index = this.getCurrentQuestionIndex(), max = this.getQuestionCount();
  index++;
  if (index >= max) 
  {
    this.finish();
  } else {
    this.generateQuestions();
  }
  this.setCurrentQuestionIndex(index);
  this.updateQuizTitle();
}, finish: function() {
  this.setFinished(true);
  var resultsView = this.getResultsView(), results = this.getResults(), html = "";
  resultsView.getParent().setActiveItem(resultsView);
  html += "<div class='resulttekst'> Good job !<br /><img src='resources/images/correct.png'><br />";
  var correct = results.correct;
  if (correct.length == 0) 
  {
    html += "no answers";
  } else if (correct.length == 1) 
  {
    html += correct.length + " answer";
  } else {
    html += correct.length + " answers";
  }
  html += " correct";
  html += " and<br /> ";
  var incorrect = results.incorrect;
  if (incorrect.length == 0) 
  {
    html += "none";
  } else {
    html += incorrect.length;
  }
  html += " incorrect</div>";
  this.getResultsText().setHtml(html);
}, generateQuestions: function() {
  var questions = [], answerCount = 3, existingQuestionIndexes = this.getExistingQuestionIndexes(), store = Ext.getStore('gebaarStore'), storeCount = store.getCount(), answerIndexes = this.getRandomIndexes(0, storeCount - 1, answerCount, existingQuestionIndexes), correctIndex = this.getRandomIndexes(0, answerCount - 1, 1)[0], answersStore, i;
  answersStore = Ext.create('Ext.data.Store', {model: 'ASLKids.model.Gebaar'});
  for (i = 0; i < answerCount; i++) 
    {
      answersStore.add(store.getAt(answerIndexes[i]));
    }
  answersStore._correctIndex = correctIndex;
  this.getAnswersView().setStore(answersStore);
  var correctAnswer = answersStore.getAt(correctIndex);
  this.createVideoComponent();
  this.getVideoView().setUrl("resources/video/" + correctAnswer.get('plaatje') + ".mp4");
  existingQuestionIndexes.push(answerIndexes[correctIndex]);
}, getRandomIndexes: function(min, max, number, ignored) {
  var indexes = [];
  while (indexes.length < number) 
    {
      var random = Math.floor(Math.random() * (max - min + 1)) + min;
      if (ignored && ignored.length > 0) 
      {
        if (ignored.indexOf(random) != -1) 
        {
          continue;
        }
      }
      if (indexes.indexOf(random) == -1) 
      {
        indexes.push(random);
      }
    }
  return indexes;
}, onAnswerSelection: function(view, record) {
  var store = view.getStore(), results = this.getResults(), correct;
  correct = store.indexOf(record) == store._correctIndex;
  results[correct ? "correct" : "incorrect"].push(record);
  this.setResults(results);
  view.deselectAll();
  if (this.getShowAnswerResultAlert()) 
  {
    var message = correct ? "<img src='resources/images/correct.png'><br /><br />Correct!" : "<img src='resources/images/wrong.png'>";
    if (!correct) 
    {
      var correctAnswer = store.getAt(store._correctIndex);
      message += "<br />";
      message += "<br />The correct answer was: <br /><br /><img src='resources/images/objects/thumbnails/" + correctAnswer.get('plaatje') + ".png'>";
    }
    Ext.Msg.alert('', message, function() {
  this.next();
}, this);
  } else {
    this.next();
  }
}, createVideoComponent: function() {
  if (this.getVideoView()) 
  {
    this.getVideoView().destroy();
  }
  this.getAnswersView().getParent().insert(0, {xtype: 'video', itemId: 'questionVideo', posterUrl: 'resources/images/playbutton.svg', flex: 1, enableControls: false, listeners: {painted: function() {
  this.media.dom.load();
  this.media.dom.setAttribute('webkit-playsinline', 'true');
}, tap: {fn: function() {
  var me = this;
  me.media.dom.addEventListener("playing", function() {
  me.play();
}, true);
  if (me.isPlaying()) 
  {
    me.pause();
  } else {
    me.play();
  }
}, element: 'element'}}});
}, onVideoEnded: function(video) {
  video.media.setTop(-2000);
  video.ghost.show();
}});

Ext.application({name: 'ASLKids', requires: ['Ext.MessageBox', 'ASLKids.store.Gebaar', 'ASLKids.view.Viewport', 'Ext.Img', 'Ext.Video', 'Ext.Audio', 'Ext.Button', 'Ext.Menu', 'Ext.data.proxy.JsonP'], controllers: ['Main', 'Quiz'], eventPublishers: {touchGesture: {recognizers: {doubleTap: null, longPress: null, pinch: null, rotate: null}}}, launch: function() {
  Ext.Viewport.add({xtype: 'main-view'});
  var sideMenu = Ext.create('Ext.Menu', {layout: 'fit', width: 150, id: 'nav-menu', items: [{xtype: 'list', itemTpl: '{title}', scrollable: false, data: [{title: '<div class="menu-icon-big">&#xe604;</div>Home', itemIndex: 0}, {title: '<div class="menu-icon-big">&#xe603;</div>Signs', itemIndex: 1}, {title: '<div class="menu-icon-big">&#xe602;</div>Play', itemIndex: 2}, {title: '<div class="menu-icon-big">&#xe600;</div>Info', itemIndex: 3}]}]});
  Ext.Viewport.setMenu(sideMenu, {side: 'left', reveal: true});
}});

// @tag full-page
// @require /Volumes/BASDATA/appjes/asl/app.js

