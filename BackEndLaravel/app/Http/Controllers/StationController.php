<?php

namespace App\Http\Controllers;

use App\Models\Station;
use Illuminate\Http\Request;

class StationController extends Controller
{
    // Get all stations.
    public function index()
    {
        $stations = Station::orderBy('id', 'desc')->get();

        return response()->json($stations);
    }

    // Save a new station.
    public function store(Request $request)
    {
        $validated = $request->validate([
            'station_name' => 'required|string|max:100',
            'tier' => 'required|string|max:100',
            'hourly_rate' => 'required|numeric|min:0.01'
        ]);

        $station = Station::create($validated);

        return response()->json($station, 201);
    }

    // Get one station.
    public function show($id)
    {
        $station = Station::find($id);

        if (!$station) {
            return response()->json([
                'message' => 'Station not found.'
            ], 404);
        }

        return response()->json($station);
    }
}