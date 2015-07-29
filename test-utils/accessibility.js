/*global sinon, axe */

(function(exports) {
  'use strict';

  var Accessibility = {
    check: function Accessibility_check(container) {
      var a11yCheck = new Promise((resolve) => {
        axe.a11yCheck(container, resolve);
      });

      return a11yCheck.then(results => {
        if (results.violations.length > 0) {
          results.violations.forEach(violation => sinon.assert.fail([
            violation.discription,
            violation.nodes.reduce(
              (str, node) => str + node.target.join(' '), ''),
            violation.help].filter(str => !!str).join(' : ')));
        }
      });
    }
  };

  exports.Accessibility = Accessibility;
})(window);
