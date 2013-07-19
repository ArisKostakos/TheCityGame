package net.lazystudios.thecitygame.builders;

import net.lazystudios.thecitygame.core.TheCityGame;
import net.lazystudios.thecitygame.sprites.Vehicle;



/**
 * ...
 * @author Aris Kostakos
 */

class VehicleBuilder extends MapSpriteBuilder
{
	//Properties
	private var _vehicle:Vehicle;
	
	private var _name:String;
	private var _type:String;
	
	//Setters / Getters
	public var name(get,set) : String;
	function get_name(){ return _name; } 
	function set_name(value){ return _name=value; } 
	
	public var type(get,set) : String;
	function get_type(){ return _type; } 
	function set_type(value){ return _type=value; } 
	
	
	//Methods
	override private function build(o:Dynamic):Void
	{
		_vehicle = o;
		_vehicle.name = _name;
		_vehicle.type = _type;
		super.build(_vehicle);
	}
}