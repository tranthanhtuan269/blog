<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link rel="stylesheet" type="text/css" href="{{ url('/') }}/public/css/app.css">
	<style type="text/css">
		.chat-hold{
			overflow-y: auto;
			max-height: 200px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="row" id="app">
			<div class="offset-1 col-10">
				<li class="list-group-item active">Chat room <span>@{{ numberOfUsers }}</span></li>
				<ul class="list-group chat-hold" v-chat-scroll>
					<message
					v-for="value, index in chat.message"
					:key="value.index"
					:color=chat.color[index]
					:time=chat.time[index]
					:user=chat.user[index]>
						@{{ value }}
					</message>
					<li class="list-group-item" v-if="typing.length > 0">@{{ typing }}</li>
				</ul>
				<input type="text" class="form-control" placeholder="Type your message here..." v-model="message" @keyup.enter="send">
			</div>
		</div>
	</div>
	<script type="text/javascript" src="{{ url('/') }}/public/js/app.js"></script>
</body>
</html>