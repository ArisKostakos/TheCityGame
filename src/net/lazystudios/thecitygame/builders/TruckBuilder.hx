package net.lazystudios.thecitygame.builders;

import net.lazystudios.thecitygame.core.TheCityGame;
import net.lazystudios.thecitygame.data.GoodType;
import net.lazystudios.thecitygame.data.Itenary;
import net.lazystudios.thecitygame.elements.User;
import net.lazystudios.thecitygame.sprites.Truck;


/**
 * ...
 * @author Aris Kostakos
 */

class TruckBuilder extends VehicleBuilder
{
	//Properties
	private var _truck:Truck;
	
	private var _shipment:Map<String,Int>;
	private var _owner:User;
	private var _cost:Float;
	private var _itenary:Itenary;
	private var _headingTo:Building;
	
	//Setters / Getters
	public var shipment(get,null) : Map<String,Int>;
	function get_shipment(){ return _shipment; } 
	
	public var owner(get,set) : User;
	function get_owner(){ return _owner; } 
	function set_owner(value) { return _owner = value; } 
	
	public var cost(get,set) : Float;
	function get_cost(){ return _cost; } 
	function set_cost(value){ return _cost=value; } 

	public var itenary(get,set) : Itenary;
	function get_itenary(){ return _itenary; } 
	function set_itenary(value) { return _itenary = value; } 
	
	public var headingTo(get,set) : Building;
	function get_headingTo(){ return _headingTo; } 
	function set_headingTo(value){ return _headingTo=value; } 

	public function new() 
	{ 
		_shipment = new Map<String,Int>();
	}
	
	//Methods
	public function buildTruck():Truck
	{
		_truck = new Truck();
		
		for ( goodTypeName in _shipment.keys() )
			_truck.shipment.set(goodTypeName, _shipment.get(goodTypeName));

		_truck.owner = _owner;
		
		_truck.cost = _cost;
		
		_truck.itenary = _itenary;
			
		_truck.headingTo = _headingTo;
		
		build(_truck);
		return _truck;
	}
}