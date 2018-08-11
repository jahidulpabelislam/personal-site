<?php

class Hasher {

	/*
	 * This will generate a hashed value of given string
	 */
	public static function generate($string) {

		$options = [
			'cost' => 11,
		];

		$hashed = password_hash($string, PASSWORD_BCRYPT, $options);

		return $hashed;
	}

	// This will be used to compare a raw string against a stored hash
	public static function check($string, $hash) {

		return password_verify($string, $hash);

	}
}