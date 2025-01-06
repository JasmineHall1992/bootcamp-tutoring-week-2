

/** find()
 * Arguments:
 *  1) Array
 *  2) Function
 * Objectives:
 *  1) call <function> on each element in <array> passing the argments:
 *     element, index, and <array>.
 *  2) return the item in the array for which calling <function> returned true or truthy
 *  3) return undefined if no item returns true or truthy
 * Examples:
 *  find(['Alex Aaron', 'Stephanie Cooper', 'Bethany Jones'], function(name){ return name === 'Stephanie Cooper'}); // => 'Stephanie Cooper'
 */

//The purpose of the callback function is to find specific elements in the array based on a condtion, when invoked it will return
//the elements based of the truthiness or falseness? We will return undefinied if no items are found in the condition provided 

const find = (array, func) => {
    for (let i = 0; i < array.length; i++) {
        //pass the three arguments into the function
        if (func(array[i], i, array)) {
            //return the first element
            return array[i];
        }
    }
};

/** mapByDataType()
 * Arguments:
 *  1) Array
 *  2) Function
 *  3) String of a datatype
 * Objectives: 
 *  1) iterate through the input array and at each iteration determine if the current element matches the input <datatype>
 *  2) call <function> on each element whose datatype matches <datatype>
 *  3) save the return value of each function call in a new array and return it at the end
 * Example:
 *  mapByDataType([null, 1, 'a', 2], 'number', function(item){ return item * 10 }, 'number'); // => [10, 20]
 */

const mapByDataType = () => {
   
};

/** filterByCondition()
 * Arguments:
 *  1) Array
 *  2) Function to test each item
 *  3) Function to test each index
 * Objectives:
 *  1) iterate through the input array and invoke <conditiion> at each iteration passing in the arguments: 
 *     current index, <array>
 *  2) if the result of invoking <condition> is true or truthy, invoke <test> on each item passing in the arguments:
 *     current item, current index, <array>
 *  3) return a new array of elements for which calling <test> was true or truthy
 * Example:
 *  filterByCondition([10, 20, 30, 40], (n) => n >= 30, (index, array) => {
 *   return index > 1
 *  }); // => [30, 40];
 * 
 */

const filterByCondition = () => {
    
};