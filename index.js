/* Your Code Here */
function createEmployeeRecord(employeeArray){
    const [firstName, familyName, title, payPerHour] = employeeArray;
    const timeInEvents = [];
    const timeOutEvents = [];
    const employeeRecord = {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents,
        timeOutEvents,
    };

    return employeeRecord;
}

function createEmployeeRecords(employeeArrays){
    const employeeRecords = [];
    for (let i = 0; i < employeeArrays.length; i++){
        const employeeRecord = createEmployeeRecord(employeeArrays[i]);
        employeeRecords.push(employeeRecord);
    }
    return employeeRecords;
}

function createTimeInEvent(dateStamp) {
    // Extract the hour and minutes from the dateStamp
    const hour = parseInt(dateStamp.slice(11, 13), 10);
    const minutes = parseInt(dateStamp.slice(13), 10);
  
    // Convert the hour and minutes to a four-digit time value
    const timeValue = hour * 100 + minutes;
  
    // Create a new timeInEvent object
    const timeInEvent = {
      type: "TimeIn",
      hour: timeValue,
      date: dateStamp.slice(0, 10),
    };
  
    // Push the timeInEvent to the timeInEvents array of the employee record
    this.timeInEvents.push(timeInEvent);
  
    // Return the updated employee record object
    return this;
  }

  function createTimeOutEvent(dateStamp) {
    // Extract the hour and minutes from the dateStamp
    const hour = parseInt(dateStamp.slice(11, 13), 10);
    const minutes = parseInt(dateStamp.slice(13), 10);
  
    // Calculate the time value in HHMM format
    const timeValue = hour * 100 + minutes;
  
    // Create a new timeOutEvent object
    const timeOutEvent = {
      type: "TimeOut",
      hour: timeValue,
      date: dateStamp.slice(0, 10),
    };
  
    // Push the timeOutEvent to the timeOutEvents array of the employee record
    this.timeOutEvents.push(timeOutEvent);
  
    // Return the updated employee record object
    return this;
  }


  function hoursWorkedOnDate(date){
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const timeInHour = Math.floor(timeInEvent.hour / 100);
      const timeInMinutes = timeInEvent.hour % 100;
      const timeOutHour = Math.floor(timeOutEvent.hour / 100);
      const timeOutMinutes = timeOutEvent.hour % 100;
  
      const hoursWorked = timeOutHour - timeInHour;
      const minutesWorked = timeOutMinutes - timeInMinutes;
      const totalHoursWorked = hoursWorked + minutesWorked / 60;
  
      return totalHoursWorked;
    }
  
    return 0;
  }

  function wagesEarnedOnDate(date) {
    // Use the hoursWorkedOnDate function to calculate the hours worked
    const hoursWorked = hoursWorkedOnDate.call(this, date);
  
    // Multiply the hours worked by the employee's pay rate to determine the amount owed
    const amountOwed = hoursWorked * this.payPerHour;
  
    // Return the amount owed as a number
    return amountOwed;
  }

function findEmployeeByFirstName(employeeRecords, firstName){
    const findName = employeeRecords.find((employee) => employee.firstName === firstName);
    return findName;
}

function calculatePayroll(employeeRecords) {
    const totalWages = employeeRecords.reduce(function (acc, record) {
        return acc + allWagesFor.call(record)
    }, 0);
    return totalWages
  }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

