import path from 'path';
import test from 'ava';
import m from './';

test(async t => {
	t.is(typeof await m(path.join(__dirname, 'fixture.jpg')), 'string');
});
