package net.lazystudios.thecitygame.sprites;

import net.lazystudios.thecitygame.core.TheCityGame;



/**
 * ...
 * @author Aris Kostakos
 */

class Vehicle extends MapSprite
{
	//Properties
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
	override private function display():Void
	{
		super.display();
	}
	
	public function addToWorld():Void
	{
		TheCityGame.world.vehicles.push(this);
		display();
	}
}