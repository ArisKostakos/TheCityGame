package net.lazystudios.thecitygame.builders;

import net.lazystudios.thecitygame.core.TheCityGame;
import net.lazystudios.thecitygame.data.GoodType;
import net.lazystudios.thecitygame.elements.User;
import net.lazystudios.thecitygame.sprites.Factory;

/**
 * ...
 * @author Aris Kostakos
 */

class FactoryBuilder extends BuildingBuilder
{
	//Properties
	private var _factory:Factory;
	
	private var _productionType:Array<GoodType>;
	private var _availableTrucks:Int;
	private var _inventory:Map<String,Int>;
	private var _owner:User;
	private var _cost:Float;
	
	//Setters / Getters
	public var productionType(get,null) : Array<GoodType>;
	function get_productionType(){ return _productionType; }  
	
	public var availableTrucks(get,set) : Int;
	function get_availableTrucks(){ return _availableTrucks; } 
	function set_availableTrucks(value) { return _availableTrucks = value; } 
	
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
		_productionType = new Array<GoodType>();
		_inventory = new Map<String,Int>();
	}
	
	//Methods
	public function buildFactory():Factory
	{
		_factory = new Factory();
		
		for ( goodType in _productionType )
			_factory.productionType.push(goodType);

		_factory.availableTrucks = _availableTrucks;
		
		for ( goodTypeName in _inventory.keys() )
			_factory.inventory.set(goodTypeName, _inventory.get(goodTypeName));
			
		_factory.owner = _owner;
		
		_factory.cost = _cost;
		
		build(_factory);
		return _factory;
	}
}