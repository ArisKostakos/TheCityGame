package net.lazystudios.thecitygame.ui;
import google.maps.LatLng;
import js.html.DivElement;
import js.html.ImageElement;
import net.lazystudios.thecitygame.core.TheCityGame;
import js.Browser;
import js.html.ButtonElement;
import js.html.CSSStyleDeclaration;
import js.html.CSSStyleRule;
import js.html.Element;
import js.html.Event;
import js.html.FormElement;
import js.html.InputElement;
import js.Lib;
import net.lazystudios.thecitygame.elements.User;
import net.lazystudios.thecitygame.sprites.Factory;
import net.lazystudios.thecitygame.sprites.Business;
import net.lazystudios.thecitygame.builders.FactoryBuilder;
import net.lazystudios.thecitygame.builders.BusinessBuilder;

/**
 * ...
 * @author Aris Kostakos
 */
class MainInterface
{
	private static var _quickLogin:Bool=false;
	
	private static var _loginUsername:String;
	private static var _loginPassword:String;
	private static var _serverUrl:String = "../TCG_Server/index.php";
	
	public static function init()
	{
		if (_quickLogin == false)
		{
			createInitialLoginControls();
		}
		else
		{
			TheCityGame.loggedInUser = new User("Aris", "123", 4000000);
				
			hideUserPane();
			showControlsUI();
			setupControlsUI();
		}
		
		server_refreshBuildings();
		google.maps.Event.addListener(TheCityGame.world.map, 'click', onClick);
	}

	
	public static function onClick(event):Void
	{
		if (TheCityGame.loggedInUser != null)
		{
			server_createFactory(event);
		}
	}
	
	
	public static function server_createFactory(event):Void
	{
		var crazyFactory:Factory = TheCityGame.factoryTypes.get("crazyFactory").buildFactory();
		
		crazyFactory.name = "unnamed";
		crazyFactory.position=event.latLng;
		crazyFactory.owner = TheCityGame.loggedInUser;
		
		var r = new haxe.Http(_serverUrl);
		r.onError = function(r) { setContent("traceDiv", r); };
		r.onData = onCreateFactoryResponse;
		r.setParameter("action", "createFactory");
		r.setParameter("name", crazyFactory.name);
		r.setParameter("type", crazyFactory.type);
		r.setParameter("longitude", Std.string(crazyFactory.position.lng()));
		r.setParameter("latitude", Std.string(crazyFactory.position.lat()));
		r.setParameter("ownerName", crazyFactory.owner.name);
		r.setParameter("availableTrucks", Std.string(crazyFactory.availableTrucks));
		r.request(true);
		
		crazyFactory.addToWorld();
	}
	
	public static function server_refreshBuildings():Void
	{
		var r = new haxe.Http(_serverUrl);
		r.onError = function(r) { setContent("traceDiv", r); };
		r.onData = onRefreshBuildingsResponse;
		r.setParameter("action", "refreshBuildings");
		r.request(true);
	}
	
	public static function onCreateFactoryResponse(r):Void
	{
		//setContent("traceDiv", r);
	}
	
	public static function onRefreshBuildingsResponse(r):Void
	{
		var results:List<Dynamic> = haxe.Unserializer.run(r);
		//setContent("traceDiv", results.first().latitude);
		
		for (factoryEntry in results)
		{
			var crazyFactory:Factory = TheCityGame.factoryTypes.get("crazyFactory").buildFactory();
			crazyFactory.name = factoryEntry.name;
			crazyFactory.position = new LatLng(factoryEntry.latitude, factoryEntry.longitude);
			crazyFactory.availableTrucks = factoryEntry.availableTrucks;
			crazyFactory.owner = new User(factoryEntry.ownerName);
			crazyFactory.addToWorld();
		}
	}
	
	public static function pleaseWaitLoginControls():Void
	{
		var loginControls:Element = Browser.document.getElementById("loginControls");
		loginControls.innerHTML = "Please Wait...";
	}
	
	public static function clearLoginControls():Void
	{
		var loginControls:Element = Browser.document.getElementById("loginControls");
		loginControls.innerHTML = "";
	}
	
	private static function createInitialLoginControls():Void
	{
		var button:ButtonElement;
		var loginControls:Element = Browser.document.getElementById("loginControls");
		loginControls.innerHTML = "";
		button = Browser.document.createButtonElement();
		button.innerHTML = "Sign Up";
		button.onclick = onSignUp;
		loginControls.appendChild(button);
		
		button = Browser.document.createButtonElement();
		button.innerHTML = "Sign In";
		button.onclick=onSignIn;
		loginControls.appendChild(button);
	}
	
	private static function createSignUpForm():Void
	{
		var loginControls:Element = Browser.document.getElementById("loginControls");
		loginControls.innerHTML = 'Username: <input type="text" id="signUp_username"> Password: <input type="password" id="signUp_password"><button id="signUp_submit">Register</button>';
		Browser.document.getElementById("signUp_submit").onclick=onSignUpSubmit;
	}
	
	private static function createSignInForm():Void
	{
		var loginControls:Element = Browser.document.getElementById("loginControls");
		loginControls.innerHTML = 'Username: <input type="text" id="signIn_username"> Password: <input type="password" id="signIn_password"><button id="signIn_submit">Log In</button>';
		Browser.document.getElementById("signIn_submit").onclick=onSignInSubmit;
	}
	
	
	private static function onSignUp(e:Event)
	{
		clearWarnings();
		createSignUpForm();
	}
	
	private static function onSignUpSubmit(e:Event)
	{
		_loginUsername = cast(Browser.document.getElementById("signUp_username"), InputElement).value;
		_loginPassword = cast(Browser.document.getElementById("signUp_password"), InputElement).value;
		
		var r = new haxe.Http(_serverUrl);
		r.onError = function(r) { setContent("traceDiv", r); };
		r.onData = onSignUpResult;
		r.setParameter("action", "SignUp");
		r.setParameter("signUp_username", cast(Browser.document.getElementById("signUp_username"),InputElement).value);
		r.setParameter("signUp_password", cast(Browser.document.getElementById("signUp_password"),InputElement).value);
		r.request(true);
		pleaseWaitLoginControls();
	}
	
	private static function onSignUpResult(r)
	{
		if (r == "success")
		{
			loginRequest();
		}
		else 
		{
			createInitialLoginControls();
		}
	}
	
	private static function onSignIn(e:Event)
	{
		clearWarnings();
		createSignInForm();
	}
	
	private static function onSignInSubmit(e:Event)
	{
		_loginUsername = cast(Browser.document.getElementById("signIn_username"), InputElement).value;
		_loginPassword = cast(Browser.document.getElementById("signIn_password"), InputElement).value;
		
		loginRequest();
	}
	
	private static function loginRequest():Void
	{
		var r = new haxe.Http(_serverUrl);
		r.onError = function(r) { setContent("traceDiv", r); };
		r.onData = onSignInResult;
		r.setParameter("action", "SignIn");
		r.setParameter("signIn_username", _loginUsername);
		r.setParameter("signIn_password", _loginPassword);
		r.request(true);
		pleaseWaitLoginControls();
	}
	
	private static function onSignInResult(r)
	{
		if (r == "invalid")
		{
			createInitialLoginControls();
			showWarning("Username/password incorrect");
		}
		else 
		{
			var user = haxe.Unserializer.run(r);
			TheCityGame.loggedInUser = new User(user.name, user.password, user.money);
			
			hideUserPane();
			showControlsUI();
			setupControlsUI();
		}
	}
	
	private static function setupControlsUI():Void
	{
		//Username and Money
		Browser.document.getElementById("ui_name").innerHTML = TheCityGame.loggedInUser.name;
		Browser.document.getElementById("ui_MoneyValue").innerHTML = Std.string(TheCityGame.loggedInUser.money);
		
		var buildingContainer:DivElement;
		var imageElement:ImageElement;
		var infoDiv:DivElement;
		
		//Available Factory Buildings	
		var FactoryBuildings:Element = Browser.document.getElementById("FactoryBuildings");
		for ( factoryBuilder in TheCityGame.factoryTypes )
		{
			buildingContainer = Browser.document.createDivElement();
			buildingContainer.style.display = "block";
			
			imageElement = Browser.document.createImageElement();
			imageElement.src = factoryBuilder.icon;
			imageElement.style.display = "inline-block";
			imageElement.style.float = "left";
			imageElement.style.width = "70px";
			
			infoDiv = Browser.document.createDivElement();
			infoDiv.style.paddingLeft = "10px";
			infoDiv.style.display = "inline-block";
			infoDiv.style.float = "right";
			infoDiv.style.overflow = "hidden";
			infoDiv.style.color = "#FFFFFF";
			infoDiv.innerHTML = "Type: " + factoryBuilder.type+"<br>Cost: $" + factoryBuilder.cost+"<br>Produces: ";

			for ( i in 0...factoryBuilder.productionType.length ) 
			{
				infoDiv.innerHTML += factoryBuilder.productionType[i].name;
				if (i < factoryBuilder.productionType.length - 1) infoDiv.innerHTML += ', ';
			}
			
			buildingContainer.appendChild(imageElement);
			buildingContainer.appendChild(infoDiv);
			FactoryBuildings.appendChild(buildingContainer);
		}
		
		
		//Available Business Buildings
		var BusinessBuildings:Element = Browser.document.getElementById("BusinessBuildings");
		for ( businessBuilder in TheCityGame.businessTypes )
		{
			buildingContainer = Browser.document.createDivElement();
			buildingContainer.style.display = "block";
			buildingContainer.style.paddingTop = "15px";
			imageElement = Browser.document.createImageElement();
			imageElement.src = businessBuilder.icon;
			imageElement.style.display = "inline-block";
			imageElement.style.float = "left";
			imageElement.style.width = "70px";
			
			infoDiv = Browser.document.createDivElement();
			infoDiv.style.paddingLeft = "10px";
			infoDiv.style.display = "inline-block";
			infoDiv.style.float = "right";
			infoDiv.style.overflow = "hidden";
			infoDiv.style.color = "#FFFFFF";
			infoDiv.innerHTML = "Type: " + businessBuilder.type+"<br>Cost: $" + businessBuilder.cost+"<br>Sells: ";

			for ( i in 0...businessBuilder.productType.length ) 
			{
				infoDiv.innerHTML += businessBuilder.productType[i].name;
				if (i < businessBuilder.productType.length - 1) infoDiv.innerHTML += ', ';
			}
			
			buildingContainer.appendChild(imageElement);
			buildingContainer.appendChild(infoDiv);
			BusinessBuildings.appendChild(buildingContainer);
		}
	}
	
	
	private static function hideUserPane():Void
	{
		var userPane:Element = Browser.document.getElementById("userPane");
		userPane.style.height = "0px";
		userPane.style.visibility = "hidden";
		userPane.innerHTML = "";
	}
	
	private static function showControlsUI():Void
	{
		var controlsUI:Element = Browser.document.getElementById("controlsUI");
		controlsUI.style.visibility = "visible";
		
		var controlsContainer:Element = Browser.document.getElementById("controlsContainer");
		controlsContainer.style.visibility = "visible";
	}
	
	private static function showUserInfo():Void
	{
		var userInfo:Element = Browser.document.getElementById("userInfo");
		userInfo.innerHTML = "Welcome " + _loginUsername+".";
	}
	
	private static function showWarning(warningText:String):Void
	{
		var warnings:Element = Browser.document.getElementById("warnings");
		warnings.innerHTML = warningText;
	}
	
	private static function clearWarnings():Void
	{
		var warnings:Element = Browser.document.getElementById("warnings");
		warnings.innerHTML = "";
	}
	
	// change the HTML content of a DIV based on its ID
    static function setContent(id, content) 
	{
        var d = Browser.document.getElementById(id);
        if( d == null )
            js.Lib.alert("Unknown element : "+id);
        d.innerHTML = content;
    }
	
	private static function AjaxExamples(e:Event)
	{
	   //Sychronous
	    var result = haxe.Http.requestUrl(_serverUrl);
        setContent('traceDiv',  result);
	  
	    //Asychronous
		var r = new haxe.Http(_serverUrl);
		r.onError = function(r) { setContent("traceDiv", r); };
		r.onData = function(r) { setContent("traceDiv", r); };
		r.request(false);
	}
	
}