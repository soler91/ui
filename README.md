# UI
Custom ingame UI library for TERA.

## Example
**index.js**
```js
const UI = require('ui'),
    Command = require('command')

module.exports = function TestUI(dispatch) {
    const ui = UI(dispatch),
        command = Command(dispatch)

    ui.get(UI.static(__dirname + '/ui'))

    command.add('testui', () => { ui.open() })
}
```
**ui/index.html**
```html
<html>
	<head>
		<script>
			window.addEventListener('error', function(e) {
				_tera_client_proxy_.alert('Error: ' + e.message)
			})

			window.onload = function() {
				_tera_client_proxy_.resize_to(200, 200)
				_tera_client_proxy_.set_title('Test UI')
			}
		</script>
	</head>
	<body>
		Hello ponies!
	</body>
</html>
```

## API
The API is identical to [Express](https://expressjs.com/), with a few notable differences:
* The constructor `UI(dispatch, options)` returns an instance of `UI.Router`.
* `UI.Router` has a new function called `open(path)` which opens an ingame window pointing to the specified route.