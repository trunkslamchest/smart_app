const specialCharsEmail = [
  '(',
  ')',
  '[',
  ']',
  ';',
  ':',
  '<',
  '>',
  '\\',
  ','
]

const specialCharsUserName = [
  '!',
  '@',
  '#',
  '%',
  '^',
  '&',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  ';',
  ':',
  '<',
  '>',
  '\\',
  '/',
  '?',
  '|',
  '=',
  '+',
  ',',
  '.',
  '`',
  '~'
]

const specialCharsDef = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  ';',
  ':',
  '<',
  '>',
  '\\',
  '/',
  '?',
  '|',
  '-',
  '_',
  '=',
  '+',
  ',',
  '.',
  '`',
  '~'
]

const specialChars = { email: specialCharsEmail, user_name: specialCharsUserName, def: specialCharsDef }

export default specialChars
