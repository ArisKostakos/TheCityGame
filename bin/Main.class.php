<?php

class Main {
	public function __construct() { 
	}
	public function verifyUser($name, $password) {
		Main::$cnx = sys_db_Mysql::connect(_hx_anonymous(array("host" => Main::$hostName, "port" => Main::$hostPort, "user" => Main::$dbUser, "pass" => Main::$dbPass, "socket" => null, "database" => Main::$databaseName)));
		$sql = "SELECT * FROM `user` where name='" . _hx_string_or_null($name) . "' and password='" . _hx_string_or_null($password) . "'";
		$results = Main::$cnx->request($sql)->results();
		Main::$cnx->close();
		if($results->length === 0) {
			return null;
		} else {
			return $results->last();
		}
	}
	public function createUser($name, $password, $money) {
		Main::$cnx = sys_db_Mysql::connect(_hx_anonymous(array("host" => Main::$hostName, "port" => Main::$hostPort, "user" => Main::$dbUser, "pass" => Main::$dbPass, "socket" => null, "database" => Main::$databaseName)));
		$sql = "INSERT INTO user (name, password, money) VALUES ('" . _hx_string_or_null($name) . "', '" . _hx_string_or_null($password) . "', " . _hx_string_rec($money, "") . ")";
		Main::$cnx->request($sql);
		Main::$cnx->close();
	}
	public function createBusiness($name, $type, $longitude, $latitude, $ownerName) {
		Main::$cnx = sys_db_Mysql::connect(_hx_anonymous(array("host" => Main::$hostName, "port" => Main::$hostPort, "user" => Main::$dbUser, "pass" => Main::$dbPass, "socket" => null, "database" => Main::$databaseName)));
		$sql = "INSERT INTO business (name, type, longitude, latitude, ownerName) VALUES ('" . _hx_string_or_null($name) . "', '" . _hx_string_or_null($type) . "', " . _hx_string_or_null($longitude) . ", " . _hx_string_or_null($latitude) . ", '" . _hx_string_or_null($ownerName) . "')";
		Main::$cnx->request($sql);
		Main::$cnx->close();
		php_Lib::hprint("success");
	}
	public function createFactory($name, $type, $longitude, $latitude, $ownerName, $availableTrucks) {
		Main::$cnx = sys_db_Mysql::connect(_hx_anonymous(array("host" => Main::$hostName, "port" => Main::$hostPort, "user" => Main::$dbUser, "pass" => Main::$dbPass, "socket" => null, "database" => Main::$databaseName)));
		$sql = "INSERT INTO factory (name, type, longitude, latitude, ownerName, availableTrucks) VALUES ('" . _hx_string_or_null($name) . "', '" . _hx_string_or_null($type) . "', " . _hx_string_or_null($longitude) . ", " . _hx_string_or_null($latitude) . ", '" . _hx_string_or_null($ownerName) . "', " . _hx_string_or_null($availableTrucks) . ")";
		Main::$cnx->request($sql);
		Main::$cnx->close();
		php_Lib::hprint("success");
	}
	public function refreshBuildings() {
		Main::$cnx = sys_db_Mysql::connect(_hx_anonymous(array("host" => Main::$hostName, "port" => Main::$hostPort, "user" => Main::$dbUser, "pass" => Main::$dbPass, "socket" => null, "database" => Main::$databaseName)));
		$sql = "SELECT * FROM `factory`";
		$results = Main::$cnx->request($sql)->results();
		Main::$cnx->close();
		php_Lib::hprint(haxe_Serializer::run($results));
	}
	static $cnx;
	static $instance;
	static $hostName = "db20.grserver.gr";
	static $hostPort = 3306;
	static $databaseName = "thecitygame";
	static $dbUser = "llaffer";
	static $dbPass = "r0diof";
	static function main() {
		Main::$instance = new Main();
		$params = php_Web::getParams();
		if($params->exists("action")) {
			if($params->get("action") === "SignUp") {
				Main::signUp($params->get("signUp_username"), $params->get("signUp_password"));
			}
			if($params->get("action") === "SignIn") {
				Main::signIn($params->get("signIn_username"), $params->get("signIn_password"));
			}
			if($params->get("action") === "createFactory") {
				Main::$instance->createFactory($params->get("name"), $params->get("type"), $params->get("longitude"), $params->get("latitude"), $params->get("ownerName"), $params->get("availableTrucks"));
			}
			if($params->get("action") === "createBusiness") {
				Main::$instance->createBusiness($params->get("name"), $params->get("type"), $params->get("longitude"), $params->get("latitude"), $params->get("ownerName"));
			}
			if($params->get("action") === "refreshBuildings") {
				Main::$instance->refreshBuildings();
			}
		} else {
			php_Lib::hprint("Php service can't be run directly");
		}
	}
	static function signUp($username, $password) {
		Main::$instance->createUser($username, $password, 4000000);
		php_Lib::hprint("success");
	}
	static function signIn($username, $password) {
		$user = Main::$instance->verifyUser($username, $password);
		if($user === null) {
			php_Lib::hprint("invalid");
		} else {
			php_Lib::hprint(haxe_Serializer::run($user));
		}
	}
	function __toString() { return 'Main'; }
}
