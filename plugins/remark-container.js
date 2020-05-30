/**
 * Borrowed from zWingz, with some modifications.
 *
 * @see https://github.com/zWingz/remark-container/blob/master/index.js
 */

const defaultOptions = {
  className: 'remark-container',
};

function plugin(opt = {}) {
  const { className } = Object.assign(defaultOptions, opt);
  const parser = this.Parser;
  const { blockTokenizers, blockMethods, interruptParagraph } = parser.prototype;
  const paragraph = 'paragraph';

  function tokenizer(eat, value, silent) {
    const reg = /^\s*:::\s*(\w+)(.*?)[\n\r]([\s\S]+?)\s*:::\s*?/;
    const match = value.match(reg);
    if (!match) {
      /* eslint-disable-next-line */
      return false;
    }
    /* istanbul ignore if - never used (yet) */
    if (silent) {
      return true;
    }
    // const [input, type, title, content] = match
    const input = match[0];
    const type = match[1];
    const title = match[2];
    const content = match[3];
    const start = eat.now();
    const add = eat(input);
    const end = eat.now();
    let children = [];

    if (title) {
      children.push({
        type: paragraph,
        children: [
          {
            type: 'text',
            value: title.trim(),
          },
        ],
        data: { hProperties: { className: [`${className}-title`] } },
      });
    }

    children = children.concat(this.tokenizeBlock(content.trim(), {}));
    return add({
      type: 'container',
      children,
      data: {
        hName: 'div',
        hProperties: { className: [className, type.toLowerCase()] },
      },
      position: {
        start,
        end,
      },
    });
  }
  tokenizer.notInList = true;
  tokenizer.notInLink = true;
  blockTokenizers.container = tokenizer;
  blockMethods.splice(blockMethods.indexOf('newline') + 1, 0, 'container');
  interruptParagraph.unshift(['container']);
}
export default plugin;
