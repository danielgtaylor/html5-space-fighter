HTML5 Space Fighter
===================

An HTML5 game written using GameJS.

Live Version
------------

[Play the game online](http://programmer-art.org/dropbox/fighter-static/index.html "Click here to play!")

Development
-----------

In order to develop please download [GameJS](http://gamejs.org/) first, then
clone this repository into e.g. `gamejs/examples/html5-space-fighter`. When
running the GameJS development server you will now see the game listed and
playable. For example:

    cd gamejs/examples
    git clone git://github.com/danielgtaylor/html5-space-fighter.git
    cd ..
    ./gjs-server.sh

Then go to [localhost:8080](http://localhost:8080/)

Deployment
----------

You can deploy the game as follows, assuming an installation like the steps
given above:

    cd gamejs
    ./gjs-statify.sh examples/html5-space-fighter ~/Desktop/fighter-static

Then you can upload the `fighter-static` folder on your desktop to a web server
to make it publicly accessible.

License
-------
Copyright (c) 2011 Daniel G. Taylor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

