/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    "use strict";

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* test for one feed/property*/
        function testOneFeed(feed, prop) {
            var str = 'and feed[' + feed.id + '] has ' + prop + ' defined';
            it(str, function() {
                expect(feed[prop]).toBeDefined();
                expect(feed[prop]).not.toBe('');
            });
        }
        /* Loop through each feed
         * in the allFeeds object and ensures it has a URL and name are defined
         * and that the URL and name are not empty.
         */
        for (var i = 0; i < allFeeds.length; i++) {
            testOneFeed(allFeeds[i], 'url');
            testOneFeed(allFeeds[i], 'name');
        }
    });

    /* Test suite named "The menu" */
    describe('The menu', function() {
        /* The menu element is hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* The menu changes visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('shows when the menu-icon is clicked and hides it when is clicked again', function() {
            $('.menu-icon-link').trigger('click');
            var hiddenAfterClick = $('body').hasClass('menu-hidden');
            expect(hiddenAfterClick).toBe(false);
            $('.menu-icon-link').trigger('click');
            hiddenAfterClick = $('body').hasClass('menu-hidden');
            expect(hiddenAfterClick).toBe(true);
        });
    });

    /* Test suite "Initial Entries" */
    describe('Initial Entry', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        var feedEntries = [], //store the first .entry of each feed
            index = 0; //index for feeds

        beforeEach(function(done) {
            loadFeed(index, function() {
                var titles = $('.entry').find('h2');
                feedEntries.push(titles[0].innerText);
                done();
            });
        });

        function oneFeed(feed) {
            it('"' + feed.name + '" has at least a single .entry element', function(done) {
                expect(feedEntries[feed.id]).not.toEqual('Not Found');
                index++;
                done();
            });
        }

        for (var i = 0; i < allFeeds.length; i++) {
            oneFeed(allFeeds[i]);
        }

    });

    /* Test suite "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var feedEntries = ['before the first feed is loaded'], //store the first .entry of each feed;
            //the first entry in the array represents a dummy variable, so we do not have to compare to undefined

            index = 0, //index for feeds
            feeds = allFeeds.length - 1;

        beforeEach(function(done) {
            loadFeed(index, function() {
                var titles = $('.entry').find('h2');
                feedEntries.push(titles[0].innerText);
                done();
            });
        });

        function oneFeed(feed) {
            it('content changed upon loading "' + feed.name + '"', function(done) {
                expect(feedEntries[feed.id + 1]).not.toEqual('Not Found');
                expect(feedEntries[feed.id] !== feedEntries[feed.id + 1]).toBeTruthy();
                index++;
                done();
            });
        }

        for (var i = 0; i <= feeds; i++) {
            oneFeed(allFeeds[i]);
        }

    });
}());
