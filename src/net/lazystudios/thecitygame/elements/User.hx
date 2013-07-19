package net.lazystudios.thecitygame.elements;

import net.lazystudios.thecitygame.core.TheCityGame;



/**
 * ...
 * @author Aris Kostakos
 */

class User
{
	//Properties
	private var _name:String;
	private var _password:String;
	private var _money:Float;
	
	//Setters / Getters
	public var name(get,set) : String;
	function get_name(){ return _name; }  
	function set_name(value){ return _name=value; } 

	public var password(get,set) : String;
	function get_password(){ return _password; } 
	function set_password(value) { return _password = value; } 
	
	public var money(get,set) : Float;
	function get_money(){ return _money; } 
	function set_money(value){ return _money=value; } 

	//Constructor
	public function new(name:String, password:String = "123", money:Float = 5000000) 
	{
		_name = name;
		_password = password;
		_money = money;
	}
	
	//Methods
}