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

    describe('RSS Feeds', function() {

        /* Test below makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
          Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test below loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('url is defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* Test below loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    /* Test below ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    describe('The menu', function() {

        it('menu is hidden by default', function() {
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });

        /* Test below ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('visibility of menu when clicked', function() {
            $('.icon-list').trigger('click');
            expect($("body").hasClass('menu-hidden')).toBe(false);
            $('.icon-list').trigger('click');
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });

    });

    /* Test below ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('has added entries', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Test below ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */

    describe('New Feed Selection', function() {

        var feed1, feed2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feed1 = $('.feed').html();
                loadFeed(1, function() {
                    feed2 = $('.feed').html();
                    done();
                });
            });
        });

        it("should be new stuff", function() {
            expect(feed1).not.toEqual(feed2);
        });
    });


}());