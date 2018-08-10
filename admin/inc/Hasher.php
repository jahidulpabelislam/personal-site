<?php

class Hasher {

	// this will be used to compare a password against a hash
	public static function checkPassword($password, $hash) {

		$newHash = password_verify($password, $hash);
		return $hash == $newHash;

	}
}