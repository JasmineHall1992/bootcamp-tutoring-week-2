## Higher Order Functions

In previous sections, we discussed the importance of using for loops to iterate through arrays. But let's take these concepts and try to think about how they might be used in a practical application. Let's assume we are creating a student management app for Operation Spark. To start, such an application would require a database of all Operation Spark students, almost certainly in the form of an array.

```javascript
const students = [
    {
        id: 0,
        name: 'Stephanie Cooper',
        age: 37,
        newsletterSubscription: false,
        location: 'New Orleans, LA',
        courses: {
            current: {
                phase: 'Bootcamp',
                date: '12/02/2024'
            },
            past: [
                {
                    phase: 'Prep',
                    date: '11/02/2024'
                }
            ]
        }
    },
    {
        id: 1,
        name: 'Bethany Joseph',
        age: 18,
        newsletterSubscription: true,
        location: 'New Orleans, LA',
        courses: {
            current: {
                phase: 'Bootcamp',
                date: '12/02/2024'
            },
            past: [
                {
                    phase: 'Prep',
                    date: '11/02/2024'
                }
            ]
        }
    },
    {
        id: 2,
        name: 'Nathan Coen',
        age: 19,
        newsletterSubscription: true,
        location: 'Atlanta, GA',
        courses: {
            current: {
                phase: 'Immersion - Junior',
                date: '12/18/2024'
            },
            past: [
                {
                    phase: 'Precourse',
                    date: '11/18/2024'
                },
                {
                    phase: 'Bootcamp',
                    date: '10/18/2024',
                },
                {
                    phase: 'Prep',
                    date: '09/18/2024'
                }
            ]
        }
    },
    {
        id: 3,
        name: 'Kyle Bradley',
        age: 42,
        newsletterSubscription: false
        location: 'Baltimore, MD',
        courses: {
            current: {
                phase: 'Immersion - Junior',
                date: '12/18/2024'
            },
            past: [
                {
                    phase: 'Precourse',
                    date: '11/18/2024'
                },
                {
                    phase: 'Bootcamp',
                    date: '10/18/2024'
                },
                {
                    phase: 'Prep',
                    date: '09/18/2024',
                }
            ]
        }
    }
]
```

With this database of `students` we are tracking the most vital data: age, location, the student's current course, the past courses they've completed, whether they subscribe to our newsletter, etc.

From a student management perspective, how many different types of ways might we want to subdivide our students? Think about it. The most obvious thing would probably be to subdivide based on course (which students are currently in Prep, Bootcamp, etc.). How would we go about doing this? Well, from a programming perspective, if there is a task you expect to repeat, you want to package the behavior of that task into a function you can invoke.

```javascript
function getBootcampStudents(students){
    const output = [];
    for (let i = 0; i < students.length; i++){
        if (students[i].courses.current.phase === 'Bootcamp'){
            output.push(students[i]);
        }
    }
    return output;
}

getBootcampStudents(students); // => [ {Stephanie Cooper}, {Bethany Joseph}]
```

The above function will take in our array of students, iterate through each student using a for loop, and at each iteration it will determine if the current student's current course is 'Bootcamp'. If it is, the entire student object is pushed into an output array. So, now we have an array that is only our bootcamp students. 

This function could be a little more abstract though. Right now, all this function will ever do is return a new array of the bootcamp students. Wouldn't it be more flexible if this function returned a new array of students from any course, whether it was bootcamp, prep, precourse, etc.? Whenever you find yourself thinking about how to make a function more flexible, the answer is usually to make some piece of data it relies on a parameter. 

```javascript
function getStudentsByCourse(students, phase){
    const output = [];
    for (let i = 0; i < students.length; i++){
        if (students[i].courses.current.phase === phase){
            output.push(students[i]);
        }
    }
    return output;
}

getStudentsByCourse(students, 'Bootcamp'); // => [ {Stephanie Cooper}, {Bethany Joseph} ]

getStudentsByCourse(students, 'Immersion - Junior'); // => [ {Nathan Coen}, {Kyle Bradley} ]
```

Now instead of hardcoding 'Bootcamp', the function takes in a `phase` param, which could be any course. What if we want to subdivide by another category? Like location, or age, or students who subscribe to the newsletter? Well, theoretically, we could create a function for each subdivision.

```javascript
function getStudentsByLocation(students, location){
    const output = [];
    for (let i = 0; i < students.length; i++){
        if (students[i].location === location){
            output.push(students[i]);
        }
    }
    return output;
}

function getNewsletterSubscribers(students){
    const output = [];
    for (let i = 0; i < students.length; i++){
        if (students[i].newsletterSubscription === true){
            output.push(students[i]);
        }
    }
    return output;
}
```

Something you might notice as you're looking at these functions... they're all BASICALLY the same. They all take in an array of student objects; they iterate through each object in the array; at each iteration they determine if a certain condition is true, and if it is they push the object to an output array. The only thing that is really different about each function is the condition that is being tested in the for loop.

Again, this provides us an opportunity to make this process of subdividing students based on something more abstract and more flexible. But how? Think about it like this... rather than creating a new function for every different thing we might want to subdivide by, we will create one function:

```javascript
function subdivide(students, func){
    const output = [];
    for (let i = 0; i < students.length; i++){
        if (func(students[i]) === true){
            output.push(students[i]);
        }
    }
    return output;
}

const bootcamp = subdivide(students, function(student){
    return student.courses.current.phase === 'Bootcamp'
}); 

console.log(bootcamp); // => [ {Stephanie Cooper}, {Bethany Joseph}]
```

Admittedly, there is a lot going on here, but fundamentally here is what we've done: we have created a function that takes in a param of `students`, which we can assume is an array of student objects, and a param of `func`, which based on the name we can assume is a function. This is a called a *"higher order function"*. A higher order function is any function that **takes in a function as an argument or returns a function.**

As you look at the function, you will see it's still doing the same basic things that happened in the previous functions: it's iterating through the input array; and at each iteration it's hitting this code:

```javascript
if (func(students[i]) === true){
    output.push(students[i]);
}
```

This kind of if statement can be difficult for students to parse initially. What exactly are we evaluating? If you break the if statement into its core parts you see this:

```javascrip
               func(students[i]) === true
//                    ^                ^
//               expression 1     expression 2
```

So, in essence we are saying this: is the resulting of invoking func on the current item in the array strictly equal to true. In other words, when you invoke whatever function `func` represents, does it return true? This is a way of making our subdivide function as flexible as possible. Rather than hardcoding what we are evaluating, we are simply invoking a function that returns true or false and checking to see if the result is true.

Now that we've created this `subdivide` function, we no longer to need to create new functions every time we think of some condition that we might want to subdivide by. We simply need to invoke `subdivide` on our array of `students`, and we need to provide something we call a "callback" function that defines what condition we are testing for.  Here are some examples:

```javascript

// invoke subdivide to create array of students under 21
const underTwentyOne = subdivide(students, function(student){
    return student.age <= 21;
});

// invoke subdivide to create array of students whose last name begins with 'C'
const lastNameStartsWithC = subdivide(students, function(student){
    return student.name[0] === 'C';
})
```

The applications of this `subdivide` function we've created are extensive. It's important to note however that the behavior of this `subdivide` function is not a new idea. We call this "filtering". Filtering is when you iterate through a collection and you "test" each item in the collection using a callback function. Every item that returns true when the callback is invoked is pushed to an output array. This is just one example of how we can create a function that utilizes a "callback" to be performed on every item in the collection.

In today's work, follow the instructions in the `hof.js` file to create 3 different functions that take it in other functions as arguments.