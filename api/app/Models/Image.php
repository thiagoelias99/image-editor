<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasUuids;

    protected $fillable = [
        'path',
        'title',
        'alt',
    ];
}
