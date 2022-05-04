
export function quickSortAnimation(array){
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    quickSort(array, 0, array.length, animations);
    return animations;
}

function quickSort(array,l,h,animations){
    if(l<h){
        let pivot = partition(array,l,h,animations);
        quickSort(array,l,pivot-1,animations);
        quickSort(array,pivot,h,animations);
    }
}

function partition(array,l,h,animations){
    if (l>=h) {
        animations.push([true,l]);
    }
    let pivot = array[l];
    let i = l + 1;
    let j = h;
    animations.push(pivot);
    animations.push([i,j]);
    while(i<=j){
        while (i<=j) {
            while (array[i]<pivot) {
                animations.push([i, i]);
                animations.push([i, i]);
                i++;
            }
            while (array[j]>pivot) {
               animations.push([j, j]);
               animations.push([j, j]);
                j--;
            }
            if (i<=j) {
                swap(array,i,j);
                animations.push([i, j]);
                animations.push([i, j]);
                i++;
                j--
            }
        }
    }
    return i;
}

function swap(array,i,j){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return array;
}