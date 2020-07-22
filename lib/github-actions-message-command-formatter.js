/**
 * @fileoverview GitHub Actions message command formatter
 */
"use strict";

const path = require("path");

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * Returns a canonical error level string based upon the error message passed in.
 *
 * @param {Object} message Individual error message provided by eslint
 * @returns {string} Error level string
 */
function getMessageType(message) {
  if (message.fatal || message.severity === 2) {
    return "error";
  }
  return "warning";
}

/**
 * Returns a relative file path.
 *
 * @param {string} filePath a file path
 * @returns {string} a relative file path
 */
function getRelativePath(filePath) {
  return path.relative(process.cwd(), filePath);
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function (results) {
  let output = "";

  results.forEach(result => {
    const messages = result.messages;
    const filePath = getRelativePath(result.filePath);

    messages.forEach((message) => {
      const type = getMessageType(message);

      output += `::${type} file=${filePath},line=${message.line},col=${message.column}::[${message.messageId}] ${message.nodeType}: ${message.message}\n`;
    });
  })

  return output;
}
