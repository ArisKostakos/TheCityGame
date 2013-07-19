(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Main = function() { }
Main.__name__ = true;
Main.main = function() {
	net.lazystudios.thecitygame.core.TheCityGame.init();
}
var IMap = function() { }
IMap.__name__ = true;
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	keys: function() {
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
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
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
js.Browser = function() { }
js.Browser.__name__ = true;
var net = {}
net.lazystudios = {}
net.lazystudios.thecitygame = {}
net.lazystudios.thecitygame.builders = {}
net.lazystudios.thecitygame.builders.MapSpriteBuilder = function() { }
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
net.lazystudios.thecitygame.core.TheCityGame.init = function() {
	net.lazystudios.thecitygame.core.TheCityGame.gameConfiguration();
	net.lazystudios.thecitygame.core.TheCityGame._world.addToGame();
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
	factoryBuilder.set_cost(1500000);
	factoryBuilder.set_type("crazyFactory");
	factoryBuilder.get_productionType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Bread"));
	factoryBuilder.get_productionType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Clothes"));
	factoryBuilder.get_productionType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Wine"));
	factoryBuilder.set_availableTrucks(2);
	net.lazystudios.thecitygame.core.TheCityGame.registerFactoryBuilder(factoryBuilder);
	net.lazystudios.thecitygame.core.TheCityGame._businessTypes = new haxe.ds.StringMap();
	var businessBuilder;
	businessBuilder = new net.lazystudios.thecitygame.builders.BusinessBuilder();
	businessBuilder.set_icon("Business.png");
	businessBuilder.set_cost(500000);
	businessBuilder.set_type("Bakery");
	businessBuilder.get_productType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Bread"));
	net.lazystudios.thecitygame.core.TheCityGame.registerBusinessBuilder(businessBuilder);
	businessBuilder = new net.lazystudios.thecitygame.builders.BusinessBuilder();
	businessBuilder.set_icon("Business.png");
	businessBuilder.set_cost(500000);
	businessBuilder.set_type("Retail Store");
	businessBuilder.get_productType().push(net.lazystudios.thecitygame.core.TheCityGame._goodTypes.get("Clothes"));
	net.lazystudios.thecitygame.core.TheCityGame.registerBusinessBuilder(businessBuilder);
	businessBuilder = new net.lazystudios.thecitygame.builders.BusinessBuilder();
	businessBuilder.set_icon("Business.png");
	businessBuilder.set_cost(500000);
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
net.lazystudios.thecitygame.elements.World.__name__ = true;
net.lazystudios.thecitygame.elements.World.prototype = {
	addToGame: function() {
		this._display();
		google.maps.Event.addListener(this._map,"click",function(event) {
			var crazyFactory = net.lazystudios.thecitygame.core.TheCityGame.get_factoryTypes().get("crazyFactory").buildFactory();
			crazyFactory.set_name("Ergostasio Megaron");
			crazyFactory.set_position(event.latLng);
			crazyFactory.addToWorld();
		});
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
net.lazystudios.thecitygame.sprites.Business.__name__ = true;
net.lazystudios.thecitygame.sprites.Business.__super__ = net.lazystudios.thecitygame.sprites.Building;
net.lazystudios.thecitygame.sprites.Business.prototype = $extend(net.lazystudios.thecitygame.sprites.Building.prototype,{
	display: function() {
		net.lazystudios.thecitygame.sprites.Building.prototype.display.call(this);
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
net.lazystudios.thecitygame.sprites.Factory.__name__ = true;
net.lazystudios.thecitygame.sprites.Factory.__super__ = net.lazystudios.thecitygame.sprites.Building;
net.lazystudios.thecitygame.sprites.Factory.prototype = $extend(net.lazystudios.thecitygame.sprites.Building.prototype,{
	display: function() {
		net.lazystudios.thecitygame.sprites.Building.prototype.display.call(this);
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
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if (google.maps.event) { google.maps.Event = google.maps.event; }
js.Browser.document = typeof window != "undefined" ? window.document : null;
Main.main();
})();
