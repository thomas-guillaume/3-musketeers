# Cash, an easy currency converter

## Installation of the library

In order to install all the packages required to run the app, use the following command :

```sh
❯ cd path/to/workspace/3-musketeers/cash
❯ npm install
```

## Usage of the library

You can now use the library running these commands :

```sh
❯ node bin/index.js <amount> <currency>
❯ node bin/index.js <command>
```

You can replace `<amount>` by the quantity of the currency you want to convert.

You can replace `<currency>` thanks to the list of currencies [here](http://akep.us/currencies).

You can replace `<command>` by
* `--save` or `-s` => Save currencies as default currencies
* `--help` or `-h` => Display help message
* `--version` or `-v` => Display version number

Here are some examples of commands you can run :
```sh
$ node bin/index.js 1 usd

$ node bin/index.js 1 usd eur pln aud

$ node bin/index.js --save usd eur pln aud

$ node bin/index.js --help
```

Enjoy !
