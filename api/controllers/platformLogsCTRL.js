'use strict';
import PlatformLogs from '../models/PlatformLogs.js';

/*
* Logs request will gathering all kind of information,
* and will keeps them for not more than 30 days.
*
*/

function controller() {
  async function get() {
    // Return all logs for specific Owner Web Site
  }

  async function add() {

  }

  async function remove() {
    // Remove all older than 30 days logs from the DB Table
    // Remove all current logs in a specific conditions
  }

  return { get, add, remove };
}

export default controller;