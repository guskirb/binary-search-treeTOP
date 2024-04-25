let mergeSortFunc;

export default mergeSortFunc = function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let mid = Math.floor(array.length / 2);
    let first = array.slice(0, mid);
    let last = array.slice(mid, array.length);

    return merge(mergeSort(first), mergeSort(last));
}

function merge(first, last) {
    const tempArray = [];
    let tempIndex = 0;
    let firstIndex = 0;
    let lastIndex = 0;

    while (firstIndex < first.length && lastIndex < last.length) {
        if (first[firstIndex] < last[lastIndex]) {
            tempArray[tempIndex] = first[firstIndex];
            tempIndex++;
            firstIndex++;
        } else {
            tempArray[tempIndex] = last[lastIndex];
            tempIndex++;
            lastIndex++;
        }
    }
    while (firstIndex < first.length) {
        tempArray[tempIndex] = first[firstIndex];
        tempIndex++;
        firstIndex++;
    }
    while (lastIndex < last.length) {
        tempArray[tempIndex] = last[lastIndex];
        tempIndex++;
        lastIndex++;
    }
    return tempArray;
}