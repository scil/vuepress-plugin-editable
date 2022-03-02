/**
 * temp handler
 * event bus
 *
 */
 
/** vue2
import Vue from "vue";
const bus = new Vue();
export default bus;
 */

import mitt from 'mitt';
// var mitt = require('mitt')
export const bus = mitt();
