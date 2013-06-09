/**
 * @description Error message map file.
 * @author Lhfcws
 * @file
 */

Errors =
  \SELECT_ERROR : 'Database select failed.'
  \FIND_ERROR : 'Database find failed.'
  \INSERT_ERROR : 'Database insert failed.'
  \UPDATE_ERROR : 'Database update failed.'
  \DELETE_ERROR : 'Database delete failed.'
  \COUNT_ERROR : 'Database count failed.'

module.exports <<< Errors
