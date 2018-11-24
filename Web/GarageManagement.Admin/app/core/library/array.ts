export enum ArrayOrder {
    Asc = 0,
    Desc = 1
}

export interface SortWise {
    NameToSort: string
}

export function sortByOrder<T extends SortWise>(collection, order: ArrayOrder = ArrayOrder.Asc) {
    if (order == ArrayOrder.Asc) {
        collection.Array.sort(function (firstArray, secondArray) {
            const firstArrayShortName = Object.keys(firstArray).filter(x => x == collection.NameToSort)[0];
            const secondArrayShortName = Object.keys(secondArray).filter(x => x == collection.NameToSort)[0];
            
            if (firstArray[firstArrayShortName] < secondArray[secondArrayShortName]) 
                return -1;
            if (firstArray[firstArrayShortName] > secondArray[secondArrayShortName]) 
                return 1;
            
            return 0;
        });
    }

    if (order == ArrayOrder.Desc) {
        collection.Array.sort(function (firstArray, secondArray) {
            const firstArrayShortName = Object.keys(firstArray).filter(x => x == collection.NameToSort)[0];
            const secondArrayShortName = Object.keys(secondArray).filter(x => x == collection.NameToSort)[0];
            
            if (firstArray[firstArrayShortName] > secondArray[secondArrayShortName]) 
                return -1;
            if (firstArray[firstArrayShortName] < secondArray[secondArrayShortName]) 
                return 1;
            
            return 0;
        });
    }
}
