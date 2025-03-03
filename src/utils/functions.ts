/**
 * 
 * @param {string}text - this is the input for the length of the text
 * @param {number} [maxLength=50] - this is the maximum length of the text
 * @returns 
 */
export function textSlicer(text: string, maxLength: number = 50) {

    if (text.length >= maxLength)
        return `${text.slice(0, maxLength)}...`
    return text
}
