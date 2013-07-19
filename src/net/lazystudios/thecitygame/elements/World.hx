package net.lazystudios.thecitygame.elements;

import net.lazystudios.thecitygame.core.TheCityGame;
import google.maps.Geocoder;
import google.maps.LatLng;
import google.maps.Map;
import google.maps.MapOptions;
import google.maps.MapTypeId;
import google.maps.DirectionsService;
import google.maps.Marker;
import google.maps.MarkerOptions;
import google.maps.Polyline;
import google.maps.DirectionsRenderer;

import js.Lib;
import js.Browser;
import net.lazystudios.thecitygame.sprites.Building;
import net.lazystudios.thecitygame.sprites.Factory;
import net.lazystudios.thecitygame.sprites.Vehicle;



/**
 * ...
 * @author Aris Kostakos
 */

class World
{
	//Properties
	private var _directionsService:DirectionsService;
	private var _directionsRenderer:DirectionsRenderer;
	private var _map:Map;
	private var _mapOptions:MapOptions;
	private var _htmlContainerId:String;
	private var _buildings:Array<Building>;
	private var _vehicles:Array<Vehicle>;
	
	//Setters / Getters
	public var map(get,null) : Map;
	function get_map() { return _map; }
	
	public var buildings(get,null) : Array<Building>;
	function get_buildings(){ return _buildings; }  
	
	public var vehicles(get,null) : Array<Vehicle>;
	function get_vehicles(){ return _vehicles; } 
	
	//Constructor
	public function new(initLocation:LatLng, initZoom:Int = 11, ?initMapTypeId:MapTypeId, htmlContainerId:String="map-canvas")
	{
		if (initMapTypeId == null) initMapTypeId = MapTypeId.TERRAIN;
		
		_mapOptions = untyped { };
		
		_mapOptions.zoom = initZoom;
		_mapOptions.center = initLocation;
		_mapOptions.mapTypeId = initMapTypeId;
		_htmlContainerId = htmlContainerId;
		
		_buildings = new Array<Building>();
		_vehicles = new Array<Vehicle>();
	}
	
	private function _display():Void
	{
		_map = new Map(Browser.document.getElementById(_htmlContainerId), _mapOptions);
	}
	
	public function addToGame():Void
	{
		_display();
		
		google.maps.Event.addListener(_map, 'click', function(event) 
		{
			//Lib.alert('Point.X.Y: ' + event.latLng);
			
			var crazyFactory:Factory = TheCityGame.factoryTypes.get("crazyFactory").buildFactory();
			crazyFactory.name="Ergostasio Megaron";
			crazyFactory.position=event.latLng;
			crazyFactory.addToWorld();
		});
	}
}