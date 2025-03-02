/**
 * Validate Text without numbers
 * @returns {boolean}
 */
export const validateText = (text) => {
  if(text.length != 0){
    var regName = /^[a-zA-Z ]+$/;
    if(regName.test(text)){
        return true
    }
  }
  return false
}

