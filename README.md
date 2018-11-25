# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

### Coding Convention ###
* Back end:
  - Restrict method length is equal to screen's height
  - A class cannot exceed 500 lines
  - Constant should format in snake case and uppercase all characters
  - Field or variable should follow camel case
  - Public and Protected field should not have underline _ before name. Example: carName, customerName
  - Private field should have underline _ before name. Example: _ carName, _ customerName
  - Property should begin with uppercase character. Example: UserName
  - Name of: namespace, class, interface, field, variable, property should be a noun
  - Name of method should begin with verb
  - Don't use Hungary Notation naming convention. Example: carList, customerList, intAge, strEmployeeName.
    Instead using the meaningful name without type. Example: cars, customers, age, employeeName
  - Don't attach class name with property name. 
    Example: 
    class Customer 
    { 
      public int CustomerID { get; set; }
      public string CustomerName { get; set; }
    }
    Instead use only property name because properties are wrapped inside class mean in class context.
    Example:
    class Customer 
    { 
      public int ID { get; set; }
      public string Name { get; set; }
    }
  - Limit to use comment. Instead expose meaning in variable name, method name,...

### Code Review ###
