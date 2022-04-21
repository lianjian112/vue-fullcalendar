export const toFormData = (obj, formData = new FormData()) => {
  console.log(obj)

  function createFormData(obj, subKeyStr = '') {
    for (const i in obj) {
      const value = obj[i]
      let subKeyStrTrans = ''
      if (isNaN(Number(i))) {
        subKeyStrTrans = subKeyStr ? subKeyStr + '.' + i : i
      } else {
        subKeyStrTrans = subKeyStr ? subKeyStr + '[' + i + ']' : i
      }
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value instanceof File
      ) {
        formData.append(subKeyStrTrans, value)
      } else if (typeof value === 'object') {
        createFormData(value, subKeyStrTrans)
      }
    }
  }
  createFormData(obj)
  return formData
}

