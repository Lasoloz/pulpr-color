# pulpr-color

Color and theming utilities for a pulpy and colorful framework-agnostic styling tool.

## Introduction

pulpy + purple = pulpr

`pulpr` is a WIP (work in progress) library for creating modern web applications. `pulpr` contains scss and JavaScript
modules to achieve a faster development process while minimizing its footprint. It is recommended
(but not necessary though) to use the Sass/scss version whenever it is possible, as it compiles
only the most important parts of the library and nothing more.


## Color module

**NOTE**: This description lists features of the WIP product. Not all features are implemented yet!

The color module contains scss mixins and functions to create themes and theme based classes for
your application. Also, `pulpr-color` natively supports CSS custom properties (aka. CSS variables),
allowing chaning the color dynamically in modern browsers while also supporting fallback
definitions for older browser.

The JavaScript utilities also provide a fallback for dynamic coloring on older platforms.


## Usage:

TODO: Important notice about including both the library and both the node_modules for mathsass!
Coming soon!


## Building/development

- You can install the dependencies for building/development with:

    ```sh
    $ yarn install
    ```

- Building the application

    ```sh
    $ yarn build
    ```

    This puts the compiled css files into the `/dist` directory.

- Serving the application for development (with HMR)

    ```sh
    $ yarn serve
    ```

    The application will be served through [`parcel`](https://parceljs.org)
