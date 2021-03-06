const AsyncIterator = require("asynciterator").AsyncIterator;
const fs = require("fs");

/**
 * The ConnectionProvider fetches data (from anywhere, in any form) and provides it in the form
 * of an AsyncIterator. This version reads the data from a simple JSON file.
 */
class TestConnectionProvider extends AsyncIterator {
    constructor(filename) {
        super();
        this.dataset = JSON.parse(fs.readFileSync(filename));
        this.reset();
    }

    read() {
        let result = this.sortedConnections[this.index];
        this.index++;
        return result;
    }

    reset() {
        this.stops = this.dataset.stops;
        this.sortedConnections = this.dataset.connections;
        this.sortedConnections.sort((a,b) => b.dep.time - a.dep.time);

        // Out-of-order and inconsistent connection for warning testing
        //this.sortedConnections.push({"dep": {"stop": "c1", "time": 8}, "arr": {"stop": "c2", "time": 9}, "tripId": "c"});
        //this.sortedConnections.push({"dep": {"stop": "c1", "time": 1}, "arr": {"stop": "c2", "time": 0}, "tripId": "c"});
        this.sortedConnections.push(null);
        this.index = 0;
    }
}

module.exports = TestConnectionProvider;
