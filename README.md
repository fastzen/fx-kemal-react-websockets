# fx

Paul Houghton's [FX](https://github.com/paulhoughton/fx) served by [Kemal](http://kemalcr.com/)/[Crystal](https://crystal-lang.org/) (and no Socket.io). 

Data from https://www.truefx.com/ api sent over websockets

## Installation

### To build the client

`cd public`

`npm install`

`npm install -g rollup`

`rollup -c`

### To build the server

`shards install`

`crystal build --release src/fx.cr`

## Usage

`./fx`

Then navigate to [http://0.0.0.0:3000](http://0.0.0.0:3000)

A demo is at [https://fx-kemal-react-websockets.herokuapp.com/](https://fx-kemal-react-websockets.herokuapp.com/)

## Development

TODO: Write development instructions here

## Contributing

1. Fork it ( https://github.com/fastzen/fx/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## Contributors

- [fastzen](https://github.com/fastzen) Alastair Aitken - creator, maintainer
