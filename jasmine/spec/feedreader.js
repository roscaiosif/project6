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

        //all feeds have 'url' defined and not empty
        it('and all feeds have url defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        //all feeds have 'name' defined and not empty
        it('and all feeds have name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
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

         * loadFeed requires an 'id' parameter and 'beforeEach' cannot
         * be inside a loop therefore 'id' is incremented inside each
         * 'it' to allow the next feed to be loaded
         * on ajax success the feed's first entry is stored in 'feedEntryH2'
         * on ajax failure 'feedEntry.h2' will contain 'Not Found'
         * it is expected that 'feedEntry.count' not toEqual '0' and
         * and 'feedEntry.h2' not toEqual 'Not Found'
        */

        var feedEntry = {},
            id = 0;

        beforeEach(function(done) {
            loadFeed(id, function() {
                var titles = $('.entry').find('h2');
                feedEntry.h2 = titles[0].innerText;
                feedEntry.count = titles.length;
                done();
            });
        });

        allFeeds.forEach(function(feed) {
            it('"' + feed.name + '" has at least a single .entry element', function(done) {
                expect(feedEntry.h2).not.toEqual('Not Found');
                expect(feedEntry.count).not.toEqual(0);
                id++;
                done();
            });
        });
    });

    /* Test suite "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        /* 1. First 'loadFeed' called with 'id' = 0 in 'beforeEach' and the '.entry h2' is stored in 'feedEntry0'
         *  2. $.empty() is called to ensure clean container for the next load
         *  3. The second 'loadFeed'  with 'id' = 1 is called inside the 'cb' function of the first 'loadFeed'
         *     (this will mimic a click on the 2nd feed link) and the '.entry h2' is stored in 'feedEntry1'
         *  4. call done();
         *  5. it is expected that 'feedEntry0' is not toEqual 'feedEntry1'
         */
        var feedEntry0, feedEntry1;

        beforeEach(function(done) {
            loadFeed(0, function() {
                var titles = $('.entry').find('h2');
                feedEntry0 = titles[0].innerText;
                titles.empty();
                loadFeed(1, function() {
                    var titles = $('.entry').find('h2');
                    feedEntry1 = titles[0].innerText;
                    done();
                });

            });
        });

        it('content changed upon loading a new feed', function(done) {
            expect(feedEntry0).not.toEqual(feedEntry1);
            done();
        });
    });
}());
