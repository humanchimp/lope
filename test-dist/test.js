'use strict';

var hiho = require('@topl/hiho');

const $suite$ = options => new hiho.Suite("/Users/thorn/Desktop/topl/lope/spec/nother.spec.ts", options).describe("nother", $suite$ => $suite$.it("demonstrates that this idea is possible").describe("it's a proof by existence", $suite$ => $suite$.it("i think therefore i am"))).describe("nother nother", $suite$ => $suite$.it("works"));

const $suite$$1 = options => new hiho.Suite("/Users/thorn/Desktop/topl/lope/spec/plugin.spec.ts", options).describe("trivial", $suite$ => $suite$.it("demonstrates that this idea is possible").describe("it's a proof by existence", $suite$ => $suite$.it("i think therefore i am")));

function lope_entryPoint (options) {
  return hiho.of($suite$(options), $suite$$1(options));
}

module.exports = lope_entryPoint;
//# sourceMappingURL=test.js.map
