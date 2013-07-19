package net.lazystudios.thecitygame.core;


import google.maps.LatLng;
import net.lazystudios.thecitygame.builders.BusinessBuilder;
import net.lazystudios.thecitygame.builders.FactoryBuilder;
import net.lazystudios.thecitygame.data.GoodType;
import net.lazystudios.thecitygame.sprites.Business;
import net.lazystudios.thecitygame.sprites.Factory;
import net.lazystudios.thecitygame.elements.World;


/**
 * ...
 * @author Aris Kostakos
 */

class TheCityGame
{
	//Properties
	private static var _world:World;
	private static var _factoryTypes:Map<String,FactoryBuilder>;
	private static var _businessTypes:Map<String,BusinessBuilder>;
	private static var _goodTypes:Map<String,GoodType>;
	
	//Setters / Getters
	public static var world(get,never) : World;
	static function get_world(){ return _world; }  
	
	public static var factoryTypes(get,never) : Map<String,FactoryBuilder>;
	static function get_factoryTypes() { return _factoryTypes; }
	
	public static var businessTypes(get,never) : Map<String,BusinessBuilder>;
	static function get_businessTypes() { return _businessTypes; }
	
	public static var goodTypes(get,never) : Map<String,GoodType>;
	static function get_goodTypes() { return _goodTypes; }
	
	public static function init() 
	{
		//Import Data
		gameConfiguration();
		
		//Create Map
		_world.addToGame();
		
		/*
		//Create Some Factories
		var crazyFactory:Factory = crazyFactoryBuilder.buildFactory();
		crazyFactory.name="Ergostasio Megaron";
		crazyFactory.position=new LatLng(38.00, 23.30);
		crazyFactory.addToWorld();
		///
		//Create Some Businesses
		var bakery:Business = BakeryBuilder.buildBusiness();
		bakery.name="Xoriatiko";
		bakery.position=new LatLng(37.97, 23.77);
		bakery.addToWorld();
		///
		var retailStore:Business = RetailStoreBuilder.buildBusiness();
		retailStore.name="Gap";
		retailStore.position=new LatLng(38.17, 23.15);
		retailStore.addToWorld();
		///
		var bar:Business = BarBuilder.buildBusiness();
		bar.name="Akrotiri";
		bar.position=new LatLng(37.87, 23.67);
		bar.addToWorld();
		*/
	}
  
	/*
	* Normally, this function will import data from an external XML file
	* Temporarilly, game data will be entered with code
	* code-data separation is linked by this function
	*/
	private static function gameConfiguration():Void
	{
		//Set Up World
		_world = new World(new LatLng(37.98, 23.53));
		
		//Set Up Goods
		_goodTypes = new Map<String,GoodType>();
		registerGoodType(new GoodType("Bread", "")); //from xml
		registerGoodType(new GoodType("Clothes", "")); //from xml
		registerGoodType(new GoodType("Wine", "")); //from xml
		
		//Set Up Factory Types
		_factoryTypes = new Map<String,FactoryBuilder>();
		var factoryBuilder:FactoryBuilder;
		
		factoryBuilder = new FactoryBuilder();
		factoryBuilder.icon = 'Factory.png';  //from xml
		factoryBuilder.cost = 1500000;  //from xml
		factoryBuilder.type = "crazyFactory";
		factoryBuilder.productionType.push(_goodTypes.get("Bread")); //from xml
		factoryBuilder.productionType.push(_goodTypes.get("Clothes")); //from xml
		factoryBuilder.productionType.push(_goodTypes.get("Wine")); //from xml
		factoryBuilder.availableTrucks = 2; //from xml
		registerFactoryBuilder(factoryBuilder);
		
		//Set Up Business Types
		_businessTypes = new Map<String,BusinessBuilder>();
		var businessBuilder:BusinessBuilder;
		
		businessBuilder = new BusinessBuilder();
		businessBuilder.icon = 'Business.png';  //from xml
		businessBuilder.cost = 500000;  //from xml
		businessBuilder.type = "Bakery";
		businessBuilder.productType.push(_goodTypes.get("Bread")); //from xml
		registerBusinessBuilder(businessBuilder);
		
		businessBuilder = new BusinessBuilder();
		businessBuilder.icon = 'Business.png';  //from xml
		businessBuilder.cost = 500000;  //from xml
		businessBuilder.type = "Retail Store";
		businessBuilder.productType.push(_goodTypes.get("Clothes")); //from xml
		registerBusinessBuilder(businessBuilder);
		
		businessBuilder = new BusinessBuilder();
		businessBuilder.icon = 'Business.png';  //from xml
		businessBuilder.cost = 500000;  //from xml
		businessBuilder.type = "Bar";
		businessBuilder.productType.push(_goodTypes.get("Wine")); //from xml
		registerBusinessBuilder(businessBuilder);
  }
  
  private static function registerFactoryBuilder(factoryBuilder:FactoryBuilder):Void
  {
	  _factoryTypes.set(factoryBuilder.type, factoryBuilder);
  }
  
  private static function registerBusinessBuilder(businessBuilder:BusinessBuilder):Void
  {
	  _businessTypes.set(businessBuilder.type, businessBuilder);
  }
  
  private static function registerGoodType(goodType:GoodType):Void
  {
	  _goodTypes.set(goodType.name, goodType);
  }
}