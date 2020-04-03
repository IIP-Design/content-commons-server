const getIndex = ( array, regex ) => array.findIndex( n => regex.test( n ) );

export const getLongestElement = markup => {
  const elements = markup.split( /\s*<\/p>|<\/ul>|<\/ol>/ );

  /**
   * To improve chances of returning a relevant body
   * paragraph, slice the array to remove boilerplate
   * headings at top and clearances at bottom.
   */
  const start = getIndex( elements, /For\s*Immediate\s*Release/g );
  const end = getIndex( elements, /\x23\s*/g ); // for # # # line

  const longestElement = elements
    .slice( start === 0 ? start : start + 1, end )
    .sort( ( curr, next ) => next.length - curr.length );

  return longestElement[0] || '';
};