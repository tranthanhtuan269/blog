<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ChatEvent;

class ChatController extends Controller
{
	/**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function chat(){
    	return view('chat');
    }

    public function send(Request $request){
    	$user = \Auth::user();
    	event(new ChatEvent($request->message, $user));
    }
}
