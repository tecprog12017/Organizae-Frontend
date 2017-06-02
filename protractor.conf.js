var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    allScriptsTimeout: 11000,
    directConnect: true,
    getPageTimeout: 20000,
    capabilities: {
        'browserName': 'chrome'
    },
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    specs: ['./src/**/*.spec.ts'],
    baseUrl: 'http://localhost:8100',
    useAllAngular2AppRoots: true,
    beforeLaunch: function() {

        require('ts-node').register({
            project: 'e2e'
        });

        require('connect')().use(require('serve-static')('www')).listen(8100);

    },
    onPrepare: function() {
        jasmine.getEnv().addReporter(new SpecReporter());
    }
}
