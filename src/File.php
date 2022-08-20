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

namespace App;

class File {

    private $path;
    private $fullPath;

    private $exists = null;
    private $contents = null;
    private $contentsAsArray = null;

    public function __construct(string $path, bool $isRelative = true) {
        $this->path = $path;

        if ($isRelative) {
            $path = PUBLIC_ROOT . Site::addTrailingSlash($path);
        }

        $this->fullPath = $path;
    }

    public function getPath(): string {
        return $this->path;
    }

    public function exists(): bool {
        if ($this->exists === null) {
            $this->exists = file_exists($this->fullPath);
        }

        return $this->exists;
    }

    public function include(): void {
        if ($this->exists()) {
            include_once($this->fullPath);
        }
    }

    public function get($default = null) {
        if ($this->contents === null && $this->exists()) {
            $this->contents = file_get_contents($this->fullPath);
        }

        return $this->contents ?? $default;
    }

    public function getArray(array $default = null): ?array {
        if ($this->contentsAsArray === null) {
            $jsonString = $this->get();

            if ($jsonString) {
                $this->contentsAsArray = json_decode($jsonString, true);
            }
        }

        return $this->contentsAsArray ?? $default;
    }

    public function render(string $default = ""): void {
        echo $this->get($default);
    }
}
