# How this project works?

a. The test loops through each feed in the `allFeeds` object and ensures it has a URL and name defined and that the URL and name is not empty. In order to loop through the feeds the `it` function was wrapped in a function `testOneFeed`

b. Test suite "The menu"
- Test that ensures the menu element is hidden by default is done by checking the `.menu-hidden` class on the `body` tag.
- Test that ensures the menu changes visibility when the menu icon is clicked is done by triggering the `click` event for the `menu-icon-link` and checking for `menu-hidden` class on the `body` tag.

c. Test suite "Initial Entries"
Test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container is done:
 - wrapping the `loadFeed` function in `beforeEach` and using the `done` function
 - the `cb` function will push in `feedEntries` array the title of the first entry in case of success and "Not Found" in case of failure.
 - the `it` function is wrapped in the `oneFeed` function where the `index` is incremented to allow the next `beforeEach` function to load the next feed.
 - if the `feedEntries` has items that differ from "Not Found" than teh test passes otherwise fails

d. Test suite "New Feed Selection"
This test suite is pretty much the same as the previous one. The only difference is that after we use the `feedEntries` array to check if the content changed between loadings

### To run the tests load `index.html` in a browser
