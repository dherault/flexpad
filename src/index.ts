/* --------------------------- */
/* JS helper for inline-styles */
/* --------------------------- */

import Flexpad from './Flexpad'

const flexpad = (code: string) => new Flexpad(code).toJs()

export default flexpad
