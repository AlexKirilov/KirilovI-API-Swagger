'use strict';
import SiteLogs from '../models/Logs.js';

/*
* Logs request will gathering all kind of information,
* and will keeps them for not more than 30 days.
*
*/

export async function get() {
  // Return all logs for specific Owner Web Site
}

export async function add() {

}

export async function remove() {
  // Remove all older than 30 days logs from the DB Table
  // Remove all current logs in a specific conditions
}
