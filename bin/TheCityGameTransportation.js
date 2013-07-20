(function () { "use strict";
var $hxClasses = {};
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var Main = function() { }
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.main = function() {
	net.lazystudios.thecitygame.core.TheCityGame.init();
}
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = true;
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
var haxe = {}
haxe.Http = function(url) {
	this.url = url;
	this.headers = new haxe.ds.StringMap();
	this.params = new haxe.ds.StringMap();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe.Http;
haxe.Http.__name__ = true;
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw e;
	};
	h.request(false);
	return r;
}
haxe.Http.prototype = {
	onStatus: function(status) {
	}
	,onError: function(msg) {
	}
	,onData: function(data) {
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(me.responseData = r.responseText); else if(s == null) me.onError("Failed to connect or resolve host"); else switch(s) {
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.keys();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(this.params.get(p));
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.keys();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h,this.headers.get(h));
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,setParameter: function(param,value) {
		this.params.set(param,value);
		return this;
	}
	,__class__: haxe.Http
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = true;
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		var _g = this.buf.charCodeAt(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new haxe.ds.IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntMap format";
			return h;
		case 77:
			var h = new haxe.ds.ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = true;
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ != null?key.__id__:key.__id__ = ++haxe.ds.ObjectMap.count;
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe.ds.ObjectMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = true;
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.prototype = {
	__class__: haxe.io.Bytes
}
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = true;
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
}
js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = true;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
var net = {}
net.lazystudios = {}
net.lazystudios.thecitygame = {}
net.lazystudios.thecitygame.builders = {}
net.lazystudios.thecitygame.builders.MapSpriteBuilder = function() { }
$hxClasses["net.lazystudios.thecitygame.builders.MapSpriteBuilder"] = net.lazystudios.thecitygame.builders.MapSpriteBuilder;
net.lazystudios.thecitygame.builders.MapSpriteBuilder.__name__ = true;
net.lazystudios.thecitygame.builders.MapSpriteBuilder.prototype = {
	build: function(o) {
		this._mapSprite = o;
		this._mapSprite.set_position(this._position);
		this._mapSprite.set_icon(this._icon);
	}
	,set_icon: function(value) {
		return this._icon = value;
	}
	,get_icon: function() {
		return this._icon;
	}
	,set_position: function(value) {
		return this._position = value;
	}
	,get_position: function() {
		return this._position;
	}
	,__class__: net.lazystudios.thecitygame.builders.MapSpriteBuilder
}
net.lazystudios.thecitygame.builders.BuildingBuilder = function() { }
$hxClasses["net.lazystudios.thecitygame.builders.BuildingBuilder"] = net.lazystudios.thecitygame.builders.BuildingBuilder;
net.lazystudios.thecitygame.builders.BuildingBuilder.__name__ = true;
net.lazystudios.thecitygame.builders.BuildingBuilder.__super__ = net.lazystudios.thecitygame.builders.MapSpriteBuilder;
net.lazystudios.thecitygame.builders.BuildingBuilder.prototype = $extend(net.lazystudios.thecitygame.builders.MapSpriteBuilder.prototype,{
	build: function(o) {
		this._building = o;
		this._building.set_name(this._name);
		this._building.set_type(this._type);
		net.lazystudios.thecitygame.builders.MapSpriteBuilder.prototype.build.call(this,this._building);
	}
	,set_type: function(value) {
		return this._type = value;
	}
	,get_type: function() {
		return this._type;
	}
	,set_name: function(value) {
		return this._name = value;
	}
	,get_name: function() {
		return this._name;
	}
	,__class__: net.lazystudios.thecitygame.builders.BuildingBuilder
});
net.lazystudios.thecitygame.builders.BusinessBuilder = function() {
	this._productType = new Array();
	this._inventory = new haxe.ds.StringMap();
};
$hxClasses["net.lazystudios.thecitygame.builders.BusinessBuilder"] = net.lazystudios.thecitygame.builders.BusinessBuilder;
net.lazystudios.thecitygame.builders.BusinessBuilder.__name__ = true;
net.lazystudios.thecitygame.builders.BusinessBuilder.__super__ = net.lazystudios.thecitygame.builders.BuildingBuilder;
net.lazystudios.thecitygame.builders.BusinessBuilder.prototype = $extend(net.lazystudios.thecitygame.builders.BuildingBuilder.prototype,{
	buildBusiness: function() {
		this._business = new net.lazystudios.thecitygame.sprites.Business();
		var _g = 0, _g1 = this._productType;
		while(_g < _g1.length) {
			var goodType = _g1[_g];
			++_g;
			this._business.get_productType().push(goodType);
		}
		var $it0 = this._inventory.keys();
		while( $it0.hasNext() ) {
			var goodTypeName = $it0.next();
			this._business.get_inventory().set(goodTypeName,this._inventory.get(goodTypeName));
		}
		this._business.set_owner(this._owner);
		this._business.set_cost(this._cost);
		this.build(this._business);
		return this._business;
	}
	,set_cost: function(value) {
		return this._cost = value;
	}
	,get_cost: function() {
		return this._cost;
	}
	,set_owner: function(value) {
		return this._owner = value;
	}
	,get_owner: function() {
		return this._owner;
	}
	,get_inventory: function() {
		return this._inventory;
	}
	,get_productType: function() {
		return this._productType;
	}
	,__class__: net.lazystudios.thecitygame.builders.BusinessBuilder
});
net.lazystudios.thecitygame.builders.FactoryBuilder = function() {
	this._productionType = new Array();
	this._inventory = new haxe.ds.StringMap();
};
$hxClasses["net.lazystudios.thecitygame.builders.FactoryBuilder"] = net.lazystudios.thecitygame.builders.FactoryBuilder;
net.lazystudios.thecitygame.builders.FactoryBuilder.__name__ = true;
net.lazystudios.thecitygame.builders.FactoryBuilder.__super__ = net.lazystudios.thecitygame.builders.BuildingBuilder;
net.lazystudios.thecitygame.builders.FactoryBuilder.prototype = $extend(net.lazystudios.thecitygame.builders.BuildingBuilder.prototype,{
	buildFactory: function() {
		this._factory = new net.lazystudios.thecitygame.sprites.Factory();
		var _g = 0, _g1 = this._productionType;
		while(_g < _g1.length) {
			var goodType = _g1[_g];
			++_g;
			this._factory.get_productionType().push(goodType);
		}
		this._factory.set_availableTrucks(this._availableTrucks);
		var $it0 = this._inventory.keys();
		while( $it0.hasNext() ) {
			var goodTypeName = $it0.next();
			this._factory.get_inventory().set(goodTypeName,this._inventory.get(goodTypeName));
		}
		this._factory.set_owner(this._owner);
		this._factory.set_cost(this._cost);
		this.build(this._factory);
		return this._factory;
	}
	,set_cost: function(value) {
		return this._cost = value;
	}
	,get_cost: function() {
		return this._cost;
	}
	,set_owner: function(value) {
		return this._owner = value;
	}
	,get_owner: function() {
		return this._owner;
	}
	,get_inventory: function() {
		return this._inventory;
	}
	,set_availableTrucks: function(value) {
		return this._availableTrucks = value;
	}
	,get_availableTrucks: function() {
		return this._availableTrucks;
	}
	,get_productionType: function() {
		return this._productionType;
	}
	,__class__: net.lazystudios.thecitygame.builders.FactoryBuilder
});
net.lazystudios.thecitygame.core = {}
net.lazystudios.thecitygame.core.TheCityGame = function() { }
$hxClasses["net.lazystudios.thecitygame.core.TheCityGame"] = net.lazystudios.thecitygame.core.TheCityGame;
net.lazystudios.thecitygame.core.TheCityGame.__name__ = true;
net.lazystudios.thecitygame.core.TheCityGame.get_world = function() {
	return net.lazystudios.thecitygame.core.TheCityGame._world;
}
net.lazystudios.thecitygame.core.TheCityGame.get_factoryTypes = function() {
	return net.lazystudios.thecitygame.core.TheCityGame._factoryTypes;
}
net.lazystudios.thecitygame.core.TheCityGame.get_businessTypes = function() {
	return net.lazystudios.thecitygame.core.TheCityGame._businessTypes;
}
net.lazystudios.thecitygame.core.TheCityGame.get_goodTypes = function() {
	return net.lazystudios.thecitygame.core.TheCityGame._goodTypes;
}
net.lazystudios.thecitygame.core.TheCityGame.get_loggedInUser = function() {
	return net.lazystudios.thecitygame.core.TheCityGame._loggedInUser;
}
net.lazystudios.thecitygame.core.TheCityGame.set_loggedInUser = function(value) {
	return net.lazystudios.thecitygame.core.TheCityGame._loggedInUser = value;
}
net.lazystudios.thecitygame.core.TheCityGame.init = function() {
	net.lazystudios.thecitygame.core.TheCityGame.gameConfiguration();
	net.lazystudios.thecitygame.core.TheCityGame._world.addToGame();
	net.lazystudios.thecitygame.ui.MainInterface.init();
}
net.lazystudios.thecitygame.core.TheCityGame.gameConfiguration = function() {
	net.lazystudios.thecitygame.core.TheCityGame._world = new net.lazystudios.thecitygame.elements.World(new google.maps.LatLng(37.98,23.53));
	net.lazystudios.thecitygame.core.TheCityGame._goodTypes = new haxe.ds.StringMap();
	net.lazystudios.thecitygame.core.TheCityGame.registerGoodType(new net.lazystudios.thecitygame.data.GoodType("Bread",""));
	net.lazystudios.thecitygame.core.TheCityGame.registerGoodType(new net.lazystudios.thecitygame.data.GoodType("Clothes",""));
	net.lazystudios.thecitygame.core.TheCityGame.registerGoodType(new net.lazystudios.thecitygame.data.GoodType("Wine",""));
	net.lazystudios.thecitygame.core.TheCityGame._factoryTypes = new haxe.ds.StringMap();
	var factoryBuilder;
	factoryBuilder = new net.lazystudios.thecitygame.builders.FactoryBuilder();
	factoryBuilder.set_icon("Factory.png");
	factoryBuilder.set_cost(2100000);
	factoryBuilder.set_type("crazyFactory");
	factoryBuilder.get_productionType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Bread"));
	factoryBuilder.get_productionType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Clothes"));
	factoryBuilder.get_productionType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Wine"));
	factoryBuilder.set_availableTrucks(2);
	net.lazystudios.thecitygame.core.TheCityGame.registerFactoryBuilder(factoryBuilder);
	net.lazystudios.thecitygame.core.TheCityGame._businessTypes = new haxe.ds.StringMap();
	var businessBuilder;
	businessBuilder = new net.lazystudios.thecitygame.builders.BusinessBuilder();
	businessBuilder.set_icon("bakery.png");
	businessBuilder.set_cost(250000);
	businessBuilder.set_type("Bakery");
	businessBuilder.get_productType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Bread"));
	net.lazystudios.thecitygame.core.TheCityGame.registerBusinessBuilder(businessBuilder);
	businessBuilder = new net.lazystudios.thecitygame.builders.BusinessBuilder();
	businessBuilder.set_icon("retail.png");
	businessBuilder.set_cost(250000);
	businessBuilder.set_type("Retail Store");
	businessBuilder.get_productType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Clothes"));
	net.lazystudios.thecitygame.core.TheCityGame.registerBusinessBuilder(businessBuilder);
	businessBuilder = new net.lazystudios.thecitygame.builders.BusinessBuilder();
	businessBuilder.set_icon("bar.png");
	businessBuilder.set_cost(280000);
	businessBuilder.set_type("Bar");
	businessBuilder.get_productType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Wine"));
	net.lazystudios.thecitygame.core.TheCityGame.registerBusinessBuilder(businessBuilder);
}
net.lazystudios.thecitygame.core.TheCityGame.registerFactoryBuilder = function(factoryBuilder) {
	net.lazystudios.thecitygame.core.TheCityGame._factoryTypes.set(factoryBuilder.get_type(),factoryBuilder);
}
net.lazystudios.thecitygame.core.TheCityGame.registerBusinessBuilder = function(businessBuilder) {
	net.lazystudios.thecitygame.core.TheCityGame._businessTypes.set(businessBuilder.get_type(),businessBuilder);
}
net.lazystudios.thecitygame.core.TheCityGame.registerGoodType = function(goodType) {
	net.lazystudios.thecitygame.core.TheCityGame._goodTypes.set(goodType.get_name(),goodType);
}
net.lazystudios.thecitygame.data = {}
net.lazystudios.thecitygame.data.GoodType = function(name,icon) {
	this._name = name;
	this._icon = icon;
};
$hxClasses["net.lazystudios.thecitygame.data.GoodType"] = net.lazystudios.thecitygame.data.GoodType;
net.lazystudios.thecitygame.data.GoodType.__name__ = true;
net.lazystudios.thecitygame.data.GoodType.prototype = {
	set_icon: function(value) {
		return this._icon = value;
	}
	,get_icon: function() {
		return this._icon;
	}
	,set_name: function(value) {
		return this._name = value;
	}
	,get_name: function() {
		return this._name;
	}
	,__class__: net.lazystudios.thecitygame.data.GoodType
}
net.lazystudios.thecitygame.elements = {}
net.lazystudios.thecitygame.elements.User = function(name,password,money) {
	if(money == null) money = 5000000;
	if(password == null) password = "123";
	this._name = name;
	this._password = password;
	this._money = money;
};
$hxClasses["net.lazystudios.thecitygame.elements.User"] = net.lazystudios.thecitygame.elements.User;
net.lazystudios.thecitygame.elements.User.__name__ = true;
net.lazystudios.thecitygame.elements.User.prototype = {
	set_money: function(value) {
		return this._money = value;
	}
	,get_money: function() {
		return this._money;
	}
	,set_password: function(value) {
		return this._password = value;
	}
	,get_password: function() {
		return this._password;
	}
	,set_name: function(value) {
		return this._name = value;
	}
	,get_name: function() {
		return this._name;
	}
	,__class__: net.lazystudios.thecitygame.elements.User
}
net.lazystudios.thecitygame.elements.World = function(initLocation,initZoom,initMapTypeId,htmlContainerId) {
	if(htmlContainerId == null) htmlContainerId = "map-canvas";
	if(initZoom == null) initZoom = 11;
	if(initMapTypeId == null) initMapTypeId = google.maps.MapTypeId.TERRAIN;
	this._mapOptions = { };
	this._mapOptions.zoom = initZoom;
	this._mapOptions.center = initLocation;
	this._mapOptions.mapTypeId = initMapTypeId;
	this._htmlContainerId = htmlContainerId;
	this._buildings = new Array();
	this._vehicles = new Array();
};
$hxClasses["net.lazystudios.thecitygame.elements.World"] = net.lazystudios.thecitygame.elements.World;
net.lazystudios.thecitygame.elements.World.__name__ = true;
net.lazystudios.thecitygame.elements.World.prototype = {
	addToGame: function() {
		this._display();
	}
	,_display: function() {
		this._map = new google.maps.Map(js.Browser.document.getElementById(this._htmlContainerId),this._mapOptions);
	}
	,get_vehicles: function() {
		return this._vehicles;
	}
	,get_buildings: function() {
		return this._buildings;
	}
	,get_map: function() {
		return this._map;
	}
	,__class__: net.lazystudios.thecitygame.elements.World
}
net.lazystudios.thecitygame.sprites = {}
net.lazystudios.thecitygame.sprites.MapSprite = function() { }
$hxClasses["net.lazystudios.thecitygame.sprites.MapSprite"] = net.lazystudios.thecitygame.sprites.MapSprite;
net.lazystudios.thecitygame.sprites.MapSprite.__name__ = true;
net.lazystudios.thecitygame.sprites.MapSprite.prototype = {
	display: function() {
		this._markerOptions = { };
		this._markerOptions.position = this._position;
		this._markerOptions.map = net.lazystudios.thecitygame.core.TheCityGame.get_world().get_map();
		this._markerOptions.icon = this._icon;
		this._marker = new google.maps.Marker(this._markerOptions);
	}
	,set_icon: function(value) {
		return this._icon = value;
	}
	,get_icon: function() {
		return this._icon;
	}
	,set_position: function(value) {
		return this._position = value;
	}
	,get_position: function() {
		return this._position;
	}
	,__class__: net.lazystudios.thecitygame.sprites.MapSprite
}
net.lazystudios.thecitygame.sprites.Building = function() { }
$hxClasses["net.lazystudios.thecitygame.sprites.Building"] = net.lazystudios.thecitygame.sprites.Building;
net.lazystudios.thecitygame.sprites.Building.__name__ = true;
net.lazystudios.thecitygame.sprites.Building.__super__ = net.lazystudios.thecitygame.sprites.MapSprite;
net.lazystudios.thecitygame.sprites.Building.prototype = $extend(net.lazystudios.thecitygame.sprites.MapSprite.prototype,{
	addToWorld: function() {
		net.lazystudios.thecitygame.core.TheCityGame.get_world().get_buildings().push(this);
		this.display();
	}
	,display: function() {
		net.lazystudios.thecitygame.sprites.MapSprite.prototype.display.call(this);
	}
	,set_type: function(value) {
		return this._type = value;
	}
	,get_type: function() {
		return this._type;
	}
	,set_name: function(value) {
		return this._name = value;
	}
	,get_name: function() {
		return this._name;
	}
	,__class__: net.lazystudios.thecitygame.sprites.Building
});
net.lazystudios.thecitygame.sprites.Business = function() {
	this._productType = new Array();
	this._inventory = new haxe.ds.StringMap();
};
$hxClasses["net.lazystudios.thecitygame.sprites.Business"] = net.lazystudios.thecitygame.sprites.Business;
net.lazystudios.thecitygame.sprites.Business.__name__ = true;
net.lazystudios.thecitygame.sprites.Business.__super__ = net.lazystudios.thecitygame.sprites.Building;
net.lazystudios.thecitygame.sprites.Business.prototype = $extend(net.lazystudios.thecitygame.sprites.Building.prototype,{
	onMarkerClick: function(e) {
		var coordInfoWindow = new google.maps.InfoWindow();
		coordInfoWindow.setContent("Factory Name: " + this._name + "<br>Type: " + this._type + "<br>Owner: " + this._owner.get_name() + "<br>Cost: " + this._cost);
		coordInfoWindow.setPosition(this._marker.getPosition());
		coordInfoWindow.open(net.lazystudios.thecitygame.core.TheCityGame.get_world().get_map());
	}
	,display: function() {
		net.lazystudios.thecitygame.sprites.Building.prototype.display.call(this);
		google.maps.Event.addListener(this._marker,"click",$bind(this,this.onMarkerClick));
	}
	,set_cost: function(value) {
		return this._cost = value;
	}
	,get_cost: function() {
		return this._cost;
	}
	,set_owner: function(value) {
		return this._owner = value;
	}
	,get_owner: function() {
		return this._owner;
	}
	,get_inventory: function() {
		return this._inventory;
	}
	,get_productType: function() {
		return this._productType;
	}
	,__class__: net.lazystudios.thecitygame.sprites.Business
});
net.lazystudios.thecitygame.sprites.Factory = function() {
	this._productionType = new Array();
	this._inventory = new haxe.ds.StringMap();
};
$hxClasses["net.lazystudios.thecitygame.sprites.Factory"] = net.lazystudios.thecitygame.sprites.Factory;
net.lazystudios.thecitygame.sprites.Factory.__name__ = true;
net.lazystudios.thecitygame.sprites.Factory.__super__ = net.lazystudios.thecitygame.sprites.Building;
net.lazystudios.thecitygame.sprites.Factory.prototype = $extend(net.lazystudios.thecitygame.sprites.Building.prototype,{
	onMarkerClick: function(e) {
		var coordInfoWindow = new google.maps.InfoWindow();
		coordInfoWindow.setContent("Factory Name: " + this._name + "<br>Type: " + this._type + "<br>Owner: " + this._owner.get_name() + "<br>Cost: " + this._cost);
		coordInfoWindow.setPosition(this._marker.getPosition());
		coordInfoWindow.open(net.lazystudios.thecitygame.core.TheCityGame.get_world().get_map());
	}
	,display: function() {
		net.lazystudios.thecitygame.sprites.Building.prototype.display.call(this);
		google.maps.Event.addListener(this._marker,"click",$bind(this,this.onMarkerClick));
	}
	,set_cost: function(value) {
		return this._cost = value;
	}
	,get_cost: function() {
		return this._cost;
	}
	,set_owner: function(value) {
		return this._owner = value;
	}
	,get_owner: function() {
		return this._owner;
	}
	,get_inventory: function() {
		return this._inventory;
	}
	,set_availableTrucks: function(value) {
		return this._availableTrucks = value;
	}
	,get_availableTrucks: function() {
		return this._availableTrucks;
	}
	,get_productionType: function() {
		return this._productionType;
	}
	,__class__: net.lazystudios.thecitygame.sprites.Factory
});
net.lazystudios.thecitygame.sprites.Vehicle = function() { }
$hxClasses["net.lazystudios.thecitygame.sprites.Vehicle"] = net.lazystudios.thecitygame.sprites.Vehicle;
net.lazystudios.thecitygame.sprites.Vehicle.__name__ = true;
net.lazystudios.thecitygame.sprites.Vehicle.__super__ = net.lazystudios.thecitygame.sprites.MapSprite;
net.lazystudios.thecitygame.sprites.Vehicle.prototype = $extend(net.lazystudios.thecitygame.sprites.MapSprite.prototype,{
	addToWorld: function() {
		net.lazystudios.thecitygame.core.TheCityGame.get_world().get_vehicles().push(this);
		this.display();
	}
	,display: function() {
		net.lazystudios.thecitygame.sprites.MapSprite.prototype.display.call(this);
	}
	,set_type: function(value) {
		return this._type = value;
	}
	,get_type: function() {
		return this._type;
	}
	,set_name: function(value) {
		return this._name = value;
	}
	,get_name: function() {
		return this._name;
	}
	,__class__: net.lazystudios.thecitygame.sprites.Vehicle
});
net.lazystudios.thecitygame.ui = {}
net.lazystudios.thecitygame.ui.MainInterface = function() { }
$hxClasses["net.lazystudios.thecitygame.ui.MainInterface"] = net.lazystudios.thecitygame.ui.MainInterface;
net.lazystudios.thecitygame.ui.MainInterface.__name__ = true;
net.lazystudios.thecitygame.ui.MainInterface.init = function() {
	if(net.lazystudios.thecitygame.ui.MainInterface._quickLogin == false) net.lazystudios.thecitygame.ui.MainInterface.createInitialLoginControls(); else {
		net.lazystudios.thecitygame.core.TheCityGame.set_loggedInUser(new net.lazystudios.thecitygame.elements.User("Aris","123",4000000));
		net.lazystudios.thecitygame.ui.MainInterface.hideUserPane();
		net.lazystudios.thecitygame.ui.MainInterface.showControlsUI();
		net.lazystudios.thecitygame.ui.MainInterface.setupControlsUI();
	}
	net.lazystudios.thecitygame.ui.MainInterface.server_refreshBuildings();
	google.maps.Event.addListener(net.lazystudios.thecitygame.core.TheCityGame.get_world().get_map(),"click",net.lazystudios.thecitygame.ui.MainInterface.onClick);
}
net.lazystudios.thecitygame.ui.MainInterface.onClick = function(event) {
	if(net.lazystudios.thecitygame.core.TheCityGame.get_loggedInUser() != null) net.lazystudios.thecitygame.ui.MainInterface.server_createFactory(event);
}
net.lazystudios.thecitygame.ui.MainInterface.server_createFactory = function(event) {
	var crazyFactory = net.lazystudios.thecitygame.core.TheCityGame.get_factoryTypes().get("crazyFactory").buildFactory();
	crazyFactory.set_name("unnamed");
	crazyFactory.set_position(event.latLng);
	crazyFactory.set_owner(net.lazystudios.thecitygame.core.TheCityGame.get_loggedInUser());
	var r = new haxe.Http("http://localhost/TCG_Server/index.php");
	r.onError = function(r1) {
		net.lazystudios.thecitygame.ui.MainInterface.setContent("traceDiv",r1);
	};
	r.onData = net.lazystudios.thecitygame.ui.MainInterface.onCreateFactoryResponse;
	r.setParameter("action","createFactory");
	r.setParameter("name",crazyFactory.get_name());
	r.setParameter("type",crazyFactory.get_type());
	r.setParameter("longitude",Std.string(crazyFactory.get_position().lng()));
	r.setParameter("latitude",Std.string(crazyFactory.get_position().lat()));
	r.setParameter("ownerName",crazyFactory.get_owner().get_name());
	r.setParameter("availableTrucks",Std.string(crazyFactory.get_availableTrucks()));
	r.request(true);
	crazyFactory.addToWorld();
}
net.lazystudios.thecitygame.ui.MainInterface.server_refreshBuildings = function() {
	var r = new haxe.Http("http://localhost/TCG_Server/index.php");
	r.onError = function(r1) {
		net.lazystudios.thecitygame.ui.MainInterface.setContent("traceDiv",r1);
	};
	r.onData = net.lazystudios.thecitygame.ui.MainInterface.onRefreshBuildingsResponse;
	r.setParameter("action","refreshBuildings");
	r.request(true);
}
net.lazystudios.thecitygame.ui.MainInterface.onCreateFactoryResponse = function(r) {
}
net.lazystudios.thecitygame.ui.MainInterface.onRefreshBuildingsResponse = function(r) {
	var results = haxe.Unserializer.run(r);
	var $it0 = results.iterator();
	while( $it0.hasNext() ) {
		var factoryEntry = $it0.next();
		var crazyFactory = net.lazystudios.thecitygame.core.TheCityGame.get_factoryTypes().get("crazyFactory").buildFactory();
		crazyFactory.set_name(factoryEntry.name);
		crazyFactory.set_position(new google.maps.LatLng(factoryEntry.latitude,factoryEntry.longitude));
		crazyFactory.set_availableTrucks(factoryEntry.availableTrucks);
		crazyFactory.set_owner(new net.lazystudios.thecitygame.elements.User(factoryEntry.ownerName));
		crazyFactory.addToWorld();
	}
}
net.lazystudios.thecitygame.ui.MainInterface.pleaseWaitLoginControls = function() {
	var loginControls = js.Browser.document.getElementById("loginControls");
	loginControls.innerHTML = "Please Wait...";
}
net.lazystudios.thecitygame.ui.MainInterface.clearLoginControls = function() {
	var loginControls = js.Browser.document.getElementById("loginControls");
	loginControls.innerHTML = "";
}
net.lazystudios.thecitygame.ui.MainInterface.createInitialLoginControls = function() {
	var button;
	var loginControls = js.Browser.document.getElementById("loginControls");
	loginControls.innerHTML = "";
	button = js.Browser.document.createElement("button");
	button.innerHTML = "Sign Up";
	button.onclick = net.lazystudios.thecitygame.ui.MainInterface.onSignUp;
	loginControls.appendChild(button);
	button = js.Browser.document.createElement("button");
	button.innerHTML = "Sign In";
	button.onclick = net.lazystudios.thecitygame.ui.MainInterface.onSignIn;
	loginControls.appendChild(button);
}
net.lazystudios.thecitygame.ui.MainInterface.createSignUpForm = function() {
	var loginControls = js.Browser.document.getElementById("loginControls");
	loginControls.innerHTML = "Username: <input type=\"text\" id=\"signUp_username\"> Password: <input type=\"password\" id=\"signUp_password\"><button id=\"signUp_submit\">Register</button>";
	js.Browser.document.getElementById("signUp_submit").onclick = net.lazystudios.thecitygame.ui.MainInterface.onSignUpSubmit;
}
net.lazystudios.thecitygame.ui.MainInterface.createSignInForm = function() {
	var loginControls = js.Browser.document.getElementById("loginControls");
	loginControls.innerHTML = "Username: <input type=\"text\" id=\"signIn_username\"> Password: <input type=\"password\" id=\"signIn_password\"><button id=\"signIn_submit\">Log In</button>";
	js.Browser.document.getElementById("signIn_submit").onclick = net.lazystudios.thecitygame.ui.MainInterface.onSignInSubmit;
}
net.lazystudios.thecitygame.ui.MainInterface.onSignUp = function(e) {
	net.lazystudios.thecitygame.ui.MainInterface.clearWarnings();
	net.lazystudios.thecitygame.ui.MainInterface.createSignUpForm();
}
net.lazystudios.thecitygame.ui.MainInterface.onSignUpSubmit = function(e) {
	net.lazystudios.thecitygame.ui.MainInterface._loginUsername = (js.Boot.__cast(js.Browser.document.getElementById("signUp_username") , HTMLInputElement)).value;
	net.lazystudios.thecitygame.ui.MainInterface._loginPassword = (js.Boot.__cast(js.Browser.document.getElementById("signUp_password") , HTMLInputElement)).value;
	var r = new haxe.Http("http://localhost/TCG_Server/index.php");
	r.onError = function(r1) {
		net.lazystudios.thecitygame.ui.MainInterface.setContent("traceDiv",r1);
	};
	r.onData = net.lazystudios.thecitygame.ui.MainInterface.onSignUpResult;
	r.setParameter("action","SignUp");
	r.setParameter("signUp_username",(js.Boot.__cast(js.Browser.document.getElementById("signUp_username") , HTMLInputElement)).value);
	r.setParameter("signUp_password",(js.Boot.__cast(js.Browser.document.getElementById("signUp_password") , HTMLInputElement)).value);
	r.request(true);
	net.lazystudios.thecitygame.ui.MainInterface.pleaseWaitLoginControls();
}
net.lazystudios.thecitygame.ui.MainInterface.onSignUpResult = function(r) {
	if(r == "success") net.lazystudios.thecitygame.ui.MainInterface.loginRequest(); else net.lazystudios.thecitygame.ui.MainInterface.createInitialLoginControls();
}
net.lazystudios.thecitygame.ui.MainInterface.onSignIn = function(e) {
	net.lazystudios.thecitygame.ui.MainInterface.clearWarnings();
	net.lazystudios.thecitygame.ui.MainInterface.createSignInForm();
}
net.lazystudios.thecitygame.ui.MainInterface.onSignInSubmit = function(e) {
	net.lazystudios.thecitygame.ui.MainInterface._loginUsername = (js.Boot.__cast(js.Browser.document.getElementById("signIn_username") , HTMLInputElement)).value;
	net.lazystudios.thecitygame.ui.MainInterface._loginPassword = (js.Boot.__cast(js.Browser.document.getElementById("signIn_password") , HTMLInputElement)).value;
	net.lazystudios.thecitygame.ui.MainInterface.loginRequest();
}
net.lazystudios.thecitygame.ui.MainInterface.loginRequest = function() {
	var r = new haxe.Http("http://localhost/TCG_Server/index.php");
	r.onError = function(r1) {
		net.lazystudios.thecitygame.ui.MainInterface.setContent("traceDiv",r1);
	};
	r.onData = net.lazystudios.thecitygame.ui.MainInterface.onSignInResult;
	r.setParameter("action","SignIn");
	r.setParameter("signIn_username",net.lazystudios.thecitygame.ui.MainInterface._loginUsername);
	r.setParameter("signIn_password",net.lazystudios.thecitygame.ui.MainInterface._loginPassword);
	r.request(true);
	net.lazystudios.thecitygame.ui.MainInterface.pleaseWaitLoginControls();
}
net.lazystudios.thecitygame.ui.MainInterface.onSignInResult = function(r) {
	if(r == "invalid") {
		net.lazystudios.thecitygame.ui.MainInterface.createInitialLoginControls();
		net.lazystudios.thecitygame.ui.MainInterface.showWarning("Username/password incorrect");
	} else {
		var user = haxe.Unserializer.run(r);
		net.lazystudios.thecitygame.core.TheCityGame.set_loggedInUser(new net.lazystudios.thecitygame.elements.User(user.name,user.password,user.money));
		net.lazystudios.thecitygame.ui.MainInterface.hideUserPane();
		net.lazystudios.thecitygame.ui.MainInterface.showControlsUI();
		net.lazystudios.thecitygame.ui.MainInterface.setupControlsUI();
	}
}
net.lazystudios.thecitygame.ui.MainInterface.setupControlsUI = function() {
	js.Browser.document.getElementById("ui_name").innerHTML = net.lazystudios.thecitygame.core.TheCityGame.get_loggedInUser().get_name();
	js.Browser.document.getElementById("ui_MoneyValue").innerHTML = Std.string(net.lazystudios.thecitygame.core.TheCityGame.get_loggedInUser().get_money());
	var buildingContainer;
	var imageElement;
	var infoDiv;
	var FactoryBuildings = js.Browser.document.getElementById("FactoryBuildings");
	var $it0 = net.lazystudios.thecitygame.core.TheCityGame.get_factoryTypes().iterator();
	while( $it0.hasNext() ) {
		var factoryBuilder = $it0.next();
		buildingContainer = js.Browser.document.createElement("div");
		buildingContainer.style.display = "block";
		imageElement = js.Browser.document.createElement("img");
		imageElement.src = factoryBuilder.get_icon();
		imageElement.style.display = "inline-block";
		imageElement.style["float"] = "left";
		imageElement.style.width = "70px";
		infoDiv = js.Browser.document.createElement("div");
		infoDiv.style.paddingLeft = "10px";
		infoDiv.style.display = "inline-block";
		infoDiv.style["float"] = "right";
		infoDiv.style.overflow = "hidden";
		infoDiv.style.color = "#FFFFFF";
		infoDiv.innerHTML = "Type: " + factoryBuilder.get_type() + "<br>Cost: $" + factoryBuilder.get_cost() + "<br>Produces: ";
		var _g1 = 0, _g = factoryBuilder.get_productionType().length;
		while(_g1 < _g) {
			var i = _g1++;
			infoDiv.innerHTML += factoryBuilder.get_productionType()[i].get_name();
			if(i < factoryBuilder.get_productionType().length - 1) infoDiv.innerHTML += ", ";
		}
		buildingContainer.appendChild(imageElement);
		buildingContainer.appendChild(infoDiv);
		FactoryBuildings.appendChild(buildingContainer);
	}
	var BusinessBuildings = js.Browser.document.getElementById("BusinessBuildings");
	var $it1 = net.lazystudios.thecitygame.core.TheCityGame.get_businessTypes().iterator();
	while( $it1.hasNext() ) {
		var businessBuilder = $it1.next();
		buildingContainer = js.Browser.document.createElement("div");
		buildingContainer.style.display = "block";
		buildingContainer.style.paddingTop = "15px";
		imageElement = js.Browser.document.createElement("img");
		imageElement.src = businessBuilder.get_icon();
		imageElement.style.display = "inline-block";
		imageElement.style["float"] = "left";
		imageElement.style.width = "70px";
		infoDiv = js.Browser.document.createElement("div");
		infoDiv.style.paddingLeft = "10px";
		infoDiv.style.display = "inline-block";
		infoDiv.style["float"] = "right";
		infoDiv.style.overflow = "hidden";
		infoDiv.style.color = "#FFFFFF";
		infoDiv.innerHTML = "Type: " + businessBuilder.get_type() + "<br>Cost: $" + businessBuilder.get_cost() + "<br>Sells: ";
		var _g1 = 0, _g = businessBuilder.get_productType().length;
		while(_g1 < _g) {
			var i = _g1++;
			infoDiv.innerHTML += businessBuilder.get_productType()[i].get_name();
			if(i < businessBuilder.get_productType().length - 1) infoDiv.innerHTML += ", ";
		}
		buildingContainer.appendChild(imageElement);
		buildingContainer.appendChild(infoDiv);
		BusinessBuildings.appendChild(buildingContainer);
	}
}
net.lazystudios.thecitygame.ui.MainInterface.hideUserPane = function() {
	var userPane = js.Browser.document.getElementById("userPane");
	userPane.style.height = "0px";
	userPane.style.visibility = "hidden";
	userPane.innerHTML = "";
}
net.lazystudios.thecitygame.ui.MainInterface.showControlsUI = function() {
	var controlsUI = js.Browser.document.getElementById("controlsUI");
	controlsUI.style.visibility = "visible";
	var controlsContainer = js.Browser.document.getElementById("controlsContainer");
	controlsContainer.style.visibility = "visible";
}
net.lazystudios.thecitygame.ui.MainInterface.showUserInfo = function() {
	var userInfo = js.Browser.document.getElementById("userInfo");
	userInfo.innerHTML = "Welcome " + net.lazystudios.thecitygame.ui.MainInterface._loginUsername + ".";
}
net.lazystudios.thecitygame.ui.MainInterface.showWarning = function(warningText) {
	var warnings = js.Browser.document.getElementById("warnings");
	warnings.innerHTML = warningText;
}
net.lazystudios.thecitygame.ui.MainInterface.clearWarnings = function() {
	var warnings = js.Browser.document.getElementById("warnings");
	warnings.innerHTML = "";
}
net.lazystudios.thecitygame.ui.MainInterface.setContent = function(id,content) {
	var d = js.Browser.document.getElementById(id);
	if(d == null) js.Lib.alert("Unknown element : " + id);
	d.innerHTML = content;
}
net.lazystudios.thecitygame.ui.MainInterface.AjaxExamples = function(e) {
	var result = haxe.Http.requestUrl("http://localhost/TCG_Server/index.php");
	net.lazystudios.thecitygame.ui.MainInterface.setContent("traceDiv",result);
	var r = new haxe.Http("http://localhost/TCG_Server/index.php");
	r.onError = function(r1) {
		net.lazystudios.thecitygame.ui.MainInterface.setContent("traceDiv",r1);
	};
	r.onData = function(r1) {
		net.lazystudios.thecitygame.ui.MainInterface.setContent("traceDiv",r1);
	};
	r.request(false);
}
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if (google.maps.event) { google.maps.Event = google.maps.event; }
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
js.Browser.document = typeof window != "undefined" ? window.document : null;
net.lazystudios.thecitygame.ui.MainInterface._quickLogin = false;
Main.main();
})();
