const specialCharsBio = [
  '@', '^', '[', ']', '{',
  '}', '<', '>', '`', '~'
]

const specialCharsComment = [
  '^', '[', ']', '{', '}',
  '|', '`', '~'
]

const specialCharsCountry = [
  '!', '@', '#', '$', '%',
  '&', '*', '(', ')', '[',
  ']', '{', '}', ';', ':',
  '<', '>', '\\', '?', '|',
  '_', '=', '+', '~'
]

const specialCharsEmail = [
  '(', ')', '[', ']', ';',
  ':', '<', '>', '\\', ','
]

const specialCharsRealName = [
  '!', '@', '#', '$', '%',
  '&', '*', '(', ')', '[',
  ']', '{', '}', ';', ':',
  '<', '>', '\\', '/', '?',
  '|', '_', '=', '+', '~'
]

const specialCharsUserName = [
  '!', '@', '#', '%', '^',
  '&', '(', ')', '[', ']',
  '{', '}', ';', ':', '<',
  '>', '\\', '/', '?', '|',
  '=', '+', ',', '.', '`',
  '~'
]

const specialCharsDef = [
  '!', '@', '#', '$', '%',
  '^', '&', '*', '(', ')',
  '[', ']', '{', '}', ';',
  ':', '<', '>', '\\', '/',
  '?', '|', '-', '_', '=',
  '+', ',', '.', '`', '~'
]

const specialChars = {
  bio: specialCharsBio,
  comment: specialCharsComment,
  country: specialCharsCountry,
  email: specialCharsEmail,
  real_name: specialCharsRealName,
  user_name: specialCharsUserName,
  def: specialCharsDef
}

export default specialChars
