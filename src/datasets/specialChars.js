const specialCharsEmail = [
  '(', ')', '[', ']', ';',
  ':', '<', '>', '\\', ','
]

const specialCharsUserName = [
  '!', '@', '#', '%', '^',
  '&', '(', ')', '[', ']',
  '{', '}', ';', ':', '<',
  '>', '\\', '/', '?', '|',
  '=', '+', ',', '.', '`',
  '~'
]

const specialCharsComment = [
  '^', '[', ']', '{', '}',
  '|', '`', '~'
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
  email: specialCharsEmail,
  user_name: specialCharsUserName,
  comment: specialCharsComment,
  def: specialCharsDef
}

export default specialChars
