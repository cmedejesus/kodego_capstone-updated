document.getElementById('printButton').addEventListener('click', function () {
    // Use print.js to print the table
    printJS({
        printable: 'employeeTable', // Replace with the ID of your table element
        type: 'html',
        style: `
            tr {
                margin-top: 20px; 
                margin-bottom: 20px; 
            }
           
        `
    });
});
// Hover on the print button event listener
document.getElementById('printButton').addEventListener('mouseenter', function() {
    // Hide elements with the class 'no-print' on button hover
    const hiddenElements = document.querySelectorAll('.no-print');
    hiddenElements.forEach(function (element) {
        element.style.display = 'none';
    });
});
document.getElementById('printButton').addEventListener('mouseleave', function() {
    // Show hidden elements when leaving button hover
    const hiddenElements = document.querySelectorAll('.no-print');
    hiddenElements.forEach(function (element) {
        element.style.display = '';
    });
});
// Hover off the print button event listener
document.getElementById('printButton').addEventListener('click', function() {
    // Show hidden elements when leaving button hover
    const hiddenElements = document.querySelectorAll('.no-print');
    hiddenElements.forEach(function (element) {
        element.style.display = '';
    });
});