package net.lazystudios.thecitygame.data;

import net.lazystudios.thecitygame.core.TheCityGame;
import net.lazystudios.thecitygame.sprites.Building;

		

/**
 * ...
 * @author Aris Kostakos
 */

class Itenary
{
	//Properties
	private var _departureFrom:Building;
	private var _destination:Building;
	private var _roundTrip:Bool;
	
	//Setters / Getters
	public var departureFrom(get,set) : Building;
	function get_departureFrom(){ return _departureFrom; }  
	function set_departureFrom(value){ return _departureFrom=value; } 

	public var destination(get,set) : Building;
	function get_destination(){ return _destination; } 
	function set_destination(value) { return _destination = value; } 
	
	public var roundTrip(get,set) : Bool;
	function get_roundTrip(){ return _roundTrip; } 
	function set_roundTrip(value) { return _roundTrip = value; } 

	//Constructor
	public function new(departureFrom:String, destination:String, roundTrip:Bool) 
	{
		_departureFrom = departureFrom;
		_destination = destination;
		_roundTrip = roundTrip;
	}
	
	//Methods
}