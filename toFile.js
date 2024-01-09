export const toBase64 = async (string, type = "data:text/csv;base64") => {
    const encodedText = new TextEncoder().encode(string)
    const binString = String.fromCodePoint(...encodedText);
    var dataUri = type + ',' + btoa(binString)
    return dataUri
}