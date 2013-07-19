package net.lazystudios.thecitygame.builders;

import net.lazystudios.thecitygame.core.TheCityGame;
import google.maps.LatLng;
import net.lazystudios.thecitygame.sprites.MapSprite;


/**
 * ...
 * @author Aris Kostakos
 */

class MapSpriteBuilder
{
	//Properties
	private var _mapSprite:MapSprite;
	
	private var _position:LatLng;
	private var _icon:String;
	
	//Setters / Getters
	public var position(get,set) : LatLng;
	function get_position(){ return _position; } 
	function set_position(value){ return _position=value; } 
	
	public var icon(get,set) : String;
	function get_icon(){ return _icon; } 
	function set_icon(value){ return _icon=value; } 
	
	//Methods
	private function build(o:Dynamic):Void
	{
		_mapSprite = o;
		_mapSprite.position = _position;
		_mapSprite.icon = _icon;
	}
}