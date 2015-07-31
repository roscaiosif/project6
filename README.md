# How this project works?

a. The test loops through each feed in the `allFeeds` object and ensures it has a URL and name defined and that the URL and name is not empty, by using the `$.forEach()` inside the `it`.

b. Test suite "The menu"
- Test that ensures the menu element is hidden by default is done by checking the `.menu-hidden` class on the `body` tag.
- Test that ensures the menu changes visibility when the menu icon is clicked is done by triggering the `click` event for the `menu-icon-link` and checking for `menu-hidden` class on the `body` tag.

c. Test suite "Initial Entries"
Test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
 - `loadFeed` requires an `id` parameter and `beforeEach` cannot be inside a loop therefore `id` is incremented inside each `it` to allow the next feed to be loaded
 - on ajax success the feed's first entry is stored in `feedEntry.h2`
 - on ajax failure 'feedEntry.h2' will contain `Not Found`
 - it is expected that `feedEntry.count` not toEqual '0' and `feedEntry.h2` not toEqual `Not Found`

d. Test suite "New Feed Selection"
 - this test is based on two nested `loadFeed` functions that mimic a click event
 - the first `loadFeed` is called with `id = 0` in `beforeEach` and the `.entry h2` is stored in `feedEntry0`,
 - $.empty() is called to ensure clean container for the next load
 - the second `loadFeed`  with `id = 1` is called inside the `cb` function of the first `loadFeed` and the `.entry h2` is stored in `feedEntry1`
 - it is expected that `feedEntry0` is not toEqual `feedEntry1`

### To run the tests load `index.html` in a browser
