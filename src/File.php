<?php
/**
 * A helper class to use when handling files
 *
 * PHP version 7.1+
 *
 * @version 1.0.0
 * @since Class available since Release: v4.12.0
 * @author Jahidul Pabel Islam <me@jahidulpabelislam.com>
 * @copyright 2010-2020 JPI
 */

class File {

    private $path;

    public function __construct(string $path, bool $isRelative = true) {
        if ($isRelative) {
            $path = getProjectRoot() . addTrailingSlash($path);
        }

        $this->path = $path;
    }

    public function exists(): bool {
        return file_exists($this->path);
    }

    public function include() {
        if ($this->exists()) {
            include_once($this->path);
        }
    }

    public function get($default = null) {
        if ($this->exists()) {
            return file_get_contents($this->path);
        }

        return $default;
    }

    public function getArray(array $default = null): ?array {
        $jsonString = $this->get();

        if ($jsonString) {
            return json_decode($jsonString, true);
        }

        return $default;
    }

    public function render(string $default = "") {
        echo $this->get($default);
    }

}
