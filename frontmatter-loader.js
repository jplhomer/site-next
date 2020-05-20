const frontmatter = require("front-matter");

module.exports = async function (src) {
  const callback = this.async();
  const { body } = frontmatter(src);

  return callback(null, body);
};
