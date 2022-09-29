---
title: "CSC 244/444: Knowledge Representation and Reasoning in AI"
collection: teaching
type: "Graduate Teaching Assistant"
permalink: /teaching/2022-fall-teaching-444
venue: "University of Rochester, Department of Computer Science"
date: 2022-08-31
location: "Rochester, NY"
---

{% include base_path %}

## Anouncements
Assignment 1 Solutions : Please [click here](https://mundrapranay.github.io/files/as1_solutions.pdf)


## Office Hours & Contact
My office hours will be in person, starting the week of September 5th, in Room 2305 [Wegmans Hall](https://goo.gl/maps/9m8kD2994LsTFfP2A) on:
- Monday from 10:30 AM - 11:30 AM
- Friday from 2:00 PM  - 3:00 PM

Please feel free to email me [pmundra@ur.rochester.edu](mailto:pmundra@ur.rochester.edu) if you need to speek to me but can't make it to office hours for some reason, and I can try to work something out.

## Written Assignments
Please submit your written assginment solutions to [uploads.cs444.2022@gmail.com](mailto:uploads.cs444.2022@gmail.com) (use this email even if you're in 244)

All assignments are due before class, unless explicitly stated otherwise.

Typed assignment solutions are strongly preferred (though the assignments will also suggest copying answers into the text file of the assignment and copying Unicode symbols; this is also fine). If you want to typeset your answers, I recommend using [Overleaf](https://www.overleaf.com/), which is a very easy-to-use online LaTeX editor (you can also use [Mathcha](https://www.mathcha.io/) to create math/graphics and export them in LaTeX). Not only does this make it easier to grade, knowing how to create documents using LaTeX is also a valuable skill to have. If you do copy solutions into the assignment text file, please take extra care to ensure readability.

## Lisp Assignments
Please submit your Lisp assignments to [uploads.cs444.2022@gmail.com](mailto:uploads.cs444.2022@gmail.com) (use this email even if you're in 244). The submission should be a **zip/rar/7z/tarball** file with the name **[firstinitial][lastname]_[assigmentnumber].[extension]**. For example, if I'm submitting my Lisp Assigment 0 solutions, my submission should be titled **pmundra_0.zip**. The compressed submission should contain the following files:
- **[firstinitial][lastname]_src.lisp** (e.g. pmundra_src.lisp)
- **[firstinitial][lastname]_test.lisp** (e.g. pmundra_test.lisp)
- **README.txt**

Your .lisp files should all be executable using **Steel Bank Common Lisp (sbcl)** - more on this in the [Lisp Information](#lisp-information) section below. **Your code should not rely on any external libraries.**

**In the src.lisp file**, you should implement each function required by the assignment. Each function should have a comment describing what that function takes as input, what it does, and what it produces as output. If it's a simple function, a short sentence is fine. If it's a complex function, please give a longer description (three or more lines). Furthermore, unless doing so would directly harm readability, please try to keep your code to 100 characters or less per line.

Please make sure your code runs without crashing when loaded into the REPL. If anything does cause the code to break when loaded, please stub/comment out the problematic code. It will be much better (both for me and for your grade) to have some of the test cases fail than for me to have to modify your code to get it to run. Your functions **should also check function inputs for validity.** This can be done most effectively using an **outer cond statement** which returns **ERROR** from the function (and optionally prints some informative error message) if some input is bad, or executes the rest of the function in the default case (if multiple functions take the same sorts of inputs, you may want to abstract some helper functions to verify those inputs).


**In the test.lisp file**, you should have test cases for each of the functions required by the assignment. Each test case should run the function with given inputs, and compare the output of the function to the expected output. Your test cases should be **comprehensive** - this is very important! Test-driven development is a very good practice to get used to, and is widely used in industry. This means that you should test 'normal cases', as well as 'edge cases', up to and including potentially bad or unexpected inputs (e.g. empty lists, integer where a list is expected, etc.). Otherwise, your program may very likely crash the REPL when I test edge cases as part of my grading.

For each test case, you should print to standard output (a) the function and the input being used to test it, (b) the expected result, (c) the actual result, and (d) whether the test case passed (a boolean value). See [this page](http://www.gigamonkeys.com/book/practical-building-a-unit-test-framework.html) for some advice on implementing a test suite in Lisp.

**In the README.txt file**, you should give a reasonable description for each of your algorithm implementations, including the format of inputs and outputs and whatever else I might need to test your code. Explain why you made any particular design decisions, and notes on any clever tricks you used that I might not be able to understand just by looking at them. Also include any known issues with the code, and try to discuss any test cases which are failing. If you're running out of time and can't implement something, describe in the writeup in more detail how you would have done it - you might be able to earn some partial credit for this. If a Lisp assignment asks any written questions, create a section for the answers in the writeup. Finally, provide citations for any code which you may have gotten from the web!

**Grading of the Lisp assignments** will be up to **60% based on the code's functionality**, i.e. how well it passes my own (private) test suite. The other **40% of the grade** will be based on some combination of your **test suite's comprehensiveness, the quality of your writeup, and your coding/comment style** (see [Lisp Information](#lisp-information) below for more details on style). Even if you cannot get some function to work properly by the due date, you can still earn substantial partial credit by thoroughly creating test cases for that function, trying to figure out more precisely where the issue lies, and discussing it in your writeup, so take this seriously when working on your assignments!

## Late Policy and Regrading Policy
I will accept assignments late for a **penalty of 10% off per day over the due date.** If you need to submit very late, and/or have a special circumstance warranting an extension, send me an email and we can talk about it.

If you believe that I made a mistake while grading, and you want to appeal your grade, let me know (via email or office hours) within **5 days of receiving your grade**. However, if you do choose to appeal, please include a written statement of why you think the grade is incorrect, and what specifically you want me to take another look at.

## Lisp Information

The Lisp implementation to be used for this class is **[Steel Bank Common Lisp (SBCL)](http://www.sbcl.org/)**, which should already be installed on the school machines (but it should be easy to install on a personal computer as well). The REPL can be started from the command line by typing the command **sbcl**, and can be quit using the Lisp expression **(exit) or pressing ctrl+D**. While in the REPL, a Lisp file can be loaded/executed using **(load "[filename]")**. You can also enter Lisp expressions into the REPL directly for evaluation, which can be very useful for allowing you to test code as you develop it.

Most likely, programming in Lisp, or possibly any strongly symbolic/functional language, will be completely new to you. Although I will hold Lisp training sessions at the beginning of the course, the following online resources should all be helpful:
- **[Practical Common Lisp](http://www.gigamonkeys.com/book/)** : an excellent resource for learning Lisp, gives a very practical and accessible (not overly technical) introduction to the language.
- **[A Quick Introduction to Common Lisp](https://www.cs.rochester.edu/~schubert/444/notes/lisp-intro.pdf)** : an introduction to Lisp written by [Len Schubert](https://www.cs.rochester.edu/u/schubert/).
- **[Lisp Tutorial](http://cs.rochester.edu/u/gkim21/lisp_highlights.pdf)** : a brief tutorial by Gene Kim covering a few important Lisp functions and operators.
- **[Common Lisp HyperSpec (CLHS)](http://www.lispworks.com/documentation/lw50/CLHS/Front/Contents.htm)** : a comprehensive documentation of everything included in the Common Lisp specification. Most likely, you do not need to read through most of the HyperSpec to be able to do the tasks needed for this course, but rather if you're wondering how to perform some task in Lisp, you should google the keyword followed by "clhs".

In general, try to learn how to program in a [functional paradigm](https://en.wikipedia.org/wiki/Functional_programming) in this course - whenever possible, you should favor implementing functions in terms of recursion and map/filter/reduce operations above iterative loops and storing variables (although Lisp does have capacity for iterative loops, and storing local/global variables). Furthermore, try to learn and use [Lisp style conventions](https://lisp-lang.org/style-guide/). Both of these aspects will be factored into the **coding style** component of the grade for Lisp assignments mentioned above.

**Optional:** Unfortunately, the normal SBCL REPL doesn't allow for arrow-key navigation, which I personally find a bit frusterating. Luckily, this functionality can be added through the [linedit](https://github.com/sharplispers/linedit) library. Installation steps are as follows:
1. First, you need to install [Quicklisp](https://www.quicklisp.org/beta/), a package manager for Lisp. Follow the installation instructions on the site. After installing, make sure to enter **(ql:add-to-init-file)** while in the REPL, which will make it so Quicklisp loads automatically any time the REPL is started.
2. Next, find and open the **.sbclrc** file in your home directory. The file should already exist from the first step, and should contain a few lines added by Quicklisp. Verify that this is the case.
3. At the end of the file, add the following two lines, in order: **(ql:quickload "linedit")** and **(linedit:install-repl :wrap-current t :eof-quits t)**
4. Start the SBCL REPL and verify that arrow-key navigation works.

Quicklisp can be used to install a large number of libraries for Lisp, so it's a useful thing to have if for some reason you plan to do any further work in Lisp. However, none of your assignment submissions in this course should rely on external libraries in order to work properly.
