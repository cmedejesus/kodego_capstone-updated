document.addEventListener('DOMContentLoaded', function () {
    const employeeRows = document.querySelectorAll('.employee-row');
    const searchInput = document.getElementById('searchInput');
    const officeFilter = document.getElementById('officeFilter');
    const positionFilter = document.getElementById('positionFilter');
    const statusFilter = document.getElementById('statusFilter');

    function applyFilters() {
        const selectedOffice = officeFilter.value;
        const selectedPosition = positionFilter.value.toLowerCase();
        const selectedStatus = statusFilter.value.toLowerCase();
        const searchText = searchInput.value.trim().toLowerCase();

        employeeRows.forEach(function (row) {
            const employeeOfficeCell = row.querySelector('.employee-office');
            const employeeOffice = employeeOfficeCell.textContent.trim();
            const employeePositionCell = row.querySelector('.employee-position');
            const employeePosition = employeePositionCell.textContent.trim();
            const employeeStatusCell = row.querySelector('.employee-status');
            const employeeStatus = employeeStatusCell.textContent.toLowerCase();
            const firstName = row.querySelector('.employee-firstName').textContent.toLowerCase();
            const lastName = row.querySelector('.employee-lastName').textContent.toLowerCase();

            const officeFilterMatch = selectedOffice === 'All' || employeeOffice === selectedOffice;
            const positionFilterMatch = selectedPosition === '' || employeePosition.toLowerCase().startsWith(selectedPosition);
            const statusFilterMatch = selectedStatus === '' || employeeStatus === selectedStatus;
            const searchFilterMatch = firstName.includes(searchText) || lastName.includes(searchText);

            if (officeFilterMatch && positionFilterMatch && statusFilterMatch && searchFilterMatch) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    }

    officeFilter.addEventListener('change', applyFilters);
    positionFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);

    // Initial filter application
    applyFilters();
});
