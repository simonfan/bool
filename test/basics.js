(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././js' :
		// browser
		'bool',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(bool, should) {
	'use strict';

	describe('bool basics', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function () {

			var isApple = bool('apple');

			isApple('banana').should.be.false;

			isApple('apple').should.be.true;


			bool('apple', 'apple').should.be.true;
		});

		it('regexp', function () {

			var startsWithA = bool(/^[Aa]/);

			startsWithA('apple').should.be.true;
			startsWithA('watermelon').should.be.false;

			bool(/[eE]$/, 'archetype').should.be.true;
		});

		it('function', function () {

			var id = '9';

			function compareId(value) {
				return id === value;
			}

			var idIs9 = bool(compareId);

			idIs9('oiqwewqe').should.be.false;
			idIs9('9').should.be.true;

			bool(compareId, '9').should.be.true;
		});

		it('array of conditions', function () {

			var isForSale = bool(['apple', 'banana', 'watermelon']);

			isForSale('apple').should.be.true;
			isForSale('orange').should.be.false;
		})
	});
});
