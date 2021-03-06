// ==UserScript==
// @name         YTM: Always new
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto-next on music that has already been liked or disliked
// @author       Matt Carter <m@ttcarter.com>
// @match        https://music.youtube.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==

var lastTrack = false;


(function() {
    'use strict';

    var checkTrack = ()=> {
        var thisTrack = $('.ytmusic-player-bar > yt-formatted-string.title').text();

        if (!lastTrack || thisTrack != lastTrack) {
            console.log('%cYTM:AN!', 'color: blue', 'Detected song change to', thisTrack);
            setTimeout(()=> { // Let song settle
                var isRated = !! ($('paper-icon-button.dislike[aria-pressed=true]').length || $('paper-icon-button.like[aria-pressed=true]').length);
                console.log('%cYTM:AN!', 'color: blue', 'Detected song change to', thisTrack, 'isRated?', isRated);
                lastTrack = thisTrack;

                if (isRated) {
                    console.log('%cYTM:AN!', 'color: blue', 'Moving to next track');
                    $('paper-icon-button.next-button').trigger('click');
                }
                setTimeout(checkTrack, 1000);
            }, 1000);
        } else {
            setTimeout(checkTrack, 250);
        }
    };

    setTimeout(checkTrack, 2000);
})();