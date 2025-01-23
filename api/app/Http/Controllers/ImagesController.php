<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use App\Http\Resources\ImageResource;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ImageResource::collection(Image::query()->orderBy('created_at', 'desc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImageRequest $request)
    {
        $path = $request->file('image')->store('images', 'public');
        $image = Image::create([
            'path' => $path,
            'title' => $request->title,
            'alt' => $request->alt,
        ]);

        return ImageResource::make($image);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        return ImageResource::make($image);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImageRequest $request, Image $image)
    {
        $image->update($request->validated());

        return ImageResource::make($image);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        $image->delete();

        return response()->noContent();
    }
}
