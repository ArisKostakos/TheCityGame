package net.lazystudios.thecitygame.sprites;

import net.lazystudios.thecitygame.core.TheCityGame;
import google.maps.LatLng;
import google.maps.Marker;
import google.maps.MarkerOptions;


/**
 * ...
 * @author Aris Kostakos
 */

class MapSprite
{
	//Properties
	private var _position:LatLng;
	private var _icon:String;
	private var _marker:Marker;
	private var _markerOptions:MarkerOptions;
	
	//Setters / Getters
	public var position(get,set) : LatLng;
	function get_position(){ return _position; } 
	function set_position(value){ return _position=value; } 
	
	public var icon(get,set) : String;
	function get_icon(){ return _icon; } 
	function set_icon(value){ return _icon=value; } 
	
	//Methods
	private function display():Void
	{
		_markerOptions=untyped {};
		_markerOptions.position = _position;
		_markerOptions.map = TheCityGame.world.map;
		_markerOptions.icon = _icon;
		//_markerOptions.title = "xxxxxxx";
		
		_marker = new Marker(_markerOptions);
	}
}