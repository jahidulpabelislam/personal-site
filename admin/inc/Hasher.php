<?php

class Hasher {

	// this will be used to compare a password against a hash
	public static function checkPassword($hash, $password)
	{
		$salt = substr($hash, 0, SALT_LENGTH);
		$newHash = crypt($password, $salt);
		return $hash == $newHash;
	}
}