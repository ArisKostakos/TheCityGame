package net.lazystudios.thecitygame.data;

import net.lazystudios.thecitygame.core.TheCityGame;



/**
 * ...
 * @author Aris Kostakos
 */

class GoodType
{
	//Properties
	private var _name:String;
	private var _icon:String;
	
	//Setters / Getters
	public var name(get,set) : String;
	function get_name(){ return _name; }  
	function set_name(value){ return _name=value; } 

	public var icon(get,set) : String;
	function get_icon(){ return _icon; } 
	function set_icon(value) { return _icon = value; } 

	//Constructor
	public function new(name:String, icon:String) 
	{
		_name = name;
		_icon = icon;
	}
	
	//Methods
}