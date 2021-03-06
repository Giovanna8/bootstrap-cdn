'use strict';

var fs  = require('fs');
var sri = require('sri-toolbox');

// create datestamp on startup
var cacheBuster = Date.now().toString();

function buster(uri) {
    return uri + '?' + cacheBuster;
}

function sriDigest(file, fromString) {
    file = fromString ? file : fs.readFileSync(file);
    return sri.generate({ algorithms: ['sha384'] }, file);
}

function selectedTheme(config, selected) {
    if (typeof selected === 'undefined' || selected === 'undefined') {
        return config.theme;
    }

    return parseInt(selected, 10) === 0 || parseInt(selected, 10) ?
        parseInt(selected, 10) : config.theme;
}

function getTheme(config, selected) {
    selected = selectedTheme(config, selected);
    var themes = config.bootswatch.themes;

    return {
        uri: config.bootswatch.bootstrap
                .replace('SWATCH_VERSION', config.bootswatch.version)
                .replace('SWATCH_NAME', themes[selected].name),
        sri: themes[selected].sri
    };
}


module.exports = {
    theme: {
        selected: selectedTheme,
        fetch: getTheme
    },
    sri: {
        digest: sriDigest
    },
    buster: buster
};

// vim: ft=javascript sw=4 sts=4 et:
