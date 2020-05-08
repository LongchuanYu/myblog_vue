
const atob = require('atob');
let token = 'eyJ1c2VyX2lkIjo2LCJ1c2VyX25hbWUiOiJmIiwidXNlcl9hdmF0YXIiOiJhSFIwY0hNNkx5OTNkM2N1WjNKaGRtRjBZWEl1WTI5dEwyRjJZWFJoY2k4ek1qSmlNalE1Wm1JNFpXRTJPR0k1WldNNFptRTJOR1V5WmpjMFpUQXhOajlrUFdsa1pXNTBhV052YmlaelBUSTAiLCJleHAiOjE1ODg5NzU2NjYsImlhdCI6MTU4ODk0Njg2Nn0'

let ret = JSON.parse(
  atob(token)
)
console.log(ret)