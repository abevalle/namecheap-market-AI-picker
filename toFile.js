export const toCsv = async (string, type = "data:text/csv;base64") => {
    const encodedText = new TextEncoder().encode(string)
    const binString = String.fromCodePoint(...encodedText);
    console.log('Converting creating CSV file')
    var dataUri = type + ',' + btoa(binString)
    return dataUri
}

// export const toFile = async (dataUrl, fileName) => {
//     const blob = await (await fetch(dataUrl)).blob()
//     return new File([blob], fileName, {type: blob.type})
// }

export function toFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
