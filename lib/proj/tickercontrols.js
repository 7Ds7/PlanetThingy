(function(window) {

    /**
     * expand easeljs' Ticker with manual tick function.
     * usage: TickerControls.init() after Ticker is loaded
     */

    // this function is equivalent to the original tick(),
    // with the exception of running even when Ticker is paused.
    if( Ticker && !Ticker.manualTick ) {

        Ticker.manualTick = function() {

            Ticker._ticks++;

            var time = Ticker._getTime();
            var elapsedTime = time-Ticker._lastTime;
            var paused = Ticker._paused;

            if (paused) {
                Ticker._pausedTickers++;
                Ticker._pausedTime += elapsedTime;
            }
            Ticker._lastTime = time;

            var pauseable = Ticker._pauseable;
            var listeners = Ticker._listeners.slice();
            var l = listeners ? listeners.length : 0;
            for (var i=0; i<l; i++) {
                var listener = listeners[i];
                if (listener == null ) { continue; }
                if (listener.tick) { listener.tick(elapsedTime, paused); }
                else if (listener instanceof Function) { listener(elapsedTime, paused); }
            }

            Ticker._tickTimes.unshift(Ticker._getTime()-time);
            while (Ticker._tickTimes.length > 100) { Ticker._tickTimes.pop(); }

            Ticker._times.unshift(time);
            while (Ticker._times.length > 100) { Ticker._times.pop(); }

        }

    }

    // TickerControls is a singleton - we don't need to
    // instantiate it, so we just make it an object
    var TickerControls = {};

    // create UI and set up event handlers
    TickerControls.init = function() {

        // set up UI elements
        var container = document.createElement('div');
        container.setAttribute('id', 'tickerControls');

        var play = document.createElement('button');
        play.setAttribute('id', 'tc_play');
        play.innerHTML = 'play';
        container.appendChild(play);

        var pause = document.createElement('button');
        pause.setAttribute('id', 'tc_pause');
        pause.innerHTML = 'pause';
        container.appendChild(pause);

        var next = document.createElement('button');
        next.setAttribute('id', 'tc_next');
        next.innerHTML = 'next';
        container.appendChild(next);

        document.body.appendChild(container);

        // set up event handlers for UI elements
        play.addEventListener('click', TickerControls.play, false);
        pause.addEventListener('click', TickerControls.pause, false);
        next.addEventListener('click', TickerControls.next, false);
    };

    TickerControls.play = function() {
        Ticker.setPaused(false);
    };

    TickerControls.pause = function() {
        Ticker.setPaused(true);
    };

    TickerControls.next = function() {
        Ticker.manualTick();
    };

    // export TickerControls
    window.TickerControls = TickerControls;

})(window);

