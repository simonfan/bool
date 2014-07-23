//     Bool
//     (c) simonfan
//     Bool is licensed under the MIT terms.

define("bool",["require","exports","module","lodash"],function(n,r,t){function o(n,r){return e.isRegExp(n)?n.test(r):e.isFunction(n)?n(r):n===r}function u(n){function r(n,r){return e.isArray(r)?e[u](r,function(r){return o(n,r)}):o(n,r)}var t=n.conditions||"any",u=n.values||"any";return e.curry(function(n,o){return e.isArray(n)?e[t](n,function(n){return r(n,o)}):r(n,o)})}var e=n("lodash");r=t.exports=u({conditions:"any",values:"any"}),r.def=u});