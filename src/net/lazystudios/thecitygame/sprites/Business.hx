package net.lazystudios.thecitygame.sprites;

import net.lazystudios.thecitygame.core.TheCityGame;
import net.lazystudios.thecitygame.data.GoodType;
import net.lazystudios.thecitygame.elements.User;


/**
 * ...
 * @author Aris Kostakos
 */

class Business extends Building
{
	//Properties
	private var _productType:Array<GoodType>;
	private var _inventory:Map<String,Int>;
	private var _owner:User;
	private var _cost:Float;
	
	//Setters / Getters
	public var productType(get,null) : Array<GoodType>;
	function get_productType(){ return _productType; } 
	
	public var inventory(get,null) : Map<String,Int>;
	function get_inventory(){ return _inventory; } 
	
	public var owner(get,set) : User;
	function get_owner(){ return _owner; } 
	function set_owner(value) { return _owner = value; } 
	
	public var cost(get,set) : Float;
	function get_cost(){ return _cost; } 
	function set_cost(value){ return _cost=value; } 


	public function new() 
	{ 
		_productType = new Array<GoodType>();
		_inventory = new Map<String,Int>();
	}
	
	//Methods
	override private function display():Void
	{
		super.display();
	}
}