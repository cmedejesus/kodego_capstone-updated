document.addEventListener('DOMContentLoaded', function () {
    const applicantRows = document.querySelectorAll('.applicant-row');
    const searchInput = document.getElementById('searchInput');
    const officeFilter = document.getElementById('officeFilter');
    const statusFilter = document.getElementById('statusFilter');

    function applyFilters() {
        const selectedOffice = officeFilter.value;
        const selectedStatus = statusFilter.value.toLowerCase();
        const searchText = searchInput.value.trim().toLowerCase();

        applicantRows.forEach(function (row) {
            const applicantOfficeCell = row.querySelector('.applicant-office');
            const applicantOffice = applicantOfficeCell.textContent.trim();
            const applicantStatusCell = row.querySelector('.applicant-status');
            const applicantStatus = applicantStatusCell.textContent.toLowerCase();
            const firstName = row.querySelector('.applicant-firstName').textContent.toLowerCase();
            const lastName = row.querySelector('.applicant-lastName').textContent.toLowerCase();

            const officeFilterMatch = selectedOffice === 'All' || applicantOffice === selectedOffice;
            const statusFilterMatch = selectedStatus === '' || applicantStatus === selectedStatus;
            const searchFilterMatch = firstName.includes(searchText) || lastName.includes(searchText);

            if (officeFilterMatch && statusFilterMatch && searchFilterMatch) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    }

    officeFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);

    // Initial filter application
    applyFilters();
});
