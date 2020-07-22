/**
 * @fileoverview Tests for GitHub Actions message command formatter
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const formatter = require('../lib/github-actions-message-command-formatter');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

test("One result and one message", () => {
  const results = [
    {
      messages: [
        {
          severity: 2,
          line: 2,
          column: 3,
          messageId: "test-id",
          nodeType: "test-node-type",
          message: "This is test."
        }
      ],
      filePath: `${process.cwd()}/test.js`
    }
  ];
  const expected = "::error file=test.js,line=2,col=3::[test-id] test-node-type: This is test.\n";

  expect(formatter(results)).toBe(expected);
});

test("One result and multiple messages", () => {
  const results = [
    {
      messages: [
        {
          severity: 1,
          line: 2,
          column: 3,
          messageId: "test-id-1",
          nodeType: "test-node-type-1",
          message: "This is test. (1)"
        },
        {
          severity: 2,
          line: 4,
          column: 5,
          messageId: "test-id-2",
          nodeType: "test-node-type-2",
          message: "This is test. (2)"
        }
      ],
      filePath: `${process.cwd()}/test.js`
    }
  ];
  const expected = [
    "::warning file=test.js,line=2,col=3::[test-id-1] test-node-type-1: This is test. (1)",
    "::error file=test.js,line=4,col=5::[test-id-2] test-node-type-2: This is test. (2)"
  ].join("\n") + "\n";

  expect(formatter(results)).toBe(expected);
});

test("Multiple results", () => {
  const results = [
    {
      messages: [
        {
          severity: 1,
          line: 2,
          column: 3,
          messageId: "test-id-1",
          nodeType: "test-node-type-1",
          message: "This is test. (1)"
        }
      ],
      filePath: `${process.cwd()}/test_a.js`
    },
    {
      messages: [
        {
          severity: 2,
          line: 4,
          column: 5,
          messageId: "test-id-2",
          nodeType: "test-node-type-2",
          message: "This is test. (2)"
        }
      ],
      filePath: `${process.cwd()}/test_b.js`
    }
  ];

  const expected = [
    "::warning file=test_a.js,line=2,col=3::[test-id-1] test-node-type-1: This is test. (1)",
    "::error file=test_b.js,line=4,col=5::[test-id-2] test-node-type-2: This is test. (2)"
  ].join("\n") + "\n";

  expect(formatter(results)).toBe(expected);
});

test("No result", () => {
  const results = [];

  expect(formatter(results)).toBe("");
});
