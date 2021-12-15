<?php

namespace App;

class Template {

    private $path;
    private $data;

    private $exists = null;

    public function __construct(string $path, array $data = []) {
        $this->path = $path;
        $this->data = $data;
    }

    public function exists(): bool {
        if ($this->exists === null) {
            $this->exists = file_exists($this->path);
        }

        return $this->exists;
    }

    public function include(): void {
        if ($this->exists()) {
            include_once($this->path);
        }
    }

    public function __get($key) {
        return $this->data[$key];
    }

    public function __isset($key): bool {
        return array_key_exists($key, $this->data);
    }
}
