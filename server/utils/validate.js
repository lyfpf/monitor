const mln = /^[A-Za-z0-9]+$/

const hanzi = /^[\u4e00-\u9fa5]{0,}$/

const e_mail = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/

const mobile_number = /^1[0-9]{10}$/

const avatar = /\.(jpe?g|gif)(\?.*)?$/

module.exports = {
  mln,
  hanzi,
  e_mail,
  mobile_number,
  avatar
}